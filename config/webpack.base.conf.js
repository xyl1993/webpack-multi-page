const MiniCssExtractPlugin = require("mini-css-extract-plugin");
//显示进度
const chalk = require('chalk');
const glob = require("glob");
//消除冗余的css
const ProgressBarPlugin = require('progress-bar-webpack-plugin')

//happypack多进程打包
const HappyPack = require('happypack')
const os = require('os') //获取电脑的处理器有几个核心，作为配置传入
const happyThreadPool = HappyPack.ThreadPool({
  size: os.cpus().length
})


// html模板
const htmlWebpackPlugin = require("html-webpack-plugin");



const devMode = process.env.NODE_ENV === 'development';
var utils = require('../build/utils');
var path = require('path');
var publicPath = devMode ? '/' : './';
var ROOT_PATH = path.resolve(__dirname);
var pngUserBase = 'url-loader?limit=8192&name=';
var fontUserBase = 'url-loader?importLoaders=1&limit=80000&name=';
function resolve(dir) {
  return path.join(__dirname, '..', dir)
}
// 获取html-webpack-plugin参数的方法
var getHtmlConfig = function (name, chunks) {
	return {
		template: `./src/pages/${name}/index.html`,
		filename: `${name}.html`,
		favicon: path.resolve(ROOT_PATH, '../src/assets/favicon.ico'),
		// title: title,
		inject: true,
		hash: true, //开启hash  ?[hash]
		chunks: chunks,
		minify: process.env.NODE_ENV === "development" ? false : {
			removeComments: true, //移除HTML中的注释
			collapseWhitespace: true, //折叠空白区域 也就是压缩代码
			removeAttributeQuotes: true, //去除属性引用
		},
	};
};
function getEntry() {
  var entry = {};
  //读取src目录所有page入口
  glob.sync('./src/pages/**/*.js')
      .forEach(function (name) {
          var start = name.indexOf('src/') + 4,
              end = name.length - 3;
          var eArr = [];
          var n = name.slice(start, end);
          n = n.slice(0, n.lastIndexOf('/')); //保存各个组件的入口 
          n = n.split('/')[1];
          eArr.push(name);
          entry[n] = eArr;
      });
  return entry;
};

process.traceDeprecation = true;
if (devMode) {
  // entry.vendor = [];
  pngUserBase = pngUserBase + 'images/[path][name].[ext]';
  fontUserBase = fontUserBase + 'fonts/[name].[ext]'
} else {
  pngUserBase = pngUserBase + utils.assetsPath('images/[hash:8].[ext]');
  fontUserBase = fontUserBase + utils.assetsPath('fonts/[name].[ext]');
}

module.exports = {
  entry: getEntry(),
  output: {
    path: path.resolve(ROOT_PATH, '../dist'),
    publicPath: publicPath,
    filename: devMode ? '[name].js' : utils.assetsPath('js/[name]_[chunkhash].js'),
    pathinfo: devMode ? true : false
  },
  resolve: {
    extensions: ['.js', '.css','.scss' ,'.json'],
    // 别名，可以直接使用别名来代表设定的路径以及其他
    alias: {
      // jquery: 'jquery/jquery.min.js',
      '@': resolve('src/app'),
    }
  },
  module: {
    rules: [
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          devMode ? 'style-loader' : {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: '../'
            }
          },
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              plugins: (loader) => [
                require('autoprefixer')({
                  browsers: ['last 5 versions']
                }),
              ]
            },
          },
          'sass-loader',
        ],
      },
      {
        test: /\.(js|jsx)$/,
        use: {
          loader: 'babel-loader?cacheDirectory=true',
          options: {
            presets: ['@babel/preset-env'],
            plugins: ['@babel/transform-runtime',"@babel/plugin-syntax-dynamic-import"]
          }
        },
        include: path.resolve(__dirname, '../'),
        exclude: /node_modules/
      },{
        test: /\.(png|jpe?g|gif|cur)(\?.*)?$/,
        use: [pngUserBase]
      }, {
        test: /\.(woff|woff2|eot|ttf|otf|svg)(\?.*$|$)/,
        use: [fontUserBase]
      }, {
        test: /\.html$/,
        use: ["html-withimg-loader"]
      }
    ]
  },

  // 开启source-map，webpack有多种source-map，在官网文档可以查到//cheap-module-eval-source-map
  // devtool: 'eval', //开发环境cheap-module-eval-source-map
  externals: {
    jquery: "jQuery", //如果要全局引用jQuery，不管你的jQuery有没有支持模块化，用externals就对了。
  },
  plugins: [
    // // 全局暴露统一入口
		// new webpack.ProvidePlugin({
      
		// }),
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: devMode ? '[name].css' : utils.assetsPath("css/[name]_[chunkhash].css"),
      chunkFilename: devMode ? '[id].css' : utils.assetsPath('css/[id].[hash].css'),
    }),
    // //静态资源输出
		// new copyWebpackPlugin([{
		// 	from: path.resolve(__dirname, "../src/assets"),
		// 	to: './assets',
		// 	ignore: ['.*']
		// }]),
    new ProgressBarPlugin({
      format: 'build [:bar] ' + chalk.green.bold(':percent') + ' (:elapsed seconds)',
      clear: false
    }),
    // /*多进程压缩打包*/
    new HappyPack({ //开启多线程打包
      id: 'happy-babel-js',
      loaders: ['babel-loader?cacheDirectory=true'],
      threadPool: happyThreadPool
    }),
  ]
}


//配置页面
const entryObj = getEntry();
const htmlArray = [];
Object.keys(entryObj).forEach(element => {
	htmlArray.push({
		_html: element,
		title: '',
		chunks: ['vendor', 'common', element]
	})
})
//自动生成html模板
htmlArray.forEach((element) => {
	module.exports.plugins.push(new htmlWebpackPlugin(getHtmlConfig(element._html, element.chunks)));
})
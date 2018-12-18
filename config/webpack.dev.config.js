var webpack = require('webpack');
var path = require('path');
var ROOT_PATH = path.resolve(__dirname);
const devProxyPath = 'http://localhost:8080/';
var utils = require('../build/utils');
const merge = require('webpack-merge');
const baseWebpackConfig = require('./webpack.base.conf');
const appPort = 4000;

module.exports = merge(baseWebpackConfig, {
  watch: true, // 开启监听文件更改，自动刷新
  output: {
		path: path.resolve(__dirname, '../dist'),
		// 打包多出口文件
		filename: './js/[name].bundle.js'
	},
  watchOptions: {
    ignored: /node_modules/, //忽略不用监听变更的目录
    aggregateTimeout: 500, //防止重复保存频繁重新编译,500毫米内重复保存不打包
    poll: 1000 //每秒询问的文件变更的次数
  },
  mode: 'development',
  devtool: 'cheap-module-eval-source-map',
  devServer: {
    clientLogLevel: 'warning',
    // historyApiFallback: true,
    hot: true,
    // 搭建的开发服务器的 host，这里使用了一个函数去获取当前电脑的局域网 ip
    // 这个可以获取你的电脑的 ip 地址，然后开发服务器就可以搭建在局域网里
    // 如果有一同开发的小伙伴，在同一局域网内就可以直接访问地址看到你的页面
    // 同样，这个也适用于手机，连上同一个 wifi 之后就可以在手机上实时看到修改的效果
    host: utils.getIPAdress(),
    // publicPath: '/',
    contentBase: path.join(__dirname, "../src"), // since we use CopyWebpackPlugin.
    // 搭建的开发服务器启动 gzip 压缩
    compress: true,
    disableHostCheck: true,
    // 开发服务器的端口号
    // 但是后面我们会用到 portfinder 插件，如果真的 config/index.js 中的端口被占用了
    // 那这个插件会以这个为 basePort 去找一个没有被占用的端口
    port: appPort,
    // 启用 quiet 后，除了初始启动信息之外的任何内容都不会被打印到控制台
    quiet: true,
    overlay: {
      warnings: false,
      errors: true
    }, // 在浏览器上全屏显示编译的errors或warnings。
    open: true,
    host: 'localhost',
    inline: true, //实时刷新
    watchOptions: {
      ignored: /node_modules/,
      poll: false
    },
    stats: 'errors-only',
    proxy: {
      '/api/*': {
        target: devProxyPath,
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  },

  optimization: {
    splitChunks: {
			cacheGroups: {
				vendor: {   // 抽离第三方插件
					test: /node_modules/,   // 指定是node_modules下的第三方包
					chunks: 'initial',
					name: 'vendor',  // 打包后的文件名，任意命名    
					// 设置优先级，防止和自定义的公共代码提取时被覆盖，不进行打包
					priority: 10    
				},
				utils: { // 抽离自己写的公共代码，common这个名字可以随意起
					chunks: 'initial',
					name: 'common',  // 任意命名
					minSize: 0,    // 只要超出0字节就生成一个新包
					minChunks: 2
				}
			}
		}
  },
  plugins: [
    // new UglifyJsPlugin(),
    new webpack.LoaderOptionsPlugin({
      options: {
        context: __dirname,
        postcss: function () {
          return [autoprefixer, cssnext, precss, cssnano];
        },
        noParse: /node_modules\/(jquey|moment|chart\.js)/
      }
    }),
    new webpack.HotModuleReplacementPlugin(),
  ]
})
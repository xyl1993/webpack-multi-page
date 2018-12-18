var CompressionWebpackPlugin = require('compression-webpack-plugin');
const safeParser = require('postcss-safe-parser');
//css压缩
const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
var path = require('path');
var ROOT_PATH = path.resolve(__dirname);

const merge = require('webpack-merge');
const baseWebpackConfig = require('./webpack.base.conf');

module.exports = merge(baseWebpackConfig, {

  mode: 'production',
  // 开启source-map，webpack有多种source-map，在官网文档可以查到//cheap-module-source-map
  optimization: {
    minimize: true,
    splitChunks: {
      cacheGroups: {
        commons: {
          chunks: 'initial',
          minChunks: 2,
          maxInitialRequests: 5,
          minSize: 0
        },
        vendor: { // 将第三方模块提取出来
          test: /node_modules/,
          chunks: 'initial',
          name: 'vendor',
          priority: 10, // 优先
          enforce: true
        }
      }
    }
  },
  plugins: [
    //显示打包资源大小分布
    // new BundleAnalyzerPlugin(),
    //在 plugin 中添加
    new CompressionWebpackPlugin({ //gzip 压缩
      filename: '[path].gz[query]',
      algorithm: 'gzip',
      test: new RegExp(
        '\\.(js|css)$' //压缩 js 与 css
      ),
      threshold: 10240,
      minRatio: 0.8
    }),
    /*用于生产环境压缩css的插件*/
    new OptimizeCSSPlugin({
      cssProcessorOptions: {
        parser: safeParser,
        discardComments: {
          removeAll: true
        }
      }
    })
  ]
})
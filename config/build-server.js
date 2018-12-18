// 更友好的提示插件
var FriendlyErrorsPlugin = require("friendly-errors-webpack-plugin");
// 获取一个可用的 port 的插件
var portfinder = require("portfinder");
var devWebpackConfig = require("./webpack.dev.config");

// 导出一个 promise 函数，这可以让 wepback 接受一个异步加载的配置
// 并在 resolve 的时候运行 这个配置
// 比如这里我就用到了 portfinder 和 friendly-errors-webpack-plugin
module.exports = new Promise((resolve,reject) => {
  // 设置插件的初始搜寻端口号
  portfinder.basePort = devWebpackConfig.devServer.port;
  portfinder.getPort((err,port) => {
    if (err) reject(err)
    else {
      // 这里就利用 portfinder 得到了可以使用的端口
      devWebpackConfig.devServer.port = port
      devWebpackConfig.plugins.push(new FriendlyErrorsPlugin({
        // 清除控制台原有的信息
        clearConsole: true,
        // 打包成功之后在控制台给予开发者的提示
        compilationSuccessInfo: {
          messages: [`开发环境启动成功，项目运行在: http://${devWebpackConfig.devServer.host}:${port}`]
        },
        // 打包发生错误的时候
        onErrors: () => { console.log("打包失败") }
      }))
      resolve(devWebpackConfig)
    }
  })
})

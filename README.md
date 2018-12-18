
#### 开发
```bash
# 安装依赖
yarn install or npm install

# 启动服务
npm start

# 打包
npm run build

#### 目录结构
```
- config webpack配置文件
- src 系统源码目录
 - app
  - components 项目基础组件
   - app-aside 左边目录
   - app-footer 低栏
   - app-header 头部
  - const 基础配置文件夹
  - containers 项目根组件
   - full-layout 工作台组件
   - simple-layout 登陆登全屏路径应用组件
   - filters 全局过滤器
   - global 全局配置文件
   - jsplug 第三方jquery插件
   - mock 数据模拟文件
   - pages 登陆页登单页文件
   - utils 工具目录
   - views 工作台视图文件
   - vuex vuex数据文件 暂时只有切换目录用到
 - assets
- 更多功能开在开发
```


#### 写的不好请见谅
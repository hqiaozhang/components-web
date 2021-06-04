##### 1、项目启动

```
$ cd < project name >
$ npm install
$ npm start
```

>  访问地址：localhost:8082 

##### 2、端口配置文件

如果该端口已被占用，需要修改端口

`build/config/index.js`

```javascript
module.exports = {
  // 开发环境配置项
  dev: {
  	port: 8083,
  }
 }
```

##### 3、跨域代理设置

开发环境时访问后端接口会出现跨域问题，可在`build/config/index.js` 设置跨域代理

```javascript
module.exports = {
  // 开发环境配置项
  dev: {
  	proxyTable: {
      '/backendApi/*': {
        target: 'http://58.83.189.150:18888/',
        changeOrigin: true, // 如果接口跨域，需要进行这个参数配置
        secure: false,  // 如果是https接口，需要配置这个参数
      }
    }
  }
 }
```

##### 4、目录说明

- build 项目启动和构建脚本；

- dist 打包后的项目代码，用于部署；

- node-modules：使用npm安装的第三方库文件；

- src：项目源代码:
  - api：接口目录；
  - assets: 资源目录，这里的资源会被wabpack构建
    - styles: 公用样式文件
    - images: 公用图片存放
    - plugins: 公用第三方插件
  - charts: 图表组件(Echarts、D3等图表库封装的图表组件)；
  - components：展示组件；
  - config: 通用配置项文件
  - router：路由配置；
  - store：网络请求、获取数据源
  - util：工具类方法；
  - container: 容器组件


- index.html: 应用程序HTML文件


- main.js: 应用程序主入口文件


- static: 纯静态资源，不会被wabpack构建

##### 5、api文件配置配置模板

````javascript
export default {
  url: '/login', //  接口地址
  enableMock: true, // 是否使用本地假数据
  config: { 
    method: 'POST',
    contentType: 'multipart/form-data',
    isMsg: true, // 是否需要后端的msg
  },
  mock: {
    "erroCode":2000,
    "erroMsg":null,
    "result":[]
  }
}
````

每个模块下面都需要一个index.js作为出口文件

mockIndex.js是所有接口出口文件，如果新增了一个模块文件夹，需要在该文件中引入

使用mock模拟假数据，当没有真实数据时可以很方便的模拟

##### 6、charts目录说明

新增一个图表统一放在charts/index.js出口文件

图表的公用方法放在该目录下的util目录下

##### 7、components目录说明

存放所有展示组件，公用的组件放在common，其他按模块分,该目录下的组件的只负责接收数据并展示，不涉及数据请求

##### 8、config 目录说明

config.base.js文件不可以，其他配置根据自己需要新建

##### 9、container 容器组件

主要负责页面的数据请求及分发（分发给components组件）、业务逻辑处理

##### 10、router 路由配置

每新增一个模块，需要在路由中新增模块的路径配置

##### 11、store（网络请求、获取数据源）

公用的数据也可以放在store里面管理

##### 12、util（工具类方法）

request.js 发送请求的方法封装

##### 13、项目打包部署

- 修改服务器地址

`config/base.config.js`

```javascript
// 线上服务器域名
host: 'http://58.83.189.150:18888/backendApi',
// websocket线上服务器域名
websocketHost: 'ws://58.83.189.150:18888/backendApi',
```

`build/config/index.js`

```javascript
build: {
  assetsPublicPath: // 服务器地址（静态资源访问路径）
}
```
- 打包生成部署文件

```
​```
$ cd < project name >
$ npm run build
​```
```






# ele-app

#项目环境
https://www.cnblogs.com/superlizhao/p/8664326.html  从零搭建vue环境
https://blog.csdn.net/shenggaofei/article/details/80361627   配置node和npm环境变量
https://www.cnblogs.com/koyamane/p/9958420.html   配置node模块的存放位置
node --8.9 或更高版本 (推荐 8.11.0+)
node安装npm配置环境
npm install -g @vue/cli   3.0的
（如有问题，安装vue或webpack）

相关官网
Vue CLI--3.0
https://cli.vuejs.org/zh/guide/#%E8%AF%A5%E7%B3%BB%E7%BB%9F%E7%9A%84%E7%BB%84%E4%BB%B6
webpack
https://www.webpackjs.com/concepts/
vue
https://cn.vuejs.org/v2/guide/

mint-ui
http://mint-ui.github.io/docs/#/en2/navbar

font-sawone图标
https://www.thinkcmf.com/font/search/index.html

使用可滑动的导航切换-比navbar更好
https://github.com/ScoutYin/ly-tab
<!-- 以局部组件的方式引入 -->
https://blog.csdn.net/weixin_34375251/article/details/88677626


项目注意端口
devServer中的port: 8082应该与main.js中的axios.defaults.baseURL 一直
否则控制台会一直宝请求错误snode此类的错误

引用font-awsome的三种方式（以下两种方式都不需要配置webpack）
1是 （css包全打到app.js里，此会增加app。js的体积）
 先按装  npm install font-awesome
 然后在main。js 中添加  import 'font-awesome/css/font-awesome.css'
2是 (更好)
 下载font-awesome  然后把它整个包 下载下来 ，然后把它放在static 静态目录下，然后在index.html 通过link方式引入
3 在public的index。html直接引入网络的css，但此方法需要配置webpack
 

## 安装依赖
```
npm install
```

### 项目启动
```
npm run serve
```

### 项目打包成生产环境包 
```
npm run build
```

### 测试
```
npm run test
```

### 代码检查
```
npm run lint
```

### 自定义配置vue启动，url跨域等
See [Configuration Reference](https://cli.vuejs.org/config/).


###安装cnpm加速有利于加速下载
npm install -g cnpm --registry=https://registry.npm.taobao.org

###安装batteer-scroll
cnpm install batteer-scroll --save

###项目架构
vuecli3.7搭建
axios+vueRouter+vuex

###项目目录介绍
public   ----主页面的index入口，index.html可以引入公共的css
src/assets   -----用于页面引入外部单独的图片，css，js等
components   ----用于封装公共的组件
view    ------项目的主要页面组件
App.vue    -----根组件，main.js调用根组件
main.js -----// 引入Vue等资源、挂载Vue的入口js，最终将app.vue渲染成一个节点查到public/index.html对应的节点中
router.js   -----项目的路由配置文件，3.0自动生成
store.js   -----vuex的仓库设置，3.0自动生成
.gitignore   ----在该文件中定义相应的忽略规则，忽略某些文件的提交,来管理当前文件夹下的文件的Git提交行为
babel.config.js      ------vue的css等文件转化设置
package-lock.json    -----依赖的下载源地址记录
package.json    -----项目依赖文件记录
README.md    ----项目文档介绍
vue.config.js    ------自定义配置vue启动，url跨域，为手动新建的，名称必须一致


<!-- 发送验证码使用的为聚合数据平台 -->
<!-- 定位使用的为高德地图定位 -->
<!-- ui使用mint-ui -->

###
app.vue    -----此页面获取地理位置信息
login.vue    -----登录页面，目前注释了获取验证码和登录验证（传送验证码给后台验证）
index.vue    -----主要的路由首页

###资源(asset)和入口起点超过指定文件限制
https://blog.csdn.net/yun_hou/article/details/87818475

###vue项目打包后一片空白
https://blog.csdn.net/luodao_/article/details/79104882
assetsPublicPath默认的是'/'，也就是根目录。而index.html和static在同一级目录下面，所以改为'./'
其次注意将router.js中改成mode: 'hash',否则找不到页面，加载css和js没有问题

###vued打包后，index.html页面空白问题，页面静态资源加载没问题。 ---暂时没有试
https://ask.csdn.net/questions/696578

###vue.config.js  ---3.0的其他打包配置详见此
https://blog.csdn.net/qq_36407748/article/details/82050976


###项目生产环境下运行
将dist文件复制到tomcat下/webapp下

##解决vue生产环境的打包问题
https://blog.csdn.net/qq_35213388/article/details/85551703    ---靠谱
https://www.jianshu.com/p/3c2eae2933c8    ---暂时未成功
D:\window\nginx-1.10.2\conf\myconfig\dist.conf为nginx的配置
访问：http://localhost:8081/dist/index.html进行代理
目前D:\vscodeProject\dreamhang\美团外卖源码2\ele-app- yl   ----生产环境代码配置成功
线上的需要开启nginx。访问端口变成8081

###vue中数据如果有多层数据
一般需要加v-if判断

###batter-scroll
用于处理手机端上没有滚动的问题，类似区域滚动
有时候样式发生改动需要命令重启下

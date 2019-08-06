import Vue from 'vue';
import App from './App.vue';
import MintUI from 'mint-ui';
import 'mint-ui/lib/style.css';
import router from './router';
import store from './store';
import axios from 'axios';
// qs用于处理post请求失败的问题
import qs from 'qs';
// 引入加载动画插件
import { Indicator,Toast } from 'mint-ui';
import echarts from 'echarts';
import VueClipboard from 'vue-clipboard2'


Vue.config.productionTip = false;
Vue.prototype.$axios = axios;
Vue.prototype.$echarts = echarts;
Vue.prototype.$toast = Toast;

Vue.use(MintUI);
Vue.use(VueClipboard);  //vue复制链接地址  

// axios.defaults.baseURL = 'http://localhost:8083/';
// axios.defaults.baseURL = 'http://bilongwang.com/';
// axios.defaults.baseURL = 'http://btbfire.com/';
axios.defaults.baseURL = 'http://91bilong.com/';



//加法
//说明：javascript的加法结果会有误差，在两个浮点数相加的时候会比较明显。这个函数返回较为精确的加法结果。 
//调用：accAdd(arg1,arg2) 
//返回值：arg1加上arg2的精确结果 
function accAdd(arg1,arg2){ 
  var r1,r2,m; 
  try{r1=arg1.toString().split(".")[1].length}catch(e){r1=0} 
  try{r2=arg2.toString().split(".")[1].length}catch(e){r2=0} 
  m=Math.pow(10,Math.max(r1,r2)) 
     return (arg1*m+arg2*m)/m 
  } 
  //给Number类型增加一个add方法，调用起来更加方便。 
  Number.prototype.add = function (arg){ 
     return accAdd(arg,this); 
  } 
  
  
  
  //减法
  //说明：javascript的减法结果会有误差，在两个浮点数相加的时候会比较明显。这个函数返回较为精确的减法结果。 
  //调用：accSub(arg1,arg2) 
  //返回值：arg1减上arg2的精确结果 
  function accSub(arg1,arg2){ 
      return accAdd(arg1,-arg2); 
  } 
  //给Number类型增加一个sub方法，调用起来更加方便。 
  Number.prototype.sub = function (arg){ 
      return accSub(this,arg); 
  } 


// 请求拦截
axios.interceptors.request.use(
  config => {
    // 如果为post请求则将传输数据json化
    if (config.method == 'post') {
      config.data = qs.stringify(config.data);
    }
    
    // 加载动画
    Indicator.open({
      text: '加载中...',
      spinnerType: 'fading-circle'
    });
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

// 响应拦截
axios.interceptors.response.use(
  response => {
    Indicator.close();
    return response;
  },
  error => {
    // 错误提醒
    Indicator.close();
    return Promise.reject(error);
  }
);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');

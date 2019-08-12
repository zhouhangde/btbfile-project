<template>
  <div class="hanq">
      <Header :title="title"/>
      <!-- 导航 -->
      <!-- <HanqTab :hqfilterData="hanqTabData"  @update="update"/> -->

     <!-- 涨幅跌幅信息 ，bottom-all-loaded上拉加载是否完成-->
     <!-- auto-fill若为真，loadmore 会自动检测并撑满其容器 -->
    <!-- <mt-loadmore
        :top-method="loadTop"
        :auto-fill="false"   
        ref="loadmore"
        > -->
    <mt-loadmore
        :auto-fill="false"   
        ref="loadmore"
        >    
          <div class="Datalist">
              <!-- <HanqTabList v-for="(item,index) in zxorusData" :key="index" :zorjdata="item.myData"/> -->
              <!-- <transition name="slide"> -->
               <HanqTabList :zorjdata="homeOneDataNew.slice('0','6')"/>
              <!-- </transition> -->
          </div>
    </mt-loadmore>
  </div>
</template>

<script>
const myusdtDataOne = require('../../data/usdtDataOne.json');
const myhanqTabData = require('../../data/hanqTabData.json');
import Header from "../components/Header";
import HanqTab from "../components/hanq/HanqTab";
import HanqTabList from "../components/hanq/HanqTabList";
// 引入加载动画插件
import { Indicator } from 'mint-ui';
export default {
  name: "hanq",
  data() {
    return {
       title:'行情',
       hanqTabData:{},  //tab切换的title
       zxorusData:[],   //tab下的切换的列表数据
       homeOneDataNew:[],   //tab下的切换的列表websocket数据
       page: 1,   //当前页数
       size: 5,   //分页数
       allLoaded: false,   //是否已经加载完毕，无加载数据的开关
       bottomPullText: "上拉加载更多",   //底部的加载显示字样
       data: null,  //tab切换条件
       timer: null  //定时器
    };
  },
  beforeRouteEnter(to, from, next) {
    http.sendData({"id":2,"method":"today.query","params":["BTCUSDT"]})
    http.sendData({"id":2,"method":"today.query","params":["ETHUSDT"]})
    http.sendData({"id":2,"method":"today.query","params":["XRPUSDT"]})
    http.sendData({"id":2,"method":"today.query","params":["EOSUSDT"]})
    http.sendData({"id":2,"method":"today.query","params":["LTCUSDT"]})
    http.sendData({"id":2,"method":"today.query","params":["WTCUSDT"]})
    next();
    // next(vm => vm.getData());
  },
  beforeRouteLeave(to, from, next) {
    // 离开页面关闭定时器
    this.timer = null
    next()
  },
  created() {
    // 加载动画
    Indicator.open({
      text: '加载中...',
      spinnerType: 'fading-circle'
    });
    this.getData();
    // this.initsetInterval();  //定时刷新页面
    // this.checkLogin();   //检查是否登陆
  },
  watch: {
      homeOneDataNew(val) {
        this.homeOneDataNew = val;
        this.homeOneDataNew.filter(function(item, index, arr){
               switch(index) {
                    case 0:
                        item.titleBefore = 'BTC'
                        item.titleAfter = 'USDT'
                        break;
                    case 1:
                        item.titleBefore = 'ETH'
                        item.titleAfter = 'USDT'
                        break;
                    case 2:
                        item.titleBefore = 'XRP'
                        item.titleAfter = 'USDT'
                        break;
                    case 3:
                        item.titleBefore = 'EOS'
                        item.titleAfter = 'USDT'
                        break;
                    case 4:
                        item.titleBefore = 'LTC'
                        item.titleAfter = 'USDT'
                        break;
                    case 5:
                        item.titleBefore = 'WTC'
                        item.titleAfter = 'USDT'
                        break;                    
                } 
               if(item.result.last>item.result.open){
                    // 涨幅的数据
                    item.color = "rgb(77,169,144)"
               }else{  
                    //跌幅的数据
                    item.color = "#e27373"
               }
            })
      }
  },
  methods: {
    // 获取用户信息
    getData() {
       var $this = this
       this.hanqTabData = myhanqTabData
       window.revieceData2 = function(res) {
         return $this.storeData(res)
       }
       this.loadData()
    },
     //初始加载数据
    loadData() {
      // 拉取商家信息，默认是综合排序的第一页的数据
      // this.zxorusData = myusdtDataOne;
      // 判断是否有点击tab，初始状态this.data为null

      // this.homeOneDataNew = this.zfData;
      // if(this.data){
      //   if(this.data.condition== "usdt"){
      //     // 加载usdt的数据
      //     console.log("加载跌幅的数据");
      //     this.homeOneDataNew = this.zfData;
      //   }
      // }
    },
    // 下拉刷新，top-method
    loadTop() {
      this.page = 1;
      // resurantsOneData为什么数据也会变？？？
      this.allLoaded = false;  //开启上拉加载，未加载完数据
      // 拉取商家信息
       this.$refs.loadmore.onTopLoaded();    //停止下拉刷新
       this.zxorusData =  this.zxorusData.splice(0,3);
    },
     //tab切换，根据点击tab的条件加载数据
    update(condation) {  
      this.data = condation;
      this.loadData();
    },
    storeData(data){
      this.homeOneDataNew.push(data)
       // 关闭动画
      Indicator.close();
    },
    initsetInterval(){
      var $this = this
      $this.timer = setInterval(function(){
        // 加载动画
        Indicator.open();
        location.reload();
        Indicator.close();
     },60000)   
    }
  },
  components: {
      Header,
      HanqTab,
      HanqTabList
  }
};
</script>

<style scoped>
  /* .slide-enter-active, .slide-leave-active {
    transition: all 0.5s linear;
  }
  .slide-enter{
    transform: translateY(20px) scale(1);
    opacity: 1;
  }
  .slide-leave-to {
    transform: translateY(-20px) scale(0.8);
    opacity: 0;
  } */
</style>
<template>
  <div class="hanq">
    <Header :title="title"/>
    <mt-loadmore
        :auto-fill="false"   
        ref="loadmore"
        >    
          <div class="Datalist">
               <HanqTabList :zorjdata="homeOneDataNew.slice('0','6')"/>
          </div>
    </mt-loadmore>
  </div>
</template>

<script>
import Header from "../components/Header";
//行情的列表组件
import HanqTabList from "../components/hanq/HanqTabList";
// 引入加载动画插件
import { Indicator } from 'mint-ui';
export default {
  name: "hanq",
  data() {
    return {
       title:'行情',
       homeOneDataNew:[],   //tab下的切换的列表websocket数据
      //  timer: null  //定时器
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
  },
  // beforeRouteLeave(to, from, next) {
  //   // 离开页面关闭定时器
  //   this.timer = null
  //   next()
  // },
  created() {
    // 加载动画
    Indicator.open({
      text: '加载中...',
      spinnerType: 'fading-circle'
    });
    this.getData();
  },
  watch: {
      //为市场的币种数据添加标题，和对应涨幅和跌幅的增长率样式
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
    // 获取行情的数据，即币种的数据
    getData() {
       var $this = this
       window.revieceData2 = function(res) {
         if(res.result != null && res.result !='' && res.result != undefined){
           return $this.storeData(res)
         }else{ 
            setTimeout(function(){  //没有数据时
              // 关闭动画
              Indicator.close();
            },3000)
         } 
       }
    },
    storeData(data){
      this.homeOneDataNew.push(data)
       // 关闭动画
      Indicator.close();
    }
    // initsetInterval(){
    //   var $this = this
    //   $this.timer = setInterval(function(){
    //     // 加载动画
    //     Indicator.open();
    //     location.reload();
    //     Indicator.close();
    //  },1000)   
    // }
  },
  components: {
      Header,
      HanqTabList
  }
};
</script>

<style scoped>
  
</style>
<template>
  <div class="homeKxEarchatNew">
    <Header :isLeft="true" :title="title"/>
    <div>
      <!-- <p class="theItem">
        <span>0.3325<small style="margin-left: 7px;font-size: 10px;color: #fff;">¥2.29</small></span>
        <span>24h最高<small style="margin-left: 7px;">0.3334</small></span>
      </p>
      <p class="theItem">
        <span>0.3325<small style="margin-left: 7px;font-size: 10px;color: #fff;">¥2.29</small></span>
        <span>24h最高<small style="margin-left: 7px;">0.3334</small></span>
      </p> -->
      <p class="theItem">
        <!-- 显示今日值 -->
        <span><small style="margin-left: 7px;font-size: 10px;color: #fff;">{{myrevieceGaoOrLow.last}}</small></span>
        <span>24h最高<small style="margin-left: 7px;">{{myrevieceGaoOrLow.high}}</small></span>
      </p>
      <p class="theItem">
        <!-- 涨跌比率 -->
        <span><small style="margin-left: 7px;font-size: 10px;color: #fff;" v-if="myrevieceGaoOrLow.last.length>0"
        >{{((myrevieceGaoOrLow.last - myrevieceGaoOrLow.open) / myrevieceGaoOrLow.open).toFixed(2)}}</small>
        </span>
        <span>24h最低<small style="margin-left: 7px;">{{myrevieceGaoOrLow.low}}</small></span>
      </p>
    </div>


    <iframe id="tradingview_782fd" name="tradingview_782fd" src="http://www.btbfire.com/chartinglibrary/index_black.html?stock=CSCCT&money=USDT" frameborder="0" allowtransparency="true" scrolling="no" allowfullscreen="" style="display: block; width: 100%; height: 350px;;">

	  </iframe>

    
    <kxImgTab :hqfilterData="hanqTabData"  @update="update"/>

     <!-- 涨幅盘口或最新成交信息 ，bottom-all-loaded上拉加载是否完成-->
     <!-- auto-fill若为真，loadmore 会自动检测并撑满其容器 -->
    <mt-loadmore
        :top-method="loadTop"
        :auto-fill="false"   
        ref="loadmore"
        >
        <div class="Datalist">
            <!-- <kxImgTabList v-for="(item,index) in zxorusData" :key="index" :zorjdata="item.myData"/> -->
            <kxImgTabList  :pkData="pkData" :cjData="cjData" :showData="showData"/>
        </div>
    </mt-loadmore>
    <div class="foot-buttS">
       <button class="buy-in">买入</button>
       <button class="seller-out">卖出</button>
    </div>
  </div>
</template>

<script>
const myzixuDataOne = require('../../../data/newCjDataOne.json');
const myusdtDataOne = require('../../../data/pkDataOne.json');
const myhanqTabData = require('../../../data/kxTabData.json');
import Header from "../../components/Header";
import kxImgTab from "../../components/indexPage/kxImgTab";
import kxImgTabList from "../../components/indexPage/kxImgTabList";

export default {
  name: "homeKxEarchatNew",
  data() {
    return {
       title:'XRP/USDT',
       hanqTabData:{},  //tab切换的title
       zxorusData:[],   //tab下的切换的列表数据
       //tab下的切换的列表数据websocket盘口数据
       pkData:{
         asks:[],
         bids:[]
       },
       //tab下的切换的列表数据websocket最新成交数据
      cjData:{
        cj:[]
       },
       showData:'pk',  //初始化显示盘口开关
       page: 1,   //当前页数
       size: 5,   //分页数
       allLoaded: false,   //是否已经加载完毕，无加载数据的开关
       bottomPullText: "上拉加载更多",   //底部的加载显示字样
       data: null,  //tab切换条件
        //最高最低数据
       myrevieceGaoOrLow:{
         deal: "",
         high: "",
         last: "",
         low: "",
         open: "",
         volume: ""
       },
      
    }
  },
  beforeRouteEnter(to, from, next) {
    // 获取最高最低和成交量
    http.sendData({"id":1,"method":"today.query","params":["CSCCTUSDT"]})
    http.sendData({"id":17,"method":"depth.subscribe","params":["CSCCTUSDT",10,"0"]})
    http.sendData({"id":61,"method":"deals.subscribe","params":["CSCCTUSDT"]})
    next(vm => vm.getData());
  },
  watch: {
      // zxorusDataNew(val) {
      //   // this.zxorusDataNew = val;
      //   this.zxorusDataNew.asks =  val[1].asks
      //   this.zxorusDataNew.bids =  val[1].bids
      //   console.log('this.zxorusDataNew',this.zxorusDataNew)
      // },
      pkData: {
        handler(newValue, oldValue) {
          if(newValue.asks != undefined){
            this.pkData.asks = newValue.asks
            this.pkData.bids = newValue.bids
          }
          //  console.log('this.zxorusDataNew',this.zxorusDataNew)
        },
        immediate: true,
        deep: true
      },
      cjData:{
        // 暂时没有监听到变化
        handler(newValue, oldValue) {
          this.cjData = newValue
        },
        immediate: true,
        deep: true
      }
  },
  methods: {
    // 获取用户信息
    getData() {
       var $this = this
       this.hanqTabData = myhanqTabData
       window.revieceData1 = function(res) {
        // usdt最高最低数据
         return $this.storeData(res)
       }
       window.revieceData17 = function(res) {
            // 只需要交易挂单返回成功的数据（目前将其作为盘口的数据）
            if(res.params[0]){
                // console.log('盘口数据',res)
                return $this.storePkData(res)
            }
       }
       window.revieceData61 = function(res) {
            return $this.storeCjData(res)
        },
       this.loadData()
    },
    // 点击导航切换
    handleChange (item, index) {
      if(index == '0'){

      }else if(index == '1'){

      }
    },
     //初始加载数据
    loadData() {
      // 拉取商家信息，默认是综合排序的第一页的数据
      // this.zxorusData = myzixuDataOne;
      // // 判断是否有点击tab，初始状态this.data为null
      // if(this.data){
      //   if(this.data.condition== "pk"){
      //     // 加载自选数据
      //     console.log("加载涨幅数据");
      //     this.zxorusData = myzixuDataOne;
      //   }else{
      //     // 加载usdt的数据
      //     console.log("加载跌幅的数据");
      //     this.zxorusData = myusdtDataOne;
      //   }
      // }

      if(this.data){
        if(this.data.condition== "pk"){
          // 加载自选数据
          this.showData = 'pk'
        }else{
          // 加载usdt的数据
          this.showData = 'zxcj'
        }
      }
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
      this.myrevieceGaoOrLow = data.result
    },
    storePkData(data){
      this.pkData = {
          asks:data.params[1].asks,
          bids:data.params[1].bids
      }
    },
    storeCjData(data){
      if(data.params[1].length >50 ){
         this.cjData = {
          cj:data.params[1].slice(0,50)
        }
      }
    }
  },
  // 调用
  mounted() {
    
  },
  components: {
    Header,
    kxImgTab,
    kxImgTabList
  }
};
</script>

<style scoped>
.homeKxEarchatNew {
  width: 100%;
  height: 100%;
  overflow: auto;
  box-sizing: border-box;
  background-color: #151111;
  color: #fff;
  padding-bottom: 52px;
}
.theItem{
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 6px 15px;
}
.foot-buttS{
    width: 100%;
    justify-content: center;
    display: flex;
    position: absolute;
    bottom: 10px; 
}
.buy-in{
    width: 40%;
    padding: 7px;
    background-color: green;
    color: #fff;
    margin-right: 10px;
}
.seller-out{
    width: 40%;
    padding: 7px;
    background-color: #da75ae;
    color: #fff;
    margin-right: 10px;
}
</style>
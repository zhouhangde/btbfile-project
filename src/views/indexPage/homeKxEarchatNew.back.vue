<template>
  <div class="homeKxEarchatNew">
    <Header :isLeft="true" :title="title"/>
    <div>
      <p class="theItem">
        <span>0.3325<small style="margin-left: 7px;font-size: 10px;color: #fff;">¥2.29</small></span>
        <span>24h最高<small style="margin-left: 7px;">0.3334</small></span>
      </p>
      <p class="theItem">
        <span>0.3325<small style="margin-left: 7px;font-size: 10px;color: #fff;">¥2.29</small></span>
        <span>24h最高<small style="margin-left: 7px;">0.3334</small></span>
      </p>
    </div>


    <iframe id="tradingview_782fd" name="tradingview_782fd" src="http://91bilong.com/chartinglibrary/index_black.html?stock=CSCCT&money=USDT" frameborder="0" allowtransparency="true" scrolling="no" allowfullscreen="" style="display: block; width: 100%; height: 350px;;">

	  </iframe>

    
    <kxImgTab :hqfilterData="hanqTabData"  @update="update"/>

     <!-- 涨幅跌幅信息 ，bottom-all-loaded上拉加载是否完成-->
     <!-- auto-fill若为真，loadmore 会自动检测并撑满其容器 -->
    <mt-loadmore
        :top-method="loadTop"
        :auto-fill="false"   
        ref="loadmore"
        >
        <div class="Datalist">
            <kxImgTabList v-for="(item,index) in zxorusData" :key="index" :zorjdata="item.myData"/>
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
       page: 1,   //当前页数
       size: 5,   //分页数
       allLoaded: false,   //是否已经加载完毕，无加载数据的开关
       bottomPullText: "上拉加载更多",   //底部的加载显示字样
       data: null,  //tab切换条件
        // websocket的相关数据
       ws: null,
       lockReconnect:false,
		   timer:null
    }
  },
  beforeRouteEnter(to, from, next) {
    next(vm => vm.getData());
  },
  created() {
    this.createWs("ws://47.75.39.0:8090");
    //发送数据
    this.sendMydata();
  },
  destroyed() {
      this.websock.close() //离开路由之后断开websocket连接
  },
  methods: {
    // 获取用户信息
    getData() {
       this.hanqTabData = myhanqTabData
       console.log('导航的title',this.hanqTabData)
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
      this.zxorusData = myzixuDataOne;
      // 判断是否有点击tab，初始状态this.data为null
      if(this.data){
        if(this.data.condition== "zixu"){
          // 加载自选数据
          console.log("加载涨幅数据");
          this.zxorusData = myzixuDataOne;
        }else{
          // 加载usdt的数据
          console.log("加载跌幅的数据");
          this.zxorusData = myusdtDataOne;
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
      // console.log(condation);
      this.data = condation;
      this.loadData();
    },
    // websocket相关
    createWs(url){
          try {
	        this.ws = new WebSocket(url);
	        this.init();
	      } catch(e) {
	        this.reconnect(url);
	      }
	      return this.ws
     },  
    reconnect:function() {
		  if(this.lockReconnect) {
		    return;
		  };
		  this.lockReconnect = true;
		  //没连接上会一直重连，设置延迟避免请求过多
		  this.timer && clearTimeout(this.timer);
		  var $this = this;
		  this.timer = setTimeout(function () {
		    $this.createWebSocket();
		    $this.lockReconnect = false;
		  }, 1000);
     },
     sendData:function(data){
        data = JSON.stringify(data);
        var $this = this;
        
        if (this.ws.readyState===1) {
            $this.ws.send(data);
        }
    },
    init:function(data,callBack){
        var $this = this
        this.ws.onopen = function(){
            window.openSend && window.openSend($this.ws.readyState)
        }
        this.ws.onmessage = function (res) { 
            var senData = JSON.parse(res.data)
            window.reviceMess && window.reviceMess(senData);
            switch(senData.id){
                case 1:
                     //  为CSCCTUSDT的id为1的最高值，最低值，成交量
                     window.revieceData1 && window.revieceData1(senData);
                break;     
                case null:
                    if(senData.method =='depth.update'){
                        // 我的交易挂单数据
                        window.revieceData17 && window.revieceData17(senData);
                    }else if(senData.method =='deals.update'){
                        // 为我要买和我要卖的实时数据
	         			window.revieceData61 && window.revieceData61(senData);
	         		}
                break;
            }
            // console.log('连接成功...')
        },
        this.ws.onclose = function(){ 
            $this.reconnect();
            // console.log("连接关闭..."); 
        },
        this.ws.onerror = function() {
            $this.reconnect();
            // console.log('发生异常了...');
        
        }
      },
      sendMydata:function(){
         var $this = this
         window.openSend = function(r){
			   function send1(){
                // 获取最高最低和成交量
                $this.sendData({"id":1,"method":"today.query","params":["CSCCTUSDT"]})
                //暂时不知
                $this.sendData({"id":20,"method":"server.ping","params":[]})
                //暂时不知
                $this.sendData({"id":17,"method":"depth.subscribe","params":["CSCCTUSDT",10,"0"]})
                //交易挂单中的数据
                $this.sendData({"id":30,"method":"server.auth","params":["8MLF4DEItozx5xQLev5lZGn862BZ5E0B_1561786555|web","web"]})
                $this.sendData({"id":61,"method":"deals.subscribe","params":["CSCCTUSDT"]})
                //暂时不知
                $this.sendData({"id":31,"method":"order.query","params":["CSCCTUSDT",0,50]})
                $this.sendData({"id":32,"method":"order.history","params":["CSCCTUSDT",0,0,0,10,0]})
                $this.sendData({"id":2,"method":"today.query","params":["CSCCTUSDT"]})
                $this.sendData({"id":2,"method":"today.query","params":["BTCUSDT"]})
                $this.sendData({"id":2,"method":"today.query","params":["ETHUSDT"]})
                $this.sendData({"id":2,"method":"today.query","params":["XRPUSDT"]})
                $this.sendData({"id":2,"method":"today.query","params":["EOSUSDT"]})
                $this.sendData({"id":2,"method":"today.query","params":["LTCUSDT"]})
                $this.sendData({"id":2,"method":"today.query","params":["BHBUSDT"]})
		      }
			    send1();
        },
        window.revieceData17 = function(res) {
            // 只需要交易挂单返回成功的数据
            if(res.params[0]){
                console.log('挂单数据',res)
            }
        },
        window.revieceData61 = function(res) {
            console.log('我要买和我要卖数据',res.params[1].slice(0,4))
            // 只需要我要买和我要卖返回成功的数据
        },
        window.revieceData1 = function(res) {
            console.log('usdt最高最低数据',res.result)
            // 只需要我要买和我要卖返回成功的数据
        },
        window.revieceData5= function(res) {
            console.log('首页轮播下的数据',res)
            // 只需要我要买和我要卖返回成功的数据
        }

      } 
      // websocket相关结束
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
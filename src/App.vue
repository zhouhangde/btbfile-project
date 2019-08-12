<template>
  <div id="app">
      <!-- keep-alive用于将全局的路由进行数据缓存 -->
      <keep-alive>
         <router-view/>
     </keep-alive>
  </div>
</template>

<script>
require('../src/components/jquery/jquery-2.0.3.min');
require('../src/components/http/http-gai');
export default {
  name: "app",
  created(){
     this.initWebsocket();
  },
  methods: {
    getLocation() {
    } 
  },
  methods: {
     initWebsocket(){
       var $this = this
       http.createWebSocket();

      //  获取当前登录人的信息
      let access_token = localStorage.getItem('access_token')
      let Params = access_token + '|web'
		
	     window.openSend = function(r){
			   function send1(){
                // 获取最高最低和成交量
                http.sendData({"id":1,"method":"today.query","params":["BTCUSDT"]})
                //暂时不知
                http.sendData({"id":20,"method":"server.ping","params":[]})
                //暂时不知
                http.sendData({"id":17,"method":"depth.subscribe","params":["BTCUSDT",10,"0"]})
                //交易挂单中的数据
                http.sendData({"id":30,"method":"server.auth","params":[Params,"web"]})
                http.sendData({"id":61,"method":"deals.subscribe","params":["BTCTUSDT"]})
                $this.sendHistory()
                $this.sendHightOrLow()  
                
		      }
          send1();
          // setInterval(function(){
          //   send1();
          // },5000)
        }
     },
     sendHistory(){
          window.revieceData30 = function(res) {
            // if(res.result && res.result.status == 'success') {
            //      //历史挂单，注意需要时"id":30发送成功后才发送有数据
            //       http.sendData({"id":31,"method":"order.query","params":["BTCUSDT",0,50]})   //此为当前委托的数据
            //       http.sendData({"id":32,"method":"order.history","params":["BTCUSDT",0,0,0,10,0]})  //此为历史委托的数据，即成交记录数据
            // }
            http.sendData({"id":31,"method":"order.query","params":["BTCUSDT",0,50]})   //此为当前委托的数据
            http.sendData({"id":32,"method":"order.history","params":["BTCUSDT",0,0,0,10,0]})  //此为历史委托的数据，即成交记录数据
         }
     },
     sendHightOrLow(){
         window.revieceData32 = function(res) {
            // 对应web端首页的7种交易对的最新价，24H涨跌，24H最高，24H最低，24H成交量
            http.sendData({"id":2,"method":"today.query","params":["BTCUSDT"]})
            http.sendData({"id":2,"method":"today.query","params":["ETHUSDT"]})
            http.sendData({"id":2,"method":"today.query","params":["XRPUSDT"]})
            http.sendData({"id":2,"method":"today.query","params":["EOSUSDT"]})
            http.sendData({"id":2,"method":"today.query","params":["LTCUSDT"]})
            http.sendData({"id":2,"method":"today.query","params":["WTCUSDT"]})
            
         }
     }
  },
};
</script>

<style scoped>
#app {
  width: 100%;
  height: 100%;
  font-size: 14px;
  background: #f1f1f1;
}
</style>

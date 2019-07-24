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
       http.createWebSocket();
		
	     window.openSend = function(r){
			   function send1(){
                // 获取最高最低和成交量
                http.sendData({"id":1,"method":"today.query","params":["CSCCTUSDT"]})
                //暂时不知
                http.sendData({"id":20,"method":"server.ping","params":[]})
                //暂时不知
                http.sendData({"id":17,"method":"depth.subscribe","params":["CSCCTUSDT",10,"0"]})
                //交易挂单中的数据
                http.sendData({"id":30,"method":"server.auth","params":["8MLF4DEItozx5xQLev5lZGn862BZ5E0B_1561786555|web","web"]})
                http.sendData({"id":61,"method":"deals.subscribe","params":["CSCCTUSDT"]})
                //暂时不知
                http.sendData({"id":31,"method":"order.query","params":["CSCCTUSDT",0,50]})
                http.sendData({"id":32,"method":"order.history","params":["CSCCTUSDT",0,0,0,10,0]})

                // 对应web端首页的7种交易对的最新价，24H涨跌，24H最高，24H最低，24H成交量
                http.sendData({"id":2,"method":"today.query","params":["CSCCTUSDT"]})
                http.sendData({"id":2,"method":"today.query","params":["BTCUSDT"]})
                http.sendData({"id":2,"method":"today.query","params":["ETHUSDT"]})
                http.sendData({"id":2,"method":"today.query","params":["XRPUSDT"]})
                http.sendData({"id":2,"method":"today.query","params":["EOSUSDT"]})
                http.sendData({"id":2,"method":"today.query","params":["LTCUSDT"]})
                http.sendData({"id":2,"method":"today.query","params":["BHBUSDT"]})
		      }
          send1();
          setInterval(function(){
            send1();
          },3000)
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

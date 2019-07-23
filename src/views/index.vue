<template>
  <div class="index">
    <!-- keep-alive用于将全局的路由进行数据缓存 -->
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
    <TabBar :data="tabbarData"/>
  </div>
</template>

<script>

import TabBar from "../components/TabBar";
require('../../src/components/jquery/jquery-2.0.3.min');
require('../../src/components/http/http-gai');
export default {
  name: "index",
  data() {
    return {
      tabbarData: [
        { title: "首页", icon: "gg", path: "/home" },
        { title: "行情", icon: "credit-card", path: "/hanq" },
        { title: "交易", icon: "bandcamp", path: "/jiaoyi" },
        { title: "OTC", icon: "yen (alias)", path: "/otc" },
        { title: "我的", icon: "user", path: "/me" }
      ]
    };
  },
  created(){
     this.initWebsocket();
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
        }
     }
  },
  components: {
     TabBar
  }
};
</script>

<style scoped>
.index {
  width: 100%;
  height: calc(100% - 45px);
}
</style>

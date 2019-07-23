<template>
  <div class="websocket">
    <iframe id="tradingview_782fd" name="tradingview_782fd" src="http://www.btbfire.com/chartinglibrary/index_black.html?stock=CSCCT&money=USDT" frameborder="0" allowtransparency="true" scrolling="no" allowfullscreen="" style="display: block; width: 100%; height: 925px;">

	 </iframe>
  </div>
</template>

<script>
export default {
  name: "websocket",
  data() {
    return {
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
      
    },
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
                        // 最新成交的数据
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
            // 只需要交易挂单返回成功的数据（也对应为我要买和我要卖的数据）
            if(res.params[0]){
                console.log('挂单数据',res)
            }
        },
        window.revieceData61 = function(res) {
            // 最新成交
            console.log('我要买和我要卖数据',res.params[1].slice(0,4))
        },
        window.revieceData1 = function(res) {
            console.log('usdt最高最低数据',res.result)
        },
        window.revieceData32 = function(res) {
            // 历史委托
            console.log('历史委托数据',res)
        }
      } 
  },
  components: {
     
  }
};
</script>

<style scoped>
.websocket {
  width: 100%;
  height: 100%;
  overflow: auto;
  box-sizing: border-box;
}
</style>
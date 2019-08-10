(function(window,document){
	function Http(name,url){
		this.name = name;
		this.URL = url
		this.info = function(data){ 
			console.log(info);
		}
		this.failer = function(data){
			console.log(failer);
		}
		this.confirmTip = function(data,callBack){
			console.log(confirmTip);
		}
		this.assign = function(obj,data){
							for(var i in data){
								obj[i] = data[i]
							}
							return obj;
					},
		this.publicData = {
			chain_network:'main_network',
			os:'web',
			os_ver:'1.0.0',
			soft_ver:'1.0.0',
			language:'zh_cn'
		}
	}
	
	Http.prototype = {
		construct:Http,
		lockReconnect:false,
		ws:null,
		timer:null,
		sendFlag:false,
		// url:'ws://47.244.61.7:8090',   //btbfile的
		url:'ws://47.52.130.245:8090',
		post:function(url,data,callBack,failer){
			var token = localStorage.getItem('access_token'); 
			if(token !='undefined' && token != null ){
				this.assign(data,{access_token:token})
			}
			this.assign(data,this.publicData);
			var $url = '';
			if(/(^https?:\/\/)|(^\d{3}.\d{1,3}.\d{1,3}.\d{1,3}:\d{0,4})/.test(url)){
				$url = url
			}else{
				$url = this.URL + url
			}
			var $this = this;
			//console.log(url);
			$.post($url,data,function(res){
				if($url == '/api/chat/init-pc'){
					callBack && callBack(res)
				}
				if(res.code == 200 && $url != '/api/chat/init-pc'){
					callBack && callBack(res)
					//$this.alert(res.message)
				}else{
					if(url == 'withdraw/generate-address'||url == 'bank/withdraw-prepare'){
						callBack && callBack(res);
					}
					if(res.token_status===0){
						window.localStorage.clear();
						window.sessionStorage.clear();

					}
					failer && failer(res)
				}
				
			},'json')
		      
		},
		createWebSocket:function() {
			// var $url = 'ws://192.168.1.208:8090/'   //btbfile的
			var $url = 'ws://47.52.130.245:8090/'  //91bilong的
			var that = this;
			// this.post('http://www.btbfire.com/api/init/info',{},function(res){
			// 	that.createWs(res.data.via_websocket_url)
			// },function(){
			// 	that.createWs($url);
			// })
			this.post('http://91bilong.com/api/init/info',{},function(res){
				that.createWs(res.data.via_websocket_url)
			},function(){
				that.createWs($url);
			})
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
	  close:function(){
		$this.close();
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
			  	if (this.ws && this.ws.readyState===1) {
					   $this.ws.send(data);
				}
		},
		init:function(data,callBack){
			//console.log($this.ws.readyState)
			var $this = this
			 this.ws.onopen = function(){
			 	    window.openSend && window.openSend($this.ws.readyState)
			}
			 this.ws.onmessage = function (res) { 
			  	var senData = JSON.parse(res.data)
	         	window.reviceMess && window.reviceMess(senData);
	         	switch(senData.id){
	         		case 1:
	         		window.revieceData1 && window.revieceData1(senData);
	         		break;
	         		case 2:
	         		window.revieceData2 && window.revieceData2(senData);
	         		break;
	         		case 3:
	         		window.revieceData3&& window.revieceData3(senData);
	         		break;
	         		case 4:
	         		window.revieceData4&& window.revieceData4(senData);
	         		break;
	         		case 5:
	         		window.revieceData5 && window.revieceData5(senData);
					break;
					case 6:
	         		window.revieceData6 && window.revieceData6(senData);
	         		break;
	         		case 30:
	         		window.revieceData30 && window.revieceData30(senData);
	         		break;
	         		case 31:
	         		window.revieceData31 && window.revieceData31(senData);
	         		break;
	         		case 32:
	         			window.revieceData32 && window.revieceData32(senData);
	         		break;
	         		case null:

	         			if(senData.method =='depth.update'){
	         				window.revieceData17 && window.revieceData17(senData);
	         			}else if(senData.method =='deals.update'){
	         				window.revieceData61 && window.revieceData61(senData);
	         			}
	         			
	         		break;
	         	}
	       	  };
	       	  this.ws.onclose = function(){ 
	             $this.reconnect();
	       	  };
	   	      this.ws.onerror = function() {
	   	      	$this.reconnect();
			   };
		}
	}
	
	var http = new Http('request','/api/')
	window.http = http
}(window,document))


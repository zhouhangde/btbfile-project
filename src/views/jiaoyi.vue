<template>
  <div class="jiaoyi">
    <!-- 头部导航及相关图标 -->
    <Header :title="title" 
    :xial="xial" 
    :xin="xin" 
    :bizhStaus="bizhStaus"
    :biao="biao" :aside="aside" 
    @condit="condit"
    @gomyhomeKxEarchatNew="gomyhomeKxEarchatNew"
    @addOrDeleteSj="addOrDeleteSj"  
    @showAction="showactionSheet"/>

    <!-- 可用的上半部分 -->
    <div class="center-contain">
      <!-- 左侧的内容 -->
      <div class="center-contain-left">
        <!-- 导航买入卖出tab -->
        <JiaoyiTab :filterData="jiaoyiTabData" @update="update"/>

        <!-- 限单价 -->
        <div>
          <div style="text-align:left;padding:10px 0;color:#999">限单价></div>
          <!-- <AddOrIncreas :dataNumberr="theDj" class="jishukone"/> -->
          <div class="jishuktwo">
            <span style="padding: 0 3px;" @click="decreaseCount">-</span>
            <!-- 数量 -->
            <input type="text" v-model="theDj.x" style="text-align: center;width: 66%;"/>
            <span style="padding: 0 3px;" @click="increaseCount">+</span>
          </div>
        </div>

        <!-- 估值 -->
        <div>
           <div style="text-align:left;padding:10px 0;color:#999">估值 :
              <span><i class="fa fa-yen (alias)" style="margin-right:5px"></i>{{guzhi}}</span>
          </div>
          <div class="jishuktwo">
            <span style="padding: 0 3px;" @click="godecreaseCount">-</span>
            <!-- 数量 -->
            <input type="text" v-model="themount" style="text-align: center;width: 66%;"/>
            <span style="padding: 0 3px;" @click="goincreaseCount">+</span>
          </div>
        </div>
        
        <!-- 合计 -->
        <div style="margin-top:10px">
          <div style="color: rgb(153, 153, 153);padding: 10px 0px;">合计:</div>
          <!-- 总额：单价*数量 -->
          <button style="width:100%;padding:5px 0px;text-align:center;border: 1px solid #e0e0e6;">{{theTotal}}</button>
        </div>

        <!-- 买入和卖出tab切换显示 -->
        <div style="margin-top:5px">
           <button style="width:100%;padding:5px 0px;text-align:center;color:#fff;" :class="{'inputru':inputru}" v-if="inputru" @click="buyCoin">买入</button>
           <button style="width:100%;padding:5px 0px;text-align:center;color:#fff;" :class="{'output':output}" v-else @click="sellerCoin">卖出</button>
        </div>

      </div>
      <!-- 左侧的内容结束 -->

      <!-- 右侧的内容 -->
      <div class="center-contain-right">
         <!-- 价格和数量的上半部分 -->
         <ul>
           <li id="sun">
             <div class="itemShop itemShopzf">
               <span style="color:#999;">价格</span>
               <span style="color:#999;">数量</span>
             </div>
             <div class="itemShop itemShopzf" @click="sendPrice($event)" v-for="(item,index) in pkData.asks.slice(0,5)" :key="index">
               <span class="itemprice">{{item[0]}}</span>
               <span>{{item[1]}}</span>
             </div>
           </li>
         </ul>
         
         <!-- 当前的最新价 -->
         <div class="pjprice">{{currentLast}}</div>
         
         <!-- 价格和数量的下半部分 -->
         <ul style="padding-top:10px">
           <li id="num">
             <div class="itemShop itemShopdf" @click="sendPrice($event)" v-for="(item,index) in pkData.bids.slice(0,5)" :key="index"> 
               <span>{{item[0]}}</span>
               <span>{{item[1]}}</span>
             </div>
           </li>
         </ul>

      </div>
      <!-- 右侧的内容结束 -->
    </div>
    <!-- 可用的上半部分结束 -->

    <!-- 可用部分的 -->
    <div class="inputPrice-foot">
      <div class="inputPrice-center">
        <div class="inputPrice">
            <span>可用
              <em v-if="inputru">{{buyAvailable}}USDT</em>
              <em v-else>{{sellerAvailable}}{{currentBizh}}</em>
            </span>
        </div>
      </div>
    </div>
    <!-- 可用部分的结束 -->

    <!-- 当前委托的内容 -->
    <div class="myfoot"  style="padding-bottom: 45px;" v-if="showCurrent">
      <div style="padding: 11px;font-size: 16px;font-weight: bolder;">当前委托</div>
      <div style="display: flex;padding: 10px;align-items: center;justify-content: space-between;border-bottom: 1px solid #ded3d3;" 
        v-for="(item,index) in myCurrentData" :key="index"
        >
        <div :class="{'goBuy':item.side == 2,'goSeller':item.side == 1}">
          {{item.side == 1?'卖':'买'}}
        </div>
        <div>
          <p class="theItem">
            <!-- item.market  ---交易对 -->
            <span style="color: rgb(153, 153, 153);">数量:<small>{{item.amount}}</small></span>
          </p>
          <p class="theItem">
            <span style="color: rgb(153, 153, 153);">价格:<small>{{item.price}}</small></span>
          </p>
          <p class="theItem">
            <span style="color: rgb(153, 153, 153);">总价:<small style="font-size: 18px;font-weight: bolder;color: #000;">{{(item.amount * item.price).toFixed(2)}}</small></span>
          </p>
        </div>
        <div>
          <p>
            <span style="color: rgb(153, 153, 153);">{{item.ctime | formatDate}}</span>
          </p>
          <p style="text-align: center;margin-top: 15px;">
            <button style="padding: 7px 15px;border: 1px solid #0d9ce2;border-radius: 15px;color: #0d9ce2;" @click="cancelOrder(item)">撤销</button>
          </p>
        </div>
      </div> 

    </div>
    <!-- 当前委托的内容结束 -->

    <!-- 上拉的sheet显示开关，显示成交记录 -->
    <mt-actionsheet
      :actions="actions"
      v-model="sheetVisible">
    </mt-actionsheet>
    
  </div>
</template>

<script>
//交易的tab标题
const myjiaoyiTabData = require('../../data/jiaoyiTabData.json');
import { Actionsheet,Popup,Indicator } from 'mint-ui';
import { Toast } from "mint-ui";
import Header from "../components/Header";
import JiaoyiTab from "../components/jiaoyi/JiaoyiTab";
import AddOrIncreas from "../components/jiaoyi/AddOrIncreas";
import moment from 'moment'  //时间转化工具
import {
    cancelOrder,   //撤销交易委托数据
    getBalance,    //获取买和卖的交易对的可用余额
    getXinStaus,   // 获取收藏状态
    buyCoin,   //买入 
    deleteShouc,  //取消收藏
    addShouc,   //添加收藏
    sellerCoin   //卖出
} from '../../src/api/jiaoyi/jiaoyi'
// import { setInterval } from 'timers';
export default {
  name: "jiaoyi",
  data() {
    return {
      title:'BTC/USDT',
      xial:true, 
      xin:true,
      biao:true,
      aside:true,
      jiaoyiTabData:{},   //交易的tab标题
      data:null,  //买入卖出的tab切换条件
      inputru:true,  //默认显示买入样式
      output:false,   //卖出的样式
      //单价数，//使用对象则可以父子组件都可以改变此值，传number此只会传一次
      theDj:{x:0}, 
      //估值
      theDjs:{y:0},
       //估值数量
      themount:0, 
      // 底部的弹出成交记录
      actions:[{
        // icon: 'icon-article', // 引入iconfont的类名作为展示的icon
        name: '成交记录', // 引入文字作为标题
        method : this.cjHistory
      }],
      sheetVisible:false, //上拉的sheet显示开关
      changScState:false,  //收藏状态开关
      pkData:{     //右侧的交易挂单数据
         asks:[],
         bids:[]
       },
       buyAvailable:0,   //买入币的可用
       sellerAvailable:0,  //买出币的可用
       bizhStaus:{
         staus:false
       },  //收藏状态
       currentBizh:'BTC',  //存储当前的bizhong
       accessToken:'',
       myCurrentData:[],   //当前委托的数据
       currentLast:'',  //当前的最后价格
       showCurrent:true,  //显示当前委托开关
       timer:null   //定时器
    };
  },
  computed:{
    // 计算估值
    guzhi:function (){
      return (this.theDj.x * 6.88).toFixed(4);
    },
    //合计
    theTotal:function (){
      return (this.theDj.x * this.themount).toFixed(4);
    }
  },
  filters: {
    //日期转化
    formatDate: function (value) {
      value = parseInt(value)*1000
      return moment(value).format('YYYY-MM-DD HH:mm:ss')
    }
  },
  beforeRouteEnter(to, from, next) {
    // 判断是否进行下拉切换传值
    if(to.params.slectBz){
       next(vm => vm.getData(to.params));
    }else{
       next(vm => vm.getData());
    }
  },
  beforeRouteLeave(to, from, next) {
    // window.clearInterval(window.timer); 
    // window.timer = null; 

    clearInterval(this.timer); 
    this.timer = null;   
    next()
  },
  methods: {
    getData(data) {
      let access_token = localStorage.getItem('access_token')
      this.accessToken = access_token

      var $this = this
      //获取tab导航标题
      this.jiaoyiTabData = myjiaoyiTabData   

      // window.timer =window.setInterval(function(){
      //      // 某些定时器操作 
      //     console.log('定时',+new Date())
      // }, 1000); 

      $this.timer = setInterval(function(){
           // 接收我的委托数据，必须先发送30  
          http.sendData({"id":30,"method":"server.auth","params":[access_token+"|web","web"]})
      }, 1000); 

      // 根据路由参数，进行相应币种的websocket数据发送
      if(data != undefined && data != null && data != ''){
         $this.title = data.title   //切换title
         switch(data.slectBz) {
            case 'BTCUSDT':
                http.sendData({"id":6,"method":"today.query","params":["BTCUSDT"]})
                http.sendData({"id":1,"method":"depth.subscribe","params":["BTCUSDT",10,"0"]})
                // http.sendData({"id":31,"method":"today.query","params":["BTCUSDT"]})
                http.sendData({"id":32,"method":"deals.subscribe","params":["BTCUSDT"]})
                // http.sendData({"id":31,"method":"order.query","params":["BTCUSDT",0,50]})  //当前的委托
                $this.currentBizh = 'BTC'
                $this.getBalance('BTC|USDT');  //获取买和卖的交易对的可用余额
                $this.getXinStaus('BTCUSDT');   //获取是否收藏为自选
                break;
            case 'ETHUSDT':
                  http.sendData({"id":6,"method":"today.query","params":["ETHUSDT"]})
                  http.sendData({"id":1,"method":"depth.subscribe","params":["ETHUSDT",10,"0"]})
                  http.sendData({"id":32,"method":"deals.subscribe","params":["ETHUSDT"]})
                  $this.currentBizh = 'ETH'
                  $this.getBalance('ETH|USDT');  //获取买和卖的交易对的可用余额
                  $this.getXinStaus('ETHUSDT');   //获取是否收藏为自选
                break;
            case 'XRPUSDT':
                http.sendData({"id":6,"method":"today.query","params":["XRPUSDT"]})
                http.sendData({"id":1,"method":"depth.subscribe","params":["XRPUSDT",10,"0"]})
                http.sendData({"id":32,"method":"deals.subscribe","params":["XRPUSDT"]})
                $this.currentBizh = 'XRP'
                $this.getBalance('XRP|USDT');  //获取买和卖的交易对的可用余额
                $this.getXinStaus('XRPUSDT');   //获取是否收藏为自选
                break;
            case 'EOSUSDT':
                http.sendData({"id":6,"method":"today.query","params":["EOSUSDT"]})
                http.sendData({"id":1,"method":"depth.subscribe","params":["EOSUSDT",10,"0"]})
                http.sendData({"id":32,"method":"deals.subscribe","params":["EOSUSDT"]})
                $this.currentBizh = 'EOS'
                $this.getBalance('EOS|USDT');  //获取买和卖的交易对的可用余额
                $this.getXinStaus('EOSUSDT');   //获取是否收藏为自选
                break;
            case 'LTCUSDT':
                http.sendData({"id":6,"method":"today.query","params":["LTCUSDT"]})
                http.sendData({"id":1,"method":"depth.subscribe","params":["LTCUSDT",10,"0"]})
                http.sendData({"id":32,"method":"deals.subscribe","params":["LTCUSDT"]})
                $this.currentBizh = 'LTC'
                $this.getBalance('LTC|USDT');  //获取买和卖的交易对的可用余额
                $this.getXinStaus('LTCUSDT');   //获取是否收藏为自选
                break;
            case 'WTCUSDT':
                http.sendData({"id":6,"method":"today.query","params":["WTCUSDT"]})
                http.sendData({"id":1,"method":"depth.subscribe","params":["WTCUSDT",10,"0"]})
                http.sendData({"id":32,"method":"deals.subscribe","params":["WTCUSDT"]})
                $this.currentBizh = 'WTC'
                $this.getBalance('WTC|USDT');  //获取买和卖的交易对的可用余额
                $this.getXinStaus('WTCUSDT');   //获取是否收藏为自选
                break;                    
         } 
      }else{
         http.sendData({"id":6,"method":"today.query","params":["BTCUSDT"]})
         http.sendData({"id":1,"method":"depth.subscribe","params":["BTCUSDT",10,"0"]})
         http.sendData({"id":32,"method":"deals.subscribe","params":["BTCUSDT"]})
         this.getBalance('BTC|USDT');  //获取买和卖的交易对的可用余额
         this.getXinStaus('BTCUSDT');   //获取是否收藏为自选
      }

      // 存储usdt最高最低数据 
      window.revieceData6= function(res) {
        if(res.result != null && res.result !='' && res.result != undefined){
           return $this.storeCurrentLastData(res)
        } 
       }

      // 获取右侧交易挂单的数据cscct/usdt
      window.revieceData17 = function(res) {
            // 只需要交易挂单返回成功的数据（也对应为我要买和我要卖的数据）
            if(res.params[0]){
                return $this.storePkData(res)
            }
      };
      
      //获取当前委托的数据之前的判断
      window.revieceData30 = function(res) {
        if(res.result && res.result.status == 'success') {
              //历史挂单，注意需要时"id":30发送成功后才发送有数据
              http.sendData({"id":31,"method":"order.query","params":[$this.currentBizh+"USDT",0,50]})   //此为当前委托的数据
        }else{
          $this.myCurrentData = []  //清空当前的交易委托数据
        }
      }

      // 获取当前委托的数据
      window.revieceData31 = function(res) {
            if(res.result!=null && res.result!=undefined && res.result!=''){
                // 只需要交易挂单返回成功的数据（也对应为我要买和我要卖的数据）
                return $this.storeCurrentData(res) 
            } 
      };
      
      this.openWatite();   //开启提示等待
      this.loadData();   //买入卖出tab切换，加载
    },
     //初始加载数据
    loadData() {
      // 判断是否有点击tab，初始状态this.data为null
      if(this.data){
        if(this.data.condition== "mairu"){
          // 加载买数据
          this.output = false;
          this.inputru = true;
        }else{
          // 加载卖的数据
          this.inputru = false;
          this.output = true;
        }
      }
    },
    //撤销交易委托数据
    cancelOrder(detail){
        var me = this
        let order_id =  detail.id
        let market = detail.market
        let access_token = this.accessToken
        cancelOrder({
          order_id: order_id,
          access_token: access_token,  //无token时获取的买与卖的可用余额都为0
          market: market
        }).then((res) => {
          if(res.data.code == '200'){
              Toast({
                message: '撤销成功',
                position: "bottom",
                duration: 2000
              });
          }else{
             Toast({
                message: res.data.message,
                position: "bottom",
                duration: 2000
              });
              return;
          }
        });
    },
    // 单价减少
    decreaseCount(){
       if(this.theDj<='0.1'){
        return
      }
      this.theDj.x =Number(this.theDj.x).sub(0.00000001).toFixed(8)
    },
    // 单价增加
    increaseCount(){
       this.theDj.x = Number(this.theDj.x).add(0.00000001).toFixed(8);
    },
    // 估值减少
    godecreaseCount(){
       if(this.themount<='0.1'){
        return
      }
       this.themount = Number(this.themount).sub(0.0001).toFixed(4);
    },
    // 估值增加
    goincreaseCount(){
       this.themount = Number(this.themount).add(0.0001).toFixed(4);
    },
    //tab切换，根据点击tab的条件加载数据
    update(condation) {  
      this.data = condation;
      this.loadData();
    },
    // 进入充值
    toinput(){
      this.$router.push({name:'chongz'});
    },
    // 进入成交记录
    cjHistory(){
       this.$router.push({name:'cjHistory',params:{titleBefore:this.currentBizh,titleAfter:'USDT'}});   
    },
    //显示成交记录上拉的操作菜单
    showactionSheet(){
    	// 打开action sheet
      this.sheetVisible = true;
    },
    //点击title显示下拉的市场
    condit(condit){
      this.$router.push({name:'shichan'});
    },
    // 点击挂单的单条数据,获取其当前价格和数量
    sendPrice(dom){
       // target表示当前点击的元素非父元素
       let selectPrice = dom.currentTarget.childNodes.item(0).innerText;
       let selectMount = dom.currentTarget.childNodes.item(1).innerText;
       this.theDj.x =new Number(selectPrice)
       this.themount = selectMount
    },
    //存储交易挂单的数据
    storePkData(data){
      this.pkData = {
          asks:data.params[1].asks,
          bids:data.params[1].bids
      }
    },
    //存储当前委托的数据
    storeCurrentData(data){
        this.myCurrentData = data.result.records
    },
    //存储当前币种最终的数据
    storeCurrentLastData(data){
        this.currentLast = data.result.last 
    },
    //获取买和卖的交易对的可用余额
    getBalance(asset_type){
       var me = this
       getBalance({
          asset_type: asset_type,
          access_token: me.accessToken,  //无token时获取的买与卖的可用余额都为0
          chain_network: 'main_network'
        }).then((res) => {
          if(res.data.code == '200'){
              let theData = res.data.data.list
              // 此处暂时将数组的第一个作为买入的数据
              me.buyAvailable = theData[0].available
              me.sellerAvailable = theData[1].available
          }else{
             Toast({
                message: res.data.message,
                position: "bottom",
                duration: 2000
              });
              return;
          }
        });  
    },
    openWatite(){
        // 加载动画
        Indicator.open({
          text: '加载中...',
          spinnerType: 'fading-circle'
        });
    },
    // 获取收藏状态
    getXinStaus(bizh){
       var $this = this
       getXinStaus({
          'access_token': $this.accessToken,   //无access_token时获取的收藏状态都为0，即未收藏状态
          'chain_network': 'main_network',
          'os': 'web',
          'os_ver': '1.0.0',
          'soft_ver': '1.0.0',
          'language': 'zh_cn'
        }).then(res => {
          if(res.data.code == '200'){
              let bizhList = res.data.data[0].list
              let currentBz = bizhList.filter((item, index, arr) => item.name  == bizh)
              if(currentBz[0].status == 0){
                $this.bizhStaus.staus = false
              }else{
                $this.bizhStaus.staus = true
              }
          }else{
            $this.$toast({
                message: res.data.message,
                position: "bottom",
                duration: 2000
              });
              return;
          }
        })
    },
    // 买入
    buyCoin(){
       var $this = this
      if($this.accessToken ==null || $this.accessToken ==undefined || $this.accessToken ==''){
         $this.$toast({
            message: '请先登录，方可买入操作',
            position: "bottom",
            duration: 2000
            });
          return;   
      }
      buyCoin({
          'market': $this.currentBizh+'USDT',
          'side': '2',
          'pride': $this.theDj.x + '',
          'amount': $this.themount,
          'access_token': $this.accessToken,
          'chain_network': 'main_network'
        }).then(res => {
          if(res.data.code == '200'){
              // 检验成功 设置登录状态并且跳转到/
               $this.$toast({
                message: '买入成功',
                position: "bottom",
                duration: 2000
               });
               $this.getBalance();
          }else{
            $this.$toast({
                message: res.data.message,
                position: "bottom",
                duration: 2000
              });
              return;
          }
        })
    },
    // 收藏或取消收藏
    addOrDeleteSj(condition){
        if(condition.condition){
           this.addShouc(this.currentBizh)
        }else{
           this.deleteShouc(this.currentBizh)
        }
    },
    //取消收藏
    deleteShouc(currentBizh){
      var $this = this
       if($this.accessToken ==null || $this.accessToken ==undefined || $this.accessToken ==''){
         $this.$toast({
            message: '请先登录，方可进行取消收藏',
            position: "bottom",
            duration: 2000
            });
          return;   
       }
       deleteShouc({
          'os_ver':'',
          'access_token':$this.accessToken,
          'stock':currentBizh,
          'money':'USDT',
          'language':'zh_cn',
          'soft_ver':'2.0.0',
          'chain_network':'main_network',
          'os':'android'
        }).then(res => {
          if(res.data.code == '200'){
              // 检验成功 设置登录状态并且跳转到/
               $this.$toast({
                message: '取消收藏成功',
                position: "bottom",
                duration: 2000
               });
          }else{
            $this.$toast({
                message: res.data.message,
                position: "bottom",
                duration: 2000
              });
              return;
          }
        })
    },
    //添加收藏
    addShouc(currentBizh){
       var $this = this
       if($this.accessToken ==null || $this.accessToken ==undefined || $this.accessToken ==''){
         $this.$toast({
            message: '请先登录，方可进行收藏',
            position: "bottom",
            duration: 2000
            });
          return;   
       }
       addShouc({
          'os_ver':'',
          'access_token':$this.accessToken,
          'stock':currentBizh,
          'money':'USDT',
          'language':'zh_cn',
          'soft_ver':'2.0.0',
          'chain_network':'main_network',
          'os':'android'
        }).then(res => {
          if(res.data.code == '200'){
              // 检验成功 设置登录状态并且跳转到/
               $this.$toast({
                message: '收藏成功',
                position: "bottom",
                duration: 2000
               });
          }else{
            $this.$toast({
                message: res.data.message,
                position: "bottom",
                duration: 2000
              });
              return;
          }
        })
    },
    // 卖出
    sellerCoin(){
       var $this = this
       if($this.accessToken ==null || $this.accessToken ==undefined || $this.accessToken ==''){
         $this.$toast({
            message: '请先登录，方可卖出操作',
            position: "bottom",
            duration: 2000
            });
          return;   
       }
       sellerCoin({
          'market': $this.currentBizh+'USDT',
          'side': '1',
          'pride': $this.theDj.x + '',
          'amount': $this.themount,
          'access_token': $this.accessToken,
          'chain_network': 'main_network'
        }).then(res => {
          if(res.data.code == '200'){
              // 检验成功 设置登录状态并且跳转到/
               $this.$toast({
                message: '卖出成功',
                position: "bottom",
                duration: 2000
               });
               $this.getBalance();
               http.sendData({"id":30,"method":"server.auth","params":[$this.accessToken+"|web","web"]})  //为了获取当前委托
          }else{
            $this.$toast({
                message: res.data.message,
                position: "bottom",
                duration: 2000
              });
              return;
          }
        })
    },
    // 进入k线页面
    gomyhomeKxEarchatNew(){
        this.$router.push({name:'homeKxEarchatNew',params:{titleBefore:this.currentBizh,titleAfter:'USDT'}})
    }
  },
  components: {
      Header,
      JiaoyiTab,
      AddOrIncreas
  }
};
</script>

<style scoped>
  .center-contain{
    display: flex;
    flex-direction: row;
    flex: 1;
    justify-content: space-between
  }
  .center-contain-left{
    padding: 5px 5px 21px 5px;
    width: 50%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  .center-contain-right{
    padding: 5px;
    width: 50%;
  }
  .itemShop{
    display: flex;
    flex-direction: row;
    flex: 1;
    justify-content: space-between;
    padding: 4px;
  }
  .jishukone{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding: 5px 0;
    border: 1px solid #ccc;
  }
   .jishuktwo{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding: 5px 0;
    border: 1px solid #e0e0e6;

  }
  .jishuktwo span{
    color:#999;
  }
  .center-contain-right ul{
    padding-bottom: 10px;
  }
  .pjprice{
    padding: 10px 0px;
    border-top: 1px solid rgb(222, 214, 214);
    border-bottom: 1px solid rgb(222, 214, 214);
    text-align: center;
    color:#000;
    font-weight:500;
  }
  .itemShopzf span:first-child{
    color: red
  }
  .itemShopdf span:first-child{
    color: green
  }
  .inputPrice-foot{
    padding: 6px 0;
    background-color: #d6d2da6b;
  }
  .inputPrice-center{
    background-color: #fff;
  }
  .inputPrice{
    display: flex;
    justify-content: space-between;
    padding: 11px;
    align-items: center;
  }
  .toinput{
    padding: 3px;
    border:1px solid #ccc;
    color:#999;
    border-radius: 3px;
  }
  .inputru{
   background-color:rgb(70,170,144);
   color:#fff;
  }
  .output{
   background-color:#e27373
  }
  #num span:nth-child(2){
    color:#999;
  }
  #sun span:nth-child(2){
    color:#999;
  }
  .theItem{
    padding: 5px 0;
  }
  .goSeller{
    width: 40px;
    background-color: #d12d2d;
    height: 40px;
    line-height: 40px;
    text-align: center;
    border-radius: 100%;
    color: #fff;
  }
  .goBuy{
    width: 40px;
    background-color: #51c861;
    height: 40px;
    line-height: 40px;
    text-align: center;
    border-radius: 100%;
    color: #fff;
  }

</style>
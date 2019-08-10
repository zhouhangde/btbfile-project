<template>
  <div class="jiaoyi">
    <Header :title="title" 
    :xial="xial" 
    :xin="xin" 
    :bizhStaus="bizhStaus"
    :biao="biao" :aside="aside" 
    @condit="condit"
    @gomyhomeKxEarchatNew="gomyhomeKxEarchatNew"
    @addOrDeleteSj="addOrDeleteSj"
    @showAction="showactionSheet"/>
    <div class="center-contain">
      <div class="center-contain-left">
        <!-- 导航买入卖出 -->
        <JiaoyiTab :filterData="jiaoyiTabData" @update="update"/>
        <div>
          <div style="text-align:left;padding:10px 0;color:#999">限单价></div>
          <AddOrIncreas :dataNumberr="theDj" class="jishukone"/>
        </div>

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
        
        <div style="margin-top:10px">
          <div style="color: rgb(153, 153, 153);padding: 10px 0px;">合计:</div>
          <!-- 总额：单价*数量 -->
          <button style="width:100%;padding:5px 0px;text-align:center;border: 1px solid #e0e0e6;">{{theTotal}}</button>
        </div>
        <div style="margin-top:5px">
           <button style="width:100%;padding:5px 0px;text-align:center;color:#fff;" :class="{'inputru':inputru}" v-if="inputru" @click="buyCoin">买入</button>
           <button style="width:100%;padding:5px 0px;text-align:center;color:#fff;" :class="{'output':output}" v-else @click="sellerCoin">卖出</button>
        </div>
      </div>
      <div class="center-contain-right">
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
         <div class="pjprice">1/￥6.88</div>
         <ul style="padding-top:10px">
           <li id="num">
             <div class="itemShop itemShopdf" @click="sendPrice($event)" v-for="(item,index) in pkData.bids.slice(0,5)" :key="index"> 
               <span>{{item[0]}}</span>
               <span>{{item[1]}}</span>
             </div>
           </li>
         </ul>
      </div>
    </div>
    <div class="inputPrice-foot">
      <div class="inputPrice-center">
        <div class="inputPrice">
            <span>可用
              <em v-if="inputru">{{buyAvailable}}CNY</em>
              <em v-else>{{sellerAvailable}}{{currentBizh}}</em>
            </span>
        </div>
      </div>
    </div>
    <div class="myfoot"  style="padding-bottom: 45px;">
      <div style="padding: 11px;font-size: 16px;font-weight: bolder;">当前委托</div>

      <!-- <div style="display: flex;padding: 10px;align-items: center;justify-content: space-between;border-bottom: 1px solid #ded3d3;">
        <div class="goSeller"> 
          卖
        </div>
        <div>
          <p class="theItem">
            <span style="color: rgb(153, 153, 153);">数量:<small>0.0/0.1</small></span>
          </p>
          <p class="theItem">
            <span style="color: rgb(153, 153, 153);">价格:<small>11891.2</small></span>
          </p>
          <p class="theItem">
            <span style="color: rgb(153, 153, 153);">总价:<small style="font-size: 18px;font-weight: bolder;color: #000;">1189.12</small></span>
          </p>
        </div>
        <div>
          <p>
            <span style="color: rgb(153, 153, 153);">2019-08-09 11:46:29</span>
          </p>
          <p style="text-align: center;margin-top: 15px;">
            <button style="padding: 7px 15px;border: 1px solid #0d9ce2;border-radius: 15px;color: #0d9ce2;">撤销</button>
          </p>
        </div>
      </div> -->

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
    <mt-actionsheet
      :actions="actions"
      v-model="sheetVisible">
    </mt-actionsheet>
    
  </div>
</template>

<script>
const myjiaoyiTabData = require('../../data/jiaoyiTabData.json');
import { Actionsheet,Popup,Indicator } from 'mint-ui';
import { Toast } from "mint-ui";
import Header from "../components/Header";
import JiaoyiTab from "../components/jiaoyi/JiaoyiTab";
import AddOrIncreas from "../components/jiaoyi/AddOrIncreas";
import moment from 'moment'  //时间转化工具
export default {
  name: "jiaoyi",
  data() {
    return {
      title:'BTC/CNY',
      xial:true, 
      xin:true,
      biao:true,
      aside:true,
      jiaoyiTabData:{},   //交易的tab数据
      data:null,  //tab切换条件
      inputru:true,  //默认显示买入样式
      output:false,   //卖出的
      theDj:{   //使用对象则可以父子组件都可以改变此值，传number此只会传一次
        x:0,
      }, //单价数
      theDjs:{
        y:0,  //估值
      },
      themount:0,  //数量
      theBs:{
        z:0,  //倍数
      },
      theBsz:{
        m:0  //倍数总值
      },
      // 底部的弹出
      actions:[{
        // icon: 'icon-article', // 引入iconfont的类名作为展示的icon
        name: '成交记录', // 引入文字作为标题
        method : this.cjHistory
      }],
      sheetVisible:false, //上拉的sheet显示开关
      changScState:false,  //收藏状态开关
      popupVisible:true,   //显示顶部的提示
      pkData:{     //右侧的交易挂单数据
         asks:[],
         bids:[]
       },
       buyAvailable:0,
       sellerAvailable:0,
       theParam:{},   //存储路由参数
       timer:null,
       bizhStaus:{
         staus:false
       },  //收藏状态
       currentBizh:'BTC',  //存储当前的bizhong
       accessToken:'',
       myCurrentData:[]   //当前委托的数据
    };
  },
  computed:{
    guzhi:function (){
      return (this.theDj.x * 6.88).toFixed(4);
    },
    theTotal:function (){
      return (this.theDj.x * this.themount).toFixed(4);
    }
  },
  filters: {
    formatDate: function (value) {
      value = parseInt(value)*1000
      return moment(value).format('YYYY-MM-DD HH:MM:SS')
    }
  },
  // beforeRouteEnter是每次进入都会执行
  beforeRouteEnter(to, from, next) {

    if(to.params.slectBz){
       next(vm => vm.getData(to.params));
    }else{
       next(vm => vm.getData());
    }
  },
  beforeRouteLeave(to, from, next) {
    // 离开页面关闭定时器
    this.timer = null
    next()
  },
  created() {
      
  },
  methods: {
    // 获取用户信息
    getData(data) {
      let access_token = localStorage.getItem('access_token')
      this.accessToken = access_token

      var $this = this
      this.jiaoyiTabData = myjiaoyiTabData   //切换tab导航
      // 根据路由参数，进行相应币种的websocket数据发送
      if(data != undefined && data != null && data != ''){
         $this.title = data.title   //切换title
         switch(data.slectBz) {
            case 'BTCUSDT':
                http.sendData({"id":1,"method":"depth.subscribe","params":["BTCUSDT",10,"0"]})
                // http.sendData({"id":31,"method":"today.query","params":["BTCUSDT"]})
                http.sendData({"id":32,"method":"deals.subscribe","params":["BTCUSDT"]})
                http.sendData({"id":31,"method":"order.query","params":["BTCUSDT",0,50]})  //当前的委托
                $this.currentBizh = 'BTC'
                $this.getBalance('BTC|USDT');  //获取买和卖的交易对的可用余额
                $this.getXinStaus('BTCUSDT');   //获取是否收藏为自选
                break;
            case 'ETHUSDT':
                http.sendData({"id":1,"method":"depth.subscribe","params":["ETHUSDT",10,"0"]})
                  // http.sendData({"id":31,"method":"today.query","params":["ETHUSDT"]})
                  http.sendData({"id":32,"method":"deals.subscribe","params":["ETHUSDT"]})
                  http.sendData({"id":31,"method":"order.query","params":["ETHUSDT",0,50]})  //当前的委托
                  $this.currentBizh = 'ETH'
                  $this.getBalance('ETH|USDT');  //获取买和卖的交易对的可用余额
                  $this.getXinStaus('ETHUSDT');   //获取是否收藏为自选
                break;
            case 'XRPUSDT':
                http.sendData({"id":1,"method":"depth.subscribe","params":["XRPUSDT",10,"0"]})
                // http.sendData({"id":31,"method":"today.query","params":["XRPUSDT"]})
                http.sendData({"id":32,"method":"deals.subscribe","params":["XRPUSDT"]})
                http.sendData({"id":31,"method":"order.query","params":["XRPUSDT",0,50]})  //当前的委托
                $this.currentBizh = 'XRP'
                $this.getBalance('XRP|USDT');  //获取买和卖的交易对的可用余额
                $this.getXinStaus('XRPUSDT');   //获取是否收藏为自选
                break;
            case 'EOSUSDT':
                http.sendData({"id":1,"method":"depth.subscribe","params":["EOSUSDT",10,"0"]})
                // http.sendData({"id":31,"method":"today.query","params":["EOSUSDT"]})
                http.sendData({"id":32,"method":"deals.subscribe","params":["EOSUSDT"]})
                http.sendData({"id":31,"method":"order.query","params":["EOSUSDT",0,50]})  //当前的委托
                $this.currentBizh = 'EOS'
                $this.getBalance('EOS|USDT');  //获取买和卖的交易对的可用余额
                $this.getXinStaus('EOSUSDT');   //获取是否收藏为自选
                break;
            case 'LTCUSDT':
                http.sendData({"id":1,"method":"depth.subscribe","params":["LTCUSDT",10,"0"]})
                // http.sendData({"id":31,"method":"today.query","params":["LTCUSDT"]})
                http.sendData({"id":32,"method":"deals.subscribe","params":["LTCUSDT"]})
                http.sendData({"id":31,"method":"order.query","params":["LTCUSDT",0,50]})  //当前的委托
                $this.currentBizh = 'LTC'
                $this.getBalance('LTC|USDT');  //获取买和卖的交易对的可用余额
                $this.getXinStaus('LTCUSDT');   //获取是否收藏为自选
                break;
            case 'WTCUSDT':
                http.sendData({"id":1,"method":"depth.subscribe","params":["WTCUSDT",10,"0"]})
                // http.sendData({"id":31,"method":"today.query","params":["WTCUSDT"]})
                http.sendData({"id":32,"method":"deals.subscribe","params":["WTCUSDT"]})
                http.sendData({"id":31,"method":"order.query","params":["WTCUSDT",0,50]})  //当前的委托
                $this.currentBizh = 'WTC'
                $this.getBalance('WTC|USDT');  //获取买和卖的交易对的可用余额
                $this.getXinStaus('WTCUSDT');   //获取是否收藏为自选
                break;                    
         } 
      }else{
         http.sendData({"id":1,"method":"depth.subscribe","params":["BTCUSDT",10,"0"]})
        //  http.sendData({"id":31,"method":"today.query","params":["BTCUSDT"]})
         http.sendData({"id":32,"method":"deals.subscribe","params":["BTCUSDT"]})
         http.sendData({"id":31,"method":"order.query","params":["BTCUSDT",0,50]})  //当前的委托
         this.getBalance('BTC|USDT');  //获取买和卖的交易对的可用余额
         this.getXinStaus('BTCUSDT');   //获取是否收藏为自选
      }

      // 获取右侧交易挂单的数据cscct/usdt
      window.revieceData17 = function(res) {
            // 只需要交易挂单返回成功的数据（也对应为我要买和我要卖的数据）
            if(res.params[0]){
                return $this.storePkData(res)
            }
      };
          
      window.revieceData30 = function(res) {
        if(res.result && res.result.status == 'success') {
              //历史挂单，注意需要时"id":30发送成功后才发送有数据
              http.sendData({"id":31,"method":"order.query","params":[$this.currentBizh+"USDT",0,50]})   //此为当前委托的数据
        }
      }

      // 获取当前委托的数据
      window.revieceData31 = function(res) {
            // 只需要交易挂单返回成功的数据（也对应为我要买和我要卖的数据）
            return $this.storeCurrentData(res)
      };
      
      this.openWatite();   //开启提示等待
      this.loadData();
    },
     //初始加载数据
    loadData() {
      // 判断是否有点击tab，初始状态this.data为null
      if(this.data){
        if(this.data.condition== "mairu"){
          // 加载涨幅数据
          this.output = false;
          this.inputru = true;

        }else{
          // 加载降幅的数据
          this.inputru = false;
          this.output = true;
          
        }
      }
    },
    cancelOrder(detail){
        let order_id =  detail.id
        let market = detail.market
        let access_token = this.accessToken
        var me = this
       this.$axios
        .post("/api/bargain/cancel-order", {
          order_id: order_id,
          access_token: access_token,  //无token时获取的买与卖的可用余额都为0
          market: market
        })
        .then(res => {
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
        })
        .catch(err => {
            Toast({
                message: '网络错误',
                position: "bottom",
                duration: 2000
              });
              return;
        }); 
    },
    // 减少
    godecreaseCount(){
       if(this.themount<='0.1'){
        return
      }
       this.themount = Number(this.themount).sub(0.0001).toFixed(4);
    },
    // 增加
    goincreaseCount(){
       this.themount = Number(this.themount).add(0.0001).toFixed(4);
    },
    //tab切换，根据点击tab的条件加载数据
    update(condation) {  
      this.data = condation;
      this.loadData();
    },
    // 充值
    toinput(){
      this.$router.push({name:'chongz'});
    },
    // 成交记录
    cjHistory(){

       this.$router.push({name:'cjHistory',params:{titleBefore:this.currentBizh,titleAfter:'USDT'}});   
    },
    showactionSheet(){
    	// 打开action sheet
      this.sheetVisible = true;
    },
    condit(condit){
      this.$router.push({name:'shichan'});
    },
    sendPrice(dom){
       // target表示当前点击的元素非父元素
       let selectPrice = dom.currentTarget.childNodes.item(0).innerText;
       let selectMount = dom.currentTarget.childNodes.item(1).innerText;
       this.theDj.x =new Number(selectPrice)
       this.themount = selectMount
    },
    storePkData(data){
      this.pkData = {
          asks:data.params[1].asks,
          bids:data.params[1].bids
      }
      // 关闭动画
    },
    storeCurrentData(data){
        this.myCurrentData = data.result.records
    },
    getBalance(asset_type){
       var me = this
       this.$axios
        .post("/api/bargain/balance", {
          asset_type: asset_type,
          access_token: me.accessToken,  //无token时获取的买与卖的可用余额都为0
          chain_network: 'main_network'
        })
        .then(res => {
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
        })
        .catch(err => {
            Toast({
                message: '网络错误',
                position: "bottom",
                duration: 2000
              });
              return;
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
        this.$axios
        .post("/api/exchange/market", {
          'access_token': $this.accessToken,   //无access_token时获取的收藏状态都为0，即未收藏状态
          'chain_network': 'main_network',
          'os': 'web',
          'os_ver': '1.0.0',
          'soft_ver': '1.0.0',
          'language': 'zh_cn'
        })
        .then(res => {
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
        .catch(err => {
            $this.$toast({
                message: '网络错误',
                position: "bottom",
                duration: 2000
              });
              return;
        });
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
        this.$axios
        .post("api/bargain/order-limit", {
          'market': $this.currentBizh+'USDT',
          'side': '2',
          'pride': $this.theDj.x + '',
          'amount': $this.themount,
          'access_token': $this.accessToken,
          'chain_network': 'main_network'
        })
        .then(res => {
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
        .catch(err => {
            $this.$toast({
                message: '网络错误',
                position: "bottom",
                duration: 2000
              });
              return;
        });
    },
    // 收藏或取消收藏
    addOrDeleteSj(condition){
        if(condition.condition){
           this.addShouc(this.currentBizh)
        }else{
           this.deleteShouc(this.currentBizh)
        }
    },
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
       
        this.$axios
        .post("/api/trade/trade-delete", {
          'os_ver':'',
          'access_token':$this.accessToken,
          'stock':currentBizh,
          'money':'USDT',
          'language':'zh_cn',
          'soft_ver':'2.0.0',
          'chain_network':'main_network',
          'os':'android'
        })
        .then(res => {
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
        .catch(err => {
            $this.$toast({
                message: '网络错误',
                position: "bottom",
                duration: 2000
              });
              return;
        });
    },
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
        this.$axios
        .post("/api/trade/trade-add", {
          'os_ver':'',
          'access_token':$this.accessToken,
          'stock':currentBizh,
          'money':'USDT',
          'language':'zh_cn',
          'soft_ver':'2.0.0',
          'chain_network':'main_network',
          'os':'android'
        })
        .then(res => {
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
        .catch(err => {
            $this.$toast({
                message: '网络错误',
                position: "bottom",
                duration: 2000
              });
              return;
        });
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
        this.$axios
        .post("api/bargain/order-limit", {
          'market': $this.currentBizh+'USDT',
          'side': '1',
          'pride': $this.theDj.x + '',
          'amount': $this.themount,
          'access_token': $this.accessToken,
          'chain_network': 'main_network'
        })
        .then(res => {
          if(res.data.code == '200'){
              // 检验成功 设置登录状态并且跳转到/
               $this.$toast({
                message: '卖出成功',
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
        .catch(err => {
            $this.$toast({
                message: '网络错误',
                position: "bottom",
                duration: 2000
              });
              return;
        });
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
   /* .center-contain-left button{
    padding: 5px 6vw;
    width: 50%;
  } */
  /* .activetab{
    background-color: #8ba98b;
  } */
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
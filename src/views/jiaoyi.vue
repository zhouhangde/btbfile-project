<template>
  <div class="jiaoyi">
    <!-- :xin="xin" 此为收藏到自选的星星 -->
    <Header :title="title" 
    :xial="xial" 
    :biao="biao" :aside="aside" 
    @condit="condit"
    @showAction="showactionSheet"/>
    <div class="center-contain">
      <div class="center-contain-left">
        <!-- 导航买入卖出 -->
        <!-- <div>
            <button :class="{activetab:true}">买入</button>
            <button>卖出</button>
        </div> -->
        <JiaoyiTab :filterData="jiaoyiTabData" @update="update"/>
        <div style="text-align:left;padding:10px 0;color:#999">限单价></div>
        <AddOrIncreas :dataNumberr="theDj" class="jishukone"/>
        <!-- <div class="jishukone">
          <span style="padding: 0 3px;" @click="increace">-</span>
          <span>{{x}}</span>
          <span style="padding: 0 3px;" @click="add">+</span>
        </div> -->
        <div style="text-align:left;padding:10px 0;color:#999">估值 :
          <span><i class="fa fa-yen (alias)" style="margin-right:5px"></i>{{guzhi}}</span>
        </div>
        <div class="jishuktwo">
          <span style="padding: 0 3px;">-</span>
          <!-- 数量 -->
          <span>{{themount}}</span>
          <span style="padding: 0 3px;">+</span>
        </div>
        <div style="margin-top:10px">
          <!-- 总额：单价*数量 -->
          <button style="width:100%;padding:5px 0px;text-align:center;border: 1px solid #e0e0e6;">{{theTotal}}</button>
        </div>
        <div style="margin-top:5px">
           <button style="width:100%;padding:5px 0px;text-align:center;color:#fff;" :class="{'inputru':inputru}" v-if="inputru">买入</button>
          <button style="width:100%;padding:5px 0px;text-align:center;color:#fff;" :class="{'output':output}" v-else>卖出</button>
        </div>
      </div>
      <div class="center-contain-right">
         <ul>
           <li id="sun">
             <div class="itemShop itemShopzf">
               <span style="color:#999;">价格</span>
               <span style="color:#999;">数量</span>
             </div>
             <div class="itemShop itemShopzf" @click="sendPrice($event)" v-for="(item,index) in pkData.asks" :key="index">
               <span class="itemprice">{{item[0]}}</span>
               <span>{{item[1]}}</span>
             </div>
           </li>
         </ul>
         <div class="pjprice">1/￥6.88</div>
         <ul style="padding-top:10px">
           <li id="num">
             <div class="itemShop itemShopdf" @click="sendPrice($event)" v-for="(item,index) in pkData.bids" :key="index"> 
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
              <em v-if="inputru">{{buyAvailable}}USDT</em>
              <em v-else>{{sellerAvailable}}CSCCT</em>
            </span>
            <!-- <button class="toinput" @click="toinput">充值</button> -->
        </div>
      </div>
    </div>
    <div class="myfoot">
      <div style="padding:5px">24h最高</div>
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
export default {
  name: "jiaoyi",
  data() {
    return {
      title:'CSCCT/USDT',
      xial:true, 
      xin:true,
      biao:true,
      aside:true,
      jiaoyiTabData:{},   //交易的tab数据
      data:null,  //tab切换条件
      inputru:true,  //默认显示买入样式
      output:false,   //卖出的
      theDj:0, //单价数
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
        method : this.cj
      }],
      sheetVisible:false, //上拉的sheet显示开关
      changScState:false,  //收藏状态开关
      popupVisible:true,   //显示顶部的提示
      pkData:{     //右侧的交易挂单数据
         asks:[],
         bids:[]
       },
       buyAvailable:0,
       sellerAvailable:0
    };
  },
  computed:{
    guzhi:function (){
      return (this.theDj * 6.88).toFixed(4);
    },
    theTotal:function (){
      return (this.theDj * this.themount).toFixed(4);
    }
  },
  // beforeRouteEnter(to, from, next) {
  //   next(vm => vm.getData());
  // },
  created() {
    // 加载动画
    Indicator.open({
      text: '加载中...',
      spinnerType: 'fading-circle'
    });
    this.getData();
  },
  methods: {
    // 获取用户信息
    getData() {
      var $this = this
      this.jiaoyiTabData = myjiaoyiTabData
      // 获取右侧交易挂单的数据
      window.revieceData17 = function(res) {
            // 只需要交易挂单返回成功的数据（也对应为我要买和我要卖的数据）
            if(res.params[0]){
                // console.log('挂单数据',res)
                return $this.storePkData(res)
            }
      };
      this.getBalance();  //获取买和卖的交易对的可用余额
      // console.log('父页面的tab数据',this.jiaoyiTabData);
      this.loadData();
    },
     //初始加载数据
    loadData() {
      // 判断是否有点击tab，初始状态this.data为null
      if(this.data){
        if(this.data.condition== "mairu"){
          // 加载涨幅数据
          // console.log("进行买入相关数据");
          this.output = false;
          this.inputru = true;

        }else{
          // 加载降幅的数据
          // console.log("进行卖出相关数据");
          this.inputru = false;
          this.output = true;
          
        }
      }
    },
    // 减少
    increace(){
       
    },
    // 增加
    add(){

    },
    //tab切换，根据点击tab的条件加载数据
    update(condation) {  
      // console.log(condation);
      this.data = condation;
      this.loadData();
    },
    // 充值
    toinput(){
      this.$router.push({name:'chongz'});
    },
    cj(){


    },
    showactionSheet(){
    	// 打开action sheet
      this.sheetVisible = true;
    },
    condit(condit){
      if(condit.conditon == 'CSCCT/USDT'){
        this.$router.push({name:'shichan'});
      }
    },
    sendPrice(dom){
       // target表示当前点击的元素非父元素
       let selectPrice = dom.currentTarget.childNodes.item(0).innerText;
       let selectMount = dom.currentTarget.childNodes.item(1).innerText;
       this.theDj = new Number(selectPrice)
       this.themount = selectMount
    },
    storePkData(data){
      this.pkData = {
          asks:data.params[1].asks,
          bids:data.params[1].bids
      }
      // 关闭动画
      Indicator.close();
    },
    getBalance(){
       var me = this
       this.$axios
        .post("/api/bargain/balance", {
          asset_type: 'CSCCT|USDT',
          access_token: 'WNoCLzeQWHyIdjuynB6hT5o30ieFRBXe_1560572313',
          chain_network: 'main_network'
        })
        .then(res => {
          if(res.data.code == '200'){
              console.log('res',res)
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
    padding: 5px;
    width: 50%;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
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
  
</style>
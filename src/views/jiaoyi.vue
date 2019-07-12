<template>
  <div class="jiaoyi">
    <Header :title="title" :xial="xial" :xin="xin" :biao="biao" :aside="aside"/>
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
          <span><i class="fa fa-yen (alias)" style="margin-right:5px"></i>0</span>
        </div>
        <div class="jishuktwo">
          <span style="padding: 0 3px;">-</span>
          <span>数量</span>
          <span style="padding: 0 3px;">+</span>
        </div>
        <div style="margin-top:10px">
          <button style="width:100%;padding:5px 0px;text-align:center;border: 1px solid #e0e0e6;">0</button>
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
             <div class="itemShop itemShopzf">
               <span>3.995</span>
               <span>45.2463</span>
             </div>
             <div class="itemShop itemShopzf">
               <span>3.995</span>
               <span>45.2463</span>
             </div>
             <div class="itemShop itemShopzf">
               <span>3.995</span>
               <span>45.2463</span>
             </div>
             <div class="itemShop itemShopzf">
               <span>3.995</span>
               <span>45.2463</span>
             </div>
             <div class="itemShop itemShopzf">
               <span>3.995</span>
               <span>45.2463</span>
             </div>
           </li>
         </ul>
         <div class="pjprice">3.3855</div>
         <ul style="padding-top:10px">
           <li id="num">
             <div class="itemShop itemShopdf">
               <span>3.995</span>
               <span>45.2463</span>
             </div>
             <div class="itemShop itemShopdf">
               <span>3.995</span>
               <span>45.2463</span>
             </div>
             <div class="itemShop itemShopdf">
               <span>3.995</span>
               <span>45.2463</span>
             </div>
             <div class="itemShop itemShopdf">
               <span>3.995</span>
               <span>45.2463</span>
             </div>
             <div class="itemShop itemShopdf">
               <span>3.995</span>
               <span>45.2463</span>
             </div>
           </li>
         </ul>
      </div>
    </div>
    <div class="inputPrice-foot">
      <div class="inputPrice-center">
        <div class="inputPrice">
            <span>可用
              <em v-if="inputru">828.7273USDT</em>
              <em v-else>0CSCCT</em>
            </span>
            <button class="toinput" @click="toinput">充值</button>
        </div>
      </div>
    </div>
    <div class="myfoot">
      <div style="padding:5px">24h最高</div>
    </div>
  </div>
</template>

<script>
const myjiaoyiTabData = require('../../data/jiaoyiTabData.json');
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
      theDj:{
        x:0 //单价数
      },
      theDjs:{
        y:0,  //估值
      },
      theBs:{
        z:0,  //倍数
      },
      theBsz:{
        m:0  //倍数总值
      }
    };
  },
  beforeRouteEnter(to, from, next) {
    next(vm => vm.getData());
  },
  methods: {
    // 获取用户信息
    getData() {
      this.jiaoyiTabData = myjiaoyiTabData
      console.log('父页面的tab数据',this.jiaoyiTabData);
      this.loadData();
    },
     //初始加载数据
    loadData() {
      // 判断是否有点击tab，初始状态this.data为null
      if(this.data){
        if(this.data.condition== "mairu"){
          // 加载涨幅数据
          console.log("进行买入相关数据");
          this.output = false;
          this.inputru = true;

        }else{
          // 加载降幅的数据
          console.log("进行卖出相关数据");
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
    background-color: #d6d2da;
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
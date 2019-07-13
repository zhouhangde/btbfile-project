<template>
  <div class="otc">
    <Header :title="title" :xial="xial" 
    :aside="true"
    @showAction="showactionSheet"
    />
    <OtcTab :filterData="otcTabData" @update="update" style="padding:10px"/>
    <div style="padding: 10px;">
       <span style="color:rgb(71,71,71);">您的余额:</span>
       <span style="color:rgb(18,169,237);">{{yuMoney}}</span>
    </div>
    <OtcTabList  :key="index" v-for="(item,index) in otcDataList" :zorjdata="item.myData" @showtheDetail="showtheDetail"/>
    <!-- <div>
      <ul class="parent">
        <li class="pareant-item" >
          <div class="pareant-item-header">
             <img src="" style="width:40px;height:40px"/>
             <div>
               <p>包秀敏</p>
               <p>
                <span>限额:<i class="fa fa-address-book"></i></span>
                <span>20.00-4000.00</span>
               </p>
               <p>
                 <span>单价</span>7.02
               </p>
             </div>
             <div>
                 <img style="width:5px;height:5px;margin-left:5px"/>
                 <img style="width:5px;height:5px;margin-left:5px"/>
                 <img style="width:5px;height:5px;margin-left:5px"/>
             </div>
          </div>
          <div class="line"></div>
          <div class="pareant-item-footer">
            <div>
               <span>成交:</span>
               <span>0.0000</span>
            </div>
            <div>
               <span>成交率:</span>
               <span>0.00%</span>
            </div>
            <button class="tobug">我要买</button>
          </div>
        </li>
        <li class="pareant-item">
          <div class="pareant-item-header">
             <img src="" style="width:40px;height:40px"/>
             <div>
               <p>包秀敏</p>
               <p>
                <span>限额:<i class="fa fa-address-book"></i></span>
                <span>20.00-4000.00</span>
               </p>
               <p>
                 <span>单价</span>7.02
               </p>
             </div>
             <div>
                 <img style="width:5px;height:5px;margin-left:5px"/>
                 <img style="width:5px;height:5px;margin-left:5px"/>
                 <img style="width:5px;height:5px;margin-left:5px"/>
             </div>
          </div>
          <div class="line"></div>
          <div class="pareant-item-footer">
            <div>
               <span>成交:</span>
               <span>0.0000</span>
            </div>
            <div>
               <span>成交率:</span>
               <span>0.00%</span>
            </div>
            <button class="tobug">我要买</button>
          </div>
        </li>
      </ul>
    </div> -->
    <mt-actionsheet
      :actions="actions"
      v-model="sheetVisible">
    </mt-actionsheet>
  </div>
</template>

<script>
const mymybuy = require('../../data/mybuy.json');
const mymyseller = require('../../data/myseller.json');
const myotcTabData = require('../../data/otcTabData.json');
import Header from "../components/Header";
import OtcTab from "../components/otc/OtcTab";
import OtcTabList from "../components/otc/OtcTabList";
export default {
  name: "otc",
  data() {
    return {
       title:'USDT',
       xial:true, 
       otcTabData:{},   //tab数据
       otcDataList:[],   //tab下的切换的列表数据
       // 底部的弹出
       actions:[
         {
          // icon: 'icon-article', // 引入iconfont的类名作为展示的icon
          name: '我的发布', // 引入文字作为标题
          method : this.fb
         },
         {
          // icon: 'icon-article', // 引入iconfont的类名作为展示的icon
          name: '历史订单', // 引入文字作为标题
          method : this.dd
         }
       ],
       sheetVisible:false, //上拉的sheet显示开关
       yuMoney:9978243.8214654
    };
  },
  beforeRouteEnter(to, from, next) {
    next(vm => vm.getData());
  },
  methods: {
    // 获取用户信息
    getData() {
      this.otcTabData =  myotcTabData
      this.otcDataList = mymybuy
      console.log("列表数据",this.otcDataList)
      this.loadData();
    },
    created(){
      
    },
    //初始加载数据
    loadData() {
      // 判断是否有点击tab，初始状态this.data为null
      if(this.data){
        if(this.data.condition== "itomi"){
          // 加载涨幅数据
          console.log("我要买相关数据");
          this.otcDataList = mymybuy;

        }else{
          // 加载降幅的数据
          console.log("我要卖出相关数据");
          // this.inputru = false;
          // this.output = true;
          this.otcDataList = mymyseller;
        }
      }
    },
    //tab切换，根据点击tab的条件加载数据
    update(condation) {  
      // console.log(condation);
      this.data = condation;
      this.loadData();
    },
    // 进入下单页面
    showtheDetail(param){
       console.log('下单页面',param);
       this.$router.push({
         name:'showOrder',
         params: { orderData:param }
       })
    },
    showactionSheet(){
    	// 打开action sheet
      this.sheetVisible = true;
    },
    fb(){

    },
    dd(){
      
    }
  },
  components: {
      Header,
      OtcTab,
      OtcTabList
  }
};
</script>

<style scoped>
   .otc {
    width: 100%;
    height: 100%;
    overflow: auto;
    box-sizing: border-box;
  }
</style>
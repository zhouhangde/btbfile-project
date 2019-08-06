<template>
  <div class="otc">
    <Header :title="title" :xial="xial" 
    :aside="true"
    @condit="condit"
    @showAction="showactionSheet"
    />
    <OtcTab :filterData="otcTabData" @update="update" style="padding:10px"/>
    <div style="padding: 10px;">
       <span style="color:rgb(71,71,71);">您的余额:</span>
       <span style="color:rgb(18,169,237);">{{yuMoney}}</span>
    </div>
    <!-- <OtcTabList  :key="index" v-for="(item,index) in otcDataList" :zorjdata="item.myData" @showtheDetail="showtheDetail"/> -->

    <OtcTabList  :zorjdata="otcDataListNew" @showtheDetail="showtheDetail" v-if="showThis"/>
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
    <mt-popup
      v-model="popupVisible"
      pop-transition="popup-fade"
      :modal="true"
      position="top" style="height: auto;width: 100%;line-height: 30px;">
      <div class="the-content">
        <p>
          <i class="fa fa-usd" style="font-size: 17px;"></i>
          <span style="margin-left: 15px;">USDT</span>
        </p>
        <p>
          <i class="fa fa-check" style="margin-right:5px;color:#ffb907a3;"></i>
        </p>
      </div>
    </mt-popup>
  </div>
</template>

<script>
const mymybuy = require('../../data/mybuy.json');
const mymyseller = require('../../data/myseller.json');
const myotcTabData = require('../../data/otcTabData.json');
import { Actionsheet,Popup } from 'mint-ui';
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
       otcDataListNew:[],   //tab下的切换的列表接口数据
       // 底部的弹出
       actions:[
         {
          // icon: 'icon-article', // 引入iconfont的类名作为展示的icon
          name: '我的发布', // 引入文字作为标题
          method : this.myFb
         },
         {
          // icon: 'icon-article', // 引入iconfont的类名作为展示的icon
          name: '历史订单', // 引入文字作为标题
          method : this.myHistoryOrder
         }
       ],
       sheetVisible:false, //上拉的sheet显示开关
       popupVisible:false,   //显示顶部的提示
       yuMoney:0,
       showThis:false,  //是否显示列表数据开关
       accessToken:''
    };
  },
  beforeRouteEnter(to, from, next) {
    next(vm => vm.getData());
  },
  methods: {
    // 获取用户信息
    getData() {
      let access_token = localStorage.getItem('access_token')
      this.accessToken = access_token

      this.otcTabData =  myotcTabData
      // this.otcDataList = mymybuy
      this.getAvirible();  //查询余额
      this.getBuyOrSeller('1');
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
          // this.otcDataList = mymybuy;
          this.getBuyOrSeller('1');
        }else{
          // 加载降幅的数据
          // this.inputru = false;
          // this.output = true;
          // this.otcDataList = mymyseller;
          this.getBuyOrSeller('2');
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
    // 我的发布
    myFb(){
      this.$router.push({name:'myFb'})
    },
    // 历史订单
    myHistoryOrder(){
      this.$router.push({name:'otcJi'})
    },
    condit(condit){
      if(condit.conditon == 'USDT'){
        this.popupVisible = true
      }
    },
    getAvirible(){
       var $this = this
        this.$axios
        .post("/api/exchange/balance ", {
          'asset_type': 'USDT',
          'access_token': $this.accessToken
        })
        .then(res => {
          if(res.data.code == '200'){
              // 检验成功 设置登录状态并且跳转到/
              $this.yuMoney = res.data.data.list[0].available
             
          }else{
            $this.showThis = false  //没有数据
            $this.$toast({
                message: res.data.message,
                position: "bottom",
                duration: 1000
              });
              return;
          }
        })
        .catch(err => {
            $this.$toast({
                message: '网络错误',
                position: "bottom",
                duration: 1000
              });
              return;
        });
    },
    getBuyOrSeller(staus){
      var $this = this
        this.$axios
        .post("/api/otc/market-list", {
          'side': staus,
          'coin_name': 'USDT'
        })
        .then(res => {
          if(res.data.code == '200'){
              // 检验成功 设置登录状态并且跳转到/
              $this.showThis = true
              $this.otcDataListNew = res.data.data
              for(let item of $this.otcDataListNew){
                
                 if(staus == '1'){
                   item.staus = 'buy'
                 }else{
                   item.staus = 'seller'
                 }
              }
              
          }else{
            $this.showThis = false  //没有数据
            $this.$toast({
                message: res.data.message,
                position: "bottom",
                duration: 1000
              });
              return;
          }
        })
        .catch(err => {
            $this.$toast({
                message: '网络错误',
                position: "bottom",
                duration: 1000
              });
              return;
        });
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
  .the-content{
    display: flex;
    justify-content: space-between;
    padding: 5px;
  }
</style>
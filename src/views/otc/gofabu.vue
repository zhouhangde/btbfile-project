<template>
  <div class="gofabu">
      <Header :isLeft="true" :title="title" :xial="true" @condit="condit"/>
      <OtcTab :filterData="otcTabData" style="padding:10px" @update="update"/>

      <div style="display: flex;flex-direction: column;align-items: center;">
          <img :src="iconData.icon" style="width:30px;height:30px;padding: 11px;"/>
          <p>{{iconData.coin_name}}</p>
      </div>
      <div style="padding: 9px;">
          <p style="padding: 7px 7px;">单价</p>
          <div style="padding: 9px;background-color: #e6e2e2;">
              <input type="text" v-model="orderData.price_usd" placeholder="0.00"/>
          </div>
      </div>
      <div style="padding: 9px;">
          <p style="padding: 7px 7px;">数量</p>
          <div  style="padding: 9px 0;display: flex;justify-content: space-between;"  >
              <input type="text" placeholder="最小数量" v-model="orderData.min_num" style="width:40%;background-color: rgb(230, 226, 226);padding: 10px;text-align: center;"/>
              <input type="text" placeholder="最大数量" v-model="orderData.max_num" style="width:40%;background-color: rgb(230, 226, 226);padding: 10px;text-align: center;"/>
          </div>
      </div>
      <div style="padding: 9px;">
          <p style="padding: 7px 7px;">备注</p>
          <div style="padding: 9px;background-color: #e6e2e2;text-align: center;">
              <input type="text" placeholder="0.0" v-model="orderData.note" style="text-align: center;"/>
          </div>
      </div>
      <div style="padding:10px;background-color: #eae4e4;margin-top:15px">{{methordTitle}}</div>
        <div class="payMethord">
            <p style="display: flex;justify-content: space-between;" @click="alipayEnable= !alipayEnable">
                <span style="margin-left:15px;"><i class="fa fa-cny (alias)" style="color: #2b9df1;margin-right:8px"></i>支付宝</span> 
                <i class="fa fa-check" style="margin-right:5px;color:#ffb907a3;" v-if="alipayEnable"></i>
            </p>
            <p style="display: flex;justify-content: space-between;" @click="wechatEnable= !wechatEnable"> 
                <span style="margin-left:15px;"><i class="fa fa-wechat (alias)" style="color: #20c12e;margin-right:8px"></i>微信</span> 
                <i class="fa fa-check" style="margin-right:5px;color:#ffb907a3;" v-if="wechatEnable"></i>
            </p>
            <p style="display: flex;justify-content: space-between;"  @click="cardEnable= !cardEnable">
                <span style="margin-left:15px"><i class="fa fa-credit-card-alt" style="color: rgb(247, 186, 133);margin-right:8px"></i>银行卡</span> 
                <i class="fa fa-check" style="margin-right:5px;color:#ffb907a3;" v-if="cardEnable"></i>
            </p>
        </div>
        <div style="width:60%;margin:0 auto;background-color: rgb(85, 137, 189);padding: 10px;text-align: center;margin-top: 20px;color:#fff" @click="goOrder">
            下订单
        </div>
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
import Header from "../../components/Header";
import OtcTab from "../../components/otc/OtcTab";
const myotcTabData = require('../../../data/otcTabData.json');
import {Popup,Toast } from 'mint-ui';
export default {
  name: "gofabu",
  data() {
    return {
        title:'USDT',
        otcTabData:{},   //tab数据
        popupVisible:false,   //显示顶部的提示
        methordTitle:'请选择支付方式',
        iconData:{    //查询title和图标
          coin_name:'',
          icon:''
        },
        cardEnable:false,
        alipayEnable:true,  //支付宝支付的开关
        wechatEnable:false,
        orderData:{
          price_usd:'',  //单价
          max_num:'',   //最大数量
          card_enable:0,  //是否可以银行卡支付（1表示可以）
          alipay_enable:1,   //支付宝支付
          wechat_enable:0,    //微信支付
          access_token:'9yv8FP7oH7XdRSqXYunb1ySTAp8trd2B_1560572313',
          min_num:'',  //最小数量
          note:'',  //备注
          coin_name:'USDT', //币种
          side:2  //发布我要买为2
        }
    };
  },
  beforeRouteEnter(to, from, next) {
    next(vm => vm.getData());
  },
  methods: {
    // 获取用户信息
    getData() {
      this.otcTabData =  myotcTabData
      this.getIcon();
    },
    condit(condit){
      if(condit.conditon == 'USDT'){
        this.popupVisible = true
      }
    },
    //tab切换，根据点击tab的条件加载数据
    update(condation) {  
      if( condation.condition == 'itomi'){
          this.orderData.side = '2'
          this.methordTitle = '请选择支付方式'
      }else{
          this.orderData.side = '1'
          this.methordTitle = '请选择收款方式'
      }
    },
    // 去下单
    goOrder(){
      var $this = this
      if($this.alipayEnable){
          $this.orderData.alipay_enable = 1
      }else{
          $this.orderData.alipay_enable = 0
      }
      if($this.wechatEnable){
          $this.orderData.wechat_enable = 1
      }else{
          $this.orderData.wechat_enable = 0
      }
      if($this.cardEnable){
          $this.orderData.card_enable = 1
      }else{
          $this.orderData.card_enable = 0
      }
      
       this.$axios
        .post("/api/otc/publish-info",$this.orderData)
        .then(res => {
          if(res.data.code == '200'){
              Toast({
                message: '下单成功',
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
    getIcon(){
      var $this = this
       this.$axios
        .post("/api/otc/coin-list", {
        })
        .then(res => {
          if(res.data.code == '200'){
              $this.iconData.coin_name=res.data.data[0].coin_name
              $this.iconData.icon=res.data.data[0].icon
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
     OtcTab
  }
};
</script>

<style scoped>
.gofabu {
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
.payMethord{
    background-color: #fff
}
.payMethord p {
    padding: 10px 0px;
}
</style>
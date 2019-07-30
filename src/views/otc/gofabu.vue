<template>
  <div class="gofabu">
      <Header :isLeft="true" :title="title" :xial="true" @condit="condit"/>
      <OtcTab :filterData="otcTabData" style="padding:10px" @update="update"/>

      <div style="display: flex;flex-direction: column;align-items: center;">
          <img src="" style="width:30px;height:30px;padding: 11px;"/>
          <p>USDT</p>
      </div>
      <div style="padding: 9px;">
          <p style="padding: 7px 7px;">单价</p>
          <div style="padding: 9px;background-color: #e6e2e2;">
              <input type="text" placeholder="0.00"/>
          </div>
      </div>
      <div style="padding: 9px;">
          <p style="padding: 7px 7px;">数量</p>
          <div  style="padding: 9px 0;display: flex;justify-content: space-between;"  >
              <input type="text" placeholder="最小数量" style="width:40%;background-color: rgb(230, 226, 226);padding: 10px;text-align: center;"/>
              <input type="text" placeholder="最大数量" style="width:40%;background-color: rgb(230, 226, 226);padding: 10px;text-align: center;"/>
          </div>
      </div>
      <div style="padding: 9px;">
          <p style="padding: 7px 7px;">备注</p>
          <div style="padding: 9px;background-color: #e6e2e2;text-align: center;">
              <input type="text" placeholder="0.0" style="text-align: center;"/>
          </div>
      </div>
      <div style="padding:10px;background-color: #eae4e4;margin-top:15px">{{methordTitle}}</div>
        <div class="payMethord">
            <p>
                <i class="fa fa-cny (alias)" style="color: #2b9df1;"></i>
                <span style="margin-left:15px;">支付宝</span> 
            </p>
            <p>
                <i class="fa fa-wechat (alias)" style="color: #20c12e;"></i>
                <span style="margin-left:15px;">微信</span> 
            </p>
            <p>
                <i class="fa fa-credit-card-alt" style="color: rgb(247, 186, 133);"></i>
                <span style="margin-left:15px">银行卡</span> 
            </p>
        </div>
        <div style="width:60%;margin:0 auto;background-color: rgb(85, 137, 189);padding: 10px;text-align: center;margin-top: 20px;color:#fff">
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
import {Popup } from 'mint-ui';
export default {
  name: "gofabu",
  data() {
    return {
        title:'USDT',
        otcTabData:{},   //tab数据
        popupVisible:false,   //显示顶部的提示
        methordTitle:'请选择支付方式'
    };
  },
  beforeRouteEnter(to, from, next) {
    next(vm => vm.getData());
  },
  methods: {
    // 获取用户信息
    getData() {
      this.otcTabData =  myotcTabData
    },
    condit(condit){
      if(condit.conditon == 'USDT'){
        this.popupVisible = true
      }
    },
    //tab切换，根据点击tab的条件加载数据
    update(condation) {  
      if( condation.condition == 'itomi'){
          this.methordTitle = '请选择支付方式'
      }else{
          this.methordTitle = '请选择收款方式'
      }
    },
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
    padding: 10px
}
</style>
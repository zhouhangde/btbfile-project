<template>
  <div class="showOrder">
    <Header :isLeft="true" :title="title"/>
    <div style="width:54vw;margin:0 auto;text-align:center;padding: 20px;">
        <img style="width:15vw;height:15vw;border-radius: 100%;"/>
        <p style="margin-top:15px">{{orderDetail.name}}</p>
        <p style="margin-top:30px">
            单价
            <span style="font-size:16px">{{orderDetail.price}}</span>
        </p>
        <p style="margin-top:15px">
           <span>限额<i class="fa fa-address-book"></i></span>
           <span style="margin-left:10px">{{orderDetail.money}}</span>
        </p>
    </div>
    <div class="moneyHs">
        <div class="moneyHs-item">
            <i class="fa fa-address-book"></i>
            <input type="number" value="558"/>
        </div>
        <div style="padding: 15px;">
            <i class="fa fa-address-book"></i>
        </div>
        <div class="moneyHs-item">
            <i class="fa fa-address-book"></i>
            <input type="number" value="3917.16"/>
        </div>
    </div>
    <div style="padding:10px;background-color: #eae4e4;margin-top:15px">选择支付方式</div>
    <div class="payMethord">
       <p>
          <i class="fa fa-address-book"></i>
          <span style="margin-left:15px">支付宝</span> 
       </p>
       <p>
          <i class="fa fa-address-book"></i>
          <span style="margin-left:15px">微信</span> 
       </p>
       <p>
          <i class="fa fa-address-book"></i>
          <span style="margin-left:15px">银行卡</span> 
       </p>
    </div>
    <div style="text-align:right;padding:15px">
        <span>总价<em style="margin-right:5px">¥</em><em style="font-weight:600">3917.36</em></span>
    </div>
    <div style="width:60%;margin:0 auto;background-color: rgb(85, 137, 189);padding: 10px;text-align: center;">
          下订单
    </div>
  </div>
</template>

<script>
import Header from "../../components/Header";
export default {
  name: "showOrder",
  data() {
    return {
        title:'我要买',
        orderDetail:{}
    };
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
        console.log("接收到的数据",to.params)
        vm.orderDetail = to.params.orderData.param;
    });
  },
  methods: {
    // 获取用户信息
    getData() {
      
    }
  },
  components:{
      Header
  }
};
</script>

<style scoped>
.showOrder {
  width: 100%;
  height: 100%;
  overflow: auto;
  box-sizing: border-box;
}
.moneyHs{
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
        width: 96%;
    overflow: hidden;
    margin: 0 auto;
} 
.moneyHs-item{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    background-color: #eae4e4;
    padding: 15px;
    overflow: hidden;
}   
.payMethord{
    background-color: #fff
}
.payMethord p {
    padding: 10px
}
</style>
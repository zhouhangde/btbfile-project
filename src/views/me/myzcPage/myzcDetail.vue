<template>
  <div class="myzcDetail">
    <Header :isLeftgoZc="true" :title="title"/>
    <div style="padding: 30px 0;background-color: #fff;">
        <div style="text-align:center">
           <img style="width:10vw;height:10vw;" :src="myzcDetail.icon"/>
        </div>
        <p style="padding: 17px;text-align:center">总计金额</p>
        <p style="padding: 4px 17px 20px 17px;text-align:center;font-size: 17px;">{{myzcDetail.total_amount}}</p>
        <div style="border-top: 1px solid #e4e0e0;">
            <p style="padding: 17px;text-align:left">金额信息</p>
            <p style="padding: 17px;text-align:center">总可用金额</p>
            <p style="padding: 4px 17px 4px 17px;text-align:center;font-size: 17px;">{{myzcDetail.available}}</p> 
        </div>
        <div class="theparent">
            <div style="background-color:rgb(243, 238, 238)" class="item-child">
                <p>场外交易冻结金额</p>
                <p style="font-weight: 600;overflow: hidden;">{{myzcDetail.exchange_freeze}}</p>
            </div>
            <div style="background-color:rgb(243, 238, 238)" class="item-child">
                <p>交易所冻结金额</p>
                <p style="font-weight: 600;overflow: hidden;">{{myzcDetail.withdraw_freeze}}</p>
            </div>
            <div style="background-color:rgb(243, 238, 238)" class="item-child">
                <p>充值中金额</p>
                <p style="font-weight: 600;overflow: hidden;">{{myzcDetail.bank_balance}}</p>
            </div>
            <div style="background-color:rgb(243, 238, 238)" class="item-child">
                <p>提现中金额</p>
                <p style="font-weight: 600;overflow: hidden;">{{myzcDetail.bank_balance_rel}}</p>
            </div>
        </div>
        <!-- <div class="the-footer">
            <div class="footer-item" style="background-color: #79a2ca;" @click="$router.push({name:'myzctx'})">提现</div>
            <div class="footer-item" style="background-color: #1ea8da;" @click="$router.push({name:'myzccz'})">充值</div>
        </div> -->
    </div>
  </div>
</template>

<script>
import Header from "../../../components/Header";
export default {
  name: "myzcDetail",
  data() {
    return {
        title:'资产',
        myzcDetail:{
            addr: "",
            name: "USDT",
            icon: "http:\/\/btbfire.com\/attachment\/images\/2018\/10\/16\/image_IV577s7dnC.png",
            unit: "USDT",
            exchange_available: "0",
            exchange_available_rel: "0",
            exchange_freeze: "0",
            oct_freeze: "0",
            withdraw_freeze: "0",
            top_up_freeze: "0",
            bank_balance: "0",
            bank_balance_rel: 0,
            limit_amount: "300.0000",
            available: "0",
            total_amount: "0",
            total_freeze: "0",
            money: 0,
            exchange_rate_usd: 1,
            exchange_rate_cny: 6.89,
            recharge_enable: "1",
            withdraw_enable: "1",
            memo: ""
        }
    };
  },
  beforeRouteEnter(to, from, next) {
    next(vm => vm.getData());
  },
  methods: {
    // 获取用户信息
    getData() {
      if(this.$route.params.myzcDetail){
       this.myzcDetail = this.$route.params.myzcDetail
      }     
    }
  },
  components: {
     Header
  }
};
</script>

<style scoped>
.myzcDetail {
  width: 100%;
  height: 100%;
  overflow: auto;
  box-sizing: border-box;
}
.theparent{
    justify-content: space-between;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    /* flex: 1; */
    align-items: flex-start;
    margin: 8px;
}

.item-child{
    width: 45%;
    margin: 10px 0;
}
.item-child p{
    padding: 5px;
    text-align: center;
}
.the-footer{
   position: absolute;
    bottom: 0;
    height: 32px;
    line-height: 32px;
    display: flex;
    justify-content: space-between;
        width: 100%;
}
.footer-item{
   width: 50%;
   text-align: center; 
   color: #fff
}
      
</style>
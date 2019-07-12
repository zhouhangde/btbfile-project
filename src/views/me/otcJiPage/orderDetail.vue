<template>
  <div class="orderDetail">
     <Header :isLeft="true" :title="title"/>
     <div>
         <p style="background-color: #5a83b5;padding:8px"> 
             <span style="color:#fff;">{{showState}}</span>
         </p>
         <div style="padding: 5px 0;background-color: #fff;">
             <p class="order-item">
                 <span>我要买</span>
                 <span>100.00</span>
             </p>
             <p class="order-item">
                 <span>单价</span>
                 <span>¥<small>10.00</small></span>
             </p>
             <p class="order-item">
                 <span>我要买</span>
                 <span>100.00</span>
             </p>
             <p class="order-item">
                 <span>我要买</span>
                 <span>100.00</span>
             </p>
         </div>
         <div style="padding: 5px 0;background-color: #fff;margin: 10px 0;">
             <p class="order-item">
                 <span>订单编号:<small>290</small><i class="fa fa-address-book" style="margin-left:5px"></i></span>
                 <span>2019-06-25 15:30:31</span>
             </p>
             <p class="order-item">
                 <span>验证交易员:<small>SSFsfFeS</small><i class="fa fa-address-book" style="margin-left:5px"></i></span>
             </p>
             <p class="order-item">
                 <span>收款账号:<small>2883883839</small><i class="fa fa-address-book" style="margin-left:5px"></i></span>
             </p>
             <p class="order-item">
                 <span>支付宝收款码:</span>
                 <span @click="showZfb = !showZfb">展开</span>
             </p>
             <div style="text-align:center" v-if="showZfb">
               <img style="width:118px;height:118px"/>
             </div>
         </div>
         <div style="padding: 5px 0;background-color: #fff;">
             <p class="order-item">
                 <span>查看卖家实名信息:</span>
                 <span @click="showBuyer = !showBuyer">︶</span>
             </p>
             <div v-if="showBuyer" style="background-color: #f1efef;">
                <p class="order-item">
                    <span>实名:<small>大小</small><i class="fa fa-address-book" style="margin-left:5px"></i></span>
                </p>
                <p class="order-item">
                    <span>手机号:<small>15579029915</small><i class="fa fa-address-book" style="margin-left:5px"></i></span>
                </p>
             </div>
             
              <p class="order-item">
                 <span>查看交易员其他收款方式:</span>
                 <span  @click="showMethord = !showMethord">︶</span>
             </p>
             <div v-if="showMethord">
                <p class="order-item">
                    <span><i class="fa fa-address-book" style="margin-left:5px;margin-right: 15px;"></i>支付宝:</span>
                    <i class="fa fa-address-book" style="margin-left:5px"></i>
                </p>
                <p class="order-item">
                    <span><i class="fa fa-address-book" style="margin-left:5px;margin-right: 15px;"></i>微信:</span>
                    <i class="fa fa-address-book" style="margin-left:5px"></i>
                </p>
             </div>
         </div>
     </div>
  </div>
</template>

<script>
import Header from "../../../components/Header";
export default {
  name: "orderDetail",
  data() {
    return {
        title:'订单详情',
        showZfb:false,
        showBuyer:false,
        showMethord:false,
        showState:'已取消'
    };
  },
  beforeRouteEnter(to, from, next) {
    next(vm => vm.getData());
  },
  methods: {
    // 获取用户信息
    getData() {
      
    }
  },
  components: {
     Header
  }
};
</script>

<style scoped>
.orderDetail {
  width: 100%;
  height: 100%;
  overflow: auto;
  box-sizing: border-box;
}
.order-item{
   padding: 10px 8px;
  display: flex;
    justify-content: space-between;
 
}

</style>
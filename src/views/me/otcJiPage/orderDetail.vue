<template>
  <div class="orderDetail">
     <Header :isLeft="true" :title="title"/>
     <div>
         <p>
             <span style="color:#fff">已取消</span>
         </p>
         <div>
             <p>
                 <span>我要买</span>
                 <span>100.00</span>
             </p>
             <p>
                 <span>单价</span>
                 <span>¥<small>10.00</small></span>
             </p>
             <p>
                 <span>我要买</span>
                 <span>100.00</span>
             </p>
             <p>
                 <span>我要买</span>
                 <span>100.00</span>
             </p>
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
        title:'订单详情'
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
</style>
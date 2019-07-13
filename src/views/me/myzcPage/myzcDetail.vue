<template>
  <div class="myzcDetail">
    <Header :isLeftgoZc="true" :title="title"/>
    <div style="padding: 30px 0;background-color: #fff;">
        <div style="text-align:center">
           <img style="width:10vw;height:10vw;"/>
        </div>
        <p style="padding: 17px;text-align:center">总计金额</p>
        <p style="padding: 4px 17px 20px 17px;text-align:center;font-size: 17px;">1831.28USDT</p>
        <div style="border-top: 1px solid #e4e0e0;">
            <p style="padding: 17px;text-align:left">金额信息</p>
            <p style="padding: 17px;text-align:center">总可用金额</p>
            <p style="padding: 4px 17px 4px 17px;text-align:center;font-size: 17px;">895.28USDT</p> 
        </div>
        <div class="theparent">
            <div style="background-color:rgb(243, 238, 238)" class="item-child">
                <p>场外交易冻结金额</p>
                <p style="font-weight: 600;">936USDT</p>
            </div>
            <div style="background-color:rgb(243, 238, 238)" class="item-child">
                <p>场外交易冻结金额</p>
                <p style="font-weight: 600;">936USDT</p>
            </div>
            <div style="background-color:rgb(243, 238, 238)" class="item-child">
                <p>场外交易冻结金额</p>
                <p style="font-weight: 600;">936USDT</p>
            </div>
            <div style="background-color:rgb(243, 238, 238)" class="item-child">
                <p>场外交易冻结金额</p>
                <p style="font-weight: 600;">936USDT</p>
            </div>
        </div>
        <div class="the-footer">
            <div class="footer-item" style="background-color: #79a2ca;" @click="$router.push({name:'myzctx'})">提现</div>
            <div class="footer-item" style="background-color: #1ea8da;" @click="$router.push({name:'myzccz'})">充值</div>
        </div>
    </div>
  </div>
</template>

<script>
import Header from "../../../components/Header";
export default {
  name: "myzcDetail",
  data() {
    return {
        title:'资产'
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
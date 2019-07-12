<template>
  <div class="myzccz">
     <!-- 头部 -->
    <nav class="header-nav">
      <div class="nav_bg">
        <img  alt>
      </div>
      <div class="nav_back">
        <div class="the-header">
          <i  class="fa fa-chevron-left" @click="$router.push({name:'myzcDetail'})"></i>
          <span>USDT钱包地址</span>
          <span>历史</span>
        </div>
      </div>
      <div class="shop_image">
        <img  alt>
      </div>
    </nav>
    <div style="width: 53vw;margin: 36px auto 0 auto;">
        <p style="text-align:center;line-height: 18px;font-size: 14px;overflow: hidden;">1AYQWERQWERQWERQWERQWERQWERQWERQWRWEQRQW</p>
    </div>
    <div  style="width: 53vw;margin: 10px auto 0 auto;text-align: center;">
        <img style="width: 35vw; height: 35vw;"/>
    </div>
    <div  class="inputMoney" style="color:#fff">
       复制收款地址
    </div>
    <div style="margin: 36px auto 0 auto;padding:0 3px">
        <p style="margin: 5px auto 0 auto;padding:0 10px">转入说明</p>
        <p style="margin: 10px auto 0 auto;padding:0 10px">1.充值后经过20个网络确认后自动转账</p>
        <p style="margin: 10px auto 0 auto;padding:0 10px">2.此地址是您的唯一却独自使用的转入地址，可以进行多次充值</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "myzccz",
  data() {
    return {
    };
  },
  beforeRouteEnter(to, from, next) {
    next(vm => vm.getData());
  },
  methods: {
    // 获取用户信息
    getData() {
      
    }
  }
};
</script>

<style scoped>
.myzccz {
  width: 100%;
  height: 100%;
  overflow: auto;
  box-sizing: border-box;
}
/* 头部 */
.header-nav {
  position: relative;
}
.nav_bg img {
  width: 100%;
  height: 26.666667vw;
}
.nav_back {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 26.666667vw;
  background: rgba(27, 126, 199, 0.5);
}
.nav_back i {
  color: #fff;
  font-size: 1.3rem;
  margin-left: 1.333333vw;
  margin-top: 1.333333vw;
}
.shop_image {
  position: absolute;
  top: 0;
  left: 50%;
  margin-left: -10vw;
  margin-top: 17vw;
}
.shop_image img {
  width: 20vw;
  height: 20vw;
  border-radius: 100%;
}
.inputMoney{
    width: 53vw;
    margin: 38px auto 0px;
    text-align: center;
    padding: 3vw;
    background-color: rgba(27, 126, 199, 0.5);
}
.the-header{
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 5px 10px; 
    color: #fff;
}
   
</style>
<template>
  <div class="forgetPw">
    <Header :isLeft="true" :title="title"/>
    <div style="margin-top: 10px;">
       <div class="item-input">
            <div class="item-right">
                <input type="text"  placeholder="请输入手机号"/>
                <span style="color: #40a1e2;">获取验证码</span>
            </div>
        </div>
        <div class="item-input">
            <div class="item-right">
                <input type="text"  placeholder="请输入验证码"/>
                <i class="fa fa-address-book" style="font-size: 17px;"></i>
            </div>
        </div>
        <div class="item-input">
            <div class="item-right">
                <input type="text"  placeholder="请确认您的新密码"/>
                <i class="fa fa-address-book" style="font-size: 17px;"></i>
            </div>
        </div>
        <p style="text-align:right;width: 91%;margin: 0 auto;" >
            <span style="color: #d0b35b;" @click="$router.push({name:'googleYz'})">忘记密码?</span>
        </p>
        <div class="complate">
            完成
        </div>
    </div>
  </div>
</template>

<script>
import Header from "../../../components/Header";
export default {
  name: "forgetPw",
  data() {
    return {
        title:'忘记密码'
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
.forgetPw {
  width: 100%;
  height: 100%;
  overflow: auto;
  box-sizing: border-box;
}
.item-input{
    display: flex;
    height: 6vh;
    margin: 12px 0;
}
.item-right{
    border-bottom: 1px solid #d6c2c2;
    width: 91%;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: start;
    -ms-flex-align: start;
    align-items: flex-start;
    -webkit-box-pack: justify;
    -ms-flex-pack: justify;
    justify-content: space-between;
    margin: 0 auto;
    height: 26px;


}
.theIcon{
  width:5%;
  font-size: 17px;
  padding: 2vw 3vw;
}
.complate{
    text-align: center;
    height: 8vw;
    line-height: 8vw;
    position: absolute;
    bottom: 0;
    width: 100%;
    background-color: #40a1e2;
    color: #fff;
}
</style>
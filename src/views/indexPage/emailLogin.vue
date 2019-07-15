<template>
  <div class="emailLogin">
    <Header :isleftHome="true"/>
    <div style="padding: 30px;">
      <div style="text-align:center"> 
        <img src="" style="width:60px;height:30px"/>
      </div>
      <div class="theItem">
        <p>
          <i class="fa fa-user"></i>
          <input type="text" placeholder="请输入邮箱" class="theinput"/>  
        </p>
      </div>
      <div class="theItem">
        <p>
          <i class="fa fa-lock"></i>
          <input type="text" placeholder="请输入密码" class="theinput"/>  
        </p>
        <i class="fa fa-eye-slash"></i>
      </div>
      <div class="thelogin">
        登录
      </div>
      <div class="the-butts">
        <span style="color:#5b92b7;"  @click="$router.push({name:'emailRigst'})">注册账号</span>
        <span style="color:#5b92b7;"  @click="$router.push({name:'emailForget'})">忘记密码?</span>
      </div>
      <div style="text-align: center;margin-top:40px;color:#999;" @click="$router.push({name:'phoneLogin'})"> 
        手机号登录
      </div>
    </div>
  </div>
</template>

<script>
import Header from "../../components/Header";
export default {
  name: "emailLogin",
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
  },
  components: {
    Header 
  }
};
</script>

<style scoped>
.emailLogin {
  width: 100%;
  height: 100%;
  overflow: auto;
  box-sizing: border-box;
}
.theItem{
  display: flex;
  justify-content: space-between;
  padding: 15px 0;
  border-bottom: 1px solid #dadada;
}
.theItem i{
  color:#999;
}
.theinput{
  margin-left: 10px
}
.thelogin{
  text-align: center;
  height: 15px;
  line-height: 15px;
  background-color: #5b92b7;
  padding: 10px;
  border-radius: 20px;
  color: #fff;
  margin: 14px 0;
}
.the-butts{
  display: flex;
  justify-content: space-between;
}
    
</style>
<template>
  <div class="emailLogin">
    <Header :isleftHome="true"/>
    <div style="padding: 30px;">
      <div style="text-align:center;padding-bottom: 20px;"> 
        <img src="../../assets/image/image_p3fFiDdpZz.png" style="width:60px;height:30px"/>
      </div>
      <div class="theItem">
        <p>
          <i class="fa fa-user"></i>
          <input type="text" placeholder="请输入邮箱" class="theinput" v-model="email"/>  
        </p>
      </div>
      <div class="theItem">
        <p>
          <i class="fa fa-lock"></i>
          <input type="text" placeholder="请输入密码" class="theinput" v-model="password"/>  
        </p>
        <i class="fa fa-eye-slash"></i>
      </div>
      <div class="thelogin" @click="goLogin">
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
import { Toast } from "mint-ui";
export default {
  name: "emailLogin",
  data() {
    return {
      email:'',
      password:''
    };
  },
  beforeRouteEnter(to, from, next) {
    next(vm => vm.getData());
  },
  methods: {
    // 获取用户信息
    getData() {
      
    },
    goLogin(){
      var me = this
       this.$axios
        .post("/api/register/email-sign", {
          email: this.email,
          password: this.password
          // os:'web'
        })
        .then(res => {
          if(res.data.code == '200'){
              // 检验成功 设置登录状态并且跳转到/
              let login_methord = {
                "methord":"email",
                "email":me.email
              }
              localStorage.setItem("access_token", res.data.data.access_token);
              localStorage.setItem("login_methord",JSON.stringify(login_methord));
              me.$store.dispatch("setAccessToken", res.data.data.access_token);  //必须有？？？
              me.$router.push('/home');
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
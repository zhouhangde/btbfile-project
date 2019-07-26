<template>
  <div class="phoneForget">
    <Header :isLeft="true" :title="title"/>
    <div style="padding: 30px;">
      <div class="theItem">
        <p>
          <input type="text" placeholder="请输入手机号" class="theinput" v-model="selectDatafor.mobile_phone"/>  
        </p>
      </div>
      <div class="theItem">
        <p>
          <input type="text" placeholder="请输入验证码" v-model="selectDatafor.varcode" class="theinput"/>
        </p>
        <!-- <i class="fa fa-wechat (alias)"></i> -->
        <span v-show="show" @click="getVarcode" style="color:blue">获取验证码</span>
        <span v-show="!show" class="count" style="color:blue">{{count}} s</span>
      </div>
      <div class="theItem"> 
        <p>
          <input type="text" placeholder="请输入新的密码" v-model="selectDatafor.password" class="theinput"/>
        </p>
        <i class="fa fa-eye-slash"></i>
      </div>
      <div class="theItem"> 
        <p>
          <input type="text" placeholder="请再次输入密码" v-model="selectDatafor.repassword" class="theinput"/>
        </p>
        <i class="fa fa-eye-slash"></i>
      </div>
      <div style="text-align: center;margin-top:40px" class="theComplate" @click="forgetPass"> 
        完成
      </div>
    </div>
  </div>
</template>

<script>
import Header from "../../components/Header";
import { Toast } from "mint-ui";
export default {
  name: "phoneForget",
  data() {
    return {
      selectDatafor:{
            mobile_phone:'',
            varcode:'',
            password:'',
            repassword:''
      },
      // 获取验证码
      show: true,
      count: '',
      timer: null,
      // 获取验证码结束
      title:"忘记密码"
    };
  },
  beforeRouteEnter(to, from, next) {
    next(vm => vm.getData());
  },
  methods: {
    // 获取用户信息
    getData() {
      
    },
    forgetPass(){
      var _this =this;
            this.$axios
            .post("api/register/forget-password", _this.selectDatafor)
            .then(res => {
              if(res.data.code == '200'){
                  // 检验成功 设置登录状态并且跳转到/
                  _this.$router.push({name:'phoneLogin'})
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
    },
    getVarcode(){
        var $this = this
        this.$axios
        .post("api/register/mobile-varcode", {
          mobile_phone: $this.selectDatafor.mobile_phone,
          type:2
        })
        .then(res => {
          if(res.data.code == '200'){
              // 检验成功 设置登录状态并且跳转到/
              console.log(res)
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

        // 60秒倒退
        const TIME_COUNT = 60;
        if (!this.timer) {
          this.count = TIME_COUNT;
          this.show = false;
          this.timer = setInterval(() => {
            if (this.count > 0 && this.count <= TIME_COUNT) {
                this.count--;
            } else {
              this.show = true;
              window.clearInterval(this.timer);
              this.timer = null;
            }
          }, 1000)
          }
    }
  },
  components: {
     Header
  }
};
</script>

<style scoped>
.phoneForget {
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
.theinput{
  margin-left: 10px
}
.theComplate{
  text-align: center;
  height: 15px;
  line-height: 15px;
  background-color: #5b92b7;
  padding: 10px;
  color: #fff;
  margin-top: 40px;
  position: absolute;
  bottom: 0;
  width: 100%;
  left: 0;
}
    
</style>
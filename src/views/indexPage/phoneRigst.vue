<template>
  <div class="phoneRigst">
    <Header :isleftHome="true"/>
    <div style="padding: 30px;">
      <div style="text-align:center;padding-bottom: 20px;"> 
        <img src="../../assets/image/image_p3fFiDdpZz.png" style="width:60px;height:30px"/>
      </div>
      <div class="theItem">
        <p>
          <i class="fa fa-user"></i>
          <input type="text" placeholder="请输入手机号" id="mobile_phone" v-model="selectDatafor.mobile_phone" class="theinput"/>  
        </p>
      </div>
      <div class="theItem">
        <p>
          <i class="fa fa-lock"></i> 
          <input type="text" placeholder="请输入密码" id="password" v-model="selectDatafor.password" class="theinput"/>
        </p>
        <i class="fa fa-eye-slash" style="color:#999;"></i>
      </div>
      <div class="theItem"> 
        <p>
          <i class="fa fa-lock"></i>
          <input type="text" placeholder="请再次输入密码" id="repassword" v-model="selectDatafor.repassword" class="theinput"/>
        </p>
        <i class="fa fa-eye-slash" style="color:#999;"></i>
      </div>
      <div class="theItem">
        <p>
          <i class="fa fa-get-pocket"></i>
          <input type="text" placeholder="请输入验证码"  id="varcode" v-model="selectDatafor.varcode" class="theinput"/>
        </p>
        <span v-show="show" @click="getVarcode" style="color:blue">获取验证码</span>
        <span v-show="!show" class="count" style="color:blue">{{count}} s</span>
      </div>
      <div class="theItem">
        <p>
          <i class="fa fa-edit (alias)"></i>
          <input type="text" placeholder="请输入邀请码"  id="code" v-model="selectDatafor.code" class="theinput"/>
        </p>
      </div>
      <div class="theRigst" @click="goRegist">
        注册
      </div>
      <div style="text-align: center;"> 
        注册即表示同意<span style="color:blue">bilongwang用户协议</span>
      </div>
      <div style="text-align: center;margin-top:40px;color:#999;" @click="$router.push({name:'emailRigst'})"> 
        邮箱注册
      </div>
    </div>
  </div>
</template>

<script>
import Header from "../../components/Header";
import { Toast } from "mint-ui";
import {
    phoneRigst   //分页查询
} from '../../../src/api/indexPage/phoneControl'
import { setInterval } from 'timers';
export default {
  name: "phoneRigst",
  data() {
    return {
      selectDatafor:{
            mobile_phone:'',
            password:'',
            repassword:'',
            varcode:'',
            code:''
      },
      show: true,
      count: '',
      timer: null,
    };
  },
  beforeRouteEnter(to, from, next) {
    next(vm => vm.getData());
  },
  methods: {
    // 获取用户信息
    getData() {
      
    },
    goRegist:function(){
           
            /* 方法,暂时不清楚为什么不可以 */
            // var _this =this;
            // phoneRigst(JSON.stringify(_this.selectDatafor)).then((res) => {
            //     if(res.code == "200"){
            //         console.log('res',res)
            //     }else{
            //        alert(res.message);
            //     }
            // }).catch(function (response) {
            //        alert("服务器异常");
            // });
           
            var _this =this;
            this.$axios
            .post("api/register/register", _this.selectDatafor)
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
          type:1
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
.phoneRigst {
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
.theItem p{
  color:#999;
}
.theinput{
  margin-left: 10px
}
.theRigst{
  text-align: center;
  height: 15px;
  line-height: 15px;
  background-color: #5b92b7;
  padding: 10px;
  border-radius: 20px;
  color: #fff;
  margin: 14px 0;
}
    
</style>
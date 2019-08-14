<template>
  <div class="forgetPw">
    <Header :isLeft="true" :title="title"/>
    <div style="margin-top: 10px;">
       <div class="item-input" v-if="showPhone">
            <div class="item-right">
                <input type="text"  :placeholder="placholderValue" disabled/>
                <!-- <span style="color: #40a1e2;" @click="phoneGetYzm">获取验证码</span> -->
                <span v-show="show" @click="phoneGetYzm" style="color:blue">获取验证码</span>
                <span v-show="!show" class="count" style="color:blue">{{count}} s</span>
            </div>
        </div>
        <div class="item-input" v-else>
            <div class="item-right">
                <input type="text"  :placeholder="placholderValue" disabled/>
                <span style="color: #40a1e2;" @click="emailGetYzm">获取验证码</span>
            </div>
        </div>
        <div class="item-input">
            <div class="item-right">
                <input type="text"  placeholder="请输入验证码" v-model="updataData.varcode"/>
                <!-- <i class="fa fa-address-book" style="font-size: 17px;"></i> -->
            </div>
        </div>
        <div class="item-input">
            <div class="item-right">
                <input type="text"  placeholder="请确认您的新密码" v-model="updataData.password"/>
                <!-- <i class="fa fa-address-book" style="font-size: 17px;"></i> -->
            </div>
        </div>
        <div class="item-input">
            <div class="item-right">
                <input type="text"  placeholder="请再次输入密码" v-model="updataData.repassword"/>
                <!-- <i class="fa fa-address-book" style="font-size: 17px;"></i> -->
            </div>
        </div>
        <div class="complate" @click="updatePasswordPhone" v-if="showPhone">
            完成
        </div>
        <div class="complate" @click="updatePasswordEmail" v-else>
            完成
        </div>
    </div>
  </div>
</template>

<script>
import Header from "../../../components/Header";
import { Toast } from "mint-ui";
import {
    phoneGetYzm,   //手机号忘记密码
    emailGetYzm,  //邮箱忘记密码，获取验证码
    updatePasswordPhone,   //手机号忘记密码，提交修改
    updatePasswordEmail   //邮箱忘记密码，提交修改
} from '../../../../src/api/me/me'
export default {
  name: "forgetPw",
  data() {
    return {
        title:'忘记密码',
        showPhone:true,
        placholderValue:'',
        updataData:{
          // mobile_phone:'',
          // email:'',
          varcode:'',
          password:'',
          repassword:''
        },
        // 获取验证码
        show: true,
        count: '',
        timer: null,
        // 获取验证码结束
    };
  },
  beforeRouteEnter(to, from, next) {
    next(vm => vm.getData());
  },
  methods: {
    // 获取用户信息
    getData() {
      let login_methord = JSON.parse(localStorage.getItem("login_methord"))
      if(login_methord == '' || login_methord == undefined || login_methord == null){
        this.$toast({
          message: '暂未登录，无法进行操作',
          position: "bottom",
          duration: 1000
        });
        return
      }

      if(login_methord.methord == 'phone'){
         this.showPhone = true
         this.placholderValue = login_methord.phone
      }else if(login_methord.methord == 'email'){
         this.showPhone = false
         this.placholderValue = login_methord.email
      }
    },
    phoneGetYzm(){
       var me = this
       let login_methord = JSON.parse(localStorage.getItem("login_methord"))
        if(login_methord == '' || login_methord == undefined || login_methord == null){
          me.$toast({
            message: '暂未登录，无法获取验证码',
            position: "bottom",
            duration: 1000
          });
          return
        }

      // 60秒倒退
      this.timeInterval();  
       
       phoneGetYzm({
          mobile_phone:me.placholderValue,
          type:2
        }).then(res => {
          if(res.data.code == '200'){
              console.log('res',res)
          }else{
             Toast({
                message: res.data.message,
                position: "bottom",
                duration: 2000
              });
              return;
          }
        })
    },
    emailGetYzm(){
       var me = this
       let login_methord = JSON.parse(localStorage.getItem("login_methord"))
        if(login_methord == '' || login_methord == undefined || login_methord == null){
          me.$toast({
            message: '暂未登录，无法获取验证码',
            position: "bottom",
            duration: 1000
          });
          return
        }
        
       this.timeInterval();
       
       emailGetYzm({
          email:me.placholderValue,
          type:1
        }).then(res => {
          if(res.data.code == '200'){
              console.log('res',res)
          }else{
             Toast({
                message: res.data.message,
                position: "bottom",
                duration: 2000
              });
              return;
          }
        })

      //  this.$axios
      //   .post("/api/register/mobile-varcode", {
      //     email:me.placholderValue,
      //     type:1
      //   })
      //   .then(res => {
      //     if(res.data.code == '200'){
      //         console.log('res',res)
      //     }else{
      //        Toast({
      //           message: res.data.message,
      //           position: "bottom",
      //           duration: 2000
      //         });
      //         return;
      //     }
      //   })
      //   .catch(err => {
      //       Toast({
      //           message: '网络错误',
      //           position: "bottom",
      //           duration: 2000
      //         });
      //         return;
      //   }); 
    },
    // 秒数减少
    timeInterval(){
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
    },
    updatePasswordPhone(){
        var me = this
        let login_methord = JSON.parse(localStorage.getItem("login_methord"))
        if(login_methord == '' || login_methord == undefined || login_methord == null){
          me.$toast({
            message: '暂未登录，无法获取验证码',
            position: "bottom",
            duration: 1000
          });
          return
        }

        updatePasswordPhone({
          mobile_phone:me.placholderValue,
          varcode:me.updataData.varcode,
          password:me.updataData.password,
          repassword:me.updataData.repassword,
          os:'android',
          // code:''
        }).then(res => {
          if(res.data.code == '200'){
              Toast({
                message: '修改成功',
                position: "bottom",
                duration: 2000
              });
          }else{
             Toast({
                message: res.data.message,
                position: "bottom",
                duration: 2000
              });
              return;
          }
        })
    },
    updatePasswordEmail(){
        var me = this
        let login_methord = JSON.parse(localStorage.getItem("login_methord"))
        if(login_methord == '' || login_methord == undefined || login_methord == null){
          me.$toast({
            message: '暂未登录，无法获取验证码',
            position: "bottom",
            duration: 1000
          });
          return
        }

        updatePasswordEmail({
          email:me.placholderValue,
          varcode:'873714',
          password:me.updataData.password,
          repassword:me.updataData.repassword,
          code:''
        }).then(res => {
          if(res.data.code == '200'){
              console.log('res',res)
          }else{
             Toast({
                message: res.data.message,
                position: "bottom",
                duration: 2000
              });
              return;
          }
        })
        
      //  this.$axios
      //   .post("/api/register/mobile-varcode", {
      //     email:me.placholderValue,
      //     varcode:'873714',
      //     password:me.updataData.password,
      //     repassword:me.updataData.repassword,
      //     code:''
      //   })
      //   .then(res => {
      //     if(res.data.code == '200'){
      //         console.log('res',res)
      //     }else{
      //        Toast({
      //           message: res.data.message,
      //           position: "bottom",
      //           duration: 2000
      //         });
      //         return;
      //     }
      //   })
      //   .catch(err => {
      //       Toast({
      //           message: '网络错误',
      //           position: "bottom",
      //           duration: 2000
      //         });
      //         return;
      //   }); 
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
    border-bottom:1px solid #ccc;
}
.item-right{
    /* border-bottom: 1px solid #d6c2c2; */
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
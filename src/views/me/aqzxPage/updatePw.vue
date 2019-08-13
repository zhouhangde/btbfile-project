<template>
  <div class="updatePw">
    <Header :isLeft="true" :title="title"/>
    <div style="margin-top: 10px;">
       <div class="item-input">
            <div class="item-right">
                <input type="text"  placeholder="请输入原密码" v-model="updateData.oldpassword"/>
            </div>
        </div>
        <div class="item-input">
            <div class="item-right">
                <input type="text"  placeholder="请输入您的新密码" v-model="updateData.password"/>
                <!-- <i class="fa fa-eye-slash" style="font-size: 17px;"></i> -->
            </div>
        </div>
        <div class="item-input">
            <div class="item-right">
                <input type="text"  placeholder="请确认您的新密码" v-model="updateData.repassword"/>
                <!-- <i class="fa fa-eye-slash" style="font-size: 17px;"></i> -->
            </div>
        </div>
        <p style="text-align:right;width: 91%;margin: 0 auto;" >
            <span style="color: #d0b35b;" @click="$router.push({name:'forgetPw'})">忘记密码?</span>
        </p>
        <div class="complate" @click="updatePassword">
            完成
        </div>
    </div>
  </div>
</template>

<script>
import Header from "../../../components/Header";
import { Toast } from "mint-ui";
export default {
  name: "updatePw",
  data() {
    return {
        title:'修改密码',
        updateData:{
          access_token:'',
          oldpassword:'',  //老密码
          password:'',
          repassword:''  //第二次输入的密码
        }
    };
  },
  beforeRouteEnter(to, from, next) {
    next(vm => vm.getData());
  },
  methods: {
    // 获取用户信息
    getData() {
      let accessToken = localStorage.getItem('access_token')
      this.updateData.access_token = accessToken
    },
    updatePassword(){

       var me = this
       if(me.updateData.access_token == '' || me.updateData.access_token == undefined || me.updateData.access_token == null){
          me.$toast({
            message: '请先登录，方可修改密码',
            position: "bottom",
            duration: 2000
            });
          return; 
       }
      
       this.$axios
        .post("/api/user/password-edit", me.updateData)
        .then(res => {
          if(res.data.code == '200'){
              Toast({
                message: '修改成功',
                position: "bottom",
                duration: 2000
              });
              me.$router.push({name:'aqzx'});
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
.updatePw {
  width: 100%;
  height: 100%;
  overflow: auto;
  box-sizing: border-box;
}
.item-input{
    display: flex;
    height: 6vh;
    margin: 12px 0;
    border-bottom: 1px solid #ccc;
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
.item-right i{
  color:#999;
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
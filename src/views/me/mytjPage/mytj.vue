<template>
  <div class="mytj">
    <Header :isLeft="true" :title="title"/>
    <div style="height: 98%;background-color: #7373bd;">
      <div class="mytj_content">  
        <div style="text-align:center">
           <img style="width:25vw;height:25vw;" :src="mytuijianData.img"/>
        </div>
        <p style="padding: 17px;text-align:center">邀请码:<span>{{mytuijianData.code}}</span></p>
        <div style="display: flex;justify-content: space-between;">
           <button class="theButton" v-clipboard:copy="mytuijianData.url"
              v-clipboard:success="onCopy"
              v-clipboard:error="onError"
           >复制链接</button>
           <!-- <button class="theButton" @click="$router.push({name:'myTuijian'})">我的推荐</button> -->
           <!-- <button class="theButton"  @click="$router.push({name:'myTuijianIfram'})">我的推荐</button> -->
           <button class="theButton"  @click="goMytuijian">我的推荐</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Header from "../../../components/Header";
import { Toast } from "mint-ui";
import {
    getMytuijian,  //获取我的推荐的二维码即跳转url
} from '../../../../src/api/me/me'
export default {
  name: "mytj",
  data() {
    return {
      title:'我的推荐',
      mytuijianData:{
        code:'',
        img:'',
        url:''
      },
      accessToken:''
    };
  },
  beforeRouteEnter(to, from, next) {
    next(vm => vm.getData());
  },
  methods: {
    // 获取用户信息
    getData() {
      let access_token = localStorage.getItem('access_token')
      this.accessToken = access_token
      this.getMytuijian()   //获取推荐的url
    },
    getMytuijian(){
      var me = this
      me.mytuijianData = {  //先置空
        code:'',
        img:'',
        url:''
      } 
      if(me.accessToken == '' || me.accessToken == undefined || me.accessToken == null){
          me.$toast({
            message: '暂未登录，无法获取推荐信息',
            position: "bottom",
            duration: 1000
          });
          return
        }

        getMytuijian({
          access_token:me.accessToken,
          os:'ios'
        }).then(res => {
          if(res.data.code == '200'){
              console.log('res',res)
              me.mytuijianData = res.data.data
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
    onCopy () {
      var me = this
      if(me.accessToken == '' || me.accessToken == undefined || me.accessToken == null){
          me.$toast({
            message: '暂未登录，无法进行操作',
            position: "bottom",
            duration: 1000
          });
          return
        }
      Toast({
          message: '复制成功',
          position: "bottom",
          duration: 2000
        });
        return;
    },
    onError () {
      Toast({
          message: '复制失败',
          position: "bottom",
          duration: 2000
        });
        return;
    },
    goMytuijian(){
      var me = this
      if(me.accessToken == '' || me.accessToken == undefined || me.accessToken == null){
          me.$toast({
            message: '暂未登录，无法进行操作',
            position: "bottom",
            duration: 1000
          });
          return
        }
        me.$router.push({name:'myTuijianIfram'})
      // window.location.href = 'http://91bilong.com/wap/invite_friends?access_token='+this.accessToken+'&os=ios&language=zh_cn HTTP/1.1'
    }
  },
  components: {
     Header
  }
};
</script>

<style scoped>
.mytj {
  width: 100%;
  height: 100%;
  overflow: auto;
  box-sizing: border-box;
}
.mytj_content{
  display: flex;
  flex-direction: column;
  justify-content: center;
  /* margin-top: 30vh; */
  padding-top: 23vh;
        width: 50%;
    margin: 0 auto;
}
.theButton{
  padding: 5px 10px;
  background-color: #afeadf;
      border-radius: 5px;
}
</style>
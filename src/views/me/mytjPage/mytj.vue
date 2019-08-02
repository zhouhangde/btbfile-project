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
           <button class="theButton" v-clipboard:copy="'http://btbfire.com/wap/share_register?os=ios&code=ohAs7v'"
              v-clipboard:success="onCopy"
              v-clipboard:error="onError"
           >复制链接</button>
           <!-- <button class="theButton" @click="$router.push({name:'myTuijian'})">我的推荐</button> -->
           <button class="theButton" @click="$router.push({name:'myTuijianIfram'})">我的推荐</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Header from "../../../components/Header";
import { Toast } from "mint-ui";
export default {
  name: "mytj",
  data() {
    return {
      title:'我的推荐',
      mytuijianData:{
        code:'',
        img:'',
        url:''
      }
    };
  },
  beforeRouteEnter(to, from, next) {
    next(vm => vm.getData());
  },
  methods: {
    // 获取用户信息
    getData() {
      this.getMytuijian()   //获取推荐的url
    },
    getMytuijian(){
      var me = this
       this.$axios
        .post("/api/register/recommend ", {
          access_token:'fJmsZgoBIfdMvmiAc3AwfhS2-Y7GScc9_1563504284',
          os:'ios'
        })
        .then(res => {
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
        .catch(err => {
            Toast({
                message: '网络错误',
                position: "bottom",
                duration: 2000
              });
              return;
        });  
    },
    onCopy () {
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
      window.location.href = 'http://btbfire.com/wap/invite_friends?access_token=fJmsZgoBIfdMvmiAc3AwfhS2-Y7GScc9_1563504284&os=ios&language=zh_cn HTTP/1.1'
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
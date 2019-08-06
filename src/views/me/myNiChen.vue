<template>
  <div class="myNiChen">
      <Header :isLeft="true" :title="title"/>
      <div style="padding: 15px;background-color: #fff;">
          <input type="text" placeholder="昵称" v-model="nichen"/>
      </div>
      <div style="padding: 15px;">
         请填写修改后的昵称（3-12个字）
      </div>
      <div class="complate" :style="{backgroundColor:(nichen.length>0?'#40a1e2':'rgb(64, 161, 226,0.3)')}" :disabled="nichen.length<1" @click="goUpdate">
        确认修改
      </div>
  </div>
</template>

<script>
import Header from "../../components/Header";
export default {
  name: "myNiChen",
  data() {
    return {
       title:'昵称',
       nichen:'',
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
    },
    goUpdate(){
      var $this = this
      if($this.nichen.length <1){
        $this.$toast({
            message: '昵称不能为空',
            position: "bottom",
            duration: 2000
          });
          return;
      }
      this.$axios
        .post("/api/member/info-update", {
          access_token: $this.accessToken,
          nickname:$this.nichen
        })
        .then(res => {
          if(res.data.code == '200'){
              // 检验成功 设置登录状态并且跳转到/
               this.$router.push({name:'personCenter'})
          }else{
            $this.$toast({
                message: res.data.message,
                position: "bottom",
                duration: 2000
              });
              return;
          }
        })
        .catch(err => {
            $this.$toast({
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
.myNiChen {
  width: 100%;
  height: 100%;
  overflow: auto;
  box-sizing: border-box;
}
.complate{
    text-align: center;
    height: 8vw;
    line-height: 8vw;
    position: absolute;
    bottom: 0;
    width: 100%;
    /* background-color: #40a1e2; */
    color: #fff;
}
</style>
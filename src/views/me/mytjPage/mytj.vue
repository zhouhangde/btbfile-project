<template>
  <div class="mytj">
    <Header :isLeft="true" :title="title"/>
    <div style="height: 98%;background-color: #7373bd;">
      <div class="mytj_content">  
        <div style="text-align:center">
           <img style="width:25vw;height:25vw;"/>
        </div>
        <p style="padding: 17px;text-align:center">邀请码:<span>H444Du</span></p>
        <div style="display: flex;justify-content: space-between;">
           <button class="theButton" v-clipboard:copy="'http://btbfire.com/wap/share_register?os=ios&code=ohAs7v'"
              v-clipboard:success="onCopy"
              v-clipboard:error="onError"
           >复制链接</button>
           <button class="theButton" @click="$router.push({name:'myTuijian'})">我的推荐</button>
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
      title:'我的推荐'
    };
  },
  beforeRouteEnter(to, from, next) {
    next(vm => vm.getData());
  },
  methods: {
    // 获取用户信息
    getData() {
      
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
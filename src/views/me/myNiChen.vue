<template>
  <div class="myNiChen">
      <Header :isLeft="true" :title="title"/>
      <div style="padding: 15px;background-color: #fff;">
          <input type="text" placeholder="昵称" v-model="nichen"/>
      </div>
      <div style="padding: 15px;">
         请填写修改后的昵称（3-12个字）
      </div>
      <div class="complate" :style="{backgroundColor:(nichen.length>0?'#40a1e2':'rgb(64, 161, 226,0.3)')}" :disabled="nichen.length<1">
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
       nichen:''
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
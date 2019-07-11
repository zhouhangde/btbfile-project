<template>
  <div class="tbdz">
     <Header :isLeft="true" :title="title"/>
     <div style="text-align: center;margin-top: 20vh;">
      <img  style="width:30vw;height:30vw" />
    </div>
    <p style="text-align: center;margin-top: 20px;">您还没有创建提币地址,快去创建吧!</p>
    <div class="creatAddress" @click="$router.push({name:'addTbdz'})">
      创建提币地址
    </div>
  </div>
</template>

<script>
import Header from "../../../components/Header";
export default {
  name: "tbdz",
  data() {
    return {
      title:'提币地址'
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
.tbdz {
  width: 100%;
  height: 100%;
  overflow: auto;
  box-sizing: border-box;
}
.creatAddress{
    text-align: center;
    height: 8vw;
    line-height: 8vw;
    position: absolute;
    bottom: 0;
    width: 100%;
    background-color: #bbc5e8;
}
    
</style>
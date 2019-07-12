<template>
  <div class="myzctx">
    <Header :isLeft="true" :title="title"/>
  </div>
</template>

<script>
import Header from "../../../components/Header";
export default {
  name: "myzctx",
  data() {
    return {
        title:'转出USDT'
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
.myzctx {
  width: 100%;
  height: 100%;
  overflow: auto;
  box-sizing: border-box;
}
</style>
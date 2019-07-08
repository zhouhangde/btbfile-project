<template>
  <div class="smrz">
    <Header :isLeft="true" :title="title"/>
  </div>
</template>

<script>
import Header from "../../components/Header";
export default {
  name: "smrz",
  data() {
    return {
        title:'实名认证'
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
.smrz {
  width: 100%;
  height: 100%;
  overflow: auto;
  box-sizing: border-box;
}
</style>
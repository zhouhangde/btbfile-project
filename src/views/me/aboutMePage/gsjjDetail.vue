<template>
  <div class="gsjjDetail">
    <Header :title="title" :isLeft="true"/>
    <p style="padding: 15px;">您要访问的内让不存在</p>
  </div>
</template>

<script>
import Header from "../../../components/Header";
export default {
  name: "gsjjDetail",
  data() {
    return {
        title:'公司简介'
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
.gsjjDetail {
  width: 100%;
  height: 100%;
  overflow: auto;
  box-sizing: border-box;
}
</style>
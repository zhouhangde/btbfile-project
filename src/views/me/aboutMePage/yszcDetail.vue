<template>
  <div class="yszcDetail">
    <Header :title="title" :isLeft="true"/>
    <p style="padding: 15px;">您要访问的内让不存在</p>
  </div>
</template>

<script>
import Header from "../../../components/Header";
export default {
  name: "yszcDetail",
  data() {
    return {
        title:'隐私政策'
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
.yszcDetail {
  width: 100%;
  height: 100%;
  overflow: auto;
  box-sizing: border-box;
}
</style>
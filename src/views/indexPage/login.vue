<template>
  <div class="login">
    登录页面
  </div>
</template>

<script>
export default {
  name: "login",
  data() {
    return {
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
     
  }
};
</script>

<style scoped>
.login {
  width: 100%;
  height: 100%;
  overflow: auto;
  box-sizing: border-box;
}
</style>
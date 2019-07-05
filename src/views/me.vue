<template>
  <div class="me">
    me
  </div>
</template>

<script>
export default {
  name: "me",
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
  }
};
</script>

<style scoped>

</style>
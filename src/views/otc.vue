<template>
  <div class="otc">
    otc
  </div>
</template>

<script>
export default {
  name: "otc",
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
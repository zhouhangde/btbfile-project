<template>
  <div class="demo">
    
  </div>
</template>

<script>
export default {
  name: "demo",
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
.demo {
  width: 100%;
  height: 100%;
  overflow: auto;
  box-sizing: border-box;
}
</style>
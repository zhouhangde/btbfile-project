<template>
  <div class="Rigist">
    Rigist
  </div>
</template>

<script>
export default {
  name: "Rigist",
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
.Rigist {
  width: 100%;
  height: 100%;
  overflow: auto;
  box-sizing: border-box;
}
</style>
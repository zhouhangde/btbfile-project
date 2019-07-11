<template>
  <div class="smrzDetail">
    <Header :isLeft="true" :title="title"/>
    <div style="text-align: center;margin-top: 60px;">
      <img  style="width:20vw;height:20vw" />
    </div>
    <p style="text-align: center;margin-top: 20px;">已认证</p>
  </div>
</template>

<script>
import Header from "../../../components/Header";
export default {
  name: "smrzDetail",
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
.smrzDetail {
  width: 100%;
  height: 100%;
  overflow: auto;
  box-sizing: border-box;
}
</style>
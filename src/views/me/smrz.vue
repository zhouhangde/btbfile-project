<template>
  <div class="smrz">
    <Header :isLeft="true" :title="title"/>
    <div>
      <div class="address-cell"  @click="$router.push({name:'smrz'})">
        <i class="fa fa-map-marker"></i>
        <div class="address-index">
          <span>个人认证</span>
          <i class="fa fa-angle-right"></i>
        </div>
      </div>
    </div>
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
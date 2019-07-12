<template>
  <div class="index">
    <!-- keep-alive用于将全局的路由进行数据缓存 -->
     <router-view></router-view>
     <TabBar :data="tabbarData"/>
  </div>
</template>

<script>
import TabBar from "../components/TabBar";
export default {
  name: "index",
  data() {
    return {
      tabbarData: [
        { title: "首页", icon: "gg", path: "/home" },
        { title: "行情", icon: "credit-card", path: "/hanq" },
        { title: "交易", icon: "bandcamp", path: "/jiaoyi" },
        { title: "OTC", icon: "yen (alias)", path: "/otc" },
        { title: "我的", icon: "user", path: "/me" }
      ]
    };
  },
  components: {
     TabBar
  }
};
</script>

<style scoped>
.index {
  width: 100%;
  height: calc(100% - 45px);
}
</style>

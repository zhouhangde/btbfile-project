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
        { title: "首页", icon: "home", path: "/home" },
        { title: "行情", icon: "file-text-o", path: "/hanq" },
        { title: "交易", icon: "user", path: "/jiaoyi" },
        { title: "OTC", icon: "home", path: "/otc" },
        { title: "我的", icon: "home", path: "/me" }
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

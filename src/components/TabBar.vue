<template>
  <div class="tabbar">
    <router-link
      class="tab-item"
      v-for="(item,index) in data"
      :key="index"
      :to="item.path"
      active-class="is-selected"
    >
      <div class="tab-item-icon">
        <i :class="'fa fa-' + item.icon"></i>
      </div>
      <div class="tab-item-label">{{item.title}}</div>
    </router-link>
  </div>
</template>

<script>
export default {
  name: "tabbar",
  props: {
    data: Array
  }
};
</script>

<style scoped>
.tabbar {
  height: 45px;
  box-sizing: border-box;
  width: 100%;
  position: fixed;
  bottom: 0;
  /* linear-gradient创建一个线性渐变的 "图像"。 */
  background-image: linear-gradient(
    180deg,
    #d9d9d9,
    /* 50%为颜色值的透明度  */
    #d9d9d9 50%,
    /* transparent，意思就代表背景透明 */
    transparent 0
  );
  background-size: 100% 1px;
  background-repeat: no-repeat;
  background-position: 0 0;
  background-color: #fafafa;
  display: flex;
  text-align: center;
}
.tab-item {
  display: block;
  padding: 3px 0;
  flex: 1;
}
.tab-item-icon {
  width: 20px;
  height: 20px;
  margin: 0 auto 5px;
}
.tab-item-icon i {
  font-size: 16px;
  line-height: 25px;
}
.tab-item-label {
  /* inherit 关键字指定一个属性应从父元素继承它的值 */
  color: inherit;
  font-size: 10px;
  line-height: 1;
}
a {
  text-decoration: none;
  color: #999;
}
/* 用在当前活动的路由上，下即为动态添加的样式 */
.is-selected {
  color: rgb(2,136,207);
}
</style>

<template>
  <div class="Header">
    <span style="position: absolute;left: 12px;" v-if="isLeft">
      <i class="fa fa-chevron-left" @click="$router.go(-1)"></i>
    </span>
    <span>
      {{title}}
      <i class="fa fa-angle-down" v-if="xial"></i>
     </span>
     <span v-if="xin" class="myicon">
       <i class="fa fa-ellipsis-v"></i>
     </span>
     <span v-if="biao" class="myicon">
       <i class="fa fa-bar-chart"></i>
     </span>
     <span v-if="aside" class="myicon">
       <i class="fa fa-star-o"></i>
     </span>
     <span v-if="newIcon" class="myicon">
       <i class="fa reorder (alias)"></i>
     </span>
  </div>
</template>

<script>
export default {
  name: "Header",
  props: {
    isLeft: {
      type: Boolean,
      default: false
    },
    title: String,
    xial: Boolean,  //显示下拉图标
    xin:Boolean,  //显示收藏图标
    biao:Boolean,  //显示统计图标
    aside:Boolean,  //显示右侧的三个点图标
    newIcon:Boolean //新增图标

  },
  created(){
    console.log(this.title)
  }
};
</script>

<style scoped>
  .Header{
      text-align: center;
      font-size: 16px;
      height: 40px;
      line-height: 40px;
  }
  .myicon{
    float: right;
    margin-right: 10px
  }
</style>

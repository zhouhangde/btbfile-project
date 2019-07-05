<template>
  <div class="Header">
    <span>
      {{title}}
      <i class="fa fa-address-book" v-if="xial"></i>
     </span>
     <span v-if="xin" class="myicon">
       <i class="fa fa-address-book"></i>
     </span>
     <span v-if="biao" class="myicon">
       <i class="fa fa-address-book"></i>
     </span>
     <span v-if="aside" class="myicon">
       <i class="fa fa-address-book"></i>
     </span>
  </div>
</template>

<script>
export default {
  name: "Header",
  props: {
    title: String,
    xial: Boolean,  //显示下拉图标
    xin:Boolean,  //显示收藏图标
    biao:Boolean,  //显示统计图标
    aside:Boolean,  //显示右侧的三个点图标

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

<template>
  <div class="Header">
    <span style="position: absolute;left: 12px;" v-if="isLeft">
      <i class="fa fa-chevron-left" @click="$router.go(-1)"></i>
    </span>
    <span @click="showCondition(title)">
      {{title}}
      <i class="fa fa-angle-down" v-if="xial"></i>
     </span>
     <span v-if="aside" class="myicon" @click="showActionsheet">
       <i class="fa fa-ellipsis-v"></i>
     </span>
     <span v-if="biao" class="myicon" @click="$router.push({name:'homeKxEarchat'})">
       <i class="fa fa-bar-chart"></i>
     </span>
     <span v-if="xin" class="myicon" @click="shoucan">
       <i class="fa fa-star-o" style="color:#b62727" v-if="shoucanState"></i>
       <i class="fa fa-star-o" v-else></i>
     </span>
     <span v-if="newIcon" class="myicon">
       <i class="fa reorder (alias)"></i>
     </span>
     <span v-if="historytitle" class="myicon">
       历史
     </span>
  </div>
</template>

<script>
export default {
  name: "Header",
  data() {
    return {
      shoucanState:false
    }
  },
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
    newIcon:Boolean, //新增图标
    historytitle:Boolean //显示历史

  },
  created(){
    console.log(this.title)
  },
  methods:{
    showActionsheet(){
      this.$emit("showAction", {
            showAction: true    //获取条件距离最近distance，作为条件
      });
    },
    shoucan(){
      this.shoucanState = !this.shoucanState;
    },
    showCondition(conditon){
      this.$emit("condit", {
            conditon:conditon    //获取条件距离最近distance，作为条件
      });
    }
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
    /* margin-right: 10px; */
        padding: 0px 10px;
  }
</style>

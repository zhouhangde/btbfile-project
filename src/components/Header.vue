<template>
  <div class="Header">
    <span style="position: absolute;left: 12px;" v-if="isLeft">
      <i class="fa fa-chevron-left" @click="$router.go(-1)"></i>
    </span>
    <span style="position: absolute;left: 12px;" v-if="isLeftgoZc">
      <i class="fa fa-chevron-left" @click="$router.push({name:'myzc'})"></i>
    </span>
    <span style="position: absolute;left: 12px;" v-if="isLeftgoMe">
      <i class="fa fa-chevron-left" @click="$router.push({name:'me'})"></i>
    </span>
    <span style="position: absolute;left: 12px;" v-if="isleftHome">
      <i class="fa fa-chevron-left" @click="$router.push({name:'home'})"></i>
    </span>
    <span @click="showCondition(title)">
      {{title}}
      <i class="fa fa-angle-down" v-if="xial"></i>
     </span>
     <span v-if="aside" class="myicon" @click="showActionsheet">
       <i class="fa fa-ellipsis-v"></i>
     </span>
     <span v-if="biao" class="myicon" @click="gohomeKxEarchatNew">
       <i class="fa fa-bar-chart"></i>
     </span>
     <span v-if="xin" class="myicon" @click="shoucan">
       <i class="fa fa-star-o" style="color:#b62727" v-if="bizhStaus.staus"></i>
       <i class="fa fa-star-o" v-else></i>
     </span>
     <span v-if="newIcon" class="myicon" @click="newItem">
       <i class="fa fa-plus"></i>
     </span>
     <!-- 新增收款信息 -->
     <span v-if="newSkMethordIcon" class="myicon" @click="shownewSkMethord">
       <i class="fa fa-plus"></i>
     </span>
     <span v-if="historytitle" class="myicon" @click="$router.push({name:'zzmx'})">
       历史
     </span>
     <span v-if="fabu" class="myicon" style="color: #27ce13;" @click="$router.push({name:'gofabu'})">
       发布
     </span>
  </div>
</template>

<script>
import { Toast } from "mint-ui";
export default {
  name: "Header",
  data() {
    return {
      shoucanState:true
    }
  },
  props: {
    isLeft: {
      type: Boolean,
      default: false
    },
    isLeftgoZc:{
      type: Boolean,
      default: false
    },
    isLeftgoMe:{
      type: Boolean,
      default: false
    },
    isleftHome:{
      type: Boolean,
      default: false
    },
    title: String,
    xial: Boolean,  //显示下拉图标
    xin:Boolean,  //显示收藏图标
    biao:Boolean,  //显示统计图标
    aside:Boolean,  //显示右侧的三个点图标
    newIcon:Boolean, //新增图标
    newSkMethordIcon:Boolean, //新增收款方式
    historytitle:Boolean, //显示历史
    fabu:Boolean, //显示发布
    bizhStaus:{
      type: Object,
      default: function () {
          return { staus: false }
      }  //注意对象和数组必须已工程的方式返回
    }   //币种是否收藏的状态

  },
  created(){
  },
  methods:{
    showActionsheet(){
      this.$emit("showAction", {
            showAction: true    //获取条件距离最近distance，作为条件
      });
    },
    shoucan(){
      let access_token = localStorage.getItem('access_token')
      var $this = this
      if(access_token ==null || access_token ==undefined || access_token ==''){
         $this.$toast({
            message: '请先登录，方可收藏操作',
            position: "bottom",
            duration: 2000
            });
          return;   
      }
      this.bizhStaus.staus = !this.bizhStaus.staus;
      // this.bizhStaus= !this.bizhStaus;
      this.$emit("addOrDeleteSj", {
            condition:this.bizhStaus.staus  //获取条件距离最近distance，作为条件
      });
    },
    showCondition(conditon){
      this.$emit("condit", {
            conditon:conditon    //获取条件距离最近distance，作为条件
      });
    },
    newItem(){
      this.$emit("shownewItem", {
            showBottom:true    //获取条件距离最近distance，作为条件
      });
    },
    shownewSkMethord(){
      // 新增收款方式
      this.$emit("shownewSkMethord");
    },
    gohomeKxEarchatNew(){
      // 进入k线
      this.$emit("gomyhomeKxEarchatNew");
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

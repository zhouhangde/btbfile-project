<template>
  <div class="Header">
    <!-- 是否显示向左的返回 -->
    <span style="position: absolute;left: 12px;" v-if="isLeft">
      <i class="fa fa-chevron-left" @click="$router.go(-1)"></i>
    </span>

    <!-- 是否显示向左的返回，指定跳转到'我的资产' -->
    <span style="position: absolute;left: 12px;" v-if="isLeftgoZc">
      <i class="fa fa-chevron-left" @click="$router.push({name:'myzc'})"></i>
    </span>

    <!-- 是否显示向左的返回，指定跳转到'我的' --> 
    <span style="position: absolute;left: 12px;" v-if="isLeftgoMe">
      <i class="fa fa-chevron-left" @click="$router.push({name:'me'})"></i>
    </span>

    <!-- 是否显示向左的返回，指定跳转到'首页' --> 
    <span style="position: absolute;left: 12px;" v-if="isleftHome">
      <i class="fa fa-chevron-left" @click="$router.push({name:'home'})"></i>
    </span>

    <!-- 默认都显示title --> 
    <span @click="showCondition(title)">
      {{title}}
      <!-- 是否在title后显示下拉图标 -->
      <i class="fa fa-angle-down" v-if="xial"></i>
     </span>
      
     <!-- 交易页面的边栏点击显示交易记录下拉操作栏图标 -->
     <span v-if="aside" class="myicon" @click="showActionsheet">
       <i class="fa fa-ellipsis-v"></i>
     </span>

     <!-- 点击进入显示我的k线图的图标 -->
     <span v-if="biao" class="myicon" @click="gohomeKxEarchatNew">
       <i class="fa fa-bar-chart"></i>
     </span>
     
     <!-- 交易页面显示收藏的图标 -->
     <span v-if="xin" class="myicon" @click="shoucan">
       <!-- 显示为收藏 -->
       <i class="fa fa-star-o" style="color:#b62727" v-if="bizhStaus.staus"></i>
       <!-- 显示为未收藏 -->
       <i class="fa fa-star-o" v-else></i>
     </span>

     <!-- 新增图标,用于新增银行卡，暂时没有用 -->
     <span v-if="newIcon" class="myicon" @click="newItem">
       <i class="fa fa-plus"></i>
     </span>

     <!-- 新增收款信息 -->
     <span v-if="newSkMethordIcon" class="myicon" @click="shownewSkMethord">
       <i class="fa fa-plus"></i>
     </span>
     
     <!-- 查看历史 -->
     <span v-if="historytitle" class="myicon" @click="$router.push({name:'zzmx'})">
       历史
     </span>

     <!-- 查看发布 -->  
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
    }
  },
  props: {
    // 是否显示向左的返回
    isLeft: {
      type: Boolean,
      default: false
    },
    // 是否显示向左的返回，指定跳转到'我的资产'
    isLeftgoZc:{
      type: Boolean,
      default: false
    },
    // 是否显示向左的返回，指定跳转到'我的'
    isLeftgoMe:{
      type: Boolean,
      default: false
    },
    // 是否显示向左的返回，指定跳转到'首页'
    isleftHome:{
      type: Boolean,
      default: false
    },
    title: String,  //标题
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
  methods:{
    showActionsheet(){
      this.$emit("showAction", {
            showAction: true    //显示交易记录下拉操作栏图标
      });
    },
    shoucan(){   //点击进行收藏的，判断是否登陆
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
      this.bizhStaus.staus = !this.bizhStaus.staus;  //修改收藏状态
      this.$emit("addOrDeleteSj", {
            condition:this.bizhStaus.staus  //添加或删除收藏
      });
    },
    // 点击title显示下拉（市场）
    showCondition(conditon){
      this.$emit("condit", {
            conditon:conditon   
      });
    },
    // 新增的图标点击
    newItem(){
      this.$emit("shownewItem", {
            showBottom:true    
      });
    },
    // 新增收款方式
    shownewSkMethord(){
      this.$emit("shownewSkMethord");
    },
    // 进入k线
    gohomeKxEarchatNew(){
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
     padding: 0px 10px;
  }
</style>

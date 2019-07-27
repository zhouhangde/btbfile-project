<template>
  <div class="myMessage">
     <Header :isLeft="true" :title="title"/>
     <!-- 导航 -->
     <HanqTab :hqfilterData="hanqTabData"  @update="update"/>

     <!-- 涨幅跌幅信息 ，bottom-all-loaded上拉加载是否完成-->
     <!-- auto-fill若为真，loadmore 会自动检测并撑满其容器 -->
    <mt-loadmore
        :top-method="loadTop"
        :auto-fill="false"   
        ref="loadmore"
        >
        <div class="Datalist">
            <HanqTabList v-for="(item,index) in zxorusData" :key="index" :zorjdata="item.myData"/>
        </div>
    </mt-loadmore>
  </div>
</template>

<script>
const myzixuDataOne = require('../../../data/gongGaoDataOne.json');
const myusdtDataOne = require('../../../data/tongzhiDataOne.json');
const myhanqTabData = require('../../../data/myMessageTabData.json');
import Header from "../../components/Header";
import HanqTab from "../../components/me/myMessgTab";
import HanqTabList from "../../components/me/myMessgTabList";
export default {
  name: "myMessage",
  data() {
    return {
       title:'消息',
       hanqTabData:{},  //tab切换的title
       zxorusData:[],   //tab下的切换的列表数据
       page: 1,   //当前页数
       size: 5,   //分页数
       allLoaded: false,   //是否已经加载完毕，无加载数据的开关
       bottomPullText: "上拉加载更多",   //底部的加载显示字样
       data: null,  //tab切换条件
    };
  },
  beforeRouteEnter(to, from, next) {
    next(vm => vm.getData());
  },
  methods: {
    // 获取用户信息
    getData() {
      this.hanqTabData = myhanqTabData
       console.log('导航的title',this.hanqTabData)
       this.loadData()
    },
     //初始加载数据
    loadData() {
      // 拉取商家信息，默认是综合排序的第一页的数据
      this.zxorusData = myzixuDataOne;
      // 判断是否有点击tab，初始状态this.data为null
      if(this.data){
        if(this.data.condition== "zixu"){
          // 加载自选数据
          console.log("加载涨幅数据");
          this.zxorusData = myzixuDataOne;
        }else{
          // 加载usdt的数据
          console.log("加载跌幅的数据");
          this.zxorusData = myusdtDataOne;
        }
      }
    },
    // 下拉刷新，top-method
    loadTop() {
      this.page = 1;
      // resurantsOneData为什么数据也会变？？？
      this.allLoaded = false;  //开启上拉加载，未加载完数据
      // 拉取商家信息
       this.$refs.loadmore.onTopLoaded();    //停止下拉刷新
       this.zxorusData =  this.zxorusData.splice(0,3);
    },
     //tab切换，根据点击tab的条件加载数据
    update(condation) {  
      // console.log(condation);
      this.data = condation;
      this.loadData();
    }
  },
  components: {
     Header,
     HanqTab,
     HanqTabList
  }
};
</script>

<style scoped>
.myMessage {
  width: 100%;
  height: 100%;
  overflow: auto;
  box-sizing: border-box;
}
</style>
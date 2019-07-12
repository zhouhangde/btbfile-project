<template>
  <div class="zzmx">
      <Header :title="title" :isLeft="true"/>
      <!-- 导航 -->
       <MxTab :hqfilterData="hanqTabData"  @update="update"/>

     <!-- 涨幅跌幅信息 ，bottom-all-loaded上拉加载是否完成-->
     <!-- auto-fill若为真，loadmore 会自动检测并撑满其容器 -->
    <mt-loadmore
        :top-method="loadTop"
        :auto-fill="false"   
        ref="loadmore"
        >
        <div class="Datalist">
            <MxTabList v-for="(item,index) in zxorusData" :key="index" :zorjdata="item.myData"/>
        </div>
    </mt-loadmore>
  </div>
</template>

<script>
const myzixuDataOne = require('../../../../data/czDataOne.json');
const myusdtDataOne = require('../../../../data/txDataOne.json');
const myhanqTabData = require('../../../../data/mxTabData.json');
import Header from "../../../components/Header";
import MxTab from "../../../components/me/MxTab";
import MxTabList from "../../../components/me/MxTabList";
export default {
  name: "zzmx",
  data() {
    return {
       title:'明细',
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
      MxTab,
      MxTabList
  }
};
</script>

<style scoped>

</style>
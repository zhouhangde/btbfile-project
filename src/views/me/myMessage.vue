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
            <!-- <HanqTabList v-for="(item,index) in zxorusData" :key="index" :zorjdata="item.myData"/> -->
            <HanqTabList  :zorjdata="zxorusDataNew" v-if="showGgOrmess"/>
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
import { Toast } from "mint-ui";

export default {
  name: "myMessage",
  data() {
    return {
       title:'消息',
       hanqTabData:{},  //tab切换的title
       zxorusData:[],   //tab下的切换的列表数据
       zxorusDataNew:[],   //tab下的切换的列表接口数据
       page: 1,   //当前页数
       size: 5,   //分页数
       allLoaded: false,   //是否已经加载完毕，无加载数据的开关
       bottomPullText: "上拉加载更多",   //底部的加载显示字样
       data: null,  //tab切换条件
       showGgOrmess:false  //显示列表数据的开关
    };
  },
  beforeRouteEnter(to, from, next) {
    next(vm => vm.getData());
  },
  methods: {
    // 获取用户信息
    getData() {
       this.hanqTabData = myhanqTabData
       this.getGgData()    //获取tab下的公告数据
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
          // console.log("加载公告数据");
          // this.zxorusData = myzixuDataOne;
          this.getGgData()
          
        }else{
          // 加载usdt的数据
          // console.log("加载消息的数据");
          // this.zxorusData = myusdtDataOne;
          this.getMessageData()
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
    },
    getGgData(){
       var me = this
       this.$axios
        .post("/api/start/cate", {
          id: '9',
          limit_num: '20',
          limit_begin: '0'
        })
        .then(res => {
          if(res.data.code == '200'){
              me.showGgOrmess = true
              me.zxorusDataNew = res.data.data
          }else{
             me.showGgOrmess = false
             Toast({
                message: res.data.message,
                position: "bottom",
                duration: 2000
              });
              return;
          }
        })
        .catch(err => {
            Toast({
                message: '网络错误',
                position: "bottom",
                duration: 2000
              });
              return;
        });
    },
    getMessageData(){
       var me = this
       this.$axios
        .post("/api/member/message-list", {
          access_token: '9yv8FP7oH7XdRSqXYunb1ySTAp8trd2B_1560572313',
          type: '1'
        })
        .then(res => {
          if(res.data.code == '200'){
               me.showGgOrmess = true
              me.zxorusDataNew = res.data.data
          }else{
            me.showGgOrmess = false
             Toast({
                message: res.data.message,
                position: "bottom",
                duration: 2000
              });
              return;
          }
        })
        .catch(err => {
            Toast({
                message: '网络错误',
                position: "bottom",
                duration: 2000
              });
              return;
        });
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
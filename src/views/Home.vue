<template>
  <div class="home">
    <div class="header">
      <div style="display:flex;align-items: center;">
        <img src="../assets/image/image_p3fFiDdpZz.png" style="width: 50px;height: 17px;"/>
        <!-- <i class="fa fa-address-book" style="color:#7272e0"></i> -->
        <span class="header_title">bilongwang</span>
      </div>
      <div v-if="hasLogin">
        <!-- <span style="color: rgb(114, 114, 224);margin-right:15px" @click="$router.push({name:'homeKxEarchatNew'})">socket</span> -->
        <span style="color: rgb(114, 114, 224);" @click="$router.push({name:'phoneRigst'})">注册</span>
        <span style="color: rgb(114, 114, 224);margin-left:15px" @click="$router.push({name:'phoneLogin'})">登陆</span>
      </div>
    </div>
     <div id="container">
      <!-- 轮播 -->
      <mt-swipe :auto="4000" class="swiper" :show-indicators="false">
        <mt-swipe-item v-for="(img,index) in swipeImgs" :key="index">
          <img :src="img" alt>
        </mt-swipe-item>
      </mt-swipe>
    </div>
     <!-- 列表 -->
    <!-- <HomeOne :data="homeOneData"/> -->
    <HomeOne :data="homeOneDataNew.slice('0','3')"/>
    <div class="zh_gonggao">
      <div class="gonggao" style="display: flex;">
        <i class="fa fa-volume-up" style="font-size: 17px;"></i>
        <span style="margin-left: 7px;display: flex;align-items: center;">
          <em style="color:#989292">公告:</em>
          <!-- <em style="margin-left: 5px;">交易所bilongwang即将开盘交易</em></span> -->
          <div class="scroll" style="height: 14px; overflow: hidden;margin-left: 7px">
              <ul id="scrollDiv"  ref="rollul" :class="{anim:animate==true}">
                  <li v-for="(item,index) in cateData" :key="index"><span>{{item.title}}</span></li>
              </ul>
           </div>
         </span>
      </div>
    </div>


     <!-- 导航 -->
     <HomeTwo :filterData="homeTwoData"  @update="update"/>

     <!-- 涨幅跌幅信息 ，bottom-all-loaded上拉加载是否完成-->
    <!-- auto-fill若为真，loadmore 会自动检测并撑满其容器 -->
    <!-- <mt-loadmore
      :top-method="loadTop"
      :bottom-method="loadMore"   
      :bottom-all-loaded="allLoaded"
      :auto-fill="false"   
      :bottomPullText="bottomPullText"
      ref="loadmore"
    > -->
    <mt-loadmore
      :bottom-all-loaded="allLoaded"
      :auto-fill="false"   
      :bottomPullText="bottomPullText"
      ref="loadmore"
    >
      <div class="Datalist">
        <!-- <HomeList v-for="(item,index) in zorjDataJson" :key="index" :zorjdata="item.myData"/> -->
        <HomeList :zorjdata="zorjDataJsonNew"/>
      </div>
    </mt-loadmore>
  </div>
</template>

<script>
const shoppingData = require('../../data/shopping.json');
const myHomeOneData = require('../../data/home-one.json');
const myHomeTwoData = require('../../data/home-two.json');
const myzfDataOne = require('../../data/zfDataOne.json');
const myzfDataTwo = require('../../data/zfDataTwo.json');
const myzfDataThree = require('../../data/zfDataThree.json');
const mydfDataOne = require('../../data/dfDataOne.json');
import { Swipe, SwipeItem, Loadmore} from "mint-ui";
import HomeOne from "../components/home/HomeOne";
import HomeTwo from "../components/home/HomeTwo";
import HomeList from "../components/home/HomeList";
// import FilterView from "../components/FilterView";
import {
    findhomeOneData   //分页查询
} from '../../src/api/home/home'
import { Indicator } from 'mint-ui';
export default {
  name: "home",
  data() {
    return {
      swipeImgs: [],   //轮播条件
      homeOneData:[],  //轮播下的列表数据
      homeOneDataNew:[],  //轮播下的列表websocket数据
      homeTwoData:{},  //公共下的导航数据
      zorjDataJson:[],  //tab切换下的列表数据
      zorjDataJsonNew:[],  //tab切换下的列表websocket数据
      page: 1,   //当前页数
      size: 5,   //分页数
      allLoaded: false,   //是否已经加载完毕，无加载数据的开关
      bottomPullText: "上拉加载更多",   //底部的加载显示字样
      data: null,  //tab切换条件
      // hasLogin:true   //是否登陆（默认为未登录）
      zfData:[],   //存储websocket涨幅数据
      dfData:[],    //存储websocket跌幅数据
      cateData:[],   //公告数据
      animate:false,  //公告轮播状态
      timer:null,  //定时器
    };
  },
  computed: {
    address() {
      // return this.$store.getters.address;
    },
    hasLogin(){
      let access_token = localStorage.getItem('access_token')
      let vux_access_token = this.$store.getters.access_token   //必须有？？？
      if(access_token!=null && access_token !='' && access_token!=undefined){
          return false
      }else{
          return true
      }
    }
  },
  // beforeRouteEnter(to, from, next) {
  //   next(vm => vm.getData());
  // },
  beforeRouteLeave(to, from, next) {
    // 离开页面关闭定时器
    this.timer = null
    next()
  },
  created() {
    this.getData();
    this.initsetInterval();  //定时刷新页面
    // this.checkLogin();   //检查是否登陆
  },
  mounted () {
    setInterval(this.scroll,2000)  //开启公告
  },
  watch: {
      homeOneDataNew(val) {
        this.homeOneDataNew = val;
        // this.$set(this.homeOneDataNew,this.theIndex, val);
        if(this.homeOneDataNew.length == 7){
            var $this = this
            this.homeOneDataNew.filter(function(item, index, arr){
               if(item.result.last>item.result.open){
                    // 涨幅的数据
                    item.color = "rgb(77,169,144)"
                    $this.zfData.push(item)
               }else{  
                    //跌幅的数据
                    item.color = "#e27373"
                    $this.dfData.push(item)
               }

            })
        }
      }
  },
  methods: {
    getData() {
      // 获取轮播信息
      var $this = this
      this.swipeImgs = shoppingData.swipeImgs;   //轮播图片
      this.homeOneData = myHomeOneData.mydata;   //轮播下面的列表数据
      window.revieceData2 = function(res) {
         return $this.storeData(res)
       }

      this.getCate();   //获取公告内容 
      this.homeTwoData = myHomeTwoData;   //导航标题
      this.loadData();
    },
    checkLogin(){
      let access_token = localStorage.getItem('access_token')
      let vux_access_token = this.$store.getters.access_token
      if(access_token!=null && access_token !='' && access_token!=undefined){
          this.hasLogin = false
      }else{
          this.hasLogin = true
      }
    },
     //初始加载数据
    loadData() {
      // 拉取商家信息，默认是综合排序的第一页涨幅的数据
      // this.zorjDataJson = myzfDataOne;
      this.zorjDataJsonNew = this.zfData;
      // 判断是否有点击tab，初始状态this.data为null
      if(this.data){
        if(this.data.condition== "zf"){
          // 加载涨幅数据
          // console.log("加载涨幅数据");
          // this.zorjDataJson = myzfDataOne;
          this.zorjDataJsonNew = this.zfData;
        }else{
          // 加载降幅的数据
          // console.log("加载跌幅的数据");
          // this.zorjDataJson = mydfDataOne;
          this.zorjDataJsonNew = this.dfData;
        }
      }
      
    },
    // 下拉刷新，top-method
    loadTop() {
      this.page = 1;
      // resurantsOneData为什么数据也会变？？？
      this.allLoaded = false;  //开启上拉加载，未加载完数据
      this.bottomPullText = "上拉加载更多";    //此处必须这样写，原因不明
      // this.$nextTick(() => {
      //   this.bottomPullText = "上拉加载更多21412";    //此处必须这样写，原因不明
      // })
      // this.bottomPullText = "上拉加载更多";    //此处必须这样写，原因不明
      // 拉取商家信息
       this.$refs.loadmore.onTopLoaded();    //停止下拉刷新
       this.zorjDataJson =  myzorjDataOneData.splice(0,3);
       
    },
    // 上拉加载，bottom-method
    loadMore() {
      // 如果没有加载完毕下
      if (!this.allLoaded) {
        this.page++;
            //  下拉加载下一页完之后重新渲染
            if(this.page == "2"){
             
              this.$refs.loadmore.onBottomLoaded();   //onBottomLoaded为数据获取完毕
              myzorjDataTwoData.forEach(item => {
                  this.zorjDataJson.push(item);
              });
           }else if(this.page == "3"){
             this.$refs.loadmore.onBottomLoaded();
              myzorjDataThreeData.forEach(item => {
                  this.zorjDataJson.push(item);
              });
              
          }else{
             const zorjDataFourData = [];
             if (zorjDataFourData.length > 0) {
                zorjDataFourData.forEach(item => {
                  this.zorjDataJson.push(item);
                });
                // 如果最后一页的数据小于5，也表示已经加载完成
                if (zorjDataJson < this.size) {
                  // allLoaded：为false时，说明你还没有加载完，可以继续加载；为true时，说明你已经加载完了，不能再继续加载
                  // :auto-fill=”false” 意思是当你还没有滑到底部时（其实是与底部距离不超过最大:max-distance=”150”），不加载
                  this.allLoaded = true;
                  this.$refs.loadmore.onBottomLoaded();
                  this.bottomPullText = "没有更多了哦";
                }
              } else {
               // 数据为空
               this.allLoaded = true;
               this.$refs.loadmore.onBottomLoaded();
               this.bottomPullText = "没有更多了哦";
            }
          }
      }
    },
     //tab切换，根据点击tab的条件加载数据
    update(condation) {  
      // console.log(condation);
      this.data = condation;
      this.loadData();
    },
    loginOrRigist(){
      
    },
    storeData(data){
      this.homeOneDataNew.push(data)
    },
    getCate(){
      var $this = this
        this.$axios
        .post("api/start/cate", {
          id: '9',
          limit_begin:'0',
          limit_num:'10',
          access_token:'8MLF4DEItozx5xQLev5lZGn862BZ5E0B_1561786555',
          chain_network:'chain_network',
          os:'web',
          os_ver:'1.0.0',
          soft_ver:'1.0.0',
          language:'zh_cn'
        })
        .then(res => {
          if(res.data.code == '200'){
              // 检验成功 设置登录状态并且跳转到/
              //  console.log('res',res)
               $this.cateData = res.data.data
          }else{
            $this.$toast({
                message: res.data.message,
                position: "bottom",
                duration: 2000
              });
              return;
          }
        })
        .catch(err => {
            $this.$toast({
                message: '网络错误',
                position: "bottom",
                duration: 2000
              });
              return;
        });
    },
    initsetInterval(){
      var $this = this
      $this.timer = setInterval(function(){
        // 加载动画
        Indicator.open({
          text: '加载中...',
          spinnerType: 'fading-circle'
        });
        
        location.reload();
        Indicator.close();
     },60000)   
    },
    scroll(){
       this.animate = true         
       var that = this;      
       setTimeout(function(){          
           that.cateData.push(that.cateData[0]);          
           that.cateData.shift();      
           that.animate=false; 
        },3000)
     }
          
  },
  components: {
    HomeOne,
    HomeTwo,
    HomeList
  }
};

</script>

<style scoped>
/* 解决vue报错,当你触摸并按住触摸目标时候，禁止或显示系统默认菜单。  */
mt-loadmore{
  touch-action: none;
}

.home {
  width: 100%;
  height: 100%;
  overflow: auto;
  box-sizing: border-box;
}

.header_title{
  color: #7272e0;
  margin-left: 5px
}
.header{
  width: 90%;
  margin: 0 auto;
  padding: 12px 0px;
    display: flex;
  justify-content: space-between;
}
/* 轮播样式 */
.swiper {
  height: 150px;
  width: 90%;
  margin: 0 auto;
  border-radius: 5px;
}
.swiper img {
  width: 100%;
  height: 150px;
}
.zh_gonggao{
  padding: 10px 0;
  background-color: #e9e5e5;
}
.gonggao{
  margin: 0 auto;
  padding: 10px 13px;
  background-color: #fff;
}
/* 列表数据的样式 */
.mint-loadmore {
  /* 95px减去了mint-loadmore-top的-50px和mint-loadmore-bottom的-50px */
  height: calc(100% - 95px);
  overflow: auto;
}



</style>

<template>
  <div class="home">

    <!-- 头部 -->
    <div class="header">
      <div style="display:flex;align-items: center;">
        <img src="../assets/image/image_p3fFiDdpZz.png" style="width: 68px;height: 20px;"/>
      </div>
      <div v-if="hasLogin">
        <span style="color: rgb(114, 114, 224);" @click="$router.push({name:'phoneRigst'})">注册</span>
        <span style="color: rgb(114, 114, 224);margin-left:15px" @click="$router.push({name:'phoneLogin'})">登录</span>
      </div>
    </div>

    <!-- 轮播 -->
    <div id="container">=
      <mt-swipe :auto="4000" class="swiper" :show-indicators="false">
        <!-- <mt-swipe-item v-for="(item,index) in swipeImgs" :key="index">
          <img :src="item.img" alt>
        </mt-swipe-item> -->
        <mt-swipe-item>
          <img src="../assets/image/banner.png" alt>
        </mt-swipe-item>
      </mt-swipe>
    </div>

     <!-- 轮播下的列表，前三条数据 -->
    <HomeOne :data="homeOneDataNew.slice('0','3')"/>

    <!-- 公告 -->
    <div class="zh_gonggao">
      <div class="gonggao" style="display: flex;">
        <i class="fa fa-volume-up" style="font-size: 17px;"></i>
        <span style="margin-left: 7px;display: flex;align-items: center;">
          <em style="color:#989292">公告:</em>
          <div class="scroll" style="height: 14px; overflow: hidden;margin-left: 7px">
              <ul id="scrollDiv"  ref="rollul" :class="{anim:animate==true}">
                  <li v-for="(item,index) in cateData" :key="index"><span>{{item.title}}</span></li>
              </ul>
           </div>
         </span>
      </div>
    </div>


     <!-- 涨幅榜和跌幅榜tab导航 -->
     <HomeTwo :filterData="homeTwoData"  @update="update"/>


     <!-- 涨幅榜和跌幅榜对应导航的列表数据 -->
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
    getCate   //分页查询
} from '../../src/api/home/home'
import { Indicator } from 'mint-ui';
import { setInterval } from 'timers';
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
      hasLogin:true,   //是否登陆（默认为未登录）
      zfData:[],   //存储websocket涨幅数据
      dfData:[],    //存储websocket跌幅数据
      cateData:[],   //公告数据
      animate:false,  //公告轮播状态
      timer:null,  //定时器
      accessToken:'',
      allMarket:'',   //所有的币种包括USDT和其他
      allMarketName:[],   //所有的USDT下的币种
      currentMarket:'',  //数组的第一个币种
      selectCate:{
          id: '9',
          limit_begin:'0',
          limit_num:'10',
          access_token:'7LrIQJl05TYRmKR3YREtzowVAcAPqGUG_1565401426',   //可没有
          chain_network:'chain_network',
          os:'web',
          os_ver:'1.0.0',
          soft_ver:'1.0.0',
          language:'zh_cn'
        }
    };
  },
  beforeRouteEnter(to, from, next) {
    next(vm => vm.getData());
  },
  mounted () {
    setInterval(this.scroll,2000)  //开启公告轮询动画
  },
  watch: {
      //为市场的币种数据添加标题，和对应涨幅和跌幅的增长率样式
      homeOneDataNew(val) {
        this.homeOneDataNew = val;
        if(this.homeOneDataNew.length == 6){
            var $this = this
            this.homeOneDataNew.filter(function(item, index, arr){
               switch(index) {
                    case 0:
                        item.titleBefore = 'BTC'
                        item.titleAfter = 'USDT'
                        break;
                    case 1:
                        item.titleBefore = 'ETH'
                        item.titleAfter = 'USDT'
                        break;
                    case 2:
                        item.titleBefore = 'XRP'
                        item.titleAfter = 'USDT'
                        break;
                    case 3:
                        item.titleBefore = 'EOS'
                        item.titleAfter = 'USDT'
                        break;
                    case 4:
                        item.titleBefore = 'LTC'
                        item.titleAfter = 'USDT'
                        break;
                    case 5:
                        item.titleBefore = 'WTC'
                        item.titleAfter = 'USDT'
                        break;                    
                } 
               if(item.result.last>item.result.open){
                    // 涨幅的数据，显示按钮颜色
                    item.color = "rgb(77,169,144)"
                    $this.zfData.push(item)
               }else{  
                    //跌幅的数据,显示按钮颜色
                    item.color = "#e27373"
                    $this.dfData.push(item)
               }

            })
        }
      }
  },
  methods: {
    getData() {
      var $this = this

      //查询所有的币种
      this.selectAllMarket()   
      
      // 发送数据，查询所有币种的数据
      this.sendMarketData()

      // 判断是否登陆,并存储当前的token信息
      this.checkLogin();

      //获取轮播图片
      this.getBanner();
      
      //监听获取轮播下的列表websocket数据
      window.revieceData2 = function(res) {
         return $this.storeData(res)
      }
       
      //获取公告内容  
      this.getCate();   
      // getCate(JSON.stringify(this.selectCate)).then((res) => {
                
      //     if(res.code == "200"){
      //          console.log(res) 
      //     }else{
                 
      //      }
      //   }).catch(function (response) {
          
      // });


      // 涨幅榜和跌幅榜tab导航标题
      this.homeTwoData = myHomeTwoData;

      //初始化涨幅榜tab初始加载数据，和判断进行过tab切换
      this.loadData();
    },
    //查询所有的币种
     selectAllMarket(){
      var $this = this
      this.$axios
        .post("api/exchange/market", {
        })
        .then(res => {
          if(res.data.code == '200'){
              // 检验成功 设置登录状态并且跳转到/
               $this.allMarket = res.data.data
               $this.allMarketName = res.data.data[0].list
               $this.currentMarket = res.data.data[0].list[0].name
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
    // 发送数据，查询所有币种的数据
    sendMarketData(){
      for(let item of this.allMarketName){
          http.sendData({"id":2,"method":"today.query","params":[item.name]})
          // http.sendData({"id":2,"method":"today.query","params":["BTCUSDT"]})
      }
    },
    // 判断是否登陆,并存储当前的token信息
    checkLogin(){
      let access_token = localStorage.getItem('access_token')
      let vux_access_token = this.$store.getters.access_token
      if(access_token!=null && access_token !='' && access_token!=undefined){
          let access_token = localStorage.getItem('access_token')
          this.accessToken = access_token
          this.hasLogin = false
      }else{
          this.hasLogin = true
      }
    },
     //tab初始加载数据
    loadData() {
      // 默认显示涨幅榜的数据
      this.zorjDataJsonNew = this.zfData;
      // 判断是否有点击过tab，初始状态this.data为null
      if(this.data){
        if(this.data.condition== "zf"){
          // 加载涨幅数据
          this.zorjDataJsonNew = this.zfData;
        }else{
          // 加载降幅的数据
          this.zorjDataJsonNew = this.dfData;
        }
      }
    },
     //tab切换，根据点击tab的条件加载数据
    update(condation) {  
      //获取子组件的tab切换条件
      this.data = condation;
      this.loadData();
    },
    //监听获取轮播下的列表websocket数据，存储到data
    storeData(data){
      this.homeOneDataNew.push(data)
    },
    //获取轮播图片
    getBanner(){
      var $this = this
      this.$axios
        .post("api/start/start-page", {
          type: '1'
        })
        .then(res => {
          if(res.data.code == '200'){
              // 检验成功 设置登录状态并且跳转到/
               $this.swipeImgs = res.data.data
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
    //获取公告内容  
    getCate(){
      var $this = this
        this.$axios
        .post("api/start/cate", {
          id: '9',
          limit_begin:'0',
          limit_num:'10',
          access_token:$this.accessToken,   //可没有
          chain_network:'chain_network',
          os:'web',
          os_ver:'1.0.0',
          soft_ver:'1.0.0',
          language:'zh_cn'
        })
        .then(res => {
          if(res.data.code == '200'){
              // 检验成功 设置登录状态并且跳转到/
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
    //开启公告轮询动画
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
    HomeOne, //轮播下的列表
    HomeTwo, //涨幅榜和跌幅榜tab导航
    HomeList  // 涨幅榜和跌幅榜对应导航的列表数据
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

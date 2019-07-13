<template>
  <div class="homeKxEarchat">
    <Header :isLeft="true" :title="title"/>
    <div>
      <p class="theItem">
        <span>0.3325<small style="margin-left: 7px;font-size: 10px;color: #fff;">¥2.29</small></span>
        <span>24h最高<small style="margin-left: 7px;">0.3334</small></span>
      </p>
      <p class="theItem">
        <span>0.3325<small style="margin-left: 7px;font-size: 10px;color: #fff;">¥2.29</small></span>
        <span>24h最高<small style="margin-left: 7px;">0.3334</small></span>
      </p>
    </div>

    <ly-tab
      v-model="selectedId"
      :items="items"
      :options="options"
      @change="handleChange">
    </ly-tab>
    <div id="myearchart" style="width:100%;height:300px;background-color: #fff;"></div>
    <kxImgTab :hqfilterData="hanqTabData"  @update="update"/>

     <!-- 涨幅跌幅信息 ，bottom-all-loaded上拉加载是否完成-->
     <!-- auto-fill若为真，loadmore 会自动检测并撑满其容器 -->
    <mt-loadmore
        :top-method="loadTop"
        :auto-fill="false"   
        ref="loadmore"
        >
        <div class="Datalist">
            <kxImgTabList v-for="(item,index) in zxorusData" :key="index" :zorjdata="item.myData"/>
        </div>
    </mt-loadmore>
    <div class="foot-buttS">
       <button class="buy-in">买入</button>
       <button class="seller-out">卖出</button>
    </div>
  </div>
</template>

<script>
const myzixuDataOne = require('../../../data/newCjDataOne.json');
const myusdtDataOne = require('../../../data/pkDataOne.json');
const myhanqTabData = require('../../../data/kxTabData.json');
import LyTab from '../../components/ly-tab/src/index.vue'
import Header from "../../components/Header";
import kxImgTab from "../../components/indexPage/kxImgTab";
import kxImgTabList from "../../components/indexPage/kxImgTabList";

export default {
  name: "homeKxEarchat",
  data() {
    return {
      title:'XRP/USDT',
       hanqTabData:{},  //tab切换的title
       zxorusData:[],   //tab下的切换的列表数据
       page: 1,   //当前页数
       size: 5,   //分页数
       allLoaded: false,   //是否已经加载完毕，无加载数据的开关
       bottomPullText: "上拉加载更多",   //底部的加载显示字样
       data: null,  //tab切换条件
       // 以下为滑动导航
        selectedId: 0,   //设置导航默认为第几个
        // 导航标题数组
        items: [
          {label: '1分'},
          {label: '5分'},
          {label: '15分'},
          {label: '30分'},
          {label: '1小时'},
          {label: '日线'},
          {label: '周线'},
          {label: '一月'}
        ],
        // 导航激活状态的颜色
        options: {
          activeColor: '#1d98bd'
        },
        // 滑动导航结束
        // 图表
        myChart: null,
        linkoption :{
          title: { 
						text: ''
						// subtext: 'k线'
					},
					tooltip: {
						trigger: 'axis',
						formatter: function (params) {
							return '12341234'
						},
						axisPointer: {
							animation: false
						}
					},
					xAxis: [{
						// type: 'category',
						type: 'category',   //time需要传时间戳
						boundaryGap: false,
						"axisLabel":{   //控制横坐标显示
							interval: 0,
							rotate:0  
						},
						data: ['1','2','3','4','5','6']  //横坐标的值
					}],
					yAxis: [{
						type: 'value',
						axisLabel: {
							formatter: '{value}'
						},
						splitLine: {
							show: false   //分割线
						}
					}],
					series: [{
							name: '价格',
							type: 'line',
							data: [11, 11, 15, 13, 12, 13, 10]   //纵坐标的值
						}
					]
        }
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
    // 点击导航切换
    handleChange (item, index) {
      if(index == '0'){
        console.log("123412412")
      }else if(index == '1'){
      }
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
    },
    draw() {
      this.myChart = this.$echarts.init(document.getElementById('myearchart'));
      console.log(this.linkoption)
      this.myChart.setOption(this.linkoption);
    }
  },
  // 调用
  mounted() {
    this.draw();
    window.addEventListener('resize', () => {
      this.myChart.resize()
    })
  },
  components: {
    Header,
    LyTab,
    kxImgTab,
    kxImgTabList
  }
};
</script>

<style scoped>
.homeKxEarchat {
  width: 100%;
  height: 100%;
  overflow: auto;
  box-sizing: border-box;
  background-color: #151111;
  color: #fff;
  padding-bottom: 52px;
}
.theItem{
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 6px 15px;
}
.foot-buttS{
    width: 100%;
    justify-content: center;
    display: flex;
    position: absolute;
    bottom: 10px; 
}
.buy-in{
    width: 40%;
    padding: 7px;
    background-color: green;
    color: #fff;
    margin-right: 10px;
}
.seller-out{
    width: 40%;
    padding: 7px;
    background-color: #da75ae;
    color: #fff;
    margin-right: 10px;
}
</style>
<template>
  <div class="myFb">
      <Header :isLeft="true" :title="title" :fabu="true"/>
      <OtcTab :filterData="otcTabData" @update="update" style="padding:10px"/>
      <!-- <OtcTabList  :key="index" v-for="(item,index) in otcDataList" :zorjdata="item.myData"/> -->
      <OtcTabList  :zorjdata="otcDataListNew" v-if="showThis"/>
  </div>
</template>

<script>
const mymybuy = require('../../../data/myfbbuy.json');
const mymyseller = require('../../../data/myfbseller.json');
const myotcTabData = require('../../../data/otcTabData.json');
import Header from "../../components/Header";
import OtcTab from "../../components/otc/OtcTab";
import OtcTabList from "../../components/otc/MyFabu";
export default {
  name: "myFb",
  data() {
    return {
        title:'我的发布',
        otcTabData:{},   //tab数据
        otcDataList:[],   //tab下的切换的列表数据
        otcDataListNew:[],   //tab下的切换的列表接口数据
        showThis:false  //是否显示列表数据开关
    };
  },
  beforeRouteEnter(to, from, next) {
    next(vm => vm.getData());
  },
  methods: {
    // 获取用户信息
    getData() {
      this.otcTabData =  myotcTabData
      // this.otcDataList = mymybuy
      this.getBuyOrSeller('2');
      console.log("列表数据",this.otcDataList)
      this.loadData();
    },
    //tab切换，根据点击tab的条件加载数据
    update(condation) {  
      // console.log(condation);
      this.data = condation;
      this.loadData();
    },
    //初始加载数据
    loadData() {
      // 判断是否有点击tab，初始状态this.data为null
      if(this.data){
        if(this.data.condition== "itomi"){
          // 加载涨幅数据
          // console.log("我要买相关数据");
          // this.otcDataList = mymybuy;
          this.getBuyOrSeller('2');

        }else{
          // 加载降幅的数据
          // console.log("我要卖出相关数据");
          // this.inputru = false;
          // this.output = true;
          // this.otcDataList = mymyseller;
          this.getBuyOrSeller('1');
        }
      }
    },
    getBuyOrSeller(staus){
      var $this = this
        this.$axios
        .post("/api/otc/market-list", {
          'side': staus,
          'coin_name': 'USDT'
        })
        .then(res => {
          if(res.data.code == '200'){
              // 检验成功 设置登录状态并且跳转到/
              $this.showThis = true
              $this.otcDataListNew = res.data.data
              for(let item of $this.otcDataListNew){
                
                 if(staus == '1'){
                   item.staus = 'seller'
                 }else{
                   item.staus = 'buy'
                 }
              }
              
          }else{
            $this.showThis = false  //没有数据
            $this.$toast({
                message: res.data.message,
                position: "bottom",
                duration: 1000
              });
              return;
          }
        })
        .catch(err => {
            $this.$toast({
                message: '网络错误',
                position: "bottom",
                duration: 1000
              });
              return;
        });
    }
  },
  components: {
     Header,
     OtcTab,
     OtcTabList
  }
};
</script>

<style scoped>
.myFb {
  width: 100%;
  height: 100%;
  overflow: auto;
  box-sizing: border-box;
}
</style>
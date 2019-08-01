<template>
  <div class="otcJi">
    <Header :isLeft="true" :title="title"/>
    <ly-tab
      v-model="selectedId"
      :items="items"
      :options="options"
      @change="handleChange">
    </ly-tab>
    <div>
      <ul>
        <!-- <li style="background-color:#fff" class="otcl-item" :key="index" v-for="(item,index) in octJiData">
            <div class="otcl-item-one">
               <img style="width:10vw;height:10vw;border-radius: 100%;"/>
               <div style="margin-left: 26px;">
                 <p class="octl-title">{{item.theId}}</p>
                 <p class="octl-title">{{item.mount}}</p>
                 <p class="octl-title">{{item.time}}</p>
               </div>
               <span style="margin-left: 10px;">{{item.title}}</span>
            </div>
            <p style="text-align: center;" class="showMoney">{{item.price}}</p>
            <div style="text-align: right;">
              <button style="background-color: #a2b7dc;color: #fff;padding: 5px 10px;margin-left:10px" 
              :key="indexButt" v-for="(itemButt,indexButt) in item.buttonArray" @click="done($event)"> 
                {{itemButt}}
              </button>
            </div>
        </li> -->
        <li style="background-color:#fff" class="otcl-item" :key="index" v-for="(item,index) in octJiData">
            <div class="otcl-item-one">
               <img style="width:10vw;height:10vw;border-radius: 100%;" :src="item.other_head_portrait"/>
               <div style="margin-left: 26px;">
                 <p class="octl-title">{{item.other_nickname}}</p>
                 <p class="octl-title">{{item.amount}}</p>
                 <p class="octl-title">{{item.order_time}}</p>
               </div>
               <span style="margin-left: 10px;">
                 <small v-if="item.side == '1'">卖出</small>
                 <small v-else>买入</small>
                 {{item.coin_name}}</span>
            </div>
            <p style="text-align: center;" class="showMoney">单价{{item.price_usd}}</p>
            <div style="text-align: right;" v-if="current == 0">
              <button style="background-color: #219fd1;color: #fff;padding: 5px 10px;margin-left:10px" 
               @click="done($event)"> 
                去付款
              </button>
            </div>
            <div style="text-align: right;" v-else-if="current == 1">
              <button style="background-color: #219fd1;color: #fff;padding: 5px 10px;margin-left:10px" 
               @click="done($event)"> 
                申诉
              </button>
            </div>
            <div style="text-align: right;" v-else-if="current == 2">
              <button style="background-color: #219fd1;color: #fff;padding: 5px 10px;margin-left:10px" 
               @click="done($event)"> 
                取消申诉
              </button>
            </div>
            <div style="text-align: right;" v-else-if="current == 3">
              <button style="background-color: #219fd1;color: #fff;padding: 5px 10px;margin-left:10px" 
               @click="done($event)"> 
                已取消
              </button>
            </div>
            <div style="text-align: right;" v-else-if="current == 4">
              <button style="background-color: #219fd1;color: #fff;padding: 5px 10px;margin-left:10px" 
               @click="done($event)"> 
                申诉
              </button>
              <button style="background-color: #219fd1;color: #fff;padding: 5px 10px;margin-left:10px" 
               @click="done($event)"> 
                已完成
              </button>
            </div>
            <div style="text-align: right;" v-else-if="current == 5">
              <button style="background-color: #219fd1;color: #fff;padding: 5px 10px;margin-left:10px" 
               @click="done($event)"> 
                已完成
              </button>
            </div>
        </li>
      </ul>
    </div>
    <div v-if="noJl">
      <div style="text-align: center;margin-top: 60px;">
        <img src="../../../../public/image/nodata.png" style="width: 100vw;" />
      </div>
      <p style="text-align: center;margin-top: -93px;">您还没有记录</p>
    </div>
  </div>
</template>

<script>
const mynoFkDataOneData = require('../../../../data/noFkDataOne.json');  //加载未付款的列表数据
const myyFkDataOneData = require('../../../../data/yFkDataOne.json');  //加载已付款的列表数据
const mysszDataOneData = require('../../../../data/sszDataOne.json');  //加载申诉中的列表数据
const myyqxDataOneData = require('../../../../data/yqxDataOne.json');  //加载已取消的列表数据
const myyesWcDataOneData = require('../../../../data/yesWcDataOne.json');  //加载已完成的列表数据
const mysuandComData = require('../../../../data/suandCom.json');  //加载申诉并处理的列表数据
import LyTab from '../../../components/ly-tab/src/index.vue'
// import LyTab from 'ly-tab'
import Header from "../../../components/Header";
import { Toast } from "mint-ui";
export default {
  name: "otcJi",
  data() {
    return {
      noJl:false,
      title:'成交记录',
      // 以下为滑动导航
      selectedId: 0,   //设置导航默认为第几个
      // 导航标题数组
      items: [
        {label: '未付款'},
        {label: '已付款'},
        {label: '申诉中'},
        {label: '已取消'},
        {label: '已完成'},
        {label: '申诉已处理'}
      ],
      // 导航激活状态的颜色
      options: {
        activeColor: '#1d98bd'
      },
      // 滑动导航结束
      octJiData:[],
      current:0   //存储当前点击的是哪一个tab
    };
  },
  beforeRouteEnter(to, from, next) {
    next(vm => vm.getData());
  },
  methods: {
    // 获取用户信息
    getData() {
      this.getCjData('2');   //获取指定tab下的数据,默认查询未付款
      // this.octJiData = myyesWcDataOneData[0].myData.allData
    },
    // 点击导航切换
    handleChange (item, index) {
      this.octJiData = []
      if(index == '0'){
         this.current = 0
         this.getCjData('2');
       }else if(index == '1'){
         this.current = 1
         this.getCjData('12');
       }else if(index == '2'){
         this.current = 2
         this.getCjData('3');
       }else if(index == '3'){
         this.current = 3
         this.getCjData('0');
       }else if(index == '4'){
         this.current = 4
         this.getCjData('1');
       }else if(index == '5'){
         this.current = 5
         this.getCjData('11');
       }

      // if(index == '0'){
      //   this.octJiData = mynoFkDataOneData[0].myData.allData
      // }else if(index == '1'){
      //   // this.octJiData = myyFkDataOneData[0].myData.allData
      //   this.noJl = true
      // }else if(index == '2'){
      //   this.octJiData = mysszDataOneData[0].myData.allData
      // }else if(index == '3'){
      //   this.octJiData = myyqxDataOneData[0].myData.allData
      // }else if(index == '4'){
      //   this.octJiData = myyesWcDataOneData[0].myData.allData
      // }else{
      //   this.octJiData = mysuandComData[0].myData.allData
      // }
    },
    // 点击按钮的事件
    done(dom){
       var theText = dom.currentTarget.innerText
       if(theText == '已取消' || theText == '已完成'){
          this.$router.push({name:"orderDetail"});
       }else if(theText == '申诉'){
          this.$router.push({name:"shensu"});
       }
    },
    // 获取指定tab下的数据
    getCjData(type){
      var $this = this
      this.$axios
        .post("/api/otc/order-history", {
          access_token:'9yv8FP7oH7XdRSqXYunb1ySTAp8trd2B_1560572313',
          type:type   //（2为未付款，12为已付款，3为申诉中，0为已取消，1为已完成，11为申诉并处理）
        })
        .then(res => {
          if(res.data.code == '200'){
               if(res.data.data){
                 $this.noJl = false  //表示有数据
               }else{
                 $this.noJl = true  //表示无数据
               }
              // 检验成功 设置登录状态并且跳转到/
               this.octJiData = res.data.data
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
    }
  },
  components: {
     Header,
     LyTab
  }
};
</script>

<style scoped>
.otcJi {
  width: 100%;
  height: 100%;
  overflow: auto;
  box-sizing: border-box;
}
.otcl-item{
  display: flex;
  flex-direction: column;
  padding: 10px;
  width: 90%;
  margin: 16px auto;
}
.otcl-item-one{
  display: flex;
  align-items: center;
  padding: 15px;
}
.octl-title{
  padding: 3px;
}
.showMoney{
  border-bottom: 1px solid #e3dcdc;
  padding-bottom: 10px;
  margin-bottom: 10px;
}
    
</style>
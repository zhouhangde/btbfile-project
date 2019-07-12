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
        <li style="background-color:#fff" class="otcl-item" :key="index" v-for="(item,index) in octJiData">
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
        </li>
      </ul>
    </div>
    <div v-if="noJl">
      <div style="text-align: center;margin-top: 60px;">
        <img  style="width:35vw;height:25vw" />
      </div>
      <p style="text-align: center;margin-top: 25px;">您还没有记录</p>
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
export default {
  name: "otcJi",
  data() {
    return {
      noJl:false,
      title:'成交记录',
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
      octJiData:[]
    };
  },
  beforeRouteEnter(to, from, next) {
    next(vm => vm.getData());
  },
  methods: {
    // 获取用户信息
    getData() {
      this.octJiData = myyesWcDataOneData[0].myData.allData
    },
    // 点击导航切换
    handleChange (item, index) {
      this.noJl = false   //还没有记录的开关
      this.octJiData = []
      if(index == '0'){
        this.octJiData = mynoFkDataOneData[0].myData.allData
      }else if(index == '1'){
        // this.octJiData = myyFkDataOneData[0].myData.allData
        this.noJl = true
      }else if(index == '2'){
        this.octJiData = mysszDataOneData[0].myData.allData
      }else if(index == '3'){
        this.octJiData = myyqxDataOneData[0].myData.allData
      }else if(index == '4'){
        this.octJiData = myyesWcDataOneData[0].myData.allData
      }else{
        this.octJiData = mysuandComData[0].myData.allData
      }
    },
    // 点击按钮的事件
    done(dom){
       console.log(dom.currentTarget) 
       var theText = dom.currentTarget.innerText
       if(theText == '已取消' || theText == '已完成'){
          this.$router.push({name:"orderDetail"});
       }else if(theText == '申诉'){
          this.$router.push({name:"shensu"});

       }
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
  border-bottom: 1px solid #c3bebe;
  padding-bottom: 10px;
  margin-bottom: 10px;
}
    
</style>
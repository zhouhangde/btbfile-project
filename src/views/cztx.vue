<template>
  <div class="cztx">
    <ly-tab
      v-model="selectedId"
      :items="items"
      :options="options"
      @change="handleChange">
    </ly-tab>
    <div class="theContent">
      <!-- 第一个tab -->
      <div v-if="current == 0">
        <div class="tabItem">
          <span style="font-weight: bolder;font-size: 16px;">一键买币</span>
          <span style="color: #9e9696;">QC 参考单价</span>
        </div>
        <div class="tabItem">
          <span style="color: #9e9696;">限额: 0-0</span>
          <span style="color: #de3636;">0.00 CNY/QC</span>
        </div>
        <div class="tabItem">
          <span style="color: #9e9696;">购买数量:</span>
          <input type="text" style="flex-grow: 1;text-indent:5px"  dir="rtl"/>
          <span>QC</span>
        </div>
        <div class="tabItem">
          <span style="color: #9e9696;">需要金额:</span>
          <input type="text" value="0.00" style="flex-grow: 1;text-indent:5px;color: #de3636;"  dir="rtl"/>
          <span style="color: #de3636;">CNY</span>
        </div>
        <div class="tabItem">
          <!-- <img src="../assets/image/selected.png"/> -->
          <button class="selectActive" style="">银行卡</button>
        </div>
        <div class="theBuyEnd">
          一键买入
        </div>
      </div>
      <!-- 第一个tab结束 -->
      <!-- 第二个tab -->
      <div v-else-if="current == 1">
        <div class="tabItem">
          <span style="font-weight: bolder;font-size: 16px;">一键卖币</span>
          <span style="color: #9e9696;">QC 参考单价</span>
        </div>
        <div class="tabItem">
          <span style="color: #9e9696;">限额: 0-0</span>
          <span style="color: rgb(58, 181, 161);">0.00 CNY/QC</span>
        </div>
        <div class="tabItem">
          <span style="color: #9e9696;">售出数量:</span>
          <input type="text" style="flex-grow: 1;text-indent:5px"  dir="rtl"/>
          <span>QC</span>
        </div>
        <div class="tabItem">
          <span style="color: #9e9696;">获得金额:</span>
          <input type="text" value="0.00" style="flex-grow: 1;text-indent:5px;color: rgb(58, 181, 161);"  dir="rtl"/>
          <span style="color: rgb(58, 181, 161);">CNY</span>
        </div>
        <div class="tabItem">
          <!-- <img src="../assets/image/selected.png"/> -->
          <button class="selectActive" style="">银行卡</button>
        </div>
        <div class="theSellerEnd">
          一键卖出
        </div>
      </div>
      <!-- 第二个tab结束 -->
      <!-- 第三个个tab -->
      <div v-else-if="current == 2" style="display: flex;flex-direction: column;align-items: center;padding: 15px 0;">
        <img src="../assets/image/duihuan.png" style="width: 78px;height: 78px;"/>
        <p style="padding: 15px 0;">
          <span>----</span>
          <span>暂无兑换记录</span>
          <span>----</span>
        </p>
      </div>
      <!-- 第三个tab结束 -->
      <!-- 第四个tab -->
      <div v-else-if="current == 3" style="display: flex;flex-direction: column;align-items: center;padding: 15px 0;">
        <div>
            <img src="../assets/image/bank.svg" style="width: 68px;height: 68px;"/>
            <p style="padding: 10px 0;">添加银行卡</p>
        </div>
        <p style="padding: 15px 0;">
          <span>----</span>
          <span>每个账户仅绑定一张银行卡</span>
          <span>----</span>
        </p>
      </div>
      <!-- 第四个tab结束 -->
    </div>
  </div>
</template>

<script>
import LyTab from '../components/ly-tab/src/index.vue'
export default {
  name: "cztx",
  data() {
    return {
      // 以下为滑动导航
      selectedId: 0,   //设置导航默认为第几个
      // 导航标题数组
      items: [
        {label: '买币'},
        {label: '卖币'},
        {label: '兑换记录'},
        {label: '银行卡'}
      ],
      // 导航激活状态的颜色
      options: {
        activeColor: 'red'
      },
      // 滑动导航结束
      octJiData:[],
      current:0,   //存储当前点击的是哪一个tab
    };
  },
  methods: {
    // 点击导航切换
    handleChange (item, index) {
      this.octJiData = []
      if(index == '0'){
         this.current = 0
         this.getBuyData();
       }else if(index == '1'){
         this.current = 1
         this.getSellerData();
       }else if(index == '2'){
         this.current = 2
         this.getDhData();
       }else if(index == '3'){
         this.current = 3
         this.getBankData();
       }
    },
    getBuyData(){

    },
    getSellerData(){

    },
    getDhData(){

    },
    getBankData(){

    }
  },
  mounted() {
  },
  components: {
     LyTab
  }
};
</script>

<style scoped>
.cztx {
  width: 100%;
  height: 100%;
  overflow: auto;
  box-sizing: border-box;
}
.theContent{
  padding: 19px;
}
.tabItem{
  display: flex;
  justify-content: space-between;
  padding: 10px 0;
  align-items: center;
}
.selectActive{
  background-image:url('../assets/image/selected.png');
  background-size: 100% 100%;
  padding: 9px 21px;
  display: inline-block;
  margin-left: -10px;
}
.theBuyEnd{
  padding: 7px 0;
  background-color: #de3636;
  text-align: center;
  color: #fff;
  margin-top: 10px;
}
.theSellerEnd{
  padding: 7px 0;
  background-color: rgb(58, 181, 161);
  text-align: center;
  color: #fff;
  margin-top: 10px;
}    
</style>
<template>
  <div class="kxImgTabList">
    <!-- 模拟数据 -->
    <!-- <div>
      <div class="itemzord">
        <span v-for="(item,index) in zorjdata.titleDta" :key="index">{{item.title}}</span>
      </div>
      <div v-for="(item,index) in zorjdata.allData" :key="index" class="itemzord">
          <div v-if="item.time">{{item.time}}</div>
          <div style="color:#cc6e6e">{{item.price}}</div>
          <div class="centeritem">
            <span style="margin-left:30px;">{{item.mount}}</span>
          </div>
      </div>
    </div> -->
    <div v-if="showData == 'pk'">
      <div class="itemzord">
        <span>价格</span>
        <span>数量</span>
      </div>
      <!-- 交易挂单（盘口）中的卖的数据 -->
      <div v-for="(item,index) in pkData.asks" :key="index+Math.random()" class="itemzord">
          <div style="color:#cc6e6e">{{item[0]}}</div>
          <div style="color:#cc6e6e">{{item[1]}}</div>
          <!-- <div class="centeritem">
            <span style="margin-left:30px;">{{item.mount}}</span>
          </div> -->
      </div>
      <div v-for="(itemTwo,indexTwo) in pkData.bids" :key="indexTwo+Math.random()" class="itemzord">
          <div style="color:rgb(144, 222, 179)">{{itemTwo[0]}}</div>
          <div style="color:rgb(144, 222, 179)">{{itemTwo[1]}}</div>
          <!-- <div class="centeritem">
            <span style="margin-left:30px;">{{item.mount}}</span>
          </div> -->
      </div>
    </div>
    <div v-else>
      <div class="itemzord">
        <span>时间</span>
        <span>价格</span>
        <span>数量</span>
      </div>
      <!-- 交易挂单（盘口）中的卖的数据 -->
      <div v-for="(item,indexCj) in cjData.cj" :key="indexCj" class="itemzord">
          <div>{{item.time | formatDate}}</div>
          <div style="color:#cc6e6e">{{item.price}}</div>
          <div class="centeritem">
            <span style="margin-left:30px;">{{item.amount}}</span>
          </div>
      </div>
    </div>
    
    <!-- <div style="width:50%">
       <div class="title-header" >
          <span>价格</span>
          <span>数量</span>
        </div>
        <div v-for="(item,index) in zorjdata.allData" :key="index" class="itemzord">
            <div v-if="item.time">{{item.time}}</div>
            <div style="color:green">{{item.price}}</div>
            <div class="centeritem">
              <span style="margin-left:30px;">{{item.mount}}</span>
            </div>
        </div>
    </div> -->
  </div>
</template>

<script>
import moment from 'moment'  //时间转化工具
export default {
  name: "kxImgTabList",
  props: {
    // zorjdata: Object
    // zorjdata: Array
    pkData:Object,
    cjData:Object,
    showData:String
  },
  created(){
    // console.log('this.zorjdata',this.showData)
  },
  filters: {
    formatDate: function (value) {
      return moment(value).format('HH:MM:SS')
    }
  }
};
</script>

<style scoped>
  .itemzord{
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 11px 10px;
  }
  .centeritem{
    display: flex;
    flex-direction: column;

  }
  .title-header{
      display: flex;
    justify-content: space-between;
    padding: 11px 13px;
  }
    
</style>

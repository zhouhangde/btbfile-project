<template>
  <div class="HomeOne"  v-if="hackReset">
     <!-- <table>
         <tr v-for="(item,index) in data" :key="index">
             <td>{{item.title}}</td>
             <td>{{item.one}}</td>
             <td>{{item.two}}</td>
             <td>{{item.three}}</td>
         </tr>
     <table> -->
     <ul>
       <li v-for="(item,index) in data" :key="index" @click="$router.push({name:'homeKxEarchatNew',params:{titleBefore:item.titleBefore,titleAfter:item.titleAfter}})">
         <!-- <span style="font-size: 12px;">{{item.title}}</span>
         <span style="color:#65b974; margin-top: 10px;">{{item.one}}</span>
         <span style="font-size: 8px;">{{item.two}}</span>
         <span style="font-size: 11px;color: #8a8383;">{{item.three}}</span> -->
         <span style="font-size: 12px;" v-if="index == '0'">BTC/USDT</span>
         <span style="font-size: 12px;" v-else-if="index == '1'">ETH/USDT</span>
         <span style="font-size: 12px;" v-else-if="index == '2'">XRP/USDT</span>
         <span style="font-size: 12px;" v-else-if="index == '3'">EOS/USDT</span>
         <span style="font-size: 12px;" v-else-if="index == '4'">LTC/USDT</span>
         <span style="font-size: 12px;" v-else-if="index == '5'">WTC/USDT</span>
         
         <!-- 最终价 -->
         <span style="color:#65b974; margin-top: 10px;">{{item.result.last}}</span>
         <!-- 涨幅 -->
         <span style="color:#65b974;">{{((item.result.last - item.result.open) / item.result.open).toFixed(2)}}</span>
         <!-- 最高价 -->
         <span style="font-size: 8px;">{{item.result.high}}</span>
         <!-- 最低价 -->
         <span style="font-size: 8px;">{{item.result.low}}</span>
         <!-- 成交量 -->
         <span style="font-size: 11px;color: #8a8383;">{{new Number(item.result.deal).toFixed(2)}}</span>
       </li>
     </ul>  
  </div>
</template>

<script>
export default {
  name: "HomeOne",
  props: {
    data:{
      type:Array,
      default:[{
        result:{
          deal: "",
          high: "",
          last: "",
          low: "",
          open: "",
          volume: ""
         }
      }]
    }
  },
  data() {
    return {
      hackReset:true
    };
  },
  watch: {
      // data(val) {
      //   var $this = this
      //   console.log('12341234',val)
      //   $this.hackReset = false;
      //   // 重新创建子标签
      //   $this.$nextTick(() => {
      //     $this.hackReset = true;
      //   });
      // }
  },
  created(){
    
  }
};
</script>

<style scoped>
  .HomeOne{
      width: 90%;
      margin: 0 auto;
      
  }
  .HomeOne ul{
      display: flex;
      flex-direction: row;
      justify-content: space-around;
      padding: 10px 0;

  }
  .HomeOne ul li{
      display: flex;
      flex-direction: column;
      align-items: center;
  }
  .HomeOne ul li span{
     padding: 3px 0;
  }
</style>

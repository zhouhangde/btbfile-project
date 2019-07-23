<template>
  <div class="HomeOne" @click="$router.push({name:'homeKxEarchat'})">
     <!-- <table>
         <tr v-for="(item,index) in data" :key="index">
             <td>{{item.title}}</td>
             <td>{{item.one}}</td>
             <td>{{item.two}}</td>
             <td>{{item.three}}</td>
         </tr>
     <table> -->
     <ul>
       <li v-for="(item,index) in data" :key="index">
         <!-- <span style="font-size: 12px;">{{item.title}}</span>
         <span style="color:#65b974; margin-top: 10px;">{{item.one}}</span>
         <span style="font-size: 8px;">{{item.two}}</span>
         <span style="font-size: 11px;color: #8a8383;">{{item.three}}</span> -->
         <span style="font-size: 12px;" v-if="index == '0'">CSCCT/USDT</span>
         <span style="font-size: 12px;" v-else-if="index == '1'">BTC/USDT</span>
         <span style="font-size: 12px;" v-else-if="index == '2'">ETH/USDT</span>
         <span style="font-size: 12px;" v-else-if="index == '3'">XRP/USDT</span>
         <span style="font-size: 12px;" v-else-if="index == '4'">EOS/USDT</span>
         <span style="font-size: 12px;" v-else-if="index == '5'">LTC/USDT</span>
         <span style="font-size: 12px;" v-else-if="index == '6'">BHB/USDT</span>

         <span style="color:#65b974; margin-top: 10px;">{{item.result.last}}</span>
         <span style="color:#65b974;">{{((item.result.last - item.result.open) / item.result.open).toFixed(2)}}</span>
         <span style="font-size: 8px;">{{item.result.high}}</span>
         <span style="font-size: 8px;">{{item.result.low}}</span>
         <span style="font-size: 11px;color: #8a8383;">{{new Number(item.result.deal).toFixed(2)}}</span>
       </li>
     </ul>  
  </div>
</template>

<script>
export default {
  name: "HomeOne",
  props: {
    data: Array
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

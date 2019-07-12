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
         <span style="font-size: 12px;">{{item.title}}</span>
         <span style="color:#65b974; margin-top: 10px;">{{item.one}}</span>
         <span style="font-size: 8px;">{{item.two}}</span>
         <span style="font-size: 11px;color: #8a8383;">{{item.three}}</span>
       </li>
     </ul>  
  </div>
</template>

<script>
export default {
  name: "HomeOne",
  props: {
    data: Array
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

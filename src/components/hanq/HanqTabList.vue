<template>
  <div class="HanqTabList">
    <!-- <div v-for="(item,index) in zorjdata.allData" :key="index" class="itemzord"  @click="$router.push({name:'homeKxEarchat'})">
        <div>{{item.zhangOne}}</div>
        <div class="centeritem">
          <span style="margin-left:30px;">{{item.zhangTwo}}</span>
          <span style="margin-top:10px;margin-left:30px;color:#999;"><i data-v-7689158b="" class="fa fa-jpy"></i>{{item.zhangThree}}</span>
        </div>
        <div :style="{backgroundColor:item.color,padding:'8px 18px',color:'white'}">{{item.zhangThor}}%</div>
        
    </div> -->
    <div v-for="(item,index) in zorjdata" :key="index" class="itemzord"  @click="$router.push({name:'homeKxEarchatNew',params:{titleBefore:item.titleBefore,titleAfter:item.titleAfter}})">
        <div>{{item.titleBefore}}<small style="font-size: 7px;color: #b9acac;">{{item.titleAfter=='USDT'?'/USDT':''}}</small></div>
        <div class="centeritem">
          <span style="margin-left:30px;">{{item.result.last}}</span>
          <span style="margin-top:10px;margin-left:30px;color:#999;"><i data-v-61dd7a3d="" class="fa fa-yen (alias)"></i>{{item.result.open}}</span>
        </div>
        <div :style="{backgroundColor:item.color,padding:'8px 18px',color:'white'}">{{((item.result.last - item.result.open) / item.result.open).toFixed(2)}}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "HanqTabList",
  props: {
    // zorjdata: Object
    zorjdata: Array
  },
  created(){
  }
};
</script>

<style scoped>
  .itemzord{
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 11px 10px;
    border-bottom: 1px solid #ddcdcd;
  }
  .centeritem{
    display: flex;
    flex-direction: column;
     -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    -ms-flex-direction: column;
    flex-direction: column;
  }
</style>

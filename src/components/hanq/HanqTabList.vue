<template>
  <div class="HanqTabList">
    <div v-for="(item,index) in zorjdata.allData" :key="index" class="itemzord"  @click="$router.push({name:'homeKxEarchat'})">
        <div>{{item.zhangOne}}</div>
        <div class="centeritem">
          <span style="margin-left:30px;">{{item.zhangTwo}}</span>
          <span style="margin-top:10px;margin-left:30px;">{{item.zhangThree}}</span>
        </div>
        <div :style="{backgroundColor:item.color,padding:'8px 18px',color:'white'}">{{item.zhangThor}}</div>
        
    </div>
  </div>
</template>

<script>
export default {
  name: "HanqTabList",
  props: {
    zorjdata: Object
  },
  created(){
    console.log(this.zorjdata)
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

  }
</style>

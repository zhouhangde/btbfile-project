<template>
  <div class="HomeList">
    <div v-for="(item,index) in zorjdata.allData" :key="index" class="itemzord">
        <div>{{item.zhangOne}}</div>
        <div class="centeritem">
          <span style="margin-left:30px;">{{item.zhangTwo}}</span>
          <span style="margin-top:10px;margin-left:30px;color:#999;"><i data-v-61dd7a3d="" class="fa fa-yen (alias)"></i>{{item.zhangThree}}</span>
        </div>
        <div :style="{backgroundColor:item.color,padding:'8px 18px',color:'white'}">{{item.zhangThor}}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "HomeList",
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

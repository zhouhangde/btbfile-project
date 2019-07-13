<template>
  <div class="myMessgTabList">
    <div v-for="(item,index) in zorjdata.allData" :key="index">
        <div style="text-align: center;">{{item.monthAndday}}</div>
        <div class="centeritem">
          <span style="margin-left:30px;padding: 9px 15px;">{{item.dateAll}}</span>
          <span style="margin-left:30px;padding: 9px 15px;">{{item.content}}</span>
        </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "myMessgTabList",
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
    background-color: #fff;
    width: 94%;
    margin: 13px auto;

  }
</style>

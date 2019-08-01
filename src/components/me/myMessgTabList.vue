<template>
  <div class="myMessgTabList">
    <!-- <div v-for="(item,index) in zorjdata.allData" :key="index">
        <div style="text-align: center;">{{item.monthAndday}}</div>
        <div class="centeritem">
          <span style="margin-left:30px;padding: 9px 15px;">{{item.dateAll}}</span>
          <span style="margin-left:30px;padding: 9px 15px;">{{item.content}}</span>
        </div>
    </div> -->
    <div v-for="(item,index) in zorjdata" :key="index">
        <div style="text-align: center;">{{item.append | formatDateMd}}</div>
        <div class="centeritem" @click="seeDetail(item.url)">
          <span style="margin-left:30px;padding: 9px 15px;">{{item.append | formatDate}}</span>
          <span style="margin-left:30px;padding: 9px 15px;">{{item.title}}</span>
        </div>
    </div>
  </div>
</template>

<script>
import moment from 'moment'  //时间转化工具
export default {
  name: "myMessgTabList",
  props: {
    // zorjdata: Object
    zorjdata: Array
  },
  created(){
    // console.log(this.zorjdata)
  },
  methods:{
    seeDetail(url){
      window.location.href = url
    }
  },
  filters: {
    formatDate: function (timestamp) {
        var date = new Date(timestamp * 1000);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
        var Y = date.getFullYear() + '/';
        var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '/';
        var D = date.getDate() + ' ';
        var h = date.getHours() + ':';
        var m = date.getMinutes() + ':';
        var s = date.getSeconds();
        return Y+M+D+h+m+s;
    },
    formatDateMd: function (timestamp) {
        var date = new Date(timestamp * 1000);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
        var Y = date.getFullYear() + '/';
        var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '/';
        var D = date.getDate() + ' ';
        var h = date.getHours() + ':';
        var m = date.getMinutes() + ':';
        var s = date.getSeconds();
        return M+D;
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

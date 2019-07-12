<template>
  <div class="JiaoyiTab">
    <button 
    :class="{'activetabOne':(currentFilter==index&&currentFilter==0),'activetabTwo':(currentFilter==index&&currentFilter==1)}" 
    v-for="(item,index) in filterData.navTab" 
     @click="filterSort(index)"
    :key="index">{{item.name}}</button>
  </div>
</template>

<script>
export default {
  name: "JiaoyiTab",
  data() {
    return {
      currentFilter: 0,    //默认当前点击的是综合排序，不是距离最近等
    };
  },
  props: {
    filterData: Object
  },
  created(){
    console.log("当前的tab数据",this.filterData);
  },
   methods: {
    // 点击4个tab进行切换筛选内容
    filterSort(index) {
      this.currentFilter = index;
      switch (index) {
        case 0: 
           this.$emit("update", {
            condition: this.filterData.navTab[0].condition    //获取条件距离最近distance，作为条件
          });
          break;
        case 1:
          this.$emit("update", {
            condition: this.filterData.navTab[1].condition    //获取条件距离最近distance，作为条件
          });
          break;
      }
    }
   }
};
</script>

<style scoped>
  button{
    padding: 8px 6vw;
    width: 50%;
    color:#999;
    background-color:#cccccc75;
  }
  .activetabOne{
    background-color:rgb(77,170,144);
    color:#fff;
  }
  .activetabTwo{
    color:#fff;
    background-color: #e27373;
  }
</style>

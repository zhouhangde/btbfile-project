<template>
  <div class="HanqTab">
    <aside>
      <div class="filter_wrap" v-for="(item,index) in hqfilterData.navTab" :key="index" 
         :class="{'filter-bold':currentFilter==index}"
          @click="hqfilterSort(index)">
         <span class="HomeName">{{item.name}}</span>
      </div>
    </aside>
  </div>
</template>

<script>
export default {
  name: "HanqTab",
  data() {
    return {
      currentFilter: 0,    //默认当前点击的是综合排序，不是距离最近等
    };
  },
  props: {
    hqfilterData: Object

  },
  created(){
    
  },
   methods: {
    // 点击4个tab进行切换筛选内容
    hqfilterSort(index) {
      this.currentFilter = index;
      switch (index) {
        case 0: 
           this.$emit("update", {
            condition: this.hqfilterData.navTab[0].condition    //获取条件距离最近distance，作为条件
          });
          break;
        case 1:
          this.$emit("update", {
            condition: this.hqfilterData.navTab[1].condition    //获取条件距离最近distance，作为条件
          });
          break;
      }
    }
   }
};
</script>

<style scoped>
  .HanqTab{
      width: 100%;
  }
  .HanqTab aside{
     display: flex;
      flex: 1;
      justify-content: space-around;
      padding: 10px 0;
  }
  .HomeName{
    font-size: 1rem;
  }
  .filter-bold {
    /* font-weight: 600; */
    color: #009eef;
    font-size: 16px;
  }
</style>

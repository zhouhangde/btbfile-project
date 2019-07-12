<template>
  <div class="HomeTwo">
    <aside>
      <div class="filter_wrap" v-for="(item,index) in filterData.navTab" :key="index" 
         :class="{'filter-bold':currentFilter==index}"
          @click="filterSort(index)">
         <span class="HomeName">{{item.name}}</span>
      </div>
    </aside>
  </div>
</template>

<script>
export default {
  name: "HomeTwo",
  data() {
    return {
      currentFilter: 0,    //默认当前点击的是综合排序，不是距离最近等
    };
  },
  props: {
    filterData: Object
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
  .HomeTwo{
      width: 100%;
  }
  .HomeTwo aside{
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

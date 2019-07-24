<template>
  <div class="kxImgTabList">
    <div>
      <div class="itemzord">
        <span v-for="(item,index) in zorjdata.titleDta" :key="index">{{item.title}}</span>
      </div>
      <div v-for="(item,index) in zorjdata.allData" :key="index" class="itemzord">
          <div v-if="item.time">{{item.time}}</div>
          <div style="color:#cc6e6e">{{item.price}}</div>
          <div class="centeritem">
            <span style="margin-left:30px;">{{item.mount}}</span>
          </div>
      </div>
    </div>
    <!-- <div style="width:50%">
       <div class="title-header" >
          <span>价格</span>
          <span>数量</span>
        </div>
        <div v-for="(item,index) in zorjdata.allData" :key="index" class="itemzord">
            <div v-if="item.time">{{item.time}}</div>
            <div style="color:green">{{item.price}}</div>
            <div class="centeritem">
              <span style="margin-left:30px;">{{item.mount}}</span>
            </div>
        </div>
    </div> -->
  </div>
</template>

<script>
export default {
  name: "kxImgTabList",
  props: {
    zorjdata: Object
  },
  created(){
    // console.log(this.zorjdata)
  }
};
</script>

<style scoped>
  .itemzord{
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 11px 10px;
  }
  .centeritem{
    display: flex;
    flex-direction: column;

  }
  .title-header{
      display: flex;
    justify-content: space-between;
    padding: 11px 13px;
  }
    
</style>

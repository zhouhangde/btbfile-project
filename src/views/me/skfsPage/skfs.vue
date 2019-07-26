<template>
  <div class="skfs">
    <Header :isLeft="true" :title="title" :newSkMethordIcon="newSkMethordIcon" @shownewSkMethord="shownewSkMethord"/>
    <div class="item-input" @click="$router.push({name:'zfbMethod'})">
        <i class="fa fa-cny (alias)"></i>
        <div class="item-right">
            <span>支付宝(28838823839)</span>
            <i class="fa fa-angle-right" style="font-size: 17px;"></i>
        </div>
    </div>
      <div class="item-input" @click="$router.push({name:'wxMethod'})">
        <i class="fa fa-wechat (alias)"></i>
        <div class="item-right">
            <span>微信(18828383)</span>
            <i class="fa fa-angle-right" style="font-size: 17px;"></i>
        </div>
    </div>
  </div>
</template>

<script>
import Header from "../../../components/Header";
export default {
  name: "skfs",
  data() {
    return {
      title:'收款方式',
      newSkMethordIcon:true
    };
  },
  beforeRouteEnter(to, from, next) {
    next(vm => vm.getData());
  },
  methods: {
    // 获取用户信息
    getData() {
      
    },
    shownewSkMethord(){
       this.$router.push({name:'addSkMethord'})
    }
  },
  components: {
     Header
  }
};
</script>

<style scoped>
.skfs {
  width: 100%;
  height: 100%;
  overflow: auto;
  box-sizing: border-box;
}
.item-input{
    display: flex;
    height: 6vh;
    margin: 10px;
    border-bottom:1px solid #ccc;
    justify-content: space-between;
}
.item-input i{
  line-height: 30px;
  padding:2px;
}
.item-right{
    padding: 2vw 0;
    /* border-bottom: 1px solid #d6c2c2; */
    width:83%;
    display: flex;
    align-items: flex-start;
    justify-content: space-between;

}
.theIcon{
  width:5%;
  font-size: 17px;
  padding: 2vw 3vw;
}
</style>
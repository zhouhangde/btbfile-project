<template>
  <div class="addYhkMethord">
    <Header :isLeft="true" :title="title"/>
    <div class="theInput">
      <input type="text" placeholder="请输入持卡人姓名"/>
    </div>
    <div class="theInput">
      <input type="text" placeholder="请输入银行卡卡号"/>
    </div>
    <div class="theInput" style="display:flex;justify-content: space-between;align-items: center;" @click="$router.push({name:'chooseBank'})">
      <span>{{theBank}}</span>
      <span style="color: #a79a9a;">请选择银行卡<i class="fa fa-angle-right" style="font-size: 17px;margin-left: 10px;"></i></span>
    </div>
    <div class="complate">
        完成
    </div>
  </div>
</template>

<script>
import Header from "../../../components/Header";
export default {
  name: "addYhkMethord",
  data() {
    return {
      title:'新增收款信息(银行卡)',
      theBank:'银行卡开户行'
    };
  },
  beforeRouteEnter(to, from, next) {
    next(vm => vm.getData());
  },
  methods: {
    // 获取用户信息
    getData() {
      if(this.$route.params.theBank){
       this.theBank = this.$route.params.theBank
      }
      
    }
  },
  components: {
     Header
  }
};
</script>

<style scoped>
.addYhkMethord {
  width: 100%;
  height: 100%;
  overflow: auto;
  box-sizing: border-box;
}
.complate{
    text-align: center;
    height: 8vw;
    line-height: 8vw;
    position: absolute;
    bottom: 0;
    width: 100%;
    background-color: #40a1e2;
    color: #fff;
}
.theInput{
    margin: 15px;
    padding: 15px 0;
    border-bottom: 1px solid #dccfcf;
}
</style>
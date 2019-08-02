<template>
  <div class="addYhkMethord">
    <Header :isLeft="true" :title="title"/>
    <div class="theInput">
      <input type="text" placeholder="请输入持卡人姓名" v-model="addData.username"/>
    </div>
    <div class="theInput">
      <input type="text" placeholder="请输入银行卡卡号" v-model="addData.account"/>
    </div>
    <div class="theInput" style="display:flex;justify-content: space-between;align-items: center;" @click="$router.push({name:'chooseBank'})">
      <span>{{addData.bank_name}}</span>
      <span style="color: #a79a9a;">请选择银行卡<i class="fa fa-angle-right" style="font-size: 17px;margin-left: 10px;"></i></span>
    </div>
    <div class="complate" @click="addYhk">
        完成
    </div>
  </div>
</template>

<script>
import Header from "../../../components/Header";
import { Toast } from "mint-ui";
export default {
  name: "addYhkMethord",
  data() {
    return {
      title:'新增收款信息(银行卡)',
      // theBank:'银行卡开户行',
      addData:{
        access_token:'9yv8FP7oH7XdRSqXYunb1ySTAp8trd2B_1560572313',
        account:'',
        bank_name:'银行卡开户行',
        proceeds_type:'bank',
        username:''
      }
    };
  },
  beforeRouteEnter(to, from, next) {
    next(vm => vm.getData());
  },
  methods: {
    // 获取用户信息
    getData() {
      if(this.$route.params.theBank){
       this.addData.bank_name = this.$route.params.theBank
      }
      
    },
    addYhk(){
      var $this = this
        this.$axios
        .post("api/gathering/add-proceed", $this.addData)
        .then(res => {
          if(res.data.code == '200'){
              // 检验成功 设置登录状态并且跳转到/
               console.log('res',res)
               $this.$toast({
                message: '添加成功',
                position: "bottom",
                duration: 2000
              });
               $this.$router.push({name:'skfs'})
          }else{
            $this.$toast({
                message: res.data.message,
                position: "bottom",
                duration: 2000
              });
              return;
          }
        })
        .catch(err => {
            $this.$toast({
                message: '网络错误',
                position: "bottom",
                duration: 2000
              });
              return;
        });
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
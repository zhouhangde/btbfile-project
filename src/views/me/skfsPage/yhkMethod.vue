<template>
  <div class="yhkMethod">
    <Header :isLeft="true" :title="title"/>
    <div class="theInput">
      <input type="text" placeholder="请输入持卡人姓名" v-model="zfbDetailData.username"/>
    </div>
    <div class="theInput">
      <input type="text" placeholder="请输入银行卡卡号" v-model="zfbDetailData.account"/>
    </div>
    <div class="theInput" style="display:flex;justify-content: space-between;align-items: center;" @click="$router.push({name:'chooseBankUpdate',params:{zfbDetailData:zfbDetailData}})">
      <span>{{zfbDetailData.name}}</span>
      <span style="color: #a79a9a;">请选择银行卡<i class="fa fa-angle-right" style="font-size: 17px;margin-left: 10px;"></i></span>
    </div>
    <div class="zfb_button">
      <button class="the_delete" @click="deleteFk">删除</button>
      <button class="the_complte" @click="goComplte">完成</button>
    </div>
  </div>
</template>

<script>
import Header from "../../../components/Header";
import { Toast } from "mint-ui";
import { setTimeout } from 'timers';
export default {
  name: "yhkMethod",
  data() {
    return {
      title:'修改收款信息(银行卡)',
      // theBank:'银行卡开户行',
      selectInfo:{
        access_token:'',
        id:''
      },
      zfbDetailData:{
        username:'',
        account:'',
        id:'',
        name: '',  //银行卡种类
        accessToken:''
      }
    };
  },
  beforeRouteEnter(to, from, next) {
    next(vm => vm.getData());
  },
  methods: {
    // 获取用户信息
    getData() {
      let access_token = localStorage.getItem('access_token')
      this.selectInfo.access_token = access_token  

      var $this = this
      if(this.$route.params.item){
       this.zfbDetailData = this.$route.params.item
      }
      if(this.$route.params.itemUpdate){
       this.zfbDetailData = this.$route.params.itemUpdate
      }
      if(this.$route.params.theBank){
       this.zfbDetailData.name = this.$route.params.theBank
      }
      // this.geiDetail()  //根据id查询详情
    },
    geiDetail(){
      var $this = this
        this.$axios
        .post("/api/gathering/get-one", $this.selectInfo)
        .then(res => {
          if(res.data.code == '200'){
              // 检验成功 设置登录状态并且跳转到/
               console.log('res',res)
               $this.zfbDetailData = res.data.data

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
    },
    //修改银行卡信息
    goComplte(){
      var $this = this
      // var dataTwo = new FormData();
      // dataTwo.append("id", '409');
      // dataTwo.append("access_token", 'fJmsZgoBIfdMvmiAc3AwfhS2-Y7GScc9_1563504284');
      // dataTwo.append("bank_name", '中国农业银行');
      // dataTwo.append("proceeds_type", 'bank');
      // dataTwo.append("username", 'zq');
      this.$axios
        .post("/api/gathering/up-proceed", {
          access_token: $this.selectInfo.access_token,
          id:$this.zfbDetailData.id,
          name:$this.zfbDetailData.name,
          proceeds_type:'bank',
          username:$this.zfbDetailData.username,
          account:$this.zfbDetailData.account    //银行卡
        })
        .then(res => {
          if(res.data.code == '200'){
              // 检验成功 设置登录状态并且跳转到/
               $this.$toast({
                message: res.data.message,
                position: "bottom",
                duration: 2000
              });
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
    },
    deleteFk(){
      var $this = this
      this.$axios
        .post("/api/gathering/del-proceed", {
          access_token: $this.selectInfo.access_token,
          id:$this.zfbDetailData.id
        })
        .then(res => {
          if(res.data.code == '200'){
              // 检验成功 设置登录状态并且跳转到/
               $this.$toast({
                message: res.data.message,
                position: "bottom",
                duration: 2000
              });
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
.yhkMethod {
  width: 100%;
  height: 100%;
  overflow: auto;
  box-sizing: border-box;
}
.zfb_button{
    text-align: center;
    height: 8vw;
    line-height: 8vw;
    position: absolute;
    bottom: 0;
    width: 100%;
    background-color: #bbc5e8;
}
.the_delete{
    width: 50%;
    background-color: #bf2c2c;
    padding: 7px 0;
    color: #fff;

}
.the_complte{
    width: 50%;
    background-color: #30ab32;
    padding: 7px 0;
    color: #fff;
 } 
.theInput{
    margin: 15px;
    padding: 15px 0;
    border-bottom: 1px solid #dccfcf;
}
</style>
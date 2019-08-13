<template>
  <div class="addBank">
    <Header :isLeft="true" :title="title"/>
    <div style="padding: 14px;">
        <div class="theItem">
            <span>开户名:</span>
            <input type="text" v-model="accountName" style="flex-grow: 1;margin-left: 33px;" placeholder="填写正确的用户名"/>
        </div>
        <div class="theItem">
            <span>开户银行:</span>
            <select style="flex-grow: 1;margin-left: 20px;height: 30px;" v-model="bankName">
                <option selected="selected" value="">请选择银行</option>
                <option v-for="(item,index) in bankNameList" :value="item" :key="index">{{item}}</option>
            </select>
        </div>
        <div class="theItem">
            <span>银行卡号:</span>
            <input type="text" placeholder="填写正确的银行卡号，不必用空格隔开" v-model="cardNumber" style="flex-grow: 1;margin-left: 20px;"/>
        </div>
        <div style="text-align: center;">
            <button class="theAdd" @click="addBank">添加</button>
        </div>
    </div>
  </div>
</template>

<script>
import Header from "../../components/Header";
import { Toast } from "mint-ui";
import {
    addBank,   //添加银行卡
    selectMhHelpBank  //查询所有支持的银行卡
} from '../../../src/api/cztx/cztx'
export default {
  name: "addBank",
  data() {
    return {
      title:'添加银行卡',
      accountName:'',  //开户名
      bankName:'',  //开户银行
      cardNumber:'', //开户卡号
      bankNameList:[] //我的所有可选择的银行卡
    };
  },
  beforeRouteEnter(to, from, next) {
    next(vm => vm.selectMhHelpBank());
  },
  methods:{
     addBank(){
        var $this = this
        if($this.accountName.length<1){
          Toast({
              message: '请输入用户名',
              position: "bottom",
              duration: 2000
            });
            return
        }
        if($this.bankName.length<1){
          Toast({
              message: '请先选择银行卡',
              position: "bottom",
              duration: 2000
            });
            return
        }
        if($this.cardNumber.length<1){
          Toast({
              message: '请输入卡号',
              position: "bottom",
              duration: 2000
            });
            return
        }
        var accountName = this.accountName;
        var bankName = this.bankName;
        var cardNumber = this.cardNumber;
        var accessToken = localStorage.getItem('access_token');

        addBank({
          account_name:accountName,
          bank_name:bankName,
          card_number:cardNumber,
          access_token:accessToken
        }).then((res) => {
          if(res.data.code==501){
            Toast({
              message: '最多保存4张卡',
              position: "bottom",
              duration: 2000
            });
            return
          }else{
            $this.$router.push({name:"cztx"})
          }
        });
     },
     //查询所有支持的银行卡
     selectMhHelpBank(){
        var $this =this
        $this.bankNameList = []  //先清空
        selectMhHelpBank().then((res) => {
          if(res.data.data.length>0){
              for(let item of res.data.data){
                $this.bankNameList.push(item.bank_name)
              }
            }
        });
    }  
  },
  mounted() {
  },
  components: {
     Header
  }
};
</script>

<style scoped>
.addBank {
  width: 100%;
  height: 100%;
  overflow: auto;
  box-sizing: border-box;
}
.theItem{
  padding: 11px 0px;
  display: flex;
  align-items: center;
}
.theAdd{
  padding: 7px 20px;
  background-color: #b90f0f;
  color: #fff;
  margin-top: 30px;
}
    
</style>
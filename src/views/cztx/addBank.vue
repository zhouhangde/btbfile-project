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
                <option>中国工商银行</option>
                <option>中国银行</option>
                <option>中国农业银行</option>
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
import $ from 'jquery'
import Header from "../../components/Header";
export default {
  name: "addBank",
  data() {
    return {
      title:'添加银行卡',
      accountName:'',  //开户名
      bankName:'',  //开户银行
      cardNumber:'' //开户卡号
    };
  },
  methods:{
     addBank(){
        var $this = this
        var accountName = this.accountName;
        var bankName = this.bankName;
        var cardNumber = this.cardNumber;
        var accessToken = localStorage.getItem('access_token');
        var myform = new FormData();
        myform.append("account_name", accountName);
        myform.append("bank_name", bankName);
        myform.append("card_number", cardNumber);
        myform.append("access_token", 'usHckH4vXAJtXh6osFbnfF_UcyMfFWDX_1564985222');
        $.ajax({
            type : "POST",
            contentType: false,
            processData: false,
            cache: false,
            async: false, 
            url : "/api/user/add-bank",
            dataType: "JSON",
            data : myform,
            success : function(result) {
                $this.$router.push({name:"cztx"})
            },
            error : function(e){
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
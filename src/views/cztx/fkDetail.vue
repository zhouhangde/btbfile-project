<template>
  <div class="fkDetail">
    <Header :isLeft="true" :title="title"/>
    <div style="padding:12px">
        <p style="padding:12px 0">1.请按提示信息向该卖家汇款</p>
        <div style="padding: 10px;border: 1px solid #c7bfbf;">
            <ul>
                <li class="theItem">
                    <span>收款方户名:</span>
                    <span>{{myAccoutName}}</span>
                </li>
                <li class="theItem">
                    <span>收款方开户行:</span>
                    <span>{{myBankName}}</span>
                </li>
                <li class="theItem">
                    <span>收款方账户:</span>
                    <span>{{myCardNumber}}</span>
                </li>
                <li class="theItem">
                    <span>转账金额:</span>
                    <span>{{myitemDetail.total_price}}</span>
                </li>
                <li class="theItem">
                    <span>汇款时付款码:</span>
                    <span>{{myitemDetail.payment_code}}(请务必填写)</span>
                </li>
                <li class="theItem">
                    <span>状态:</span>
                    <div>
                        <span v-if="myitemDetail.status == '0'">未支付</span>
                        <span v-else-if="myitemDetail.status == '1'">处理中</span>
                        <span v-else-if="myitemDetail.status == '2'">已完成</span>
                        <span v-else-if="myitemDetail.status == '3'">审核失败</span>
                    </div>
                </li>
            </ul>
        </div>
        <div style="text-align: center;">
           <button class="confirm" @click="updateStaus(myitemDetail.id)">我已付款</button>
        </div>
        <div>
            <p style="padding:12px 0">2.汇款时请一定要填写备注信息，付款完成后，请点击我已付款按钮；</p>
            <p style="padding:12px 0">3.卖家确认收到款后，自动充值USDT。如超过24小时未收到币，请向客服反馈解决；</p>
            <p style="padding:12px 0;color:red">4.请务必使用本人绑定的银行卡通过手机银行或网银进行汇款；</p>
            <p style="padding:12px 0;color:red">5.禁止使用微信、支付宝、他人代付、ATM及柜台转账等第三方转账。</p>
            <hr>
            <p style="padding:12px 0;">温馨提示：如有任何疑问请联系在线客服查看帮助中心。</p>
        </div>
    </div>
  </div>
</template>

<script>
import $ from 'jquery'
import Header from "../../components/Header";
import { Toast } from "mint-ui";
export default {
  name: "fkDetail",
  data() {
    return {
      title:'汇款订单',
      myitemDetail:{},
      myAccoutName:'',  //详情中的账户名称
      myBankName:'',  //详情中的开户支行
      myCardNumber:'' //详情中的收款方账户
    };
  },
  beforeRouteEnter(to, from, next) {
    next(vm => vm.getData());
  },
  mounted() {
  },
  methods: {
    getData(){
      this.myitemDetail = this.$route.params.fkDetail  //获取详情信息
      this.myAccoutName = this.$route.params.myAccoutName  //获取详情信息
      this.myBankName = this.$route.params.myBankName  //获取详情信息
      this.myCardNumber = this.$route.params.myCardNumber  //获取详情信息
    },
    // 修改交易状态
    updateStaus(id){
        var accessToken = localStorage.getItem('access_token');
        var myform = new FormData();
        myform.append("access_token", 'usHckH4vXAJtXh6osFbnfF_UcyMfFWDX_1564985222');
        myform.append("record_id", id);
        $.ajax({
            type : "POST",
            contentType: false,
            processData: false,
            cache: false,
            async: false, 
            url : "http://91bilong.com/api/user/save-recoed",
            dataType: "JSON",
            data : myform,
            success : function(result) {
                if(result.code == 501){
                   Toast({
                    message: '操作有误请稍后重试',
                    position: "bottom",
                    duration: 2000
                  });
                }else{
                  Toast({
                    message: '操作成功',
                    position: "bottom",
                    duration: 2000
                 });
                }
            },
            error : function(e){
            // console.log(e.status);
            // console.log(e.responseText);
            }
        });
    }
  },
  components: {
     Header
  }
};
</script>

<style scoped>
.fkDetail {
  width: 100%;
  height: 100%;
  overflow: auto;
  box-sizing: border-box;
}
.theItem{
  padding: 12px 0;
  display: flex;
  justify-content: space-between;
}
.confirm{
  padding: 7px;
  background-color: #ea0e0e;
  margin-top: 15px;
  color: #fff; 
}

</style>
<template>
  <div class="cztx">
    <ly-tab
      v-model="selectedId"
      :items="items"
      :options="options"
      @change="handleChange">
    </ly-tab>
    <div class="theContent">
      <!-- 第一个tab -->
      <div v-if="current == 0">
        <div class="tabItem">
          <span style="font-weight: bolder;font-size: 16px;">一键充值USDT</span>
        </div>
        <div class="tabItem">
          <span style="color: #9e9696;">参考单价</span>
          <span style="color: #de3636;">{{price}}元</span>
        </div>
        <div class="tabItem">
          <span style="color: #9e9696;">购买数量:</span>
          <input type="text" v-model="czNumber" style="flex-grow: 1;text-indent:5px"  dir="rtl"/>
          <span></span>
        </div>
        <div class="tabItem">
          <button class="selectActive" style="">银行卡</button>
        </div>
        <div class="theBuyEnd" @click="getChonZhiData">
          一键充值
        </div>
      </div>
      <!-- 第一个tab结束 -->
      <!-- 第二个tab -->
      <div v-else-if="current == 1">
        <div class="tabItem">
          <span style="font-weight: bolder;font-size: 16px;">一键提现USDT</span>
        </div>
        <div class="tabItem">
          <span style="color: #9e9696;">参考单价</span>
          <span style="color: rgb(58, 181, 161);">{{price}}元</span>
        </div>
        <div class="tabItem">
          <span style="color: #9e9696;">提现数量:</span>
          <input type="text" v-model="txNumber" style="flex-grow: 1;text-indent:5px"  dir="rtl"/>
          <span></span>
        </div>
        <div class="tabItem">
          <button class="selectActive" style="">银行卡</button>
          <span>请选择银行卡</span>
        </div>
        <div>
          <ul >
            <li style="border-bottom: 1px solid #e8dcdc;" v-for="(item,index) in myBankDataList" :key="index">
              <div class="the-cell"  @click="toggleSelectBank(index,item.id)"  :class="activeItem == index ? 'showBorder' : ''"> 
                <p class="the-index">
                  <span style="color:blue">银行:</span>
                  <span>{{item.bank_name}}</span>
                </p>
                <p class="the-index">
                  <span style="color:blue">姓名:</span>
                  <span>{{item.account_name}}</span>
                </p>
                <p class="the-index">
                  <span style="color:blue">卡号:</span>
                  <span>{{item.card_number}}</span>
                </p>
              </div>
            </li>
          </ul>
        </div>
        <div class="theSellerEnd" @click="getTiXianData">
          一键提现
        </div>
      </div>
      <!-- 第二个tab结束 -->
      <!-- 第三个个tab -->
      <div v-else-if="current == 2">
        <ul v-if="myDhDataList.length>0">
         <li v-for="(item,index) in myDhDataList" :key="index" style="border-bottom: 1px solid #e8dcdc;">
           <div class="the-cell"> 
             <p class="the-index" @click="$router.push({name:'fkDetail',params:{fkDetail:item,myAccoutName:myAccoutName,myBankName:myBankName,myCardNumber:myCardNumber}})">
               <span style="color:blue">{{item.created_at | formatDate}}</span>
               <span style="font-size: 15px;">进入付款信息<i class="fa fa-angle-right"></i></span>
             </p>
             <div style="color:#001" class="the-index">
               <p style="text-align:center;" class="table-item">
                  <span style="color:#999;">类别</span>
                  <span v-if="item.type == '1'">充值</span>
                  <span v-else>提现</span>
               </p>
               <p style="text-align:center;" class="table-item">
                  <span style="color:#999;">数量</span>
                  <span>{{item.num}}</span>
               </p>
               <p style="text-align:center;" class="table-item"> 
                  <span style="color:#ccc;">单价(元)
                  </span>
                  <span>{{price}}</span>
               </p>
               <p style="text-align:center;" class="table-item">
                  <span style="color:#999;">总价(元)</span>
                  <span>{{item.total_price}}</span>
               </p>
               <p style="text-align:center;" class="table-item">
                  <span style="color:#999;">状态</span>
                  <span v-if="item.status == '0'">未支付</span>
                  <span v-else-if="item.status == '1'">处理中</span>
                  <span v-else-if="item.status == '2'">已完成</span>
                  <span v-else-if="item.status == '3'">审核失败</span>
               </p>
             </div>
           </div>
         </li>
       </ul>
       <div v-else style="display: flex;flex-direction: column;align-items: center;padding: 15px 0;">
          <img src="../assets/image/duihuan.png" style="width: 78px;height: 78px;"/>
          <p style="padding: 15px 0;">
            <span>----</span>
            <span>暂无兑换记录</span>
            <span>----</span>
          </p>
       </div>
      </div>
      <!-- 第三个tab结束 -->
      <!-- 第四个tab -->
      <div v-else-if="current == 3" style="display: flex;flex-direction: column;padding: 15px 0;">
        <div @click="$router.push({name:'addBank'})" style="text-align: center;">
            <img src="../assets/image/bank.svg" style="width: 68px;height: 68px;"/>
            <p style="padding: 10px 0;">添加银行卡</p>
        </div>
        <p style="padding: 15px 0;text-align: center;">
          <span>----</span>
          <span>每个账户仅绑定四张银行卡</span>
          <span>----</span>
        </p>
        <ul style="">
         <li style="border-bottom: 1px solid #e8dcdc;" v-for="(item,index) in myBankDataList" :key="index">
           <div class="the-cell"> 
             <p class="the-index">
               <span style="color:blue">银行:</span>
               <span>{{item.bank_name}}</span>
             </p>
             <p class="the-index">
               <span style="color:blue">姓名:</span>
               <span>{{item.account_name}}</span>
             </p>
             <p class="the-index">
               <span style="color:blue">卡号:</span>
               <span>{{item.card_number}}</span>
             </p>
             <p style="text-align: center;">
               <button style="color: #fff;background-color: #a62424;padding: 3px 10px;" @click="deleteBankById(item.id)">删除</button>
             </p>
           </div>
         </li>
       </ul>
      </div>
      <!-- 第四个tab结束 -->
    </div>
  </div>
</template>

<script>
import moment from 'moment'  //时间转化工具
import $ from 'jquery'
import LyTab from '../components/ly-tab/src/index.vue'
import { Toast } from "mint-ui";
export default {
  name: "cztx",
  data() {
    return {
      // 以下为滑动导航
      selectedId: 0,   //设置导航默认为第几个
      // 导航标题数组
      items: [
        {label: '充值'},
        {label: '提现'},
        {label: '兑换记录'},
        {label: '银行卡'}
      ],
      // 导航激活状态的颜色
      options: {
        activeColor: 'red'
      },
      // 滑动导航结束
      octJiData:[],
      current:0,   //存储当前点击的是哪一个tab
      myDhDataList:[],   //存储我的兑换记录列表数据
      myBankDataList:[],    //存储我的新增的银行卡
      czNumber:'', //存储充值金额
      txNumber:'', //存储提现金额
      activeItem:0,  //存储选择的银行,默认第一个
      currentBankId:0,  //存储选择的银行id
      myAviable:0,  //存储我的课提现余额
      myAccoutName:'',  //详情中的账户名称
      myBankName:'',  //详情中的开户支行
      myCardNumber:'', //详情中的收款方账户
      price:''  //详情中的单价
    };
  },
  beforeRouteEnter(to, from, next) {
    next(vm => vm.getData());
  },
  filters: {
    formatDate: function (value) {
      value = parseInt(value)*1000
      return moment(value).format('YYYY-MM-DD HH:MM:SS')
    }
  },
  methods: {
    toggleSelectBank(index,id){
      //将点击的元素的索引赋值给变量
      this.activeItem = index
      this.currentBankId = id
    },
    getData(){
       this.getBankData() //重新查询我的银行卡
       this.selectDetail()  // 查询兑换详情中的公共数据
    },
    // 点击导航切换
    handleChange (item, index) {
      this.octJiData = []
      if(index == '0'){
         this.current = 0
       }else if(index == '1'){
         this.current = 1
         this.selectAviableMoney()  //查询可提现余额
        //  this.getTiXianData();
       }else if(index == '2'){
         this.current = 2
         this.getDhData();
       }else if(index == '3'){
         this.current = 3
         this.getBankData();
       }
    },
    // 查询兑换详情中的公共数据
    selectDetail(){
        var $this = this
        var accessToken = localStorage.getItem('access_token');
        var myform = new FormData();
        myform.append("access_token", 'usHckH4vXAJtXh6osFbnfF_UcyMfFWDX_1564985222');
        $.ajax({
          type : "POST",
          contentType: false,
          processData: false,
          cache: false,
          async: false, 
          url : "http://91bilong.com/api/user/crc-bank-info",
          dataType: "JSON",
          data : myform,
          success : function(result) {
            $this.myAccoutName  = result.data.account_name;
            $this.myBankName  = result.data.bank_name;
            $this.myCardNumber  = result.data.card_number;
            $this.price  = result.data.exchange_rate;
          },
          error : function(e){
          }
        });
    },
    // 去充值
    getChonZhiData(){
        var inpNum = this.czNumber;
        var accessToken = localStorage.getItem('access_token');
        var myform = new FormData();
        myform.append("access_token", 'usHckH4vXAJtXh6osFbnfF_UcyMfFWDX_1564985222');
        myform.append("num", inpNum);
        $.ajax({
          type : "POST",
          contentType: false,
          processData: false,
          cache: false,
          async: false, 
          url : "/api/user/purchase",
          dataType: "JSON",
          data : myform,
          success : function(result) {
            if(result.code == 200){
              Toast({
                message: '充值成功',
                position: "bottom",
                duration: 2000
              });
            }
          },
          error : function(e){
          }
        });
    },
    // 去提现
    getTiXianData(){
        var outpNum = this.txNumber;
        var bankId = this.currentBankId;
        var accessToken = localStorage.getItem('access_token');
        var myform = new FormData();
        myform.append("access_token", 'usHckH4vXAJtXh6osFbnfF_UcyMfFWDX_1564985222');
        myform.append("bank_id", bankId);
        myform.append("num", outpNum);
        $.ajax({
          type : "POST",
          contentType: false,
          processData: false,
          cache: false,
          async: false, 
          url : "/api/user/sellout",
          dataType: "JSON",
          data : myform,
          success : function(result) {
            if(result.code == '501'){
              Toast({
                message: '余额不足',
                position: "bottom",
                duration: 2000
              });
            }else{
              Toast({
                message: '提现成功',
                position: "bottom",
                duration: 2000
              });
            }
            
          },
          error : function(e){
          }
        });  
    },
    //查询兑换记录
    getDhData(){
      var $this = this
      var accessToken = localStorage.getItem('access_token');
      var myform = new FormData();
      myform.append("access_token", 'usHckH4vXAJtXh6osFbnfF_UcyMfFWDX_1564985222');
      $.ajax({
        type : "POST",
        contentType: false,
        processData: false,
        cache: false,
        async: false, 
        url : "http://91bilong.com/api/user/get-recoed",
        dataType: "JSON",
        data : myform,
        success : function(result) {
          if(result.data && result.data.length>0){
             $this.myDhDataList = result.data
          }
        },
        error : function(e){
          // console.log(e.status);
          // console.log(e.responseText);
        }
      });
    },
    //查询我新增的银行
    getBankData(){
      var $this = this
      var accessToken = localStorage.getItem('access_token');
      var myform = new FormData();
      myform.append("access_token", 'usHckH4vXAJtXh6osFbnfF_UcyMfFWDX_1564985222');
      $.ajax({
        type : "POST",
        contentType: false,
        processData: false,
        cache: false,
        async: false, 
        url : "http://91bilong.com/api/user/get-bank",
        dataType: "JSON",
        data : myform,
        success : function(result) {
          $this.myBankDataList = result.data
          if(result.data && result.data.length>0){
            $this.currentBankId = result.data[0].id
          }
        },
        error : function(e){
          // console.log(e.status);
          // console.log(e.responseText);
        }
      });
    },
    //删除银行卡
    deleteBankById(id){
        var $this = this
        var accessToken = localStorage.getItem('access_token');
        var myform = new FormData();
        myform.append("access_token", 'usHckH4vXAJtXh6osFbnfF_UcyMfFWDX_1564985222');
        myform.append("id", id);
        $.ajax({
          type : "POST",
          contentType: false,
          processData: false,
          cache: false,
          async: false, 
          url : "/api/user/delete-bank",
          dataType: "JSON",
          data : myform,
          success : function(result) {
            $this.$toast({
                message: '删除成功',
                position: "bottom",
                duration: 2000
              });
            $this.getBankData()  
          },
          error : function(e){
          }
        });
    },
    //查询我的课提现余额
    selectAviableMoney(){
      var $this = this
      var accessToken = localStorage.getItem('access_token');
      var myform = new FormData();
      myform.append("access_token", 'usHckH4vXAJtXh6osFbnfF_UcyMfFWDX_1564985222');
      myform.append("os", "web");
      $.ajax({
        type : "POST",
        contentType: false,
        processData: false,
        cache: false,
        async: false, 
        url : "http://91bilong.com/api//bargain/balance",
        dataType: "JSON",
        data : myform,
        success : function(result) {
          result.data.list.forEach(function(item,index){
            if(item.name=='USDT'){
              $this.myAviable = item.available;
            }
          })
        },
        error : function(e){
        }
      });
    }
  },
  mounted() {
  },
  components: {
     LyTab
  }
};
</script>

<style scoped>
.cztx {
  width: 100%;
  height: 100%;
  overflow: auto;
  box-sizing: border-box;
}
.theContent{
  padding: 19px;
}
.tabItem{
  display: flex;
  justify-content: space-between;
  padding: 10px 0;
  align-items: center;
}
.selectActive{
  background-image:url('../assets/image/selected.png');
  background-size: 100% 100%;
  padding: 9px 21px;
  display: inline-block;
  margin-left: -10px;
}
.theBuyEnd{
  padding: 7px 0;
  background-color: #de3636;
  text-align: center;
  color: #fff;
  margin-top: 10px;
}
.theSellerEnd{
  padding: 7px 0;
  background-color: rgb(58, 181, 161);
  text-align: center;
  color: #fff;
  margin-top: 10px;
}  
.the-cell{
    font-size: 1rem;
    background: #ffffff;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    flex-direction: column;
    padding: 14px;

}
.the-index {
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding: 2vw 2.666667vw 2vw 0;
  align-content: center;
  flex-wrap: wrap;
}
.the-index > i {
  font-size: 1.3rem;
  color: #ccc;
}   
.the-index >p{
  line-height: 23px;
}
    
.the-index >p >span{
  padding:5px;
}   
.table-item{
  display: flex;
  flex-direction: column;
  text-align: center;
}
.showBorder{
  border: 1px solid red
}
</style>
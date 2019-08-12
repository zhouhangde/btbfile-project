<template>
  <div class="smrzDetail">
    <Header :isLeft="true" :title="title"/>
    <div v-if="grRzStaue == '1'">
      <div style="text-align: center;margin-top: 60px;">
        <img  style="width:20vw;height:20vw" />
      </div>
      <p style="text-align: center;margin-top: 20px;">已认证</p>
    </div>
    <div v-else-if="grRzStaue == '2'">
      <div style="text-align: center;margin-top: 60px;">
        <img  style="width:20vw;height:20vw" />
      </div>
      <p style="text-align: center;margin-top: 20px;">等待审核中</p>
    </div>
    <div v-else-if="grRzStaue == '0'">
      <div style="padding: 10px 30px 20px;background-color: #fff;">
         <div class="theItem">
            <p>
              <input type="text" placeholder="请输入姓名" v-model="selectDatafor.real_name"/>  
            </p>
          </div>
          <div class="theItem">
            <p>
              <input type="text" placeholder="请输入身份证号" v-model="selectDatafor.id_number"/>  
            </p>
          </div>
      </div>
      <div>
          <div class="theTitle">
            <p style="padding-left: 30px;">
              请上传身份证正反照
            </p>
          </div>
      </div>
      <div style="display: flex;justify-content: space-around;">
         <div style="width:45%;text-align: center;position: relative;">
           <div @click="monidianjiZm">
             <img :src="imageSaveZm"  alt="" id="portraitZm" style="width:100%;height:15vh;position: absolute;"/>
             <img  style="width:100%;height:15vh" />
           </div>
           <input type="file" id="saveImageZm" style="display:none">
            <!-- <input type="hidden" v-model="selectDatafor.id_card_img"/>   -->
          </div>     
          <div style="width:45%;text-align: center;position: relative;">
            <div @click="monidianjiFm">
              <img :src="imageSaveFm"   alt="" id="portraitFm" style="width:100%;height:15vh;position: absolute;"/>
              <img  style="width:100%;height:15vh"/>
            </div>
            <input type="file" id="saveImageFm" style="display:none" >
            <!-- <input type="hidden" v-model="selectDatafor.id_card_img2" />   -->
          </div> 
      </div>

      <div class="complate" @click="imageSubmit">
            完成
        </div>

      <!-- <div class="mask-order" style="padding:10px">
        <div class="mask-order-content">
          <span class="order-title">汇款订单</span>
          <div class="order-text one" style="padding: 10px 0;">1.请按提示信息向该卖家汇款</div>
          <div class="order-wrap">
            <div class="order-inner">
              <table border="1" cellpadding="0" cellspacing="0" class="mytable">
                <tr>
                  <td class="order-block-title">收款方户名</td>
                  <td class="order-block-value">王钰霄</td>
                </tr>
                <tr>
                  <td class="order-block-title">收款方开户行</td>
                  <td class="order-block-value">中国银行武汉支行</td>
                </tr>
                <tr>
                  <td class="order-block-title">收款方账户</td>
                  <td class="order-block-value">654231543246532165421</td>
                </tr>
                <tr>
                  <td class="order-block-title">转账金额</td>
                  <td class="order-block-value">
                    <span class="color-red">545.00</span>
                  </td>
                </tr>
                <tr>
                  <td class="order-block-title">汇款时备注内容</td>
                  <td class="order-block-value">
                    <span class="color-red">21546</span>(请务必填写)
                  </td>
                </tr>
                <tr>
                  <td class="order-block-title">状态</td>
                  <td class="order-block-value">
                    <span>待支付</span>
                    <button class="order-btn">我已付款</button>
                  </td>
                </tr>
              </table>
            </div>
          </div>
          <div class="order-text two">
            2.汇款时请一定要填写备注信息，付款完成后，请点击我已付款按钮；
          </div>
          <div class="order-text">
            3.卖家确认收到款后，自动充值USDT。如超过24小时未收到币，请向客服反馈解决；
          </div>
          <div class="order-text color-red">
            4.请务必使用本人绑定的银行卡通过手机银行或网银进行汇款；
          </div>
          <div class="order-text color-red">
            5.禁止使用微信、支付宝、他人代付、ATM及柜台转账等第三方转账。
          </div>
          <div class="order-line"></div>
          <div class="order-warning">
            温馨提示：如有任何疑问请联系在线客服查看帮助中心。
          </div>
        </div>
    </div> -->

    

    
    </div>
  </div>
</template>

<script>
import $ from 'jquery'
import Header from "../../../components/Header";
import { Toast } from "mint-ui";
export default {
  name: "smrzDetail",
  data() {
    return {
       title:'实名认证',
       grRzStaue:false,
       selectDatafor:{
         access_token:'',
         real_name:'zhou',
         id_number:'420982199410306436',
         id_card_img:'', //正面图片路径
         id_card_img2:'' //反面面图片路径
       },
       
       imageSaveZm:"",//正面图片路径
       imageSaveFm:""//反面面图片路径
    };
  },
  beforeRouteEnter(to, from, next) {
    next(vm => vm.getData());
  },
  mounted(){
        this.yulan();//预览图片
    },
  methods: {
    // 获取用户信息
    getData() {


      let access_token = localStorage.getItem('access_token')
      this.selectDatafor.access_token = access_token 

      // this.selectDatafor.access_token = localStorage.getItem('access_token')
      this.grRzStaue = this.$route.params.grRzStaue   //获取路由的个人认证状态
    },
    goGrRz(){
      var _this =this;
      this.$axios
      .post("api/certification/set-real", _this.selectDatafor)
      .then(res => {
        if(res.data.code == '200'){
            // 检验成功 设置登录状态并且跳转到/
            console.log('chengg',res)
        }else{
          Toast({
              message: res.data.message,
              position: "bottom",
              duration: 2000
            });
            return;
        }
      })
      .catch(err => {
          Toast({
              message: '网络错误',
              position: "bottom",
              duration: 2000
            });
            return;
      });
    },
    //身份证正面点击
    monidianjiZm(){
          document.getElementById('saveImageZm').click()
    },
    //身份证反面面点击
    monidianjiFm(){
          document.getElementById('saveImageFm').click()
    },
    yulan(){
        var $this = this
        document.getElementById('saveImageZm').onchange = function () {
            
            var imgFile = this.files[0];
            $this.goupload(imgFile,'zm')
            var fr = new FileReader();
            fr.onload = function () {
                document.getElementById('portraitZm').src = fr.result;
            };
            fr.readAsDataURL(imgFile);
        }
        document.getElementById('saveImageFm').onchange = function () {
            var imgFile = this.files[0];
            $this.goupload(imgFile,'fm')
            var fr = new FileReader();
            fr.onload = function () {
                document.getElementById('portraitFm').src = fr.result;
            };
            fr.readAsDataURL(imgFile);
        }
    },
    goupload(file,staus){
      var $this = this
      var dataTwo = new FormData();
      dataTwo.append("access_token", $this.selectDatafor.access_token);
      dataTwo.append("image", file);

      $.ajax({
          url: "http://91bilong.com/api/certification/upload-image",
          data: dataTwo,
          beforeSend: function(request) {
          },
          dataType: "JSON",
          processData: false,
          contentType: false,
          cache: false,
          async: false, //请求是否异步，默认为异步
          type: "POST",
          success: function(list) {
            if(staus == 'zm'){
              $this.selectDatafor.id_card_img = list.data.urlPath   //存储从服务器获取的正面图片地址
              // $this.imageSaveZm = list.data.urlPath   //存储从服务器获取的正面图片地址
            }else{
              $this.selectDatafor.id_card_img2 = list.data.urlPath   //存储从服务器获取的正面图片地址
              // $this.imageSaveFm = list.data.urlPath   //存储从服务器获取的反面图片地址
            }
          },
          error: function() {}
      });

    },
    //完成提交审核
		 imageSubmit(){
        var $this = this
        this.$axios
        .post("/api/certification/set-real", $this.selectDatafor)
        .then(res => {
          if(res.data.code == '200'){
              // 检验成功 设置登录状态并且跳转到/
               console.log('res',res)
               $this.$toast({
                message: '提交成功',
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
.smrzDetail {
  width: 100%;
  height: 100%;
  overflow: auto;
  box-sizing: border-box;
}
.theItem{
  display: flex;
  justify-content: space-between;
  padding: 15px 0;
  border-bottom: 1px solid #dadada;
}
.theTitle{
  display: flex;
  justify-content: space-between;
  padding: 15px 0;
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
.mytable{
   width: 100%;
}

.mytable td{
  border: 1px solid #d3c4c4;
  padding:5px
}
.order-text{
  padding: 10px 0px;
}
</style>
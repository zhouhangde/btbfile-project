<template>
  <div class="addZfbMethord">
    <Header :isLeft="true" :title="title"/>
    <div style="background-color: #fff;padding: 15px;">
      <input type="text" placeholder="请输入支付宝账号"/>
    </div>
    <div style="padding: 11px 15px;">
      请上传支付宝收款码照片
    </div>
    <div style="padding:15px;">
       <!-- <img src="" style="width: 41vw; height: 33vh;"/> -->
       <div style="width:45%;text-align: center;position: relative;">
          <div @click="monidianjiZm">
            <img :src="imageSaveZm"  alt="" id="portraitZm" style="width:100%;height:15vh;position: absolute;"/>
            <img  style="width:100%;height:15vh" />
          </div>
          <input type="file" id="saveImageZm" style="display:none">
          <!-- <input type="hidden" v-model="selectDatafor.id_card_img"/>   -->
        </div>     
    </div>
    <div class="complate"  @click="addZfb">
        完成
    </div>
  </div>
</template>

<script>
import Header from "../../../components/Header";
export default {
  name: "addZfbMethord",
  data() {
    return {
      title:'新增收款信息(支付宝)',
      // addData:{
      //   access_token:'fJmsZgoBIfdMvmiAc3AwfhS2-Y7GScc9_1563504284',
      //   account:'15527944464',
      //   proceeds_type:'alipay',
      //   qrcode:''    //图片
      // },
      qrcode:'',    //图片
      imageSaveZm:"",//图片路径
      accessToken:''
    };
  },
  beforeRouteEnter(to, from, next) {
    next(vm => vm.getData());
  },
  beforeRouteLeave(to, from, next) {
    // 离开页面关闭定时器
    this.qrcode = ''
    next()
  },
  mounted(){
      this.choose();//监听图片的选择
  },
  methods: {
    // 获取用户信息
    getData() {
      let access_token = localStorage.getItem('access_token')
      this.accessToken = access_token
    },
    //身份证正面点击
    monidianjiZm(){
          document.getElementById('saveImageZm').click()
    },
    choose(){
        var $this = this
        document.getElementById('saveImageZm').onchange = function () {
            
            var imgFile = this.files[0];
            $this.qrcode = imgFile
            var fr = new FileReader();
            fr.onload = function () {
                document.getElementById('portraitZm').src = fr.result;
            };
            fr.readAsDataURL(imgFile);
        }
    },
    addZfb(){
      var $this = this
       if($this.qrcode.length<1){
        $this.$toast({
            message: '请上传图片',
            position: "bottom",
            duration: 2000
          });
          return
      }
      var dataTwo = new FormData();
      dataTwo.append("access_token", $this.accessToken);
      dataTwo.append("qrcode", $this.qrcode);
      dataTwo.append("proceeds_type", 'alipay');
      dataTwo.append("account", '15527944464');
      $.ajax({
          url: "http://91bilong.com/api/gathering/add-proceed",
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
              $this.$toast({
                message: '添加成功',
                position: "bottom",
                duration: 1000
              });
              $this.$router.push({name:'skfs'})
          },
          error: function() {}
      });
    }
  },
  components: {
     Header
  }
};
</script>

<style scoped>
.addZfbMethord {
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

</style>
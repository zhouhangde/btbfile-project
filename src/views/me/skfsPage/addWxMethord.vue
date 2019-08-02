<template>
  <div class="addWxMethord">
    <Header :isLeft="true" :title="title"/>
    <div style="background-color: #fff;padding: 15px;">
      <input type="text" placeholder="请输入微信账号"/>
    </div>
    <div style="padding: 11px 15px;">
      请上传微信收款码照片
    </div>
    <div style="padding:15px;">
      <div style="width:45%;text-align: center;position: relative;">
          <div @click="monidianjiZm">
            <img :src="imageSaveZm"  alt="" id="portraitZm" style="width:100%;height:15vh;position: absolute;"/>
            <img  style="width:100%;height:15vh" />
          </div>
          <input type="file" id="saveImageZm" style="display:none">
          <!-- <input type="hidden" v-model="selectDatafor.id_card_img"/>   -->
        </div>    
    </div>
    <div class="complate" @click="addWx">
        完成
    </div>
  </div>
</template>

<script>
import Header from "../../../components/Header";
export default {
  name: "addWxMethord",
  data() {
    return {
      title:'新增收款信息(微信)',
      qrcode:'',    //图片
      imageSaveZm:"",//图片路径
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
    addWx(){
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
      dataTwo.append("access_token", 'fJmsZgoBIfdMvmiAc3AwfhS2-Y7GScc9_1563504284');
      dataTwo.append("qrcode", $this.qrcode);
      dataTwo.append("proceeds_type", 'wxpay');
      dataTwo.append("account", '15527944464');
      $.ajax({
          url: "http://btbfire.com/api/gathering/add-proceed",
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
.addWxMethord {
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
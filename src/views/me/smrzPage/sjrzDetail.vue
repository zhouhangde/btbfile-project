<template>
  <div class="sjrzDetail">
    <Header :isLeft="true" :title="title"/>
    <div v-if="sjRzStaue == '1'">
      <div style="text-align: center;margin-top: 60px;">
        <img  style="width:20vw;height:20vw" />
      </div>
      <p style="text-align: center;margin-top: 20px;">已认证</p>
    </div>
    <div v-else-if="sjRzStaue == '2'">
      <div style="text-align: center;margin-top: 60px;">
        <img  style="width:20vw;height:20vw" />
      </div>
      <p style="text-align: center;margin-top: 20px;">等待审核中</p>
    </div>
    <div v-else-if="sjRzStaue == '0'">
      <!-- <div style="padding: 10px 30px 20px;background-color: #fff;">
         <div class="theItem">
            <p>
              <input type="text" placeholder="请输入描述" v-model="selectDatafor.describe"/>  
            </p>
          </div>
      </div> -->
      <div>
          <div class="theTitle">
            <p style="padding-left: 30px;">
              请上传资产正面截图
            </p>
          </div>
      </div>
      <div style="display: flex;justify-content: space-around;">
         <div style="width:90%;text-align: center;position: relative;">
           <div @click="monidianjiZm">
             <img :src="imageSaveZm"  alt="" id="portraitZm" style="width:100%;height:15vh;position: absolute;"/>
             <img  style="width:100%;height:15vh" />
           </div>
           <input type="file" id="saveImageZm" style="display:none">
            <!-- <input type="hidden" v-model="selectDatafor.id_card_img"/>   -->
          </div>  
      </div>
      <div style="width: 90%;margin: 0 auto; padding: 8px 0px;">
        <p style="line-height: 17px;color: #40a1e2;">截图要求</p>
        <p style="line-height: 17px;">本人实名银行卡余额或虚拟币资产截图，或对应银行卡近一个月的银行流水截图</p>
      </div>    
      <div>
          <div class="theTitle">
            <p style="padding-left: 30px;">
              请上传录制视频
              <!-- <button @click="monidjVideo">点击上传<button> -->
              <button @click="monidjVideo" style="background-color: #40a1e2;color: #fff;padding: 5px;margin-left: 10px;">点击上传</button>
            </p>
          </div>
      </div>
      <div style="display: flex;justify-content: space-around;width: 100%;height: 101px;">
         <div style="width:90%;text-align: center;position: relative;">
           <div>
             <video :src="VideosaveSrc" id="portraitVideo" controls="controls"  style="width:100%;height:15vh;position: absolute;left: 0;"></video>
           </div>
           <input type="file" id="saveVideo" accept="video/avi,video/mp4,video/flv,video/3gp,video/swf" capture="camcorder"  style="display: none;">
          </div>     
      </div>
       <div style="width: 90%;margin: 0 auto; padding: 15px 0;">
         <p style="line-height: 17px;color: #40a1e2;">视频要求</p>
         <p style="line-height: 17px;">1.手持身份证正面，进行视频录制，保持录制过程中声音和影像都清晰</p>
         <p style="line-height: 17px;">2.视频通读范本:本人（姓名），身份证号(身份证号码),我的资金来源合法可靠，自愿交易比特币等数字资产，本人
           充分了解数字货币及潜在风险，本人具有抗风险的能力并自愿承担一切风险。
         </p>
      </div> 
      <div class="complate" @click="goComlte">
            完成
        </div>
    </div>
  </div>
</template>

<script>
import Header from "../../../components/Header";
import { Toast } from "mint-ui";
export default {
  name: "sjrzDetail",
  data() {
    return {
       title:'实名认证',
       sjRzStaue:false,
       selectDatafor:{
         access_token:'fJmsZgoBIfdMvmiAc3AwfhS2-Y7GScc9_1563504284',
         image:'',
        //  describe:'',
         video:''
       },
       
       imageSaveZm:"",//二维码图片路径
       VideosaveSrc:""//视频路径
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
      this.selectDatafor.access_token = localStorage.getItem('access_token')
      this.sjRzStaue = this.$route.params.sjRzStaue   //获取路由的个人认证状态
    },
    //二维码点击
    monidianjiZm(){
        document.getElementById('saveImageZm').click()
    },
    monidjVideo(){
        document.getElementById('saveVideo').click()
    },
    yulan(){
        var $this = this
        document.getElementById('saveImageZm').onchange = function () {
            
            var imgFile = this.files[0];
            $this.gouploadImage(imgFile)
            var fr = new FileReader();
            fr.onload = function () {
                document.getElementById('portraitZm').src = fr.result;
            };
            fr.readAsDataURL(imgFile);
        }
        document.getElementById('saveVideo').onchange = function () {
            
            var videoFile = this.files[0];
            $this.gouploadVideo(videoFile)
            var fr = new FileReader();
            fr.onload = function () {
                document.getElementById('portraitVideo').src = fr.result;
            };
            fr.readAsDataURL(videoFile);
        }
    },
    // 上传图片
    gouploadImage(file,staus){
      var $this = this
      var dataTwo = new FormData();
      dataTwo.append("access_token", 'i1ixbSYx0-R-3yCF9gTTBGhIXz8q0AuV_1564050548');
      dataTwo.append("image", file);
      $.ajax({
          url: "http://btbfire.com/api/merchants/image",
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
            if(list.data){
              $this.selectDatafor.image = list.data.urlPath   //存储从服务器获取的图片地址
            }else{
              $this.$toast({
                message: list.message,
                position: "bottom",
                duration: 2000
              });
            }
              
          },
          error: function() {}
      });

    },
    // 上传视频
    gouploadVideo(file,staus){
      var $this = this
      var dataTwo = new FormData();
      dataTwo.append("params", 'access_token=fJmsZgoBIfdMvmiAc3AwfhS2-Y7GScc9_1563504284&os=android');
      dataTwo.append("video", file);
      $.ajax({
          url: "http://btbfire.com/api/merchants/video",
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
              $this.selectDatafor.video = list.data   //存储从服务器获取的视频地址
          },
          error: function() {}
      });

    },
    // 完成并进行商家认证
    goComlte(){
      
      var _this =this;
      console.log("_this.selectDatafor",_this.selectDatafor)
      this.$axios
      .post("api/merchants/merchants", _this.selectDatafor)
      .then(res => {
        if(res.data.code == '200'){
            // 检验成功 设置登录状态并且跳转到/
            console.log('chengg',res)
            $this.$toast({
                message: '提交成功',
                position: "bottom",
                duration: 2000
              });
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
    onFileChange: function (e) {
        var files = e.target.files || e.dataTransfer.files;
        if (!files.length) return;
        //视频上传
        if(this.typeName == '视频'){
        let _this = this;

        //视频预览
        var reader = new FileReader();
        this.file = files[0];
        reader.onload = function () {
            _this.$refs.video.src = this.result;
        };
        reader.readAsDataURL(this.file);
        }
      }
  },
  components: {
      Header
  }
};
</script>

<style scoped>
.sjrzDetail {
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


</style>
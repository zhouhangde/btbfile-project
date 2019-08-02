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
         access_token:'i1ixbSYx0-R-3yCF9gTTBGhIXz8q0AuV_1564050548',
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
      dataTwo.append("access_token", 'i1ixbSYx0-R-3yCF9gTTBGhIXz8q0AuV_1564050548');
      dataTwo.append("image", file);
      $.ajax({
          url: "http://btbfire.com/api/certification/upload-image",
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


</style>
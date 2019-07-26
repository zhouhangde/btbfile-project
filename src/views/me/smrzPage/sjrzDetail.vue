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
      <div style="padding: 10px 30px 20px;background-color: #fff;">
         <div class="theItem">
            <p>
              <input type="text" placeholder="请输入描述" v-model="selectDatafor.describe"/>  
            </p>
          </div>
      </div>
      <div>
          <div class="theTitle">
            <p style="padding-left: 30px;">
              请上传商家的支付宝账号二维码
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

      <div>
          <div class="theTitle">
            <p style="padding-left: 30px;">
              请上传商家的视频介绍 
              <!-- <button @click="monidjVideo">点击上传<button> -->
              <button @click="monidjVideo" style="background-color: #40a1e2;color: #fff;padding: 5px;margin-left: 10px;">点击上传</button>
            </p>
          </div>
      </div>
      <div style="display: flex;justify-content: space-around;">
         <div style="width:90%;text-align: center;position: relative;">
           <div>
             <video :src="VideosaveSrc" id="portraitVideo" controls="controls"  style="width:100%;height:15vh;position: absolute;left: 0;"></video>
           </div>
           <input type="file" id="saveVideo" accept="video/avi,video/mp4,video/flv,video/3gp,video/swf" capture="camcorder" @change="onFileChange" style="display: none;">
          </div>     
      </div>

      <div class="complate" @click="goGrRz">
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
         access_token:'',
         image:'',
         describe:'',
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
    goGrRz(){
      var _this =this;
      this.$axios
      .post("api/merchants/merchants", _this.selectDatafor)
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
    //二维码点击
    monidianjiZm(){
        document.getElementById('saveImageZm').click()
    },
    monidjVideo(){
        document.getElementById('saveVideo').click()
    },
    yulan(){
        document.getElementById('saveImageZm').onchange = function () {
            
            var imgFile = this.files[0];
            var fr = new FileReader();
            fr.onload = function () {
                document.getElementById('portraitZm').src = fr.result;
            };
            fr.readAsDataURL(imgFile);
        }
        // document.getElementById('saveVideo').onchange = function () {
            
        //     var imgFile = this.files[0];
        //     var fr = new FileReader();
        //     fr.onload = function () {
        //         document.getElementById('portraitVideo').src = fr.result;
        //     };
        //     fr.readAsDataURL(imgFile);
        // }
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
      },
      //提交视频
      complete(){

          let _this = this;

          if(this.typeName == '视频'){

                let data = new FormData();
                data.append('file',this.file);
                data.append('arr_name',this.file.name);

                 //进度百分比
                  var config = {
                    onUploadProgress: progressEvent => {
                        var complete = (progressEvent.loaded / progressEvent.total * 100 | 0)
                        this.videoProgress = complete/100
                        console.log(this.videoProgress)
                    }
                  }
              //    axios.post(_this.Api+'Material_management/image/'+_this.material_id+'/1',data,config).then( res => {
              //       _this.$dialog.toast({
              //                 mes: res.data.tips,
              //                 timeout: 1000,
              //                 icon: 'success'
              //             });
              //     _this.$router.push('/source');
              //     }).catch(function(error){
              //        _this.$dialog.toast({
              //                     mes: error.response.data.tips,
              //                     timeout: 1000,
              //                     icon: 'error'
              //                 });
              //     })

            }

      },
     //上传图片
		 imageSubmit(){
        let _this=this
        let x = document.getElementById('saveImage').files[0];
        let params = new FormData() ; //创建一个form对象
        params.append('file',x,x.name);  //append 向form表单添加数据
       //添加请求头  通过form添加的图片和文件的格式必须是multipart/form-data
        let config = {headers:{'Content-Type':'multipart/form-data'}};

        //发起ajax请求存放在服务端
        this.$axios.post('api/merchants/image',params,config)
        .then(function(res){
          console.log('res',res)
              // _this.imageSave = res.data.lujing;
              // let mydate=new Date()
              // _this.uploadDate="上传时间："+mydate.toLocaleString()
              // Toast({
              //       message: res.data.message,
              //       position: "bottom",
              //       duration: 2000
              // })
          }).catch(function (error) {
                Toast({
                  message: '网络错误',
                  position: "bottom",
                  duration: 2000
                });
                return;
          })
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
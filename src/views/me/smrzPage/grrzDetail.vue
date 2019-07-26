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
  name: "smrzDetail",
  data() {
    return {
       title:'实名认证',
       grRzStaue:false,
       selectDatafor:{
         access_token:'',
         real_name:'',
         id_number:'',
         id_card_img:'',
         id_card_img2:''
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
      this.selectDatafor.access_token = localStorage.getItem('access_token')
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
        document.getElementById('saveImageZm').onchange = function () {
            
            var imgFile = this.files[0];
            var fr = new FileReader();
            fr.onload = function () {
                document.getElementById('portraitZm').src = fr.result;
            };
            fr.readAsDataURL(imgFile);
        }
        document.getElementById('saveImageFm').onchange = function () {
            var imgFile = this.files[0];
            var fr = new FileReader();
            fr.onload = function () {
                document.getElementById('portraitFm').src = fr.result;
            };
            fr.readAsDataURL(imgFile);
        }
    },
    //上传
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
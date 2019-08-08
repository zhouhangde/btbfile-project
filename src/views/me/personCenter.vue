<template>
  <div class="personCenter">
      <Header :isLeft="true" :title="title"/>
      <div class="address-cell"  @click="showactionSheet">
        <div class="address-index">
          <span>头像</span>
          <span style="display: flex;align-items: center;">
             <!-- <img src="../../assets/image/myphoto.png" style="width: 30px;border-radius: 100%;"/> -->
             <img :src="userInfo.head_portrait" style="width: 30px;border-radius: 100%;"/>
             <i class="fa fa-angle-right" style="margin-left: 2.1vw"></i>
          </span>
        </div>
      </div>
      <div class="address-cell"  @click="$router.push({name:'myNiChen'})">
        <div class="address-index">
          <span>昵称</span>
          <span style="display: flex;align-items: center;">
             <span style="font-size: 13px;">{{userInfo.nickname}}</span>
             <i class="fa fa-angle-right" style="margin-left: 2.1vw"></i>
          </span>
        </div>
      </div>
      <div class="address-cell">
        <div class="address-index">
          <span>手机号</span>
          <span style="display: flex;align-items: center;">
             <span style="font-size: 13px;">{{userInfo.mobile_phone}}</span>
          </span>
        </div>
      </div>
      <!-- 直接打开相机 -->
      <input type="file" accept="image/*" capture="camera" id="openCamera" style="display:none"/>  
      <!-- 从相册中选择 -->
      <input type="file" accept="image/*" multiple  id="fromXc" style="display:none"/>  
      <mt-actionsheet
        :actions="actions"
        v-model="sheetVisible">
        </mt-actionsheet>
  </div>
</template>

<script>
import Header from "../../components/Header";
import { Actionsheet,Popup,Toast } from 'mint-ui';
import $ from 'jquery'
export default {
  name: "personCenter",
  data() {
    return {
        title:'个人中心',
        // 底部的弹出
        actions:[{
        // icon: 'icon-article', // 引入iconfont的类名作为展示的icon
        name: '打开相机', // 引入文字作为标题
        method : this.openCamera
        },{
        // icon: 'icon-article', // 引入iconfont的类名作为展示的icon
        name: '从手机相册选择', // 引入文字作为标题
        method : this.openFromXc
       }],
       userInfo:"",
       sheetVisible:false, //上拉的sheet显示开关
       imgsrc:'',
       accessToken:''
    };
  },
  beforeRouteEnter(to, from, next) {
    next(vm => vm.getData());
  },
  mounted(){
      this.choose();//监听图片的选择
  },
  methods: {
    // 获取用户信息
    getData() {
      let access_token = localStorage.getItem('access_token')
      this.accessToken = access_token

      this.nickname =  this.$route.params.nickname
      this.image =  this.$route.params.image
      this.phone =  this.$route.params.phone
      this.getUserInfo()
    },
    showactionSheet(){
    	// 打开action sheet
      this.sheetVisible = true;
    },
    getUserInfo(){

      var $this = this
      this.$axios
        .post("/api/member/info", {
          access_token: $this.accessToken
        })
        .then(res => {
          if(res.data.code == '200'){
              // 检验成功 设置登录状态并且跳转到/
               $this.userInfo = res.data.data
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
    },
    // 直接打开相机
    openCamera(){
      // let obj=document.createElement("input");
      // obj.type="file";
      // obj.accept="image/*";
      // obj.capture="camera";
      // obj.onchange="onchange";
      // obj.click()
       document.getElementById('openCamera').click()
    },
    // 从相册中选择
    openFromXc(){
       document.getElementById('fromXc').click()
    },
    choose(){
        var $this = this;
        document.getElementById('fromXc').onchange = function (e) {
            //获取 文件 个数 取消的时候使用
            var files = e.target.files;
             if (files.length > 0) {
                  let twitter = files[0];
                  $this.updateImg(twitter);
            }
            let imgFile = this.files[0];
            var fr = new FileReader();
            fr.onload = function () {
                 $this.userInfo.head_portrait =  fr.result;
                 document.getElementById('showSrc').src = fr.result;
            };
            fr.readAsDataURL(imgFile);
            
        }
        document.getElementById('openCamera').onchange = function (e) {
            //获取 文件 个数 取消的时候使用
            var files = e.target.files;
             if (files.length > 0) {
                  // 获取文件名 并显示文件名
                  // twitter = files[0].name;
                  let twitter = files[0];
                  $this.updateImg(twitter);
              }

            let imgFile = this.files[0];
            var fr = new FileReader();
            fr.onload = function () {
                $this.userInfo.head_portrait =  fr.result;
                document.getElementById('showSrc').src = fr.result;
            };
            fr.readAsDataURL(imgFile);
        }
    },
    updateImg(file){
       var $this = this
      var dataTwo = new FormData();
      dataTwo.append("head_portrait", file);
      dataTwo.append("access_token", $this.accessToken);
      dataTwo.append("nickname", $this.userInfo.nickname);
      $.ajax({
          url: "http://91bilong.com/api/member/info-update",
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
                message: '修改成功',
                position: "bottom",
                duration: 2000
              });
          },
          error: function() {}
      });
    },
    goupload(file){
      var $this = this
      var dataTwo = new FormData();
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
              $this.imgsrc = list.data.urlPath   //存储从服务器获取的图片地址
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
.personCenter {
  width: 100%;
  height: 100%;
  overflow: auto;
  box-sizing: border-box;
}
.address-cell {
  border-bottom: 1px solid #ddd;
  font-size: 1rem;
  line-height: 4.533333vw;
  background: #ffffff;
  display: flex;
  align-items: center;
  padding-left: 2.666667vw;
  color: #333;
}
.address-cell > i {
  font-size: 1.3rem;
  color: rgb(74, 165, 240);
  margin-right: 2.666667vw;
}
.address-index {
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding: 3.733333vw 2.666667vw 3.733333vw 0;
  align-content: center;
  align-items: center;
}
.address-index > i {
  font-size: 1.3rem;
  color: #ccc;
}
</style>
<template>
  <div class="wxMethod">
    <Header :isLeft="true" :title="title"/>
    <div style="padding: 1vw 5vw;">
      <input type="text" placeholder="请输入微信账号" v-model="zfbDetailData.account"/>
    </div>
    <div>
      <!-- 从相册中选择 -->
      <input type="file" accept="image/*" multiple  id="fromXc" style="display:none"/>  
      <p style="text-align: center;margin-top: 22vh;">请上传微信照片</p>
      <div style="text-align: center;margin-top: 5vh;" @click="selectPhoto"> 
        <img  style="width:50vw;height:auto" :src="zfbDetailData.qrcode"/>
      </div>
    </div>
    <div class="wx_button">
      <button class="the_delete" @click="deleteFk">删除</button>
      <button class="the_complte" @click="goComplte">完成</button>
    </div>
  </div>
</template>

<script>
import Header from "../../../components/Header";
export default {
  name: "wxMethod",
  data() {
    return {
      title:'修改收款方式',
      selectInfo:{
        access_token:'',
        id:''
      },
      zfbDetailData:{
        account:'',
        qrcode: ''
      },
      currentFile:'',   //当前的文件
      accessToken:''
    };
  },
  beforeRouteEnter(to, from, next) {
    next(vm => vm.getData());
  },
  beforeRouteLeave(to, from, next) {
    // 离开页面关闭定时器
    this.currentFile = ''
    next()
  },
  mounted(){
      this.choose();//监听图片的选择
  },
  methods: {
    // 获取用户信息
    getData() {
      let access_token = localStorage.getItem('access_token')
      this.selectInfo.access_token = access_token

      console.log('this.$route.params.id',this.$route.params.id)
      if(this.$route.params.id){
       this.selectInfo.id = this.$route.params.id
      }
      this.geiDetail()
    },
    geiDetail(){
      var $this = this
        this.$axios
        .post("/api/gathering/get-one", $this.selectInfo)
        .then(res => {
          if(res.data.code == '200'){
              // 检验成功 设置登录状态并且跳转到/
               console.log('res',res)
               $this.zfbDetailData = res.data.data

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
    selectPhoto(){
      document.getElementById('fromXc').click()
    },
    choose(){
        var $this = this;
        document.getElementById('fromXc').onchange = function (e) {
            //获取 文件 个数 取消的时候使用
            var files = e.target.files;
             if (files.length > 0) {
                  let twitter = files[0];
                  // $this.updateImg(twitter);
                  $this.currentFile = twitter
            }
            let imgFile = this.files[0];
            var fr = new FileReader();
            fr.onload = function () {
                //  document.getElementById('showSrc').src = fr.result;
                $this.zfbDetailData.qrcode = fr.result
            };
            fr.readAsDataURL(imgFile);
            
        }
    },
    goComplte(){
      
       var $this = this
       if($this.currentFile.length<1){
        $this.$toast({
            message: '请上传图片',
            position: "bottom",
            duration: 2000
          });
          return
      }
      var dataTwo = new FormData();
      dataTwo.append("id", '415');
      dataTwo.append("access_token", $this.selectInfo.access_token);
      dataTwo.append("qrcode", $this.currentFile);
      dataTwo.append("proceeds_type", 'wxpay');
      dataTwo.append("account", '15527944464');
      $.ajax({
          url: "http://91bilong.com/api/gathering/up-proceed",
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
                message: list.message,
                position: "bottom",
                duration: 1000
              });
          },
          error: function() {}
      });
    },
    deleteFk(){
      var $this = this
      this.$axios
        .post("/api/gathering/del-proceed", {
          access_token: $this.selectInfo.access_token,
          id:$this.selectInfo.id
        })
        .then(res => {
          if(res.data.code == '200'){
              // 检验成功 设置登录状态并且跳转到/
               $this.$toast({
                message: res.data.message,
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
.wxMethod {
  width: 100%;
  height: 100%;
  overflow: auto;
  box-sizing: border-box;
}
.wx_button{
    text-align: center;
    height: 8vw;
    line-height: 8vw;
    position: absolute;
    bottom: 0;
    width: 100%;
    background-color: #bbc5e8;
}

.the_delete{
    width: 50%;
    background-color: #bf2c2c;
    padding: 7px 0;
    color: #fff;

}
.the_complte{
    width: 50%;
    background-color: #30ab32;
    padding: 7px 0;
    color: #fff;
 }   


    
</style>
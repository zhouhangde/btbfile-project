<template>
  <div class="me">
    <p class="showIcon">
      <span @click="$router.push({name:'myMessage'})"><i class="fa fa-bell-o" style="font-size: 23px;"></i></span>
    </p>
    <!-- <div class="headInfo">
      <div class="head-img" @click="$router.push({name:'personCenter'})"></div>
      <div class="head-profile">
        <p class="user-id">Q7E2n2NX</p>
        <p class="user-phone">
          <span>UID:</span>1218969
        </p>
      </div>
    </div> -->
    <div class="headInfo">
      <!-- <div class="head-img" ></div> -->
      <img :src="userInfo.head_portrait" style="width: 48px;height:48px;border-radius: 100%;"
      @click="goCenter"/>
      <div class="head-profile">
        <p class="user-id">{{userInfo.nickname}}</p>
        <p class="user-phone">
          <span>UID:</span>{{userInfo.id}}
        </p>
      </div>
    </div>
    <div>
      <div class="address-cell"  @click="$router.push({name:'smrz'})">
        <i class="fa fa-user-circle"></i>
        <div class="address-index">
          <span>实名认证</span>
          <i class="fa fa-angle-right"></i>
        </div>
      </div>
      <!-- <div class="address-cell" @click="$router.push({name:'tbdz'})">
        <i class="fa fa-map-marker"></i>
        <div class="address-index">
          <span>提币地址</span>
          <i class="fa fa-angle-right"></i>
        </div>
      </div> -->
      <div class="address-cell" @click="$router.push({name:'skfs'})">
        <i class="fa fa-jpy"></i>
        <div class="address-index">
          <span>收款方式</span>
          <i class="fa fa-angle-right"></i>
        </div>
      </div>
      <div class="address-cell" @click="$router.push({name:'aqzx'})">
        <i class="fa fa-shield"></i>
        <div class="address-index">
          <span>安全中心</span>
          <i class="fa fa-angle-right"></i>
        </div>
      </div>
      <div class="address-cell" @click="$router.push({name:'mytj'})">
        <i class="fa fa-bookmark-o"></i>
        <div class="address-index">
          <span>我的推荐</span>
          <i class="fa fa-angle-right"></i>
        </div>
      </div>
      <div class="address-cell" style="margin-top: 2.666667vw; border-top: 1px solid #ddd;" @click="$router.push({name:'otcJi'})">
        <i class="fa fa-yen (alias)"></i>
        <div class="address-index">
          <span>OTC交易平台</span>
          <i class="fa fa-angle-right"></i>
        </div>
      </div>
      <div class="address-cell"  @click="$router.push({name:'myzc'})">
        <i class="fa fa-dollar (alias)"></i>
        <div class="address-index">
          <span>我的资产</span>
          <i class="fa fa-angle-right"></i>
        </div>
      </div>
      <!-- <div class="address-cell" @click="$router.push({name:'zzmx'})">
        <i class="fa fa-file"></i>
        <div class="address-index">
          <span>转账明细</span>
          <i class="fa fa-angle-right"></i>
        </div>
      </div> -->
      <div class="address-cell" style="margin-top: 2.666667vw; border-top: 1px solid #ddd;" @click="$router.push({name:'setting'})">
        <i class="fa fa-cog"></i>
        <div class="address-index">
          <span>设置</span>
          <i class="fa fa-angle-right"></i>
        </div>
      </div>
      <div class="address-cell" @click="$router.push({name:'aboutMe'})">
        <i class="fa fa-heart-o"></i>
        <div class="address-index">
          <span>关于我们</span>
          <i class="fa fa-angle-right"></i>
        </div>
      </div>
    </div>
  </div>

  <!-- <table border="0" cellspacing="0" cellpadding="0" class="thetable">
              <thead>
                <tr>
                  <th>项目名称</th>
                  <th>收益方式</th>
                  <th>年收益率</th>
                  <th>存币周期（天）</th>
                  <th>存币数量</th>
                  <th>到期收益</th>
                  <th>计息时间/解锁时间</th>
                  <th>操作时间</th>
                  <th>状态</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>项目名称</td>
                  <td>收益方式</td>
                  <th>100%</th>
                  <th>5</th>
                  <th>99</th>
                  <th>到期收益</th>
                  <th>11/11</th>
                  <th>99</th>
                  <th>状态</th>
                </tr>
                <tr>
                  <td>项目名称</td>
                  <td>收益方式</td>
                  <th>100%</th>
                  <th>5</th>
                  <th>99</th>
                  <th>到期收益</th>
                  <th>11/11</th>
                  <th>99</th>
                  <th>状态</th>
                </tr>
              </tbody>
            </table> -->
</template>

<script>
export default {
  name: "me",
  data() {
    return {
      userInfo: "",
      accessToken:''
    };
  },
  beforeRouteEnter(to, from, next) {
    next(vm => vm.getData());
  },
  methods: {
    handleLogin() {
      this.$router.push("/login");
    },
    // 获取用户信息
    getData() {
      let access_token = localStorage.getItem('access_token')
      this.accessToken = access_token
      if(access_token != '' && access_token != undefined && access_token != null){
         this.getUserInfo()   //获取用户个人信息
      }else{
        this.$toast({
          message: '暂未登录，无法获取用户信息',
          position: "bottom",
          duration: 1000
        });
      }
      
    },
    goCenter(){
       var $this = this
       if($this.accessToken == '' || $this.accessToken == undefined || $this.accessToken == null){
          $this.$toast({
            message: '暂未登录，无法查看用户信息',
            position: "bottom",
            duration: 1000
            });
          return; 
       }
         $this.$router.push({name:'personCenter'});
    },
    getUserInfo(){
      var $this = this
      this.$axios
        .post("/api/member/info", {
          access_token:$this.accessToken,
          os:'android'
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
    }
  }
};

// http.post('', {}, function(res) {
//           var thehtml = ''
//           res.data && $.each(res.data, function(index, r) {
              
//           });
//           $(".zh_parent").append(thehtml)
//   })
</script>

<style scoped>
.me {
  width: 100%;
  height: 100%;
  overflow: auto;
  box-sizing: border-box;
}
.headInfo {
  display: flex;
  background-image: linear-gradient(90deg, #0af, #0085ff);
  padding: 6.666667vw 4vw;
  color: #fff;
  align-items: center;
}
.head-img {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background-position: 0px 0px;
  background-size: 60px;
  background-image: url(https://shadow.elemecdn.com/faas/h5/static/sprite.3ffb5d8.png);
}
.head-profile {
  overflow: hidden;
  margin-left: 4.8vw;
  flex-grow: 1;
}
.head-profile .user-id {
  max-width: 40vw;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  font-size: 1.3rem;
  margin-bottom: 2.133333vw;
  font-weight: 700;
  display: flex;
  align-items: center;
}
.head-profile .user-phone {
  display: flex;
  align-items: center;
  font-size: 0.8rem;
}
.user-phone > i {
  margin-right: 0.666667vw;
  font-size: 1rem;
}
.headInfo > i {
  font-size: 1.2rem;
}

.address-cell {
  border-bottom: 1px solid #ddd;
  font-size: 1rem;
  line-height: 4.533333vw;
  background: #ffffff;
  display: flex;
  align-items: center;
  padding-left: 6.666667vw;
  color: #333;
}
.address-cell > i {
  font-size: 1.3rem;
  color: rgb(141, 141, 141);
  margin-right: 2.666667vw;
}
.address-index {
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding: 3.733333vw 2.666667vw 3.733333vw 0;
  align-content: center;
}
.address-index > i {
  font-size: 1.3rem;
  color: #ccc;
}
.address-index span{
  font-size: 14px;
  color:#000;
}
.showIcon{
  padding: 11px 8px;
  text-align: right;
    /* background-color: #4f9afe; */
  background-image: -webkit-gradient(linear, left top, right top, from(#0af), to(#0085ff));
}

</style>
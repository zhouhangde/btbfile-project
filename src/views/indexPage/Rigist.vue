<template>
  <div class="Rigist">
    <div class="Rigist-container">
      <li class="Rigist-logo" style="text-align:center;height:60px;">照片位置</li>
       
       <form action="javascript">
         <div class="input-group">
           <span><i class="fa fa-cny (alias)"></i></span>
           <input id="phoneNum" class="form-control" placeholder="请输入手机号码" type="text" maxlength="11">
         </div>
         <div class="input-group">
           <span><i class="fa fa-cny (alias)"></i></span>
           <input id="password" class="form-control" placeholder="请输入密码" type="password" maxlength="20">
         </div>
         <div class="input-group">
           <span><i class="fa fa-cny (alias)"></i></span>
           <input id="passwordConfirm" class="form-control" placeholder="请再次输入密码" type="password" maxlength="20">
         </div>
         <div class="input-group">
           <span><i class="fa fa-cny (alias)"></i></span>
           <input id="idcocd-btn" class="form-control" placeholder="请输入验证码" type="text" maxlength="11">
         </div>
         <div class="input-group">
           <span><i class="fa fa-cny (alias)"></i></span>
           <input id="userphone" class="form-control" placeholder="请输入邀请码" type="text" maxlength="11">
         </div>

         <button>注册</button>

         <p style=color:#ccc;>注册即表示同意啊<a href="javascript" style="color:#3b85f5;">《BTBFire用户协议》</a></p>
       </form>



       <li style="text-align:center;">邮箱注册</li>

    </div>
  </div>
</template>

<script>
export default {
  name: "Rigist",
  data() {
    return {
    };
  },
  beforeRouteEnter(to, from, next) {
    next(vm => vm.getData());
  },
  methods: {
    // 获取用户信息
    getData() {
      
    }
  },
  components: {
     
  }
};
</script>

<style scoped>
.Rigist {
  width: 100%;
  height: 100%;
  overflow: auto;
  box-sizing: border-box;
}
.Rigist-container{
  width:90%;
  background-color: pink;
  margin: 30% auto;
}
li{
  list-style: none;
}
.input-group{
  height:45px;
  border-bottom: 1px solid #ccc;
}
.input-group i{
  color:#999;
  padding-left: 10px;
}
.input-group input{
  padding-left: 30px;
  line-height: 65px;
}
</style>
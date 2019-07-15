<template>
  <div class="emailRigst">
    <Header :isleftHome="true"/>
    <div style="padding: 30px;">
      <div style="text-align:center"> 
        <img src="" style="width:60px;height:30px"/>
      </div>
      <div class="theItem">
        <p>
          <i class="fa fa-user"></i>
          <input type="text" placeholder="请输入邮箱" class="theinput"/>  
        </p>
      </div>
      <div class="theItem">
        <p>
          <i class="fa fa-lock"></i>
          <input type="text" placeholder="请输入密码"  class="theinput"/>
        </p>
        <i class="fa fa-eye-slash" style="color:#999;"></i>
      </div>
      <div class="theItem"> 
        <p>
          <i class="fa fa-lock"></i>
          <input type="text" placeholder="请再次输入密码"  class="theinput"/>
        </p>
        <i class="fa fa-eye-slash" style="color:#999;"></i>
      </div>
      <div class="theItem">
        <p>
          <i class="fa fa-get-pocket"></i>
          <input type="text" placeholder="请输入验证码"  class="theinput"/>
        </p>
        <i class="fa fa-eye-slash" style="color:#999;"></i>
      </div>
      <div class="theItem">
        <p>
          <i class="fa fa-edit (alias)"></i>
          <input type="text" placeholder="请输入邀请码"  class="theinput"/>
        </p>
      </div>
      <div class="theRigst">
        注册
      </div>
      <div style="text-align: center;"> 
        注册即表示同意<span style="color:blue">BTBFile用户协议</span>
      </div>
      <div style="text-align: center;margin-top:40px;color:#999;" @click="$router.push({name:'phoneRigst'})"> 
        手机号注册
      </div>
    </div>
  </div>
</template>

<script>
import Header from "../../components/Header";
export default {
  name: "emailRigst",
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
     Header
  }
};
</script>

<style scoped>
.emailRigst {
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
.theItem p{
  color:#999;
}
.theinput{
  margin-left: 10px
}
.theRigst{
  text-align: center;
  height: 15px;
  line-height: 15px;
  background-color: #5b92b7;
  padding: 10px;
  border-radius: 20px;
  color: #fff;
  margin: 14px 0;
}
    
</style>
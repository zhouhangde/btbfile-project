<template>
  <div class="emailForget">
    <Header :isLeft="true" :title="title"/>
    <div style="padding: 30px;">
      <div class="theItem">
        <p>
          <input type="text" placeholder="请输入邮箱" class="theinput"/>  
        </p>
        <span style="color: #0c88dc;">获取验证码</span>
      </div>
      <div class="theItem">
        <p>
          <input type="text" placeholder="请输入验证码"  class="theinput"/>
        </p>
        <!-- <i class="fa fa-wechat (alias)"></i> -->
      </div>
      <div class="theItem"> 
        <p>
          <input type="text" placeholder="请输入新的密码"  class="theinput"/>
        </p>
        <i class="fa fa-eye-slash"></i>
      </div>
      <div class="theItem"> 
        <p>
          <input type="text" placeholder="请再次输入密码"  class="theinput"/>
        </p>
        <i class="fa fa-eye-slash"></i>
      </div>
      <div class="theItemMsg"> 
        <p style="color: #b9b0b0;">
          如果长期未收到验证码，请查看邮箱垃圾箱内。
        </p>
      </div>
      <div style="text-align: center;margin-top:40px" class="theComplate"> 
        完成
      </div>
    </div>
  </div>
</template>

<script>
import Header from "../../components/Header";
export default {
  name: "emailForget",
  data() {
    return {
      title:"忘记密码"
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
.emailForget {
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
.theItem i{
  color:#999;
}
.theItemMsg{
  display: flex;
  justify-content: space-between;
  padding: 15px 10px;
}
.theinput{
  margin-left: 10px
}
.theComplate{
  text-align: center;
  height: 15px;
  line-height: 15px;
  background-color: #5b92b7;
  padding: 10px;
  color: #fff;
  margin-top: 40px;
  position: absolute;
  bottom: 0;
  width: 100%;
  left: 0;
}
    
</style>
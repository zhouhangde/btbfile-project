<template>
  <div class="googleYz">
    <Header :isLeft="true" :title="title"/>
    <div class="openNow">
       <button>立即开启</button>
    </div>
    <p class="showTs">谷歌两步验证可以为您的账户增加一层保护，当您登陆或者进行交易时，在输入密码的同时，还需要来自两步验证的验证码</p>
    <p style="color:blue" class="lbyz">如何使用谷歌两步验证?</p>
  </div>
</template>

<script>
import Header from "../../../components/Header";
export default {
  name: "googleYz",
  data() {
    return {
      title:'谷歌验证'
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
.googleYz {
  width: 100%;
  height: 100%;
  overflow: auto;
  box-sizing: border-box;
}
.openNow{
  width: 54%;
  margin: 16px auto;
  text-align: center;
  padding: 8px;
  background-color: #55b7da;
}
.showTs{
  width: 76%;
  margin: 0 auto;
  line-height: 19px;
} 
.lbyz{
  color: blue;
  width: 76%;
  margin: 5vh auto;
}   
    
</style>
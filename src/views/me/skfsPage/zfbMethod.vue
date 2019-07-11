<template>
  <div class="zfbMethod">
    <Header :isLeft="true" :title="title"/>
    <div style="padding: 1vw 5vw;">
      <input type="text" placeholder="请输入支付宝账号"/>
    </div>
    <div>
      <p style="text-align: center;margin-top: 22vh;">请上传支付宝照片</p>
      <div style="text-align: center;margin-top: 5vh;">
        <img  style="width:30vw;height:30vw" />
      </div>
    </div>
    <div class="zfb_button">
      <button class="the_delete">删除</button>
      <button class="the_complte">完成</button>
    </div>
  </div>
</template>

<script>
import Header from "../../../components/Header";
export default {
  name: "zfbMethod",
  data() {
    return {
      title:'修改收款方式',
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
.zfbMethod {
  width: 100%;
  height: 100%;
  overflow: auto;
  box-sizing: border-box;
}
.zfb_button{
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
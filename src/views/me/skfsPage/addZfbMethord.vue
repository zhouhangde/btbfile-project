<template>
  <div class="addZfbMethord">
    <Header :isLeft="true" :title="title"/>
    <div style="background-color: #fff;padding: 15px;">
      <input type="text" placeholder="请输入支付宝账号"/>
    </div>
    <div style="padding: 11px 15px;">
      请上传支付宝收款码照片
    </div>
    <div style="padding:15px;">
      <img src="" style="width: 41vw; height: 33vh;"/>
    </div>
    <div class="complate">
        完成
    </div>
  </div>
</template>

<script>
import Header from "../../../components/Header";
export default {
  name: "addZfbMethord",
  data() {
    return {
      title:'新增收款信息(支付宝)',
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
.addZfbMethord {
  width: 100%;
  height: 100%;
  overflow: auto;
  box-sizing: border-box;
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
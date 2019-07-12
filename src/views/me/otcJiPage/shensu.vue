<template>
  <div class="shensu">
      <Header :isLeft="true" :title="title"/>
      <div style="background-color:#fff;margin:15px 0;height: 44px;" class="thepenson">
          <input type="text" placeholder="申诉原因"/>
      </div>
      <p style="background-color:#fff;margin:10px 15px;">
          申诉图片
      </p>
      <div class="addImg">
          <img style="width:20vw;height:20vw"/>
      </div>
      <div class="shensu-foot">
          完成
      </div>
  </div>
</template>

<script>
import Header from "../../../components/Header";
export default {
  name: "shensu",
  data() {
    return {
        title:'申诉'
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
.shensu {
  width: 100%;
  height: 100%;
  overflow: auto;
  box-sizing: border-box;
}
.shensu-foot{
        width: 100%;
    height: 35px;
    line-height: 35px;
    color: #fff;
    position: absolute;
    bottom: 0;
    background-color: #2998ca;
    text-align: center;

}
.thepenson{
    background-color: rgb(255, 255, 255);
    margin: 15px 0px 0 0px;
    padding: 8px 15px;
}
.addImg{
  padding: 60px 15px;
    height: 60%;
    background-color: #fff;

}

    
</style>
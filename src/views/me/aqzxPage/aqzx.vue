<template>
  <div class="aqzx">
    <Header :isLeft="true" :title="title"/>
    <div style="margin-top: 5px;"> 
       <div class="the-cell"  @click="$router.push({name:'updatePw'})">
         <div class="the-index">
          <span>修改密码</span>
          <span>
             <i class="fa fa-angle-right" style="margin-left: 2.1vw"></i>
          </span>
        </div>
       </div>
       <!-- <div class="the-cell"  @click="$router.push({name:'googleYz'})">
         <div class="the-index">
          <span>谷歌验证</span>
          <span>
             <i class="fa fa-angle-right" style="margin-left: 2.1vw"></i>
          </span>
        </div>
       </div> -->

    </div>
  </div>
</template>

<script>
import Header from "../../../components/Header";
export default {
  name: "aqzx",
  data() {
    return {
       title:'设置'
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
.aqzx {
  width: 100%;
  height: 100%;
  overflow: auto;
  box-sizing: border-box;
}
.the-cell {
  border-bottom: 1px solid #ddd;
  font-size: 1rem;
  line-height: 4.533333vw;
  background: #ffffff;
  display: flex;
  align-items: center;
  padding-left: 2.666667vw;
  color: #333;
}
.the-cell > i {
  font-size: 1.3rem;
  color: rgb(74, 165, 240);
  margin-right: 2.666667vw;
}
.the-index {
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding: 3.733333vw 2.666667vw 3.733333vw 0;
  align-content: center;
}
.the-index > i {
  font-size: 1.3rem;
  color: #ccc;
}
</style>
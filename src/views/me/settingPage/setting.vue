<template>
  <div class="setting">
    <Header :title="title" :isLeft="true"/>
    <div>
      <div class="address-cell"  @click="$router.push({name:'moreLanuge'})">
        <div class="address-index">
          <span>多语言</span>
          <span>
             <i class="fa fa-angle-right" style="margin-left: 2.1vw"></i>
          </span>
        </div>
      </div>
      <div class="address-cell" @click="clearHc">
        <div class="address-index">
          <span>清理缓存</span>
          <span>
             {{hunc}}
             <i class="fa fa-angle-right" style="margin-left: 2.1vw"></i>
          </span>
        </div>
      </div>
      <div class="address-cell" @click="loginOut">
        <div class="address-index">
          <span>退出登陆</span>
          <span>
             <i class="fa fa-angle-right" style="margin-left: 2.1vw"></i>
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Header from "../../../components/Header";
export default {
  name: "setting",
  data() {
    return {
      title:'设置',
      hunc:'215.52k'
    };
  },
  beforeRouteEnter(to, from, next) {
    next(vm => vm.getData());
  },
  methods: {
    // 获取用户信息
    getData() {
      
    },
    loginOut(){
      localStorage.removeItem('access_token');
      localStorage.removeItem("login_methord");
      this.$store.dispatch("setAccessToken", null);
      this.$router.push({name:"phoneLogin"});
    },
    clearHc(){
      this.hunc = '0'
    }
  },
  components: {
     Header
  }
};
</script>

<style scoped>
.setting {
  width: 100%;
  height: 100%;
  overflow: auto;
  box-sizing: border-box;
}
.address-cell {
  border-bottom: 1px solid #ddd;
  font-size: 1rem;
  line-height: 4.533333vw;
  background: #ffffff;
  display: flex;
  align-items: center;
  padding-left: 2.666667vw;
  color: #333;
  margin: 8px 0;
}
.address-cell > i {
  font-size: 1.3rem;
  color: rgb(74, 165, 240);
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
</style>
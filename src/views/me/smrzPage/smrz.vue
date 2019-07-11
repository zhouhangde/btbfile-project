<template>
  <div class="smrz">
    <Header :isLeft="true" :title="title"/>
    <div>
      <div class="address-cell"  @click="$router.push({name:'grrzDetail'})">
        <div class="address-index">
          <span>个人认证</span>
          <span>
             已认证
             <i class="fa fa-angle-right" style="margin-left: 2.1vw"></i>
          </span>
        </div>
      </div>
      <div class="address-cell"  @click="$router.push({name:'sjrzDetail'})">
        <div class="address-index">
          <span>商家认证</span>
          <span>
             审核已通过
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
  name: "smrz",
  data() {
    return {
        title:'实名认证'
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
.smrz {
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
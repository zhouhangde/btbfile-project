<template>
  <div class="personCenter">
      <Header :isLeft="true" :title="title"/>
      <div class="address-cell"  @click="showactionSheet">
        <div class="address-index">
          <span>头像</span>
          <span style="display: flex;align-items: center;">
             <img src="../../assets/image/myphoto.png" style="width: 30px;border-radius: 100%;"/>
             <i class="fa fa-angle-right" style="margin-left: 2.1vw"></i>
          </span>
        </div>
      </div>
      <div class="address-cell"  @click="$router.push({name:'myNiChen'})">
        <div class="address-index">
          <span>昵称</span>
          <span style="display: flex;align-items: center;">
             <span style="font-size: 13px;">pu04dUGV</span>
             <i class="fa fa-angle-right" style="margin-left: 2.1vw"></i>
          </span>
        </div>
      </div>
      <div class="address-cell">
        <div class="address-index">
          <span>手机号</span>
          <span style="display: flex;align-items: center;">
             <span style="font-size: 13px;">15527944464</span>
          </span>
        </div>
      </div>
      <mt-actionsheet
        :actions="actions"
        v-model="sheetVisible">
        </mt-actionsheet>
  </div>
</template>

<script>
import Header from "../../components/Header";
import { Actionsheet,Popup } from 'mint-ui';
export default {
  name: "personCenter",
  data() {
    return {
        title:'个人中心',
        // 底部的弹出
        actions:[{
        // icon: 'icon-article', // 引入iconfont的类名作为展示的icon
        name: '打开相机', // 引入文字作为标题
        method : this.openCamera
        },{
        // icon: 'icon-article', // 引入iconfont的类名作为展示的icon
        name: '从手机相册选择', // 引入文字作为标题
        method : this.openFromXc
       }],
       sheetVisible:false //上拉的sheet显示开关
    };
  },
  beforeRouteEnter(to, from, next) {
    next(vm => vm.getData());
  },
  methods: {
    // 获取用户信息
    getData() {
      
    },
    showactionSheet(){
    	// 打开action sheet
      this.sheetVisible = true;
    }
  },
  components: {
     Header
  }
};
</script>

<style scoped>
.personCenter {
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
  align-items: center;
}
.address-index > i {
  font-size: 1.3rem;
  color: #ccc;
}
</style>
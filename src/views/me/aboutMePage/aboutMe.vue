<template>
  <div class="aboutMe">
    <Header :title="title" :isLeft="true"/>
    <div>
      <div>
        <div style="text-align: center;margin-top: 26px;">
          <img  style="width:20vw;height:20vw" src="../../../assets/image/abountLogo.png"/>
        </div>
        <p style="text-align: center;margin: 20px 0;">版本号:1.1.5</p>
      </div>
      <div class="address-cell"  @click="$router.push({name:'gsjjDetail'})">
        <div class="address-index">
          <span>公司简介</span>
          <span>
             <i class="fa fa-angle-right" style="margin-left: 2.1vw"></i>
          </span>
        </div>
      </div>
      <div class="address-cell"  @click="$router.push({name:'yhxyDetail'})">
        <div class="address-index">
          <span>用户协议</span>
          <span>
             <i class="fa fa-angle-right" style="margin-left: 2.1vw"></i>
          </span>
        </div>
      </div>
      <div class="address-cell" @click="$router.push({name:'yszcDetail'})">
        <div class="address-index">
          <span>隐私政策</span>
          <span>
             <i class="fa fa-angle-right" style="margin-left: 2.1vw"></i>
          </span>
        </div>
      </div>
      <div class="address-cell" @click="$router.push({name:'fwrxDetail'})">
        <div class="address-index">
          <span>服务热线</span>
          <span>
             <i class="fa fa-angle-right" style="margin-left: 2.1vw"></i>
          </span>
        </div>
      </div>
      <div class="address-cell" @click="popupVisible=true">
        <div class="address-index">
          <span>最新版本</span>
          <span>
             1.1.5
             <i class="fa fa-angle-right" style="margin-left: 2.1vw"></i>
          </span>
        </div>
      </div>
    </div>

    <mt-popup
      v-model="popupVisible"
      pop-transition="popup-fade"
      :modal="true"
      position="center" class="popup-content">
      <div style="height: 116px;">
        <img style="width: 100%;" src="../../../../public/image/myheader.png"/>
        <!-- <img style="width: 100%;" src="../../../../public/image/update.png"/> -->
      </div>
      <div class="themodel-content">
        <p style="font-size:18px">
          发现新版本
        </p>
        <p style="color: #7d7474;">
          界面全新改版
        </p>
        <p style="color: #7d7474;">
          增加新功能
        </p>
        <p style="color: #7d7474;">
          修复若干bug
        </p>
      </div>
      <div class="footer-butts">
        <button class="moreThink" @click="popupVisible = false">再想想</button>
        <button class="updateGo">去更新</button>
      </div>
    </mt-popup>
  </div>
</template>

<script>
import { Popup } from 'mint-ui';
import Header from "../../../components/Header";
export default {
  name: "aboutMe",
  data() {
    return {
      title:'关于我们',
      popupVisible:false   //显示顶部的提示
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
.aboutMe {
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
.popup-content{
  width: 56%;
  line-height: 30px;
  /* background-image: url('../../../../public/image/update.png') */
}
.themodel-content{
  display: flex;
  flex-direction: column;
  padding: 10px 15px 60px 15px;
  background-color: #fff;
}
.footer-butts{
  width: 100%;
  position: absolute;
  bottom: 0;
}
.moreThink{
  padding: 10px 20px;
  width: 50%;
  border-right: 1px solid #d0c8c8;
  border-top: 1px solid #d0c8c8;
}
.updateGo{
  padding: 10px 20px;
  width: 50%;
  border-top: 1px solid #d0c8c8;
  color: blue;
}
.mint-popup{
  background: none
}
</style>
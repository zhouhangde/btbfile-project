<template>
  <div class="addTbdz">
     <Header :isLeft="true" :title="title"/>
     <div>
        <div class="item-input">
            <i class="fa fa-address-book theIcon"></i>
            <div class="item-right">
                <input type="text"  placeholder="昵称"/>
            </div>
        </div>
         <div class="item-input">
            <i class="fa fa-address-book theIcon"></i>
            <div class="item-right">
                <input type="text"  placeholder="提币地址"/>
                <i class="fa fa-address-book" style="font-size: 17px;"></i>
            </div>
        </div>
        <div class="item-input">
            <i class="fa fa-address-book theIcon"></i>
            <div class="item-right">
                <input type="text"  placeholder="币种"/>
                <i class="fa fa-angle-right" style="font-size: 17px;"></i>
            </div>
        </div>
         <div class="item-input">
            <i class="fa fa-address-book theIcon"></i>
            <div class="item-right">
                <input type="text"  placeholder="备注"/>
            </div>
        </div>
     </div>
     <div class="complate">
      完成
    </div>
  </div>
</template>

<script>
import Header from "../../../components/Header";
export default {
  name: "addTbdz",
  data() {
    return {
        title:'新增提币地址'
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
.addTbdz {
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
    background-color: #bbc5e8;
}
.item-input{
    display: flex;
    height: 6vh;
    margin: 10px;
}
.item-right{
    padding: 2vw 0;
    border-bottom: 1px solid #d6c2c2;
    width:83%;
    display: flex;
    align-items: flex-start;
    justify-content: space-between;

}
.theIcon{
  width:5%;
  font-size: 17px;
  padding: 2vw 3vw;
}
</style>
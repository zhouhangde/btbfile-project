<template>
  <div class="shichan">
    <Header :isLeft="true" :title="title"/>
    <div style="text-align:center">
        <span style="padding: 3px;color: blue;border-bottom: 1px solid blue;">USDT</span>
    </div>
    <div style="padding: 10px;">
        <ul>
            <li>
                <div style="padding: 15px 0;display: flex;justify-content: space-between;border-bottom: 1px solid rgb(212, 205, 205);">
                    <p class="item-left">
                       <span>CSCCT/USDT</span>
                       <span style="margin-left: 25px;color: #a29494;">2.68</span>
                    </p>
                    <!-- <span><i class="fa fa-yen (alias)" style="margin-right:5px"></i></span> -->
                </div>
                <div style="padding: 15px 0;display: flex;justify-content: space-between;border-bottom: 1px solid rgb(212, 205, 205);">
                    <p class="item-left">
                       <span>BTC/USDT</span>
                       <span style="margin-left: 25px;color: #a29494;">11657.57</span>
                    </p>
                    <span><i class="fa fa-yen (alias)" style="margin-right:5px"></i></span>
                </div>
                <div style="padding: 15px 0;display: flex;justify-content: space-between;border-bottom: 1px solid rgb(212, 205, 205);">
                    <p class="item-left">
                       <span>ETH/USDT</span>
                       <span style="margin-left: 25px;color: #a29494;">273.08</span>
                    </p>
                    <!-- <span><i class="fa fa-yen (alias)" style="margin-right:5px"></i></span> -->
                </div>
            </li>
        </ul>
    </div>
  </div>
</template>

<script>
import Header from "../../components/Header";
export default {
  name: "shichan",
  data() {
    return {
         title:'市场'
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
.shichan {
  width: 100%;
  height: 100%;
  overflow: auto;
  box-sizing: border-box;
}
</style>
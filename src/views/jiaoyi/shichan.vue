<template>
  <div class="shichan">
    <Header :isLeft="true" :title="title"/>
    <div style="text-align:center">
        <span style="padding: 3px;color: blue;border-bottom: 1px solid blue;">CNY</span>
    </div>
    <div style="padding: 10px;">
        <ul>
            <li>
                <div class="theChild" @click="choose(1)">
                    <p class="item-left">
                       <span>BTC/CNY</span>
                       <!-- <span style="margin-left: 25px;color: #a29494;">11657.57</span> -->
                    </p>
                    <span><i class="fa fa-check" style="margin-right:5px;color:#ffb907a3;" v-if="showStaus == 2"></i></span>
                </div>
                <div class="theChild" @click="choose(2)">
                    <p class="item-left">
                       <span>ETH/CNY</span>
                       <!-- <span style="margin-left: 25px;color: #a29494;">273.08</span> -->
                    </p>
                    <span><i class="fa fa-check" style="margin-right:5px;color:#ffb907a3;" v-if="showStaus == 3"></i></span>
                </div>
                <div class="theChild" @click="choose(3)">
                    <p class="item-left">
                       <span>XRP/CNY</span>
                       <!-- <span style="margin-left: 25px;color: #a29494;">11657.57</span> -->
                    </p>
                    <span><i class="fa fa-check" style="margin-right:5px;color:#ffb907a3;" v-if="showStaus == 4"></i></span>
                </div>
                <div class="theChild" @click="choose(4)">
                    <p class="item-left">
                       <span>EOS/CNY</span>
                       <!-- <span style="margin-left: 25px;color: #a29494;">11657.57</span> -->
                    </p>
                    <span><i class="fa fa-check" style="margin-right:5px;color:#ffb907a3;" v-if="showStaus == 5"></i></span>
                </div>
                <div class="theChild" @click="choose(5)">
                    <p class="item-left">
                       <span>LTC/CNY</span>
                       <!-- <span style="margin-left: 25px;color: #a29494;">11657.57</span> -->
                    </p>
                    <span><i class="fa fa-check" style="margin-right:5px;color:#ffb907a3;" v-if="showStaus == 6"></i></span>
                </div>
                <div class="theChild" @click="choose(6)">
                    <p class="item-left">
                       <span>WTC/CNY</span>
                       <!-- <span style="margin-left: 25px;color: #a29494;">11657.57</span> -->
                    </p>
                    <span><i class="fa fa-check" style="margin-right:5px;color:#ffb907a3;" v-if="showStaus == 7"></i></span>
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
         title:'市场',
         showStaus:1
    };
  },
  beforeRouteEnter(to, from, next) {
    next(vm => vm.getData());
  },
  methods: {
    // 获取用户信息
    getData() {
      
    },
    choose(conditon){
      switch(conditon) {
          case 1:
              this.$router.push({name:'jiaoyi',params: {slectBz: 'BTCUSDT',title:'BTC/USDT'}})
              break;
          case 2:
              this.$router.push({name:'jiaoyi',params: {slectBz: 'ETHUSDT',title:'ETH/USDT'}})
              break;
          case 3:
              this.$router.push({name:'jiaoyi',params: {slectBz: 'XRPUSDT',title:'XRP/USDT'}})
              break;
          case 4:
              this.$router.push({name:'jiaoyi',params: {slectBz: 'EOSUSDT',title:'EOS/USDT'}})
              break;
          case 5:
              this.$router.push({name:'jiaoyi',params: {slectBz: 'LTCUSDT',title:'LTC/USDT'}})
              break;
          case 6:
              this.$router.push({name:'jiaoyi',params: {slectBz: 'BHBUSDT',title:'WTC/USDT'}})
              break;                    
          default:
              this.$router.push({name:'jiaoyi',params: {slectBz: 'CSCCTUSDT',title:'BTC/USDT'}})
      } 
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
.theChild{
  padding: 15px 0;
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid rgb(212, 205, 205);
}
</style>
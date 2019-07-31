<template>
  <div class="cjHistory">
    <Header :isLeft="true" :title="title"/>
    <div>
        <ul>
            <!-- <li style="padding: 15px;border-bottom: 1px solid #d8cdcd;">
                <div class="theItem">
                    <span style="font-size: 16px;font-weight: bold;">成交额:<small>29.551561</small></span>
                    <span><small class="juxing"></small>买入</span>
                </div>
                <div class="theItem">
                    <span>成交数量:<small>10</small></span>
                </div>
                <div class="theItem">
                    <span>成交价格:<small>2.9551561</small></span>
                    <span><small>2019-07-10</small>16:46:17</span>
                </div>
            </li> -->
            <li style="padding: 15px;border-bottom: 1px solid #d8cdcd;" v-for="(item,index) in cjHistory" :key="index">
                <div class="theItem">
                    <span style="font-size: 16px;font-weight: bold;">成交额:<small>{{item.deal_money}}</small></span>
                    <span v-if="item.side == '2'"><small class="juxing"></small>买入</span>
                    <span v-else-if="item.side == '1'"><small class="juxing"></small>卖出</span>
                </div>
                <div class="theItem">
                    <span>成交数量:<small>{{item.price}}</small></span>
                </div>
                <div class="theItem">
                    <span>成交价格:<small>{{item.amount}}</small></span>
                    <span><small style="margin-right: 10px;">{{item.ftime | formatDateYm}}</small>{{item.ftime | formatDateHsm}}</span>
                </div>
            </li>
        </ul>
    </div>
  </div>
</template>

<script>
const mycjHistory = require('../../../data/cjHistory.json');
import Header from "../../components/Header";
import moment from 'moment'  //时间转化工具
export default {
  name: "cjHistory",
  data() {
    return {
        title:'CSCCT/USDT成交记录',
        cjHistory:[]
    };
  },
  beforeRouteEnter(to, from, next) {
    http.sendData({"id":30,"method":"server.auth","params":["WNoCLzeQWHyIdjuynB6hT5o30ieFRBXe_1560572313|web","web"]})
    next(vm => vm.getData());
  },
  watch: {
      cjHistory(val) {
        this.cjHistory = val;
      }
  },
  methods: {
    // 获取用户信息
    getData() {
      var $this = this
      // 获取成交记录数据
      // this.cjHistory = mycjHistory.result.records

      window.revieceData30 = function(res) {
        // 历史委托(对应即为成交记录的数据)
        if(res.result && res.result.status == 'success') {
            http.sendData({"id":32,"method":"order.history","params":["CSCCTUSDT",0,0,0,10,0]})
        }
      } 

      window.revieceData32 = function(res) {
        // 历史委托(对应即为成交记录的数据)
        return $this.storeData(res)
      }  
      
      
    },
    storeData(data){
      this.cjHistory = data.result.records
    },
    storePkData(data){
      
      // 关闭动画
      Indicator.close();
    },
  },
  filters: {
    formatDateYm: function (value) {
      return moment(value).format('MM-DD')
    },
    formatDateHsm: function (value) {
      return moment(value).format('HH:MM:SS')
    }
  },
  components: {
     Header
  }
};
</script>

<style scoped>
.cjHistory {
  width: 100%;
  height: 100%;
  overflow: auto;
  box-sizing: border-box;
}
.theItem{
  display: flex;
  justify-content: space-between;
  padding: 7px 0;
}
.juxing{
  width: 11px;
  height: 11px;
  background-color: #57c78d;
  display: inline-block;
  margin-right: 9px;
}

</style>
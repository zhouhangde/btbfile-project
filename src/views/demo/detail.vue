<template>
  <div class="detail">
      <div style="text-align: center;padding: 15px;">
          <button @click="selectZc" class="yhzc">
               用户资产    
          </button>
          <button @click="selectCzTx" class="cztx">
               充值提现记录
          </button>
      </div>

      <!-- 我的充值提现记录 -->
      <div>
         <table border="1" cellpadding="0" cellspacing="0" style="width:100%" align="center" class="theTable">
            <thead>
				<tr>
					<th class="theTh">
						时间
					</th>
					<th class="theTh">
						类别
					</th>
					<th class="theTh">
						数量
					</th>
					<th class="theTh">
						总价(元)
					</th>
                    <th class="theTh">
						状态
					</th>
				  </tr>
			   </thead>
               <tbody>
                   <tr>
                       <!-- <td>{{item.created_at}}</td>
                       <td>{{item.type}}</td>
                       <td>{{item.num}}</td>
                       <td>{{item.total_price}}</td>
                       <td>{{item.status}}</td> -->

                       <td class="theTd">12341234</td>
                       <td class="theTd">222222222</td>
                       <td class="theTd">33333333</td>
                       <td class="theTd">4444444</td>
                       <td class="theTd">5555555</td>
                   </tr>
               </tbody>
         </table>
      </div>
      

      <!-- 我的用户资产 -->
      <div>
         <table border="1" cellpadding="0" cellspacing="0" style="width:100%" align="center" class="theTable">
            <thead>
				<tr>
					<th class="theTh">
						币种
					</th>
					<th class="theTh">
						总额
					</th>
					<th class="theTh">
						可用
					</th>
					<th class="theTh">
						冻结
					</th>
                    <th class="theTh">
						USDT估值
					</th>
				  </tr>
			   </thead>
               <tbody>
                   <tr>
                       <!-- <td>{{item.created_at}}</td>
                       <td>{{item.type}}</td>
                       <td>{{item.num}}</td>
                       <td>{{item.total_price}}</td>
                       <td>{{item.status}}</td> -->

                       <td class="theTd">12341234</td>
                       <td class="theTd">222222222</td>
                       <td class="theTd">33333333</td>
                       <td class="theTd">4444444</td>
                       <td class="theTd">5555555</td>
                   </tr>
               </tbody>
         </table>
      </div>
  </div>
</template>

<script>
import $ from 'jquery'
export default {
  name: "detail",
  data() {
    return {
      id:'',
      myyhjlData:[],
      myyhzcData:[]
    };
  },
  created(){
     let id = this.$route.params.id
     this.id = id
     console.log('id',id)
  },
  methods: {
    selectCzTx(){
      var $this = this
      $.ajax({
          url: "http://91bilong.com/api/user/get-recoeds?uid="+$this.id,
          beforeSend: function(request) {
          },
          dataType: "JSON",
          processData: false,
          contentType: false,
          cache: false,
          async: false, //请求是否异步，默认为异步
          type: "get",
          success: function(list) {
             console.log('list',list)
             $this.myyhjlData = list.data
          },
          error: function() {}
      });
    },
    selectZc(){
      var $this = this
      $.ajax({
          url: "http://91bilong.com/api/bargain/balances?uid="+$this.id,
          beforeSend: function(request) {
          },
          dataType: "JSON",
          processData: false,
          contentType: false,
          cache: false,
          async: false, //请求是否异步，默认为异步
          type: "get",
          success: function(list) {
             console.log('资产list',list)
             $this.myyhzcData = list.data
          },
          error: function() {}
      });
    }
  },
  mounted() {
  },
  components: {
     
  }
};
</script>

<style scoped>
.detail {
  width: 100%;
  height: 100%;
  overflow: auto;
  box-sizing: border-box;
}
.theTd,.theTh{
    text-align: center;
    padding: 10px
}
.yhzc{
   padding: 11px;
    background-color: red;
    color: #fff;
    border-radius: 10px;
}
.cztx{
    padding: 11px;
    background-color: green;
    color: #fff;
    border-radius: 10px; 
    margin-left: 30px
}
</style>
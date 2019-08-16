<template>
  <div class="demo-news">
    <!-- 外部的币种数据和新闻 -->
				<div class="flex column bgWhite part-bg" style="height:100%; width:19%;">
                        <p style="color: #d2d6ec;font-size: 14px;padding: 8px 10px;cursor: pointer">盘口情况</p>
						<p style="color: rgb(201, 182, 182);font-size: 14px;padding: 8px 10px;font-size: 13px;cursor: pointer">数据来源：取自各大交易所多空比例，仅供参考</p>
					    <p style="color: #d2d6ec;font-size: 14px;padding: 8px 10px;display:flex;align-items: center;" v-if="currentName == 'btc'">
							<span style="padding: 5px 10px;border: 1px solid rgb(175, 71, 66);">多</span>
							<span style="background-color: rgba(226, 45, 45, 0.2);width: 160px; padding: 5px;">{{pkData.BTC_PERCENT}}%</span>
							<span style="background-color: rgba(1, 144, 118, 0.2);width: 50px;padding: 5px;">{{pkData.USDT_PERCENT}}%</span>
							<span style="padding: 5px 10px;border: 1px solid rgba(1, 144, 118, 0.2);">空</span>
						</p>
						<p style="color: #d2d6ec;font-size: 14px;padding: 8px 10px;display:flex;align-items: center;" v-else-if="currentName == 'eth'">
							<span style="padding: 5px 10px;border: 1px solid rgb(175, 71, 66);">多</span>
							<span style="background-color: rgba(226, 45, 45, 0.2);width: 160px; padding: 5px;">{{pkData.ETH_PERCENT}}%</span>
							<span style="background-color: rgba(1, 144, 118, 0.2);width: 50px;padding: 5px;">{{pkData.USDT_PERCENT}}%</span>
							<span style="padding: 5px 10px;border: 1px solid rgba(1, 144, 118, 0.2);">空</span>
						</p>
						<p style="color: #d2d6ec;font-size: 14px;padding: 8px 10px;display:flex;align-items: center;" v-else-if="currentName == 'eos'">
							<span style="padding: 5px 10px;border: 1px solid rgb(175, 71, 66);">多</span>
							<span style="background-color: rgba(226, 45, 45, 0.2);width: 160px; padding: 5px;">{{pkData.EOS_PERCENT}}%</span>
							<span style="background-color: rgba(1, 144, 118, 0.2);width: 50px;padding: 5px;">{{pkData.USDT_PERCENT}}%</span>
							<span style="padding: 5px 10px;border: 1px solid rgba(1, 144, 118, 0.2);">空</span>
						</p>
						<p style="color: #d2d6ec;font-size: 14px;padding: 8px 10px;display:flex;align-items: center;" v-else-if="currentName == 'ltc'">
							<span style="padding: 5px 10px;border: 1px solid rgb(175, 71, 66);">多</span>
							<span style="background-color: rgba(226, 45, 45, 0.2);width: 160px; padding: 5px;">{{pkData.LTC_PERCENT}}%</span>
							<span style="background-color: rgba(1, 144, 118, 0.2);width: 50px;padding: 5px;">{{pkData.USDT_PERCENT}}%</span>
							<span style="padding: 5px 10px;border: 1px solid rgba(1, 144, 118, 0.2);">空</span>
						</p>
						<p style="color: #d2d6ec;font-size: 14px;padding: 8px 10px;display:flex;align-items: center;" v-else-if="currentName == 'xrp'">
							<span style="padding: 5px 10px;border: 1px solid rgb(175, 71, 66);">多</span>
							<span style="background-color: rgba(226, 45, 45, 0.2);width: 160px; padding: 5px;">{{pkData.XRP_PERCENT}}%</span>
							<span style="background-color: rgba(1, 144, 118, 0.2);width: 50px;padding: 5px;">{{pkData.USDT_PERCENT}}%</span>
							<span style="padding: 5px 10px;border: 1px solid rgba(1, 144, 118, 0.2);">空</span>
						</p>
						<p style="color: #d2d6ec;font-size: 14px;padding: 8px 10px;display:flex;align-items: center;" v-else-if="currentName == 'bch'">
							<span style="padding: 5px 10px;border: 1px solid rgb(175, 71, 66);">多</span>
							<span style="background-color: rgba(226, 45, 45, 0.2);width: 160px; padding: 5px;">{{pkData.BCH_PERCENT}}%</span>
							<span style="background-color: rgba(1, 144, 118, 0.2);width: 50px;padding: 5px;">{{pkData.USDT_PERCENT}}%</span>
							<span style="padding: 5px 10px;border: 1px solid rgba(1, 144, 118, 0.2);">空</span>
						</p>
						<p style="color: #d2d6ec;font-size: 14px;padding: 8px 10px;display:flex;align-items: center;" v-else-if="currentName == 'trx'">
							<span style="padding: 5px 10px;border: 1px solid rgb(175, 71, 66);">多</span>
							<span style="background-color: rgba(226, 45, 45, 0.2);width: 160px; padding: 5px;">{{pkData.TRX_PERCENT}}%</span>
							<span style="background-color: rgba(1, 144, 118, 0.2);width: 50px;padding: 5px;">{{pkData.USDT_PERCENT}}%</span>
							<span style="padding: 5px 10px;border: 1px solid rgba(1, 144, 118, 0.2);">空</span>
						</p>
						<p style="color: #d2d6ec;font-size: 14px;padding: 8px 10px;display:flex;align-items: center;" v-else-if="currentName == 'neo'">
							<span style="padding: 5px 10px;border: 1px solid rgb(175, 71, 66);">多</span>
							<span style="background-color: rgba(226, 45, 45, 0.2);width: 160px; padding: 5px;">{{pkData.NEO_PERCENT}}%</span>
							<span style="background-color: rgba(1, 144, 118, 0.2);width: 50px;padding: 5px;">{{pkData.USDT_PERCENT}}%</span>
							<span style="padding: 5px 10px;border: 1px solid rgba(1, 144, 118, 0.2);">空</span>
						</p>
                        
						<!-- 新闻 -->
						<p style="padding:3px 10px;color: #fff;font-size: 15px;text-align: center;">快讯</p>
						<div style="height: 690px;overflow: auto;">
							<!-- v-for="(item,index) in newsDataList" :key="index" -->
                              <ul style="padding: 8px 10px;" v-for="(item,index) in newsDataList" :key="index">
								  <li style="padding: 8px 10px;color: #fff;font-size: 13px; border: 1px solid #585656;">
									  <p style="padding: 8px 10px;">{{item.createDate.time | formatDate}}</p>
									  <p style="font-weight: bold;text-align: center;">{{getBeforeCaption(item.introduction)}}</p>
									  <p style="font-size: 12px;padding: 10px 0;">{{getAfterCaption(item.introduction)}}</p>
								      <p style="text-align: right;font-size: 9px;">{{item.relativeDate}}</p>
								  </li>
							  </ul>
						</div>
						
				</div>
<!-- 外部的币种数据和新闻 -->
  </div>
</template>

<script>

import $ from 'jquery'
import moment from 'moment'  //时间转化工具
export default {
  name: "demo-news",
  data() {
    return {
      pkData:{    //外部接口查询的数据
          BTC_PERCENT:'',
          BTC_PERCENT_WIDTH:''
      },
      currentName:'btc',
      newsDataList:[]  //新闻快讯
    };
  },
  created() {
      //查询gateio.news的多喝空
			this.getLoanMarketStatus(this.currentName)

     //调用新闻
			this.getFlashnew()


		},
  filters: {
			//日期转化
			formatDate: function (value) {
				value = parseInt(value)
				return moment(value).format('YYYY-MM-DD HH:mm:ss')
			}
		},
  methods:{
    //查询盘口情况数据
    getLoanMarketStatus(currentName){
      var $this = this
      // this.$http({
      //   url: "/json_svr/get_loan_market_status",
      //   method: "POST",
      //   data: {
      //     market: currentName+'_usdt'
      //   }
      // }).then(res => {
      //   $this.pkData = res.data.data
      // })

      this.$axios.post("/api/register/email-sign", {
          market: currentName+'_usdt'
        }).then(res => {
        $this.pkData = res.data.data
      })



    },
    //截取指定字符前的内容
    getAfterCaption(obj){
      var index=obj.lastIndexOf("\】");
      obj=obj.substring(index+1,obj.length);
      return obj;
    },
    //截取指定字符后的内容
    getBeforeCaption(obj){
      var index=obj.lastIndexOf("\】");
      obj=obj.substring(1,index);
      return obj;
    },
    //查询新闻快讯
    getFlashnew(){
      var $this =this
      // this.$http({
      // 	url: "/news/list/flashnew/data.do?type=0&lastItemTimeStamp=",
      // 	method: "get"
      // }).then(res => {
              //      $this.newsDataList = res.data.obj.list
      // })

      $.ajax({
        type : "get",
        contentType: false,
        processData: false,
        cache: false,
        async: false, 
        beforeSend:function(request){
            request.setRequestHeader("Accept", "*/*");
        },
        url : "/news/list/flashnew/data.do?type=0&lastItemTimeStamp=",
        dataType: "JSON",
        success : function(res) {
          $this.newsDataList = res.obj.list
        },
        error : function(e){
        }
      });

    },
  },
  mounted() {
  },
  created(){
      this.getNews()
  },
  methods:{
     getNews(){
        
     }
  },
  components: {
     
  }
};
</script>

<style  scoped>
.demo-news{
  width: 100%;
  height: 100%;
  overflow: auto;
  box-sizing: border-box;
}
</style>
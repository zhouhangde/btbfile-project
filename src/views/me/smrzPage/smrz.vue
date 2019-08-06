<template>
  <div class="smrz">
    <Header :isLeft="true" :title="title"/>
    <div>
      <div class="address-cell"  @click="$router.push({name:'grrzDetail',params: {grRzStaue: grRzStaue}})">
        <div class="address-index">
          <span>个人认证</span>
          <span>
             {{status_msg}}
             <i class="fa fa-angle-right" style="margin-left: 2.1vw"></i>
          </span>
        </div>
      </div>
      <div class="address-cell"  @click="$router.push({name:'sjrzDetail',params: {sjRzStaue: sjRzStaue}})">
        <div class="address-index">
          <span>商家认证</span>
          <span>
             {{otc_merchant_msg}}
             <i class="fa fa-angle-right" style="margin-left: 2.1vw"></i>
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Header from "../../../components/Header";
import { Toast } from "mint-ui";
export default {
  name: "smrz",
  data() {
    return {
        title:'实名认证',
        status_msg:'',   //个人认证提示
        otc_merchant_msg:'',   //商家认证提示
        access_token:'',
        grRzStaue:'',
        sjRzStaue:''
    };
  },
  beforeRouteEnter(to, from, next) {
    next(vm => vm.getData());
  },
  methods: {
    // 获取用户信息
    getData() {

        let accessToken = localStorage.getItem('access_token')
        this.access_token = accessToken

      //  let access_token = localStorage.getItem('access_token')
       if(accessToken!= undefined && accessToken!= null && accessToken!= ''){
         this.getUserInfo(accessToken)
         this.getRzInfo(accessToken)
       }else{
         this.status_msg = ''
         this.otc_merchant_msg = ''
         Toast({
              message: '暂未登陆，未能获取认证信息',
              position: "bottom",
              duration: 2000
         });
         return;
       }
       
    },
    getUserInfo(access_token){
      // 获取用户信息
      var _this =this;
      this.$axios
      .post("api/user/user-info",{
        access_token:_this.access_token,
        chain_network:'main_network'
      })
      .then(res => {
        if(res.data.code == '200'){
            // 检验成功 设置登录状态并且跳转到/
            if(res.data.data.otc_merchant_msg == "审核已通过"){
               _this.otc_merchant_msg  = '审核已通过'
               _this.sjRzStaue = '1'
            }else if(res.data.data.otc_merchant_msg == "等待审核中"){
               _this.otc_merchant_msg  = '等待审核中'
               _this.sjRzStaue = '2'
            }else{
              _this.sjRzStaue = '0'
              if(res.data.data.verified_status_msg == "审核已通过"){
                  _this.otc_merchant_msg  = '暂未认证,请及时认证'
              }else if(res.data.data.verified_status_msg == "审核未通过,请上传真实信息"){
                  _this.otc_merchant_msg  = '审核未通过,请上传真实信息'
              }else{
                 _this.otc_merchant_msg  = '请先进行个人认证'
              }
            }
            
        }else{
          Toast({
              message: res.data.message,
              position: "bottom",
              duration: 2000
            });
            return;
        }
      })
      .catch(err => {
          Toast({
              message: '网络错误',
              position: "bottom",
              duration: 2000
            });
            return;
      });
    },
    // 获取认证信息
    getRzInfo(access_token){
      var _this =this;
      this.$axios
      .post("api/user/get-info",{
        access_token:_this.access_token,
        chain_network:'main_network'
      })
      .then(res => {
        if(res.data.code == '200'){
            // 检验成功 设置登录状态并且跳转到/
            if(res.data.data.status_msg == "等待审核中"){
               _this.status_msg  = '等待审核中'
               _this.grRzStaue = '2'
            }else{
               _this.status_msg  = '已认证'
               _this.grRzStaue = '1'
            }
        }else{
            _this.status_msg  = '暂未认证,请及时认证'
            _this.grRzStaue = '0'
          // Toast({
          //     message: res.data.message,
          //     position: "bottom",
          //     duration: 2000
          //   });
          //   return;
        }
      })
      .catch(err => {
          Toast({
              message: '网络错误',
              position: "bottom",
              duration: 2000
            });
            return;
      });
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
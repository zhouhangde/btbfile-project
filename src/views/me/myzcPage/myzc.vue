<template>
  <div class="myzc">
    <Header :isLeftgoMe="true" :title="title" style="background-color: #5895c7;color:#fff;"/>
    <div style="background-color: #5895c7;">
      <p style=" padding: 12px;">
        <span style="color:#fff;">总账户资产折合~<small style="color:rgb(224, 217, 217)">{{myZiChangData.unfrozen_bhb}}</small></span>
      </p>
      <p style=" padding: 4px 12px;">
        <span style="color:#fff;">BHB锁仓余额:
          <small style="color:rgb(224, 217, 217)">{{myZiChangData.frozen_bhb}}</small>
          <!-- <small class="theButt">划转</small> -->
        </span>  
      </p>
      <p style=" padding: 14px 12px;">
        <span style="color:#fff;">BHB释放余额:
          <small style="color:rgb(224, 217, 217)">{{myZiChangData.freeze_bhb}}</small>
          <!-- <small class="theButt">转出</small> -->
        </span>  
      </p>
      <p style="padding: 4px 12px 10px 12px;">
        <span style="color:#fff;">BHB可转出额度:
          <small style="color:rgb(224, 217, 217)">{{myZiChangData.freeze_bhb_status}}</small>
        </span> 
      </p>
    </div>
    <div>
       <ul>
         <!-- <li @click="$router.push({name:'myzcDetail'})">
           <div class="the-cell"> 
             <p class="the-index">
               <span style="color:blue">USDT</span>
               <i class="fa fa-angle-right"></i>
             </p>
             <div style="color:#001" class="the-index">
               <p>
                  <span style="color:#999;">可用</span>
                  <span>895.28</span>
               </p>
               <p style="text-align:right;">
                  <span style="color:#999;">冻结</span>
                  <span>936.0</span>
               </p>
               <p style="text-align:right;"> 
                  <span style="color:#ccc;">折合(CNY)
                  </span>
                  <span> 6168.47920000</span>
               </p>
             </div>
           </div>
         </li> -->
         <li @click="$router.push({name:'myzcDetail',params:{myzcDetail:item}})" v-for="(item,index) in myAllZiChangData" :key="index">
           <div class="the-cell"> 
             <p class="the-index">
               <span style="color:blue">{{item.name}}</span>
               <i class="fa fa-angle-right"></i>
             </p>
             <div style="color:#001" class="the-index">
               <p>
                  <span style="color:#999;">可用</span>
                  <span>{{item.available}}</span>
               </p>
               <p style="text-align:right;">
                  <span style="color:#999;">冻结</span>
                  <span>{{item.oct_freeze}}</span>
               </p>
               <p style="text-align:right;"> 
                  <span style="color:#ccc;">折合(CNY)
                  </span>
                  <span>{{item.money}}</span>
               </p>
             </div>
           </div>
         </li>
       </ul>

    </div>
  </div>
</template>

<script>
import Header from "../../../components/Header";
export default {
  name: "myzc",
  data() {
    return {
      title:'我的资产',
      myZiChangData:{
        unfrozen_bhb: 0,    //总账户资产折合
        frozen_bhb: "0.00",   //bhb锁仓余额
        freeze_bhb: "0.00",   //bhb释放余额
        freeze_bhb_status: "0",  //bhb可转出额度
        freeze_bhb_status_v2: "1"
      },
      myAllZiChangData:[]
    };
  },
  beforeRouteEnter(to, from, next) {
    next(vm => vm.getData());
  },
  methods: {
    // 获取用户信息
    getData() {
      this.getMyZiChang()   //获取当前登录人的资产信息
      this.getAllZiChang()    //获取所有的币种信息
    },
    getMyZiChang(){
      var $this = this
      this.$axios
        .post("/api/user/freeze-bhb", {
          access_token: 'fJmsZgoBIfdMvmiAc3AwfhS2-Y7GScc9_1563504284',
          os:'android'
        })
        .then(res => {
          if(res.data.code == '200'){
              // 检验成功 设置登录状态并且跳转到/
               console.log('收款方式列表',res)
               $this.myZiChangData = res.data.data
          }else{
            $this.$toast({
                message: res.data.message,
                position: "bottom",
                duration: 2000
              });
              return;
          }
        })
        .catch(err => {
            $this.$toast({
                message: '网络错误',
                position: "bottom",
                duration: 2000
              });
              return;
        });
    },
    getAllZiChang(){
       var $this = this
       this.$axios
        .post("/api/exchange/balance", {
          access_token: 'fJmsZgoBIfdMvmiAc3AwfhS2-Y7GScc9_1563504284'
        })
        .then(res => {
          if(res.data.code == '200'){
              // 检验成功 设置登录状态并且跳转到/
               console.log('收款方式列表',res)
               $this.myAllZiChangData = res.data.data.list
          }else{
            $this.$toast({
                message: res.data.message,
                position: "bottom",
                duration: 2000
              });
              return;
          }
        })
        .catch(err => {
            $this.$toast({
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
.myzc {
  width: 100%;
  height: 100%;
  overflow: auto;
  box-sizing: border-box;
}
.theButt{
  border: 1px solid #fff;
  padding: 1px 6px;
  margin-left: 6px;
  border-radius: 5px;
}
.the-cell{
      font-size: 1rem;
    background: #ffffff;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    flex-direction: column;
    padding: 14px;

}
.the-index {
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding: 2vw 2.666667vw 2vw 0;
  align-content: center;
}
.the-index > i {
  font-size: 1.3rem;
  color: #ccc;
}   
.the-index >p{
  line-height: 23px;
}
    
.the-index >p >span{
  padding:5px;
} 
</style>
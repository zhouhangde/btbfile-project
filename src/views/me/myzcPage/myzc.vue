<template>
  <div class="myzc">
    <Header :isLeftgoMe="true" :title="title" style="background-color: #5895c7;color:#fff;"/>
    <div style="background-color: #5895c7;">
      <p style=" padding: 12px;">
        <span style="color:#fff;">总账户资产折合~<small style="color:rgb(224, 217, 217)">$1040.94</small></span>
      </p>
      <p style=" padding: 4px 12px;">
        <span style="color:#fff;">BHB锁仓余额:
          <small style="color:rgb(224, 217, 217)">0.00</small>
          <small class="theButt">划转</small>
        </span>  
      </p>
      <p style=" padding: 14px 12px;">
        <span style="color:#fff;">BHB释放余额:
          <small style="color:rgb(224, 217, 217)">0.00</small>
          <small class="theButt">转出</small>
        </span>  
      </p>
      <p style="padding: 4px 12px 10px 12px;">
        <span style="color:#fff;">BHB可转出额度:
          <small style="color:rgb(224, 217, 217)">0</small>
        </span> 
      </p>
    </div>
    <div>
       <ul>
         <li @click="$router.push({name:'myzcDetail'})">
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
         </li>
         <li>
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
                  <span style="color:#999;">折合(CNY)

                  </span>
                  <span>6168.47920000</span>
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
      title:'我的资产'
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
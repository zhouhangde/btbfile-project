<template>
  <div class="myTuijian">
    <Header :isLeft="true" :title="title"/>
    <div class="theContent">
        <div style=" padding: 10px;">
            <div style="text-align: center;border-bottom: 1px solid rgb(177, 168, 168);padding: 15px 0;">
                <p style="padding: 5px;color: #c5c55f;">累积邀请注册奖励</p>
                <p style="padding: 5px;color: #c5c55f;">0.00 BHB</p>
            </div>
            <div class="theParent">
                <div class="theChild">
                    <span>0</span>
                    <span style="margin-top: 10px;">一级邀请人数</span>
                </div>  
                <div class="theChild">
                    <span>0</span>
                    <span style="margin-top: 10px;">一级邀请人数</span>
                </div>  
                <div class="theChild">
                    <span>0</span>
                    <span style="margin-top: 10px;">一级邀请人数</span>
                </div>  
            </div>
            <div class="theParent">
                <div class="theChild">
                    <span>0 BHB</span>
                    <span style="margin-top: 10px;text-align: center;line-height: 19px;">一级锁仓总余额</span>
                </div>  
                <div class="theChild">
                    <span>0 BHB</span>
                    <span style="margin-top: 10px;text-align: center;line-height: 19px;">二级锁仓总余额</span>
                </div>  
                <div class="theChild">
                    <span>0 BHB</span>
                    <span style="margin-top: 10px;text-align: center;line-height: 19px;">三级锁仓总余额</span>
                </div>  
            </div>
            <div class="theParent">
                <div class="theChild">
                    <span>0 BHB</span>
                    <span style="margin-top: 10px;text-align: center;line-height: 19px;">一级持仓总余额</span>
                </div>  
                <div class="theChild">
                    <span>0 BHB</span>
                    <span style="margin-top: 10px;text-align: center;line-height: 19px;">二级持仓总余额</span>
                </div>  
                <div class="theChild">
                    <span>0 BHB</span>
                    <span style="margin-top: 10px;text-align: center;line-height: 19px;">三级持仓总余额</span>
                </div>  
            </div>
            <div class="theParent">
                <div class="theChild">
                    <span>0 BHB</span>
                    <span style="margin-top: 10px;text-align: center;line-height: 19px;">总邀请奖励</span>
                </div>  
                <div class="theChild">
                    <span>0 BHB</span>
                    <span style="margin-top: 10px;text-align: center;line-height: 19px;">总激活奖励</span>
                </div>  
            </div>
        </div>
    </div>
    <div style="width: 90%;margin: 0 auto;padding-bottom: 23px;">
        <div style="text-align:center;padding: 15px 0;font-size: 16px;">邀请达人榜</div>
        <div style="box-shadow: -1px -1px 20px 4px #d4cfcf;padding: 10px;"> 
            <div class="yaoqParent">
                <div style="display: flex;align-items: center;">
                   <div class="parallelogram" style="background-color: #ceb14f;color: #fff;">NO.1</div>
                   <span style="margin-left: 17px;">189****8564</span>
                </div>
                <span>415000.00</span>
            </div>
            <div class="yaoqParent">
                <div style="display: flex;align-items: center;">
                   <div class="parallelogram" style="background-color: rgb(199, 123, 95);color: #fff;">NO.2</div>
                   <span style="margin-left: 17px;">189****8564</span>
                </div>
                <span>415000.00</span>
            </div>
            <div class="yaoqParent">
                <div style="display: flex;align-items: center;">
                   <div class="parallelogram" style="background-color: rgb(95, 199, 97);color: #fff;">NO.3</div>
                   <span style="margin-left: 17px;">189****8564</span>
                </div>
                <span>415000.00</span>
            </div>
            <div class="yaoqParent">
                <div style="display: flex;align-items: center;">
                   <div class="parallelogram">NO.4</div>
                   <span style="margin-left: 17px;">189****8564</span>
                </div>
                <span>415000.00</span>
            </div>
            <div class="yaoqParent">
                <div style="display: flex;align-items: center;">
                   <div class="parallelogram">NO.5</div>
                   <span style="margin-left: 17px;">189****8564</span>
                </div>
                <span>415000.00</span>
            </div>
        </div>
    </div>
  </div>
</template>

<script>
import Header from "../../../components/Header";
export default {
  name: "myTuijian",
  data() {
    return {
        title:'我的推荐'
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
.myTuijian {
  width: 100%;
  height: 100%;
  overflow: auto;
  box-sizing: border-box;
}

.theContent{
  width: 90%;
  margin: 0 auto;
  background-color: #8e8585;
  border-radius: 10px;
}

.theParent{
  display: flex;  
  border-bottom: 1px solid rgb(177, 168, 168);
  padding: 20px 0;
}
.theChild{
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px;
  color:#fff;
  flex-grow: 1;
}
    
 .parallelogram {  
   width: 35px;
   height: 15px;  
   transform:skew(-13deg);  
   -webkit-transform: skew(-13deg);  
   -moz-transform: skew(-13deg);  
   -o-transform:skew(-13deg);   
   -ms-transform:skew(-13deg);   
    padding: 3px 5px;
    font-size: 13px;
  }
  .yaoqParent{
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 9px 0;
    border-bottom: 1px solid rgb(222, 219, 219);
  }
</style>
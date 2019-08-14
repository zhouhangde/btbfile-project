<template>
  <div class="myzctx">
    <Header :isLeft="true" :title="title" :historytitle="true"/>
    <p style="padding: 10px;">
       <span><i class="fa fa-bar-chart" style="font-size:16px;color: #c7c77f;"></i></span> 
       <span style="margin-left: 11px;">提币地址</span> 
    </p>
    <div class="theparent">
        <input type="text" placeholder="请输入提币地址" style="text-indent: 11px;"/>
        <div class="item-right">
            <i class="fa fa-bar-chart" style="font-size:16px;"></i>
            <span style="margin-top: 10px;">二维码</span>
        </div>
    </div>
    <div class="theparent-tc">
        <input type="text" placeholder="提币数量(最小金额):500.0000USDT" style="text-indent: 11px;width: 60%;"/>
        <div class="item-right-tc">
            <span>全部提出</span>
        </div>
    </div>
    <div class="theparent-tyzm">
        <i class="fa fa-bar-chart" style="font-size:16px;margin-left:10px"></i>
        <input type="text" placeholder="请输入验证码" style="width: 60%;"/>
        <div class="item-right-tc">
            <span style="color: #75b4da;">获取验证码</span>
        </div>
    </div>
    <p style="padding: 10px;background-color: #e4dfdf;margin: 10px;font-weight: 600;">
        手续费:10.0000
    </p>
    <div class="thefoot">
        提交
    </div>
  </div>
</template>

<script>
import Header from "../../../components/Header";
export default {
  name: "myzctx",
  data() {
    return {
        title:'转出USDT'
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
.myzctx {
    width: 100%;
    height: 100%;
    overflow: auto;
    box-sizing: border-box;
}
.theparent{
    display: flex;
    margin: 10px;
    align-items: center;
    justify-content: space-between;
    background-color: #e4dfdf;
}
.theparent-tc{
    display: flex;
    margin: 10px;
    align-items: center;
    justify-content: space-between;
    background-color: #e4dfdf;
}
.theparent-tyzm{
    display: flex;
    margin: 10px;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid #dcd4d4;

}
.item-right{
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: #6b95bf;
    padding: 6px;
    color: #fff;
    border-radius: 8px;
}
.item-right-tc{
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 12px;
    background: #f1f1f1;
}
.thefoot{
    position: absolute;
    bottom: 0;
    height: 35px;
    line-height: 35px;
    text-align: center;
    width: 100%;
    background-color: #6b95bf;
    color: #fff;
}

</style>
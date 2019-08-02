<template>
  <div class="skfs">
    <Header :isLeft="true" :title="title" :newSkMethordIcon="newSkMethordIcon" @shownewSkMethord="shownewSkMethord"/>
    <!-- <div class="item-input" @click="$router.push({name:'zfbMethod'})">
        <i class="fa fa-cny (alias)"></i>
        <div class="item-right">
            <span>支付宝(28838823839)</span>
            <i class="fa fa-angle-right" style="font-size: 17px;"></i>
        </div>
    </div> -->
      <!-- <div class="item-input" @click="$router.push({name:'wxMethod'})">
        <i class="fa fa-wechat (alias)"></i>
        <div class="item-right">
            <span>微信(18828383)</span>
            <i class="fa fa-angle-right" style="font-size: 17px;"></i>
        </div>
    </div> -->
    <div class="item-input" v-for="(item,index) in mySkList" :key="index" @click="goUpdataPage(item.proceeds_type,item.id,item)">
        <img :src="item.icon" style="width:30px;height:30px"/>
        <div class="item-right">
            <span>{{item.name}}</span>
            <i class="fa fa-angle-right" style="font-size: 17px;"></i>
        </div>
    </div>

    <mt-actionsheet
      :actions="actions"
      v-model="sheetVisible">
    </mt-actionsheet>
  </div>
</template>

<script>
import Header from "../../../components/Header";
import { Actionsheet,Popup,Toast } from 'mint-ui';
export default {
  name: "skfs",
  data() {
    return {
      title:'收款方式',
      newSkMethordIcon:true,  //还是否显示新增图标
      // 底部的弹出
      actions:[{
          // icon: 'icon-article', // 引入iconfont的类名作为展示的icon
          name: '支付宝', // 引入文字作为标题
          method : this.showZfb
        },
        {
          // icon: 'icon-article', // 引入iconfont的类名作为展示的icon
          name: '微信', // 引入文字作为标题
          method : this.showWx
        },
        {
          // icon: 'icon-article', // 引入iconfont的类名作为展示的icon
          name: '银行卡', // 引入文字作为标题
          method : this.showYhk
        }
      
      ],
      sheetVisible:false, //上拉的sheet显示开关
      mySkList:[]   //收款方式列表
    };
  },
  beforeRouteEnter(to, from, next) {
    next(vm => vm.getData());
  },
  methods: {
    // 获取用户信息
    getData() {
       this.selectSkMethord()  //查询收款方式
    },
    shownewSkMethord(){
       this.sheetVisible = true;
      //  this.$router.push({name:'addSkMethord'})

    },
    showZfb(){
      this.$router.push({name:'addZfbMethord'})
    },
    showWx(){
      this.$router.push({name:'addWxMethord'})
    },
    showYhk(){
      this.$router.push({name:'addYhkMethord'})
    },
    goUpdataPage(proceeds_type,id,item){
      console.log('proceeds_type',proceeds_type)
      if(proceeds_type == 'alipay'){
        this.$router.push({name:'zfbMethod',params:{id:id}})
      }else if(proceeds_type == 'alipay'){
        this.$router.push({name:'wxMethod',params:{id:id}}) 
      }else if(proceeds_type == 'bank'){
        this.$router.push({name:'yhkMethod',params:{item:item}}) 
      }
    },
    selectSkMethord(){
       var $this = this
      this.$axios
        .post("/api/gathering/get-list", {
          access_token: '9yv8FP7oH7XdRSqXYunb1ySTAp8trd2B_1560572313'
        })
        .then(res => {
          if(res.data.code == '200'){
              // 检验成功 设置登录状态并且跳转到/
               console.log('收款方式列表',res)
               $this.mySkList = res.data.data
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
.skfs {
  width: 100%;
  height: 100%;
  overflow: auto;
  box-sizing: border-box;
}
.item-input{
    display: flex;
    height: 6vh;
    margin: 10px;
    border-bottom:1px solid #ccc;
    justify-content: space-between;
}
.item-input i{
  line-height: 30px;
  padding:2px;
}
.item-right{
    padding: 2vw 0;
    /* border-bottom: 1px solid #d6c2c2; */
    width:83%;
    display: flex;
    align-items: flex-start;
    justify-content: space-between;

}
.theIcon{
  width:5%;
  font-size: 17px;
  padding: 2vw 3vw;
}
</style>
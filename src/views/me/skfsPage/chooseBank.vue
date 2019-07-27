<template>
  <div class="chooseBank">
    <Header :isLeft="true" :title="title"/>
    <div>
        <ul>
            <li class="theItem" @click="$router.push({name:'addYhkMethord',params: {theBank: '中国工商银行'}})">
                <i class="fa fa-bandcamp" style="font-size: 17px;margin-left: 10px;"></i>
                <span style="margin-left:20px">中国工商银行</span>
            </li>
            <li class="theItem" @click="$router.push({name:'addYhkMethord',params: {theBank: '中国建设银行'}})">
                <i class="fa fa-bandcamp" style="font-size: 17px;margin-left: 10px;"></i>
                <span style="margin-left:20px">中国建设银行</span>
            </li>
            <li class="theItem" @click="$router.push({name:'addYhkMethord',params: {theBank: '招商银行'}})">
                <i class="fa fa-bandcamp" style="font-size: 17px;margin-left: 10px;"></i>
                <span style="margin-left:20px">招商银行</span>
            </li>
            <li class="theItem" @click="$router.push({name:'addYhkMethord',params: {theBank: '中国银行'}})">
                <i class="fa fa-bandcamp" style="font-size: 17px;margin-left: 10px;"></i>
                <span style="margin-left:20px">中国银行</span>
            </li>
            <li class="theItem" @click="$router.push({name:'addYhkMethord',params: {theBank: '交通银行'}})">
                <i class="fa fa-bandcamp" style="font-size: 17px;margin-left: 10px;"></i>
                <span style="margin-left:20px">交通银行</span>
            </li>
            <li class="theItem" @click="$router.push({name:'addYhkMethord',params: {theBank: '中国光大银行'}})">
                <i class="fa fa-bandcamp" style="font-size: 17px;margin-left: 10px;"></i>
                <span style="margin-left:20px">中国光大银行</span>
            </li>
            <li class="theItem" @click="$router.push({name:'addYhkMethord',params: {theBank: '中国民生银行'}})">
                <i class="fa fa-bandcamp" style="font-size: 17px;margin-left: 10px;"></i>
                <span style="margin-left:20px">中国民生银行</span>
            </li>
            <li class="theItem" @click="$router.push({name:'addYhkMethord',params: {theBank: '兴业银行'}})">
                <i class="fa fa-bandcamp" style="font-size: 17px;margin-left: 10px;"></i>
                <span style="margin-left:20px">兴业银行</span>
            </li>
            <li class="theItem" @click="$router.push({name:'addYhkMethord',params: {theBank: '北京银行'}})">
                <i class="fa fa-bandcamp" style="font-size: 17px;margin-left: 10px;"></i>
                <span style="margin-left:20px">北京银行</span>
            </li>
            <li class="theItem" @click="$router.push({name:'addYhkMethord',params: {theBank: '中国农业银行'}})">
                <i class="fa fa-bandcamp" style="font-size: 17px;margin-left: 10px;"></i>
                <span style="margin-left:20px">中国农业银行</span>
            </li>
        </ul>
    </div>
  </div>
</template>

<script>
import Header from "../../../components/Header";
export default {
  name: "chooseBank",
  data() {
    return {
        title:'请选择开户银行'
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
.chooseBank {
  width: 100%;
  height: 100%;
  overflow: auto;
  box-sizing: border-box;
}
.theItem{
  padding: 14px 5px;
  border-bottom: 1px solid #d2cece;
}
    
</style>
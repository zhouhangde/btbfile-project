<template>
  <div class="myTuijianIfram">
    <Header :isLeft="true" :title="title"/>
    <iframe id="tuijian" name="tuijian" src="" scrolling="no" height="960px" width="100%">

	</iframe>　
  </div>
</template>

<script>
import Header from "../../../components/Header";
export default {
  name: "myTuijianIfram",
  data() {
    return {
      title:'我的推荐',
      accessToken:'',
      tjsrc:''
    };
  },
  created(){
    let access_token = localStorage.getItem('access_token')
    this.accessToken = access_token
    this.tjsrc = 'http://btbfire.com/wap/invite_friends?access_token='+this.accessToken+'&os=ios&language=zh_cn HTTP/1.1'
  },
  mounted() {
  },
  components: {
    Header 
  }
};
</script>

<style  scoped>
.myTuijianIfram {
  width: 100%;
  height: 100%;
  overflow: auto;
  box-sizing: border-box;
}
</style>
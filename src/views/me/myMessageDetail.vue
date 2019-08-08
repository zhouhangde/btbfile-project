<template>
  <div class="myMessageDetail">
    <Header :isLeft="true" :title="title"/>
    <iframe id="messageDetail" name="messageDetail" :src="messagesrc" scrolling="no" height="960px" width="100%">

	  </iframe>　
  </div>
</template>

<script>
import Header from "../../components/Header";
export default {
  name: "myMessageDetail",
  data() {
    return {
      title:'公告详情',
      messagesrc:''
    };
  },
  beforeRouteEnter: (to, from, next) => {
    next(vm => vm.getData());
  },
  methods: {
    getData() {
       let gzurl = this.$route.params.gzUrl
       this.messagesrc = gzurl
    }
  },
  mounted() {
  },
  components: {
     Header
  }
};
</script>

<style scoped>
.myMessageDetail {
  width: 100%;
  height: 100%;
  overflow: auto;
  box-sizing: border-box;
}
</style>
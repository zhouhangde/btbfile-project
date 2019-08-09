<template>
  <div class="myTuijianIfram">
    <Header :isLeft="true" :title="title"/>
    <!-- scrolling="no"  -->
    <div style="-webkit-overflow-scrolling: touch;overflow-y: scroll;">  
        <iframe id="tuijian" name="tuijian" :src="tjsrc"  scrolling="auto" height="100%" width="100%" style="position:absolute;top: 40px;left: 0px;">

	      </iframe>　 
    </div>
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
    this.tjsrc = 'http://91bilong.com/wap/invite_friends?access_token='+this.accessToken+'&os=ios&language=zh_cn HTTP/1.1'
    // this.setIframeHeight()
  },
  methods: {
    // 调整ifram
    setIframeHeight(){       
         try{
            var iframe = document.getElementById('tuijian');
            if(iframe.attachEvent){
                iframe.attachEvent("onload", function(){                  
                  console.log(iframe.contentWindow.document.body.innerHTML);
                  document.getElementById("iframeInner").innerHTML=iframe.contentWindow.document.body.innerHTML;
                  return
                })
            }else{
                iframe.onload = function(){                //console.log(iframe.contentDocument.body.innerHTML);
                  document.getElementById("iframeInner").innerHTML=iframe.contentDocument.body.innerHTML;
                  return;
                }
            }
          }catch(e){
                console.warn('setIframeHeight Error');
          }
    }
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
  padding-bottom: 30px;
  box-sizing: border-box;
  background-color: #fff
}
</style>
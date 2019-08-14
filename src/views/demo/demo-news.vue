<template>
  <div class="demo-news">
  </div>
</template>

<script>
import{getRemented} from '../../util/recomm'
  
import {ERR_OK} from '../../util/config'


export default {
  name: "demo-news",
  data() {
    return {
      
    };
  },
  mounted() {
  },
  created(){
      this.getNews()
  },
  methods:{
     getNews(){
         console.log('1234213412341234324')
        getRemented().then((res)=>{
            console.log('res',res)
	      if(res.code===ERR_OK){
              console.log(res.data)
           }
        })
     }
  },
  components: {
     
  }
};
</script>

<style  scoped>
.demo-news{
  width: 100%;
  height: 100%;
  overflow: auto;
  box-sizing: border-box;
}
</style>
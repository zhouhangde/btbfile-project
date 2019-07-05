<template>
  <div class="AddOrIncreas">
    <span @click.stop="decreaseCount" class="cartbutton button-minus">
      <i class="fa fa-minus"></i>
    </span>
    <span class="cartcount">{{dataNumberr.x}}</span>
    <span @click.stop="increaseCount" class="cartbutton">
      <i class="fa fa-plus-circle"></i>
    </span>
  </div>
</template>

<script>
export default {
  name: "AddOrIncreas",
  data() {
    return {
      // theNumber: this.dataNumberr,    //默认当前点击的是综合排序，不是距离最近等
    };
  },
  props: {
    dataNumberr:Object,
    // default() {
    //   return  {count:0}
    // }
  },
  // data(){
  //     return {
  //         template: {count:0}
  //     }
  // },
  // watch: {
  //     template:{
  //         deep: true,
  //         handler(nv, ov) {
  //           console.log('xin',nv)
  //           // this.age = nv.age;
  //         } 
  //     },
  //     food:{
  //         deep: true,
  //         handler(nv1, ov1) {
  //           console.log('xin1',nv1)
  //           // this.age = nv.age;
  //         } 
  //     }
  // },
  methods: {
    decreaseCount() {
      if(this.dataNumberr.x<='0.1'){
        return
      }
       this.dataNumberr.x-=0.1;
       
    },
    increaseCount() {
      
      this.dataNumberr.x+=0.1;
    }
  }
};
</script>

<style scoped>
.cartcontroll {
  display: inline-flex;
  align-items: center;
}
.cartbutton {
  display: inline-block;
  vertical-align: middle;
}
.cartbutton i {
  color: rgb(35, 149, 255);
  vertical-align: middle;
  font-size: 1.5rem;
}
.button-minus {
  width: 4.866667vw;
  height: 4.866667vw;
  border: 1px solid rgb(35, 149, 255);
  border-radius: 50%;
  text-align: center;
}
.button-minus i {
  font-size: 1rem;
}
.cartcount {
  display: inline-block;
  text-align: center;
  color: rgba(0, 0, 0, 0.87);
  vertical-align: middle;
  font-size: 0.8rem;
  width: 6.933333vw;
  overflow: hidden;
}
</style>

<template>
  <div class="AddOrIncreas">
    <span @click.stop="decreaseCount" class="cartbutton button-minus" style="color:#999;font-size:30px;line-height:12px;">
      <!-- <i class="fa fa-minus"></i> -->
      -
    </span>
    <!-- <span class="cartcount">{{dataNumberr.x}}</span> -->
    <!-- <input type="text" class="cartcount" :value="dataNumberr.x"/>   -->
    <span class="cartcount">{{dataNumberr.x}}</span>
    <span @click.stop="increaseCount" class="cartbutton" style="color:#999;font-size:22px;line-height:14px;padding-right:5px;">
      <!-- <i class="fa fa-plus-circle"></i> -->
      +
    </span>
  </div>
</template>

<script>
export default {
  name: "AddOrIncreas",
  data() {
    return {
      // theNumber: this.dataNumberr,    //默认当前点击的是综合排序，不是距离最近等
      currentDataNumberr:this.dataNumberr
    };
  },
  props: {
    dataNumberr:Object,
    // dataNumberr:Number
    // default() {
    //   return  0
    // }
  },
  created(){
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
      // 处理js科学计数法的显示问题
      // const a = 0.00000001;
      // let result = String(a);
      // if (result.indexOf('-') >= 0) {
      //   result = '0' + String(Number(result) + 1).substr(1);
      // }

      if(this.dataNumberr.x<='0.1'){
        return
      }
       this.dataNumberr.x = Number(this.dataNumberr.x).sub(0.00000001).toFixed(8);
       
    },
    increaseCount() {
      // const a = 0.00000001;
      // let result = String(a);
      // if (result.indexOf('-') >= 0) {
      //   result = '0' + String(Number(result) + 1).substr(1);
      // }

      this.dataNumberr.x = Number(this.dataNumberr.x).add(0.00000001).toFixed(8);
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
  color:#ccc;
  vertical-align: middle;
  font-size: 1.5rem;
}
.button-minus {
  width: 4.866667vw;
  height: 4.866667vw;
  /* border: 1px solid #ccc; */
  border-radius: 50%;
  text-align: center;
  margin-top:2px;
  margin-left:5px;
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
  /* width: 6.933333vw; */
  overflow: hidden;
  line-height: 18px;
}
</style>

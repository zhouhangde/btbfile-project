<template>
  <div>
    <ul class="parent">
        <li class="pareant-item"  v-for="(item,index) in zorjdata.allData" :key="index" @click="showDetail(item)">
          <div class="pareant-item-header">
             <img src="" style="width:40px;height:40px"/>
             <div>
               <p>{{item.name}}</p>
               <p>
                <span>限额:<i class="fa fa-usd" id=mit></i></span>
                <span>{{item.money}}</span>
               </p>
               <p>
                 <span>单价</span>{{item.price}}
               </p>
             </div>
             <div> 
                 <img style="width:5px;height:5px;margin-left:5px"  v-for="(itemChild,indexitem) in item.iconArray" :key="indexitem"/>
             </div>
          </div>
          <div class="line"></div>
          <div class="pareant-item-footer">
            <div>
               <span>成交:</span>
               <span>{{item.chengjiao}}</span>
            </div>
            <div>
               <span>成交率:</span>
               <span>{{item.chengjiaolv}}</span>
            </div>
            <button class="tobug" :class="{'activetabOne':(item.item=='我要买'),'activetabTwo':(item.item=='我要卖')}" 
            >{{item.item}}</button>
          </div>
        </li>
      </ul>
     </div>
</template>

<script>
export default {
  name: "OtcTabList",
  props: {
    zorjdata: Object
  },
  created(){
    console.log('12341234124',this.zorjdata)
  },
  methods: {
    showDetail(param) {
      this.$emit("showtheDetail", {
            param: param   
      });
    }
  }
};
</script>

<style scoped>
  .parent{
     display: flex;
     flex-direction: column;
     padding: 10px;
   }
   .pareant-item{
     display: flex;
     flex-direction: column;
     padding: 10px;
     border: 1px solid #b9aaaa;
     margin: 5px 0;
   }
   .pareant-item-header{
     display: flex;
     flex-direction: row;
     align-items: center;
     justify-content: space-between;
   }
   .pareant-item-header p{
     padding: 3px;
   }
   .line{
     height: 1px;
     padding:0 3px;
     background-color: #cecdcd;
     margin-top: 10px;
   }
   .pareant-item-footer{
     display: flex;
     flex-direction: row;
     align-items: center;
     justify-content: space-between;
     padding: 10px 5px;
   }
   .tobug{
     padding: 5px;
     color: wheat;
   }
   .activetabOne{
     color:#fff;
     background-color: rgb(77,170,144);
   }
   .activetabTwo{
     background-color: #e45c5c;
   }
   #mit{
  width:15px;
  height:15px;
  color:#fff;
  text-align: center;
  border-radius: 50%;
  background-color:rgb(64,143,120);
}
</style>

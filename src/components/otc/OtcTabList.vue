<template>
  <div>
    <ul class="parent">
        <li class="pareant-item"  v-for="(item,index) in zorjdata.allData" :key="index" @click="showDetail(item)">
          <div class="pareant-item-header">
             <!-- <img :src="item.imgage" style="width:40px;height:40px"/> -->
             <!-- <img src="../../../public/image/mytitle.png"/> -->
             <img style="width:60px;height:60px;border-radius:50%;" src="../../assets/image/mytitle.png"/>
             <div>
               <p>{{item.name}}</p>
               <p>
                <span style="color:#999;">限额:<i class="fa fa-usd" id=mit></i></span>
                <span style="color:#999;">{{item.money}}</span>
               </p>
               <p style="padding-left:46px;">
                 <span>单价 <span style="font-size:18px;color:#000;font-weight:900;">{{item.price}}</span></span>
               </p>
             </div>
             <div id="we"> 
                 <i :class="itemChild.icon" style="width:19px;height:19px;margin-left:10px" v-for="(itemChild,indexitem) in item.iconArray" :key="indexitem"></i>
                 <!-- <img style="width:5px;height:5px;margin-left:5px" v-for="(itemChild,indexitem) in item.iconArray" :key="indexitem"/> -->
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
     padding: 7px;
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
#we i:nth-child(1){
  width:20px;
  height:20px;
  background:rgb(29,273,3);
  text-align: center;
  color:#fff;
  line-height: 20px;
}

#we i:nth-child(2){
  width:20px;
  height:20px;
  color:rgb(255,180,18);
  text-align: center;
  line-height: 20px;
}

#we i:nth-child(3){
  width:20px;
  height:20px;
  color:#fff;
  background-color: rgb(79,172,252);
  text-align: center;
  line-height: 20px;
}
.pareant-item-footer span{
  color:#999;
  font-size: 14px;
}
</style>

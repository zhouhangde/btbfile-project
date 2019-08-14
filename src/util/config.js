export const commonParams = {
    // type:5318,
    inCharset: 'utf-8',
    outCharset:'utf-8',
    // notice:0,
    format:'jsonp'
  }
  export const options = {
    param:'jsonpCallback'
  }
  export const ERR_OK = 0;
  
  //在自己的模块中调用 既可以看到数据
//   import{getRemented} from '../../api/recomm'
  
// import {ERR_OK} from '../../api/config'
  
//   <template>
//     <div id="app"></div>
//   </template>
  
//   <script type="text/ecmascript-6">
  
//     import{getRemented} from '../../api/recomm'
  
//     import {ERR_OK} from '../../api/config'
  
//     export default{
//         data(){
//             return{}
//         },
//         created(){
//             this._getData();
//         },
//        methods:{
//             _getData (){
//         getRemented ().then((res)=>{
//           if(res.code===ERR_OK){
//                 console.log(res.data)
//                }
//             })
//          }
//        }
//     }
  
//   </script>
  
//   <style  scoped>
  
//   #app {
  
//     font-family: 'Avenir', Helvetica, Arial, sans-serif;
  
//     -webkit-font-smoothing: antialiased;
  
//     -moz-osx-font-smoothing: grayscale;
  
//     text-align: center;
  
//     /*color: #2c3e50;*/
  
//   }
  
//   </style>
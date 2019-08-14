import jsonp from './jsonp' // jsonp.js文件地址；

import {commonParams,options}  from './config'  //把congfig.js 对象导入进来

export function getRemented(){

    const url = 'https://www.chainfor.com/news/list/flashnew/data.do' ;

    //例如我想要的地址是：https://c.y.qq.com/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg

   const data = Object.assign({},commonParams, //这些参数都是可以在network Header 下 
    { type:0,
     lastItemTimeStamp:'',
　　})
　　return jsonp(url,data,options)
}
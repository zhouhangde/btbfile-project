import originJSONP from 'jsonp'   //引用jsonp

export default function jsonp(url,data,options){

　　　　//地址判断和调用处理地址函数
　　　　url +=(url.indexOf('?')<0?'?':'&')+param(data)

　　　　//返回一个Promise
　　　　return new Promise((resolve,reject)=>{

　　　　　　originJSONP(url,options,(err,data)=>{  //用原始的jsonp调用有三个参数

　　　　　　　　if(!err){

　　　　　　　　　resolve(data)

　　　　　　　　}else{

　　　　　　　　　reject(err)

　　　　　　　　}

　　　　　　})

　　　　})

}

function param(data){
    let url = '';
  
    for(var k in data){
  
      let value = data[k]!==undefined?data[k]:'';
  
      url +=`&${k}=${encodeURIComponent(value)}`;  //地址拼接参数
    //   console.log('URL',url)
  
    }
      return url ? url.substring(1):''
  }
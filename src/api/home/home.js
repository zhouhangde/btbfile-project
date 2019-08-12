import http from '../../axios-auth'

// export function findhomeOneData (selectData) {
//     selectData = JSON.parse(selectData)
//     return axios.get('api/exchange/market', {
//       params: { 
//          access_token: selectData.access_token,
//          chain_network: selectData.main_network,
//          os: selectData.os,
//          os_ver: selectData.os_ver,
//          soft_ver: selectData.soft_ver,
//          language: selectData.language
//       }
//     }).then(function(res){
//        if(res.data.code == "200"){
//            return Promise.resolve(res.data)
//        }else{
//            alert(res.data.message);
//        }
//     }).catch(function (response) {
//            alert("服务器异常");
//     })
// }

// demo 某功能比如获取一个列表
export const getCate = params => http.post('/api/start/cate',JSON.parse(params));

//获取公告
// export function getCate (selectData) {
//     selectData = JSON.parse(selectData)
//     console.log('selectData',selectData)
//     return axios.post('/api/start/cate', {
//       params: { 
//         id: '9',
//         limit_begin:'0',
//         limit_num:'10',
//         access_token:'7LrIQJl05TYRmKR3YREtzowVAcAPqGUG_1565401426',   //可没有
//         chain_network:'chain_network',
//         os:'web',
//         os_ver:'1.0.0',
//         soft_ver:'1.0.0',
//         language:'zh_cn'
//       }
//     }).then(function(res){
//        if(res.data.code == "200"){
//            return Promise.resolve(res.data)
//        }else{
//            alert(res.data.message);
//        }
//     }).catch(function (response) {
//            alert("服务器异常");
//     })
// }


import axios from '../../axios-auth'

export function findhomeOneData (selectData) {
    selectData = JSON.parse(selectData)
    return axios.get('api/exchange/market', {
      params: { 
         access_token: selectData.access_token,
         chain_network: selectData.main_network,
         os: selectData.os,
         os_ver: selectData.os_ver,
         soft_ver: selectData.soft_ver,
         language: selectData.language
      }
    }).then(function(res){
       if(res.data.code == "200"){
           return Promise.resolve(res.data)
       }else{
           alert(res.data.message);
       }
    }).catch(function (response) {
           alert("服务器异常");
    })
}


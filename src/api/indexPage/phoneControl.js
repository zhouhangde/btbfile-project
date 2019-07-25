import axios from '../../axios-auth'

export function phoneRigst (selectData) {
    selectData = JSON.parse(selectData)
    console.log('selectData',selectData)
    return axios.post('api/register/register', {
        mobile_phone:selectData.mobile_phone,
        password:selectData.password,
        repassword:selectData.repassword,
        varcode:selectData.varcode,
        code:selectData.code
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


import http from '../../axios-auth'


//主页面的接口
// 去充值
export const getChonZhiData = params => http.post('/api/user/purchase',params);

// 查询兑换详情中的公共数据
export const selectDetail = params => http.post('/api/user/crc-bank-info',params);

//去提现
export const getTiXianData = params => http.post('/api/user/sellout',params);

//查询兑换记录
export const getDhData = params => http.post('/api/user/get-recoed',params);

//查询我新增的银行
export const getBankData = params => http.post('/api/user/get-bank',params);

//删除银行卡
export const deleteBankById = params => http.post('/api/user/delete-bank',params);

//查询我的提现余额
export const selectAviableMoney = params => http.post('/api//bargain/balance',params); 

//子页面-新增银行卡
//添加银行卡
export const addBank = params => http.post('/api/user/add-bank',params); 

//查询所有支持的银行卡
export const selectMhHelpBank = params => http.get('/api/user/get-support-bank',params); 






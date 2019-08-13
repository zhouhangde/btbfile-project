import http from '../../axios-auth'

//撤销交易委托数据
export const cancelOrder = params => http.post('/api/bargain/cancel-order',params);

//获取买和卖的交易对的可用余额
export const getBalance = params => http.post('/api/bargain/balance',params);

// 获取收藏状态
export const getXinStaus = params => http.post('/api/exchange/market',params);

// 买入
export const buyCoin = params => http.post('/api/bargain/order-limit',params);

//取消收藏
export const deleteShouc = params => http.post('/api/trade/trade-delete',params);

//添加收藏
export const addShouc = params => http.post('/api/trade/trade-add',params);

 //卖出
 export const sellerCoin = params => http.post('/api/bargain/order-limit',params);
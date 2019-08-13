import http from '../../axios-auth'

//获取公告
export const getCate = params => http.post('/api/start/cate',params);

//获取所有的币种数据
export const selectAllMarket = params => http.post('/api/exchange/market',params);

//获取轮播图片
export const getBanner = params => http.post('/api/start/start-page',params);




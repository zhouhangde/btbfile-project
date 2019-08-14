import http from '../../axios-auth'
//主页面
//获取用户详细信息
export const getUserInfo = params => http.post('/api/member/info',params);

// 实名认证-子页面
//获取实名认证的用户信息
export const getsmUserInfo = params => http.post('/api/user/user-info',params);

//获取认证信息
export const getRzInfo = params => http.post('/api/user/get-info',params);

//安全中心-子页面
//修改密码
export const updatePassword = params => http.post('/api/user/password-edit',params);

//手机号忘记密码,获取验证码
export const phoneGetYzm = params => http.post('/api/register/mobile-varcode',params);

//邮箱忘记密码，获取验证码
export const emailGetYzm = params => http.post('/api/register/mobile-varcode',params);

//手机号忘记密码，提交修改
export const updatePasswordPhone = params => http.post('/api/register/forget-password',params);

//邮箱忘记密码，提交修改
export const updatePasswordEmail = params => http.post('/api/register/mobile-varcode',params);

//我的推荐-子页面
//获取我的推荐的二维码即跳转url
export const getMytuijian = params => http.post('/api/register/recommend',params);

//我的资产 -子页面
//获取当前登录人的资产信息(暂时去掉了)
export const getMyZiChang = params => http.post('/api/user/freeze-bhb',params);

//资产获取所有的币种信息
export const getAllZiChang = params => http.post('/api/exchange/balance',params);




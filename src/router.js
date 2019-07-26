import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

const router = new Router({
  //  mode: 'history',
  mode: 'hash',  //打包設置，必須為hash，否则页面为空白
  base: process.env.BASE_URL,    //api请求的前缀地址
  linkActiveClass: 'active',   //此为表示为当前路由时，显示active样式，会动态添加的样式
  routes: [
    {
      path: '/',
      // name: 'index',
      component: () => import('./views/index.vue'),
      children: [
        {
          path: '',
          redirect: '/home'   //表示默认首页跳转的地址，重定向到/home
        },
        {
          path: '/home',
          name: 'home',
          component: () => import('./views/Home.vue')    //此为按需引入的方式
        },
        {
          path: '/hanq',
          name: 'hanq',
          component: () => import('./views/hanq.vue')
        },
        {
          path: '/jiaoyi',
          name: 'jiaoyi',
          component: () => import('./views/jiaoyi.vue')
        },
        {
          path: '/otc',
          name: 'otc',
          component: () => import('./views/otc.vue')
        },
        {
          path: '/me',
          name: 'me',
          component: () => import('./views/me.vue')
        }
      ]
    },
    // 首页点击列表进入k线图展示页面，之前的
    {
      path: '/homeKxEarchat',
      name: 'homeKxEarchat',
      component: () => import('./views/indexPage/homeKxEarchat.vue')
    },
    // 首页点击列表进入k线图展示页面,带websocket
    {
      path: '/homeKxEarchatNew',
      name: 'homeKxEarchatNew',
      component: () => import('./views/indexPage/homeKxEarchatNew.vue')
    },
    // 进入充值页面
    {
      path: '/chongz',
      name: 'chongz',
      component: () => import('./views/jiaoyi/chongz.vue')
    },
     // 进入市场页面
     {
      path: '/shichan',
      name: 'shichan',
      component: () => import('./views/jiaoyi/shichan.vue')
    },
    // 进入下单页面
    {
      path: '/showOrder',
      name: 'showOrder',
      component: () => import('./views/otc/showOrder.vue')
    },
    // 进入实名认证
    {
      path: '/myMessage',
      name: 'myMessage',
      component: () => import('./views/me/myMessage.vue')
    },
    // 进入实名认证
    {
      path: '/smrz',
      name: 'smrz',
      component: () => import('./views/me/smrzPage/smrz.vue')
    },
    // 进入个人认证详情
    {
      path: '/grrzDetail',
      name: 'grrzDetail',
      component: () => import('./views/me/smrzPage/grrzDetail.vue')
    },
    // 进入商家认证详情
    {
      path: '/sjrzDetail',
      name: 'sjrzDetail',
      component: () => import('./views/me/smrzPage/sjrzDetail.vue')
    },
    // 进入提币地址
    {
      path: '/tbdz',
      name: 'tbdz',
      component: () => import('./views/me/tbdzPage/tbdz.vue')
    },
    // 进入新增提币地址
    {
      path: '/addTbdz',
      name: 'addTbdz',
      component: () => import('./views/me/tbdzPage/addTbdz.vue')
    },
    // 进入收款方式
    {
      path: '/skfs',
      name: 'skfs',
      component: () => import('./views/me/skfsPage/skfs.vue')
    },
    // 添加收款方式
    {
      path: '/addSkMethord',
      name: 'addSkMethord',
      component: () => import('./views/me/skfsPage/addSkMethord.vue')
    },
    // 进入支付宝方式
    {
      path: '/zfbMethod',
      name: 'zfbMethod',
      component: () => import('./views/me/skfsPage/zfbMethod.vue')
    },
    // 进入微信方式
    {
      path: '/wxMethod',
      name: 'wxMethod',
      component: () => import('./views/me/skfsPage/wxMethod.vue')
    },
    // 进入安全中心
    {
      path: '/aqzx',
      name: 'aqzx',
      component: () => import('./views/me/aqzxPage/aqzx.vue')
    },
    // 进入修改密码
    {
      path: '/updatePw',
      name: 'updatePw',
      component: () => import('./views/me/aqzxPage/updatePw.vue')
    },
    // 进入忘记修改密码
    {
      path: '/forgetPw',
      name: 'forgetPw',
      component: () => import('./views/me/aqzxPage/forgetPw.vue')
    },
    // 进入谷歌验证
    {
      path: '/googleYz',
      name: 'googleYz',
      component: () => import('./views/me/aqzxPage/googleYz.vue')
    },
    // 进入我的推荐
    {
      path: '/mytj',
      name: 'mytj',
      component: () => import('./views/me/mytjPage/mytj.vue')
    },
    // 进入OTC交易平台
    {
      path: '/otcJi',
      name: 'otcJi',
      component: () => import('./views/me/otcJiPage/otcJi.vue')
    },
    // 进入OTC交易平台中的订单
    {
      path: '/orderDetail',
      name: 'orderDetail',
      component: () => import('./views/me/otcJiPage/orderDetail.vue')
    },
    // 进入OTC交易平台中的申诉页面
    {
      path: '/shensu',
      name: 'shensu',
      component: () => import('./views/me/otcJiPage/shensu.vue')
    },
    // 进入我的资产
    {
      path: '/myzc',
      name: 'myzc',
      component: () => import('./views/me/myzcPage/myzc.vue')
    },
    // 进入我的资产详情
    {
      path: '/myzcDetail',
      name: 'myzcDetail',
      component: () => import('./views/me/myzcPage/myzcDetail.vue')
    },
      // 进入我的资产提现
    {
      path: '/myzctx',
      name: 'myzctx',
      component: () => import('./views/me/myzcPage/myzctx.vue')
    },
      // 进入我的资产充值
    {
      path: '/myzccz',
      name: 'myzccz',
      component: () => import('./views/me/myzcPage/myzccz.vue')
    },
    // 进入转账明细
    {
      path: '/zzmx',
      name: 'zzmx',
      component: () => import('./views/me/zzmxPage/zzmx.vue')
    },
    // 进入设置
    {
      path: '/setting',
      name: 'setting',
      component: () => import('./views/me/settingPage/setting.vue')
    },
    // 进入设置的多页面选择
    {
      path: '/moreLanuge',
      name: 'moreLanuge',
      component: () => import('./views/me/settingPage/moreLanuge.vue')
    },
    // 进入关于我们
    {
      path: '/aboutMe',
      name: 'aboutMe',
      component: () => import('./views/me/aboutMePage/aboutMe.vue')
    },
    // 进入关于我们-公司简介
    {
      path: '/gsjjDetail',
      name: 'gsjjDetail',
      component: () => import('./views/me/aboutMePage/gsjjDetail.vue')
    },
    // 进入关于我们-用户协议
    {
      path: '/yhxyDetail',
      name: 'yhxyDetail',
      component: () => import('./views/me/aboutMePage/yhxyDetail.vue')
    },
    // 进入关于我们-隐私政策
    {
      path: '/yszcDetail',
      name: 'yszcDetail',
      component: () => import('./views/me/aboutMePage/yszcDetail.vue')
    },
    // 进入关于我们-服务热线
    {
      path: '/fwrxDetail',
      name: 'fwrxDetail',
      component: () => import('./views/me/aboutMePage/fwrxDetail.vue')
    },
    // 进入手机注册
    {
      path: '/phoneRigst',
      name: 'phoneRigst',
      component: () => import('./views/indexPage/phoneRigst.vue')
    },
    // 进入邮箱注册
    {
      path: '/emailRigst',
      name: 'emailRigst',
      component: () => import('./views/indexPage/emailRigst.vue')
    },
    // 进入手机登陆
    {
      path: '/phoneLogin',
      name: 'phoneLogin',
      component: () => import('./views/indexPage/phoneLogin.vue')
    },
    // 进入手机登陆
    {
      path: '/emailLogin',
      name: 'emailLogin',
      component: () => import('./views/indexPage/emailLogin.vue')
    },
    // 进入手机忘记密码
    {
      path: '/phoneForget',
      name: 'phoneForget',
      component: () => import('./views/indexPage/phoneForget.vue')
    },
    // 进入邮箱忘记密码
    {
      path: '/emailForget',
      name: 'emailForget',
      component: () => import('./views/indexPage/emailForget.vue')
    },
    // 进入socket
    {
      path: '/websocket',
      name: 'websocket',
      component: () => import('./views/websocket.vue')
    }
  ]
});
// 路由守卫（注意当有此方法时会默认进入此方法，不会进入下一步，不用时应该注释）
router.beforeEach((to, from, next) => {
   // 判断当前是否登录
  const isLogin = localStorage.access_token ? true : false;
  next();
  // if (to.path == '/phoneLogin') {
  //   next();
  // }else {
  //   // 是否在登录状态下
  //   isLogin ? next() : next('/phoneLogin');
  // }
});

export default router;

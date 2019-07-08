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
    // 进入充值页面
    {
      path: '/chongz',
      name: 'chongz',
      component: () => import('./views/jiaoyi/chongz.vue')
    },
    // 进入下单页面
    {
      path: '/showOrder',
      name: 'showOrder',
      component: () => import('./views/otc/showOrder.vue')
    },
    // 进入实名认证
    {
      path: '/smrz',
      name: 'smrz',
      component: () => import('./views/me/smrz.vue')
    }
  ]
});
// 路由守卫（注意当有此方法时会默认进入此方法，不会进入下一步，不用时应该注释）
// router.beforeEach((to, from, next) => {

// });

export default router;

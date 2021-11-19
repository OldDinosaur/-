import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    redirect: "/main/homepage",
  },
  {
    path: '/home',
    component: Home

  },
  //注册
  {
    path: '/register',
    name: 'register',
    component: () => import(/* webpackChunkName: "about" */ '../views/register.vue')
  },
  // 登录
  {
    path: '/login',
    name: 'login',
    component: () => import(/* webpackChunkName: "about" */ '../views/login.vue'),
  },
  //找回密码
  {
    path: '/retrievePassword',
    name: 'retrievePassword',
    component: () => import(/* webpackChunkName: "about" */ '../views/retrievePassword.vue')
  },
  //邮箱验证码
  {
    path: '/checkValidCode',
    name: 'checkValidCode',
    component: () => import(/* webpackChunkName: "about" */ '../views/checkValidCode.vue'),
    // meta:{}
    //独享路由守卫
    // beforeEnter: (to, from, next) => {
    //   // ...
    // }
  },
  //商品主页
  {
    path: '/main',
    name: 'main',

    component: () => import(/* webpackChunkName: "about" */ '../views/main.vue'),


    children: [
      // 主页
      {
        path: 'homepage',
        name: 'homepage',
        component: () => import(/* webpackChunkName: "about" */ '../views/mainSon/homepage.vue'),
      },
      // 商品菜单
      {
        path: 'shopmenu',
        name: 'shopmenu',
        component: () => import(/* webpackChunkName: "about" */ '../views/mainSon/shopmenu.vue'),
      },
      // 购物车
      {
        path: 'shopbag',
        name: 'shopbag',
        component: () => import(/* webpackChunkName: "about" */ '../views/mainSon/shopbag.vue'),
      },
      //我的
      {
        path: 'my',
        name: 'my',
        meta: {
          show: true
        },

        component: () => import(/* webpackChunkName: "about" */ '../views/mainSon/my.vue'),
        children: [
          {
            path: 'myorder',
            name: 'myorder',
            meta: {
              show: false
            },
            component: () => import(/* webpackChunkName: "about" */ '../views/my/myOrder.vue'),
          },
          {
            path: 'mycollect',
            name: 'mycollect',
            meta: {
              show: false
            },
            component: () => import(/* webpackChunkName: "about" */ '../views/my/myCollect.vue'),
          },
          {
            path: 'myaddress',
            name: 'myaddress',
            meta: {
              show: false
            },
            component: () => import(/* webpackChunkName: "about" */ '../views/my/myAddress.vue'),
          },
          //账号管理
          {
            path: 'myAccount',
            name: 'myAccount',
            meta: {
              show: false
            },
            component: () => import(/* webpackChunkName: "about" */ '../views/my/myAccount.vue'),
          },
          //安全中心
          {
            path: 'safetyCenter',
            name: 'safetyCenter',
            meta: {
              show: false
            },
            component: () => import(/* webpackChunkName: "about" */ '../views/my/safetyCenter.vue'),
          }
        ]
      },

    ]
  },

  //商品详情页
  {
    path: '/goodsDetali/:pid',
    name: 'goodsDetali',
    component: () => import(/* webpackChunkName: "about" */ '../views/detali/goodsDetali.vue'),
  },

  //提交订单结算前页面
  {
    path: '/orderBalance',
    name: 'orderBalance',
    component: () => import(/* webpackChunkName: "about" */ '../views/order/orderBalance.vue'),

  },
  //新增地址页面
  {
    path: '/addAddress',
    name: 'addAddress',
    component: () => import(/* webpackChunkName: "about" */ '../views/my/addAddress.vue'),

  },
  //地址修改
  {
    path: '/addressedit/:aid',
    name: 'addressedit',
    component: () => import(/* webpackChunkName: "about" */ '../views/my/addressEdit.vue'),
  },

]

const router = new VueRouter({
  mode: 'hash',
  routes,
})
//配置全局前置路由守卫（权限控制）  可在每个路由的meta属性中配置验证数据
// router.beforeEach((to, from, next) => {
//   console.log(to, from);
//   next()
// })
//后置路由守卫（权限控制）
// router.afterEach((to, from) => {

// })
export default router

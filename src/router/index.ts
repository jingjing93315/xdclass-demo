import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: '/',
    redirect: 'login',
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../components/Login/login.vue'),
  },
  {
    path: '/home',
    name: 'Home',
    component: () => import('../components/Home/home.vue'),
    redirect: 'homeTop',
    children: [
      {
        path: '/homeTop',
        name: 'HomeTop',
        component: () => import('../components/Home/components/top.vue'),
      },
      {
        path: '/shopCart',
        name: 'ShopCart',
        component: () => import('../components/Shop/shopcart.vue'),
      },
    ],
  },
]

const router = createRouter({
  // history: createWebHistory(process.env.BASE_URL),
  history: createWebHashHistory(process.env.BASE_URL),
  routes,
})

// 路由导航守卫

router.beforeEach((to, from, next) => {
  const token = window.sessionStorage.getItem('token')
  if (to.path == '/login') {
    next()
  } else {
    if (token) {
      next()
    } else {
      next('login')
    }
  }
})

export default router

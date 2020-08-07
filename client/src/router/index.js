import Vue from 'vue'
import VueRouter from 'vue-router'
// import testTimeOut from '../timeOut'

// 引入vuex
import store from '@/store';

Vue.use(VueRouter)

  const routes = [
  // {
  //   path: '/',
  //   redirect: '/index',
  //   component: () => import( '../views/index.vue')
  // },
  {
    path: '/',
    name:'Home',
    component: () => import( '../views/index.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import( '../views/login.vue')
  },
  {
    path: '/forget',
    name: 'Forget',
    component: () => import( '../views/forget.vue')
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import( '../views/register.vue')
  },
  {
    path: '/itemList',
    name: 'ItemList',
    component: () => import( '../views/itemList.vue')
  },
  {
    path: '/uploadFile',
    name: 'UploadFile',
    component: () => import( '../views/upload.vue')
  },
  {
    path: '/test',
    name: 'Test',
    component: () => import( '../views/test.vue')
  },
  {
    path: '/registerByAdmin',
    name: 'registerByAdmin',
    component: () => import( '../views/registerByAdmin.vue')
  }
]

const router = new VueRouter({
  routes
})

// 实现路由守卫
router.beforeEach((to,form, next)=>{
  const isAuth = store.state.isauthenticated  
  const islogin = localStorage.eleToken? true: false;
  if (to.path=="/login" || to.path =="/register"|| to.path =="/forget"|| to.path =="/registerByAdmin"){
    next();
  }else{
    islogin? next():next("/login")
  }
})


export default router

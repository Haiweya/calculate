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
  }
]

const router = new VueRouter({
  routes
})

// 实现路由守卫
router.beforeEach((to,form, next)=>{
  //isAuth 是把登陆状态存储在全局变量中，页面刷新程序从新跑，这个数据就不在了，
  // 如果用此作为登陆与否的判定条件，用户一刷新就要从新登陆，肯定是不行的哈。
  const isAuth = store.state.isauthenticated  
  const islogin = localStorage.eleToken? true: false;
  if (to.path=="/login" || to.path =="/register"|| to.path =="/forget"){
    next();
  }else{
    islogin? next():next("/login")
  }
})


export default router

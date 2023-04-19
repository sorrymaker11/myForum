import Vue from 'vue'
import VueRouter from 'vue-router'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import store from '@/store/index';

Vue.use(VueRouter)

const routes = [
  {
    path: '/', 
    name: 'home',
    component: () => import(/* webpackChunkName: "home_articleList" */ '../views/HomeView.vue'),
    redirect: '/index',
    children: [
      {
        path: '/index',
        name: 'index',
        component: () => import(/* webpackChunkName: "home_articleList" */ '../views/ArticleList.vue'),
        props: (route) => ({
          columnId: route.query.columnId
        })
      },
      {
        path: '/column',
        name: 'column',
        component: () => import(/* webpackChunkName: "column" */ '../views/ColumnsView.vue'),
        meta: {
          requireAuth: true
        }
      },
      {
        path: '/article/:id',
        name: 'article',
        component: () => import(/* webpackChunkName: "article" */ '../views/ArticleView.vue')
      },
      {
        path: '/editor',
        name: 'editor',
        component: () => import(/* webpackChunkName: "editor" */ '../views/EditorView.vue'),
        props: (route) => ({
          columnId: route.query.columnId
        })
      },
      {
        path: '/user',
        name: 'user',
        component: () => import(/* webpackChunkName: "user" */ '../views/UserInfo.vue'),
        meta: {
          requireAuth: true
        }
      },
      {
        path: '/chat',
        name: 'chat',
        component: () => import(/* webpackChunkName: "socket" */ '../views/Socket.vue')
      },
    ]
  },
  // 移动端
  {
    path: '/m',
    name: 'mHome',
    component: () => import(/* webpackChunkName: "mHome_mArticle" */ '../mviews/MHomeView.vue'),
    redirect: '/m/articles',
    children:[
      {
        path:'articles',
        name:'mArticleList',
        meta:{
          headType:'SearchBar'
        },
        component: () => import(/* webpackChunkName: "mHome_mArticle" */ '../mviews/ArticleList.vue')
      },
      {
        path:'article/:id',
        name:'mArticle',
        props:true,
        meta:{
          headType:'NavBar',
          title:'文章'
        },
        component: () => import(/* webpackChunkName: "mArticle" */ '../mviews/ArticleView.vue')
      },
      {
        path:'user',
        name:'mUser',
        meta:{
          headType:'NavBar',
          title:'我的'
        },
        component: () => import(/* webpackChunkName: "mUser" */ '../mviews/UserView.vue'),
        props: (route) => ({
          state: route.query.state
        })
      },
      {
        path:'column',
        name:'mColumn',
        meta:{
          headType:'NavBar',
          title:'分类'
        },
        component: () => import(/* webpackChunkName: "mColumn" */ '../mviews/ColumnView.vue')
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  NProgress.inc()
  let useAuth = to.meta.requireAuth
  if (useAuth && !store.state.token) {
    Vue.prototype.$notify({
      title: '警告',
      message: '请先登录',
      type: 'warning'
    });
    NProgress.done()
    next(from.fullPath)
    return
  }
  next()
})

router.afterEach(() => {
  NProgress.done()
})
export default router

import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const routers = [
  {
    path: '/',
    name: 'root',
    redirect: '/home',
    component: () => import('../layout/index.vue'),
    children: [
      {
        path: '/home',
        name: 'Home',
        component: () => import('../views/home/index.vue'),
        meta: {
          title: '首页',
          showHeader: true,
          icon: 'nav-home'
        }
      },
      {
        path: '/article/:articleId',
        name: 'Article',
        props: true,
        hidden: true,
        component: () => import('../views/article/index.vue'),
        meta: {
          title: '文章'
        }
      },
      {
        path: '/tag/:tag',
        name: 'Tag',
        props: true,
        hidden: true,
        component: () => import('../views/tag/index.vue'),
        meta: {
          title: '标签'
        }
      },
      {
        path: '/register',
        name: 'Register',
        hidden: true,
        component: () => import('../views/register/index.vue'),
        meta: {
          title: '注册'
        }
      },
      {
        path: '/registerResult',
        name: 'RegisterResult',
        hidden: true,
        component: () => import('../views/register/result.vue'),
        meta: {
          title: '注册结果'
        }
      },
      {
        path: '/archived',
        name: 'Archived',
        component: () => import('../views/archived/index.vue'),
        meta: {
          title: '归档',
          icon: 'nav-archived'
        }
      },
      {
        path: '/about',
        name: 'About',
        component: () => import('../views/about/index.vue'),
        meta: {
          title: '关于',
          icon: 'nav-about'
        }
      },
      {
        path: '/friendLink',
        name: 'FriendLink',
        component: () => import('../views/friendLink/index.vue'),
        meta: {
          title: '友链',
          icon: 'nav-friendLink'
        }
      }
    ]
  },
  {
    path: '/github_login',
    name: 'github_login',
    component: () => import('../views/login/github_login.vue'),
    meta: {
      title: '第三方登录'
    }
  },
  {
    path: '*',
    component: () => import('../views/error/404.vue'),
    meta: {
      title: '404'
    }
  }
]

export default new Router({
  mode: process.env.NODE_ENV === 'development' ? 'hash' : 'history',
  scrollBehavior(to, from, savedPosition) { // return 期望滚动到哪个的位置
    if (savedPosition) {
      return savedPosition
    } else {
      return { x: 0, y: 0 }
    }
  },
  routes: routers
})

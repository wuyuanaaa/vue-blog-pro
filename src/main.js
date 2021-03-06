import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import ElementUI from 'element-ui'

import 'lib-flexible'

import 'normalize.css'
import './styles/index.less'

import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style

import './day'

// import Message from './components/Message'

import './icons'

import imgMore from '@/directives/imgMore' // 图片优化自定义指令

Vue.use(imgMore)

Vue.use(ElementUI, {
  size: 'small' // 设置 element-ui 默认尺寸
})

// Vue.prototype.$Message = Message
Vue.config.productionTip = false

router.beforeEach((to, from, next) => {
  NProgress.start()
  if (to.meta.title) {
    document.title = to.meta.title + ' · 博客 | 吴予安'
  }
  next()
})

router.afterEach((to, from) => {
  // finish progress bar
  NProgress.done()
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')


import '@/assets/css/global.styl'
import '@wangeditor/editor/dist/css/style.css'
import 'github-markdown-css'
import 'animate.css'
import 'vant/lib/index.css';

import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// import _ from 'lodash'

import '@/plugins/vant.js'
// Vue.prototype.$vantNotify=Vant.Notify
import '@/plugins/element.js'
import '@/plugins/http'
import '@/plugins/vuescroll'

Vue.config.productionTip = false
Vue.prototype.$EventBus=new Vue()
// Vue.prototype._=_
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

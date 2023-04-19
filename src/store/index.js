import Vue from 'vue'
import Vuex from 'vuex'
import router from '../router'
import store from 'store'
import base from '@/config/base.config'
import http from '@/api/http'
import _isMobile from '@/util/isMobile'

import modal from './modules/modal'
import likes from './modules/like'
import { io } from 'socket.io-client';

const { TOKEN_NAME } = base
Vue.use(Vuex)
let actMe = false
export default new Vuex.Store({
  state: {
    token: store.get(TOKEN_NAME) || '',
    userInfo: {},
    authorInfo: {},
    live2dDis: false
  },
  getters: {
    userInfo(state) {
      if (state.token) {
        let hasAuthor = !!(Object.keys(state.authorInfo).length)
        return hasAuthor ? state.authorInfo : state.userInfo
      }
    }
  },
  mutations: {
    RIGHT_LIVE2D_DIS(state, isRight) {
      state.live2dDis = isRight
    },
    CANECLE_TOKEN(state) {
      state.token = ''
      store.remove(TOKEN_NAME)
    },
    SET_TOKEN(state) {
      state.token = store.get(TOKEN_NAME)
    },
    SET_USERINFO(state, userInfo) {
      userInfo.article = userInfo.article.slice(0, 5)
      state.userInfo = userInfo
    },
    SET_AUTHORINFO(state, authorInfo) {
      state.authorInfo = authorInfo
    },
    CLEAN_AUTHORINFO(state) {
      state.authorInfo = {}
    }
  },
  actions: {
    async login({ dispatch, commit }) {
      commit('SET_TOKEN')
      dispatch('getUserInfo')
    },
    async logout({ commit }) {
      actMe = true
      Vue.prototype.$ws?.close()
      commit('CANECLE_TOKEN')
    },
    async online({ commit, getters }) {
      console.log(router.app._route.name)
      let will=router.app._route.name==='article'
      Vue.prototype.$ws = io(process.env.VUE_APP_USER_CHAT_PATH, { transports: ['websocket'] })
      let { _id, nickname } = getters.userInfo
      Vue.prototype.$ws.emit('online', { uid: _id, nickname,will })
      Vue.prototype.$ws.on('disconnect', () => {
        Vue.prototype.$ws = null;
        let message = `再见${nickname}`
        // 被顶了
        if (!actMe) {
          message = `账号已在其他设备登录`
        }
        Vue.prototype.$notify.success({
          title: '退出登录',
          message
        });
        actMe = false
        commit('CANECLE_TOKEN')
      })
    },
    async getUserInfo({ commit, dispatch },online=false) {
      try {
        let userInfo = await http({ type: 'getUserInfo' })
        if(!_isMobile()){
          Vue.prototype.$notify.success({
            title: '登录成功',
            message: `欢迎${userInfo.nickname}`
          });
        }
        commit('SET_USERINFO', userInfo)
        // if (router.app._route.name !== 'index') {
        //   router.push('/index')
        // }
        online&&dispatch('online')
      } catch (err) {
        store.remove(TOKEN_NAME)
        console.log(err)
      }
    }
  },
  modules: {
    modal, likes
  }
})

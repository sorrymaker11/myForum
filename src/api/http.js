import service from "./common";
import vuex from '@/store/index'
import store from "store";
import API_LIST from '@/config/api.config';
import base from '@/config/base.config';
import encrypt from '@/util/encrypt';
const { TOKEN_NAME } = base

export default async function Http({ type, data }) {
  if (!(type in API_LIST)) {
    throw new Error('API请求错误')
  }
  let { url, method, noMessage = false, rest = false, rsaKey = false, setToken = false } = API_LIST[type]
  try {
    method = method.toLowerCase();

    if (rest) {
      let restData = url.match(/:(.*)$/)[1]
      url = url.replace(/:(.*)$/, data[restData])
    }

    if (rsaKey && data[rsaKey]) {
      data[rsaKey] = await encrypt(data[rsaKey])
    }

    data = method === 'get' ? { params: data } : data

    let result = await service[method](url, data)

    if (setToken) {
      let token = result.token
      let uid = result.userId
      store.set('uid', uid)
      store.set(TOKEN_NAME, token)
      vuex.dispatch('login')
    }
    return result
  } catch (err) {
    if (err.response) {
      let message = err.response.data.message
      if (!noMessage) {
        this.$notify.error({
          title: '错误',
          message
        });
      }
    }
    return Promise.reject(err)

  }
}
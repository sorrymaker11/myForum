import axios from "axios";
import store from "store";
import base from '@/config/base.config';

const { TIMEOUT, TOKEN_NAME}=base
const service = axios.create({
    baseURL: process.env.VUE_APP_BASE_URL,
    timeout: TIMEOUT
})

service.interceptors.request.use(async (config) => {

    let token = `${store.get(TOKEN_NAME)}`;
    if (token) {
        config.headers['Authorization'] = `Bearer ${token}`
    }
    return config
}, (error) => {
    return Promise.reject(error);
});
// 添加响应拦截器
service.interceptors.response.use((response) => {
    //剥离最外层
    let result = response.data
    return result?.data;
}, (error) => {
    console.dir(error)
    return Promise.reject(error);
});

export default service
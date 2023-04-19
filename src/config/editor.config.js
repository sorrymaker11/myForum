
import store from '@/store/index';
// const URL = 'http://127.0.0.1:3000/upload/article'
const MENU_CONF={
    server: process.env.VUE_APP_FILE_UPLOAD_PATH,
    // form-data fieldName ，默认值 'wangeditor-uploaded-image'
    // fieldName: 'your-custom-name',

    // 单个文件的最大体积限制，默认为 2M
    maxFileSize: 1 * 1024 * 1024, // 1M

    // 最多可上传几个文件，默认为 100
    maxNumberOfFiles: 5,

    // 选择文件时的类型限制，默认为 ['image/*'] 。如不想限制，则设置为 []
    allowedFileTypes: ['image/*'],

    // 自定义上传参数，例如传递验证的 token 等。参数会被添加到 formData 中，一起上传到服务端。
    // meta: {
    //     token: 'xxx',
    //     otherKey: 'yyy'
    // },

    // 将 meta 拼接到 url 参数中，默认 false
    metaWithUrl: false,

    // 自定义增加 http  header
    headers:{'Authorization': `Bearer ${store.state.token}`},
 
    // 跨域是否传递 cookie ，默认为 false
    // withCredentials: true,

    // 超时时间，默认为 10 秒
    timeout: 5 * 1000, // 5 秒
}
export default MENU_CONF
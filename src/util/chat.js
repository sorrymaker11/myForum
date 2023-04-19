
import {io} from 'socket.io-client';
const CHAT_PATH=process.env.VUE_APP_USER_CHAT_PATH
/*
    服务端
    logout 登出 nickname
    logged 登入 nickname
    chat   聊天信息广播
    {
      name:用户名,
      msg:信息,
      time:时间
    }
    客户端
    login 登录 nickname
    disconnect 退出
    send  发送消息

    {
        nickname,type:'msg|action',dis:'left|right',time:''
    }
    昵称：日期+msg
*/ 
export default class Chat{
    constructor({url=CHAT_PATH}){
        this.serve=io(url,{ transports: ['websocket'] })
        this.msgList=[]
    }
    async serverEventAgent(){
        this.server.on('logout',async (nickname)=>{
            
        })
    }
    logout(){

    }
    clientEventAgent(){
        return{
        }
    }
    login(){

    }
    disconnect(){

    }
    send(){

    }
}
<template>
  <div class="blog-chat">
    <div class="blog-chat--content">
      <div class="blog-chat--item"
           :class="chat.dis"
           v-for="chat in chatList"
           :key="chat.id">

        <span v-if="chat.nickname"
              class="blog-chat--nickname">{{chat.nickname}}</span>
        <div class="blog-chat--box">
          <span class="blog-chat--time"
                v-if="chat.time">{{chat.time}}</span>
          <p class="blog-chat--msg"
             v-if="chat.msg">{{chat.msg}}</p>
        </div>
      </div>
    </div>
    <div class="blog-chat--bottom">
      <el-input v-model="sendMsg"
                placeholder="请输入内容" 
                @keydown.native.enter="sendChat"></el-input>
      <el-button type="primary"
                 icon='el-icon-finished'
                 @click="sendChat"
                 >发送消息</el-button>

    </div>

    <el-dialog title="欢迎聊天"
               :visible="dialogVisible"
               width="30%"
               :show-close="false">
      输入昵称:
      <el-input v-model="nickname"> </el-input>
      <span slot="footer"
            class="dialog-footer">
        <el-button type="primary"
                   @click="enterChat">确 定</el-button>
        <el-button type="info" @click="$router.push('/index')">取消</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import formatDate from '@/core/formatDate'
import {io} from 'socket.io-client';
let idx=0
export default {
    name: 'WorkspaceJsonSocket',

    data() {
        return {
            sendMsg: '',
            chatList: [],
            nickname: '',
            uid:'',
            ws: null,
            dialogVisible: true
        };
    },
    created() {
        this.$store.commit('RIGHT_LIVE2D_DIS',true)
        if(this.$ws){
            this.ws = this.$ws
            this.getUserInfo()
            console.log(this.uid);
            this.ws.emit('enterChat',{uid:this.uid,nickname:this.nickname})
            this.dialogVisible=false
        }else{
            this.ws=io(process.env.VUE_APP_USER_CHAT_PATH, { transports: ['websocket'] })
        }
        this.ws.on('chat',(data)=>{
            this.serverChat(data)
        })
        this.ws.on('logout',({nickname,id})=>{
            if(this.uid===id){
                return
            }
            this.serverLog({nickname,isLogin:false})
        })
        this.ws.on('logged',({nickname,id})=>{
            if(this.uid===id){
                return
            }
            this.serverLog({nickname,isLogin:true})
        })
    },
    beforeDestroy(){
        this.$store.commit('RIGHT_LIVE2D_DIS',false)
        //关闭socket
        this.ws.emit('leaveChat')
    },
    methods: {
        getUserInfo(){
            let {nickname,_id}=this.$store.getters.userInfo
            console.log(_id);
            this.nickname=nickname
            this.uid=_id
        }, 
        enterChat(){
            this.ws.emit('enterChat',{nickname:this.nickname})
            this.dialogVisible=false;
        },
        addChat({type='msg',msg='',nickname=this.nickname,time=formatDate(),isMe=false}){
            let dis='left'
            if(type==='action'){
                dis='center',nickname=null
            }
            if (isMe) {
                dis = 'right'
            }
            this.chatList.push({
                type,msg,nickname,time,isMe,dis,id:++idx
            })
        },
        sendChat(){
            let msg=this.sendMsg
            this.addChat({
                isMe:true,
                msg,
                nickname:this.nickname
            })
            this.ws.emit('send',msg)
            this.sendMsg=''
        },
        serverChat({msg='',nickname='无名者',time='',id=''}){
            if(this.uid===id){
                this.addChat({
                    isMe:true,
                    msg,
                    nickname:this.nickname
                })
                return
            }
            this.addChat({
                nickname,msg,time
            })
        },
        serverLog({nickname='xxxx',isLogin}){
            let state=isLogin?'进入':'离开'
            let msg=`${nickname}${state}了聊天室`
            this.addChat({
                type:'action',msg
            })
        },
        submitEditor () {
            this.ws.emit('send', this.sendMsg)
        }
    },
};
</script>

<style lang="stylus" >
.blog-chat
  display flex
  flex-direction column
  justify-content space-between
  width 90%
  background-color #fff
  box-shadow 0 0 30px rgba(0, 0, 0, 0.8) inset
  height 80vh
.blog-chat--item
  display flex
  flex-direction row
  justify-content center
.blog-chat--item.left
  justify-content flex-start
.blog-chat--item.right
  justify-content flex-start
  flex-direction row-reverse
.blog-chat--bottom
  display flex
  background-color #fff
  padding 20px
</style>
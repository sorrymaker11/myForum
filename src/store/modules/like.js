import store from 'store'
import base from '@/config/base.config'
import Vue from 'vue'
const {LIKES_NAME}=base
export default ({
    // 当前用户的点赞文章列表
    namespaced:true,
    state: {
        likes:store.get(LIKES_NAME)||[]
    },
    getters: {
        isLike:state=>(aid)=>{
            return !!(state.likes.includes(aid))
        }
    },
    mutations: {
        CHANGE_LIKES(state){
            state.likes=store.get(LIKES_NAME)
        }
    },
    actions: {
        pushLike({commit},payload){
            let {aid}=payload
            if(aid){
                let localLikes=store.get(LIKES_NAME)||[]
                let idx=localLikes.indexOf(aid)
                if(idx===-1){
                    localLikes.push(aid)
                }
                store.set(LIKES_NAME,localLikes)
                commit('CHANGE_LIKES')
            }
        },
        pullLike({commit},payload){
            let {aid}=payload
            console.log(aid)
            if(aid){
                let localLikes=store.get(LIKES_NAME)||[]
                let idx=localLikes.indexOf(aid)
                if(idx!==-1){
                    localLikes.splice(idx,1)
                }
                store.set(LIKES_NAME,localLikes)
                commit('CHANGE_LIKES')
            }
        },
        async sendLikes({},{aid}){
            await Vue.prototype.$api({type:'articleLikes',data:{id:aid}})
        }
    },
    modules: {
    }
})
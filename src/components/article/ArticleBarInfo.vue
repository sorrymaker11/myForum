<template>
<div class="blog-article--info">
    <div class="blog-article--head" v-if="info.nickname">
        <div class="blog-article--avatar">
            <img :src="info.avatar" alt="">
        </div>
        <div class="blog-article--msg">
            <span class="blog-info--item">
            作者:{{info.nickname}}
            </span>
            <span class="blog-info--item">
            <i class="el-icon-time"></i> {{info.date}}
            </span>
        </div>
    </div>
    <div class="hidden-xs-only">
        <span class="blog-info--item" @click="like">
            <i class="el-icon-star-on blog-info-like" 
            :class="{active:isLike}"></i> {{likenNum}}
        </span>
        <span class="blog-info--item">
            <i class="el-icon-view"></i> {{info.hit_num}}
        </span>
        <span class="blog-info--item">
            <i class="el-icon-chat-dot-round"></i> {{info.comment_num}}
        </span>
    </div>
</div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex';
const {mapGetters,mapActions}=createNamespacedHelpers('likes')
export default {
    name: 'ArticleBarInfo',
    props:{
        info:{
            type:Object
        },
        id:{
            type:String
        }
    },
    data() {
        return {
            likeStep:0
        };
    },
    created(){
        this.isInitLike=this.isLike
    },
    computed:{
        likenNum(){
            let step=this.isLike?0:0
            return Math.max(0,this.info.like_num+this.isInitLike+step)
        },
        isLike(){
            return this.localLike(this.id)
        },
        ...mapGetters({
            localLike:'isLike'
        })
    },
    mounted() {
    },

    methods: {
        like(){
            this.likeStep+=this.isLike?-1:1
            // this.isLike=!this.isLike
            this[this.isLike?'pullLike':'pushLike']({aid:this.id})
            this.sendLikes({aid:this.id})
        },
        
      ...mapActions(['pullLike','pushLike','sendLikes'])
    }
};
</script>

<style lang="stylus">
.blog-info-like.active
    color  red
</style>
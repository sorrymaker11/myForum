<template>
    <li class="blog-comment--item">
        <div class="blog-comment--user blog-line blog-line--row">
            <div class="blog-comment--avatar">
                <img :src="uid.avatar" alt="">
                <span class="blog-comment--name">{{uid.nickname}}</span>
            </div>
            <p class="blog-comment--date">{{date.slice(0,10)}}</p>
        </div>
        <p class="blog-comment--content">{{content}}</p>
    </li>
</template>

<script>
export default {
    name: 'CommentItem',
    props:{
        user:{
            type:Object
        },
        content:{
            type:String
        },
        date:{
            type:String
        },
        uid:{
            type:Object
        }
    },
    data() {
        return {
            
        };
    },

    mounted() {
        
    },

    methods: {
        
    },
};
</script>

<style lang="stylus">
@import '~assets/css/base.styl';

.blog-comment--item
    padding padding-space 0

.blog-comment--user
    display: flex
    align-items:  center
    justify-content: space-between
    padding padding-space 0 

.blog-comment--avatar
    display flex
    align-items: center
    img
        height: 24px
        width 24px
        height: auto
        border-radius: 50%
    
.blog-comment--name
    padding-top:6px
    padding-left: padding-space
    color:#222

.blog-comment--content
    // padding: 20px 0
    word-wrap: break-word
    word-break: break-word
    color: #666
    overflow hidden

.blog-comment--date
    font-size: 14px;
    color: #8a919f;
    line-height: 22px;

</style>
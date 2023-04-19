<template>
<div>
    <van-tabbar route v-if="$route.name!=='mArticle'">
        <van-tabbar-item icon="home-o" :to="{name:'mArticleList'}">首页</van-tabbar-item>
        <van-tabbar-item icon="search" :to="{name:'mColumn'}">分类</van-tabbar-item>
        <van-tabbar-item icon="user-o" :to="{name:'mUser'}">我的</van-tabbar-item>
    </van-tabbar>
    <van-tabbar v-else class="blogm-article-bottom--bar">
        <van-tabbar-item>
            <van-field readonly
                        @click="clickInput('comment')"
                        placeholder="输入评论..." />
        </van-tabbar-item>
        <van-tabbar-item icon="bars" @click="clickInput('list')"></van-tabbar-item>
        <van-tabbar-item icon="comment-o" ></van-tabbar-item>
        <van-tabbar-item icon="good-job-o" ></van-tabbar-item>
    </van-tabbar>
</div>
</template>
<script>
export default {
    name: 'ArticleList',

    data() {
        return {
            
        };
    },

    mounted() {
        
    },

    methods: {
        clickInput(type){
            this.$EventBus.$emit('show-comment-action',type)
        }
    },
};
</script>

<style lang="stylus">
.blogm-article-bottom--bar
    border-top: 1px solid #DCDEE0
    .van-field
        padding: 4px
        border-radius: 4px
        background-color: #F2F3F5
        div
            height: 100%
    .van-tabbar-item__icon
        margin: 0
    &>div:nth-child(n+1)
        flex: auto
</style>
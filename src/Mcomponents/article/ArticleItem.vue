<template>
    <van-card class="blogm-item--wrap"
              :thumb="article.cover">
        <template #title>
            <h3 class="blogm-item--title">{{ article.title }}</h3>
        </template>
        <template #desc>
            <p class="blogm-item--content"><span class="van-multi-ellipsis--l2 ">{{ content }}</span></p>
        </template>
        <template #tags>
            <van-tag plain type="primary"><van-icon name="manager" />{{article.author.nickname}}</van-tag>
            <van-tag plain type="primary"><van-icon name="column" />{{article.column.name}}</van-tag>
        </template>
        <template #num>
            <p> 
                <i class="el-icon-time"></i>
                {{article.date.slice(0,11)}}
            </p>
        </template>
        <template #price>
            <p class="blogm-item--tags">
                <van-icon name="eye-o" /><span>({{article.hit_num}})</span>
                <van-icon name="good-job-o" /><span>({{article.like_num}})</span>
                <van-icon name="comment-o" /><span>({{article.comment_num}})</span>
            </p>
        </template>
    </van-card>
</template>

<script>
export default {
    name: 'ArticleItem',
    props:{
        article:{
            type:Object
        }
    },
    data() {
        return {
            
        };
    },

    computed:{
        content(){
            let content = this.article.content.replace(/<(\/)?[^<>]+>/g,'')
            return content || '默认内容'
        }
    },

    methods: {
        
    },
};
</script>


<style lang="stylus">
.blogm-item--wrap
    margin-top: 2px
    p
        margin: 0
        padding 4px 2px
    .blogm-item--content
        padding 4px 0 14px
.blogm-item--title
    margin 0
    font-size: 1.2em
.blogm-item--tags
    display flex
    align-items: center
    i
        font-size: 1.2em
</style>
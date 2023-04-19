<template>
    <article class="blog-article--item">
    <!-- <li class="blog-content--item"> -->
        <div class="blog-article--content">
            <div class="blog-item--left">
                <div class="blog-item--msg">
                    <span class="blog-item--author blog-border-right"><i class="el-icon-s-custom"></i>{{article.author.nickname}}</span>
                    <span class="blog-item--date blog-border-right">
                        <i class="el-icon-time"></i>
                        {{article.date}}
                    </span>
                    <span>{{article.column.name}}</span>
                </div>
                <div class="blog-item--content">
                    <h3 class="blog-item--title">{{article.title}}</h3>
                    <p class="blog-item--desc">
                        {{content}}
                    </p>
                </div>
                <p class="blog-item--tags">
                    <span class="blog-tags--hit"><i class="el-icon-view"></i>:({{article.hit_num}})</span>
                    <span class="blog-tags--like">点赞:({{article.like_num}})</span>
                    <span class="blog-tags--comment"><i class="el-icon-chat-dot-square"></i>({{article.comment_num}})</span>
                </p>
            </div>
        </div>
        <div class="blog-item--cover" v-if="article.cover">
            <img class="blog-item--illu" :src="article.cover" alt="">
        </div>
    </article>
</template>

<script>
export default {
    name: 'CardArticleItem',
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
    mounted() {
        
    },

    methods: {
        
    },
};
</script>

<style lang="stylus">
@import '~assets/css/base.styl';
.blog-article--item
    display: flex
    justify-content: space-between
    padding:  padding-space * 1.5
    background-color: #fff
    border-bottom: 2px solid line-modifier-color
    font-size: 13px;
    &:first-child
        border-top-left-radius:  radius-theme-size*2
        border-top-right-radius:  radius-theme-size*2
    &:last-child
        border-bottom-left-radius:  radius-theme-size*2
        border-bottom-right-radius:  radius-theme-size*2
    .blog-article--content
        display: flex
        justify-content: space-between
        align-items: center
        width: calc(100% - 100px)
    .blog-item--msg
        display: flex
        align-items: center
        color: #8a919f
        span
            padding: 0 6px
        .blog-border-right
            border-right 1px solid #DCDFE6
.blog-item--left
    width: 100%
.blog-content-never
    display flex
    flex-direction: column
    justify-content: center
    align-items: center
    height 600px

.blog-item--btn
    margin-top:padding-space
    padding padding-space padding-space*3
    border: 1px solid bg-modifier-color

.blog-item--title
    font-weight: 700;
    font-size: 16px;
    line-height: 24px;
    color: #1d2129;
    margin: 8px 0;
    display: -webkit-box;
    overflow: hidden;
    text-overflow: ellipsis;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 1;
    padding-left: 6px

.blog-item--illu
    width: auto
    height: 100px
    padding: padding-space

.blog-item--date
    padding: padding-space*1 0

.blog-item--desc
    font-weight: 400;
    line-height: 22px;
    color: #86909c;
    display: -webkit-box;
    overflow: hidden;
    text-overflow: ellipsis;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    padding-left:6px 

.blog-item--tags
    display: flex
    padding:0 6px
    color  lighten(font-theme-color,60%)
    line-height: 20px;
.blog-tags--like,
.blog-tags--comment
    padding: 0 padding-space
    &:hover 
        color  lighten(font-theme-color,20%)
</style>
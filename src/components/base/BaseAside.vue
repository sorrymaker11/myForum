<template>
    <el-aside width="100%">
        <el-card class="box-card blog-aside">
            <div class="blog-avatar">
                <img class="blog-avatar--pic" :src="userInfo.avatar" alt="">
            </div>
            <div class="blog-info">
                <h3 id="route-name" class="blog-avatar--nickname">{{userInfo.nickname}}</h3>

                <div class="blog-info--state">
                    <div class="blog-state--item blog-line--col">
                        <a href="#">
                            <span class="blog-staate--count">{{userInfo.articleCount}}</span>
                            <span class="blog-state--name">文章</span>
                        </a>
                    </div>
                    <div class="blog-state--item">
                        <a href="#">
                            <span class="blog-staate--count">{{userInfo.columnCount}}</span>
                            <span class="blog-state--name">分类</span>
                        </a>
                    </div>
                </div>
            </div>

            <p class="blog-info--content">{{userInfo.signature}}</p>

            <div id="blog-user-article--list">
                <h3>最近文章</h3>
                <el-menu class="blog-user-article--item">
                    <el-menu-item v-for="(item,index) in userInfo.article" 
                                :key="item._id" :index="index+''" 
                                @click="goNewTag(item._id)">
                        <span slot="title">{{item.title}}<i class="el-icon-view blog-side_article--icon">{{item.hit_num}}</i> </span>
                    </el-menu-item>
                </el-menu>
            </div>
      
        </el-card>
    </el-aside>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
    name: 'BaseAside',

    data() {
        return {
        };
    },
    computed:{
        ...mapGetters(['userInfo'])
    },
    mounted() {
        
    },

    methods: {
        goNewTag(id){
            window.open(`/#/article/${id}`,'_blank')
        }
    },
};
</script>

<style lang="stylus" >
@import '~assets/css/base.styl';
.blog-aside
    margin: 0 auto
    text-align: center
    width 80%
    max-width: 240px
    
.blog-avatar
    overflow hidden
    width:100px;
    border-radius 50%
    margin: 0 auto
    .blog-avatar--pic
        width 100%
        height auto 

.blog-info 
    padding-top: padding-space *2

.blog-info--nickname
    font-size: 24px
    padding:0 0 padding-space

.blog-info--state
    display: flex
    justify-content: center
    padding: padding-space padding-space *2

.blog-state--item
    padding 0 padding-space *1.5

.blog-state--item span
    display: block

.blog-state--count
    color: font-theme-color
    font-weight: 700

.blog-state--name
    color: font-modifier-color

.blog-info--content
    padding-top: padding-space
    text-align: left
    text-indent: 2em
    font-size: font-size-p
    color: font-theme-color
#blog-user-article--list
    span .blog-side_article--icon
        margin: 0 2px
        width: auto
        font-size 12px ;
    .el-menu-item, .el-submenu__title
        padding: 4px
        height: auto
        line-height: normal
        text-align: left 
    // .el-menu-item, .el-submenu__title
// slide end
</style>
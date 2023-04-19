<template>
    <el-card>
        <div class="blog-comment">
            <div class="blog-comment--list">
                <h3>全部评论</h3>
                
                <ul v-if="comments?.length" >
                    <CommentItem  v-for="comment in comments"    
                                :key="comment.id"
                                :uid="comment.uid"
                                :content="comment.content"
                                :date="comment.date"/>
                </ul>
                <div class="blog-comment--item" 
                    v-else>
                    <p class="blog-comment--content">暂时没有评论,快来评论吧</p>
                </div>
            </div>
        </div>
    </el-card>
</template>

<script>
import CommentItem from '@/components/comment/CommentItem';
export default {
    name: 'CommentList',
    components:{
        CommentItem
    },
    props:{
        comments:{
            type:Array
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
.blog-comment
    padding 40px 50px
    font-size 16px
    background-color #fff
    border-radius: radius-theme-size
    margin-top: padding-space*2
    font-size: 14px
    line-height: 24px
    h3
        color: #252933
        line-height: 30px;
        font-weight: 600;
        font-size: 18px;
        padding-bottom 8px



.blog-comment--list
    background-color #fff
    padding-top: 40px

</style>
<template>
    <div class="blogm-article--comment">
        <h3 style="padding:20px 0 4px 16px; margin: 0;background-color: #fff;">评论列表</h3>
        <van-cell-group v-if="hasComment">
            <div class="blogm-article--padline"
                v-for="comment in comments"
                :key="comment.id">
                <van-cell center
                    :icon="comment.uid.avatar"
                    :title="comment.uid.nickname"
                    :value="comment.date.slice(0,10)"/>
                <van-cell
                    :value="comment.content"/>
            </div>
        </van-cell-group>
        <van-cell-group v-else>
            <van-empty description="暂无评论" />
        </van-cell-group>
    </div>
</template>

<script>
export default {
    name: 'ArticleComment',
    props:{
        comments:{
            type:Array
        },
    },
    data() {
        return {
            
        };
    },
    computed:{
        hasComment(){
            console.log(this.comments?.length);
            return !!this.comments?.length
        }
    },
    mounted(){
        
    },

    methods: {
        
    },
};
</script>

<style lang="stylus">
.blogm-article--padline
    border-bottom: 2px solid #f1f1f1
    .van-cell
     padding 6px 16px
    .van-icon
        display flex
        align-items: center
        img
            width 20px
            height auto
            border-radius: 50%
</style>
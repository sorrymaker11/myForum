<template>
    <el-card>
        <div class="blog-comment--editor">
            <h3>评论</h3>
            <div class="blog-comment_input--wrap">
                <textarea ref='textarea'                        
                      class="blog-comment--input"
                      v-model="commentVal"
                      name="comment" 
                      autofocus
                      placeholder="请输入评论"></textarea>
            </div>
        <el-button type="primary" @click="submitComment">提交评论</el-button>
        </div>
    </el-card>
</template>

<script>
export default {
    name: 'CommentTextArea',
    inject:['getArticleById'],
    props:{
        aid:{
            type:String
        }
    },
    data() {
        return {
            commentVal:''
        };
    },

    mounted() {
        this.$EventBus.$on('foucsTextarea',()=>{
            this.focusTextarea()
        })
    },

    methods: {
        focusTextarea(){
            this.$refs.textarea?.focus()
        },
        async submitComment(){
            if(this.commentVal.trim().length===0){
                this.$notify.info({
                    title:'评论不能为空'
                })
                this.focusTextarea()
                return
            }
            try {
                await this.$api({type:'postComment',data:{aid:this.aid,content:this.commentVal}})
                this.$notify.success({
                    title:'评论成功'
                })
                // 接收 provide 下来的方法，在发评论之后查询评论进行更新
                this.getArticleById()
            } catch (err) {
                console.log(err);
                this.$notify.error({
                    title:'评论失败',
                    message:err.message
                })
            }
            this.commentVal=''
        }
    },
};
</script>

<style lang="stylus">
.blog-comment--editor
    display: flex
    flex-direction: column
    align-items: center
    h3  
        padding: 6px 0
        width: 100%;
        text-align: left
        font-size: 18px;
        line-height: 30px;
        font-weight: 600;
        color: #252933;
.blog-comment_input--wrap
    width: 100%
    .blog-comment--input
        padding: 10px
        background-color #F2F3F5
        height: 120px
        width: calc(100% - 20px)
        border: none
        resize: both;
        &:focus
            border:1px solid #1e80ff 
            background-color: #fff
</style>
<template>
    <div class="blogm-article--wrap">
        <ArticleContent :article="article" v-if="article.content" ref="articleContent"/>
        <ArticleComment :comments="article.comments"/>
        <van-action-sheet v-model="show" 
                            :title="title" >
            <div class="blogm-action--content"
                v-if="actionType==='comment'">
                <van-field
                ref="commentInput"
                v-model="comment"
                rows="2"
                :autosize=" { maxHeight: 150, minHeight: 80 }"
                type="textarea"
                maxlength="50"
                placeholder="输入评论..."
                show-word-limit
                />
                <van-button type="info"
                            @click="onSubmit"
                            block>提交评论</van-button>
            </div>
            <van-cell-group v-else>
                <van-empty description="无标题" v-if="catalogList.length===0"/>
                <van-cell v-for="(catalog,index) in catalogList"
                          :key="index" :title="catalog.name" 
                          @click="scrollGo(catalog.scroll)"/>
            </van-cell-group>
        </van-action-sheet>
    </div>
</template>

<script>
import ArticleContent from '@/Mcomponents/article/ArticleContent';
import ArticleComment from '@/Mcomponents/article/ArticleComment';
import { Notify } from 'vant';
export default {
    name: 'ArticleView',
    provide(){
        return{
            catalogList:this.catalogList
        }
    },
    components:{
        ArticleContent,ArticleComment
    },
    data() {
        return {
            id:'',
            article:{},
            show:false,
            title:'评论',
            comment:'',
            actionType:'comment',
            catalogList:[]
        };
    },

    created() {
        this.id=this.$route.params.id
        this.getArticleById()
        this.$EventBus.$on('show-comment-action',this.actionHandlerMap)
    },
    beforeDestroy(){
        this.$EventBus.$off('show-comment-action',this.actionHandlerMap)
    },
    methods: {
        async getArticleById(){
            try {
                this.article=await this.$api({type:'getArticleById',data:{id:this.id}})
                this.article.author.article=this.article.author.article.slice(0,5)
                this.$store.commit('SET_AUTHORINFO',this.article.author)
                // let likeUser=this.article?.like_users
                // let uid=this.$store.getters.userInfo?._id
                // let aid=this.article?.id
                // if(likeUser?.includes(uid)){
                //     this.pushLike({aid});
                // }
            } catch (err) {
                Notify({
                type: "danger",
                message: '获取失败',
                })
            }
        },
        actionHandlerMap(type){
            this.actionType=type
            if(type==='comment'){
                this.showCommentAction()
            }else{
                this.showListAction()
            }
        },
        showListAction(){
            this.title='标题导航'
            this.show=true
        },
        showCommentAction(type){
            if (!this.$store.state.token) {
                Notify({ type: 'warning', message: '请先登录' })
                this.$EventBus.$emit('dialog-show', 'login')
                return false
            }
            this.title='评论'
            this.show=true
            this.$nextTick(this.$refs['commentInput']?.focus)
        },
        async onSubmit(){
            if(!(this.comment.trim().length>0)){
                Notify({ type: 'warning', message: '请输入评论内容' })
                return false
            }
            try {
                await this.$api({ type: 'postComment', data: { aid: this.id, content: this.comment } })
                Notify({
                type: "success",
                message: '评论成功',
                })
            } catch (err) {
                Notify({
                type: "danger",
                message: '评论失败',
                })
            }
            this.resetComment()
        },
        resetComment () {
            this.showComment = false
            this.comment = ''
        },
        scrollGo(scroll){
            this.$parent.$refs.wrap.scrollTo({top:scroll})
        }
    },
};
</script>

<style lang="stylus" >
.blogm-action--content
    .van-field__body
        background-color: #F2F3F5
</style>
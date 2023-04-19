<template>
    <div v-if="article.id">
        <ArticleContent :article="article"/>
        <CommentTextArea :aid="article.id" />
        <CommentList :comments="article.comments"/>
    </div>
</template>

<script>
import ArticleContent from '@/components/article/ArticleContent';
import CommentTextArea from '@/components/comment/CommentTextArea';
import CommentList from '@/components/comment/CommentList';
import { createNamespacedHelpers } from 'vuex';
const {mapActions}=createNamespacedHelpers('likes')
export default {
    name: 'ArticleView',
    components:{
        ArticleContent,CommentList,CommentTextArea
    },
    provide(){
        return{
            getArticleById:this.getArticleById
        }
    },
    data() {
        return {
            id:'',
            article:{},
        };
    },
    created(){
        this.id=this.$route.params.id
        this.getArticleById()
    },
    mounted() {
        
    },

    methods: {
        async getArticleById(){
            try {
                this.article=await this.$api({type:'getArticleById',data:{id:this.id}})
                this.article.author.article=this.article.author.article.slice(0,5)
                this.$store.commit('SET_AUTHORINFO',this.article.author)
                let likeUser=this.article?.like_users
                let uid=this.$store.getters.userInfo?._id
                let aid=this.article?.id
                if(likeUser?.includes(uid)){
                    this.pushLike({aid});
                }
            } catch (err) {
                console.log(err);
            }
        },
        ...mapActions(['pushLike','sendLikes']) 
    },
    beforeDestroy(){
        this.$store.commit('CLEAN_AUTHORINFO');
    } 
};
</script>

<style lang="stylus">
.blog-main--card
    width: 80%;
</style>
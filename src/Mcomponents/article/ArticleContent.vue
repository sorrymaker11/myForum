<template>
<div class="blogm-article">
    <h1 class="blogm-article--title">{{ article.title }}</h1>
    <ArticleBarInfo :info="info" :id="article.id"/>
    <div class="markdown-body blogm-article--content"
            ref="content"
            v-once
            v-html="content"></div>
</div> 
</template>

<script>
import ArticleBarInfo from '@/Mcomponents/article/ArticleBarInfo.vue'
import Prism from "prismjs";
export default {
    name: 'ArticleContent',
    inject:['catalogList'],
    components:{
        ArticleBarInfo
    },
    props:{
        article:{
            type:Object,
            default:()=>{
                return{
                    title:'默认标题',
                    date:'2023/4/3',
                    like_num:0,
                    hit_num:0,
                    comment_num:0,
                    content:''
                }
            }
        }
    },
    data() {
        return {
            
        };
    },
    computed:{
        info(){
            let {like_num,hit_num,comment_num,date}=this.article;
            return{
                like_num,hit_num,comment_num,date,nickname:this.article.author?.nickname,avatar:this.article.author?.avatar
            }
        },
        content(){
          let content=this.article.content
          content=content?.replace(/pre/g,`pre class="line-numbers"`)
          return content
        },
        isLike(){
          let likeUser=this.article?.like_users
          let uid=this.$store.getters.userInfo?._id
          return likeUser?.includes(uid)
        }
    },
    mounted() {
      Prism.highlightAll()
      let h1List=this.$refs.content.querySelectorAll('h1')
      for(let h1 of h1List){
        let scroll=h1.offsetTop
        this.catalogList.push({name:h1.innerText,scroll})
      }
    },

    methods: {
        
    },
};
</script>

<style lang="stylus">
.blogm-article--title
  padding-bottom 0.3em
  margin 0.67em 0 0.2em
  line-height 1.25
  border-bottom 1px solid #eaecef
  font-weight 600
  font-size 2em
.blogm-article
  background-color #fff
  padding 8px
</style>
<template>
<el-card>
    <div class="blog-article markdown-body">
        <h1 class="blog-article--title">{{article.title}}</h1>
        <ArticleBarInfo :info="info" :id="article.id"/>
        <div class="blog-article--content"
             ref="content"
             v-once
             v-html="content"></div>
    </div>
</el-card>
</template>

<script>
import ArticleBarInfo from '@/components/article/ArticleBarInfo'
import Prism from "prismjs";
export default {
    name: 'BaseArticleContent',
    inject:['catalogList','cleanCatalog'],
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
    watch:{
      content(){
        this.$nextTick(() => {
          Prism.highlightAll()
        })
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
    beforeDestroy(){
      // this.catalogList=[]  不能直接赋空值，因为inject是用的引用地址，直接赋值后引用地址变了，没有关系了
      this.cleanCatalog()
    }
};
</script>

<style lang="stylus">
@import '~assets/css/base.styl';
.blog-article
  padding 16px
  font-size rem(14)
  background-color: #fff
  border-radius radius-theme-size

.blog-article--title
  margin: -2rem 0 1.667rem;
  font-size: 42px;
  font-weight: 600;
  line-height: 1.31 !important;
  color: #252933;

.blog-article--info
  padding padding-space*2
  background-color #f7f8fc
  display flex
  justify-content space-between
  color #999
  @media screen and (max-width:768px) 
    flex-direction: column
    height: 120px
  .blog-article--head
    display: flex
    align-items: center
    img
      width: 40px
      height 40px
      border-radius: 50%
  .blog-article--msg
    display: flex
    flex-direction: column


.blog-info--item
  padding 0 6px

.blog-article--content
  padding padding-space*2 0
  pre[class*="language-"]
    border: none
    font-family: monospace,monospace;
    
.blog-article 
  img 
    display block
    width 50%
    margin 10px auto
  .eleImg
    display: inline
    vertical-align: sub;
    width: auto;
    position: relative;
    top: 1px;
    height: 20px;
    margin: 0 2px;
.__view
  width 100%

</style>
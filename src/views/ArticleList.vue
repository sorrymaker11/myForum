<template>
<transition enter-active-class="animate__animated animate__fadeIn"
            appear
            mode="out-in">
    <div class="blog-article--list">
        <div class="blog-article--wrap"
             v-if="articles.length">
                <el-card v-for="item in articles" 
                        :key="item.id">
                    <router-link :to="{name:'article',params:{id:item.id}}" target="_blank" >
                        <ArticleItem :article="item"/>
                    </router-link>
                </el-card>
        </div>
        <article class="blog-content--item blog-content-never"
                 v-else>
            <h3 class="blog-item--title blog-none--title">很遗憾，没有找到相对应的文章</h3>
            <el-button type="primary" 
                       class="blog-item--btn"
                       @click="routeEditor">去写一篇吧</el-button>
            <!-- data-column-id="{{columnID}}" -->
        </article>
    </div>
</transition>
</template>

<script>
import ArticleItem from '../components/article/ArticleItem';
export default {
    name: 'ArticleList',
    inject:['changeLoading'],
    components:{
        ArticleItem
    },
    props:{
        loading:{
            type:Boolean
        },
        columnId:{
            type:String
        }
    },
    data() {
        return {
            articles:[],
            size:10,
            page:1,
            q:undefined
        };
    },
    created(){
        this.getArticles()
    },
    mounted() {
        this.$EventBus.$on('activeSearch',(q)=>{
            this.q=q||undefined
            this.resetArticle()
            this.getArticles()
        })  
    },
    watch:{
        loading(load){
            if(load){
                this?.getArticles()
            }
        }
    },
    methods: {
        resetArticle(){
            this.articles=[]
            this.page=1
        },
        routeEditor(){
            let columnId=this.columnId
            this.$router.push({name:'editor',query:{columnId}})
        },
        getQuery () {
            let column = this?.columnId
            let q = this?.q
            let query = JSON.parse(JSON.stringify({
                column,q
            })) 
            return query
        },
        getArticles(){
            let data = { size: this.size, page: this.page }
            let query = this.getQuery()
            if (Object.entries(query).length > 0) {
                data.query = JSON.stringify(query)
            }
            this.$api({type:'articles',data}).then(res=>{
                this.articles.push(...res.list) 
                this.page++
                if(this.page>res.pages){
                    return 
                }
                this.changeLoading(false)
            }).catch(err=>{
                this.$notify.error({
                    title:'获取失败',
                    message:err.message
                })
                this.changeLoading(false)
            })
        },
        goNewTag(id){
            window.open(`/#/article/${id}`,'_blank')
        }
    },
};
</script>

<style lang="stylus">
.blog-article--list
    height: 100%
.blog-article--wrap
    overflow hidden
    height: 100%
.blog-none--title
    margin-bottom: 40px
</style>
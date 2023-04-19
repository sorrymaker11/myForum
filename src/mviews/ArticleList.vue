<template>
<div class="blogm-list">
    <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
        <van-list v-model="loading"
                :finished="finished"
                finished-text="没有更多了"
                offset="100"
                error-text="请求错误，请稍后重试"
                @load="onLoad">
            <router-link v-for="(item) in articleList"
                        :key="item.id"
                        :to="{name:'mArticle',params:{id:item.id}}">
                <ArticleItem :article="item" />
            </router-link>
        </van-list>
    </van-pull-refresh>
</div>
</template>

<script>
import ArticleItem from '@/Mcomponents/article/ArticleItem.vue';
export default {
    name: 'ArticleList',
    components:{
        ArticleItem
    },
    props:{
        columnId:{
            type:String
        }
    },
    data() {
        return {
            size:10,
            page:1,
            loading:false,
            finished:false,
            refreshing:false,
            articleList:[],
            q:null,
            columnArticleCache:{}
        };
    },
    mounted(){
        this.$EventBus.$on('search-article',this.searchArticle)
    },
    beforeDestroy(){
        this.$EventBus.$off('search-article',this.searchArticle)
    },
    watch:{
        columnId(newId){
            console.log(this.columnArticleCache[newId]);
            if(newId?.trim().length===0){
                return false
            }
            if(this.columnArticleCache[newId]){
                this.articleList=this.columnArticleCache[newId]
                return
            }
            this.refreshing=true
            this.onRefresh()
        }
    },
    methods: {
        searchArticle(q){
            this.q=q||undefined
            this.refreshing=true
            this.onRefresh()
        },
        onRefresh(){
            this.resetParams()
            this.onLoad()
        },
        onLoad(){
            this.getArticles()
        },
        resetParams(){
            this.page=1
            this.loading=true
            this.finished=false
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
                if(this.refreshing){
                    this.articleList=[];
                    this.refreshing=false
                }
                if(this.page>res.pages){
                    this.finished=true
                    return 
                }
                this.articleList.push(...res.list)
                this.cacheColumnList()
                this.loading=false
            }).catch(err=>err)
        },
        cacheColumnList(){
            console.log(this.columnId)
            if(this.columnId){
                this.columnArticleCache[this.columnId]=JSON.parse(JSON.stringify(this.articleList))
            }
        }
    },
};
</script>

<style lang="stylus">
.blogm-item--title
    font-size: 1.2em
</style>
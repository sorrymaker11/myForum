<template>
    <div class="blog-column-words">
        <WordCloud
            :data="columnWords"
            nameKey="name"
            :fontSize="[30,80]"
            valueKey="value"
            :color="['#1f77b4', '#629fc9', '#94bedb', '#c9e0ef']"
            :showTooltip="false"
            :wordClick="wordClickHandler">
        </WordCloud>
    </div>
</template>

<script>
import WordCloud from 'vue-wordcloud'
export default {
    name: 'ColumnsView',
    components:{
        WordCloud
    },
    data() {
        return {
            columns:[]
        };
    },
    created(){
        this.getColumns()
    },
    computed:{
        columnWords(){
            return this.columns?.map(item=>{
                return{
                    name:item.name,
                    value:item.aids.length,
                    id:item.id
                }
            })
        }
    },
    mounted() {
        this.$EventBus.$on('updateView',this.getColumns)
    },
    methods: {
        wordClickHandler(name) {
            let columnId=this.columns.find(item=>{
                return item.name===name
            })?._id
            this.$router.push({name:'index',query:{columnId}})
        },
        async getColumns(){
            try {
                let columns=await this.$api({type:'columns'})
                this.columns=columns.list
                console.log(this.columns);
            } catch (err) {
                console.log(err);
            }
        }
    },
};
</script>

<style lang="stylus">

</style>
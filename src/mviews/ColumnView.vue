<template>
    <div>
    <van-sticky :offset-top="45">
        <van-tabs v-model="columnType"
                  @change="onChangeType">
            <van-tab v-for="column in columnList" 
                     :key="column.id"
                     :title="column.name"
                     :name="`${column._id}`">{{column.id}}</van-tab>
        </van-tabs>
    </van-sticky>
    <ArticleList v-if="columnType"
                :columnId="columnType"/>
    </div>
</template>

<script>
import ArticleList from '@/mviews/ArticleList.vue'
export default {
    name: 'ColumView',
    components:{
        ArticleList
    },
    data() {
        return {
            columnType:'',
            columnList:[]
        };
    },
    created(){
        this.getColumns()
    },
    mounted() {
        
    },

    methods: {
        onChangeType(){
        }, 
        async getColumns(){
            try {
                let result=await this.$api({type:'columns'})
                this.columnList=result.list
                this.columnType = this.columnList[0]._id
            } catch (err) {
                return err
            }
        }
    },
};
</script>

<style lang="scss" scoped>

</style>
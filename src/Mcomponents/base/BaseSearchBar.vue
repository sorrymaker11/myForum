<template>
    <van-search  v-model="searchVal"
        show-action
        placeholder="请输入搜索关键词"
        shape="round"
        @search="onSearch"
        >
        <template #action>
            <div @click="onSearch">搜索</div>
        </template>
    </van-search>
</template>

<script>
let time=null
export default {
    name: 'BaseSearchBar',
    data() {
        return {
            searchVal:''
        };
    },

    mounted() {
        
    },

    methods: {
        onFocus(){
        },
        onSearch(){
            this.$EventBus.$emit('search-article',this.searchVal)
            this.searchVal=''
        }
    },
};
</script>

<style lang="stylus">
</style>
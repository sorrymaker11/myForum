<template>
    <div class="blogm-header">
        <component :is="headType" :title="title"></component>
    </div>
</template>

<script>
import NavBar from '@/Mcomponents/base/BaseNavBar';
import SearchBar from '@/Mcomponents/base/BaseSearchBar';
export default {
    name: 'HeaderView',
    components:{
        SearchBar,NavBar
    },
    data() {
        return {
            headType:'SearchBar',
            title:''
        };
    },

    mounted() {
        
    },
    watch:{
        $route(to){
            let {headType,title}=to?.meta
            this.headType=headType
            this.title=title
        }
    },
    methods: {
    },
};
</script>

<style lang="stylus">

</style>
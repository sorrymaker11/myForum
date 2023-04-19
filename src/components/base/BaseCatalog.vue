<template>
    <el-card class="blog-catalog--wrap">
        <h3><i class="el-icon-document"></i> 目录</h3>
        <el-menu
            default-active="0"
            class="el-menu-vertical-demo">
            <el-menu-item v-for="(catalog,index) in catalogList"
                        :key="catalog.scroll"
                        :index="index+''"
                        @click="scrollTocatalog(catalog.scroll)">
                <span slot="title">{{catalog.name}}</span>
            </el-menu-item>
        </el-menu>
    </el-card>
</template>

<script>
export default {
    name: 'BaseCatalog',
    props:['catalogList','scrollTocatalog'],
    data() {
        return {
            
        };
    },

    mounted() {
        
    },

    methods: {
        
    },
};
</script>

<style lang="stylus">
.blog-catalog--wrap
    width: 80%
    margin: 10px auto
    background-color: #fff
    h3  
        position relative
        padding: 6px
        &::after
            position absolute
            bottom 0
            left: 0
            content:''
            width: 100%
            height: 1px
            background-color: #dcdfe6
    .el-menu
        border none
.el-menu-item
    span
        display: inline-block
        width: 100%
        overflow hidden
        text-overflow: ellipsis
</style>
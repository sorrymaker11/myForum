<template>
    <div class="blog-header--avatar blog-header--login" v-if="src">
        <el-avatar :size="'medium'" :src="src" @click.native="$router.push('/user')"></el-avatar>
        <svg t="1681126564579" class="icon logout-icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2609" width="16" height="16"
        @click="logout"><path d="M835.669333 554.666667h-473.173333A42.453333 42.453333 0 0 1 320 512a42.666667 42.666667 0 0 1 42.474667-42.666667h473.173333l-161.813333-161.834666a42.666667 42.666667 0 0 1 60.330666-60.330667l234.666667 234.666667a42.666667 42.666667 0 0 1 0 60.330666l-234.666667 234.666667a42.666667 42.666667 0 0 1-60.330666-60.330667L835.669333 554.666667zM554.666667 42.666667a42.666667 42.666667 0 1 1 0 85.333333H149.525333C137.578667 128 128 137.578667 128 149.482667v725.034666C128 886.4 137.6 896 149.525333 896H554.666667a42.666667 42.666667 0 1 1 0 85.333333H149.525333A106.816 106.816 0 0 1 42.666667 874.517333V149.482667A106.773333 106.773333 0 0 1 149.525333 42.666667H554.666667z" p-id="2610" fill="#8a8a8a"></path></svg>
    </div>
</template>

<script>
import {mapActions} from 'vuex'
export default {
    name: 'UserImgAvatar',
    data() {
        return {
            
        };
    },

    mounted() {
        
    },
    computed:{
        src(){
            return this.$store.getters.userInfo.avatar
        }
    },
    methods: {
        // logout(){

        // },
        ...mapActions(['logout'])
    },
};
</script>

<style lang="stylus">
.blog-header--avatar
    span,svg
        cursor pointer
.blog-avatar--img
    overflow hidden
    width: 50px
    height: 50px
    border-radius: 50%
.logout-icon
    margin-left: 10px
</style>
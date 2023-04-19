<template>
    
    <el-row class="blog-head--warp"
                type="flex"
                justify="flex-wrap"
                align="center">
        <el-col :span="4"
                :xs="{span:24}"
                class="blog-logo--wrap">
            <router-link :to="'/index'"
                         tag="div"
                         class="blog-logo">
                <img class="blog-logo--pic"
                    style="width: 50px; height: 50px"
                    :src="require('@/assets/img/favicon.png')"
                    fit="cover">
            </router-link>
        </el-col>
        <el-col class="hidden-xs-only"
                :span="10">
            <el-menu ref="navMenu"
                class="blog-menu"
                mode="horizontal"
                default-active="/index"
                router>
            <el-menu-item index="/index">首页</el-menu-item>
            <el-menu-item index="/column">分类</el-menu-item>
            <!-- <el-menu-item index="/article">文章</el-menu-item> -->
            <el-menu-item index="/album">相册</el-menu-item>
            <el-menu-item index="/chat">聊天</el-menu-item>
            <el-submenu index="/">
                <template #title>外链</template>
                <el-menu-item index="https://github.com/sorrymaker11">Github</el-menu-item>
            </el-submenu>
            </el-menu>
        </el-col>
        <el-col :span="5"
                class="hidden-xs-only blog-search" > 
            <el-input class="blog-input--search"
                placeholder="请输入关键词" 
                v-model="searchVal"
                @keydown.native.enter="activeSearch">
                <i slot="suffix" class="el-input__icon el-icon-search" style="cursor:pointer" @click="activeSearch"></i>
            </el-input>
        </el-col>
        <el-col :span="3"
                class="hidden-xs-only">
            <component :is="loginComponent"></component>
        </el-col>
        </el-row>
</template>

<script>
import UserImgAvatar from '@/components/user/UserImgAvatar'
import UserLoignHeader from '@/components/user/UserLoignHeader'
import { mapGetters } from 'vuex';
export default {
    name: 'BaseHeader',
    // model:{
    //     prop:'searchVal',
    //     event:'update:search'
    // },
    // props:{
    //     searchVal:{
    //         type:String
    //     }
    // },
    components:{ 
        UserImgAvatar,UserLoignHeader
    },
    data() {
        return {
            searchVal:''
        };
    },
    watch:{
        $route(newVal){
            this.$refs['navMenu'].activeIndex=`/${newVal.name}`
        }
    },
    created(){
        let isLogin=this.$store.state.token
        let nickName=this.userInfo?.nickName
        if(isLogin&&!nickName){
            this.$store.dispatch('getUserInfo')
        }
    },
    mounted() {
        
    },
    computed:{
        loginComponent(){
            return this.$store.state.token?'UserImgAvatar':'UserLoignHeader'
        },
        ...mapGetters(['userInfo'])
    },
    methods: {
        // inputVal (val) {
        //     this.$emit('update:search', val)
        // },
        activeSearch(){
            if(this.$route.name!=='index'){
                this.$router.push('/index')
            }
            this.$EventBus.$emit('activeSearch',this.searchVal)
            this.searchVal=''
        }
    },
};
</script>

<style lang="stylus">

.blog-head--warp
  width: 100%
  .blog-menu 
    li
        padding 0 3%
    .el-submenu__title
        padding 0 3%
  .blog-search
    display: flex
    align-items: center
  .blog-input--search
    max-width 240px
.blog-logo
  width: 60px
  height: 60px
  margin: 0 auto
  line-height 0

.blog-logo--pic
  width: 60px
  height: 60px

.blog-head--warp .el-menu--horizontal>.el-menu-item.is-active
    color:#409EFF
.el-menu--horizontal .el-menu--popup
    min-width 0
</style>
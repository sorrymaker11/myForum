<template>
    <div class="blog-header--login">
        <div class="blog-login--wrap">
            <span @click="refreshModal('login')">登录</span> | <span @click="refreshModal('register')">注册</span>
        </div>
    </div>
</template>

<script>
import MINXIN from '@/core/minxin'
export default {
    name: 'UserLoignHeader',
    mixins:[MINXIN],
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
.blog-head--warp .blog-header--login
    display: flex
    justify-content: flex-end
    align-items: center    
    height: 100%
.blog-login--wrap
    display: flex
    justify-content: center
    align-items: center
    background: rgba(30,128,255,.05);
    border: 1px solid rgba(30,128,255,.3);
    border-radius: 4px;
    padding: 8px;
    color: #007fff;
    font-size: 14px;
    font-weight: 400;
    overflow: hidden;
    span
        padding: 0 6px
</style>
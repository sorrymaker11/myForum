<template>
    <van-nav-bar
        :title="title"
        left-text="返回"
        right-text="按钮"
        left-arrow
        @click-left="$router.go(-1)"
        @click-right="onClickRight"
    />
</template>

<script>
export default {
    name: 'BaseNavBar',
    props:{
        title:{
            type:String
        }
    },
    data() {
        return {
        };
    },

    mounted() {
        
    },

    methods: {
        onClickRight(){

        }
    },
};
</script>

<style lang="stylus">

</style>
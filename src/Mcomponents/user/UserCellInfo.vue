<template>
    <div>
        <van-cell-group>
            <van-cell title="用户名" value="内容" />
            <van-cell title="昵称" value="内容"/>
        </van-cell-group>
    </div>
</template>

<script>
export default {
    name: 'UserCellInfo',
    props:{
        userInfo:{
            type:Object
        }
    },
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

<style lang="scss" scoped>

</style>
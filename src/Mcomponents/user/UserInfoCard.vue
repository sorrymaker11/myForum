<template>
    <div>
        <van-image
            width="8rem"
            height="8rem"
            :src="require('@/assets/img/favicon.png')"
        />
        <div class='blogm-users--content'>
            <h2 class="blogm-user--title">{{name}}</h2>
            <BaseForm  :type="type"></BaseForm>
        </div>
        <div class='blogm-users--btns'>
            <van-button type="info" block>{{name}}</van-button>
        </div>
    </div>
</template>

<script>
const TYPE_MAP={
    'login':'登录',
    "register":'注册'
}
import BaseForm from '@/Mcomponents/base/BaseForm.vue';
export default {
    name: 'UserInfoCard',
    props:{
        type:{
            type:String
        }
    },
    components:{
        BaseForm
    },
    data() {
        return {
            
        };
    },
    computed:{
        name(){
            return TYPE_MAP[this.type]
        }
    },
    mounted() {
        
    },

    methods: {
        
    },
};
</script>

<style lang="scss" scoped>

</style>
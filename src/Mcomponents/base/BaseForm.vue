<template>
    
    <van-form ref="form" class="blogm-form--wrap">
        <van-field v-for="item in formData"
            :key="item['query']"
            v-model="form[item['query']]"
            name="用户名"
            :type="item.type"
            :readonly="item.readonly"
            :label="item['label']"
            :placeholder="item['placeholder']"
            :rules="validates[item['query']] | formatRuleTrigger"
        />
    </van-form>
</template>

<script>
import FORM_DATA from '@/config/form.config'
import VALIDATE_DATE from '@/config/validate.config'
import _padStart from 'lodash/padStart'
import _capitalize from 'lodash/capitalize'
export default {
    name: 'BaseForm',
    props:{
        type:{
            type:String
        }
    },
    data() {
        return {
            form:{}
        };
    },

    computed:{
        formUserInfo () {
            return Object.fromEntries(Object.entries(this.$store.getters.userInfo).filter(([key]) => {
                return FORM_DATA['userInfo'].find(item => {
                    return key == item['query']
                })
            }))
        },
        formData(){
            return FORM_DATA[this.type]
        },
        validates(){
            return VALIDATE_DATE
        }
    },
    filters:{
        formatRuleTrigger(rules){
            return rules?.map(item=>{
                item.trigger=_padStart(_capitalize(item.trigger),6,'on')
                return item
            })
        }
    },
    watch:{
        type(newType){
            this.initForm()
            if (newType === 'userInfo') {
                this.form = this.formUserInfo
            }
        }
    },
    created(){
        console.log(this.type)
        if (this.type === 'userInfo') {
            //筛选排除 vuex中userInfo里不存在 form.config['userInfo']中的项
            this.form = this.formUserInfo
        }
    },
    mounted() {
        
    },

    methods: {
        initForm () {
            //重置表单字段 以及校验状态
            this.form = {}
        },
    },
};
</script>

<style lang="stylus">
.blogm-form--wrap
    .van-field__label
        width: 4em
</style>
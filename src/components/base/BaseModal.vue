<template>
    <div>
        <el-dialog  :title="title"
                    :visible.sync="isShow"
                    :width="width"
                    :before-close="close">
            <BaseForm :hasForm="formType"
                      :type="type"
                      ref="form"/>
            <div slot="footer" class="dialog-footer">
                <el-button v-for="btn in btns" 
                            :key="btn.targetName" @click="handlerBtn(btn.targetName,btn.isSubmit)">
                    {{btn.name}}
                </el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import MODAL_DATA from '@/config/modal.config'
import { createNamespacedHelpers } from 'vuex';
const { mapState ,mapActions} =createNamespacedHelpers('modal');

import BaseForm from './BaseForm'
export default {
    name: 'BaseModal',
    components:{
        BaseForm
    },
    data() {
        return {
            form:{},
            rules: {}
        };
    },
    computed:{
        ...mapState(['isShow','type']),
        title(){
            return MODAL_DATA[this.type]?.title ?? '默认类型'
        },
        width(){
            return MODAL_DATA[this.type]?.width ?? '60%'
        },
        formData(){
            return MODAL_DATA[this.type]?.formData
        },
        formType(){
            return MODAL_DATA[this.type]?.formType
        },
        btns(){
            return MODAL_DATA[this.type]?.btns ?? 
                        [{
                                targetName: 'close',
                                name: '取消'
                            },{
                                targetName: 'confirm',
                                name: '提交',
                                isSubmit: true
                        }]
        }
    },

    mounted() {
        
    },

    methods: {
        handlerBtn(action,isSubmit){
            if(isSubmit){
                this.submitForm()
                return
            }
            this[action] && this[action]()
        },
        submitForm() {
            if(!this.formType){
                return false
            }
            let refForm=this.$refs['form']
            refForm.$refs['elForm'].validate(async (valid) => {
            if (valid) {
                try {
                    await this.$api({type:this.formType,data:refForm.form})
                    this.close()
                    refForm.$refs['elForm'].resetFields()
                    this.$EventBus.$emit('updateView')
                } catch (err) {
                    refForm.$refs['elForm'].resetFields()
                }
            } else {
                return false;
            }
            });
        },
        ...mapActions(['close','open','confirm'])
    },
};
</script>

<style lang="stylus">
</style>
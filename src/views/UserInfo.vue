<template>
    <el-card>
        <div slot="header"
             class="clearfix">
        <span>个人信息</span>
        </div>
        <BaseForm   v-if="isCreated"
                    type="userInfo" ref='form' @submit="submit"/>
        <div class="blog-btn--wrap">
            <el-button type="success"  
                        icon="el-icon-check" 
                        @click="uploadAvatar">提交修改</el-button>
            <el-button type="primary"  
                        @click="reset">恢复</el-button>
        </div>
    </el-card>
</template>

<script>
import BaseForm from '@/components/base/BaseForm';
export default {
    name: 'UserInfo',
    components:{
        BaseForm
    },
    data() {
        return {
            isCreated:true
        };
    },

    mounted() {
        
    },

    methods: {
        uploadAvatar(){
            let refForm = this.$refs['form']
            if(!refForm.uploadAvatar()){
                this.submit();
            }

        },
        submit () {
            let refForm = this.$refs['form']
            console.log(refForm.form);
            refForm.$refs['elForm'].validate(async (valid) => {
                if (valid) {
                try {
                    await this.$api({ type: 'putUserInfo', data: refForm.form })
                    this.$store.dispatch('getUserInfo',false)
                    this.$notify.success({
                        title: '修改成功'
                    })
                    this.$router.push('/index')
                } catch (err) {
                    refForm.$refs['elForm'].resetFields()
                }
                } else {
                return false;
                }
            });
        },

        reset () {
            this.isCreated=false;
            this.$nextTick(()=>{
                this.isCreated=true;
            })
        }
    },
};
</script>

<style lang="stylus">
.blog-btn--wrap
  padding-top 20px
  display flex
  justify-content flex-end
</style>
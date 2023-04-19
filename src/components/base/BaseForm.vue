<template>
    <div class="blog-form">
        <el-form :model="form"
                class="blog-form--formData"
                :ref="'elForm'">
            <el-form-item v-for="(item) in formData"
                        :key="item.query"
                        :label="item.label"
                        :rules="validates[item.query]"
                        :prop="item.query"
                        :label-width="'100px'">
                <el-input v-if="item.type!=='avatar'" 
                        v-model="form[item['query']]"
                        autocomplete="off"
                        :disabled="item.readonly"
                        :type="item['type']"
                        :name="item['query']"
                        :placeholder="item['placeholder']">
                </el-input>
            </el-form-item>
        </el-form>
        <el-upload v-if="type === 'userInfo'"
                    class="avatar-uploader"
                    ref="upload"
                    :headers="{
                    'Authorization': `Bearer ${$store.state.token}`,
                    }"
                    action="http://127.0.0.1:3000/upload/user"
                    :show-file-list="false"
                    :on-success="handleAvatarSuccess"
                    :on-error="handleAvatarError" 
                    :before-upload="beforeAvatarUpload"
                    :on-change="changeFile"
                    :file-list="fileList"
                    :auto-upload="false">
            <el-image style="width: 100px; height: 100px"
                v-if="userAvatarSrc"
                :src="userAvatarSrc"
                class="avatar"
                fit="fit"></el-image>
            <!-- <i v-else class="el-icon-plus avatar-uploader-icon"></i> -->
            <div slot="tip" class="el-upload__tip"><h3>我的头像</h3><p>提交后更新(5M以下)</p></div>
        </el-upload>
    </div>
</template>

<script>

import FORM_DATA from '@/config/form.config'
import VALIDATE_DATE from '@/config/validate.config'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
export default {
    name: 'BaseForm',
    props:{
        type:{
            type:String
        }
    },
    data() {
        return {
            form:{},
            avatarURL:'',
            fileList:[]
        };
    },
    created(){
        if (this.type === 'userInfo') {
            //筛选排除 vuex中userInfo里不存在 form.config['userInfo']中的项
            this.form = Object.fromEntries(Object.entries(this.$store.getters.userInfo).filter(([key]) => {
                return FORM_DATA['userInfo'].find(item => {
                    return key == item['query']
                })
            }))
            // this.form = this.$store.getters.userInfo
        }
    },
    computed:{
        formData(){
            return FORM_DATA[this.type]
        },
        validates(){
            return VALIDATE_DATE
        },
        userFileAction(){
            return process.env.VUE_APP_USER_UPLOAD_PATH+''||'http://127.0.0.1:3000/upload/user'
        },
        userAvatarSrc(){
            return this.avatarURL ||this.$store.getters.userInfo.avatar
        }
    },
    watch:{
        type(){
            this.initForm()
        }
    },
    mounted() {
        
    },

    methods: {
        initForm(){
            this.form = {}
            this.resetForm() 
        },
        resetForm(){
            // 表单重置
            this.$refs['elForm'].resetFields()
        },
        handleAvatarSuccess(res){
            this.form.avatar=res.data.fileURLS
            NProgress.done()
            console.log(this.form.avatar);
            this.$emit('submit')
        },
        handleAvatarError(err){
            this.$notify.error({
                title: '上传失败',
                message: JSON.parse(err.message)?.message
            })
        },
        beforeAvatarUpload(file){
            let { size, type } = file
            let isPass = true
            isPass = /image/g.test(type)
            isPass = size < 5 * 1024 * 1024
            if (!isPass) {
                let errMsg = /image/g.test(type) ? "文件不得大于5M" : "请选择图片文件"
                this.$notify.error({
                title: '上传错误',
                message: errMsg
                })
                this.$refs.upload.abort(file)
                return false
            }
            NProgress.start()
        },
        changeFile(file){
            if(this.fileList.length>=1){
                this.fileList.pop()
            }
            this.fileList.push(file)
            this.avatarURL=URL.createObjectURL(file.raw)
        },
        uploadAvatar(){
            if(this.fileList.length>=1){
                this.$refs.upload.submit();
                return true
            }
            return false
        }
    },
};
</script>

<style lang="stylus">
.blog-form
    display: flex
    justify-content: space-around
.blog-form--formData
    flex: 1
    input:hover
        background: #e5e6eb;
        border-color: #e5e6eb;  
        box-shadow: none

.avatar-uploader
    display flex
    flex-direction: column
    align-items:center
    margin: 10px
    .el-image.avatar
        position relative
        border-radius: 50%
        &:hover::before
            position absolute
            content: '+'
            font-size: 40px
            font-weight: 700
            color #fff
            text-align: center
            line-height: 90px
            width: 100%
            height: 100%
            border-radius: 50%  
            background-color: rgba(29,33,41,.5)
.el-upload__tip
    text-align: center
</style>
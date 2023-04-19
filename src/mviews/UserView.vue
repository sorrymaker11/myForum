<template>
  <div class="blogm-user">

    <van-uploader v-if="avatar"
                  :preview-image="false"
                  :after-read="afterRead"
                  v-model="upload"
                  preview-size="5rem">
      <van-image width="5rem"
                  height="5rem"
                  round
                  :src="avatar" />
    </van-uploader>
    <van-image v-else
                round
                width="5rem"
                height="5rem"
                :src="require('@/assets/img/favicon.png')" />

    <div class="blogm-users--content">
      <h2 class="blogm-users--title">{{title}}</h2>
      <BaseForm :type="formType" 
                ref="userForm"/>
      <p class="blogm-users--tag"
         v-if="tagValue"
         @click="changeType"
         v-html="tagValue"></p>
    </div>
    <div class="blogm-users--btns">
      <van-button type="info"
                  block
                  @click="onSubmit">{{buttonName}}</van-button>
      <van-button type="warning"
                  v-if="formType === 'userInfo'"
                  @click="logout"
                  block>退出登录</van-button>
    </div>
  </div>
</template>
  
<script>
import MODAL_DATA from '@/config/modal.config'
import BaseForm from '@/Mcomponents/base/BaseForm'
import { mapGetters, mapActions } from 'vuex'
const BTN_NAME = {
  'login': '登录',
  'register': '注册',
  'userInfo': '修改'
}
const TAG_VALUE = {
  'login': '还没有账号? <span>点击注册</span>',
  'register': '已有账号? <span>点击登录</span>',
  'userInfo': ''
}
export default {
  name: 'UserView',
  components: {
    BaseForm
  },
  props: {
    state: {
      type: String,
      default: 'login'
    }
  },
  data () {
    return {
      type: '',
      upload: [],
      fileBase: ''
    }
  },
  mounted () {

  },
  created () {
    let isLogin = this.$store.state.token
    let nickname = this.userInfo?.nickname
    if (isLogin && !nickname) {
      this.getUserInfo()
    }
  },
  computed: {
    tagValue () {
      return TAG_VALUE[this.formType]
    },
    requestType(){
      return this.formType === 'userInfo' ? 'putUserInfo' : this.formType
    },
    formType () {
      return this.nickname ? 'userInfo' : (this.type || this.state)
    },
    title () {
      return MODAL_DATA[this.formType]?.title
    },
    buttonName () {
      return BTN_NAME[this.formType] || '提交'
    },
    avatar () {
      return this.fileBase || this.userInfo?.avatar
    },
    nickname () {
      return this.userInfo?.nickname
    },
    userFileAction () {
      return process.env.VUE_APP_USER_UPLOAD_PATH
    },
    ...mapGetters(['userInfo'])
  },
  methods: {
    changeType () {
      this.type = (this.type || this.state) === 'login' ? 'register' : 'login'
    },
    async onSubmit(){
            console.log(this.upload)
      let formWrap = this.$refs.userForm
      let formComponent = formWrap.$refs.form
      formComponent.validate().then(async () => {
        let formData = formWrap.form
        formData.avatar = this.avatar
        try {
            await this.$api({ type: this.requestType, data: formData })
            this.getUserInfo()
        } catch (err) {
            //重置表单
            formComponent.resetValidation()
        }

      }).catch(err => err)
      return
    },
    async afterRead (upload) {
      console.log(upload)
      this.fileBase = upload.content
      let formData=new FormData()
      formData.append('file',upload.file)
      try {
        let result = await this.$api({
          type: 'uploadAvatar', data: formData
        })
        console.log(result)
      } catch (err) {
        console.log(err)
      }

    },
    ...mapActions(['logout','getUserInfo'])
  },
};
</script>
  
<style lang="stylus" >
.blogm-user
  display flex
  flex-direction column
  align-items center
  justify-content space-around
  padding 20px
  height 100%
  background-color #f9f9f9
.blogm-users--content
  width 100%
  padding 20px 0
  background-color #fff
.blogm-users--btns
  width 100%
  &>button+button
    margin-top 10px
.blogm-users--title
  font-size 22px
  font-weight 600
  text-align center
  line-height 1.8
.blogm-users--tag
  padding 1em 2em
  text-align right
  font-size 14px
  &>span
    color blue
</style>
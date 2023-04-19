<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
import _isMobile from '@/util/isMobile'

export default {
  name: 'app',
  created(){
  },
  mounted(){
    let pathName=window.location.hash
    if(/article\//.test(pathName)){
      return false
    }
    _isMobile() ?this.$router.replace('/m'):this.$router.replace('/index')
    
  },
  methods:{
    // _isMobile(){
    //   return navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/)
    // }
  }
}
</script>

<style lang="stylus">
html,body
  overflow hidden
  height 100vh
</style>

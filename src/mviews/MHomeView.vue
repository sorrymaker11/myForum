<template>
  <div class="blog-page-m">
    <HeaderView/>
    <div class="blogm-content" ref="wrap">
      <transition enter-active-class="animate__animated animate__fadeInRight"
            appear
            mode="out-in">
        <router-view></router-view>
      </transition>
    </div>
    <FooterBar/>
    <BaseDialog/>
  </div>
</template>

<script>
import HeaderView from '@/mviews/HeaderView'
import FooterBar from '@/mviews/FooterBar'
import BaseDialog from '@/Mcomponents/base/BaseDialog'
export default {
  name: 'MHomeView',
  components:{
    FooterBar,HeaderView,BaseDialog
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

<style lang="stylus">
.blogm-content
  overflow hidden
  overflow-y: auto
  height: calc(100vh - 105px)
  background-color #f1f1f1
.animate__fadeInRight
  animation-duration 0.5s
</style>
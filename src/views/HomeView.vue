<template>
  <div class="blog-page">
    <el-container class="blog-container">
      <el-header height="60px" 
                 class="blog-header">
        <BaseHeader/>
      </el-header>
      <el-container class="blog-middle">
        <el-row class="blog-middle--wrap"
                type="flex"
                justify="flex-wrap"
                align="center">
          <el-col :span="2"
                  v-if="circleMenuList.length">
            <BaseCircleMenu :circleMenuList="circleMenuList"/>
          </el-col>
          <el-col :span="24"
                  class="blog-main--warp">
            <el-main class="blog-main">
                <Scroll ref='scrollView'
                        @handle-scroll="loadMore">
                        <router-view v-if="isRouteLoading" :loading="loading" :scrollTop="scrollTop"></router-view>
                </Scroll>
            </el-main>
          </el-col>
            <el-col :span="6"
                    class="hidden-md-and-down blog-aside-wrap"  v-if="$store.state.token||catalogList.length">
              <Scroll >
                <BaseAside v-if="$store.state.token"/>
                <BaseCatalog v-if="catalogList.length"
                              :catalogList="catalogList"
                              :scrollTocatalog="scrollTocatalog"/>
              </Scroll>
            </el-col> 
        </el-row>
      </el-container>
    </el-container>

    <BaseModal />
    <Live2D/>
  </div>
</template>

<script>
// @ is an alias to /src
import BaseModal from '@/components/base/BaseModal'
import BaseHeader from '@/components/base/BaseHeader'
import BaseAside from '@/components/base/BaseAside'
import BaseCircleMenu from '@/components/base/BaseCircleMenu'
import BaseCatalog from '@/components/base/BaseCatalog'
import circleMenuConfig from '@/config/circleMenu.config'
import Live2D from '@/components/MyLive2d'
import _throttle from 'lodash/throttle'
const TH=200
export default {
  name: 'HomeView',
  provide(){
    return{
      changeLoading:this.changeLoading,
      catalogList:this.catalogList,
      cleanCatalog:this.cleanCatalog,
      keepScrollTo:this.keepScrollTo,
    }
  },
  components: {
    BaseModal,BaseHeader,BaseAside,BaseCircleMenu,BaseCatalog,Live2D
  },
  data(){
    return{
      loading:false,
      scrollTop:0,
      circleMenuList:[],
      catalogList:[],
      h1OffsetTop:[],
      isRouteLoading:true,
      search:''
    }
  },
  created(){
    let routeName=this.$route.name
    this.circleMenuList=circleMenuConfig[routeName]?.()||[]
  },
  watch:{
    $route(to){
      this.circleMenuList=circleMenuConfig[to['name']]?.()||[]
      this.reload()
    }
  },
  methods:{
    reload(){
      this.isRouteLoading=false
      this.$nextTick(function(){
        this.isRouteLoading=true
      })
    },
    changeLoading(loading){
      this.loading=loading
    },
    loadMore:_throttle(function(vertical,horizontal,nativeEvent){
      this.scrollTop=vertical.scrollTop
      if(this.loading){
          return false
      }
      let st=vertical.scrollTop
      let sh=nativeEvent.srcElement.scrollHeight -nativeEvent.srcElement.clientHeight
      if(st+TH>sh&&sh>0){
          this.loading=true
      }
    },500),
    cleanCatalog(){
      this.catalogList.splice(0,this.catalogList.length)
    },
    scrollTocatalog(scroll){
      // let aH1=document.querySelector('.blog-article--content').querySelectorAll('h1')[index]
      this.scrollTop=scroll
      this.keepScrollTo(500)
    },
    keepScrollTo(timeout=0){
      this.$refs['scrollView'].scrollTo({y:this.scrollTop},timeout)
    }
  }
}
</script>
<style lang="stylus">
.blog-container
  overflow hidden
  height: 100%
.blog-header
  display: flex
  align-items: center
  background-color #fff
  .blog-menu
    height: 60px
.blog-middle
  padding 20px  
  
  height: calc(100vh  - 60px)
  background-color: #f1f1f1
.blog-middle--wrap
  max-width: 1440px
  margin: 0 auto
  width: 100%
.blog-aside
  background-color: #888
.el-main.blog-main
  padding 0 20px
  height: 100%
@media screen and (max-width:768px)
  .el-main.blog-main
    padding 0
.blog-main--warp
  overflow hidden
.blog-aside-wrap
  height: 80%
  overflow: auto
.blog-footer
  margin-top: auto
  height: 10vh
  background-color: #ccc
</style>
<template>
    <van-card class="blogm-article-bar"
            :desc="info.date">
    <template #thumb>
      <van-image round
                 width="60"
                 height="60"
                 :src="info.avatar" />
    </template>
    <template #title>
      <h3 class="van-ellipsis blogm-item--title">{{info.nickname}}</h3>
    </template>
    <template #num>
      <div class="van-ellipsis blogm-item--title blogm-item--details">
        <van-icon name="good-job" /> <span>{{info.like_num}}</span>
        <van-icon name="eye" /> <span>{{info.hit_num}}</span>
        <van-icon name="comment" /> <span>{{info.comment_num}}</span>

      </div>
    </template>

  </van-card>
  </template>
  
  <script>
  export default {
    name: 'ArticleBarInfo',
    props: {
      info: {
        type: Object,
      },
      id: {
        type: String
      }
    },
    data () {
      return {
  
      };
    },
    mounted () {
  
    },
    methods: {
  
    },
  };
  </script>
  
<style lang="stylus" >
.blogm-article-bar
  margin-bottom: 10px
  .van-card__content
    justify-content:  center
  .van-card__thumb
    display: flex
    justify-content:  center
    align-items center
.blogm-item--details
    display flex
    align-items center
    & .van-icon
      padding-left 1.2em
    & span
      padding-left 0.23em
.blogm-item--title
    margin: 0
</style>
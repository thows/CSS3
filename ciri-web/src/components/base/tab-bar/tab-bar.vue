<!-- 底部导航栏 组件 -->

<template>
  <div class="tab-warp">
    <ul class="tab-bar">
      <!-- ?_? 当设置 to="/" 时，首页ico总是高亮，搞不懂 ?_? -->
      <router-link class="index" tag="li" to="/index">
        <i class="icon-index"></i>
        <span>首页</span>
      </router-link>

      <router-link class="news" tag="li" to="/news">
        <i class="icon-news"></i>
        <span>资讯</span>
      </router-link>

      <router-link class="project" tag="li" to="/project">
        <i class="icon-project"></i>
        <span class="title-project">项目</span>
      </router-link>

      <router-link class="msg" tag="li" to="/msg">
        <i class="icon-msg"></i>
        <span>消息</span>
      </router-link>
      <router-link class="mine" tag="li" to="/mine">
        <i class="icon-mine"></i>
        <span>我的</span>
      </router-link>
    </ul>
    <div class="tab-bar tab-border"></div>
  </div>
</template>

<script>
export default {
  components: {},
  data () {
    return {}
  },
  props: {},
  watch: {},
  methods: {},
  filters: {},
  computed: {},
  created () {},
  mounted () {},
  destroyed () {}
}
</script>

<style type="text/scss" lang="scss" scoped>
@import '~@/assets/scss/const.scss';
@import '~@/assets/scss/mixin.scss';
.tab-warp{
  .tab-bar {
    height: 33px;
    text-align: center;
    display: flex;
    flex-direction: row;
    background-color: transparent;
    position: fixed;
    bottom: 0;
    width: 100%;
    z-index: 199;
    padding: 7px 0 6px;
    li {
      flex: 1;
      color: #666;
      display: block;
      position: relative;
      i {
        display: block;
        width: 22px;
        height: 22px;
        margin:auto;
        @include bg-image("./icon-index");
        background-size: 22px auto;
        background-repeat: no-repeat;
      }
      span {
        display: block;
        font-size: 12px;
        height:12px;
        line-height: 12px;
        margin-top: 3px;
      }
      .title-project{
        margin-top: 5px;
      }
    }

    li.router-link-active {
      color: #528de8;
    }

    .icon-index {
      @include bg-image("./icon-index");
    }
    .index.router-link-active .icon-index {
      @include bg-image("./index-active");
    }

    .icon-news {
      @include bg-image("./icon-news");
    }
    .news.router-link-active .icon-news {
      @include bg-image("./news-active");
    }

    .icon-project {
      width: 40px;
      height: 40px;
      margin-bottom:5px;
      background-size: 40px auto;
      background-repeat: no-repeat;
      @include bg-image("./project-active");
      margin-top: -20px;
    }
    .project.router-link-active .icon-project {
      background-position: 0 0;
      @include bg-image("./project-active");
    }

    .icon-msg {
      @include bg-image("./icon-msg");
    }
    .msg.router-link-active .icon-msg {
      @include bg-image("./msg-active");
    }

    .icon-mine {
      @include bg-image("./icon-mine");
    }
    .mine.router-link-active .icon-mine {
      @include bg-image("./mine-active");
    }
  }
  .tab-border{
    @include onepx();
    position: fixed;
    background-color: #fcfcfc;
    z-index: 198;
  }
}
</style>

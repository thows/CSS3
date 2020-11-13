<!-- news -->

<template>
  <div class="msg bg-blank">
    <header class="gradient">我的消息
    </header>
    <div class="main">
      <ul class="tab">
        <li>
          <router-link to="/msg/station">站内信</router-link>
        </li>
        <li>
          <router-link to="/msg/system-notification">系统通知</router-link>
        </li>
      </ul>
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
    </div>

    <tab-bar></tab-bar>
  </div>
</template>

<script>
  import TabBar from '@/components/base/tab-bar/tab-bar'
  import tool from '@/api/tool'
  export default {
    components: {
      TabBar,
    },
    data () {
      return {
      }
    },
    props: {},
    watch: {},
    methods: {

    },
    filters: {},
    computed: {},
    created () {


    },
    mounted () {},
    destroyed () {}
  }
</script>

<style type="text/scss" lang="scss" scoped>
  @import '~@/assets/scss/const.scss';
  @import '~@/assets/scss/mixin.scss';
  header {
    height: 44px;
    line-height: 44px;
    color: #fff;
    font-size: 20px;
    text-align: center;
    position: relative;

    .icon_search {
      display: block;
      height: 22px;
      width: 22px;
      @include bg-image('../news/img/search');
      background-size: 22px auto;
      position: absolute;
      right: 10px;
      top: 11px;

    }

  }
  .gradient{
    width: 100%;
    height: 44px;
    @include bg-image("../mine/img/header-bg");
    background-repeat: no-repeat;
    background-size: 100% 44px;
  }

  .tab{
    width: 100%;
    height: 33px;
    text-align: center;
    display: flex;
    flex-direction: row;
    margin-top: 15px;
    padding-bottom: 15px;
    border-bottom: 1px solid #dedede;
    justify-content: center;
    li:first-child{
      line-height: 33px;
      a {
        display: block;
        font-size: 15px;
        color: #333;
        width: 126px;
        height: 33px;
        border-top-left-radius: 3px;
        border-bottom-left-radius:3px;
        border-top: 1px solid #528deb;
        border-left: 1px solid #528deb;
        border-bottom: 1px solid #528deb;
        &.router-link-active {
          color: #fff;
          background-color: #528de8;
        }
      }
    }
    li:last-child{
      line-height: 33px;
      a {
        display: block;
        font-size: 15px;
        color: #333;
        width: 126px;
        height: 33px;
        border-top-right-radius: 3px;
        border-bottom-right-radius:3px;
        border-top: 1px solid #528deb;
        border-right: 1px solid #528deb;
        border-bottom: 1px solid #528deb;

  &.router-link-active {
          color: #fff;
          background-color: #528de8;
        }
      }
    }


  }



</style>
p

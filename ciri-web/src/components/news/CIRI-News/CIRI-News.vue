<!-- news -->

<template xmlns:v-bind="http://www.w3.org/1999/xhtml">
  <div class="news">
    <div class="scene">
      <router-link v-if="topArticle!=null" :to="{path:'/news/news-detail/',query: {id: topArticle.id}}">
        <div class="project1">
          <div class="img">
            <img v-lazy="host+topArticle.thumbnail"/>
          </div>
          <div class="title-warp">
            <span class="news-title">{{topArticle.title.length>20 ? topArticle.title.substr(0,20)+'...' : topArticle.title}}</span>
            <label class="view fr">
              <i class="icon-view"></i>
              <span class="count">{{topArticle.clickCount}}</span>
            </label>
            <!--<div class="title-box" style="display:none;">
              <div class="fl">
                <span class="column">最新活动</span> | <span class="time">{{topArticle.updateTime|time}}</span>
                <span class="author">CIRI</span>
              </div>
            </div>-->
          </div>
        </div>
      </router-link>
    </div>
    <div class="main">
      <ul class="tab">
        <li>
          <router-link to="/news/CIRI-News/Activities">最新活动</router-link>
        </li>
        <li>
          <router-link to="/news/CIRI-News/recent-news">最新动态</router-link>
        </li>
        <li>
          <router-link to="/news/CIRI-News/investigation">海外考察</router-link>
        </li>
        <li>
          <router-link to="/news/CIRI-News/cooperation">合作签约</router-link>
        </li>
      </ul>
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
    </div>
  </div>
</template>

<script>
  import CrossLine from "@/components/base/cross-line/cross-line";
  import tool from "@/api/tool";
  import moment from 'moment'

  export default {
    components: {
      CrossLine
    },
    data() {
      return {
        host: tool.oos(),
        topArticle: null,
        baseImg: "http://ciri-test.oss-cn-beijing.aliyuncs.com/"
      };
    },
    props: {},
    watch: {},
    methods: {},
    filters: {
      time(time) {
        return moment(time).format("YYYY-MM-DD");
      }
    },
    computed: {},
    mounted() {
      let param = tool.buildForm([
        {key: "page", v: 1},
        {key: "rouCount", v: 1},
        {key: "cid", v: 1004},
        {
          key: "level",
          v: 2004
        }
      ]);
      this.axios
        .post(tool.domind() + "/gateway/app/news/article/getLevelActive", param)
        .then(res => {
          if (res.data.code === 200) {
            this.topArticle = res.data.data[0];
          }
        });
    }
  };
</script>

<style type="text/scss" lang="scss" scoped>
  @import "~@/assets/scss/const.scss";
  @import "~@/assets/scss/mixin.scss";

  .gradient {
    background: -webkit-linear-gradient(
        left,
        rgba(56, 185, 253, 1),
        rgba(63, 132, 230, 0.65)
    ); /* Safari 5.1 - 6.0 */
    background: -o-linear-gradient(
        right,
        rgba(56, 185, 253, 1),
        rgba(63, 132, 230, 0.65)
    ); /* Opera 11.1 - 12.0 */
    background: -moz-linear-gradient(
        right,
        rgba(56, 185, 253, 1),
        rgba(63, 132, 230, 0.65)
    ); /* Firefox 3.6 - 15 */
    background: linear-gradient(
        to right,
        rgba(56, 185, 253, 1),
        rgba(63, 132, 230, 0.65)
    ); /* 标准的语法 */
  }

  .tab {
    @include onepx("bottom");
    height: 35px;
    text-align: center;
    display: flex;
    flex-direction: row;
    margin: 8px 10px;
    li {
      flex: 1;
      line-height: 25px;
      position: relative;
      margin-right: 22px;
      &:last-child{
        margin-right: 0;
      }
      a {
        display: block;
        font-size: 14px;
        color: #333;
        border-radius: 3px;
        &.router-link-active {
          background: #3f83e6;
          color:#fff;
        }
      }
    }
  }

  .scene {
    position: relative;
    height: 186px;
    width: 100%;
    .project1 {
      position: relative;
      .title-warp{
        background: rgba(51,51,51,0.5);
        position: absolute;
        bottom: 0;
        width: 100%;
        height:35px;
        line-height: 35px;
        text-align: left;
        .news-title {
          font-size: 14px;
          color: #fff;
          overflow: hidden;
          padding-left: 10px;
        }
        .view {
          font-size: 10px;
          color: #fff;
          padding: 0 10px;
          i {
            display: block;
            float: left;
            width: 12px;
            height: 12px;
            margin: 12px 5px 0px 0px;
            @include bg-image("../img/view_white");
            background-size: 12px auto;
          }
        }
        .title-box {
          font-size: 10px;
          color: #fff;
          height: 10px;
          padding: 0 10px;
          &:after{
            border: none;
          }
        }
      }
      .img {
        width: 100%;
        height: 186px;
        img {
          width: 100%;
          height: 100%;
        }
      }
      .title-box {
        @include onepx("bottom");
      }
    }
  }
</style>

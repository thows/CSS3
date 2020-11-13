<template>
  <div class="news-detail">
    <div class="header-bar" v-show="headerFixed">
      <i class="icon-back" @click="back"></i>
      <h1>{{content.title != null&&content.title.length >10 ?content.title.substr(0,10):content.title}}</h1>
    </div>
    <div class="main">
      <div class="img-warp" v-if="content.iconUrl">
        <img v-lazy="handleImgUrl(content.iconUrl)"/>
        <div class="img-back" @click="back"></div>
        <div class="em-warp" v-if="content.tagName!=null && content.tagName">
          <em v-for="(item,index) in content.tagName.split(',')" :key="index">{{item}}</em>
        </div>

      </div>
      <h2>{{content.title}}</h2>
      <div class="title-box">
        <div class="fl">
          <span class="author">{{content.publisher}}</span>
          <span class="time">{{content.updateTime|time}}</span>
        </div>
      </div>
      <div class="summary" v-if="content.summary">
        <div class="content">{{content.summary}}</div>
        <div class="border-bottom"></div>
      </div>
      <div class="section" v-html="contentHtml"></div>
    </div>
  </div>
</template>

<script>
  import HeaderBar from "@/components/base/header-bar/header-bar";
  import CrossLine from "@/components/base/cross-line/cross-line";
  import tool from "../../../api/tool";
  import shareSDK from '@/api/wx';

  export default {
    name: "news-deail",
    components: {
      HeaderBar,
      CrossLine
    },
    data() {
      return {
        content: "",
        contentHtml: "",
        headerFixed: false,
        host: tool.oos(),
      };
    },
    methods: {
      back() {
        window.history.back();
      },
      handleImgUrl(url){
        if(url.indexOf('.') == -1 && url.indexOf('http') == -1 && url.indexOf('com') == -1){
          return this.host + url;
        }
        return url;
      },
      //页面滚动时
      handleScroll(){
        let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
        this.headerFixed = scrollTop >260;

      },
      share() {
        let urlparm = window.location.href.split('#')[0]
        let url =window.location.href.split('#')[0] + '?#' + window.location.href.split('#')[1];
        this.$api.post('/app/wx/signatrue', {url: urlparm}).then(res => {
            if (res.code == 200) {
              shareSDK.wxconfig.timestamp = res.data.timestamp;
              shareSDK.wxconfig.signature = res.data.signature;
              shareSDK.wxconfig.nonceStr = res.data.noncestr;
              shareSDK.wxconfig.appId = res.data.appid;
              shareSDK.share(this.content.title, url,
                this.content.iconUrl,
                this.content.summary,
                shareSDK.wxconfig, {id: this.$route.query.id})
            }
          }
        );
      },
    },
    props: {},
    created() {
      //页面滚动时标
      window.addEventListener('scroll', this.handleScroll);
      this.axios
        .get(tool.domind() + "/gateway/app/article/getActicleAllInfo?articleId="+ this.$route.query.id)
        .then(res => {
          if (res.data.code === 200) {
            this.content = res.data.data.articleBasic;
            this.contentHtml = res.data.data.content;
            this.share();

          }
        });
    },
    destroyed() {
      window.removeEventListener("scroll", this.handleScroll);
    },
    mounted() {

    },
    filters: {
      time(time) {
        return moment(time).format("YYYY-MM-DD HH:mm");
      }
    }
  };
</script>

<style type="text/scss" lang="scss">
  @import "~@/assets/scss/mixin.scss";
  @import "~@/assets/scss/reset.scss";

  .news-detail {
    .header-bar {
      @include onepx('bottom');
      background-color: #ffffff;
      position: fixed;
      top:0;
      left: 0;
      right:0;
      z-index: 999;
      height: 44px;
      line-height: 44px;
      color: #fff;
      font-size: 14px;
      text-align: center;
      /* 标准的语法 */
      h1 {
        color: #333333;
        font-size: 18px;
        text-align: center;
      }

      .icon-back {
        position: absolute;
        left: 0;
        width: 22px;
        height: 22px;
        margin: 11px auto;
        @include bg-image("../../base/header-bar/icon-arrow_lift");
        background-size: 22px auto;
      }

    }
    .main {
      text-align: left;
      .img-warp{
        width: 100%;
        height: 210px;
        position: relative;
        img {
          width: 100%;
          height: 100%;
        }
        .img-back{
          position: absolute;
          left: 10px;
          top: 10px;
          width: 28px;
          height: 28px;
          @include bg-image("../img/icon-im-back");
          background-size: 22px auto;
          background-color: rgba(51, 51, 51, 0.5);
          background-repeat: no-repeat;
          background-position: center;
          border-radius: 50%;
        }
        .em-warp{
          position: absolute;
          left: 10px;
          bottom: 10px;
          em{
            display: inline-block;
            margin-right: 10px;
            color: white;
            font-size: 11px;
            padding: 3px 10px;
            background: rgba(51,51,51,.5);
            border: 1px solid #fff;
            border-radius: 15px;
          }

        }

      }
      h2 {
        font-size: 18px;
        font-weight: 600;
        color: #333;
        line-height: 24px;
        overflow: hidden;
        padding:0 10px;
        margin-top: 11px;
      }

      .title-box {
        font-size: 0;
        color: #999;
        height: 10px;
        padding: 10px 10px 15px;
        margin-bottom: 10px;
        span{
          display: inline-block;
          margin-right: 10px;
          font-size: 13px;
          line-height: 13px;
          color: #999;
        }

        .view {

          i {
            display: block;
            float: left;
            width: 13px;
            height: 13px;
            margin: 3px 5px;
            @include bg-image("../img/view");
            background-size: 13px auto;
            vertical-align: middle;
          }

          .count {
            display: inline-block;
            height: 18px;
            line-height: 18px;
            margin-top: 1px;
          }

        }
      }
      .summary{
        width: 73%;
        margin: 15px auto 0;
        .content{
          font-size: 17px;
          color: #999;
          font-weight: 600;
          line-height: 1.5;
          max-height: 75px;
          overflow: hidden;
          text-align: center;
        }
        .border-bottom{
          width: 42%;
          height: 2px;
          background: #ccc;
          margin: 20px auto 30px;
        }
      }
      .img {
        width: 100%;
      }

      .section {
        padding: 0 10px;
        font-size: 14px;
        color: #444;
        line-height: 24px;
        p{
          font-size: 14px;
          color: #444;
          line-height: 24px;
          margin: 10px 0;
          strong{
            font-size: 14px;
            line-height: 24px;
            color: #444;
          }
          img{
            margin-bottom: 10px;
          }
        }

        div{
          font-size: 14px;
          line-height: 18px;
          color: #000;
          font-weight: bold;
        }
        img {
          height: auto;
          margin: auto;
          display: table;

          @media screen and (min-device-width: 414px) and (max-width: 799px) {
            width: 380px;
          }

          @media screen and (min-device-width: 375px) and (max-width: 413px) {
            width: 340px;
          }

          @media screen and (min-width: 320px) and (max-width: 374px) {
            width: 280px;
          }

        }
        .conimg-intro {
          text-align: center;
          font-weight: bold;
          margin-top: 20px;
        }

      }
    }
    .bottom-back{
      position: fixed;
      bottom: 17px;
      left: 10px;
      width: 47px;
      height: 47px;
      @include bg-image("../img/bottom-back");
      background-size: 100% 100%;
    }
  }
</style>

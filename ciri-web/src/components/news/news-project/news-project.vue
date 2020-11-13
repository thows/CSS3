<template xmlns:v-bind="http://www.w3.org/1999/xhtml">
  <div class="news-main">

    <div  class="project1">
      <router-link v-if="topArticle!=null" :to="{path:'/news/news-detail/',query: {id: topArticle.id}}">
        <div class="img">
          <img v-lazy="host+topArticle.thumbnail"/>
        </div>
        <h2>{{topArticle.title}}</h2>
        <div class="title-box">
          <div class="fl">
            <span class="column">项目情报</span> | <span class="time">{{topArticle.updateTime|time}}</span>
            <span class="author">CIRI</span>
          </div>

          <div class="view fr">
            <i class="icon-view"></i><span class="count">{{topArticle.clickCount}}</span>
          </div>
        </div>
      </router-link>
    </div>

    <div v-if="articles!==null" class="project" v-for="(article,index) in articles" :key="article.id">
      <router-link   :to="{path:'/news/news-detail/',query: {id: article.id}}">
      <div  v-if="(index+1)%5!==0" class="project2">
        <div class="fl main-news">
          <h2>{{article.title}}</h2>
          <div class="title-box">
            <div class="fl">
              <span class="column">最新活动</span> | <span class="time">{{article.updateTime|time}}</span>
              <span class="author">CIRI</span>
            </div>

            <div class="view fr">
              <i class="icon-view"></i><span class="count">{{article.clickCount}}</span>
            </div>
          </div>
        </div>
        <div class="fr img-warp">
          <div class="img">
            <img v-lazy="host+article.thumbnail"/>
          </div>
        </div>
      </div>
      <div v-if="(index+1)%5===0" class="project1">
        <div class="img">
          <img v-lazy="host+article.thumbnail"/>
        </div>
        <h2>{{article.title}}</h2>
        <div class="title-box">
          <div class="fl">
            <span class="column">最新活动</span> | <span class="time">2018年1月1日</span>
            <span class="author">CIRI</span>
          </div>

          <div class="view fr">
            <i class="icon-view"></i><span class="count">{{article.clickCount}}</span>
          </div>
        </div>
      </div>
      </router-link>
    </div>
    <div class="more">
      <span @click='loadMore' v-text="moreText">查看更多</span><i v-show="isIcon"></i>
    </div>
    <div class="blank"></div>


  </div>
</template>

<script>
import tool from "../../../api/tool";
import moment from 'moment'

export default {
  data() {
    return {
      articles: null,
      host: tool.oos(),
      page: 1,
      topArticle: null,
      isMore: false,
      moreText:'查看更多',
      isIcon: true,

    };
  },
  methods: {
    loadMore() {
      if(!this.isIcon){
        return
      }
      let param = tool.buildForm([
        { key: "page", v: this.page },
        { key: "rouCount", v: 10 },
        { key: "cid", v: 1008 },
      ]);
      this.axios
        .post(tool.domind() + "/gateway/app/news/article/getLevelActive", param)
        .then(res => {
          if (res.data.code === 200) {
            if (this.page === 1 || this.articles == null) {
              this.articles = res.data.data;
            } else {
              this.articles = this.articles.concat(res.data.data);
            }
            if(this.articles.length != res.data.total){
              this.moreText='查看更多'
            }else{
              this.moreText='没有更多了'
              this.isIcon = false;
            }
          }
          this.page = this.page + 1;
        });
    }
  },
  mounted() {
    this.loadMore();
    let param = tool.buildForm([
      { key: "page", v: 1 },
      { key: "rouCount", v: 1 },
      { key: "cid", v: 1008 },
      {
        key: "level",
        v: 2002
      }
    ]);
    this.axios
      .post(tool.domind() + "/gateway/app/news/article/getLevelActive", param)
      .then(res => {
        if (res.data.code === 200) {
          this.topArticle = res.data.data[0];
        }
      });
  },
  updated() {},
  filters: {
    time(time) {
      return moment(time).format("YYYY-MM-DD");
    }
  }
};
</script>

<style type="text/scss" lang="scss" scoped>
@import "~@/assets/scss/mixin.scss";
@import "~@/assets/scss/reset.scss";
@import "~@/assets/scss/const.scss";
.news-main {
  text-align: left;
  h2 {
    font-size: 14px;
    color: #333;
    height: 40px;
    line-height: 20px;
    overflow: hidden;
    margin: 10px;
  }
  .title-box {
    font-size: 10px;
    color: #666;
    height: 10px;
    padding: 10px 10px 15px;
    .column {
      color: #3f83e6;
    }
    .view {
      i {
        display: block;
        float: left;
        width: 12px;
        height: 12px;
        margin: 3px 5px;
        @include bg-image("../img/view");
        background-size: 12px auto;
      }
    }
  }
  .project1 {
    margin-top: 0px;
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
  .project2 {
    overflow: hidden;
    clear: both;
    @include onepx("bottom");
    h2 {
      padding: 0;
      margin: 12px 0 12px;
    }
    .main-news {
      width: 62.6%;
      margin-right: 2.7%;
      margin-left: 2.7%;
    }
    .title-box {
      padding-left: 0;
    }
    .img-warp {
      width: 29.3%;
      margin-right: 2.7%;
      .img {
        width: 100%;
        height: 71px;
        border-radius: 3px;
        margin: 14px 0;
        img {
          width: 100%;
          height: 100%;
        }
      }
    }
  }
  .more {
    font-size: 12px;
    color: #3f80e9;
    margin-top: 20px;
    text-align: center;
    i {
      display: inline-block;
      width: 12px;
      height: 12px;
      @include bg-image("../img/more");
      background-size: 12px auto;
      margin-left: 6px;
    }
  }
  .blank{
    height:75px;
  }
}
</style>

<template>
<div class="home">
  <!-- 轮播图 -->
  <div class="slider" id="slider1">
    <mt-swipe :auto="4000" @change="handleChange" :prevent="false">
      <mt-swipe-item v-for="item in swipeObj" :key="item.id">
         <router-link   :to="{path:'/news/news-detail/',query: {id: item.id}}" style="background: rgba(51,51,51,.5)">
           <img v-lazy="host+item.thumbnail">
           <p id="slider2">{{item.title.length>14 ? item.title.substr(0,14) +'...' : item.title}} </p>
           <div class="bg-slider"></div>
         </router-link>
      </mt-swipe-item>
    </mt-swipe>
  </div>
  <div class="cross-line"></div>

     <div class="project" v-for="(article,index) in articles" :key="article.id">
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
          <img v-lazy="host+article.thumbnail" alt=""/>
        </div>
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
      </router-link>
    </div>
  <div class="more">
    <span @click='loadMore' v-text="moreText">查看更多</span><i v-show="isIcon"></i>
  </div>
  <div class="blank"></div>
</div>
</template>
<script>
import tool from "@/api/tool";
import moment from 'moment'
export default {
  component: {},
  data() {
    return {
      host: tool.oos(),
      swipeObj: [],
      swiperOption: {
        slidesPerView: 3,
        spaceBetween: 30,
        freeMode: true,
        on:{
          slidePrevTransitionEnd:()=>{
            if(this.weekList != null && this.weekList.length >= 0 && this.weekList.length <this.weekTotal){
              this.weekNew()
            }
          }
        }
      },
      page: 1,
      articles: null,
      moreText: '查看更多',
      isIcon: true,
      weekPageSize:4,//投融资周报每页数据量
      weekPage:1 ,//页码
      weekList:[],
      weekTotal:0,//投融资总数据
      translate: null
    };
  },
  computed: {
    swiper() {
      return this.$refs.mySwiper.swiper
    }
  },
  watch: {
  },
  methods: {
    handleChange(index) {},
    loadMore() {
      if(!this.isIcon){
        return
      }
      let param = tool.buildForm([
        { key: "page", v: this.page },
        { key: "rouCount", v: 10 },
        { key: "level", v: 2002 }
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
            // this.isMore = this.articles.length != res.data.total;
            if(this.articles.length < res.data.total){
              this.moreText='查看更多'
            }else{
              this.moreText='没有更多了';
              this.isIcon = false;
            }
          }
          this.page = this.page + 1;
        });
    },
    weekNew(){
      //发送请求分页查询数据
      this.$api.post('/app/news/article/getLevelActive', {
        page: this.weekPage,
        rouCount: this.weekPageSize,
        cid: "1007"
      }).then(r => {
        if (r.code == 200) {
          console.log(this.weekList.length);
          this.weekList=this.weekList.concat(r.data);
          this.weekTotal=r.total;
          this.weekPage += 1;
        }
      });
    },
    //查看投融资周报详情
    lookWeek(articleId){
      this.$router.push({path:'/news/news-detail/',query: {id: articleId}});
    }
  },
  mounted() {
    this.axios
      .post(tool.domind() + "/gateway/app/news/article/getNewHomeBanner")
      .then(res => {
        if (res.data.code === 200) {
          this.swipeObj = res.data.data;
        }
      });
    this.loadMore();

    this.weekNew();
    // console.log(this.swiper);
  },
  activated() {},
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
.home {
  text-align: left;
  .slider {
    touch-action: none;
    height: 186px;
    font-size: 30px;
    text-align: center;
    overflow: hidden;
    img {
      width: 100%;
      height: 100%;
    }
    #slider2 {
      font-size: 15px;
      font-weight: 600;
      color: #fff;
      height: 36px;
      line-height: 18px;
      margin-top: -34px;
      padding: 0px 10px;
      text-align: left;
      width: 300px;
      text-overflow:ellipsis;
      white-space : nowrap;
      overflow : hidden;
      /*background: rgba(51,51,51,.5);*/
      z-index: 11;
      position: relative;
    }
  }
  #slider1 {
    position: relative;
    .mint-swipe-indicators {
      right: 10px;
    }
    .bg-slider{
      background: rgba(51,51,51,.5);
      position:absolute;
      bottom: 0;
      left: 0;
      width:100%;
      height:35px;
      z-index: 10;
    }
  }
  #slider3 {
    padding-top: 17px;
    padding-bottom: 13px;
    .swiper-slide{width:110px; margin: 0 10px !important;}
    .invest-finance {
      width: 110px;
      height: 55px;
      padding-top: 20px;
      @include bg-image("../img/slider-bg");
      background-size: 110px auto;
      text-align: center;
      box-shadow: 0px 3px 7px #eee;
      h3 {
        font-size: 14px;
        color: #666;
        height: 35px;
        line-height: 35px;
        overflow: hidden;
      }
      .time {
        font-size: 11px;
        color: #3f83e6;
        height: 20px;
        line-height: 20px;
        overflow: hidden;
      }
    }
  }
  .cross-line {
    width: 100%;
    height: 10px;
    background-color: #f5f5f5;
  }
  .project {
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
      margin-top: 14px;
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
        padding-right: 0;
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

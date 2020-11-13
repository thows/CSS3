<template>
  <div class="index bg-blank">
    <header class="gradient">INDUSTRYC2C
      <i class="icon_search" @click="search"></i>
    </header>
    <!-- 轮播图 -->
    <div  class="slider" id="sliderIndex1">
      <mt-swipe :auto="3000" v-if="topsbanner!=null">
        <mt-swipe-item  v-for="banner in topsbanner" :key="banner.id">
            <img :src="banner.pic" alt=""/>
        </mt-swipe-item>
      </mt-swipe>
    </div>
    <div class="today-announce">
      <i class="icon-anno"></i>
      <div class="anno" id="anno">
        <em>今日公告：</em>
        <div id="box">
          <ul id="con1" ref="con1" :class="{anim:animate==true}">
            <!--<li v-for='item in items'>{{item.length>18 ? item.substr(0,18)+'...' :item }}</li>-->
            <li v-for='item in items'>{{item}}</li>
          </ul>
        </div>
      </div>
    </div>
    <CrossLine></CrossLine>
    <div class="tab-warp">
      <div class="tab-project">
        <div class="recommend tab-box" :class="{active:tabActive==1}" @click="changePanel(1)">项目推荐</div>
        <div class="case tab-box" :class="{active:tabActive==2}" @click="changePanel(2)">成功案例</div>
      </div>
    </div>
    <div id="index-industry" :class="{active:tabActive==1}">
      <!-- swiper -->
      <swiper :options="swiperOption">
        <swiper-slide style="margin-right: 0">
          <div class="slide-warp" @click="changeIndustry(1)">
            <i class="icon-renewable"></i>
            <span>可再生能源</span>
          </div>
        </swiper-slide>
        <swiper-slide style="margin-right: 0">
          <div class="slide-warp" @click="changeIndustry(2)">
            <i class="icon-Infra"></i>
            <span @click="changeIndustry(2)">基础设施</span>
          </div>
        </swiper-slide>
        <swiper-slide>
          <div class="slide-warp" @click="changeIndustry(3)">
            <i class="icon-forestry"></i>
            <span @click="changeIndustry(3)">农林牧渔</span>
          </div>
        </swiper-slide>
        <swiper-slide>
          <div class="slide-warp" @click="changeIndustry(4)">
            <i class="icon-fuelgas"></i>
            <span @click="changeIndustry(4)">供水燃气</span>
          </div>
        </swiper-slide>
        <swiper-slide>
          <div class="slide-warp" @click="changeIndustry(5)">
            <i class="icon-building"></i>
            <span @click="changeIndustry(5)">建筑建材</span>
          </div>
        </swiper-slide>
        <swiper-slide>
          <div class="slide-warp" @click="changeIndustry(6)">
            <i class="icon-Petroleum"></i>
            <span @click="changeIndustry(6)">石油化工</span>
          </div>
        </swiper-slide>
      </swiper>
    </div>
    <div class="pro-recommend">
      <ProjectRecommend :tabPanel="this.tabActive"
                        :industryCategory="this.industryCategory"

      ></ProjectRecommend>
    </div>
    <CrossLine></CrossLine>
    <div class="feedback">
      <div class="title">
        <i class="icon-feed"></i>
        <span>意见反馈</span>
      </div>
      <div class="heart">
        <div class="hear_txt clearfix">
          <div class="left crowdimg">
          </div>
          <div id="crowdtext">
            <p style="height:18px;line-height: 18px;font-size: 13px;color:#333;text-align: left;">
              您好，您对海外项目有任何问题或者有什么建议都可以留言给我们。我们会及时与您联系！</p>
            <div style="text-align: right;margin-top:20px; ">
              <span
                style="display: inline-block;border-bottom: 1px solid #ccc;width: 80px;margin-right: 8px;margin-bottom: 5px;"></span>
              <span style="color:#333;font-size: 14px">Javi</span>
            </div>
          </div>
          <div class="clear"></div>
        </div>
        <div class="heart_comment clearfix">
          <textarea id="fdContent" class="tit_inp" placeholder="请输入问题或建议" v-model="homeContent1"></textarea>
          <p class="click-me" v-show="fdContactShow" @click="ContactShow">点我>>留下您的联系方式，有惊喜哦</p>
          <input id="fdContact" v-show="!fdContactShow" type="text" placeholder="请输入联系方式" class="in_phone" v-model="homeContact">
          <div id="feedbackAction" class="btn" @click="indexFeedBack">提交</div>
        </div>
      </div>
    </div>
    <CrossLine></CrossLine>
    <div class="contact-way clearfix">
      <div class="fl msg">
        <div class="logo"></div>
        <p>北京中工源合信息科技有限公司</p>
        <p class="mb25">中国领先的海外产业投资综合服务商</p>
        <p>商业合作：136 0131 5595（Mr Zhang）</p>
        <p class="mb16">合作邮箱：support@bjciri.com</p>
      </div>
      <div class="fr qr-warp">
        <div class="qrimg">
          <img src="./img/icon-qr.png" alt=""/>
        </div>
        <div class="qr-des">源合网订阅号</div>
      </div>
    </div>
    <tab-bar></tab-bar>
  </div>

</template>

<script>
  import TabBar from '@/components/base/tab-bar/tab-bar'
  import CrossLine from '@/components/base/cross-line/cross-line'
  import ProjectRecommend from '@/components/base/project-recommend/project-recommend'
  import {Toast} from 'mint-ui'
  import {MessageBox} from 'mint-ui'
  import tool from "../../api/tool";

  export default {
    components: {
      TabBar,
      CrossLine,
      ProjectRecommend
    },
    data() {
      return {
        category:null,
        host: tool.oos(),
        animate: false,
        lastnotify: [],
        topsbanner: [
          {
            pic: require('./img/index-banner1.png')
          },
          {
            pic: require('./img/index-banner2.png')
          },
          {
            pic: require('./img/index-banner3.png')
          },
          {
            pic: require('./img/index-banner4.png')
          },
          {
            pic: require('./img/index-banner5.png')
          },

        ],
        items : [],
        swiperOption: {
          slidesPerView: 3.5,
          spaceBetween: 20,
          freeMode: true
        },
        swiperOption2: {
          slidesPerView: 3,
          spaceBetween: 30,
          freeMode: true,
          on:{
            slidePrevTransitionEnd:()=>{
              // console.log(this.weekList);
              if(this.weekList != null && this.weekList.length >= 0 && this.weekList.length <this.weekTotal){
                this.weekNew()
              }
            }
          }
        },
        weekPageSize:4,//投融资周报每页数据量
        weekPage:1 ,//页码
        weekTotal:0,//总数据
        weekList:[],
        tabActive: 1,
        homeContent1:'',
        homeContact: '',
        fdContactShow:true
      }
    },
    computed: {
      industryCategory: function () {
        return this.category;
      }
    },
    mounted() {
      //今日公告
      let timer=setInterval(this.scroll, 2000);
      this.$api.post('/pb/i/fethomescene', {lang: 0, rouCount: 5}).then(r => {
        this.lastnotify = r.data.lastnotify;
        console.log(this.lastnotify.length);
        if(this.items){
          if(this.lastnotify.length==1){
            clearInterval(timer)
            // 解决ios兼容性问题
            // let anno=document.getElementById('anno')
            // anno.style.verticalAlign='top';
          }else {
            console.log('11');
          }
        }
        for(var i in r.data.lastnotify){
          this.items.push(r.data.lastnotify[i].title);
        }
        // this.topsbanner = r.data.topsbanner;
      });

      this.weekNew();
    },
    methods: {
      ContactShow(){
        this.fdContactShow = false
      },
      //今日公告
      scroll() {
        this.animate = true;    // 因为在消息向上滚动的时候需要添加css3过渡动画，所以这里需要设置true
        setTimeout(() => {
          this.items.push(this.items[0]);  // 将数组的第一个元素添加到数组的
          this.items.shift();//  这里直接使用了es6的箭头函数，省去了处理this指向偏移问题，代码也比之前简化了很多
          this.animate = false;  // margin-top 为0 的时候取消过渡动画，实现无缝滚动
        }, 500)
      },
      changeIndustry(category) {
        this.category = category;
      },
      changePanel(tab) {
        this.tabActive = tab;
      },
      indexFeedBack(){
        if(!this.homeContent1){
          Toast({
            message: '请输入问题或建议',
            duration: 5000
          });
          return;
        }
        let param = tool.buildForm([
          { key: "content", v: this.homeContent1 },
          { key: "contact", v: this.homeContact }
        ]);
        this.axios.post(tool.domind()+'/gateway/app/feedback',param).then(res => {
          if (res.data.code === 200) {
            MessageBox({
              message: '提交成功，我们会尽快联系您！',
              showCancelButton: false
            });
            this.homeContent1 = "";
            this.homeContact = "";
          }
        }).catch(err => {
          tool.toast(err);
        })
      },
      search () {
        this.$router.push({ path: "/search" });
      },
      //投融资周报
      weekNew(){
        //发送请求分页查询数据
        this.$api.post('/app/news/article/getLevelActive', {
          page: this.weekPage,
          rouCount: this.weekPageSize,
          cid: "1007"
        }).then(r => {
          if (r.code == 200) {
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
    }
  }
</script>
<style type="text/scss" lang="scss" scoped>
  @import '~@/assets/scss/const.scss';
  @import '~@/assets/scss/mixin.scss';
  @import '~@/assets/scss/index.scss';

  .index {
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
    .gradient {
      width: 100%;
      height: 44px;
      @include bg-image("../mine/img/header-bg");
      background-repeat: no-repeat;
      background-size: 100% 44px;
    }
    .slider {
      touch-action: none;
      height: 150px;

      img {
        width: 100%;
        height: 100%;
      }

    }
    .today-announce {
      text-align: left;
      padding: 0 10px;
      height: 30px;
      line-height: 30px;

      i.icon-anno {
        display: inline-block;
        height: 30px;
        width: 16px;
        @include bg-image('./img/icon-anno');
        background-size: 16px auto;
        background-position: center;
        background-repeat: no-repeat;
        margin-right: 7px;
      }

      .anno {
        display: inline-block;
        font-size: 12px;
        height: 30px;
        line-height: 30px;
        padding-left: 65px;
        position: relative;
        vertical-align: top;

        em {
          font-style: italic;
          color: #f5435d;
          position: absolute;
          left: 0px;
          top: 0;
          font-weight: 600;

        }

        #box {
          overflow: hidden;
          display: inline-block;
          color: #010101;
          height: 30px;
        }

        .anim {
          transition: all 0.5s;
          margin-top: -30px;
        }

        #con1 {

          li {
            list-style: none;
            line-height: 30px;
            height: 30px;
            width: 240px;
            text-overflow: ellipsis;
            white-space: nowrap;
            overflow: hidden;
            @media screen and (min-device-width: 414px) and (max-width: 799px) {
              width: 240px;
            }

            @media screen and (min-device-width: 375px) and (max-width: 413px) {
              width: 240px;
            }

            @media screen and (min-width: 320px) and (max-width: 374px) {
              width: 200px;
            }
          }

        }
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
        @include bg-image("../news/img/slider-bg");
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
          font-size: 12px;
          color: #3f83e6;
          height: 20px;
          line-height: 20px;
          overflow: hidden;
        }
      }
    }
    #index-industry {
      padding: 9px 10px;
      display: none;
      overflow: hidden;
      &.active{
        display: block;
      }
      .swiper-container{
        overflow: visible;
      }
      .swiper-slide{
        padding: 10px 0;
        margin-right:20px;
        box-shadow: 0px 3px 7px #eee;
      }

      i {
        display: block;
        width: 37px;
        height: 37px;
        margin: auto;
        background-size: 37px auto;
        background-repeat: no-repeat;
      }

      .icon-renewable {
        @include bg-image("./img/icon-renewable");
      }

      .icon-Infra {
        @include bg-image("./img/icon-Infra");
      }

      .icon-forestry {
        @include bg-image("./img/icon-forestry");
      }

      .icon-fuelgas {
        @include bg-image("./img/icon-fuelgas");
      }

      .icon-building {
        @include bg-image("./img/icon-building");
      }

      .icon-Petroleum {
        @include bg-image("./img/icon-Petroleum");
      }

      span {
        display: block;
        font-size: 14px;
        height: 14px;
        line-height: 14px;
        margin-top: 8px;
      }

    }
    .tab-warp {
      @include onepx('bottom');

      .tab-project {
        height: 40px;
        line-height: 40px;
        font-size: 17px;
        display: flex;
        flex-direction: row;
        .tab-box {
          color: #333;
          flex: 1;
          &.active {
            color: #528de8;
            @include bottom-bar();
            &:before{
              right:50%;
              margin-right: -14px;
              height:3px;
              background:#528de8 ;
            }
          }
        }
        .recommend {
          @include right-bar();
          margin-right: 0;
          &:after{
            right:0;
          }
        }

        .case {
          margin-left: 0px;

        }

      }
    }
    .feedback {

      .title {
        position: relative;
        height: 40px;
        line-height: 1;
        padding-left: 10px;
        @include onepx('bottom');

        .icon-feed {
          display: block;
          width: 20px;
          height: 40px;
          @include bg-image('./img/icon-feed');
          background-size: 20px auto;
          background-position: center;
          background-repeat: no-repeat;
        }

        span {
          font-size: 16px;
          color: #333;
          position: absolute;
          top: 12px;
          left: 39px;
        }

      }
      .heart {

        .title_enter {
          position: relative;
          color: #333;
          font-size: 16px;
          line-height: 16px;
          margin-bottom: 24px;
          margin-top: 25px;
          text-align: left;
        }

        .hear_txt {
          padding: 0 10px;
          padding-top: 9px;

          .left {
            padding-right: 3%;
            margin-right: 3%;
            text-align: center;
            border-right: 1px solid #d9d6e8;
            float: left;
            width: 18%;
          }

          .crowdimg {
            display: inline-block;
            width: 55px;
            height: 55px;
            background-size: 55px auto;
            @include bg-image("./img/javi");
            background-repeat: no-repeat;
          }

          #crowdtext {
            float: right;
            width: 75%;
            color: #333;
            font-size: 13px;
          }

          .clear {
            clear: both;
          }

        }
        .heart_comment {
          padding: 0 10px;
          font-size: 13px;
          color: #999;

          .in_phone {
            outline: 0;
            width: 92%;
            height: 36px;
            line-height: 16px;
            border: 1px solid #dedede;
            border-radius: 5px;
            padding: 0 3.4%;
            margin-top: 11px;
            margin-bottom: 13px;
          }

          .tit_inp {
            margin-top: 13px;
            width: 92%;
            background: #fff;
            outline: 0;
            border: 1px solid #dedede;
            border-radius: 5px;
            padding: 3.4%;
            line-height: 16px;
            height: 101px;
            resize: none;
            font-family: "Microsoft Yahei";
          }
          .click-me{
            font-size: 13px;
            color:#528de8;
            line-height: 13px;
            height:13px;
            margin: 13px 0;
            text-align: left;
          }

          #feedbackAction {
            width: 113px;
            height: 35px;
            line-height: 35px;
            float: right;
            border-radius: 5px;
            margin-bottom: 17px;
            font-size: 16px;
            background: #528de8;
          }

        }
      }
    }
    .contact-way {
      padding: 14px 11px 9px;
      margin-bottom: 50px;

      .msg {
        text-align: left;
        @media screen and (min-device-width: 375px) and (max-width: 413px) {
          width: auto;
        }

        @media screen and (min-width: 320px) and (max-width: 374px) {
          width: 200px;
        }

        .logo {
          display: inline-block;
          height: 30px;
          width: 162px;
          @include bg-image('./img/ciri-logo');
          background-size: 162px 30px;
          margin-bottom: 8px;
        }

        p {
          font-size: 13px;
          color: #333;
          line-height: 1;
          margin-bottom: 7px;
        }

        .mb25 {
          margin-bottom: 20px;
        }

      }
      .qr-warp {
        margin-top: 14px;

        .qrimg {
          display: inline-block;
          height: 89px;
          width: 89px;
          img{
            width:100%;
            height:100%;
          }
        }

        .qr-des {
          margin-top: 10px;
          font-size: 12px;
          color: #333;
          line-height: 1;
        }

      }

    }

  }
</style>

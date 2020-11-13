<template>
<div class="introduction">
  <h4>
    <i class="left-line"></i><span>项目简介</span>
  </h4>
  <div class="company-msg">
    <table width="100%" cellspacing="0" cellpadding="0">
      <tbody>
        <tr>
          <td>项目名称：</td>
          <td>{{projName}}</td>
        </tr>
        <tr>
          <td>项目类型：</td>
          <td>{{constructionType}}</td>
        </tr>
        <tr>
          <td>所属行业：</td>
          <td>{{industry}}</td>
        </tr>
        <tr>
          <td>项目位置：</td>
          <td>{{projAddress}}</td>
        </tr>
        <tr>
          <td>所在区域：</td>
          <td>{{projArea}}</td>
        </tr>
        <tr>
          <td>项目规模：</td>
          <td>{{amount}}</td>
        </tr>
        <tr>
          <td>投资方式：</td>
          <td>{{investMode}}</td>
        </tr>
        <tr>
          <td>投资收益率：</td>
          <td>{{irr}}%</td>
        </tr>
        <tr>
          <td>项目开发商：</td>
          <td>
            <div v-if="projDevelopers != null && projDevelopers.length > 0">{{projDevelopers.length>7?projDevelopers.substring(0,4)+'***'+projDevelopers.substring(projDevelopers.length-2,projDevelopers.length):projDevelopers}}</div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <CrossLine></CrossLine>
  <h4>
    <i class="left-line"></i><span>项目里程碑</span>
  </h4>
  <div class="intro-progress">
    <table width="100%" cellspacing="0" cellpadding="0">
      <tbody>
        <tr>
          <td>1.项目现场勘查 <i v-bind:class="[foreignCurrencyApprovalDone ? 'progress-finished' : 'progress-unfinished']"></i> </td>
          <td>5.完成项目投资签约<i v-bind:class="[investAgreementDone ? 'progress-finished' : 'progress-unfinished']"></i></td>
        </tr>
        <tr>
          <td>2.项目可研报告 <i v-bind:class="[feasibilityReportDone ? 'progress-finished' : 'progress-unfinished']"></i> </td>
          <td>6.完成项目融资流程<i v-bind:class="[financingContractDone ? 'progress-finished' : 'progress-unfinished']"></i></td>
        </tr>
        <tr>
          <td>3.项目土地批复 <i v-bind:class="[landApplyDone ? 'progress-finished' : 'progress-unfinished']"></i> </td>
          <td>7.完成项目承建签约<i v-bind:class="[generalContractorAgreementDone ? 'progress-finished' : 'progress-unfinished']"></i></td>
        </tr>
        <tr>
          <td>4.项目各项许可 <i v-bind:class="[environmentApprovalDone ? 'progress-finished' : 'progress-unfinished']"></i> </td>
          <td>8.完成项目建设&#12288;&#12288;<i v-bind:class="[infrastructureDone ? 'progress-finished' : 'progress-unfinished']"></i></td>
        </tr>
      </tbody>
    </table>
  </div>
  <CrossLine></CrossLine>
  <div class="intro-video" v-show="setProjVideo" v-if="authrityStatus">
    <h4>
      <i class="left-line" ></i><span>项目视频</span>
    </h4>
    <div class="video-warp">
      <swiper :options="swiperOptionTop" class="gallery-top" ref="swiperTop">
        <swiper-slide v-if="videos != null" v-for="(v ,index) in videos" :key="index" v-bind:style="{backgroundImage: 'url(' +v.cover.name+ ')'}">
          <video  @click="video($event)" controls :src="v.url"></video>
        </swiper-slide>
      </swiper>
      <!-- swiper2 Thumbs -->
      <swiper :options="swiperOptionThumbs" class="gallery-thumbs" ref="swiperThumbs">
        <swiper-slide v-if="videos != null" v-for="(v ,index) in videos" :key="index">
          <img v-lazy="v.cover.name" alt="">
          <div class="title" v-if="v.summary != null && v.summary.valueCn != null">{{v.summary.valueCn}}</div>
        </swiper-slide>
      </swiper>
    </div>
    <CrossLine></CrossLine>
  </div>
  <div v-if="!authrityStatus">
    <div class="no-radio" @click="showAuthWindow"></div>
    <!--权限弹框-->
    <Authority :authorityShow="authorityShow" @authorityHide="authorityHide" @upgrade="upgrade"></Authority>
  </div>

  <Article :content="productService" text="项目详情"></Article>
  <BigImg v-if="this.photo!=null" :content="this.photo"></BigImg>
  <CrossLine></CrossLine>
  <Article :content="operateMetric" text="投资环境"></Article>
  <CrossLine></CrossLine>

</div>
</template>

<script>
  import CrossLine from '@/components/base/cross-line/cross-line'
  import Article from '@/components/base/article/article'
  import Authority from '@/components/base/authority/authority'
  import AuthorityPage from '@/components/base/authrityPage/authrityPage.vue'
  import BigImg from '@/components/base/big-img/big-img'
  import tool from '@/api/tool'
    export default {
        components: {
          CrossLine,
          Article,
          Authority,
          AuthorityPage,
          BigImg
        },
        data() {
            return {
              //项目视频
              swiperOptionTop: {
                spaceBetween: 10,
                // loop: true,
                loopedSlides: 5, //looped slides should be the same
              },
              swiperOptionThumbs: {
                spaceBetween: 5,
                centeredSlides: true,
                slidesPerView: 3,
                touchRatio: 0.2,
                // loop: true,
                loopedSlides: 5, //looped slides should be the same
                slideToClickedSlide: true,
              },
              projId: null,
              projName: null,//名字
              amount: null,//总投资
              irr: null,//收益率
              projDevelopers: null,//开发商
              projAddress: null,//项目地点 如伊朗
              projArea: null,//所在区域  内陆
              constructionType: null,//项目类型 （新建）
              investMode: null,//投资方式
              industry: null,//所属行业
              foreignCurrencyApprovalDone: false,//项目现场勘察
              investAgreementDone: false,//完成项目投资签约
              feasibilityReportDone: false,//项目可研报告
              financingContractDone: false,//完成项目融资流程
              landApplyDone: false,//项目土地批复
              generalContractorAgreementDone: false,//完成项目承建签约
              environmentApprovalDone: false,//项目各项许可
              infrastructureDone: false ,//完成项目建设
              productService: null,
              operateMetric: null,
              setProjVideo: true,
              videos: null,
              authorityShow:false,
              authrityStatus: false,
              photo: null

            }
        },
        props: {},
        watch: {},
        methods: {
          //项目视频
          video (e ,url) {
            let element = e.currentTarget;
            // element.classList.add('active');
            element.play();
          },
          upgrade () {
            this.$router.push({ path: "/mine/member-center" });
          },
          //权限弹框
          authorityHide () {
            this.authorityShow = false;
          },
          showAuthWindow(){
            this.authorityShow = true;
          },
        },
        filters: {},
        computed: {},
        created() {
          let level = localStorage.getItem("userLevel");
          if(level === '1'){
            this.authrityStatus = false;
          }else{
            this.authrityStatus = true;
            this.authorityShow = false;
          }
          this.projId = parseInt(this.$route.query.projId)
          this.$api.post('/ah/s0/getProjectAbstractInfo',
            {projId: this.projId, username: tool.getuser()}).then(res => {
            this.projName = res.data.projName
            this.photo = res.data.photo
            this.amount = res.data.amount
            this.irr = res.data.irr.replace(/.00/g, '')
            this.projDevelopers = res.data.projDevelopers
            this.projAddress = res.data.projAddress
            this.projArea = res.data.projArea
            this.constructionType = res.data.constructionType
            this.investMode = res.data.investMode
            this.industry = res.data.industry
            this.foreignCurrencyApprovalDone = res.data.foreignCurrencyApprovalDone
            this.investAgreementDone = res.data.investAgreementDone
            this.feasibilityReportDone = res.data.feasibilityReportDone
            this.financingContractDone = res.data.financingContractDone
            this.landApplyDone = res.data.landApplyDone
            this.generalContractorAgreementDone = res.data.generalContractorAgreementDone
            this.environmentApprovalDone = res.data.environmentApprovalDone
            this.infrastructureDone = res.data.infrastructureDone
            this.productService = res.data.productService
            this.operateMetric = res.data.operateMetric
            this.setProjVideo = res.data.setProjVideo
            this.videos = res.data.videos

            if (!this.setProjVideo)
              return
            let urlStr = ''
            for (var i = 0; i < this.videos.length; i++) {
              urlStr = urlStr.concat(',').concat(this.videos[i].url)
            }
            urlStr = urlStr.substring(1, urlStr.length);
            this.$api.post('/ah/s3/p/getProjVideoUrl',
              {urlStr: urlStr}).then(res => {
                let arr = null
                arr = res.split(",")
                for (var i = 0; i < arr.length; i++) {
                  this.videos[i].url = arr[i]
                }

            })
          })
        },
      mounted() {
        //项目视频
        this.$nextTick(() => {
          const swiperTop = this.$refs.swiperTop.swiper
          const swiperThumbs = this.$refs.swiperThumbs.swiper
          swiperTop.controller.control = swiperThumbs
          swiperThumbs.controller.control = swiperTop
        })
      },
      destroyed() {
      }
    }
</script>

<style type="text/scss" lang="scss" scoped>
    @import '~@/assets/scss/reset.scss';
    @import '~@/assets/scss/mixin.scss';
  .introduction{
    h4{
      text-align: left;
      overflow: hidden;
      line-height: 1;
      height: 16px;
      padding: 12px 10px 12px 15px;
      color: #333;
      font-size: 16px;
      font-weight: normal;
      @include onepx('bottom');
      .left-line{
        position: absolute;
        display: block;
        width: 3px;
        height: 15px;
        background-color: #528de8;
        left: 0;
        top:12px;
      }
    }
    .company-msg{
      padding: 15px;
      margin-bottom: 7px;
      table{
        border-collapse: collapse;
        tr{
          height:28px;
          line-height: 28px;
          font-size: 13px;
          color: #666;
          td:first-child{
            text-align: left;
            width: 90px;
          }
          td:last-child{
            text-align: left;
            color: #333;
          }
        }
      }
    }
    .intro-progress{
      margin-top: 10px;
      margin-bottom: 12px;
      table{
        tr{
          font-size: 13px;
          color: #666;
          height:24px;
          line-height: 24px;
          td{
            width: 50%;
            &:first-child{
              text-align: center;
              border-right:1px solid #dedede;
              padding: 0 6px 0 5px;
            }
            &:last-child{
              text-align: left;
              padding-left: 20px;
            }
            i{
              display: inline-block;
              width: 13px;
              height: 13px;
              margin-left: 10px;
              background-repeat: no-repeat;
              background-size: 13px auto;
              background-position: center;
              margin-top: -2px;
              vertical-align: middle;
            }
            i.progress-finished{
              @include bg-image("../../img/progress-finished");
            }
            i.progress-unfinished{
              @include bg-image("../../img/progress-unfinished");
            }
          }
        }
      }
    }
    .intro-video{
      h4{
        &:after{
          border: none;
        }
      }
      .video-warp{
        /*阻止浏览器默认事件*/
        /*touch-action: none;*/
        padding: 10px;
        .swiper-slide {
          background-size: cover;
          background-position: center;
          &.slide-1 {
            background-image:url('../../../news/img/p_1.jpg');
          }
          &.slide-2 {
            background-image:url('../../../news/img/p_2.jpg');
          }
          &.slide-3 {
            background-image:url('../../../news/img/p_3.jpg');
        }
          &.slide-4 {
            background-image:url('../../../news/img/p_1.jpg');
          }
          img{
            width: 100%;
            height:100%;
          }
          video{
            width:100%;
            height:100%;
          }
          video.active{
            opacity: 1;
          }
        }
        .gallery-top {
          height: 189px!important;
          width: 100%;
        }
        .gallery-thumbs {
          height: 90px!important;
          box-sizing: border-box;
          margin-top: 12px;
          background: rgba(179, 171, 171, 0.5);
          img{
            width: 100%;
            height:60px;
          }
          .title{
            font-size: 13px;
            color:#fff;
            line-height: 1;
            margin-top: 5px;

          }

        }
        .gallery-thumbs .swiper-slide {
          width: 59.7%;
          height: 100%;
          background-image: none;
          background: #eee;
          opacity: .4;
        }
        .gallery-thumbs .swiper-slide img{
          border: 3px solid transparent;
          box-sizing: border-box;
        }
        .gallery-thumbs .swiper-slide-active{
          opacity:1;
          .title{
            color: #000;
          }
        }

      }
    }
    .no-radio{
      width: 100%;
      height: 310px;
      background-repeat: no-repeat;
      background-size: auto auto;
      @include bg-image("../../img/no-radio");
      background-position: center;
    }
    .intro-detail,.investment-environment{
      .article{
        margin-top: 10px;
        padding: 0 10px;
        font-size: 13px;
        line-height: 22px;
        color:#666;
        &.active{
          height:330px;
          overflow : hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 15;
          -webkit-box-orient: vertical;
        }
      }
      .read-more{
        font-size: 13px;
        color: #3f80e9;
        margin-top: 5px;
        text-align: center;
        float: right;
        margin-bottom: 17px;
        padding-right: 10px;
        i {
          display: inline-block;
          width: 10px;
          height: 10px;
          background-size: 10px auto;
        }
        i.icon-more{
          @include bg-image("../../../news/img/more");
        }
        i.pack-up{
          @include bg-image("../../img/pack-up");
        }
      }
    }
  }

</style>

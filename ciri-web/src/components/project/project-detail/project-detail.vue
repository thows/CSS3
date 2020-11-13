<template>
  <div class="project-detail bg-blank">
    <div ref="fixedHeardvisit" id="fixedHeardvisit">
      <projectHeader :visit="visit"
                     :projName="projName"
                     :cornerTag="cornerTag"
                     :projType="projType"
                     :tag="tag"
                     :status="status"
                     :tags="tags"
                     :setProjVideo="setProjVideo"
                     :projPhoto="projPhoto"
                     :projAddress="projAddress"
                     :industryId="industryId"
                     :projMaturity="projMaturity" text="项目详情"></projectHeader>
      <div class="project-intro">
        <h4>
          <i class="left-line"></i><span>项目简介</span>
        </h4>
        <p class="document-txt">{{projAbstract}}</p>
        <div class="progress-model">
          <svgIcon :irr="irr"
                   :amount="amount"
                   :projDevelopers="projDevelopers"
                   :potentialInvestorSize="potentialInvestorSize"
                   :financingProgress="financingProgress"></svgIcon>
        </div>
        <div class="btn-warp">
          <div v-bind:class="[isLikes ? 'thumbs-up active' : 'thumbs-up', '']" @click="giveLikes">
            <i class="icon-dianzan"></i>
            <span class="count-warp">看好</span>
            <span class="count">{{likes}}</span>
          </div>
          <div class="share thumbs-up">
            <i class="icon-dianzan"></i>
            <span class="count-warp">分享</span>
            <span class="count">{{shares}}</span>
          </div>
        </div>
        <CrossLine></CrossLine>
        <!--关注项目动态-->
        <div class="pro-focus">
          <!-- swiper -->
          <swiper :options="swiperOption" class="slider" v-if="potentialInvestor!=null">
            <swiper-slide v-for="(p, index) in potentialInvestor" :key="index" v-if="potentialInvestor!=null">
              <div class="img">
                <img v-lazy="p.url" alt=""/>
              </div>
              <span>{{p.name}}</span>
            </swiper-slide>
          </swiper>
          <div class="title-focus clearfix">
            <p class="intro fl">关注项目动态后，您将通过站内信和电子邮件获取该项目的最新动态信息，实时跟进项目进展！</p>
            <div v-bind:class="[ interest ? 'focused' : 'state-focus' ,'fr']" @click="interest1">
              <i class="icon-focus"></i>
              <span>{{potentialInvestorSize}}人已关注</span>
            </div>
          </div>
        </div>
        <CrossLine></CrossLine>
      </div>
      <!--项目tab-->
      <div style="height: 45px">
        <div :class="tabWarp">
          <ul class="project-tab" @click="fiexdScrollv">
            <router-link tag="li" :to="{ path: '/project/project-detail/project-evaluation', query: {'projId': projId}}"
                         replace>项目评估
            </router-link>
            <router-link tag="li" :to="{ path: '/project/project-detail/project-progress', query: {'projId': projId,'projPhoto':projPhoto,'projName':projName}}"
                         replace>项目进展
            </router-link>
            <router-link tag="li" :to="{ path: '/project/project-detail/project-answering', query: {'projId': projId}}"
                         replace>项目答疑
            </router-link>
            <router-link tag="li" :to="{ path: '/project/project-detail/investment-intent', query: {'projId': projId}}"
                         replace>投资意向
            </router-link>
          </ul>
        </div>
      </div>
    </div>
    <keep-alive>
      <router-view></router-view>
    </keep-alive>


    <!--项目推荐-->
    <div class="project-rec">
      <h4>
        <i class="left-line"></i><span>项目推荐</span>
        <router-link to="/project" class="detail-warp">
          <span class="to-detail">查看更多</span>
          <i class="more"></i>
        </router-link>
      </h4>
      <ul class="recommdnd-warp clearfix">
        <li class="recommdnd-card" @click="gotoProjLand(f.projId)"
            v-if="fetprojectsList != null" v-for="(f, index) in fetprojectsList" :key="index">
          <div class="img">
            <img :src="f.url" :onerror="defaultImg(f.industryId)" alt="">
          </div>
          <div class="main-news">
            <h2>{{f.name}}</h2>
            <div class="tip-news">
              <i class="indu fl"></i>
              <span class="industry fl" v-if="f.constructionTypeName != null">{{f.constructionTypeName}}</span>
              <span class="count fr" v-if="f.visit != null">{{f.visit}}</span>
              <i class="view fr"></i>
            </div>
          </div>
        </li>
      </ul>

    </div>
    <!--客户经理-->
    <project-manager></project-manager>
    <project-bottom :projId="projId"></project-bottom>
  </div>
</template>

<script>
  import projectHeader from '@/components/base/project-header/project-header'
  import projectBottom from '@/components/base/project-bottom/project-bottom'
  import projectManager from '@/components/base/project-manager/project-manager'
  import svgIcon from '@/components/base/svg-icon/svg-icon'
  import CrossLine from '@/components/base/cross-line/cross-line'
  import tool from '@/api/tool'

  export default {
    components: {
      projectHeader,
      projectBottom,
      projectManager,
      svgIcon,
      CrossLine
    },
    data() {
      return {
        floatp: false,
        // 关注项目动态左右滑动
        swiperOption: {
          slidesPerView: 4.5,
          spaceBetween: 25,
          freeMode: true,
          pagination: {
            el: '.swiper-pagination',
            clickable: true
          }
        },
        tabWarp: 'tab-warp',
        projId: 0,
        projAbstract: null,
        likes: 0,
        collects: null,
        shares: null,
        irr: '0',
        amount: null,
        projDevelopers: '',
        potentialInvestor: null,
        potentialInvestorSize: 0,
        financingProgress: null,
        visit: null,
        projName: null,
        cornerTag: null,
        projType: null,
        tag: null,
        status: null,
        tags: null,
        setProjVideo: false,
        projPhoto: '',
        industryId:null,
        url: '/project/project-detail?projId=',
        isLikes: false,
        collected: false,
        projAddress: '',
        interest: false,
        fetprojectsList: null,
        projMaturity: null
      }
    },
    methods: {
      defaultImg (index){
        if(index){
          return 'this.src="' + require('../../index/img/p_'+index+'.jpg') + '"'
        }
      },
      fiexdScrollv() {
        let d = this.$refs.fixedHeardvisit;
        console.log(d.offsetHeight)
        if (this.floatp) {
          scrollTo(0, d.offsetHeight-37);
        }

      },
      //页面滚动时
      handleScroll() {
        let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
        if (scrollTop > 603) {
          this.tabWarp = 'tab-warp active'
          this.floatp = true;
        } else {
          this.tabWarp = 'tab-warp'
          this.floatp = false;
        }
      },
      giveLikes() {
        if (this.isLikes !== null) {
          tool.toast('不能重复点赞')
          return
        }
        if (tool.getuser() === null) {
          this.$router.replace({path: '/login'})
        }
        this.likes = this.likes + 1
        this.isLikes = true
        this.$api.post('/pb/p/addLike',
          {userId: tool.getuser(), projId: this.projId, tag: 0}).then(res => {
          if (res.code === 200) {

          }
        })
      },
      interest1() {
        if (this.interest) {
          tool.toast('不能重复关注')
          return
        }
        this.interest = true
        this.$api.post('/user/interest',
          {username: tool.getuser(), projId: this.projId}).then(res => {
          if (res.code === 2000) {
            if (this.potentialInvestorSize > 999)
              this.potentialInvestorSize = '999+'
            else
              this.potentialInvestorSize = parseInt(this.potentialInvestorSize) + 1
          }
          this.init()
        })
      },
      init() {
        this.projId = parseInt(this.$route.query.projId)
        this.url = this.url + this.projId

        this.$api.post('/pb/p/getProjectHeadInfo',
          {username: tool.getuser(), projId: this.projId}).then(res => {
          if (res.code === 200) {
            this.projAbstract = res.data.projAbstract
            this.likes = parseInt(res.data.likes)
            this.collects = res.data.collects
            this.shares = res.data.shares
            this.irr = res.data.irr.replace(/.00/g, '')
            this.amount = res.data.amount
            let rdp = res.data.projDevelopers
            if (rdp !== null && rdp.length > 0) {
              if (rdp.length > 7)
                this.projDevelopers = rdp.substring(0, 4) + '...' + rdp.substring(rdp.length - 2, rdp.length)
              else
                this.projDevelopers = rdp
            }
            this.potentialInvestor = res.data.potentialInvestor
            this.potentialInvestorSize = res.data.potentialInvestorSize
            this.financingProgress = res.data.financingProgress
            this.visit = res.data.visit
            this.projName = res.data.projName
            this.cornerTag = res.data.cornerTag
            this.projType = res.data.projType
            this.tag = res.data.tag
            this.status = res.data.status
            this.tags = res.data.tags
            this.setProjVideo = res.data.setProjVideo
            this.projPhoto = res.data.projPhoto
            this.industryId = res.data.industryId
            this.isLikes = res.data.isLikes         //todo 是否点赞 控制 点赞图标的样式
            this.collected = res.data.collected //todo  是否收藏 控制收藏图标的样式
            this.projAddress = res.data.projAddress
            this.interest = res.data.interest
            this.projMaturity = res.data.projMaturity
          }
        });

        this.$api.post('/pb/i/fetprojects',
          {pageSize: 4, status: 7, tag: 101001}).then(res => {
          if (res.code == 200) {
            this.fetprojectsList = res.data.list
          }
        })

      },
      gotoProjLand(id) {
        this.$router.replace({path: '/project/project-land?projId=' + id})
      }
    },
    mounted() {
      // 默认图片
      this.defaultImg();
    },
    created() {
      window.scrollTo(0, 0);
      this.init();
      //页面滚动时
      window.addEventListener('scroll', this.handleScroll);
    },
    destroyed() {
      window.removeEventListener("scroll", this.handleScroll);
    }
  }
</script>

<style type="text/scss" lang="scss" scoped>
  @import "~@/assets/scss/mixin.scss";
  @import "~@/assets/scss/reset.scss";

  .project-detail {

    h4 {
      text-align: left;
      overflow: hidden;
      line-height: 1;
      height: 16px;
      padding: 12px 10px 12px 15px;
      color: #333;
      font-size: 16px;
      font-weight: normal;
      @include onepx('bottom');

      .left-line {
        position: absolute;
        display: block;
        width: 3px;
        height: 15px;
        background-color: #528de8;
        left: 0;
        top: 12px;
      }

      .detail-warp {
        position: absolute;
        right: 0;
        top: 0;
        height: 40px;
        line-height: 1;

        .to-detail {
          display: inline-block;
          font-size: 13px;
          color: #528de8;

        }

        .more {
          display: inline-block;
          width: 10px;
          height: 40px;
          background-repeat: no-repeat;
          background-size: 10px auto;
          background-position: center;
          @include bg-image("../img/to-detail");
          vertical-align: middle;
        }

      }
    }
    .project-intro {
      text-align: left;

      .document-txt {
        padding: 10px;
        font-size: 13px;
        color: #333;
        line-height: 20px;
      }

      .btn-warp {
        display: table;
        margin: -5px auto 25px;

        .thumbs-up {
          display: inline-block;
          border: 1px solid #dedede;
          color: #999;
          font-size: 11px;
          height: 23px;
          padding: 0 8px;
          line-height: 1;
          border-radius: 23px;
          &.active {
            background: #4285f4;
            color: #fff;
            border: 0px;
            .icon-dianzan {
              @include bg-image("../../index/img/thumb-uped");
            }

          }
          .icon-dianzan {
            display: inline-block;
            width: 11px;
            height: 23px;
            background-repeat: no-repeat;
            background-size: 11px auto;
            background-position: center;
            @include bg-image("../../index/img/thumb-up");
            vertical-align: bottom;
          }

          .count-warp {
            display: inline-block;
            height: 23px;
            line-height: 23px;
          }

          .count {
            font-size: 11px;
          }

        }
        .share {
          margin-left: 25px;

          .icon-dianzan {
            @include bg-image("../../base/img/icon-share");
          }

        }
      }
      .pro-focus {
        padding: 0 10px;

        .slider {
          border-bottom: 1px dashed #dedede;
          padding: 15px 0 10px;

          .img {
            width: 45px;
            height: 45px;
            border-radius: 50%;
            overflow: hidden;
            margin: 0px auto 7px;

            img {
              width: 100%;
              height: 100%;
            }

          }
          span {
            font-size: 12px;
            color: #333;
            display: block;
            text-align: center;
          }

        }
        .title-focus {
          font-size: 12px;
          color: #333;
          text-align: center;
          margin: 10px 0px;

          .intro {
            line-height: 18px;
            width: 74%;
            @include right-bar(- 20 px, 33px);
            margin-right: 0;

            &:after {
              top: 2px;
              margin: 0 10px;
            }

          }
          .state-focus {
            width: 22%;

            i {
              display: block;
              width: 15px;
              height: 15px;
              margin: 0 auto 5px;
              background-repeat: no-repeat;
              background-size: 15px auto;
              background-position: center;
              @include bg-image("../img/focus");
            }

            span {
              display: block;
            }

          }
          .focused {
            width: 22%;

            i {
              display: block;
              width: 15px;
              height: 15px;
              margin: 0 auto 5px;
              background-repeat: no-repeat;
              background-size: 15px auto;
              background-position: center;
              @include bg-image("../img/focused");
            }

            span {
              display: block;
            }

          }
        }
      }

    }
    .tab-warp {
      @include onepx('bottom');
      &.active {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        display: block;
        background: #fff;
        z-index: 999;
      }
      .project-tab {
        height: 45px;
        text-align: center;
        display: flex;
        justify-content: space-evenly;
        li {
          line-height: 45px;
          font-size: 17px;
          color: #333;
          flex: 1;
        }
        li.router-link-active {
          border-bottom: 2px solid #258de8;
          color: #528de8;
          font-weight: 500;
        }

      }
    }
    .project-rec {
      h4 {
        background: #fff;

        &:after {
          border-top: none;
        }

      }
      .recommdnd-warp {
        text-align: left;

        .recommdnd-card {
          background: #fff;
          width: 48%;
          float: left;
          position: relative;
          margin-bottom: 10px;
          margin-left: 1%;
          border: 1px solid #dedede;
          .img {
            height: 118px;
            width: 100%;

            img {
              width: 100%;
              height: 100%
            }

          }
          .main-news {
            padding: 10px;
            h2 {
              font-size: 13px;
              color: #333;
              height: 32px;
              line-height: 16px;
              overflow: hidden;
              margin-bottom: 10px;
              font-weight: normal;
            }

            .tip-news {
              overflow: hidden;

              i {
                display: block;
                margin-right: 6px;
                width: 10px;
                height: 10px;
                background-size: 10px auto;
              }

              .indu {
                @include bg-image("../../base/img/industry");
              }

              .view {
                @include bg-image("../../base/img/view");
              }

              span {
                margin-right: 10px;
                font-size: 10px;
                line-height: 1;
                color: #666;
                margin-top: 1px;
              }

              span.count {
                margin-right: 0;
              }

            }
          }
        }
      }
    }
  }

</style>

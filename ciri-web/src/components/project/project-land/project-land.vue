<template>
  <div class="project-land bg-blank">
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
                   :projMaturity="projMaturity"
                   :industryId="industryId"
                   text="看好项目 上源合网"></projectHeader>
    <div class="project-intro">
      <h4>
        <div class="border"></div>
        <div class="title-intro">项目简介</div>
        <!--<div @click="gotoDetail" class="detail-warp">
          <span class="to-detail">项目详情</span>
          <i class="more" ></i>
        </div>-->

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
    </div>
    <CrossLine></CrossLine>
    <!--项目详情-->
    <div class="project-detail">
      <div class="title-warp">
        <div class="border-line"></div>
        <div class="title">项目详情</div>
      </div>
      <div class="img">
        <img src="../img/detail-summary.png" alt=""/>
      </div>
      <div @click="gotoDetail" class="view-detail btn">查看项目详情</div>

    </div>
    <CrossLine></CrossLine>
    <!--客户经理-->
    <div class="man-warp">
      <img src="../img/manager-bottom@2x.jpg"/>
    </div>
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
  import shareSDK from '@/api/wx'


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
        projId: null,
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
        isLikes: null,
        collected: false,
        projAddress: '',
        projMaturity: null
      }
    },
    methods: {
      addVisit() {
        this.$api.post('/pb/p/updateRecord',
          {projId: this.projId, tag: 0}).then(res => {
        })
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
              shareSDK.share(this.projName, url, this.projPhoto, this.projAbstract, shareSDK.wxconfig, {projId: this.projId})
            }
          }
        );
      },
      gotoDetail() {
        this.$router.replace({path: this.url})
      },
      giveLikes() {
        if (this.isLikes !== null) {
          tool.toast('不能重复点赞')
          return
        }
        if (tool.getuser() === null) {
          tool.toast('登录状态下才能点赞')
          return
        }
        this.likes = this.likes + 1
        this.isLikes = true
        this.$api.post('/pb/p/addLike',
          {userId: tool.getuser(), projId: this.projId, tag: 0}).then(res => {
          if (res.code === 200) {
          }
        })
      },

    },
    created() {
      window.scrollTo(0, 0);
      this.projId = parseInt(this.$route.query.projId)
      this.url = this.url + this.projId

      this.addVisit()
      this.$api.post('/pb/p/getProjectHeadInfo',
        {username: tool.getuser(), projId: this.projId}).then(res => {
        if (res.code === 200) {
          this.projAbstract = res.data.projAbstract
          this.projName = res.data.projName
          this.projPhoto = res.data.projPhoto
          this.industryId = res.data.industryId
          this.share();
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

          this.cornerTag = res.data.cornerTag
          this.projType = res.data.projType
          this.tag = res.data.tag
          this.status = res.data.status
          this.tags = res.data.tags
          this.setProjVideo = res.data.setProjVideo

          this.isLikes = res.data.isLikes         //todo 是否点赞 控制 点赞图标的样式
          this.collected = res.data.collected //todo  是否收藏 控制收藏图标的样式
          this.projAddress = res.data.projAddress
          this.projMaturity = res.data.projMaturity

        }
      });
    },
    mounted() {

    }
  }
</script>
<style type="text/scss" lang="scss" scoped>
  @import "~@/assets/scss/mixin.scss";
  @import "~@/assets/scss/reset.scss";

  .project-land {

    .project-intro {
      text-align: left;

      h4 {
        overflow: hidden;
        line-height: 1;
        height: 16px;
        padding: 15px 10px 12px 15px;
        color: #333;
        font-size: 16px;
        font-weight: normal;
        position: relative;

        .border {
          margin-top: 7px;
        }

        .title-intro {
          font-size: 15px;
          line-height: 1;
          position: absolute;
          left: 50%;
          top: 12px;
          margin-left: -40px;
          width: 60px;
          padding: 0 10px;
          background-color: #fff;
        }

        .left-line {
          position: absolute;
          display: block;
          width: 3px;
          height: 15px;
          background-color: #528de8;
          left: 0;
          top: 12px;
        }

        span {

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
    }
    .project-detail {
      padding: 15px 10px;

      .title-warp {
        position: relative;

        .border-line {
          margin-top: 7px;
          @include onepx();
        }

        .title {
          font-size: 15px;
          line-height: 1;
          position: absolute;
          left: 50%;
          top: -7px;
          margin-left: -40px;
          width: 60px;
          padding: 0 10px;
          background-color: #fff;
        }

      }
      .img {
        width: 248px;
        height: 248px;
        margin: 30px auto 25px;
        img {
          height: 100%;
          width: 100%;
        }

      }
      .view-detail {
        width: 150px;
        height: 30px;
        font-size: 13px;
        color: #fefeff;
        margin: auto;
        display: table;
        margin-bottom: 15px;
        background:#3f83e6 ;
      }

    }
    .man-warp{
      img{
        width: 100%;
        height: 100%;
      }
    }
  }

</style>

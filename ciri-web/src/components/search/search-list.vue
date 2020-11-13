<template>
<div class="search-list">
  <ul>
    <li :class="{active:tabActive==1}" @click="changePanel(1)">全部（ <span>{{this.count1}}</span> ）
      <div class="line"></div>
    </li>
    <li :class="{active:tabActive==2}" @click="changePanel(2)">绿地投资（<span>{{this.count2}}</span>）
      <div class="line"></div>
    </li>
    <li :class="{active:tabActive==3}" @click="changePanel(3)">项目出售（<span>{{this.count3}}</span>）</li>
  </ul>
  <div class="content">
    <div class="img" v-if="this.projects == null || this.projects.length == '0'">
      <img class="none-answering" src="../project/img/none-search@2x.png" alt="">
    </div>
    <div class="search-content" v-else>
      <div class="pro-warp">
        <router-link v-for="(project) in this.projects" :key="project.projId"
                     :to="{path:'/project/project-land',query: {projId: project.projId}}" >
          <div class="pro-list">
            <div class="img">
              <!--<div class="icon-state">认证中</div>-->
              <img v-lazy="project.url" alt="">
              <i class="favorite icon-favorite"></i>
            </div>
            <div v-show="project.projVideoStatus" class="video fl"></div>
            <div class="main-news">
              <div class="title">
                <div class="icon-quality fl" v-if="project.cornerTagName != null && project.cornerTagName != '无' && project.cornerTagName != ''">{{project.cornerTagName}}</div>
                <h2 class="fl" v-if="project.name != null">{{project.name.length>13?project.name.substr(0, 13) + '...' : project.name}}</h2></div>
              <div class="maturity clearfix">
                <p>项目成熟度：<em>{{project.mature}}</em></p>
                <p>意向投资方：<em>{{project.investors}}位</em></p>
              </div>
              <div class="tip-news">
                <i class="indu"></i>
                <span class="industry">{{project.industryName}}</span>
                <i class="mold"></i>
                <span class="genre">{{project.constructionTypeName}}</span>
                <i class="view"></i>
                <span class="count">{{project.visit}}</span>
                <div class="dz-wrap" v-bind:class="{active:project.likesStatus}"　v-tap.prevent="{ methods : likeProject,project:project}">
                  <i class="icon-thumbup fr icon-dz"></i>
                  <span class="thumb-up fr dz-count" style="margin-right: 6px;">{{project.likes}}</span>
                </div>
              </div>
            </div>
          </div>
        </router-link>
      </div>
      <button @click="loadMore()" :disabled="this.disabled" class="more" v-show="isIcon">
        <span v-text="moreText">{{this.moreText}}</span><i v-show="isIcon"></i>
      </button>
    </div>
  </div>
  <CrossLine></CrossLine>
  <div class="search-recommend">
    <h4>
      <i class="left-line"></i><span>以下是为您推荐内容</span>
    </h4>
    <div class="pro-warp">
      <router-link v-for="(project) in this.projects1" :key="project.projId"
                   :to="{path:'/project/project-land',query: {projId: project.projId}}" >
        <div class="pro-list">
          <div class="img">
            <!--<div class="icon-state">认证中</div>-->
            <img v-lazy="project.url" alt="">
            <i class="favorite icon-favorite"></i>
          </div>
          <div v-show="project.projVideoStatus" class="video fl"></div>
          <div class="main-news">
            <div class="title">
              <div class="icon-quality fl" v-if="project.cornerTagName != null && project.cornerTagName != '无'">{{project.cornerTagName}}</div>
              <h2 class="fl" v-if="project.name != null">{{project.name.length>13?project.name.substr(0, 13) + '...' : project.name}}</h2></div>
            <div class="maturity clearfix">
              <p>项目成熟度：<em>{{project.mature}}</em></p>
              <p>意向投资方：<em>{{project.investors}}位</em></p>
            </div>
            <div class="tip-news">
              <i class="indu"></i>
              <span class="industry">{{project.industryName}}</span>
              <i class="mold"></i>
              <span class="genre">{{project.constructionTypeName}}</span>
              <i class="view"></i>
              <span class="count">{{project.visit}}</span>
              <div class="dz-wrap"　v-bind:class="{active:project.likesStatus}"　v-tap.prevent="{ methods : likeProject,project:project}">
                <i class="icon-thumbup fr icon-dz"></i>
                <span class="thumb-up fr dz-count" style="margin-right: 6px;"　>{{parseInt(project.likes)>999?'999+':project.likes}}</span>
              </div>
            </div>
          </div>
        </div>
      </router-link>
    </div>
  </div>

</div>
</template>

<script>
  import CrossLine from '@/components/base/cross-line/cross-line'
  import tool from "@/api/tool"
  export default {
    components: {
      CrossLine
    },
    data() {
        return {
          tabActive: 1,
          pageId: 1,
          type: 1,
          count1: 0,
          count2: 0,
          count3: 0,
          projects: null,
          moreText: '',
          disabled: false,
          isIcon: true,
          projects1: null
        }
    },
    props: {
      ent : Boolean,
      searchValue : String,
      isRightAwaySearch: Boolean
    },
    watch: {
      ent (val) {
        this.ent = val
        this.init();
        this.loadMore();
      },
      searchValue (val) {
        this.searchValue = val
      },
      isRightAwaySearch (val){
        this.init();
        this.loadMore();
        this.isRightAwaySearch = val;
      }
    },
    methods: {
      loadMore() {
        if (tool.isBank(this.searchValue)) {
          tool.toast('搜索内容不能为空')
          this.count1 = 0;
          this.count2 = 0;
          this.count3 = 0;
          this.init();
          this.moreText = ''
          return ;
        }
        this.$api.post('/pb/p/getProjectByLike', {
          text: this.searchValue,
          pageId: this.pageId,
          type: this.type
        }).then(r => {
          this.count1 = r.count1;
          this.count2 = r.count2;
          this.count3 = r.count3;
          if (this.pageId == 1 || this.projects == null) {
            this.projects = r.data;
          } else {
            this.projects = this.projects.concat(r.data);
          }
          this.pageId = r.pageId + 1;
          if (r.data == null || r.data.length == 0 || !r.isNext) {
            this.moreText = '';
            this.disabled = 'disabled';
            this.isIcon = false;
          }else {
            this.moreText = '查看更多';
            this.disabled = false;
            this.isIcon = true;
          }
        });
      },
      changePanel(tab) {
        this.tabActive = tab;
        this.type = tab;
        this.init();
        this.loadMore();
      },
      init(){
        this.projects = null;
        this.pageId = 1;
        this.moreText = '查看更多';
        this.disabled = false;
        this.isIcon = true;
      },
      fetprojects(){
        this.$api.post('/pb/i/fetprojects', {
          pageId: 1,
          pageSize: 4,
          status: 7,
          userId: tool.getuser(),
          tag: 101001
        }).then(r => {
            this.projects1 = r.data.list;
        });
      },
      //点赞
      likeProject(pro){
        let projId = pro.project.projId;
        if (tool.getuser() == null) {
          tool.toast("登录状态下才能点赞")
          return
        }
        //不能重复点赞
        if (pro.project.likesStatus == true) {
          return;
        }
        pro.project.likesStatus = true;
        let likes=parseInt(pro.project.likes)+1;
        if(likes > 1000){
          pro.project.likes = '999+'
        }else {
          pro.project.likes = likes
        }
        this.$api.post('/pb/p/addLike', {projId: projId, userId: tool.getuser(), tag: 0}).then(r => {
          if (r.code == 200) {
          }
        });
      }
    },
    filters: {},
    computed: {},
    created() {
      this.fetprojects();
    },
    mounted() {
    },
    destroyed() {
    }
  }
</script>

<style type="text/scss" lang="scss" scoped>
    @import '~@/assets/scss/reset.scss';
    @import '~@/assets/scss/mixin.scss';
  .search-list{
    .none-answering{
      width: 100%;
      height: 100%;
    }
    .pro-warp{
      padding: 0 10px;
      .pro-list {
        padding: 15px 0 5px 96px;
        position: relative;
        height: 76px;
        @include onepx('bottom');
        .img {
          width: 87px;
          height: 60px;
          position: absolute;
          top: 15px;
          left: 0;
          img{
            width:100%;
            height:100%;
          }
          .icon-state {
            position: absolute;
            left: 5px;
            top: 5px;
            font-size: 9px;
            color: #fff;
            background: #27caa0;
            border-radius: 3px;
            padding: 1px 2px;
            text-align: center;
          }
        }
        .video {
          width: 12px;
          height: 12px;
          background-repeat: no-repeat;
          @include bg-image("../base/img/video-left");
          background-size: 12px auto;
          background-position: center;
          position: absolute;
          top: 58px;
          left: 5px;
        }
        .main-news {
          position: relative;
          height:76px;
          .title {
            overflow: hidden;

            .icon-quality {
              color: #fff;
              font-size: 10px;
              background: #fdb140;
              padding: 1px 3px;
              text-align: center;
              margin-right: 5px;
              border-radius: 3px;
            }

            h2 {
              font-size: 14px;
              color: #333;
              height: 19px;
              line-height: 19px;
            }

          }
          .tip {
            overflow: hidden;
            font-size: 9px;
            color: #333;
            margin: 5px 0;

            .red {
              height: 14px;
              width: 50px;
              line-height: 14px;
              font-size: 9px;
              margin-right: 5px;
              text-align: center;
              border: 1px solid #ff0000;
            }

            .yellow {
              height: 14px;
              width: 50px;
              line-height: 14px;
              margin-right: 5px;
              text-align: center;
              border: 1px solid #fdb140;

            }
          }
          .maturity {
            text-align: left;
            margin: 5px 0 10px;
            height: 14px;
            line-height: 1;
            p {
              float: left;
              font-size: 11px;
              color: #666;
              &:first-child {
                @include right-bar(-10px, 14px);
                margin-right: 20px;
                &:after {
                  top: -2px;
                }
              }
              em {
                font-size: 12px;
                color: #528de8;
              }
            }
          }
          .tip-news{
            height: 10px;
            position: absolute;
            left: 0;
            width: 100%;
            i{
              display: block;
              float:left;
              margin-right: 6px;
              width:10px;
              height:10px;
              background-size: 10px auto;
            }
            .loc{
              @include bg-image("../base/img/location");
            }
            .indu{
              @include bg-image("../base/img/industry");
            }
            .mold{
              @include bg-image("../base/img/mold");
            }
            .view{
              @include bg-image("../base/img/view");
            }
            .dz-wrap{
              border: 1px solid #dedede;
              border-radius: 14px;
              color: #999;
              padding: 0 2px;
              font-size: 10px;
              position: absolute;
              right: 5px;
              z-index: 99;
              height: 16px;
              line-height: 16px;
              .dz-count{
                font-size: 12px;
                height: 12px;
                display: inline-block;
                margin-top: 2px;
              }
              &.active{
                border: 1px solid #528de8;
                background-color: #528de8;
                .icon-dz{
                  @include bg-image("../index/img/thumb-uped");
                }
                .dz-count{
                  color: #fff;
                }
              }
              .icon-thumbup {
                @include bg-image("../project/img/thumbs-up");
                display: inline-block;
                width: 10px;
                height: 10px;
                line-height: 10px;
                background-repeat: no-repeat;
                background-size: 10px auto;
                background-position: center;
                margin: 3px 2px 0px 5px;
              }
            }

            span{
              float: left;
              margin-right: 10px;
              font-size: 10px;
              line-height: 1;
              color:#666;
              margin-top: 1px;
            }
          }
        }
      }
    }
    .more {
      font-size: 12px;
      color: #3f80e9;
      margin: 20px 0px;
      text-align: center;
      background: #fff;

      i {
        display: inline-block;
        width: 12px;
        height: 12px;
        @include bg-image("../news/img/more");
        background-size: 12px auto;
        margin-left: 6px;
      }
    }
    ul{
      display: flex;
      flex-direction: row;
      @include onepx('bottom');
      li{
        flex:1;
        height:45px;
        line-height: 45px;
        font-size: 15px;
        color:#333;
        text-align: center;
        position: relative;
        &.active{
          color:#528de8;
        }
        .line{
          position: absolute;
          right:0;
          top:15px;
          height:15px;
          width: 1px;
          background: #dedede;
        }
      }
    }
    .content{
      .search-content{
      }
    }
    .search-recommend{
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
          width: 4px;
          height: 15px;
          background-color: #528de8;
          left: 0;
          top:12px;
        }
      }
    }
  }

</style>

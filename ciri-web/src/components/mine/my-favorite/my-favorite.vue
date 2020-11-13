<template>
  <div class="my-favorite bg-blank">
    <header-bar text="收藏的项目" @back="back"></header-bar>
    <cross-line style="margin-top: 44px;"></cross-line>
    <div class="main">

      <div v-if="pros!=null" class="project" v-for="(pro, index) in pros" :key="index">
        <router-link :to="{path:'/project/project-land',query: {projId: pro.projId}}">
          <div class="img">
            <div class="icon-state">{{pro.status}}</div>
            <img v-lazy="pro.url" alt="" width="100%" height="100%">
            <i v-tap.prevent="{methods : favorite ,projId:pro.projId}" :id="'projId' + pro.projId" class="favorite icon-favorite"></i>
          </div>
          <div class="video fl" v-show="pro.haveVideo"></div>
          <div class="main-news">
            <div class="title">
              <div class="icon-quality fl" v-if="pro.cornerTags != null && pro.cornerTags != ''">{{pro.cornerTags}}</div>
              <h2 class="fl">{{pro.name.length>11 ? pro.name.substr(0,11)+'...' : pro.name }}</h2>
            </div>
            <!--高收益等标签暂时隐藏-->
            <div class="tip" style="display: none">
              <div v-if="pro.tags!=null" class="f1" v-for="tag in pro.tags">
                <div class="fl red">{{tag}}</div>
              </div>
            </div>

            <div class="tip-news">
              <ul class="proj-info" style="overflow:hidden;">
                <li class="proj-span1">
                  <div class="count"><span>{{pro.amount}}</span>{{pro.currency}}</div>
                  <em>项目总投资</em>
                  <div class="line"></div>
                </li>
                <li class="proj-span2">
                  <div class="count"><span>{{pro.irr}}</span>%</div>
                  <em>预期年收益率</em>
                  <div class="line"></div>
                </li>
                <li class="proj-span3" style="background:0 0;">
                  <div class="count"><span>{{pro.potentialInvestor}}</span>位</div>
                  <em>意向投资方</em>
                </li>
              </ul>

            </div>
          </div>
        </router-link>
      </div>


    </div>
    <div v-show="isMore" class="more">
      <span @click="loadMore">查看更多</span><i></i>
    </div>
  </div>
</template>

<script>
  import HeaderBar from '@/components/base/header-bar/header-bar'
  import CrossLine from '@/components/base/cross-line/cross-line'
  import tool from '@/api/tool'

  export default {
    components: {
      HeaderBar,
      CrossLine
    },
    data() {
      return {
        pageSize: 5,
        pageNum: 1,
        pros: null,
        isMore: false,
        proArray: [],
        proStr: null,
        tolerance: 0,
        proId: '',
        operationFlag: false,
      }
    },
    beforeDestroy(){
      //this.unfavorite()
      // while (!this.isFinish) {
      //   window.removeEventListener('beforeunload', e => this.beforeunloadHandler(e));
      // }
    },
    methods: {
      unfavorite() {
        let param = new URLSearchParams();
        param.append('name', tool.getuser());
        param.append('projectIdsStr', this.proId);
        param.append('typeFlag', 1);
        param.append('operationFlag', this.operationFlag);
        if (this.operationFlag){
          this.tolerance = ++this.tolerance;
        }else {
          this.tolerance = --this.tolerance;
        }
        this.axios.post(tool.domind() + '/gateway/user/batchDealWithUserCollect', param)
          .then(res => {
            if (res.data.code === 200) {
            }
          });

      },
      back() {
        //this.unfavorite();
        window.history.back()
      },
      favorite(obj) {
        this.proId = obj.projId;
        let element = document.getElementById('projId' + this.proId);
        if (element.classList.contains('quit-favorite')) {
          this.operationFlag = true
          this.proArray.pop(this.proId);
        } else {
          this.operationFlag = false;
          this.proArray.push(this.proId);
        }
        this.unfavorite();
        element.classList.toggle('quit-favorite');
        element.classList.toggle('icon-favorite');
      },

      loadMore() {
        let param = new URLSearchParams();
        param.append('name', tool.getuser());
        param.append('pageSize', this.pageSize);
        param.append('pageNum', this.pageNum);
        param.append('tolerance', this.tolerance);
        this.axios.post(tool.domind() + '/gateway/user/userCollectProjectInfo', param)
          .then(res => {
            if (res.data.code === 200) {
              if (this.pageNum === 1) {
                this.pros = res.data.data;
              } else {
                this.pros = this.pros.concat(res.data.data);
              }
              this.isMore = res.data.haveNext;
              this.pageNum = this.pageNum + 1;
            }

          });
      }

    },
    created() {
      this.loadMore();
      //window.addEventListener('beforeunload', e => this.unfavorite())
      // window.onbeforeunload = function (e) {
      //
      //   this.unfavorite();
      //   return "aaa";
      // };
    }
  }
</script>

<style type="text/scss" lang="scss" scoped>
  @import '~@/assets/scss/mixin.scss';
  @import '~@/assets/scss/const.scss';

  .more {
    font-size: 12px;
    color: #3f80e9;
    margin-top: 20px;
    margin-bottom: 65px;
    text-align: center;
    padding-bottom: 20px;

    i {
      display: inline-block;
      width: 12px;
      height: 12px;
      @include bg-image("../../news/img/more");
      background-size: 12px auto;
      margin-left: 6px;
    }

  }
  .main {

    .project {
      padding: 14px 10px 14px 120px;
      position: relative;
      @include onepx("bottom");

      .img {
        width: 100px;
        height: 65px;
        position: absolute;
        top: 14px;
        left: 10px;

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

        .favorite {
          position: absolute;
          right: 3px;
          bottom: 3px;
          width: 20px;
          height: 20px;
          background-repeat: no-repeat;
          @include bg-image("../img/favorite");
          background-size: 20px auto;
          background-position: center;
        }

        .quit-favorite {
          @include bg-image("../img/quit-favorite");
        }

      }
      .video {
        width: 12px;
        height: 12px;
        background-repeat: no-repeat;
        @include bg-image("../../base/img/video-left");
        background-size: 12px auto;
        background-position: center;
        position: absolute;
        top: 63px;
        left: 15px;
      }
      .main-news {
        height: 65px;

        .title {
          overflow: hidden;

          .icon-quality {
            color: #fff;
            font-size: 10px;
            background: #fdb140;
            //padding: 1px 3px;
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
        .tip-news {
          margin-top: 12px;
          .proj-info {
            display: flex;
            flex-direction: row;

            li {
              flex: 1;
              display: block;
              color: #666;
              position: relative;

              .count {
                font-size: 13px;
                height: 13px;
                text-align: center;

                span {
                  color: #3f83e6;
                }

              }
              .line {
                position: absolute;
                right: 0;
                top: 5px;
                border-right: 1px solid #dedede;
                width: 1px;
                height: 22px;
              }

              em {
                font-size: 10px;
                font-style: normal;
                height: 10px;
              }

            }
          }
        }

      }
    }

  }

</style>

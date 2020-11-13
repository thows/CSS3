<template>
  <div class="project-header">
    <div class="header-bar gradient">
      <i class="icon-back" @click="back"></i>
      <h1>{{text}}</h1>
      <i class="icon_search" @click="search"></i>
    </div>
    <div class="project">
      <div class="img">
        <div class="icon-state">{{status}}</div>
        <img :src="projPhoto==null? projUrl:projPhoto"  :onerror="defalutImg(industryId)" alt="" width="100%" height="100%"> <i class="favorite icon-favorite"></i></div>
      <div class="project-number">编号 <span>{{this.$route.query.projId}}</span></div>
      <div class="main-news">
        <div class="title">
          <div class="icon-quality fl" v-if="cornerTag != null && cornerTag != '' && cornerTag != '无'">{{cornerTag}}
          </div>
          <h2 class="fl" v-if="cornerTag != null && cornerTag != '' && cornerTag != '无'">{{projName!= null&&projName.length >11 ? projName.substr(0,11)+'...' : projName}}</h2>
          <h2 class="fl" v-if="cornerTag == null || cornerTag == '' || cornerTag == '无'">{{projName!= null&&projName.length> 16 ? projName.substr(0,16)+'...' : projName}}</h2>
        </div>
        <div class="tip">
          <div v-if="tags != null" class="f1" v-for="(t, index) in tags" :key="index">
            <div class="fl red">{{t}}</div>
          </div>

          <div v-show="setProjVideo" class="video fl"></div>
        </div>
        <div class="tip-news">
          <i class="loc"></i>
          <span class="country">{{projAddress!=null&&projAddress.length>7?projAddress.substr(0,7):projAddress}}</span>
          <i class="indu"></i>
          <span class="industry">{{projType}}</span>
          <!--绿地投资暂时隐藏-->
          <!--<i class="mold"></i>
          <span class="genre">{{tag}}</span>-->
          <span class="count" style="float:right;margin-right:0;">{{visit}}</span>
          <i class="view" style="float:right"></i>

        </div>
      </div>
    </div>
    <div class="progress" :class="{'pro-plan':parseInt(projMaturity) == 0,'pro-concept':projMaturity == 1,'pro-mature':projMaturity == 2,'pro-study':projMaturity == 3,'pro-decision':projMaturity == 4,'pro-construction':projMaturity == 5,'pro-operation':projMaturity == 6,'pro-sell':projMaturity == 7}">
    </div>
    <CrossLine></CrossLine>
  </div>
</template>

<script>
  import CrossLine from '@/components/base/cross-line/cross-line'

  export default {
    components: {
      CrossLine
    },
    props: {
      visit: String,
      projName: String,
      cornerTag: String,
      projType: String,
      tag: String,
      status: String,
      tags: Array,
      setProjVideo: Boolean,
      projPhoto: String,
      industryId: Number,
      projAddress: String,
      projMaturity: Number,
      text: {
        type: String,
        default: ''
      }
    },
    data() {
      return {
        projUrl:'',
        induId:null
      };
    },
    methods: {
      back() {
        window.history.back();
      },
      search() {
        this.$router.push({path: "/search"});
      },
      defalutImg(index){
        if(index){
          this.projUrl=require('../../index/img/p_'+index+'.jpg')
          return 'this.src="' + require('../../index/img/p_'+index+'.jpg') + '"'
        }
      }
    },
    created() {
      console.log(this.$route.query.projId);
      this.projUrl=this.projPhoto;
    },
    mounted() {
      this.defalutImg();
    }
  };
</script>

<style type="text/scss" lang="scss" scoped>
  @import "~@/assets/scss/mixin.scss";
  @import "~@/assets/scss/reset.scss";

  .project-header {

    .icon1 {
      color: #3f83e6
    }

    .line1 {
      height: 1px;
      width: 9px;
      background: #3f83e6;
      margin: 20px 1px 0;
    }

    .header-bar {
      height: 44px;
      line-height: 44px;
      color: #fff;
      font-size: 14px;
      text-align: center;
      position: relative;

      h1 {
        color: #fff;
        font-size: 20px;
        font-weight: normal;
      }

      .icon-back {
        display: block;
        float: left;
        width: 22px;
        height: 22px;
        margin: 11px auto;
        @include bg-image("../img/back");
        background-size: 22px auto;
      }

      .icon_search {
        display: block;
        height: 22px;
        width: 22px;
        @include bg-image('../img/search');
        background-size: 22px auto;
        position: absolute;
        right: 10px;
        top: 11px;

      }

    }
    .gradient {
      width: 100%;
      height: 44px;
      @include bg-image("../../mine/img/header-bg");
      background-repeat: no-repeat;
      background-size: 100% 44px;
    }

    .project {
      padding: 10px 10px 10px 129px;
      position: relative;
      .img {
        width: 110px;
        height: 61px;
        position: absolute;
        top: 10px;
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

      }
      .project-number{
        position: absolute;
        top:81px;
        left: 20px;
        font-size: 11px;
        line-height: 11px;
        color:#333;
      }
      .main-news {
        height: 82px;
        position: relative;

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

          .video {
            width: 20px;
            height: 20px;
            background-repeat: no-repeat;
            @include bg-image("../img/video");
            background-size: 20px auto;
            background-position: center;
            margin-top: -3px;

          }

        }
        .tip-news {
          height: 10px;
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;

          i {
            display: block;
            float: left;
            margin-right: 6px;
            width: 10px;
            height: 10px;
            background-size: 10px auto;
          }

          .loc {
            @include bg-image("../img/location");
          }

          .indu {
            @include bg-image("../img/industry");
          }

          .mold {
            @include bg-image("../img/mold");
          }

          .view {
            @include bg-image("../img/view");
          }

          span {
            float: left;
            margin-right: 10px;
            font-size: 10px;
            line-height: 0.6;
            color: #666;
            margin-top: 1px;
          }

        }
      }
    }
    .progress {
      width: 100%;
      height: 40px;
      @include onepx();
      background-repeat: no-repeat;
      background-size: 100%;
      background-position: center;

    }
    .pro-plan{
      @include bg-image("../../project/img/pro-plan");

    }
    .pro-concept{
      @include bg-image("../../project/img/pro-concept");

    }
    .pro-mature{
      @include bg-image("../../project/img/pro-mature");

    }
    .pro-study{
      @include bg-image("../../project/img/pro-study");

    }
    .pro-decision{
      @include bg-image("../../project/img/pro-decision");

    }
    .pro-construction{
      @include bg-image("../../project/img/pro-construction");

    }
    .pro-operation{
      @include bg-image("../../project/img/pro-operation");

    }
    .pro-sell{
      @include bg-image("../../project/img/pro-sell");

    }


  }

</style>

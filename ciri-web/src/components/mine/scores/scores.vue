<template>
  <div class="scores">
    <div class="header-bar">
      <i class="icon-back" @click="back"></i>
      <h1>我的积分</h1>
    </div>
    <div class="service" @click="toScoresDetail">明细</div>

    <div class="overage">
      <h4>
        <i class="left-line"></i><span>当前积分</span>
      </h4>
      <div class="count-warp">
        <span class="count">{{myIntegral}}</span>&nbsp;积分
      </div>
      <div class="bottom-line border"></div>
    </div>

    <div class="introduction">
      <h4>
        <i class="left-line"></i><span>使用与获得</span>
      </h4>
      <div class="paragraph-warp">
        <p class="paragraph">1.积分仅可以在源合网使用，如用户账号暂停使用，源合网将取消该用户账号内积分相关使用权限。</p>
        <p class="paragraph">2.每日登陆源合网，可获得积分，连续登陆可获得额外积分赠送。</p>
      </div>
    </div>

  </div>

</template>

<script>
  import HeaderBar from '@/components/base/header-bar/header-bar'
  import CrossLine from '@/components/base/cross-line/cross-line'
  import tool from "@/api/tool";

  export default {
    components: {
      HeaderBar,
      CrossLine,
      tool
    },
    data() {
      return {
        myIntegral:0

      }
    },
    methods: {
      back() {
        window.history.back()
      },
      toScoresDetail(){
        this.$router.push({ path: "/mine/scores/scores-detail" });
      },

    },
    created() {
      this.$api.get(tool.domind() + "/gateway/ah/s0/userAccoutInfo", {userId: tool.getuser()})
        .then(res => {
          if (res.code === 200) {
            this.myIntegral = res.data.memberIntegral;
          }
        });

    },
    mounted() {

    }
  }
</script>

<style type="text/scss" lang="scss" scoped>
  @import '~@/assets/scss/mixin.scss';
  @import '~@/assets/scss/const.scss';
  .scores{
    .header-bar {
      height: 44px;
      line-height: 44px;
      font-size: 14px;
      text-align: center;
      position: relative;
      @include onepx('bottom');
      h1 {
        font-size: 20px;
      }
      .icon-back {
        display: block;
        float: left;
        width: 22px;
        height: 22px;
        margin: 11px auto;
        @include bg-image("../../base/header-bar/icon-arrow_lift");
        background-size: 22px auto;
      }

    }
    .service {
      position: absolute;
      right: 10px;
      top: 14px;
      z-index: 11;
      font-size: 15px;
      height: 15px;
      line-height: 15px;
      color: #528de8;
    }
    h4{
      text-align: left;
      overflow: hidden;
      line-height: 1;
      height: 16px;
      padding: 12px 10px 12px 15px;
      color: #333;
      font-size: 16px;
      font-weight: normal;
      position: relative;
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
    .bottom-line{
      margin: 30px 10px 0px;
    }
    .overage{
      padding: 20px 0px;

      .count-warp{
        text-align: left;
        padding-left: 40px;
        margin-top: 5px;
        .count{
          color: #528de8;
          font-size: 20px;
        }
        .count-right{
          color: #666;
          font-size: 15px;
        }
      }

    }
    .introduction{
      padding: 20px 0px;
      text-align: left;
      font-size: 13px;
      color: #333;
      .paragraph-warp{
        padding: 0 10px;
        .paragraph{
          line-height: 21px;
          margin-top: 26px;
          &:first-child{
            margin-top: 10px;
          }
        }

      }
    }
  }

</style>

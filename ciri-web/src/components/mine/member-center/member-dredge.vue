<template>
  <div class="member-dredge">
    <header-bar text="会员开通" @back="back"></header-bar>
    <cross-line style="margin-top: 44px;"></cross-line>
    <div class="main">
      <p class="contact">您可以通过下面方式联系您的客户经理，</p>
      <p class="contact">了解详情或开通会员</p>
      <div class="manager-detial">
        <div class="img fl"></div>
        <div class="detial fl">
          <p>Zhang Jing 张晶</p>
          <p>Tel:+86 010-84164345</p>
          <p>Phone:+86 136 0131 5595</p>
          <p>Email:jing.zhang@bjciri.com</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import HeaderBar from '@/components/base/header-bar/header-bar'
  import CrossLine from '@/components/base/cross-line/cross-line'
  export default {
    components: {
      HeaderBar,
      CrossLine,
    },
    data(){
      return {
      }
    },
    methods: {
      back() {
        window.history.back()
      }
    }
  }
</script>

<style type="text/scss" lang="scss" scoped>
  @import '~@/assets/scss/mixin.scss';
  @import '~@/assets/scss/const.scss';
  .main{
    padding: 45px 0 0;
    .contact{
      font-size: 15px;
      color:#333;
      height:15px;
      line-height: 15px;
      margin-bottom: 11px;
    }
    .manager-detial{
      display: table;
      margin:34px auto 0;
      .img{
        width:57px;
        height:74px;
        @include bg-image("../img/manage");
        background-size: 57px 74px;
        margin-right: 15px;
      }
      .detial{
        text-align: left;
        p{
          font-size: 14px;
          color:#333;
          height:14px;
          line-height: 14px;
          margin-bottom: 6px;
        }
      }
    }

  }
</style>

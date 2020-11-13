<template>
  <div class="">
    <header-bar text="公司简介" @back="back"></header-bar>
    <cross-line style="margin-top: 44px;"></cross-line>
    <div class="main">
      <div class="img icon-logo">

      </div>
      <p>北京中工源合信息科技有限公司（CIRI）是创新型商业模式“industryC2C”的创始者，是帮助企业“走出去”的综合服务商。</p>
      <p>中工源合（CIRI）专注为企业提供海外项目投融资服务，基于“互联网+产业合投”模式搭建了“源合网”（industryC2C.com），
        通过信息化手段整合中国资本、产能、装备、服务等产业链资源，帮助中国企业安全高效地进行海外产业投资。</p>
      <p>中工源合（CIRI）通过线上平台和线下团队的专业综合服务，帮助企业成功在一带一路国家走出去、走进去、走下去。</p>
      <p>线上：通过“源合网”（industryC2C.com）为一带一路国家产业项目业主及中国产业投资方提供信息交互、高效匹配、风险控制、产业合投等服务。</p>
      <p>线下：通过专业的项目咨询服务团队为一带一路国家项目业主及中国产业投资方提供线下项目路演、
        项目尽职调查、风险控制服务，以及围绕海外产业投资项目提供深度增值服务。</p>
      <p>中工源合（CIRI）总部设在北京，在伊朗、巴西、香港等多个国家和地区设有分公司，我们的业务主要集中在光伏发电、风力发电、海水淡化、农林牧渔、石油化工、
        基础设施等领域。我们已经成功的帮助多家中国企业走出去，涉及成功案列金额超过10亿美金。</p>
      <p>创新型商业模式 — industryC2C</p>

    </div>
    <div class="profile-warp">
      <div class="img-profile">
      </div>
    </div>
    <div class="call-us">
      <span>如您有疑问请联系我们：</span><i class="icon-phone"></i>
      <span>010-84164345</span>
    </div>

  </div>
</template>

<script>
  import HeaderBar from '@/components/base/header-bar/header-bar'
  import CrossLine from '@/components/base/cross-line/cross-line'
  export default {
    components: {
      HeaderBar,
      CrossLine
    },
    methods: {
      back() {
        window.history.back()
      },
    }
  }
</script>

<style type="text/scss" lang="scss" scoped>
  @import '~@/assets/scss/mixin.scss';
  @import '~@/assets/scss/const.scss';
.main{
  text-align: left;
  padding: 0 10px;
  .icon-logo{
    width:184px;
    height:23px;
    display: block;
    margin: 24px auto 20px;
    @include bg-image('../img/logo');
    background-size: 184px 23px;
  }
  p{
    font-size: 11px;
    color:#333;
    line-height: 13px;
    margin-bottom: 15px;
  }

}
  .profile-warp{
    @include onepx('bottom');
    padding: 0 10px;
    .img-profile{
      width:100%;
      height:237px;
      display: block;
      padding-bottom: 27px;
      @include bg-image('../img/company-profile');
      background-size: 100%;
      background-repeat: no-repeat;
    }
  }
  .call-us{
    font-size: 11px;
    color:#333;
    height:49px;
    line-height: 49px;
    .icon-phone{
      width:10px;
      height:10px;
      line-height: 49px;
      margin: 0 5px;
      display: inline-block;
      @include bg-image('../img/phone');
      background-size: 10px 10px;
      background-repeat: no-repeat;
      background-position: center;
    }
  }
</style>

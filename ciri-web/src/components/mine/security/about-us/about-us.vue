<template>
<div class="about-us">
  <header-bar text="关于我们" @back="back"></header-bar>
  <cross-line style="margin-top: 44px;"></cross-line>
  <more text="公司简介" to="company-profile"></more>
  <cross-line></cross-line>
  <more text="业务领域" to="business-area"></more>
  <border-line></border-line>
  <more text="联系我们" to="contact-us"></more>
  <cross-line></cross-line>
  <more text="伊朗分公司" to="iranian-branch"></more>
  <border-line></border-line>
  <more text="巴西分公司" to="brazil-branch"></more>
</div>
</template>

<script>
  import HeaderBar from '@/components/base/header-bar/header-bar'
  import CrossLine from '@/components/base/cross-line/cross-line'
  import BorderLine from '@/components/base/border-line/border-line'
  import More from '@/components/base/more/more'
  export default {
    components: {
      HeaderBar,
      CrossLine,
      BorderLine,
      More
    },
    methods: {
      back() {
        window.history.back()
      },
    }
  }
</script>

<style lang="scss" scoped>
  .about-us{
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0px;
    background:#f5f5f5;
    text-align: left;
  }

</style>

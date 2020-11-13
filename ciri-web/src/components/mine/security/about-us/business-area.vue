<template>
  <div class="">
    <header-bar text="业务领域" @back="back"></header-bar>
    <cross-line style="margin-top: 44px;"></cross-line>
    <div class="business">
      <i></i>
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
.business{
  padding: 24px 13px;
  i{
    width:100%;
    height:150px;
    display: block;
    @include bg-image('../img/business-area');
    background-size: 100%;
    background-repeat: no-repeat;
  }

}
</style>

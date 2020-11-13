<template>
  <div class="">
    <header-bar text="伊朗分公司" @back="back"></header-bar>
    <cross-line style="margin-top: 44px;"></cross-line>
    <div class="main">
      <p>CIRI伊朗分公司于2016年成立，办公地点位于德黑兰。公司的主要业务集中在新能源、轻工业、基础设施、农林牧渔等行业的项目投资服务领域。</p>

      <p class="mr19">公司地址：Unit 4, floor 4, No. 24, North Ararat St, Kordestan Highway, Tehran, Iran.</p>

      <p class="mr19">联系电话：+98-2188613126-7</p>
      <p class="mr24">传真号码：+98-2188613126-6</p>
      <img src="../img/Iran.png" alt="" width="100%"/>
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
  .main{
    text-align: left;
    padding: 24px 10px 0;
    p{
      font-size: 12px;
      line-height: 14px;
    }
    .mr19{
      margin-top: 15px;
    }
    .mr24{
      margin-bottom: 24px;
    }
  }
</style>

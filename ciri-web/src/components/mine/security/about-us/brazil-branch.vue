<template>
  <div class="">
    <header-bar text="巴西分公司" @back="back"></header-bar>
    <cross-line style="margin-top: 44px;"></cross-line>
    <div class="main">
      <p>CIRI巴西分公司于2016年成立，公司的主要业务集中在新能源、轻工业、基础设施、农林牧渔等行业的项目投资服务。</p>

      <p class="mr19">公司地址：Sao Paulo : Wald Law Firm . Av Juscelino Kubitscheck 510. 8 Floor.</p>

      <p class="mr19">联系电话：+0055-011-97441-8773</p>
      <p class="mr24">传真号码：+0055-021-98138-9936</p>
      <img src="../img/about-brazil.jpg" alt="" width="100%"/>
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

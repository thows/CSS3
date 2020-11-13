<template>
  <div class="">
    <header-bar text="联系我们" @back="back"></header-bar>
    <cross-line style="margin-top: 44px;"></cross-line>
    <div class="main">
      <p>北京中工源合信息科技有限公司</p>
      <p>公司地址： 北京市 朝阳区 芍药居北里101号 世奥国际中心 A座 1017</p>
      <p>邮政编码： 100102</p>
      <p>联系电话： 0086-10-84164345</p>
      <p>传真号码： 0086-10-84164345</p>
      <p>邮箱： support@bjciri.com</p>
      <p>微博： 中工源合 CIRI-走出去综合服务商</p>
      <p>微信： CIRIinternational</p>

      <p class="mr19">中工源合（CIRI）伊朗分公司</p>
      <p>公司地址： Unit 4, floor 4, No. 24, North Ararat St, Kordestan Highway, Tehran, Iran.</p>
      <p>联系电话： +98-2188613126-7</p>
      <p>传真号码： +98-2188613126-6</p>
      <p>邮箱： support@bjciri.com</p>
      <p>微信： CIRIinternational</p>

      <p class="mr19">中工源合（CIRI）巴西分公司</p>
      <p>公司地址：</p>
      <p>Sao Paulo : Wald Law Firm . Av Juscelino Kubitscheck 510. 8 Floor.</p>
      <p>联系电话：+0055-011 97441-8773</p>
      <p style="padding-left: 57px;">+0055-021 98138-9936</p>
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
}
</style>

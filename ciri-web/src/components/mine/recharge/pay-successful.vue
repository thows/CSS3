<template>
  <div class="pay-successful">
    <div class="header-bar">
      <h1>支付成功</h1>
    </div>
    <div class="service" @click="complete">完成</div>
    <div class="main" :style="{'height': mainHeight +'px'}">
      <div class="logo"></div>
      <div class="word">支付成功</div>
      <div class="time">{{time}}秒后自动跳转到个人中心</div>
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
        mainHeight: 0,
        time:3
      }
    },
    methods: {
      back() {
        window.history.back()
      },
      complete(){
        this.$router.push('/mine');
      }

    },
    created() {
      this.mainHeight = document.documentElement.clientHeight - 44;
    },
    mounted() {
      let clock = setInterval(()=>{
        this.time--;
        if(this.time < 1){
          clearInterval(clock);
        }
      },1000);

    },
    computed:{

    },
    watch:{
      time(val){
        if(val == '0'){
          this.$router.push('/mine');
        }
      }
    }
  }
</script>

<style type="text/scss" lang="scss" scoped>
  @import '~@/assets/scss/mixin.scss';
  @import '~@/assets/scss/const.scss';
  .pay-successful{
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
    .main{
      background-color: #f5f5f5;
      text-align: center;
      position: relative;
      box-sizing: border-box;
      padding-top: 110px;
      .logo{
        display: block;
        width: 55px;
        height: 55px;
        margin: 0 auto;
        @include bg-image("../img/pay-success");
        background-size: 55px auto;
        background-repeat: no-repeat;
      }
      .word{
        color: #333;
        font-size: 18px;
        line-height: 18px;
        padding-top: 20px;
      }
      .time{
        color: #666;
        font-size: 15px;
        line-height: 15px;
        padding-top: 15px;
      }
    }

  }

</style>

<template>
  <div class="member-center">
    <div class="header-bar">
      <i class="icon-back" @click="back"></i>
      <h1>会员中心</h1>
    </div>
    <div class="service" @click="service">客服</div>
    <!--客服弹框-->
    <div class="service-pop pop-bg" v-show="servicePop">
      <div class="service-warp">
        <p>如有疑问，请添加客服微信</p>
        <p>13601315595</p>
        <div class="know-btn" @click="quitService">我知道了</div>
      </div>
    </div>
    <div class="main">
      <div class="current-state" v-show="purchaseList.length != '3'">您现在是：</div>
      <div v-if="openList != null && openList.length>0" v-for="open in openList" :key="open.level">
        <member :level="open.level" :list="open"  @toMemInduc="toMemInduc(open.level,openList)"></member>
      </div>

      <div class="current-state" v-show="openList.length != '3'">可购买：</div>
     <!--为了352顺序显示，这里不能用for循环-->
      <member v-show="purchaseList.indexOf(3)!= '-1'" :level="3" :list="null"  @toMemInduc="toMemInduc(3,!openList)"></member>
      <member v-show="purchaseList.indexOf(5)!= '-1'" :level="5" :list="null"  @toMemInduc="toMemInduc(5,!openList)"></member>
      <member v-show="purchaseList.indexOf(2)!= '-1'" :level="2" :list="null"  @toMemInduc="toMemInduc(2,!openList)"></member>

    </div>
  </div>

</template>

<script>
  import HeaderBar from '@/components/base/header-bar/header-bar'
  import CrossLine from '@/components/base/cross-line/cross-line'
  import Member from '@/components/base/member/member'
  import tool from "@/api/tool";

  export default {
    components: {
      HeaderBar,
      CrossLine,
      tool,
      Member
    },
    data() {
      return {
        servicePop: false,
        isLogin:false,
        openList:'', //已开通
        purchaseList:[],//可购买
        yuanheLast:false,
        vipLast:false,

      }
    },
    methods: {
      back() {
        this.$router.push({path:'/mine'});
      },
      service() {
        this.servicePop = true;
      },
      quitService() {
        this.servicePop = false;
      },
      toMemInduc(mem,isLast){
        this.$router.push({path:'/mine/member-center/member-induction',query:{memLevel:mem,showLast:isLast}});
      }
    },
    created() {
      this.isLogin = localStorage.getItem("islogin");
      //获取会员等级、查询会员剩余天数
      this.$api.get(tool.domind() + "/gateway/ah/s0/getUserLevel")
        .then(res => {
          if (res.code === 200) {
            this.openList = res.data;
            //获取可购买的等级
            let levelArr = [];
            let fullArr = [2,3,5];
            for(let item of res.data){
              if(item.level && item.lastMembersDay){
                levelArr.push(item.level);
              }
            }
            for(let it of fullArr){
              if(levelArr.indexOf(it) == '-1' ){
                this.purchaseList.push(it);
              }
            }
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

  .member-center {
    .header-bar {
      height: 44px;
      line-height: 44px;
      color: #fff;
      font-size: 14px;
      text-align: center;
      position: relative;
      @include bg-image("../img/member-bg");

      h1 {
        color: #fff;
        font-size: 20px;
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

    }
    .service {
      position: absolute;
      right: 10px;
      top: 14px;
      z-index: 11;
      font-size: 15px;
      height: 15px;
      line-height: 15px;
      color: #fff;
    }

    .service-warp {
      background: #fff;
      padding: 20px 0;
      width: 84%;
      position: fixed;
      margin: auto;
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
      height: 90px;

      p {
        font-size: 14px;
        color: #333;
        height: 14px;
        line-height: 14px;
        margin-bottom: 10px;
      }

      .know-btn {
        display: table;
        margin: 2px auto 0;
        font-size: 14px;
        width: 121px;
        height: 38px;
        line-height: 38px;
        text-align: center;
        color: #3f84e6;
        border: 2px solid #3f84e6;
      }

    }

    .main{
      padding: 0 12px;
      .current-state{
        text-align: left;
        font-size: 15px;
        color: #333;
        padding-top: 20px;
      }
    }
  }
</style>

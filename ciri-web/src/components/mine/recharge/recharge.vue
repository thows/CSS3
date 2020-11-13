<template>
  <div class="recharge">
    <div class="header-bar">
      <i class="icon-back" @click="back"></i>
      <h1>我的账户</h1>
    </div>
    <div class="service" @click="toBillDetail">账单明细</div>

    <div class="overage">
      <h4>
        <i class="left-line"></i><span>金币余额</span>
      </h4>
      <div class="count-warp">
        <span class="count">{{goldBalance}}</span>&nbsp;金币
      </div>
      <div class="split"></div>
    </div>
    <div class="recharge-warp">
      <h4>
        <i class="left-line"></i><span>充值</span>
      </h4>

      <ul class="item-warp" id="">
        <li class="recharge-item"
            v-if="rechargeList!=null && rechargeList.length>0"
            v-for="(item,index) in rechargeList"
            :key="index"
            :class="[resultNum === index+1?'active':'']"
            @click="selectMoney($event,index+1,item.amount) ">
          <div class="gold">{{item.gold}}金币</div>
          <div class="money">{{item.amount}}元</div>
        </li>
      </ul>
      <div class="btn" @click="toPayment" :disabled="!this.num">支付</div>
      <div class="split"></div>
    </div>

    <div class="introduction">
      <h4>
        <i class="left-line"></i><span>支付说明</span>
      </h4>
      <div class="paragraph-warp">
        <p class="paragraph">1.购买的金币支持办理各个等级会员及购买平台其他服务。</p>
        <p class="paragraph">2.购买金币后不支持线上退款，若购买金币后未进行任何消费，可在1小时内联系客服13601315595进行协商退款。</p>
        <p class="paragraph">3.目前支付方式仅为微信支付，请安装6.0.2及以上版本的客户端进行充值操作。</p>
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
        num: '',
        rechargeList: null, //充值li
        goldBalance: 0, //金币余额
        selectedMoney: '66',
        payFlag:false,
      }
    },
    methods: {
      back() {
        this.$router.push('/mine');
      },
      toBillDetail(){
        this.$router.push({ path: "/mine/recharge/bill-detail" });
      },
      toPayment(){
        if(!this.num){
          tool.toast('请选择一种充值金额');
          return;
        }
        window.location.href='https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx28d44097b0f145cb&redirect_uri=http%3A%2F%2Fm.industryc2c.com%2F?%23%2Fmine%2Frecharge%2Fpayment&response_type=code&scope=snsapi_base&state='+ this.selectedMoney +'#wechat_redirect';
        },
      selectMoney(e, index, count) {
        this.num = index;
        this.selectedMoney = count;
      }

    },
    created() {
      this.$api.get(tool.domind() + "/gateway/pb/p/member/rechargeStandard")
        .then(res => {
          if (res.code === 200) {
            this.rechargeList = res.data;
          }
        });
      this.$api.get(tool.domind() + "/gateway/ah/s0/userAccoutInfo", {userId: tool.getuser()})
        .then(res => {
          if (res.code === 200) {
            this.goldBalance = res.data.memberGold.toFixed(2);//两位小数
          }
        });

    },
    mounted() {

    },
    computed:{
      resultNum(){
        return this.num;
      }
    }
  }
</script>

<style type="text/scss" lang="scss" scoped>
  @import '~@/assets/scss/mixin.scss';
  @import '~@/assets/scss/const.scss';
  .recharge{
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
    .split{
      margin: 30px 10px 0px;
      @include onepx();
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
    .recharge-warp{
      text-align: left;
      width: 100%;
      .item-warp{
        display: flex;
        flex-wrap: wrap;
        justify-content: space-around;
        margin-top: 8px;
        padding: 0 8px;
        .recharge-item{
          width: 98px;
          height: 48px;
          line-height: 25px;
          border: 1px solid #528de8;
          margin-bottom: 20px;
          text-align: center;
          display: flex;
          justify-content: center;
          align-items: center;
          flex-direction: column;
          &.active{
            background-color: #528de8;
            .gold{
              color: #fff;
            }
            .money{
              color: #fff;
            }
          }
          .gold{
            font-size: 14px;
            color: #528de8;
            line-height: 14px;
          }
          .money{
            font-size: 12px;
            color: #72aaff;
            line-height: 12px;
            margin-top: 5px;
          }

        }

      }
      .btn{
        width: 91%;
        margin: 0 auto;
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

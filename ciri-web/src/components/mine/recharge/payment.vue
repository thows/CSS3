<template>
  <div class="payment" id="payment">
    <div class="header-bar">
      <i class="icon-back" @click="back"></i>
      <h1>源合币支付</h1>
    </div>
    <div class="need">
      需支付：
      <span class="right-money">￥{{this.state}}</span>
    </div>
    <div class="pay-way">
      <h4>
        <i class="left-line"></i><span>选择支付方式</span>
      </h4>
    </div>

    <div class="wexin-pay">
      <div class="img">
        <img src="../img/weixin.png" alt="">
      </div>
      <div class="content clearfix">
        <div class="wexin-word fl">微信支付</div>
        <div class="item fr" @click.prevent="selected($event)">
          <i class="icon-radio">
            <input type="radio" name=""/>
          </i>
        </div>
      </div>
    </div>
    <!--todo:如果支付失败按钮显示重新支付-->
    <div class="btn" :class="[isSelected? 'active':'']" @click="confirmPay">确认支付</div>

    <!--重新支付提示信息-->
    <div class="pay-again" v-show="payFail" @click="confirmPay">支付失败，请您重新支付</div>

  </div>

</template>

<script>
  import HeaderBar from '@/components/base/header-bar/header-bar'
  import CrossLine from '@/components/base/cross-line/cross-line'
  import tool from "@/api/tool"
  import { MessageBox } from 'mint-ui'

  export default {
    components: {
      HeaderBar,
      CrossLine,
      tool
    },
    data() {
      return {
        isSelected: false,
        content: '在微信中打开链接吗？',
        code: null,
        state: null,
        payFail: false,
      }
    },
    methods: {
      back() {
        this.$router.push('/mine/recharge');
      },
      selected(e) {
        let element = e.currentTarget;
        if (element.classList.contains('active')) {
          element.classList.remove('active');
          this.isSelected = false;
        } else {
          element.classList.add('active');
          this.isSelected = true;
        }

      },
      confirmPay() {
        this.payFail = false;
        if (!this.isSelected) {
          return;
        } else {
          let param = new URLSearchParams();
          param.append('code', this.code);
          param.append('state', this.state);
          param.append('body', "源合币充值");
          this.axios.post(tool.domind() + tool.path() + '/wx/unifuiedOrder', param).then(r => {
            if (r === null){
              tool.toast("预订单生成失败！！！请检查参数")
              return;
            }
            WeixinJSBridge.invoke(
              'getBrandWCPayRequest', {
                "appId" : r.data.appId,     //公众号名称，由商户传入
                "timeStamp" : r.data.timeStamp,         //时间戳，自1970年以来的秒数
                "nonceStr" : r.data.nonceStr, //随机串
                "package" : r.data.package,
                "signType" : r.data.signType,         //微信签名方式：
                "paySign" : r.data.paySign //微信签名
              },
              function(res){
                if(res.err_msg === "get_brand_wcpay_request:ok" ) {
                  window.location.href="http://m.industryc2c.com/#/mine/recharge/pay-successful"
                }else {
                  tool.toast("支付失败！");
                  this.payFail = true;
                }
              })

          });

          //打开微信弹窗
          /*MessageBox({
            title: '提示',
            message: '在微信中打开连接吗?',
            showCancelButton: true
          }).then(action=>{
            if(action == 'confirm'){
              alert('可以打开微信啦~');
            }
          }).catch(err=>{

          });*/
          //   //支付确认弹窗
          //   MessageBox({
          //     message: '<div style="position: relative; top: -20px; font-weight: 600;">支付确认</div>请在微信内完成支付，如果您已支付成功，请点击完成按钮',
          //     confirmButtonText:'完成',
          //     showCancelButton: true
          //   }).then(action=>{
          //     if(action == 'confirm'){
          //
          //     }
          //   }).catch(err=>{
          //
          //   });
          // }
        }
      }
    },
    created() {
      let url = window.location.href//.split('/?&').split('#/').split('#');
      //url = 'http://test.bjciri.com/?&code=123123123&state=qwe#/mine/recharge';
      url = url.split('/?&')[1].split('#/')[0].split('&');
      this.code = url[0].split('=')[1];
      this.state = url[1].split('=')[1];
    },
    mounted() {
    }
  }
</script>

<style type="text/scss" lang="scss" scoped>
  @import '~@/assets/scss/mixin.scss';
  @import '~@/assets/scss/const.scss';
  .payment{
    .header-bar {
      height: 44px;
      line-height: 44px;
      font-size: 14px;
      text-align: center;
      position: relative;
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
    .need{
      height: 35px;
      line-height: 35px;
      text-align: right;
      font-size: 13px;
      color: #666;
      background-color: #f5f5f5;
      .right-money{
        color: #528de8;
        padding-right: 10px;
      }
    }
    .pay-way{
      padding: 8px 0;
      width: 100%;
      @include onepx('bottom');
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
    .wexin-pay{
      padding: 22.5px 0;
      text-align: left;
      width: 100%;
      @include onepx('bottom');
      position: relative;
      .img{
        width: 30px;
        height: 30px;
        position: absolute;
        left: 10px;
        img{
          width: 100%;
          height: 100%;

        }
      }
      .content{
        padding-left: 50px;
        height: 30px;
        line-height: 30px;
        .wexin-word{

        }
        .item {
          &.active {
            .icon-radio {
              @include bg-image("../img/selected");
              margin-right: 10px;
            }

          }
          i {
            position: relative;
            display: inline-block;
            width: 20px;
            height: 20px;
            background-repeat: no-repeat;
            background-size: 20px auto;
            background-position: center;
            vertical-align: middle;
            input[type="radio"]{
              position: absolute;
              left: 0;
              opacity: 0;
            }

          }
          .icon-radio {
            @include bg-image("../img/no-select");
            margin-right: 10px;

          }

          span {
            height: 45px;
            line-height: 45px;
            display: inline-block;
            font-size: 15px;
          }
        }
      }
    }
    .btn{
      margin: 20px auto;
      width: 94.6%;
      background-color: #ccc;
      color: #fff;
      &.active{
        background-color: #528de8;
      }
    }
    .pay-again{
      margin-top: 20px;
      font-size: 15px;
      color: #ff6a6a;
    }

  }

</style>

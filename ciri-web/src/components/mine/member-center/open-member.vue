<template>
  <div class="payment" id="payment">
    <div class="header-bar">
      <i class="icon-back" @click="back"></i>
      <h1>开通会员</h1>
    </div>
    <div class="member-level">
      <div class="level">{{name}}</div>
      <div class="money">待付款：<span class="count">{{money}}</span><span class="gold">&nbsp;金币</span></div>
    </div>
    <div class="balance clearfix">
      <span class="balance-word fl">账户余额</span>
      <span class="balance-money fr">{{goldBalance}}金币</span>
    </div>
    <div class="btn" @click="pay">{{btnText()}}</div>

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
        isSelected:false,
        goldBalance:0,
        name:'',
        money:0,
        content:'在微信中打开链接吗？'
      }
    },
    methods: {
      back() {
        window.history.back()
      },
      btnText(){
        if(this.money && parseInt(this.goldBalance)>=parseInt(this.money)){
          return '立即支付';
        }else{
          return '立即充值';
        }
      },
      pay(){
        if(this.money && parseInt(this.goldBalance)>=parseInt(this.money)){
          MessageBox({
            title: '提示',
            message: '请确认是否购买',
            confirmButtonText:'购买',
            showCancelButton: true
          }).then(action=>{
            if(action == 'confirm'){
              this.$api.post(tool.domind() + "/gateway/ah/s0/openMember", {level:this.$route.query.memLevel})
                .then(res => {
                  if (res.code === 200) {
                    //支付成功之后更新session中的会员等级
                    localStorage.removeItem("userLevel");
                    let newLevel = res.level;
                    localStorage.setItem("userLevel", newLevel);
                    //支付成功弹窗
                    MessageBox({
                      message: '支付成功',
                      showCancelButton: false
                    }).then(action=>{
                      if(action == 'confirm'){
                        this.$router.push('/mine/member-center');

                      }
                    }).catch(err=>{
                      console.log(err);
                    });
                  }else{
                    //支付失败弹窗
                    MessageBox({
                      message: '支付失败，请重新操作',
                      showCancelButton: false
                    }).then(action=>{
                      if(action == 'confirm'){

                      }
                    }).catch(err=>{

                    });

                  }
                })
                .catch(err=>{
                  console.log(err);
                });
            }
          }).catch(err=>{
            console.log(err);
          });

        }else{
          this.$router.push('/mine/recharge');
        }
      }
    },
    created() {
      //获取金币余额信息
      this.$api.get(tool.domind() + "/gateway/ah/s0/userAccoutInfo", {userId: tool.getuser()})
        .then(res => {
          if (res.code === 200) {
            this.goldBalance = res.data.memberGold.toFixed(2);//两位小数
          }
        });

      //根据会员等级获取金额信息
      this.$api.post(tool.domind() + "/gateway/pb/p/member/queryMemberStandardByLevel", {level:this.$route.query.memLevel})
        .then(res => {
          if (res.code === 200) {
            this.name = res.data.desc;
            this.money = res.data.amount;
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
  .payment{
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
    .member-level{
      padding: 20px 0;
      @include onepx('bottom');
      .level{
        font-size: 18px;
        color: #333;
        line-height: 28px;
      }
      .money{
        font-size: 15px;
        color: #333;
        .count{
          font-size: 20px;
          color: #528de8;
        }
        .gold{
          color: #666;
        }
      }

    }
    .balance{
      padding: 20px 10px;
      border-bottom: 1px solid #dedede;
      .balance-word{
        font-size: 15px;
        display: inline-block;
      }
      .balance-money{
        font-size: 16px;
        color: #528de8;
        display: inline-block;
      }
    }
    .btn{
      width: 94.6%;
      margin: 20px auto;
    }


  }

</style>

<template>
  <div class="member">
    <div class="member-item-warp">
      <div class="member-item" v-lazy:background-image="bgImg">
        <!--未开通会员显示这个member-detail-->
        <div class="member-detail" v-if="!list">
          <div class="img">
            <img v-lazy="logoSrc" alt="" width="100%" height="100%">
          </div>
          <div class="clearfix">
            <div class="info fl">
              <p class="info-level">{{infoLevel}}</p>
            </div>
            <div class="handel fr">
              <div class="member-btn" @click="toMemInduc">购买</div>
            </div>
          </div>
          <div class="share">{{power}}</div>
          <div class="function-warp clearfix">
            <div class="func-name fl">{{funcName}}</div>
            <div class="func-detail fl">{{funcDetail}}</div>
          </div>
        </div>

        <!--开通了会员显示下面这个member-detail-->
        <div class="member-detail" v-if="list">
          <div class="img">
            <img v-lazy="activeSrc" alt="" width="100%" height="100%">
          </div>
          <div class="clearfix">
            <div class="info fl">
              <p class="info-level">{{infoLevel}}</p>
            </div>
          </div>
          <div class="kaitong">已开通</div>
          <div class="handel-right fr">
            <p class="count">{{list.lastMembersDay}}</p>
            <p class="count-word">剩余天数</p>
            <div class="renewals-btn" @click="toMemInduc">续费</div>
          </div>
        </div>

        <div class="bottom" @click="toMemInduc">
          <span>进入会员权益</span>
          <i class="see-rights"></i>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
  export default {
    components: {},
    data() {
      return {
        initLevel: this.level,
        logoSrc:'',
        activeSrc:'',
        infoLevel:'',
        funcName: '',
        funcDetail:'',
        bgImg:'',
        power:''
      }
    },
    props: {
      level: {
        type: Number
      },
      list:{
        type:Object,
        default: function(){
          return {};
        }
      }
    },
    watch: {},
    methods: {
      toMemInduc(){
        this.$emit('toMemInduc');
      }

    },
    filters: {},
    computed: {},
    created() {
      if( this.initLevel == "3"){
        this.infoLevel = "项目库会员";
        this.bgImg = require("../../mine/img/bg-project.png");
        this.logoSrc = require("../../mine/img/logo-project.png");
        this.activeSrc = require("../../mine/img/project-active.png");
        this.power = '';
        this.funcName = "基础功能：";
        this.funcDetail = "项目收藏、项目约谈、项目答疑、项目在线路演";

      }else if(this.initLevel == "5"){
        this.infoLevel = "源合网会员";
        this.bgImg = require("../../mine/img/bg-yuanhe.png");
        this.logoSrc = require("../../mine/img/logo-yuanhe.png");
        this.activeSrc = require("../../mine/img/yuanhe-active.png");
        this.power = '享有项目库会员服务';
        this.funcName = "升级功能：";
        this.funcDetail = "海外项目、企业展示、企业建站、海外投研";

      }else if(this.initLevel == "2"){
        this.infoLevel = "VIP会员";
        this.bgImg = require("../../mine/img/bg-vip.png");
        this.logoSrc = require("../../mine/img/logo-vip.png");
        this.activeSrc = require("../../mine/img/vip-active.png");
        this.power = '享有源合网会员服务';
        this.funcName = "升级功能：";
        this.funcDetail = "海外投研、法律税务、融资税务、项目尽调、金融保险、属地商务";

      }
    },
    mounted() {

    },
    destroyed() {

    }
  }
</script>

<style type="text/scss" lang="scss" scoped>
  @import '~@/assets/scss/reset.scss';
  @import '~@/assets/scss/mixin.scss';
  .member{

    .member-item-warp{
      margin-top: 15px;
      .member-item{
        width: 100%;
        background-repeat: no-repeat;
        background-size: 100% 100%;
        position: relative;
        .member-detail{
          padding-left: 80px;
          position: relative;
          .img{
            width: 50px;
            height: 50px;
            position: absolute;
            top: 20px;
            left: 15px;
          }
          .info{
            text-align: left;
            padding-top: 25px;
            color: #fff;
            .info-level{
              font-size: 18px;
              line-height: 18px;
            }
          }
          .handel{
            padding: 22px 10px 0px 0px;
            text-align: right;
            .member-btn{
              width: 69px;
              height: 25px;
              line-height: 25px;
              color: #fff;
              font-size: 13px;
              border: 1px solid #fff;
              border-radius: 3px;
              text-align: center;
            }
          }
          .share{
            text-align: left;
            color: #fff;
          }
          .kaitong{
            text-align: left;
            color: #fff;
            height: 41px;
            padding-top: 6px;
          }
          .handel-right{
            width: 80px;
            height: 75px;
            position: absolute;
            top: 8px;
            right: 10px;
            text-align: right;
            .count{
              font-size: 20px;
              color: #fff;
              line-height: 20px;
            }
            .count-word{
              font-size: 12px;
              color: #fff;
              margin-top: 6px;
            }
            .renewals-btn{
              width: 69px;
              height: 25px;
              line-height: 25px;
              color: #fff;
              font-size: 13px;
              border: 1px solid #fff;
              border-radius: 3px;
              text-align: center;
              margin-top: 5px;
              position: relative;
              left: 8px;
            }
          }
          .function-warp{
            text-align: left;
            font-size: 11px;
            color: #fff;
            margin: 5px 0 8px 0;
            .func-name{
              width: 60px;

            }
            .func-detail{
              width: 180px;

            }

          }
        }
        .bottom{
          height: 38px;
          line-height: 38px;
          border-top: 1px solid #fff;
          position: relative;
          padding: 0px 10px;
          font-size: 15px;
          text-align: left;
          span{
            color: #fff;
          }
          .see-rights{
            width: 20px;
            height: 20px;
            display: inline-block;
            position: absolute;
            right: 5px;
            top: 9px;
            background-repeat: no-repeat;
            background-size: auto 100%;
            @include bg-image("../../mine/img/see-rights");
          }

        }
      }

    }


  }

</style>

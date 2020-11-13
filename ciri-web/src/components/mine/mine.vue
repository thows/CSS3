<template>
  <div class="mine bg-blank">
    <header class="gradient">
      个人中心
      <router-link to="/mine/security"><i class="icon-setting"></i></router-link>
    </header>
    <div class="main">
      <div class="gradient-bg">
        <div class="user">
          <div class="user-msg">
            <!--判断是否登录没有登录 点击头像跳转到登录页面-->
            <template v-if="!userId">
              <router-link to="/login">
                <div class="user_face">
                  <img v-lazy="portraitUrl"/>
                </div>
              </router-link>
            </template>
            <!--登录状态下  点击头像跳转到用户页面--->
            <template v-if="userId">
              <router-link to="/mine/my-profile">
                <div class="user_face">
                  <img v-lazy="portraitUrl"/>
                </div>
              </router-link>
            </template>

            <div v-if="!userId">
              <router-link class="login" to="/login">立即登录</router-link>
            </div>
            <div v-if="userId" class="logined">
              <div class="user_name">{{username.length>12 ? username.substr(0,12)+'...' : username}}</div>
              <div class="user_position">
                <i class="job-title"></i>
                <span>{{roleStr}}</span></div>
            </div>
            <!--identity-verify 添加active 实名认证点亮 userAuth-->
            <div class="identity-verify" v-bind:class="{active:userAuth}">
              <!--根据userAuthCode 认证情况来判断跳转的页面-->
              <template v-if="userAuthCode!='0'">
                <router-link :to="{path:'/mine/identity',query:{ tag: userAuthCode}}">
                  <i class="identity "></i>
                  <span>{{identityTitle}}</span>
                </router-link>
              </template>
              <!--认证过 跳转到认证页面-->
              <template v-if="userAuthCode=='0' || userAuthCode=='4'">
                <router-link to="/mine/IdentityVerification">
                  <i class="identity "></i>
                  <span>实名认证</span>
                </router-link>
              </template>
            </div>
          </div>
          <div class="favorite">
            <div class="fl card">
              <!--<h2>{{corpAll}}</h2>-->
              <h2>—</h2>
              <h3>关注的项目</h3>
              <div class="separator"></div>
            </div>
            <div class="fr card">
              <router-link to="/mine/my-favorite">
                <h2>{{projectAll}}</h2>
                <h3>收藏的项目</h3>
              </router-link>
            </div>
            <div style="clear: both;visibility: hidden"></div>
          </div>

        </div>
        <cross-line></cross-line>

      </div>
      <div class="section">
        <div class="member-center">
          <h2>个人账户</h2>
          <div class="look-more">
            <router-link to="/mine/recharge">
              <span>充值</span>
              <i class="icon-more"></i>
            </router-link>
          </div>
        </div>
        <div class="favorite clearfix amount-content">
          <div class="fl card">
            <router-link to="/mine/recharge">
              <h2>{{memberGold}}</h2>
              <h3>我的金币</h3>
            </router-link>
            <div class="separator"></div>
          </div>
          <div class="fr card">
            <router-link to="/mine/scores">
              <h2>{{memberIntegral}}</h2>
              <h3>我的积分</h3>
            </router-link>
          </div>
        </div>

        <cross-line></cross-line>

        <div class="member-center">
          <h2>会员中心</h2>
          <div class="look-more">
            <router-link to="/mine/member-center">
              <span>查看</span>
              <i class="icon-more"></i>
            </router-link>
          </div>
        </div>
        <ul class="member">
          <!--icon-vip 添加active  VIP会员点亮-->
          <li><i class="icon-project"  v-bind:class="{active:xmk}"></i><span>项目库会员</span></li>
          <li><i class="icon-yuanhe"  v-bind:class="{active:yhw}"></i><span>源合网会员</span></li>
          <li><i class="icon-vip"  v-bind:class="{active:vip}"></i><span>VIP会员</span></li>
        </ul>
        <cross-line></cross-line>
        <div class="member-center">
          <h2>我是投资方</h2>
        </div>
        <ul class="member">
          <li><i class="my-company"></i><span>我的企业</span></li>
          <li><i class="company-verify"></i><span>企业认证</span></li>
          <li><i class="delivery-record"></i><span>投递记录</span></li>
          <!--delivery-record 添加active  投递记录点亮-->
        </ul>
        <div class="online-roadshow">
          <i></i>
          <span>在线路演</span>
        </div>
        <cross-line></cross-line>
        <cross-line></cross-line>
        <!--登录状态下隐藏   -->
        <div class="login-btn" v-if="!userId" @click="toLogin">
          立即登录
        </div>
        <div class="blank"></div>
      </div>
    </div>
    <tab-bar></tab-bar>
  </div>
</template>

<script>
import TabBar from "@/components/base/tab-bar/tab-bar";
import CrossLine from "@/components/base/cross-line/cross-line";
import BorderLine from "@/components/base/border-line/border-line";
import More from "@/components/base/more/more";
import tool from "@/api/tool";
export default {
  components: {
    TabBar,
    CrossLine,
    BorderLine,
    More
  },
  data() {
    return {
      userId: tool.islogin(),
      username: tool.getuser(),
      roleStr: "",
      memberLevelStr: "",
      displayName: "",
      portraitUrl: require('./img/user_face.png'),
      userAuth: false,
      projectAll:0,
      corpAll:0,
      vip:false,
      yhw:false,
      xmk:false,
      userAuthCode:0,
      identityTitle:'未认证',
      memberGold:0.00,  //金币数量
      memberIntegral:0 //积分数量
    };
  },
  props: {},
  watch: {},
  methods: {
    toLogin(){
      this.$router.push('/login');
    }
  },
  computed: {},
  created() {
    if (tool.islogin() == "true" && tool.getuser() != null && tool.gettoken() != '' && typeof tool.gettoken() != undefined ) {
      this.axios
        .get(tool.domind() + "/gateway/user/getUser?name=" + tool.getuser())
        .then(res => {
          if (res.data.code === 200) {
            if(res.data.userInfo != null && res.data.userInfo !=""){
              this.memberGold = res.data.userInfo.memberGold.toFixed(2);//两位小数
              this.memberIntegral = parseInt(res.data.userInfo.memberIntegral);//取整
            }
            if(res.data.data.portraitUrl!=null&&res.data.data.portraitUrl!=''){
              this.portraitUrl = res.data.data.portraitUrl;
            }
            this.roleStr = res.data.data.roleStr;

            //设置实名认证Code
            if(res.data.data.userAuth==null){
              this.userAuthCode=0;
            }else {
              this.userAuthCode=res.data.data.userAuth;
            }
            //当认证信息为2时，点亮图标
            if(res.data.data.userAuth=='2'){
              this.userAuth = true;
              this.identityTitle = '已认证'
            }else if(res.data.data.userAuth=='1'){
              this.identityTitle = '认证中'
            }else if (res.data.data.userAuth=='4'){
              this.identityTitle = '未认证'
            }else{
              this.identityTitle = '未认证'
            }
          }
        });
      //获取会员等级
      this.$api.get(tool.domind() + "/gateway/ah/s0/getUserLevel")
        .then(res => {
          if (res.code === 200) {
            for(let item of res.data){
              if(item.level && item.lastMembersDay){
                if(item.level == '2'){
                  this.vip=true;
                }else if(item.level == '3'){
                  this.xmk=true;
                }else if(item.level == '5'){
                  this.yhw=true;
                }
              }
            }

          }
        });

      //获取收藏的投资方
      this.axios
        .get(
          tool.domind() +
          "/gateway/user/userCollectTotal?name=" +
          tool.getuser()
        )
        .then(res => {
          if (res.data.code === 200) {
            if (res.data.code === 200) {
              this.corpAll = res.data.data;
            }
          }
        });
      //获取收藏的项目
      this.axios
        .get(
          tool.domind() +
          "/gateway/user/userCollectTotal?tag=2&name=" +
          tool.getuser()
        )
        .then(res => {
          if (res.data.code === 200) {
            if (res.data.code === 200) {
              this.projectAll = res.data.data;
            }
          }
        });

    }else {
      this.portraitUrl = require('./img/user_face.png');
    }
  },
  mounted() {
  },
  destroyed() {},
  filters: {
    time(time) {
      return moment(time).format("YYYY-MM-DD HH:MM:SS");
    }
  }
};
</script>

<style type="text/scss" lang="scss" scoped>
@import "~@/assets/scss/mixin.scss";
body {
  background-color: #f5f5f5;
}
.mine {
  background: #f5f5f5;
  text-align: left;
  header {
    height: 44px;
    line-height: 44px;
    color: #ffffff;
    font-size: 18px;
    text-align: center;
    position: relative;
    .icon-setting {
      position: absolute;
      right: 0px;
      height: 22px;
      width: 22px;
      margin: 11px 10px 0 0;
      @include bg-image("./img/setting");
      background-size: 22px auto;
    }
  }
  .gradient {
    width: 100%;
    height: 44px;
    @include bg-image("./img/header-bg");
    background-repeat: no-repeat;
    background-size: 100% 44px;
    /*background: -webkit-linear-gradient(left, rgba(56,185,253,1) ,rgba(63,132,230,0.65))!important; !* Safari 5.1 - 6.0 *!*/
    /*background: -o-linear-gradient(right, rgba(56,185,253,1) ,rgba(63,132,230,0.65))!important; !* Opera 11.1 - 12.0 *!*/
    /*background: -moz-linear-gradient(right, rgba(56,185,253,1) ,rgba(63,132,230,0.65))!important; !* Firefox 3.6 - 15 *!*/
    /*background: linear-gradient(to right, rgba(56,185,253,1) ,rgba(63,132,230,0.65))!important; !* 标准的语法 *!*/
  }
  .main {
    .gradient-bg {
      width: 100%;
      float: left;
      @include bg-image("./img/guadient-bg");
      background-repeat: no-repeat;
      background-size: 100% 100px;
      .user {
        background: #fff;
        padding-left: 10px;
        margin: 0 20px;
        height: 170px;
        .user-msg {
          overflow: hidden;
          .user_face {
            height: 66px;
            width: 66px;
            float: left;
            margin-right: 12px;
            margin-top: 12.5px;
            background-size: 66px auto;
            img{
              height: 66px;
              width: 66px;
              border: 1px solid #ccc;
              border-radius: 50%;
            }
          }
          .login {
            font-size: 16px;
            color: #333;
            float: left;
            line-height: 103px;
          }
          .logined {
            float: left;
            margin-top: 26px;
            .user_name {
              font-size: 16px;
              color: #333;
              margin-bottom: 8px;
            }
            .user_position {
              span {
                font-size: 13px;
                color: #666;
                margin-left: 5px;
              }
              i {
                display: inline-block;
                width: 15px;
                height: 15px;
                @include bg-image("./img/job-title");
                background-size: 15px auto;
                vertical-align: middle;
              }
            }
          }
          .identity-verify {
            float: right;
            line-height: 103px;
            .identity {
              display: inline-block;
              height: 32px;
              width: 32px;
              position: relative;
              margin-right: -15px;
              @include bg-image("./img/identity-verify");
              background-size: 32px auto;
              vertical-align: middle;
            }
            span {
              display: inline-block;
              height: 24px;
              width: 78px;
              line-height: 24px;
              color: #999;
              font-size: 12px;
              background: #eee;
              text-align: center;
            }
          }
          .identity-verify.active {
            .identity {
              @include bg-image("./img/identity-active");
            }
            span {
              background: #fdb140;
              color: #fff;
            }
          }
        }
      }
    }
    .favorite {
      overflow: hidden;
      .card {
        width: 50%;
        height: 65px;
        font-size: 15px;
        text-align: center;
        position: relative;
        .separator {
          position: absolute;
          right: 0;
          bottom: 13px;
          background: #dedede;
          width: 1px;
          height: 17px;
        }
        h2 {
          color: #333;
          font-weight: normal;
          margin-bottom: 13px;
          font-size: 15px;
        }
        h3 {
          color: #666;
          font-weight: normal;
          margin-bottom: 13px;
          font-size: 15px;
        }
      }
    }
    .section {
      margin: 0 20px;
      background: #f5f5f5;
      clear: both;
      overflow: hidden;
      .member-center {
        background: #fff;
        @include onepx("bottom");
        overflow: hidden;
        h2 {
          font-size: 18px;
          color: #333;
          height: 45px;
          line-height: 45px;
          margin-left: 13px;
          float: left;
        }
        .look-more {
          float: right;
          margin-right: 13px;
          line-height: 45px;

          span {
            font-size: 13px;
            color: #666;
            margin-right: 10px;
          }
          i {
            display: block;
            line-height: 45px;
            float: right;
            width: 20px;
            height: 45px;
            @include bg-image("./img/look-more");
            background-size: 20px 20px;
            background-repeat: no-repeat;
            background-position: center;
          }
        }
      }
      .amount-content{
        background: #fff;
        width: 100%;
        padding: 20px 0px 23px 0px;
        h2{
          font-size: 20px;
          color: #528de8;
        }
        .separator{
          height: 34px;
        }
      }
      .member {
        background: #fff;
        width: 100%;
        height: 160px;
        text-align: center;
        display: flex;
        flex-direction: row;
        @include onepx("bottom");
        li {
          margin: 30px 0;
          flex: 1;
          color: #999;
          display: block;
          i {
            display: block;
            width: 57px;
            height: 57px;
            margin: 0 auto 12px;
            background-size: 57px auto;
          }
          .icon-vip {
            @include bg-image("./img/vip-member");
          }
          .icon-vip.active {
            @include bg-image("./img/vip-active");
          }
          .icon-yuanhe {
            @include bg-image("./img/yuanhe-member");
          }
          .icon-yuanhe.active {
            @include bg-image("./img/yuanhe-active");
          }
          .icon-project {
            @include bg-image("./img/project-member");
          }
          .icon-project.active {
            @include bg-image("./img/project-active");
          }
          .my-company {
            @include bg-image("./img/my-company");
          }
          .company-verify {
            @include bg-image("./img/company-verify");
          }
          .delivery-record {
            @include bg-image("./img/delivery-record");
          }
          .delivery-record.active {
            @include bg-image("./img/delivery-active");
          }
          span {
            display: block;
            font-size: 14px;
            color: #666;
          }
        }
      }
      .online-roadshow {
        background: #fff;
        height: 40px;
        line-height: 40px;
        i {
          display: inline-block;
          width: 20px;
          height: 40px;
          line-height: 40px;
          margin-right: 8px;
          margin-left: 13px;
          vertical-align: middle;
          background-size: 20px auto;
          @include bg-image("./img/online-roadshow");
          background-repeat: no-repeat;
          background-position: center;
        }
        span {
          font-size: 14px;
          color: #666;
        }
      }
      .login-btn {
        height: 38px;
        line-height: 38px;
        width: 100%;
        background: #3f83e6;
        color: #fff;
        font-size: 15px;
        border-radius: 3px;
        text-align: center;
        margin-bottom: 20px;
      }
      .blank{
        height:60px;
      }
    }
  }
}
</style>

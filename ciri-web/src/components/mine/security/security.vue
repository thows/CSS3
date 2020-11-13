<template>
  <div class="security">
    <header-bar text="设置" @back="back"></header-bar>
    <cross-line style="margin-top: 44px;"></cross-line>
    <div class="main">
      <div class="section border-dash">
        <div class="img icon-loginpwd">

        </div>
        <div class="main-news">
          <h2>登录密码</h2>
          <p>互联网账号存在被盗风险，</p>
          <p>建议您定期更改密码以保护账号安全</p>
          <router-link to="/security-loginpwd">
            <div class="change-btn">
              修改
            </div>
          </router-link>
        </div>
      </div>
      <div class="section border-dash">
        <div class="img icon-email">

        </div>
        <div class="main-news">
          <h2>邮箱绑定</h2>
          <p>已绑定的邮箱：</p>
          <p>{{bindEmail}}</p>
          <router-link to="/security-email">
            <div class="change-btn">
              修改
            </div>
          </router-link>
        </div>
      </div>
      <div class="section">
        <div class="img icon-phone">

        </div>
        <div class="main-news">
          <h2>手机绑定</h2>
          <p>已绑定的手机号：</p>
          <p>{{bindPhone}}</p>
          <router-link to="/security-phone">
            <div class="change-btn">
              修改
            </div>
          </router-link>
        </div>
      </div>
    <cross-line></cross-line>
    <div class="more-bar">
      <router-link to="/about-us"><i class="icon-more"></i></router-link>
      <h1><i class="about-us"></i>关于我们</h1>
    </div>
    <div class="more-bar">
      <router-link to="/security-feedback"><i class="icon-more"></i></router-link>
      <h1><i class="feedback"></i>意见反馈</h1>
    </div>
  </div>
  <div class="exit">
    <div class="btn" @click="loginOut">退出登录</div>
    </div>
  </div>
</template>

<script>
  import HeaderBar from "@/components/base/header-bar/header-bar";
  import CrossLine from "@/components/base/cross-line/cross-line";
  import tool from "@/api/tool";

  export default {
    components: {
      HeaderBar,
      CrossLine
    },data () {
      return {
        username:tool.getuser(),
        bindEmail: "",
        bindPhone: ""
      }
    },
    methods: {
      back() {
        window.history.back()
      },
      loginOut() {
        localStorage.clear();
        this.$api.post('/app/sys/loginOut').then(r => {
          if (r.code == 200) {
          }
        });
        this.axios.defaults.headers.token = '';
        this.$router.replace({path: "/mine"});
      }
    },
    mounted() {
      this.axios
        .get(tool.domind() + "/gateway/security/securityInfo?name="+tool.getuser())
        .then(res => {
          if (res.data.code === 200) {
            this.bindEmail = res.data.data.email;
            this.bindPhone = res.data.data.phone;
          }
        });
    } ,
    updated() {
    }
  }
</script>

<style type="text/scss" lang="scss" scoped>
  @import '~@/assets/scss/mixin.scss';
  @import '~@/assets/scss/const.scss';

  .security {
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0px;
    background: #f5f5f5;
  }

  .main {
    text-align: left;
    background: #f5f5f5;

  .section {
    height: 50px;
    padding: 20px 0 20px 60px;
    position: relative;
    background: #fff;

  .img {
    position: absolute;
    top: 20px;
    left: 10px;
    display: block;
    width: 50px;
    height: 50px;
    background-size: 50px auto;
  }

  .icon-loginpwd {
  @include bg-image("./img/loginpwd");
  }

  .icon-email {
  @include bg-image("./img/email-binding");
  }

  .icon-phone {
  @include bg-image("./img/phone-binding");
  }

  .main-news {
    margin-left: 12px;

  h2 {
    font-size: 16px;
    color: #333;
    height: 16px;
    margin-bottom: 5px;

  }

  p {
    font-size: 12px;
    color: #666;
    height: 12px;
    margin-bottom: 2px;

  }

  .change-btn {
    position: absolute;
    right: 10px;
    bottom: 29px;
    height: 23px;
    width: 50px;
    border-radius: 3px;
    line-height: 23px;
    text-align: center;
    color: #fff;
    font-size: 12px;
    background: #4081e8;

  }

  }
  }
  .border-dash {
    border-bottom: 1px dashed #dedede;
  }

  .more-bar {
    height: 45px;
    background: #fff;
    line-height: 45px;
    padding: 0 10px;
  @include onepx('bottom');

  .icon-more {
    display: block;
    float: right;
    width: 20px;
    height: 45px;
    line-height: 45px;
    background-repeat: no-repeat;
    background-position: center;
    background-size: 20px auto;
  @include bg-image("./img/more");
  }

  h1 {
    display: inline-block;
    text-align: left;
    font-size: 15px;
    color: #333;
    font-weight: normal;

  i {
    display: inline-block;
    width: 22px;
    height: 22px;
    background-size: 22px auto;
    margin-right: 5px;
    vertical-align: middle;
  }

  .about-us {
  @include bg-image("./img/about-us");
  }

  .feedback {
  @include bg-image("./img/feedback");
  }

  }
  }
  }
  .exit {
    padding: 0 10px;
    margin-top: 20px;
  }

</style>

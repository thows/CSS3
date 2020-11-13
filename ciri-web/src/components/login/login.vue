<!-- 登录 组件 -->
<template>
  <div class="login ping-blank">
    <header-bar text="登录" @back="back"></header-bar>
    <!-- 横线分隔条 -->
    <cross-line></cross-line>
    <!-- 登录 -->
    <div class="login-wrapper">
      <div class="iconWrap" v-show="showPhone">
        <div class="mint-cell">
          <div class="mint-cell-wrapper">
            <input placeholder="请输入手机号" type="tel" class="mint-field-core" v-model="phone" @focus="Focus">
          </div>
        </div>
        <i class="iconImg icon-phone"></i>
        <div class="switch bor-left" @click="Switch">切换邮箱登录</div>
      </div>
      <div class="iconWrap" v-show="showEmail">
        <div class="mint-cell">
          <div class="mint-cell-wrapper">
            <input placeholder="请输入邮箱" type="email" class="mint-field-core" v-model="email"
                   @focus="Focus">
          </div>
        </div>
        <i class="iconImg icon-email"></i>
        <div class="switch bor-left" @click="Switch">切换手机号登录</div>
      </div>
      <div class="iconWrap">
        <div class="mint-cell">
          <div class="mint-cell-wrapper">
            <input placeholder="请输入密码" :type="pswTypeChange" v-model="password" class="mint-field-core"
                   @focus="Focus">
          </div>
        </div>
        <i class="iconImg icon-password"></i>
        <div :class="pswIcon" @click="pswShow"></div>
      </div>

      <div class="regiPwd">
        <router-link to="/register" class="fl fs12">免费注册</router-link>
        <router-link to="/resetpwd" class="fr fs12">忘记密码？</router-link>
      </div>

      <mt-button :class="loginClass" size="large" @click="login" :disabled="isDisable">登录</mt-button>
      <router-link to="/authcode" class="fs13">验证码登录</router-link>
    </div>
  </div>
</template>

<script>
  import HeaderBar from "@/components/base/header-bar/header-bar";
  import CrossLine from "@/components/base/cross-line/cross-line";
  import tool from "../../api/tool";

  export default {
    components: {
      HeaderBar,
      CrossLine
    },
    data() {
      return {
        loginClass: "loginBtnActive",
        showPhone: true,
        showEmail: false,
        pswTypeChange: "password",
        pswIcon: "switch pswIcon pswIconClose",
        phone: '',
        email: '',
        password: '',
        loginData: [],
        position: "",
        aisle: 0,
        isDisable: false
      };
    },
    props: {},
    watch: {
    },
    methods: {
      back() {
        window.history.back()
      },
      //input获取焦点时执行
      Focus() {
        this.loginClass = "loginBtnActive";
        this.isDisable = false;
      },
      //切换邮箱手机号登录
      Switch() {
        this.phone = this.email = this.password = "";
        this.showPhone = !this.showPhone;
        this.showEmail = !this.showEmail;
      },
      pswShow() {
        if (this.pswTypeChange == "password") {
          this.pswTypeChange = "text";
          this.pswIcon = "switch pswIcon pswIconShow";
        } else {
          this.pswTypeChange = "password";
          this.pswIcon = "switch pswIcon pswIconClose";
        }
      },
      fixImg() {
        this.position = "fixImg";
      },
      //初始化数据
      login() {
        this.isDisable = true;

        //验证手机号或者邮箱
        if (this.showPhone) {
          let regPhone = 11 && /^((13|14|15|17|18)[0-9]{1}\d{8})$/;
          if (this.phone == "" || !regPhone.test(this.phone)) {
            tool.toast("请填写正确的手机号！");
            return;
          }
        } else {
          let regEmail = /^.*\@.*\.com/;
          if (this.email == "" || !regEmail.test(this.email)) {
            tool.toast("请输入正确的邮箱号！");
            return;
          }

        }
        //验证密码
        if (!this.password) {
          tool.toast("密码不能为空！");
          return;
        }

        if (this.password !== "") {
          let params = new URLSearchParams();
          params.append("key", this.showEmail ? this.email : this.phone);
          params.append("pwd", this.password);
          params.append("aisle", this.aisle);
          this.axios
            .post(tool.domind() + "/gateway/app/sys/login", params)
            .then(res => {
              if (res.data.code === 200) {
                localStorage.setItem("token", res.data.data.token);
                localStorage.setItem("username", res.data.data.username);
                localStorage.setItem("islogin", "true");
                localStorage.setItem("userLevel", res.data.data.memberLevel);
                this.axios.defaults.headers.token = res.data.data.token;
                let redirect = '';
                if ( tool.isBank(this.$route.query.redirect))
                  redirect = decodeURIComponent('/');
                else
                  redirect = decodeURIComponent(this.$route.query.redirect);
                this.$router.replace({
                  path: redirect
                });
              }else if(res.data.code === 500){
                tool.toast("账号不存在！");
                this.isDisable = false;
              }else if(res.data.code === 101){
                tool.toast("密码不正确！");
                this.isDisable = false;
              } else {
                tool.toast("登录失败，请重试！");
                this.isDisable = false;
              }
            })
            .catch(err => {
              tool.toast(err);
            });
        } else {
          tool.toast("账号或密码错误，请重新输入！");
        }
      }
    },
    filters: {},
    computed: {},
    created() {
      if (this.phone) {
        this.loginClass = "loginBtnActive";
      }
    },
    mounted() {
    }
  };
</script>

<style type="text/scss" lang="scss" scoped>
  /*@import '~@/assets/scss/const.scss';*/
  @import "~@/assets/scss/mixin.scss";

  .login {
    color: #333;
    margin-top: 40px;
    background-color: #fff;
    overflow: visible;

    .login-wrapper {
      margin-top: 20px;
      overflow: hidden;
      padding: 0 10px;

      .iconWrap {
        position: relative;

        .mint-cell {
          border: 1px solid #dedede;
          border-radius: 3px;
          margin-bottom: 15px;
          padding-left: 40px;
          font-size: 12px;
          height: 34px;
          min-height: 34px;

          .mint-cell-wrapper {
            padding: 0;
          }

        }
        i {
          display: block;
          width: 20px;
          height: 20px;
          @include bg-image("./img/phone");
          background-size: 20px auto;
        }

        .icon-phone {
          @include bg-image("./img/phone");
        }

        .icon-password {
          @include bg-image("./img/password");
        }

        .icon-email {
          @include bg-image("./img/email");
        }

        .iconImg {
          position: absolute;
          left: 10px;
          top: 7px;
        }

        .switch {
          position: absolute;
          right: 10px;
          top: 10px;
          color: #333;
          font-size: 10px;
        }
        .bor-left{
          height: 15px;
          line-height: 15px;
          text-align: right;
          padding-left: 10px;
          border-left: 1px solid #dedede;
        }

        .pswIcon {
          width: 16px;
          height: 16px;
          background-size: 16px auto;
          display: block;
        }

        .pswIconShow {
          @include bg-image("./img/psw-show");
        }

        .pswIconClose {
          @include bg-image("./img/psw-close");
        }

      }
      .regiPwd {
        overflow: hidden;

        .fs12 {
          color: #333;
          font-size: 12px;
        }

      }
      .error {
        text-align: center;
        color: #f81717;
        font-size: 10px;
        padding: 35px 0 15px;
        height: 10px;
      }

      .mint-button {
        margin: 60px auto 15px;
        font-size: 15px;
        height: 34px;
      }

      .loginBtn {
        background: #eeeeee;
        color: #333333;
      }

      .loginBtnActive {
        background: #3f83e6;
        color: #ffffff;
      }

      .fs13 {
        font-size: 13px;
        color: #333;
      }

    }
    .staticImg {
      position: static;
    }

  }
</style>

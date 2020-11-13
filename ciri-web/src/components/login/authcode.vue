<!-- 登录 组件 -->
<template>
  <div class="login ping-blank">
    <header-bar text="手机号登录" @back="back"></header-bar>
    <!-- 横线分隔条 -->
    <cross-line></cross-line>
    <!-- 登录 -->
    <div class="login-wrapper">
      <div class="iconWrap">
        <div class="mint-cell">
          <div class="mint-cell-wrapper">
            <input placeholder="请输入手机号" type="tel" class="mint-field-core" v-model="phone">
          </div>
        </div>
        <i class="iconImg icon-phone"></i>
      </div>
      <div class="iconWrap">
        <div class="mint-cell">
          <div class="mint-cell-wrapper">
            <input v-model="authcode" placeholder="请输入验证码" type="text" class="mint-field-core" @blur="fixImg">
          </div>
        </div>
        <i class="iconImg icon-authcode"></i>
        <div class="switch getCodeBg" v-show="showCode" @click="getCode">发送验证码</div>
        <div class="switch getCodeBg" v-show="!showCode">{{count}} s</div>
      </div>
      <mt-button class="loginBtn" :class="renderBtnColor()" size="large" @click="login" :disabled="isDisable">登录</mt-button>
    </div>
  </div>
</template>

<script>
  import HeaderBar from '@/components/base/header-bar/header-bar'
  import CrossLine from '@/components/base/cross-line/cross-line'
  import tool from "../../api/tool";

  export default {
    components: {
      HeaderBar,
      CrossLine
    },
    data() {
      return {
        loginClass: 'loginBtn',
        showCode: true,
        count: '',
        timer: null,
        position: '',
        phone: '',
        aisle: 1,
        authcode: '',
        isDisable: true
      }
    },
    props: {},
    watch: {},
    methods: {
      //初始化数据
      login() {
        this.isDisable = true;

        //验证手机号
        let regPhone = 11 && /^((13|14|15|17|18)[0-9]{1}\d{8})$/;
        if (this.phone == "" || !regPhone.test(this.phone)) {
          tool.toast("请填写正确的手机号！");
          return;
        }

        //验证验证码
        let regCode = new RegExp(/^\d{6}$/);
        if (this.authcode == "" || !regCode.test(this.authcode)) {
          tool.toast("验证码错误！");
          return;
        }

        let params = new URLSearchParams();
        params.append('key', this.phone);
        params.append('pwd', this.authcode);
        params.append('aisle', this.aisle + '');

        this.axios.post(tool.domind() + '/gateway/app/sys/login', params).then(res => {
          if (res.data.code === 200) {
            localStorage.setItem("token", res.data.data.token);
            localStorage.setItem("username", res.data.data.username);
            localStorage.setItem("islogin", "true");
            this.axios.defaults.headers.token = res.data.data.token;
            this.$router.replace({path: '/index'})
          } else if(res.data.code === 500){
            tool.toast("账号不存在！");
            this.isDisable = false;
          }else if(res.data.code === 102){
            tool.toast('验证码错误！');
          }else {
            tool.toast("登录失败，请重试！");
            this.isDisable = false;
          }
        }).catch(err => {
          console.log(err)
        })

      },
      back() {
        window.history.back()
      },
      //input获取焦点时执行
      getCode() {
        //获取验证码时判断手机号是否正确
        let reg = 11 && /^((13|14|15|17|18)[0-9]{1}\d{8})$/;
        if (this.phone == "" || !reg.test(this.phone)) {
          tool.toast("请填写正确的手机号！");
          return;
        }

        let param = new URLSearchParams();
        param.append('name', this.phone);

        this.axios.post(tool.domind() + '/gateway/app/sms/verify/other', param).then(res => {
        }).catch(err => {
          console.log(err)
        });

        const TIME_COUNT = 60;
        if (!this.timer) {
          this.count = TIME_COUNT;
          this.showCode = false;
          this.timer = setInterval(() => {
            if (this.count > 0 && this.count <= TIME_COUNT) {
              this.count--;
            } else {
              this.showCode = true;
              clearInterval(this.timer);
              this.timer = null;
            }
          }, 1000)
        }
      },
      fixImg() {
        this.position = 'fixImg';
      },
      //点亮登录按钮
      renderBtnColor() {
        if(this.checked != '' && this.authcode!=''){
          this.isDisable = false;
          return "loginBtnActive";
        }
      },
    },
    filters: {},
    computed: {},
    created() {
    },
    mounted() {
    }
  }
</script>

<style type="text/scss" lang="scss" scoped>
  /*@import '~@/assets/scss/const.scss';*/
  @import '~@/assets/scss/mixin.scss';

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
          @include bg-image('./img/phone');
          background-size: 20px auto;
        }
        .icon-authcode {
          @include bg-image('./img/authcode');
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
        .getCodeBg {
          width: 62px;
          padding: 5px 6px;
          text-align: center;
          background: #f5f5f5;
          border-radius: 3px;
          top: 4px;
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
        .mint-button-text{
          color: #333333;
        }
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


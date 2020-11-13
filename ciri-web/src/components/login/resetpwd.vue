<!-- 登录 组件 -->
<template>
  <div class="login ping-blank">
    <header-bar text="找回密码" @back="back"></header-bar>
    <!-- 横线分隔条 -->
    <cross-line></cross-line>

    <div class="login-wrapper">
      <div class="iconWrap" v-show="showPhone">
        <div class="mint-cell">
          <div class="mint-cell-wrapper">
            <input placeholder="请输入手机号" type="tel" class="mint-field-core" v-model="phone">
          </div>
        </div>
        <i class="iconImg icon-phone"></i>
        <div class="switch" @click="Switch">邮箱找回密码</div>
      </div>
      <div class="iconWrap" v-show="showEmail">
        <div class="mint-cell">
          <div class="mint-cell-wrapper">
            <input placeholder="请输入邮箱" type="email" class="mint-field-core" v-model="email">
          </div>
        </div>
        <i class="iconImg icon-email"></i>
        <div class="switch" @click="Switch">手机号找回密码</div>
      </div>
      <div class="iconWrap">
        <div class="mint-cell">
          <div class="mint-cell-wrapper">
            <input placeholder="请输入验证码" type="text" class="mint-field-core" v-model="verifyCode" @blur="fixImg">
          </div>
        </div>
        <i class="iconImg icon-authcode"></i>
        <div class="switch getCodeBg" v-show="showCode" @click="getCode">发送验证码</div>
        <div class="switch getCodeBg" v-show="!showCode">{{count}} s</div>
      </div>
      <div class="iconWrap">
        <div class="mint-cell">
          <div class="mint-cell-wrapper">
            <input placeholder="请输入新密码" :type="pswTypeChange" v-model="password" class="mint-field-core" @blur="fixImg">
          </div>
        </div>
        <i class="iconImg icon-password"></i>
        <div :class="pswIcon" @click="pswShow"></div>
      </div>
      <mt-button class="loginBtn" :class="renderBtnColor()" size="large" @click="restpswd" :disabled="isDisable">提交</mt-button>
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
        showPhone: true,
        showEmail: false,
        pswTypeChange: 'password',
        pswIcon: 'switch pswIcon pswIconClose',
        showCode: true,
        count: '',
        aisle: 0,
        verifyCode: '',
        phone: '',
        email: '',
        password: '',
        loginData: [],
        position: '',
        isDisable: false

      }
    },
    props: {},
    watch: {},
    methods: {
      //初始化数据
      restpswd() {
        this.isDisable = true;

        //验证手机号或者邮箱
        if (this.aisle === 0) {
          let regPhone = 11 && /^((13|14|15|17|18)[0-9]{1}\d{8})$/;
          if (this.phone == "" || !regPhone.test(this.phone)) {
            tool.toast("请填写正确的手机号！");
            return;
          }
        } else {
          let regEamil = /^[A-Za-z0-9]+([-_.][A-Za-z0-9]+)*@([A-Za-z0-9]+[-.])+[A-Za-z0-9]{2,5}$/g;
          if (this.email == "" || !regEamil.test(this.email)) {
            tool.toast("请填写正确的手机号！");
            return;
          }
        }

        //验证验证码
        let regCode = new RegExp(/^\d{6}$/);
        if (this.verifyCode == "" || !regCode.test(this.verifyCode)) {
          tool.toast("验证码错误！");
          return;
        }

        //验证密码
        if (!this.password) {
          tool.toast("密码不能为空！");
          return;
        }

        this.axios.post(tool.domind() + '/gateway/app/sys/restpswd', {
          name: this.aisle === 0 ? this.phone : this.email,
          password: this.password,
          verifyCode: this.verifyCode,
          code: this.code
        }).then(res => {
          if(res.data.code === 200){
            tool.toast("修改成功！");
            this.$router.replace({ path: '/login'})
          }else if(res.data.code === 500){
            tool.toast("更新失败！");
          }else if(res.data.code === 101){
            tool.toast("用户不存在！");

          }else if(res.data.code === 102){
            tool.toast("验证码不正确！");

          }else{
            tool.toast("服务器异常，请稍后重试！");
          }
        }).catch(err => {

        })


      },
      back() {
        window.history.back()
      },

      //切换邮箱手机号登录
      Switch() {
        this.phone = this.email = this.password = this.code = '';
        this.errorShow = false;
        this.showPhone = !this.showPhone;
        this.showEmail = !this.showEmail;
        if (this.showPhone) {
          this.error = '手机号错误，请重新输入'
        } else {
          this.error = '邮箱地址错误，请重新输入'
        }
        if (this.showPhone) {
          this.aisle = 0;
        } else {
          this.aisle = 1;
        }
      },
      pswShow() {
        if (this.pswTypeChange === 'password') {
          this.pswTypeChange = 'text';
          this.pswIcon = 'switch pswIcon pswIconShow'
        } else {
          this.pswTypeChange = 'password';
          this.pswIcon = 'switch pswIcon pswIconClose'
        }

      },
      fixImg() {
        this.position = 'fixImg';
      },
      //验证码
      getCode() {

        //发送验证码的是验证手机和邮箱号
        if (this.aisle === 0) {
          let regPhone = 11 && /^((13|14|15|17|18)[0-9]{1}\d{8})$/;
          if (this.phone == "" || !regPhone.test(this.phone)) {
            tool.toast("请填写正确的手机号！");
            return;
          }
        } else {
          let regEamil = /^[A-Za-z0-9]+([-_.][A-Za-z0-9]+)*@([A-Za-z0-9]+[-.])+[A-Za-z0-9]{2,5}$/g;
          if (this.email == "" || !regEamil.test(this.email)) {
            tool.toast("请填写正确的手机号！");
            return;
          }
        }

        let param = new URLSearchParams();

        param.append('name', this.aisle === 0 ? this.phone : this.email);

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
      //点亮登录按钮
      renderBtnColor() {
        if (this.aisle === 0) {
          if(this.phone != '' && this.verifyCode!='' && this.password !=''){
            this.isDisable = false;
            return "loginBtnActive";
          }
        }else{
          if(this.email != '' && this.verifyCode!='' && this.password!=''){
            this.isDisable = false;
            return "loginBtnActive";
          }

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

  .icon-phone {
  @include bg-image('./img/phone');
  }

  .icon-password {
  @include bg-image('./img/password');
  }

  .icon-email {
  @include bg-image('./img/email');
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

  .pswIcon {
    width: 16px;
    height: 16px;
    background-size: 16px auto;
    display: block;
  }

  .pswIconShow {
  @include bg-image('./img/psw-show');
  }

  .pswIconClose {
  @include bg-image('./img/psw-close');
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

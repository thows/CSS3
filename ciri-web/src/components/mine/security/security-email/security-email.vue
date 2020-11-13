<template>
  <div class="security ping-blank">
    <header-bar text="邮箱绑定" @back="back"></header-bar>
    <cross-line style="margin-top: 44px;"></cross-line>
    <div class="main">
      <div class="bind-email">
        <span>当前绑定邮箱：</span><span class="email">{{ currentEmail }}</span>
      </div>
      <div class="iconWrap">
        <div class="mint-cell">
          <div class="mint-cell-wrapper">
            <input placeholder="请输入邮箱" type="text" class="mint-field-core" v-model="email" @blur="verifyEmail" @focus="Focus">
          </div>
        </div>
        <i class="iconImg icon-email"></i>
        <div class="switch getCodeBg" v-show="showCode" @click="getCode">发送验证码</div>
        <div class="switch getCodeBg" v-show="!showCode">{{count}} s</div>
      </div>
      <div class="iconWrap">
        <div class="mint-cell">
          <div class="mint-cell-wrapper">
            <input placeholder="请输入验证码" type="tel" class="mint-field-core" v-model="auchcode" @blur="verifyCode" @focus="Focus">
          </div>
        </div>
        <i class="iconImg icon-authcode"></i>
      </div>
      <div class="error">
        <div v-show="errorShow" v-text="error">手机号错误，请重新输入</div>
      </div>
      <mt-button :class="loginClass" size="large" @click="binding">确认绑定</mt-button>
    </div>
  </div>
</template>

<script>
  import HeaderBar from '@/components/base/header-bar/header-bar'
  import CrossLine from '@/components/base/cross-line/cross-line'
  import tool from '@/api/tool';
  export default {
    components: {
      HeaderBar,
      CrossLine
    },
    data () {
      return {
        loginClass: 'loginBtn',
        count: '',
        timer: null,
        error: '',
        errorShow: false,
        showCode: true,
        currentEmail: null
      }
    },
    mounted () {
      this.axios.get(tool.domind() + "/gateway/security/securityInfo?name=" + tool.getuser()).then(res => {
        //101 name参数不能为空 102 查询不到用户信息 200 返回用户安全设置信息
        if (res.data.code === 200)
          this.currentEmail = res.data.data.email;
      });
    },
    methods: {
      back (){
        window.history.back()
      },
      //input获取焦点时执行
      Focus () {
        this.loginClass = 'loginBtnActive';
      },
      getCode () {
        let tag = tool.checkEmail(this.email);
        if (!tag) {
          this.errorShow = true;
          this.error = '邮箱格式不正确';
          return
        }
        let param = new URLSearchParams();
        param.append('mail', this.email);
        if (tag) {
          this.axios.post(tool.domind() + '/gateway/security/mailCode', param).then(res => {
            if (res.data === 0) {
              this.errorShow = true;
              this.error = '参数错误';
            }else if (res.data === 1) {
              this.errorShow = true;
              this.error = '邮箱格式不正确';
            }else if (res.data === 2) {
              this.errorShow = true;
              this.error = '该邮箱已经被注册';
            }else if (res.data === 3) {
              this.errorShow = true;
              this.error = '邮箱发送验证码发送频率太快';
            }else if (res.data === 4) {
              this.errorShow = true;
              this.error = '发送验证码失败';
            }else if (res.data === 10) {
              //alert('验证码发送成功');
            }

          }).catch(err => {
            console.log(err)
          })
        }
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
      verifyEmail() {
        let flag = /^[A-Za-z0-9]+([-_.][A-Za-z0-9]+)*@([A-Za-z0-9]+[-.])+[A-Za-z0-9]{2,5}$/g;
        if (!this.email) {
          this.errorShow = true;
          this.error = '邮箱不能为空';
        } else if (!flag.test(this.email)) {
          this.errorShow = true;
          this.error = '邮箱错误，请重新输入';
        } else {
          this.errorShow = false;
        }
      },
      verifyCode (){
        if (!this.auchcode) {
          this.errorShow = true;
          this.error = '验证码不能为空';
        }else if(this.auchcode.length != 6){
          this.errorShow = true;
          this.error = '验证码的长度不正确';
        }else {
          this.errorShow = false;
        }
      },
      binding (){
        this.verifyEmail();
        if(this.errorShow)
          return ;

        this.verifyCode();
        if(this.errorShow)
          return ;
        let param = tool.buildForm([
          { key: "name", v: tool.getuser() },
          { key: "mail", v: this.email },
          { key: "code", v: this.auchcode }
        ]);
        this.axios.post(tool.domind()+'/gateway/security/bindMail',param
        ).then(res => {
          if(res.data === 10){
            tool.toast('绑定成功');
            window.history.back();
          }else if(res.data === 4){
            this.error = '不能查询用户信息';
            this.errorShow = true;
          }else if(res.data === 3) {
            this.error = '验证码不正确';
            this.errorShow = true;
          }else if(res.data === 2) {
            this.error = '邮箱已被注册';
            this.errorShow = true;
          }else if(res.data === 1) {
            this.error = '邮箱格式不正确';
            this.errorShow = true;
          }else if(res.data === 0) {
            this.error = '请求参数错误';
            this.errorShow = true;
          }else if(res.data === -1) {
            this.error = '绑定失败';
            this.errorShow = true;
          }
        }).catch(err => {
          tool.toast(err);
          console.log(err)
        })
      }
    }
  }
</script>

<style type="text/scss" lang="scss" scoped>
  @import '~@/assets/scss/mixin.scss';
  @import '~@/assets/scss/const.scss';
  .main{
    text-align: left;
    padding: 0 10px;
    .bind-email{
      padding: 25px 0;
      color:#f81717;
      font-size: 13px;
    }
    .iconWrap{
      position: relative;
      .mint-cell{
        border:1px solid #dedede;
        border-radius: 3px;
        margin-bottom: 15px;
        padding-left: 40px;
        font-size: 12px;
        height:34px;
        min-height: 34px;
        .mint-cell-wrapper{
          padding:0;
        }
      }
      i {
        display: block;
        width: 20px;
        height: 20px;
        background-size: 20px auto;
      }
      .icon-authcode {
        @include bg-image('../img/authcode');
      }
      .icon-email {
        @include bg-image('../img/email');
      }
      .iconImg{
        position: absolute;
        left: 10px;
        top:7px;
      }
      .switch{
        position: absolute;
        right:10px;
        top:10px;
        color:#333;
        font-size: 10px;
      }
      .getCodeBg{
        width:62px;
        padding:5px 0;
        text-align: center;
        background: #f5f5f5;
        border-radius: 3px;
        top:7px;
      }
    }
    .error{
      text-align: center;
      color:#f81717;
      font-size: 10px;
      padding:35px 0 15px;
      height:10px;
    }
    .mint-button {
      margin: 0px auto 15px;
      font-size: 15px;
      height: 34px;
    }
    .loginBtn{
      background:#eeeeee ;
      color: #333333;
    }
    .loginBtnActive{
      background:#3f83e6;
      color: #ffffff;
    }
  }
</style>

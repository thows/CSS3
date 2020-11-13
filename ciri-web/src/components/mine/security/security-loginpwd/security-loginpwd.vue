<template>
<div class="security-loginpwd ping-blank">
  <header-bar text="修改密码" @back="back"></header-bar>
  <cross-line style="margin-top: 44px;"></cross-line>
  <div class="main">
    <div class="iconWrap">
      <div class="mint-cell">
        <div class="mint-cell-wrapper">
          <input placeholder="请输入原密码" type="password" v-model="password1" class="mint-field-core" @blur="vertify1" @focus="Focus">
        </div>
      </div>
      <i class="iconImg icon-password"></i>
      <!--<div :class="pswIcon1" @click="pswShow1"></div>-->
    </div>
    <div class="iconWrap">
      <div class="mint-cell">
        <div class="mint-cell-wrapper">
          <input placeholder="请输入新密码" type="password" v-model="password2" class="mint-field-core" @blur="vertify2" @focus="Focus">
        </div>
      </div>
      <i class="iconImg icon-password"></i>
      <!--<div :class="pswIcon2" @click="pswShow2"></div>-->
    </div>
    <div class="iconWrap">
      <div class="mint-cell">
        <div class="mint-cell-wrapper">
          <input placeholder="请确认新密码" type="password" v-model="password3" class="mint-field-core" @blur="vertify3" @focus="Focus">
        </div>
      </div>
      <i class="iconImg icon-password"></i>
      <!--<div :class="pswIcon2" @click="pswShow2"></div>-->
    </div>
    <router-link to="/resetpwd" class="fr forgetpwd">忘记密码？</router-link>
    <div class="error">
      <div v-show="errorShow" class="errorText" v-text="error"></div>
    </div>
    <mt-button :class="registerClass" size="large" @click="confirmChange">确认修改</mt-button>
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
        registerClass: 'registerBtn',
        error: '账号或密码错误，请重新输入',
        errorShow: false
      }
    },
    methods: {
      back() {
        window.history.back()
      },
      Focus () {
        this.registerClass = 'registerBtnActive';
      },
      vertify1 () {
        if (!this.password1) {
          this.errorShow = true;
          this.error = '原始密码不能为空';
        }else if(this.password1.length < 6){
          this.errorShow = true;
          this.error = '原始密码长度不能小于6位';
        }else{
          this.errorShow = false;
        }
      },
      vertify2 () {
        if (!this.password2) {
          this.errorShow = true;
          this.error = '新密码不能为空';
        }else if(this.password2.length < 6){
          this.errorShow = true;
          this.error = '新密码长度不能小于6位';
        }else{
          this.errorShow = false;
        }
      },
      vertify3 () {
        if (!this.password3) {
          this.errorShow = true;
          this.error = '确认密码不能为空';
        }else if(this.password3.length < 6){
          this.errorShow = true;
          this.error = '确认密码长度不能小于6位';
        }else if(this.password2!==this.password3){
          this.errorShow = true;
          this.error = '确认密码错误与密码不一致';
        } else{
          this.errorShow = false;
        }
      },

      confirmChange () {
        this.vertify1();
        if(this.errorShow){
          return ;
        }
        this.vertify2();
        if(this.errorShow){
          return ;
        }
        this.vertify3();
        if (this.errorShow){
          return ;
        }
        this.axios.post(tool.domind() + '/gateway/security/changePassword',
          {'name': tool.getuser(), 'originalPassword': this.password1, 'newPassword': this.password2, 'confirmPassword': this.password3}
        ).then(res => {
          if (res.data.code === 200) {
            tool.toast('绑定成功');
            window.history.back();
          } else if (res.data.code === 101){
            this.error = '原始密码错误';
            this.errorShow = true;
          } else if (res.data.code === 101) {
            this.error = '修改失败';
            this.errorShow = true;
          } else if (res.data.code === 500) {
            this.error = '服务器错误';
            this.errorShow = true;
          }
        }).catch(err => {
          tool.toast(err);
          console.log(err)
        })
      },

    }

  }
</script>

<style type="text/scss" lang="scss" scoped>
  @import '~@/assets/scss/mixin.scss';
  @import '~@/assets/scss/const.scss';
  .main{
    padding: 15px 10px;
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
      .icon-password {
        @include bg-image('../img/psw');
      }
      .iconImg{
        position: absolute;
        left: 10px;
        top:7px;
      }
      .number_registered{
        position: absolute;
        left: 40px;
        top:36px;
        font-size: 9px;
        color: #f81717;
      }
      .switch{
        position: absolute;
        right:10px;
        top:10px;
        color:#333;
        font-size: 10px;
      }
      .pswIcon{
        width:16px;
        height:16px;
        background-size: 16px auto;
        display: block;
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
    .forgetpwd{
      font-size: 12px;
      color:#666;margin: 15px 0 60px;
    }
    .registerBtn{
      background:#eeeeee ;
      color: #333333;
    }
    .registerBtnActive{
      background:#3f83e6;
      color: #ffffff;
    }
    .error{
      text-align: center;
      color:#f81717;
      font-size: 10px;
      padding:15px 0 15px;
      height:10px;
      margin-top: 60px;
    }
  }

</style>

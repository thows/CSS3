<template>
<div>
  <div class="heart ping-blank">
    <header-bar text="意见反馈" @back="back"></header-bar>
    <cross-line style="margin-top: 44px;"></cross-line>
    <div class="hear_txt clearfix">
      <div class="left crowdimg">
      </div>
      <div id="crowdtext">
        <p style="height:18px;line-height: 18px;font-size: 13px;color:#333;">您好，您对海外项目有任何问题或者有什么建议都可以留言给我们。我们会及时与您联系！</p>
        <div style="text-align: right;margin-top:20px; ">
          <span style="display: inline-block;border-bottom: 1px solid #ccc;width: 80px;margin-right: 8px;margin-bottom: 5px;"></span>
          <span style="color:#333;font-size: 14px">Javi</span>
        </div>
      </div>
      <div class="clear"></div>
    </div>
    <div class="heart_comment clearfix">
      <textarea id="fdContent" class="tit_inp" placeholder="请输入问题或建议" v-model="homeContent1"></textarea>
      <input id="fdContact" type="text" placeholder="请输入联系方式" class="in_phone" v-model="homeContact">
      <div id="feedbackAction" class="btn" @click="feedback">提交</div>
    </div>
  </div>
</div>
</template>

<script>
  import HeaderBar from '@/components/base/header-bar/header-bar'
  import CrossLine from '@/components/base/cross-line/cross-line'
  import {Toast} from 'mint-ui'
  import {MessageBox} from 'mint-ui'
  import tool from '@/api/tool';
  export default {
    components: {
      HeaderBar,
      CrossLine
    },
    data() {
      return {
        homeContent1:'',
        homeContact:''
      }
    },
    methods: {
      back() {
        window.history.back()
      },
      feedback (){
        if(!this.homeContent1){
          Toast({
            message: '请输入问题或建议',
            duration: 5000
          });
          return;
        }
        let param = tool.buildForm([
          { key: "content", v: this.homeContent1 },
          { key: "contact", v: this.homeContact }
        ]);
        this.axios.post(tool.domind()+'/gateway/app/feedback',param).then(res => {
          if (res.data.code === 200) {
            MessageBox({
              message: '提交成功，我们会尽快联系您！',
              showCancelButton: false
            });
            this.homeContent1 = "";
            this.homeContact = "";
          }
        }).catch(err => {
          tool.toast(err);
        })
      }
    }
  }
</script>

<style type="text/scss" lang="scss" scoped>
  @import '~@/assets/scss/mixin.scss';
  @import '~@/assets/scss/const.scss';
  .heart{
    .title_enter{
      position: relative;
      color:#333;
      font-size: 16px;
      line-height: 16px;
      margin-bottom: 24px;
      margin-top:25px;
      text-align: left;
    }
    .hear_txt{
      padding: 0 10px;
      padding-top: 9px;
      .left{
        padding-right: 3%;
        margin-right:3%;
        text-align: center;
        border-right: 1px solid #d9d6e8;
        float: left;
        width: 18%;
      }
      .crowdimg{
        display: inline-block;
        width: 55px;
        height: 55px;
        background-size: 55px auto;
        @include bg-image("../img/javi");
        background-repeat: no-repeat;
      }
      #crowdtext{float: right;width:75%;color:#333;
      font-size: 13px;}
      .clear{clear:both;}
    }
    .heart_comment {
      padding: 0 10px;
      font-size: 14px;
      color: #999;
      .in_phone {
        outline: 0;
        width: 92%;
        height: 36px;
        line-height: 16px;
        border: 1px solid #dedede;
        border-radius: 3px;
        padding: 0 3.4%;
        margin-top: 10px;
        margin-bottom: 20px;
        font-size: 14px;
      }

      .tit_inp {
        margin-top: 13px;
        margin-bottom: 10px;
        width: 92%;
        font-size: 14px;
        background: #fff;
        outline: 0;
        border: 1px solid #dedede;
        border-radius: 3px;
        padding: 3.4%;
        line-height: 16px;
        height: 101px;
        resize: none;
        font-family: "Microsoft Yahei";
      }
    }
  }

</style>

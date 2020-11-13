<template>
  <div class="project-bottom">
    <ul class="tab-warp">
      <li class="back" @click="backProject">
        <i class="icon-back"></i>
        <span>返回</span>
      </li>
      <li :name="collected1" v-bind:class="[collected1 ? 'favorited' : 'favorite' ,'']" @click="collect">
        <i class="icon-fav"></i>
        <span>{{collects}}人已收藏</span>
      </li>
      <li class="appoint" @click="appoint">
        <i class="icon-appoint"></i>
        <span>约谈</span>
      </li>
    </ul>
    <div class="appoint pop-bg" v-show="appointShow">
      <div class="pop-up">
        <p class="title">约谈</p>
        <div class="input-warp">
          <input type="text" placeholder="姓名（必填）" v-model="talkDate">
          <input type="text" placeholder="您的手机号码（必填）" v-model="phone">

        </div>
        <p class="msg">我们将会在第一时间和您取得联系，感谢支持！</p>
        <div class="btn-warp clearfix">
          <div class="cancel fl" @click="appointExit">取消</div>
          <div class="upgrade fr" @click="talk">确定</div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
  import tool from '@/api/tool'

  export default {
    components: {
      tool
    },
    data() {
      return {
        // projid:this.$route.query.projId,
        appointShow: false,
        phone: "",
        talkDate: "",
        collects: "",
        collected1: false,
      }
    },
    props: {
      projId: Number
    },
    methods: {
      //返回到列表页
      backProject() {
        this.$router.push('/project');
      },
      collect() {
        if (tool.getuser() === null) {
          this.$router.replace({path: '/login'})
        }
        this.$api.post('/user/batchDealWithUserCollect',
          {
            typeFlag: 1,
            projectIdsStr: this.projId,
            operationFlag: !this.collected1,
            name: tool.getuser()
          }).then(res => {
          if (this.collected1) {
            if (parseInt(this.collects) > 0) {
              this.collects = parseInt(this.collects) - 1
            } else {
              this.collects = '0'
            }
          } else {
            if (parseInt(this.collects) < 999) {
              this.collects = parseInt(this.collects) + 1
            } else {
              this.collects = '999+'
            }
          }
          this.collected1 = !this.collected1
        })
      },
      appoint() {
        this.appointShow = true;
      },
      appointExit() {
        this.appointShow = false;
      },
      talk() {
        let flag = 11 && /^((13|14|15|17|18)[0-9]{1}\d{8})$/;
        if (this.phone == null || !flag.test(this.phone)) {
          tool.toast("手机号格式不正确");
          return;
        }
        if (this.talkDate == "") {
          tool.toast("预约时间不能为空");
          return;
        }
        this.$api.post('/pb/talk/add',
          {phone: this.phone, projid: this.projId, talkTime: this.talkDate}).then(res => {
          if (res.code === 200) {
            tool.toast("预约成功");
          } else {
            tool.toast("预约失败请重试");
          }
          this.appointShow = false;
        });

      },
      init() {
        this.$api.post('/pb/p/getProjectHeadInfo', {username: tool.getuser(), projId: this.projId})
          .then(res => {
            if (res.code === 200) {
              this.collects = res.data.collects
              this.shares = res.data.shares
              this.collected1 = res.data.collected
            }
          })
      }
    },
    created() {
      this.init();
    }
  }
</script>

<style type="text/scss" lang="scss" scoped>
  @import '~@/assets/scss/reset.scss';
  @import '~@/assets/scss/mixin.scss';
  .project-bottom{
    padding-bottom: 50px;
    ul.tab-warp{
      @include onepx();
      background-color: #fff;
      position: fixed;
      bottom: 0;
      height:50px;
      width: 100%;
      z-index: 99;
      li{
        float: left;
        height:50px;
        padding: 5px 0;
        i {
          display: block;
          width: 20px;
          height: 20px;
          margin:auto;
          background-size: 20px auto;
          background-repeat: no-repeat;
        }
        span {
          display: block;
          font-size: 12px;
          color:#333;
          height:12px;
          line-height: 12px;
          margin-top: 5px;
        }
      }
      li.favorite{
        width:32%;
        border-right: 1px solid #dedede;
        box-sizing: border-box;
        i{
          @include bg-image("../img/bottom-fav");
        }
      }
      li.favorited{
        width:32%;
        i{
          @include bg-image("../img/bottom-faved");
        }
      }
      li.back{
        width:21.3%;
        border-right: 1px solid #dedede;
        box-sizing: border-box;
        i{
          @include bg-image("../img/bottom-back");
        }
      }
      li.appoint{
        background-color: #3f83e6;
        width:46.7%;
        line-height: 50px;
        padding: 0;
        i{
          @include bg-image("../img/bottom-appoint");
          display: inline-block;
          vertical-align: middle;
          margin-right: 5px;
        }
        span{
          color:#fff;
          font-size: 15px;
          display: inline-block;
        }
      }
    }
    .appoint{
      .pop-up{
        position: fixed;
        margin: auto;
        top:0;
        left: 0;
        right:0;
        bottom:0;
        width:86%;
        background: #fff;
        height:221px;
        overflow: hidden;
        .title{
          font-size: 18px;
          color:#333;
          margin: 20px 0 15px;
          line-height: 18px;
          text-align: center;
          span{
            color:#fdb140;
          }
        }
        .input-warp{
          margin: 0 15px;
          input{
            width:100%;
            height:35px;
            line-height: 1;
            padding: 0 10px;
            margin-bottom: 10px;
            box-sizing: border-box;
            border:1px solid #dedede;
          }
        }
        .msg{
          font-size: 13px;
          color:#333;
          line-height: 1;
          margin: 5px auto 15px;
        }
        .btn-warp{
          border-top: 1px solid #dedede;
          position: relative;
          display: flex;
          flex-direction: row;
          text-align: center;
          height:45px;
          line-height: 45px;
          .cancel,.upgrade{
            flex: 1;
            font-size: 18px;
            color:#333;
          }
          .cancel{
            border-right: 1px solid #dedede;
          }
          .upgrade{
            color: #3f83e6;
          }
        }
      }
    }
  }
</style>

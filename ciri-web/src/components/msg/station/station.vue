<template>
  <div class="auth">
    <div class="login" v-if="!loginAuth">
      <header class="gradient">我的消息
      </header>
      <div class="main">
        <div class="img"></div>

        <div class="login-btn small-btn" @click="login">立即登录</div>
      </div>
    </div>
    <div class="station" v-if="loginAuth">
      <ul class="tab clearfix">
        <li :class="{active:tabActive==1}" @click="showInbox">收件箱 <em>{{this.count}}</em></li>
        <li :class="{active:tabActive==2}" @click="showOutbox">发件箱 <em></em></li>
      </ul>
      <div v-if="msgs!=null&&msgs.length!=0" class="inbox" v-show="seeInbox">
        <Inbox v-for='(msg,index) in this.msgs' :content='msg' :key='index'
               :typeIcon="{'icon-agree':msg.accessmode==3,'icon-refuse':msg.accessmode==4,
           'icon-already-see-no-deal':msg.accessmode==2,'icon-no-see-no-deal':msg.accessmode==1}"
               :btnColor="{'color-agree':msg.accessmode==3,'color-refuse':msg.accessmode==4,
           'color-deal':msg.accessmode==2 || msg.accessmode==1}"
               :btnTitle='parseAccessMode(msg.accessmode)'
               :btnShow='msg.isApprove == 1 ? true : false' :agreeBtn="msg.accessmode!=3 && msg.accessmode!=4"></Inbox>
        <button @click="loadMore()" :disabled="this.disabled" class="more">
          <span v-text="moreText">{{this.moreText}}</span><i v-show="isIcon"></i>
        </button>
      </div>
      <div class="outbox" v-show="!seeInbox">
        <Inbox v-for='(msg,index) in this.msgs' :content='msg' :key='index'
               :typeIcon="{'icon-agree':msg.accessmode==3,'icon-refuse':msg.accessmode==4,
           'icon-already-see-no-deal':msg.accessmode==2,'icon-no-see-no-deal':msg.accessmode==1}"
               :btnColor="{'color-agree':msg.accessmode==3,'color-refuse':msg.accessmode==4,
           'color-deal':msg.accessmode==2 || msg.accessmode==1}"
               :btnTitle='parseAccessMode(msg.accessmode)'
               :btnShow='false' :agreeBtn="msg.accessmode!=3 && msg.accessmode!=4"></Inbox>
        <button @click="loadMore()" :disabled="this.disabled" class="more">
          <span v-text="moreText">{{this.moreText}}</span><i v-show="isIcon"></i>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
  import router from '@/router/index'
  import tool from "@/api/tool";
  import Inbox from '@/components/base/inbox/inbox'
  import Outbox from '@/components/base/outbox/outbox'
  import Loading from '@/components/base/loading/loading'

  export default {
    components: {
      tool,
      Inbox,
      Outbox,
      Loading
    },
    data() {
      return {
        tabActive: 1,
        seeInbox: true,
        isShow: false,
        msgs: null,
        count:null,
        url: '/ah/s0/i/insidemsg',
        pageId: 1,
        moreText: '查看更多',
        disabled: false,
        isIcon: true,
        notloading: true,
        loginAuth : false,
        loginActive : ''
      }
    },
    props: {},
    watch: {},
    methods: {
      isLogin(){
        let login=tool.islogin();
        if(login){
          this.loginAuth = true;
        }else {
          this.loginAuth = false;
        }
      },
      login(){
        this.$router.push({
          path: '/login',
          query: {redirect: '/msg/station'}
        });
      },
      parseAccessMode(tag) {
        if (tag == 1 || tag == 2) {
          return '待处理';
        } else if (tag == 3) {
          return '已同意';
        } else if (tag == 4) {
          return '已拒绝';
        }
      },
      showInbox() {
        this.msgs = null;
        this.tabActive = 1;
        this.seeInbox = true;
        this.url = '/ah/s0/i/insidemsg';
        this.pageId = 1;
        this.loadMore();
        this.count = null;
      },
      showOutbox() {
        this.msgs = null;
        this.url = '/ah/s0/i/sendmsg';
        this.tabActive = 2;
        this.seeInbox = false;
        this.pageId = 1;
        this.loadMore();
      },
      showOutDetail() {
        this.isShow = !this.isShow
      },
      showInDetail() {
        this.isShow = !this.isShow
      },
      loadMore() {
        this.$api.get(this.url, {
          pageId: this.pageId,
          rowCount: 10
        }).then(res => {
          if (res.code == 200) {
            this.notloading = false;
            if (this.pageId == 1 || this.msgs == null) {
              if(this.url == '/ah/s0/i/insidemsg'){
                this.count=res.data.count;
                // if(this.count>99){
                //   this.count='99+';
                // }
              }
              this.msgs = res.data.msgs;
            } else {
              this.msgs = this.msgs.concat(res.data.msgs);
            }
            this.pageId = this.pageId + 1;
            if (res.data.msgs.length == 0 || res.data.msgs.length < 10) {
              this.moreText = '没有更多了';
              this.disabled = 'disabled';
              this.isIcon = false;
            }
          }
        });
      },


    },
    filters: {},
    computed: {},
    created() {
      let login=tool.islogin();
      if(login){
        this.loadMore();
      }
      this.isLogin();
    },
    mounted() {

    },
    destroyed() {
    }
  }
</script>

<style type="text/scss" lang="scss" scoped>
  @import '~@/assets/scss/const.scss';
  @import '~@/assets/scss/mixin.scss';
  .auth{
    .login{
      position: fixed;
      width: 100%;
      height: 100%;
      top: 0px;
      background: #fff;
      header{
        height: 44px;
        line-height: 44px;
        color: #fff;
        font-size: 20px;
        text-align: center;
        position: relative;
      }
      .main{
        margin: 228px auto 0;
        display: table;
        .img{
          width:229px;
          height:16px;
          @include bg-image("../img/msg-auth");
          background-size: 229px 16px;
          margin-bottom: 37px;
        }
        .login-btn{
          width:150px;
          height:30px;
          margin: auto;
          line-height: 30px;
          border-radius: 30px;
        }
      }
    }
    .station {
      padding: 0 10px 80px;

      .tab {
        margin: 15px 0 0px;

        li {
          float: left;
          margin-right: 15px;
          color: #528de8;
          font-size: 10px;
          width: 75px;
          height: 20px;
          line-height: 20px;
          border-radius: 20px;
          border: 1px solid #528de8;
          text-align: center;

          &.active {
            background: #528de8;
            color: #fff;
          }

        }
      }
      .inbox {
        text-align: left;
      }

      .outbox {
        text-align: left;
      }
      .more {
        font-size: 12px;
        color: #3f80e9;
        text-align: center;
        background: #fff;
        display: table;
        margin: 20px auto 0;

        i {
          display: inline-block;
          width: 12px;
          height: 12px;
          @include bg-image("../../news/img/more");
          background-size: 12px auto;
          margin-left: 6px;
        }
      }
      .loading-warp{
        min-height:300px;
      }

    }
  }


</style>

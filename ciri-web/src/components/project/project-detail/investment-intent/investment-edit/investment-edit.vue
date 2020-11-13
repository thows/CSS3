<template>
  <div class="investment-edit">
    <header class="clearfix">{{this.$route.query.title}}
      <i class="icon-back" @click="back"></i>
      <span class="submit" @click="confrim">提交</span>
    </header>
    <div class="remind">
      （请依据模板完善内容）
    </div>
    <div class="content">
      <textarea maxlength="10000" v-model="word" @mouseleave="fill()"></textarea>
    </div>


  </div>
</template>

<script>
  import HeaderBar from "@/components/base/header-bar/header-bar";
  import CrossLine from "@/components/base/cross-line/cross-line";
  import tool from "@/api/tool"
  import gbus from '@/api/gbus'

  export default {
    name: "investment-edit",
    components: {
      HeaderBar,
      CrossLine
    },
    data() {
      return {
        word: '',
        key: ''
      };
    },
    beforeRouteLeave(to, from, next) {
      this.$destroy();
      next();
    },
    methods: {
      back() {
        window.history.back();
      },
      confrim() {
        if(this.word==''){
          this.word=" ";
        }
        localStorage.setItem(this.key, this.word);
        window.history.back();
      },
      fill() {

      }
    },
    props: {},
    created() {
      this.key = this.$route.query.key;
      if(localStorage.getItem(this.key) != null){
        this.word = localStorage.getItem(this.key);
      }
    },
    mounted() {

    }
  };
</script>

<style type="text/scss" lang="scss" scoped>
  @import "~@/assets/scss/mixin.scss";
  @import "~@/assets/scss/reset.scss";

  .investment-edit {
    text-align: left;
    header {
      height: 44px;
      line-height: 44px;
      font-size: 20px;
      color: #333;
      text-align: center;
      position: relative;
      border-bottom: 1px solid #dedede;
      .icon-back {
        display: block;
        float: left;
        width: 22px;
        height: 22px;
        margin: 11px auto;
        @include bg-image("../../../img/icon-back");
        background-size: 22px auto;
      }
      .submit {
        font-size: 16px;
        color: #528de8;
        float: right;
        margin-right: 10px;
      }

    }
    .remind {
      padding: 0px 5px;
      height: 30px;
      overflow: hidden;
      line-height: 30px;
      background: #f5f5f5;
      margin: 15px 10px 15px;
      color: #528de8;
      font-size: 10px;
      border-radius: 2px;
    }
    .content {
      margin: 0 10px;
      textarea {
        width: 91%;
        height: 500px;
        border: 1px solid #dedede;
        border-radius: 3px;
        padding: 15px;
      }
    }

  }

</style>

<template>
  <div class="pop-up" v-show="authorityShow">
    <p class="title">此页面仅限 项目库会员 及更高等级会员查看，您当前会员等级为<span>注册会员</span>！</p>
    <div class="btn-warp clearfix">
      <!--  <div class="cancel fl" @click="authorityHide">取消</div>-->
      <!--<div class="upgrade fr" @click="upgrade">升级</div>-->
      <mt-button size="small" type="primary" class="upgrade fr" @click="upgrade">升级</mt-button>
    </div>
  </div>
</template>

<script>
  import { Button } from 'mint-ui';
  export default {
    components: {},
    data() {
      return {
      }
    },
    props: {
      authorityShow: {
        type: Boolean,
        default: false
      }
    },
    watch: {},
    methods: {
      authorityHide () {
        this.$emit('authorityHide')
      },
      upgrade () {
        this.$emit('upgrade')
      }
    },
    filters: {},
    computed: {},
    created() {
    },
    mounted() {
    },
    destroyed() {
    }
  }
</script>

<style type="text/scss" lang="scss" scoped>
  @import '~@/assets/scss/reset.scss';
  @import '~@/assets/scss/mixin.scss';
  .pop-up{
    position: relative;
    background: #f5f5f5;
    height:40px;
    padding: 10px;
    border-radius: 3px;
    .title{
      font-size: 13px;
      color:#333;
      line-height: 20px;
      width: 230px;
      float: left;
      span{
        color:#fdb140;
      }
    }
    .btn-warp{
      position: relative;
      display: flex;
      flex-direction: row;
      text-align: center;
      height:45px;
      width: 60px;
      line-height: 45px;
      float: right;
      .cancel,.upgrade{
        flex: 1;
        font-size: 18px;
        color:#333;
      }
      .cancel{
        border-right: 1px solid #dedede;
      }
      .upgrade{
        color: white;
        font-size: 14px;
      }
    }
  }
</style>

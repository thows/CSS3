<template>
    <div class="pop-up" v-show="authorityShow">
      <p class="title">此页面仅限 {{this.powerWord}} 及更高等级会员查看，<br/>您当前会员等级为<span>{{this.levelWord}}</span>！</p>
      <div class="btn-warp clearfix">
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
        levelWord: '注册会员',
        powerWord:'注册会员'
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
      let level = localStorage.getItem('userLevel');
      if(level == '1'){
        this.levelWord = '注册会员';
        this.powerWord = '项目库会员';
      }else if(level == '3'){
        this.levelWord = '项目库会员';
        this.powerWord = '源合网会员';
      }
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
    margin: auto;
    top:0;
    left: 0;
    right:0;
    bottom:0;
    width:86%;
    background: white;
    height:132px;
    .title{
      font-size: 13px;
      color:#333;
      line-height: 20px;
      margin: 17px auto 20px;
      text-align: center;
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
      left: 50%;
      margin-left: -30px;
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
        background-color: #3f83e6;
        font-size: 13px
      }
    }
  }


</style>

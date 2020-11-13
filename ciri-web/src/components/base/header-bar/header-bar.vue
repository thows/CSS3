<!-- 顶部栏 组件 -->

<template>
  <div class="header-bar">
    <i class="icon-arrow_lift" @click="back"></i>
    <h1>{{text}}</h1>
    <span v-show="btnShow" class="btn-save" @click="saveInfo">保存</span>
  </div>
</template>

<script>
  export default {
    components: {},
    data () {
      return {}
    },
    props: {
      text: {
        type: String,
        default: ''
      },
      btnShow: {
        type: String,
        default: ''
      },
    },
    watch: {},
    methods: {
      back () {
        this.$emit('back')
      },
      saveInfo(){
        this.$emit('saveInfo')
      }
    },
    filters: {},
    computed: {},
    created () {},
    mounted () {}
  }
</script>

<style type="text/scss" lang="scss" scoped>
  @import '~@/assets/scss/const.scss';
  @import '~@/assets/scss/mixin.scss';

  .header-bar {
    position: fixed;
    top: 0;
    width: 100%;
    height: 44px;
    line-height: 44px;
    background: #fff;
    text-align: center;
    z-index: 10;
    i {
      display: block;
      float:left;
      width: 22px;
      height: 22px;
      margin: 11px auto;
      @include bg-image('./icon-arrow_lift');
      background-size: 22px auto;
    }
    .icon-arrow_lift {
      @include bg-image('./icon-arrow_lift');
    }
    h1 {
      display: inline-block;
      line-height: 44px;
      font-size: 18px;
      color: #333;
      margin-left: -15px;
    }
    .btn-save{
      font-size: 16px;
      color: #528de8;
      position: absolute;
      right: 20px;
    }
  }
</style>

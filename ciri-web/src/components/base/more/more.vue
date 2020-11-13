<!-- 顶部栏 组件 -->

<template>
  <router-link :to=to>
    <div class="more-bar">
      <i class="icon-more" v-show="show"></i>
      <h1 :class="keyClass">{{textKey}}</h1>
      <h1>{{text}}</h1>
    </div>
  </router-link>
</template>

<script>
  export default {
    components: {},
    data () {
      return {
        object:this.object
      }
    },
    props: {
      text: {
        type: String,
        default: ''
      },
      textKey: {
        type: String,
        default: ''
      },
      keyClass: {
        type: String,
        default: 'key'
      },
      show: {
        type: Boolean,
        default: true
      },
      to: {
        type: String,
        default: ''
      }
    },
    watch: {},
    methods: {
      back () {
        this.$emit('back')
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

  .more-bar {
    height: 40px;
    line-height: 40px;
    background: #fff;
    padding: 0 10px;
    i {
      display: block;
      float:right;
      width: 20px;
      height: 40px;
      background-repeat: no-repeat;
      @include bg-image("../img/more");
      background-size: 20px auto;
      background-position: center;
    }
    .icon-more {
      @include bg-image("../img/more");
    }
    h1 {
      display: inline-block;
      text-align: left;
      font-size: 15px;
      color: #333;
      font-weight: normal;
    }
    .key{
      float:right;
      margin-right: 5px;
    }
    .mr35{
      margin-right: 25px;
      float: right;
    }
  }
</style>

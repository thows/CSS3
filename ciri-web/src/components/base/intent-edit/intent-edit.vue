<template>
  <div class="intent-edit">
    <div :class="article">
      {{this.content}}
    </div>
    <div class="read-more" @click="readMore" v-show="moreShow">
      <span v-text="moreText">阅读全文</span>
      <i :class="iconMore"></i>
    </div>
  </div>

</template>

<script>
  import tool from '@/api/tool'

  export default {
    name: 'intent-edit',
    components: {},
    data() {
      return {
        article:'article',
        moreText:'阅读全文',
        iconMore:'icon-more',
      }
    },
    props: {
      moreShow: {
        type: Boolean,
        default: false
      },
      content: {
        type: String
      },
    },
    watch: {

    },
    methods: {
      readMore(){
        if (this.moreText == '阅读全文') {
          this.moreText = '收起'
          this.iconMore = 'pack-up'
          this.article = 'article activeWord'
        } else {
          this.moreText = '阅读全文';
          this.iconMore = 'icon-more'
          this.article = 'article'
        }
      },
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
  .intent-edit{
    overflow: auto;
    word-wrap:break-word;
    word-break:break-all;
  }
  .article{
    font-size: 13px;
    line-height: 22px;
    color: #666;
    /*text-indent: 2em;*/
    max-height: 200px;
    overflow: hidden;
    &.activeWord {
      max-height:10000px;
    }
  }
  .read-more {
    font-size: 13px;
    color: #3f80e9;
    line-height: 1;
    text-align: center;
    float: right;
    margin-top: 10px;
    padding-right: 10px;

    i {
      display: inline-block;
      width: 10px;
      height: 10px;
      background-size: 10px auto;
    }

    i.icon-more {
      @include bg-image("../../news/img/more");
    }

    i.pack-up {
      @include bg-image("../../project/img/pack-up");
    }

  }

</style>

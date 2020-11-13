<template>
  <div class="article-warp" :class="[content?'':'no-content']">
    <div class="pro-article clearfix">
      <h4>
        <i class="left-line"></i><span>{{text}}</span>
      </h4>
      <p class="title" v-show="secondShow">【担保方式】</p>
      <div v-if="this.content!=null" :class="article" ref="articleRef"  v-html="replaceHtml()">
      </div>

      <p class="title" v-show="secondShow">【担保说明】</p>
      <div class="second" :class="article" v-show="secondShow" v-html="replaceHtml()">
        {{this.content2}}
      </div>

      <div class="read-more" @click="readMore" v-show="moreShow">
        <span v-text="moreText">阅读全文</span>
        <i :class="iconMore"></i>
      </div>
    </div>
  </div>
</template>

<script>
  import tool from '@/api/tool'

  export default {
    components: {},
    data() {
      return {
        moreText: '阅读全文',
        iconMore: 'icon-more',
        article: 'article',
        moreShow: false
      }
    },
    props: {
      text: {
        type: String,
        default: '商家列表'
      },
      secondShow: {
        type: Boolean,
        default: false
      },
      content: String,
      content2: String
    },
    watch: {},
    methods: {
      readMore() {
        if (this.moreText == '阅读全文') {
          this.moreText = '收起'
          this.iconMore = 'pack-up'
          this.article = 'article active'
        } else {
          this.moreText = '阅读全文';
          this.iconMore = 'icon-more'
          this.article = 'article'
        }
      },
      replaceHtml() {
        if (this.content!== null){
          if (this.content.length>405){
            this.moreShow = true;
          }else{
            this.moreShow = false;
          }
        }
        return tool.replaceAll(this.content, '\n', '<br/>');
      }
    },
    filters: {}
    ,
    computed: {}
    ,
    created() {
    }
    ,
    mounted() {
    }
    ,
    destroyed() {
    }
  }
</script>

<style type="text/scss" lang="scss" scoped>
  @import '~@/assets/scss/reset.scss';
  @import '~@/assets/scss/mixin.scss';

  .article-warp {
    text-align: left;

    h4 {
      text-align: left;
      overflow: hidden;
      line-height: 1;
      height: 16px;
      padding: 12px 10px 12px 15px;
      color: #333;
      font-size: 16px;
      font-weight: normal;
      @include onepx('bottom');

      .left-line {
        position: absolute;
        display: block;
        width: 3px;
        height: 15px;
        background-color: #528de8;
        left: 0;
        top: 12px;
      }

    }
    .pro-article {
      padding-bottom: 17px;

      .title {
        font-size: 16px;
        color: #666;
        margin-top: 10px;
      }

      .article {
        margin-top: 10px;
        padding: 0 10px;
        font-size: 13px;
        line-height: 22px;
        color: #666;
        /*text-indent: 2em;*/
        max-height:330px;
        overflow: hidden;
        /*text-overflow: ellipsis;*/
        /*display: -webkit-box;*/
        /*-webkit-line-clamp: 15;*/
        /*-webkit-box-orient: vertical;*/

        &.active {
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
    }
  }
  .no-content{
    h4:after{
      border: none;
    }
    .pro-article{
      padding-bottom: 0px;
    }
    .article{
      margin-top: 0px !important;
    }
  }

</style>

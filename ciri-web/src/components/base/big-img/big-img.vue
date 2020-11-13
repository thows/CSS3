<template>
  <div  id="big-img" class="clearfix">
    <div class="img-warp" id="img-warp" :class="article">
      <vue-preview v-if="this.imgList!=null" :slides="this.imgList" @close="handleClose" class="structure-warp clearfix"></vue-preview>
    </div>
    <div class="read-more" @click="readMore" v-show="moreShow">
      <span v-text="moreText">查看更多</span>
      <i :class="iconMore"></i>
    </div>
  </div>
</template>
<script>
  import tool from '../../../api/tool'

  export default {
    data() {
      return {
        slide1: [],
        moreText: '查看更多',
        iconMore: 'icon-more',
        article: 'article',
        moreShow: false
      }
    },
    methods: {
      readMore() {
        if (this.moreText == '查看更多') {
          this.moreText = '收起';
          this.iconMore = 'pack-up';
          this.article = 'article active';
        } else {
          this.moreText = '查看更多';
          this.iconMore = 'icon-more';
          this.article = 'article';
        }
      },
      handleClose() {
      },
      // 获取图片高度
      // imgHeight(){
      //   let imgWarp=document.getElementById("img-warp")
      //   function getStyle(element,cssPropertyName){
      //     if(window.getComputedStyle){//如果支持getComputedStyle属性（IE9及以上，ie9以下不兼容）
      //       return window.getComputedStyle(element)[cssPropertyName];
      //     }else{//如果支持currentStyle（IE9以下使用），返回
      //       return element.currentStyle[cssPropertyName];
      //     }
      //   }
      //   return getStyle(imgWarp,'height')
      // }
    },
    props: {
      content: Array
    },
    computed: {

      imgList: {
        get:function () {
          this.imgList = [];
          if (this.content==null){
            return null
          }
          this.content.forEach( v=> {
            let url = v.name;
            let remoteUrl = tool.generatorUrl(url);
            let j = {
              src: remoteUrl,
              msrc: remoteUrl,
              alt: 'picture1',
              title: '',
              w: 600,
              h: 400
            };
            this.slide1.push(j);
          });
          return this.slide1;
        },
        set:function () {}
      }
    },
    mounted (){
      // 图片加载更多
      // let imgHeight=this.imgHeight();
      // imgHeight=tool.pxKey(imgHeight)
      let imgWarp=document.getElementById("img-warp")
      console.log(this.imgList);
      if(this.imgList.length>4){
        this.moreShow = true;
      }else {
        this.moreShow = false;
        this.article ='';
        // imgWarp.style.height = 'auto';
      }
    },
    created() {
    },
  }
</script>

<style type="text/scss" lang="scss" scoped>
  @import '~@/assets/scss/reset.scss';
  @import '~@/assets/scss/const.scss';
  @import '~@/assets/scss/mixin.scss';
  #big-img{
    .article{
      height:316px;
      overflow: hidden;
      &.active{
        height:auto;
      }
    }
    .read-more {
      font-size: 13px;
      color: #3f80e9;
      line-height: 1;
      text-align: center;
      margin-top: 10px;
      padding-right: 10px;
      padding-bottom: 17px;

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
</style>

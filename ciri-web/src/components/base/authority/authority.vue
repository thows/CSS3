<template>
    <div class="authority pop-bg" v-show="authorityShow">
      <div class="pop-up">
        <p class="title">仅限 项目库会员 及更高等级会员查看，您当前会员等级为<span>注册会员</span>！</p>
        <div class="btn-warp clearfix">
          <div class="cancel fl" @click="authorityHide">取消</div>
          <div class="upgrade fr" @click="upgrade">升级</div>
        </div>
      </div>
    </div>
</template>

<script>
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
  .authority{
    .pop-up{
      position: fixed;
      margin: auto;
      top:0;
      left: 0;
      right:0;
      bottom:0;
      width:86%;
      background: #fff;
      height:132px;
      .title{
        font-size: 13px;
        color:#333;
        line-height: 20px;
        margin: 23px auto 24px;
        width: 230px;
        text-align: center;
        span{
          color:#fdb140;
        }
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

</style>

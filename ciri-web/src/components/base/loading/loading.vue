<template>
  <div class="project-loading">
    <div class="loading-wrap">
      <i class="icon-loading"></i>
      <p>加载中...</p>
    </div>
  </div>
</template>
<script>
    export default {
        components: {},
        data() {
            return {}
        },
        props: {
        },
        watch: {},
        methods: {},
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
    .project-loading {
      height: 280px;
      position: relative;
      .loading-wrap {
        position: absolute;
        top: 50%;
        left: 50%;
        margin: -20px 0px 0px -24px;
        .icon-loading {
          display: inline-block;
          width: 22px;
          height: 22px;
          background-repeat: no-repeat;
          background-size: 22px auto;
          background-position: center;
          background-image: url("../../index/img/icon-loading.gif");
          vertical-align: middle;
        }
        p {
          font-size: 13px;
        }
      }

    }

</style>

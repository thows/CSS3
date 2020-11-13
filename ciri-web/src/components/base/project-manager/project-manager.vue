<template>
  <div>
    <CrossLine></CrossLine>
    <div class="manager-warp">
    </div>
  </div>
</template>
<script>
  import CrossLine from '@/components/base/cross-line/cross-line'
  export default {
    components: {
      CrossLine
    },
    data() {
        return {}
    },
    props: {},
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
  .manager-warp{
    display:block;
    width:100%;
    height:122px;
    @include bg-image("../img/manager");
    background-size: 100% auto;
    background-repeat: no-repeat;
  }

</style>

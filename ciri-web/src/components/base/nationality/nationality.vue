<template>
    <li @click="countryShow">
      <span>{{text}}</span>
      <i></i>
    </li>


</template>

<script>
    export default {
        components: {},
        data() {
            return {}
        },
        props: {
          text: {
            type: String,
            default: '国别'
          }
        },
        watch: {},
        methods: {
          countryShow (e) {
            let element = e.currentTarget;
            if (element.classList.contains('active')) {
              element.classList.remove('active');
            } else {
              element.classList.add('active')
            }
            this.$emit('countryShow')
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
    li{
      flex: 1;
      width:16%;
      margin-right: 9%;
      height:25px;
      line-height: 25px;
      margin-top: 5px;
      border-radius: 25px;
      box-shadow: 2px 2px 2px #ccc;
      &:last-child{
        margin-right: 0;
      }
      span{
        font-size: 13px;
        color:#333;

      }
      i{
        display: inline-block;
        width:6px;
        height:6px;
        background-size: 6px auto;
        background-position: center;
        background-repeat: no-repeat;
        vertical-align: middle;
        margin-top: -3px;
        @include bg-image('../../project/img/country-packup');

      }
      &.active{
        i{
          @include bg-image('../../project/img/country-more');
        }
      }
    }

</style>

<template>
<div class="progress-detail">
  <div class="header-bar gradient">
    <i class="icon-back" @click="back"></i>
    <h1>项目进展</h1>
  </div>
  <div class="main">
    <div v-if="this.detailContent">
      <h4>
        <i class="left-line"></i><span class="pro-title">{{this.detailContent.title.valueCn}}</span>
        <span class="time">{{this.detailContent.time}}</span>
      </h4>
      <div class="img" v-for="(ite,dex) in detailContent.picture" :key="dex" v-if="detailContent.picture != null && detailContent.picture.length !=0">
        <img v-lazy="ite.name" alt=""/>
      </div>
      <div class="article">
        <p>{{this.detailContent.content.valueCn}}</p>
      </div>
      <div class="small-btn" @click="back">返回</div>
    </div>
  </div>
</div>
</template>

<script>
    export default {
        components: {},
        data() {
            return {
              detailContent:null,
              title:null,
              tag:false
            };
        },
        props: {},
        watch: {},
        methods: {
          back() {
            window.history.back()
          },
          search () {
            this.$router.push({ path: "/search" });
          }
        },
        filters: {},
        computed: {},
        created() {
          let param = {
            projId:this.$route.query.projId,
            editTime:this.$route.query.editTime
          };
          this.$api
            .post("/ah/s3/getProjectProgressDetail",param)
            .then(res => {
              if (res.code === 200) {
                this.detailContent = res.projectProgressDetail;

              }


            });

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
  .progress-detail{
    .header-bar {
      height: 44px;
      line-height: 44px;
      color: #fff;
      font-size: 14px;
      text-align: center;
      position: relative;
      h1 {
        color: #fff;
        font-size: 20px;
        font-weight: normal;
      }
      .icon-back {
        display: block;
        float: left;
        width: 22px;
        height: 22px;
        margin: 11px auto;
        @include bg-image("../../../base/img/back");
        background-size: 22px auto;
      }
      .icon_search{
        display: block;
        height:22px;
        width:22px;
        @include bg-image('../../../base/img/search');
        background-size: 22px auto;
        position: absolute;
        right:10px;
        top:11px;

      }
    }
    h4{
      text-align: left;
      overflow: hidden;
      line-height: 1;
      height: 16px;
      padding: 15px 10px 15px 10px;
      color: #333;
      font-size: 13px;
      font-weight: normal;
      position: relative;
      @include onepx('bottom');
      .left-line{
        position: absolute;
        display: block;
        width: 4px;
        height: 15px;
        background-color: #528de8;
        left: 0;
        top:15px;
      }
      .pro-title{
        font-size: 16px;
        width: 265px;
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
        display: inline-block;
      }
      .time{
        position: absolute;
        right:0;
        top:17px;
        line-height: 1;
        font-size: 13px;
        color:#666;
      }
    }
    .main{
      padding: 10px;
      .img{
        height:231px;
        width:100%;
        margin-top: 10px;
        img{
          width: 100%;
          height:100%;
        }
      }
      .article{
        text-align: left;
        margin-top: 10px;
        p{
          margin-bottom:17px ;
          font-size: 15px;
          color:#333;
          line-height: 20px;
          text-indent: 2em;
        }
      }
      .small-btn{
        display: table;
        margin:0 auto 30px;
        width:335px;
        font-size: 16px;
        height: 38px;
        line-height: 38px;

      }
    }
  }


</style>

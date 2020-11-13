<template>
  <div class="project-file">
    <div class="authority" v-if="!memberLevel">
      <!--权限弹框-->
      <authrityPageSmall :authorityShow="authorityShow" @authorityHide="authorityHide"
                         @upgrade="upgrade"></authrityPageSmall>
    </div>
    <div class="file-warp">
      <div class="file" v-for="(item,index) in projectFileList" :key="index"
           v-if="projectFileList != null && projectFileList.length !=0">
        <div class="title">
          <i class="icon-type" :class="'icon-'+item.originName.replace(/.+\./,'')"></i>
          <a :href="item.url" :download="item.originName">
            <span class="file-title">{{item.originName}}</span>
          </a>
        </div>
        <dl class="intro">
          <dt>文件说明：</dt>
          <dd v-if="item.summary">{{item.summary}}</dd>
          <dd v-else>暂无</dd>
        </dl>
        <div v-if="memberLevel && item.mode!=4" class="applyFile btn"
             :class="{'bg-blue':item.mode==1,'bg-gray':item.mode==2,'agreed':item.mode==3,'bg-sign':item.mode=='-1',}" @click="showFileDetail(item)">
          {{fileMode(item.mode)}}
        </div>
        <div v-if="memberLevel && item.mode==4" class="applyFile btn refuse">
          <div @click="showFileDetail(item)">{{fileMode(item.mode)}}</div>
          <div class="icon-refuse">已拒绝</div>
        </div>
        <div v-if="!memberLevel" class="upAfter">升级后可查看</div>

      </div>
      <div v-if="projectFileList == null || projectFileList.length ==0">
        <img src="../../img/timer-none.png" alt="">
      </div>
    </div>
    <CrossLine></CrossLine>
  </div>
</template>
<script>
  import CrossLine from '@/components/base/cross-line/cross-line'
  import Authority from '@/components/base/authority/authority'
  import authrityPageSmall from '@/components/base/authrityPageSmall/authrityPageSmall'
  import tool from "../../../../api/tool";

  export default {
    components: {
      CrossLine,
      tool,
      Authority,
      authrityPageSmall
    },
    data() {
      return {
        projectFileList: [],
        authorityShow: true,
        memberLevel: false,
        projectId: null
      }
    },
    props: {},
    watch: {},
    methods: {
      showFileDetail(item) {
        if (item.mode != 1 && item.mode != 4) {
          return false;
        }
        tool.MessageBox('是否申请查看？').then(action => {
          item.mode =2;
          this.$api.get('/s3/p/file', {
            projId: this.projectId,
            fileId: item.fileId,
          }).then(res => {
            console.log(res);

          })
        })
      },
      upgrade() {
        this.$router.push({path: "/mine/member-center"});
      },
      authorityHide() {
        this.authorityShow = false;
      },
      fileMode(i) {
        if (i == 1) {
          return '申请查看';
        } else if (i == 2) {
          return '已申请';
        } else if (i == 3) {
          return '已同意';
        } else if (i == 4) {
          return '重新申请';
        } else if(i == '-1'){
          return '请签署保密协议';

        }
      }
    },
    filters: {},
    computed: {},
    created() {
      // this.projectId = '496000001';
      this.projectId = window.location.href.split('?')[1].split('=')[1]
      let param = {
        projectId: window.location.href.split('?')[1].split('=')[1]
        // projectId: this.projectId
      };
      let level = localStorage.getItem("userLevel");
      if (level === '1') {
        this.memberLevel = false;
      } else {
        this.memberLevel = true;
      }
      this.$api.get("/ah/s0/p/projfiles", param).then(res => {
        if (res.code === 200) {
          this.projectFileList = res.fileViews;
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

  .project-file {
    text-align: left;

    .authority {
      padding: 0 10px 0;
      margin: 15px 0px 5px 0px;
    }

    .file-warp {
      padding: 0 10px 0;

      .file {
        border-bottom: 1px dashed #dedede;
        position: relative;
        padding: 13px 0;

        &:last-child {
          border-bottom: none;
        }
        .icon-refuse{
          display: inline-block;
          width: 75px;
          color: #666;
          font-size: 12px;
          @include bg-image("../../img/icon-refuse");
          background-size: 12px;
          background-repeat: no-repeat;
          text-align: center;
          background-position: left center;
        }

        .title {
          padding-left: 17px;
          position: relative;
          margin-bottom: 12px;
          line-height: 14px;

          .icon-type {
            position: absolute;
            top: 0;
            left: 0;
            display: inline-block;
            width: 11px;
            height: 13px;
            background-size: 11px 13px;
            vertical-align: middle;
            @include bg-image("../../img/pdf");

            &.icon-pdf {
              @include bg-image("../../img/pdf");
            }

            &.icon-jpg {
              @include bg-image("../../img/jpg");
            }

            &.icon-ppt {
              @include bg-image("../../img/ppt");
            }

            &.icon-xls {
              @include bg-image("../../img/xls");
            }

          }
          .file-title {
            font-size: 14px;
            height: 15px;
            color: #333;
            line-height: 1;
            display: inline-block;
            width: 205px;
            text-overflow: ellipsis;
            white-space: nowrap;
            overflow: hidden;
          }

        }
        .intro {
          position: relative;
          padding-left: 70px;
          font-size: 13px;
          line-height: 1;
          color: #666;

          dt {
            position: absolute;
            top: 0;
            left: 0;
          }

          dd {
            width: 180px;
            overflow: hidden;
            height: 13px;
          }

        }
        .upAfter {
          width: 85px;
          height: 22px;
          line-height: 22px;
          position: absolute;
          right: 0px;
          top: 50%;
          margin-top: -11px;
          font-size: 13px;
        }

        .btn {
          width: 75px;
          height: 22px;
          line-height: 22px;
          position: absolute;
          right: 0px;
          top: 50%;
          margin-top: -11px;
          font-size: 13px;

        }
        /*申请查看*/
        .bg-blue {
          background: #528de8;
        }
        /*已申请*/
        .bg-gray {
          background: #bbb;
        }
        /*已同意*/
        .agreed {
          background: #fff;
          font-size: 13px;
          color: #666;
          text-align: left;
          display: inline-block;
          @include bg-image("../../img/progress-finished");
          background-size: 13px auto;
          background-repeat: no-repeat;
          text-align: center;
          background-position: left center;

        }
        /*从新申请*/
        .refuse{
          background: #fff;
          font-size: 13px;
          color: #528de8;
          border: 1px solid #528de8;
        }
        /*签署保密协议*/
        .bg-sign{
          width: 110px;
          color: #ff0000;
          background-color: #f5f5f5;
        }

      }
    }
  }

</style>

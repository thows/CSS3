import index from "../../../../router";
<template>
  <div>
    <div class="project-developer" v-if="memberLevel">
      <!--项目开发商-->
      <h4>
        <i class="left-line"></i><span>项目开发商</span>
      </h4>
      <div v-if="this.projectOwnerContact!=null" class="company-msg">
        <table width="100%" cellspacing="0" cellpadding="0">
          <tbody>
          <tr>
            <td style="position: relative;"><div class="pro-intro">公司名称：</div></td>
            <td>{{validateZH(projectOwnerContact.corpName)}}</td>
          </tr>
          <tr>
            <td>公司类型：</td>
            <td>{{projectOwnerContact.corpTypeNote}}</td>
          </tr>
          <tr>
            <td>公司地址：</td>
            <td>{{validateZH(projectOwnerContact.corpAddress)}}</td>
          </tr>
          <tr>
            <td>公司电话：</td>
            <td>{{projectOwnerContact.corpTel}}</td>
          </tr>
          <tr>
            <td>公司传真：</td>
            <td>{{projectOwnerContact.corpTax}}</td>
          </tr>
          <tr>
            <td>公司网址：</td>
            <td>{{projectOwnerContact.website}}</td>
          </tr>
          <tr>
            <td style="position: relative;"><div class="pro-intro">公司简介：</div></td>
            <td>{{validateZH(projectOwnerContact.corpSummary)}}</td>
          </tr>
          <tr>
            <td style="position: relative;"><div class="pro-intro">项目案例：</div></td>
            <td>{{validateZH(projectOwnerContact.msgForInvestor)}}</td>
          </tr>
          </tbody>
        </table>
      </div>
      <div v-if="this.projectOwnerContact!=null&&this.projectOwnerContact.contact.length!=0" class="contact-info">
        <div class="contact-title">【联系人信息】</div>
        <div v-for="(cont,index) in projectOwnerContact.contact" :key="index">
          <table class="merge-table" width="100%"
                 border="1" cellspacing="0" cellpadding="0">
            <tbody>
            <tr>
              <td>姓名</td>
              <td>{{validateZH(cont.name)}}</td>
            </tr>
            <tr>
              <td>职位</td>
              <td>{{validateZH(cont.jobInfo)}}</td>
            </tr>
            <tr>
              <td>电话</td>
              <td>{{cont.tel}}</td>
            </tr>
            <tr>
              <td>邮箱</td>
              <td>{{cont.email}}</td>
            </tr>
            </tbody>
          </table>
          <div class="recommend"><a shape="rect" class="btn">在线沟通</a></div>
        </div>
        <div v-if="this.projectOwnerContact.campaignFile!=null" class="contact-title company-info">【企业资料】</div>
        <div v-if="this.projectOwnerContact.campaignFile!=null" class="file-warp">
          <div class="file" v-for="file in this.projectOwnerContact.campaignFile" :key="file.name">
            <div class="title">
              <i class="icon-type icon-ppt"></i>
              <span class="file-title">{{file.originalName}}</span>
            </div>
            <dl class="intro">
              <dt>文件说明：</dt>
              <dd>{{validateZH(file.summary)}}</dd>
            </dl>
            <!--<div class="applyFile btn bg-blue">申请查看</div>-->
            <div class="agreed btn"><i class="icon-agreed"></i>已同意</div>
          </div>
        </div>
      </div>
      <CrossLine></CrossLine>
      <!--项目代理商-->
      <h4>
        <i class="left-line"></i><span>项目代理</span>
      </h4>
      <div v-if="this.projectAgentContact!=null" class="company-msg">
        <table width="100%" cellspacing="0" cellpadding="0">
          <tbody>
          <tr>
            <td style="position: relative;"><div class="pro-intro">公司名称：</div></td>
            <td>{{validateZH(projectAgentContact.corpName)}}</td>
          </tr>
          <tr>
            <td>公司类型：</td>
            <td>{{projectAgentContact.corpTypeNote}}</td>
          </tr>
          <tr>
            <td>公司地址：</td>
            <td>{{validateZH(projectAgentContact.corpAddress)}}</td>
          </tr>
          <tr>
            <td>公司电话：</td>
            <td>{{projectAgentContact.corpTel}}</td>
          </tr>
          <tr>
            <td>公司传真：</td>
            <td>{{projectAgentContact.corpTax}}</td>
          </tr>
          <tr>
            <td>公司网址：</td>
            <td>{{projectAgentContact.website}}</td>
          </tr>
          <tr>
            <td style="position: relative;"><div class="pro-intro">公司简介：</div></td>
            <td>{{validateZH(projectAgentContact.corpSummary)}}</td>
          </tr>
          <tr>
            <td style="position: relative;"><div class="pro-intro">项目案例：</div></td>
            <td>{{validateZH(projectAgentContact.msgForInvestor)}}</td>
          </tr>
          </tbody>
        </table>
      </div>
      <div v-if="this.projectAgentContact!=null"
           class="contact-info">
        <div class="contact-title" v-if="this.projectAgentContact.contact!=null&&this.projectAgentContact.contact.length!=0">【联系人信息】</div>

        <table v-if="this.projectAgentContact.contact!=null&&this.projectAgentContact.contact.length!=0" class="merge-table" width="100%" border="1" cellspacing="0" cellpadding="0">
          <tbody>
          <tr>
            <td>姓名</td>
            <td>{{projectAgentContact.contact[0].name.valueCn}}</td>
          </tr>
          <tr>
            <td>职位</td>
            <td>{{projectAgentContact.contact[0].jobInfo.valueCn}}</td>
          </tr>
          <tr>
            <td>电话</td>
            <td>{{projectAgentContact.contact[0].tel}}</td>
          </tr>
          <tr>
            <td>邮箱</td>
            <td>{{projectAgentContact.contact[0].email}}</td>
          </tr>
          </tbody>
        </table>
        <div v-if="this.projectAgentContact.contact!=null&&this.projectAgentContact.contact.length!=0" class="recommend"><a shape="rect" class="btn">在线沟通</a></div>

        <div class="contact-title company-info">【企业资料】</div>
        <div v-if="this.projectAgentContact.campaignFile!=null" class="file-warp">
          <div class="file" v-for="file in this.projectAgentContact.campaignFile" :key="file.name">
            <div class="title">
              <i class="icon-type icon-ppt"></i>
              <span class="file-title">{{file.originalName}}</span>
            </div>
            <dl class="intro">
              <dt>文件说明：</dt>
              <dd>{{file.summary.valueCn}}</dd>
            </dl>
            <!--<div class="applyFile btn bg-blue">申请查看</div>-->
            <div class="agreed btn"><i class="icon-agreed"></i>已同意</div>
          </div>
        </div>
      </div>
      <CrossLine></CrossLine>

    </div>
    <div v-if="!memberLevel">
      <!--权限弹框-->
      <AuthorityPage :authorityShow="authorityShow" @authorityHide="authorityHide"
                     @upgrade="upgrade"></AuthorityPage>
    </div>
  </div>
</template>

<script>
  import CrossLine from '@/components/base/cross-line/cross-line'
  import AuthorityPage from '@/components/base/authrityPage/authrityPage.vue'
  import tool from '@/api/tool'

  export default {
    components: {
      CrossLine,
      AuthorityPage,
      tool
    },
    data() {
      return {
        projId: null,
        projectOwnerContact: null,
        projectAgentContact: null,
        authorityShow: true,
        memberLevel: false
      }
    },
    props: {},
    watch: {},
    methods: {
      validateZH(str) {
        return !tool.isBank(str) ? str.valueCn : '';
      },
      upgrade() {
        this.$router.push({path: "/mine/member-center"});
      },
      //权限弹框
      authorityHide() {
        this.authorityShow = false;
      },
    },
    filters: {},
    computed: {},
    created() {
      let level = localStorage.getItem("userLevel");
      if (level < 2) {
        this.memberLevel = false;
        this.authorityShow = true;
      } else {
        this.memberLevel = true;
        this.authorityShow = false;
      }
      this.projId = parseInt(this.$route.query.projId)
    },
    mounted() {
      this.$api.get('/ah/s3/p/projowner',
        {projectId: this.projId}).then(res => {
        if (res.code == 200) {
          this.projectOwnerContact = res.projectOwnerContact;
          this.projectAgentContact = res.projectAgentContact;
          console.log(this.projectAgentContact);
        }
      })
    },
    destroyed() {

    }
  }
</script>

<style type="text/scss" lang="scss" scoped>
  @import '~@/assets/scss/reset.scss';
  @import '~@/assets/scss/mixin.scss';

  .project-developer {
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
    .company-msg {
      padding: 15px;
      margin-bottom: 7px;
      .pro-intro{
        position: absolute;
        top: 0px;
      }
      table {
        border-collapse: collapse;
        tr {
          height: 28px;
          line-height: 28px;
          font-size: 13px;
          color: #666;
          td:first-child {
            text-align: left;
            width: 90px;
          }
          td:last-child {
            text-align: left;
            color: #333;
          }
        }
      }
    }
    .contact-info {
      padding: 0 10px 17px;

      .contact-title {
        font-size: 14px;
        color: #333;
      }
      .company-info{
        padding-top: 17px;
      }
      .file-warp {
        padding-top: 10px;
        padding-bottom: 17px;

        .file {
          border-bottom: 1px dashed #dedede;
          position: relative;
          padding: 13px 0;

          &:first-child {
            border-top: 1px dashed #dedede;
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
              color: #333;
              line-height: 1;
              display: inline-block;
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

          .bg-blue {
            background: #528de8;
          }

          .bg-gray {
            background: #bbb;
          }

          .agreed {
            background: #fff;
            font-size: 13px;
            color: #666;
            text-align: left;

            .icon-agreed {
              display: inline-block;
              width: 13px;
              height: 13px;
              @include bg-image("../../img/progress-finished");
              background-size: 13px auto;
              margin-right: 5px;
            }

          }
        }
      }
    }
    .merge-table {
      border: 1px solid #dedede;
      margin: 10px 0 0;
      font-size: 13px;
      color: #666;
      text-align: left;

      td {
        text-align: center;
        height: 28px;
        line-height: 28px;
        &:first-child {
          width: 50px;
        }
        &:nth-child(n+2) {
          text-align: left;
          padding-left: 20px;
        }

      }

    }
    .recommend {
      margin: 0 auto 0;
      display: table;
      padding: 12px 0;
      width: 100%;
      border: 1px solid #dedede;
      border-top: none;
      box-sizing: border-box;


      a {
        padding: 2px 11px;
        color: #fff;
        font-size: 13px;
        line-height: 22px;
        background: #bbb;
        width: 74px;
        height:21px;
        margin: auto;
        display: table;
      }

    }

  }

</style>

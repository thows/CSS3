<template>
  <div>
    <div class="intent">
      <div class="remind">
        提交投资意向后，项目发起人将与您直接沟通项目详情，并邀请您参加项目投资策划会！
      </div>
      <div class="process">
        <p class="process-title">
          <i class="left-line"></i><span>合投前流程</span>
        </p>
        <div class="point-warp">
          <div class="border-line"></div>
          <div class="point-group">
            <i class="icon-type" :class="isUserAuthed==true ? 'icon-selected' : 'icon-not-select'"></i>
            <i class="icon-type" :class="isCorpAuthed==true ? 'icon-selected' : 'icon-not-select'"></i>
            <i class="icon-type" :class="isRiskAgreementSigned==true ? 'icon-selected' : 'icon-not-select'"></i>
          </div>
          <div class="point-name">
            <div :class="isUserAuthed==true ? 'color-selected' : 'color-not-select'">实名认证</div>
            <div :class="isUserAuthed==true ? 'color-selected' : 'color-not-select'">企业认证</div>
            <div :class="isUserAuthed==true ? 'color-selected' : 'color-not-select'">签署协议</div>
          </div>
          <div class="process-remind" v-if="!isUserInCoInvest">
            <p>发布投资意向前需先完成实名认证、企业认证并签署服务协议</p>
            <p>以上操作请登录源合网(industryc2c.com)在线完成</p>
            <p>任何疑问请咨询客服经理 13601315595 (Mr Zhang)</p>
          </div>
          <div class="process-remind" v-else="isUserInCoInvest">
            <template v-if="ProjectInvestOrderStatus==1">
              <p>您已成功发送合投意向!</p>
              <p>请等待项目业主确认您的合投意向</p>
            </template>
            <template v-if="ProjectInvestOrderStatus==2">
              <p>恭喜！项目业主已接受您的投资意向！</p>
              <p>您将受邀参加项目线下路演</p>
            </template>
            <template v-if="ProjectInvestOrderStatus==3">
              <p>项目业主未接受您的合投意向</p>
              <p>如果想重新申请合投，请联系项目业主</p>
            </template>
          </div>
          <div class="participate " :class="closeShot?'participate-selected':'participate-no-select'" @click="showParticipate" v-text="cast" v-if="authority">
            <!--<router-link to="/project/project-detail/investment-intent/participate-investment">参与合投</router-link>-->
            <!--参与合投-->
          </div>
          <div v-if="!authority">
            <!--权限弹框-->
            <AuthrityPage :authorityShow="authorityShow" @authorityHide="authorityHide" @upgrade="upgrade"></AuthrityPage>
          </div>
        </div>
      </div>
      <CrossLine></CrossLine>
      <div class="progress">
        <h4>
          <i class="left-line"></i><span>投资进展</span>
        </h4>
        <div class="schedule">
          <div class="count">
            <div>意向投资方&nbsp;&nbsp;<span>{{projectProgress.InvestorCount == null ? 0:projectProgress.InvestorCount}}</span>&nbsp;&nbsp;位</div>
            <div>意向投资额&nbsp;&nbsp;<span>{{parseInt(projectProgress.alreadyMoney == null ? 0:projectProgress.alreadyMoney)}}</span>&nbsp;&nbsp;{{projectProgress.currencyName}}</div>
          </div>
          <div class="line">
            <div class="bg"></div>
            <div class="now" :style="{'width':(projectProgress.financingProgress>100 ? 100 : projectProgress.financingProgress) + '%'}"></div>
          </div>
          <div class="time">
            <div>合投结束时间：<span>{{projectProgress.endTime}}</span></div>
            <div>当前进度&nbsp;&nbsp;<span class="cur-progress">{{parseInt(projectProgress.financingProgress== null ? 0:projectProgress.financingProgress)}}%</span></div>
          </div>
        </div>
        <div class="lead">
          <div class="intent-direc">领投方<b>&nbsp;{{projectProgress.leadInvestorCount == null ? 0:projectProgress.leadInvestorCount}}&nbsp;</b>位</div>
          <div class="invest-wrap clearfix" v-if="projectProgress.leadInvestors != null && projectProgress.leadInvestors.length > 0"
               v-for="(companyProgress,index) in projectProgress.leadInvestors" :key="index">
            <div class="picture fl">
              <img class="resizeImg" src="../../img/company@3x.png">
            </div>
            <div class="content fl">
              <!-- <div class="company-name">{{companyProgress.companyName}}</div>-->
              <div class="company-name">{{companyProgress.companyName.length>4?companyProgress.companyName.substr(0, 2) + '****' + companyProgress.companyName.substr(-2):companyProgress.companyName}}</div>
              <div class="count">意向投资额：<span>{{parseInt(companyProgress.companyMoney)}}</span>{{projectProgress.currencyName}}</div>
            </div>
            <div class="detail fr">
              <div to="" class="detail-warp" v-model="companyProgress.companyId"  @click="showInvestDetail(companyProgress.companyId,companyProgress.status)">
                <span class="to-detail">详情</span>
                <i class="more"></i>
              </div>
            </div>
          </div>
        </div>
        <div class="follow">
          <div class="intent-direc">跟投方<b>&nbsp;{{projectProgress.followInvestorCount== null ? 0:projectProgress.followInvestorCount }}&nbsp;</b>位</div>
          <div class="invest-wrap clearfix" v-if="projectProgress.followInvestors != null && projectProgress.followInvestors.length > 0"
               v-for="(companyProgress,index) in projectProgress.followInvestors" :key="index">
            <div class="picture fl">
              <img class="resizeImg" src="../../img/company@3x.png">
            </div>
            <div class="content fl">
              <!--<div class="company-name">{{companyProgress.companyName}}</div>-->
              <div class="company-name">{{companyProgress.companyName.length>4?companyProgress.companyName.substr(0, 2) + '****' + companyProgress.companyName.substr(-2):companyProgress.companyName}}</div>
              <div class="count">意向投资额：<span>{{parseInt(companyProgress.companyMoney)}}</span>{{projectProgress.currencyName}}</div>
            </div>
            <div class="detail fr">
              <div to="" class="detail-warp" v-model="companyProgress.companyId" @click="showInvestDetail(companyProgress.companyId,companyProgress.status)">
                <span class="to-detail" >详情</span>
                <i class="more"></i>
              </div>
            </div>
          </div>
        </div>

        <CrossLine></CrossLine>

        <div v-if="!authorityWin">
          <!--权限弹框-->
          <Authority :authorityShow="authorityShowWin" @authorityHide="authorityHideWin" @upgrade="upgradeWin"></Authority>
        </div>
      </div>

    </div>
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
  </div>
</template>

<script>
  import CrossLine from '@/components/base/cross-line/cross-line'
  import tool from '@/api/tool'
  import Authority from '@/components/base/authority/authority'
  import AuthrityPage from '@/components/base/authrityPage/authrityPage'
    export default {
        components: {
          CrossLine,
          tool,
          Authority,
          AuthrityPage
        },
        data() {
            return {
              projId:"", //项目id
              projectProgress:"", //项目投资进度
              userRole:false, //   1.检查用户有效性, 用户角色, 以及是否是投资方. 非投资方不能发送意向投资申请
              isUserAuthed:false, //2.判断用户是否是实名认证用户
              isCorpAuthed:false, //3.用户是否通过了企业认证
              isRiskAgreementSigned:false, //4.风险提示协议是否签署
              isCoinvesting:false, //5.项目是否处于合同的状态
              isUserInCoInvest:false,  //6.判断用户是否参与过合投
              ProjectInvestOrderStatus:1,//7.用户合投的状态 默认等待状态 1 等待 2.成功3.失败
              cast:"参与合投",
              closeShot:false,  //合投按钮是否点亮
              authorityShow:false,
              authorityShowWin:false,
              authorityWin:true,//投资意向详情权限
              authority:true//合投进展权限
            }
        },
        props: {},
        watch: {},
        methods: {
          showParticipate(){
            if(!this.closeShot){
              return;
            }
            this.$router.push({path:'/project/project-detail/investment-intent/participate-investment',query:{projId:this.projId}});
          },
          showInvestDetail(companyId,status){
            let level = localStorage.getItem("userLevel");
            if(level=='5' || level=='2'|| level=='6'|| level=='7'){
              //合投信息处于同意情况才可以被查看
              if(status == 2){
                this.authorityWin = true;
                this.authorityShowWin = false;
                this.$router.push({path:'/project/project-detail/investment-detail',query: {projId:this.projId,companyId:companyId}});
              }else {
                tool.toast("合投信息暂时不能查看")
              }
            }else{
              this.authorityWin = false;
              this.authorityShowWin = true;
            }
          },
          upgrade () {
            this.$router.push({ path: "/mine/member-center" });
          },
          //权限弹框
          authorityHide () {
            this.authorityShow = false;
          },
          upgradeWin () {
            this.$router.push({ path: "/mine/member-center" });
          },
          //权限弹框
          authorityHideWin () {
            this.authorityShowWin = false;
          },
        },
        filters: {},
        computed: {},
        created() {
          // http://127.0.0.1:8080/gateway/ah/s0/projectProgress
          this.projId = this.$route.query.projId;
          //项目投资进展
          this.$api.post('/ah/s0/projectProgress',{projId:this.projId}).then(r => {
            // console.log(r)
            if(r.code==200){
              if(r.data.state==true){
                this.projectProgress = r.data;
              }else {
                tool.toast("项目暂时没有开启合投")
              }
            }else {
              tool.toast(r.msg)
            }
          });

          let level = localStorage.getItem('userLevel');
          if(level=='5' || level=='2'){
            this.authority = true;
            this.authorityShow = false;
            //项目合投前流程
            this.$api.post('/ah/s5/projectInvestment',{projId:this.projId,userId:tool.getuser()}).then(r => {
              // this.$api.post('/ah/s5/projectInvestment',{projId:156000023,userId:18244526524}).then(r => {
              // console.log(r)
              if(r.code==200){
                this.userRole=r.data.userRole;
                this.isUserAuthed=r.data.isUserAuthed;
                this.isCorpAuthed=r.data.isCorpAuthed;
                this.isRiskAgreementSigned=r.data.isRiskAgreementSigned;
                this.isCoinvesting=r.data.isCoinvesting;
                this.isUserInCoInvest=r.data.isUserInCoInvest;
                //判断用户参与的状态
                if(r.data.hasOwnProperty("ProjectInvestOrderStatus") && r.data.ProjectInvestOrderStatus != null && r.data.ProjectInvestOrderStatus != ''){
                  this.ProjectInvestOrderStatus=r.data.ProjectInvestOrderStatus;
                }
                //判断用户角色
                if(this.userRole){
                  if(this.isUserAuthed && this.isCorpAuthed && this.isRiskAgreementSigned && this.isCoinvesting){
                    if(this.ProjectInvestOrderStatus == 1){
                      this.closeShot=true;
                    }
                    // console.log(this.closeShot);
                    if(this.isUserInCoInvest){
                      this.cast="编辑合投意向";
                    }else {
                      this.cast="参与合投";
                    }
                    // console.log(this.cast);
                  }
                }else {
                  this.closeShot=false;
                  tool.toast("非投资方不能发送合投申请");
                }
              }
            });
          }else{
            this.authority = false;
            this.authorityShow = true;
          }

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
  .intent{
    .resizeImg{
      width: 100%;
      height: 100%;
    }
    .left-line{
      position: absolute;
      display: block;
      width: 3px;
      height: 15px;
      background-color: #528de8;
      left: 0;
      top:12px;
    }
    .remind{
      padding: 7px 17px;
      height:30px;
      overflow: hidden;
      line-height: 16px;
      background: #f5f5f5;
      margin: 15px 15px 3px;
      color: #528de8;
      font-size: 10px;
      border-radius: 2px;
    }
    .process{
      .process-title{
        text-align: left;
        overflow: hidden;
        line-height: 1;
        height: 16px;
        padding: 12px 10px 12px 15px;
        color: #333;
        font-size: 16px;
        font-weight: normal;
        position: relative;
      }
      .point-warp{
        position: relative;
        .border-line{
          margin-top: 11px;
          @include onepx();
        }
        .point-group{
          display: flex;
          justify-content: space-around;
          position: relative;
          top: -11px;
          .icon-type{
            display: inline-block;
            width: 18px;
            height: 22px;
            vertical-align: middle;
            background-size: 16px 16px;
            background-repeat: no-repeat;
            background-position: 0px 4px;
          }
          .icon-not-select{
            @include bg-image("../../img/not-select");
          }
          .icon-selected{
            @include bg-image("../../img/selected");
          }

        }
        .point-name{
          display: flex;
          justify-content: space-around;
          font-size: 13px;
          position: relative;
          top: -3px;
        }
        .color-not-select{
          color: #333;
        }
        .color-selected{
          color: #528de8;
        }
        .process-remind{
          padding: 0px 5px;
          overflow: hidden;
          line-height: 19px;
          margin: 15px 15px 3px;
          border-radius: 2px;
          p{
            color: #fa5959;
            font-size: 10px;
          }

        }
        .participate{
          width: 150px;
          height: 30px;
          line-height: 30px;
          font-size: 13px;
          margin: 17px auto;
          border-radius: 30px;
        }
        .participate-no-select{
          background-color: #eee;
          color: #333;
        }
        .participate-selected{
          background-color: #528de8;
          color: #fff;
        }
      }
    }
    .progress{
      h4{
        text-align: left;
        overflow: hidden;
        line-height: 1;
        height: 16px;
        padding: 12px 10px 12px 15px;
        color: #333;
        font-size: 16px;
        font-weight: normal;
        @include onepx('bottom');
      }
      .schedule{
        padding: 17px 15px 15px;
        border-bottom: 1px solid #dedede;
        .count{
          display: flex;
          justify-content: space-between;
          font-size: 14px;
          color: #333333;
          span{
            font-size: 16px;
            color: #528de8;
          }
        }
        .line{
          margin-top: 10px;
          height: 11px;
          display: block;
          margin: 10px auto 0;
          font-size: 1px;
          position: relative;
          .bg{
            background-color: #eaeaea;
            display: block;
            position: absolute;
            left: 0;
            top: 0;
            bottom: 0;
            right: 0;
            border-radius: 11px;
          }
          .now{
            background-color: #3f83e6;
            display: block;
            position: absolute;
            left: 0;
            right: 0;
            top: 0;
            bottom: 0;
            border-radius: 11px;
            width: 0;

          }
        }
        .time{
          margin-top: 10px;
          display: flex;
          justify-content: space-between;
          font-size: 14px;
          color: #666;
          span{
            color: #333;
          }
          .cur-progress{
            color: #528de8;
            font-size: 16px;
          }
        }
      }
      .lead{
        text-align: left;
        margin: 15px 10px 5px 15px;
        font-size: 13px;
        color: #333;
        .intent-direc{
          font-size: 14px;
          b{
            font-size: 15px;
          }
        }
        .invest-wrap:nth-child(n+3){
          border-top: 1px solid #dedede;
        }
      }
      .invest-wrap{
        padding: 12px 0px;
        .picture{
          width: 46px;
          height: 46px;
          img{
            width: 46px;
            height: 46px;
          }
        }
        .content{
          height: 46px;
          margin-left: 12px;
          line-height: 22px;
          .company-name{
            font-size: 14px;
            color: #333;
          }
          .count{
            font-size: 13px;
            color: #666;
          }

        }
        .detail{
          width: 46px;
          height: 46px;
          position: relative;
          .detail-warp {
            position: absolute;
            right: 0;
            top: 0;
            height: 40px;
            line-height: 1;

            .to-detail {
              display: inline-block;
              font-size: 13px;
              color: #528de8;

            }

            .more {
              display: inline-block;
              width: 12px;
              height: 40px;
              background-repeat: no-repeat;
              background-size: 12px;
              background-position: center;
              @include bg-image("../../img/to-detail");
              vertical-align: middle;
            }

          }
        }
      }
      .follow{
        text-align: left;
        margin: 0px 10px 3px 15px;
        font-size: 13px;
        color: #333;
        .intent-direc{
          font-size: 14px;
          b{
            font-size: 15px;
          }
        }
        .invest-wrap:nth-child(n+3){
          border-top: 1px solid #dedede;
        }
      }
    }
  }
</style>

<template>
  <div>
    <div class="feasibility-analysis" v-if="memberLevel">
      <Article text="项目现场勘查" v-if="this.InfraInfo!=null && this.InfraPhoto!=null" :content="this.InfraInfo"></Article>
      <BigImg v-if="this.InfraPhoto!=null" :content="this.InfraPhoto"></BigImg>
      <CrossLine v-if="this.InfraInfo!=null"></CrossLine>
      <Article text="项目技术与工程方案" v-if="this.riskInfo!=null" :content="this.riskInfo"></Article>
      <CrossLine v-if="this.riskInfo!=null"></CrossLine>
      <Article text="项目行业与市场分析" v-if="this.rawMaterialSalesPlan!=null" :content="this.rawMaterialSalesPlan"></Article>
      <CrossLine v-if="this.rawMaterialSalesPlan!=null"></CrossLine>
      <div class="finance-info">
        <h4>
          <i class="left-line"></i><span>项目融资分析</span>
        </h4>
        <div class="company-msg">
          <table width="100%" cellspacing="0" cellpadding="0">
            <tbody>
            <tr>
              <td>目标融资金额：</td>
              <td>{{this.requiredFund}}</td>
            </tr>
            <tr>
              <td>项目自有资金：</td>
              <td>{{this.internalFund}}万美元</td>
            </tr>
            <tr>
              <td>项目总投资额：</td>
              <td>{{this.totalInvestFund}}</td>
            </tr>
            <tr>
              <td>项目年收益率(IRR)：</td>
              <td>{{this.irr}}%</td>
            </tr>
            <tr>
              <td>项目净产值(NPV)：</td>
              <td>{{this.npv}}万美元</td>
            </tr>
            <tr>
              <td>净现值说明：</td>
              <td>{{this.npvSummary}}</td>
            </tr>
            </tbody>
          </table>
        </div>
        <div class="article-warp">
          <div class="pro-article clearfix">
            <p class="title" v-if="this.marketAnalysis!=null">【项目投资概算】</p>
            <div v-if="this.marketAnalysis!=null" class="article">
              {{this.marketAnalysis}}
            </div>
            <p class="title" v-if="this.competitionAdvantage!=null && this.estimatePhoto!=null">【项目财务评估】</p>
            <div v-if="this.competitionAdvantage!=null" class="article">
              {{this.competitionAdvantage}}
            </div>
            <BigImg v-if="this.estimatePhoto!=null" :content="this.estimatePhoto"></BigImg>
          </div>
        </div>
      </div>
      <CrossLine></CrossLine>
      <Article text="项目担保方式" :content="guaranteeType(this.guaranteeId)" :content2="this.guaranteeNote"
               :secondShow="true"></Article>
      <CrossLine></CrossLine>
      <Article text="融资规划" v-if="this.summary!=null&& this.summary.length!= 0" :content="this.summary"></Article>
      <CrossLine v-if="this.summary!=null&& this.summary.length!= 0"></CrossLine>
    </div>
    <div v-if="!memberLevel">
      <!--权限弹框-->
      <AuthorityPage :authorityShow="authorityShow" @authorityHide="authorityHide" @upgrade="upgrade"></AuthorityPage>
    </div>
  </div>
</template>

<script>
  import CrossLine from '@/components/base/cross-line/cross-line'
  import Article from '@/components/base/article/article'
  import BigImg from '@/components/base/big-img/big-img'
  import AuthorityPage from '@/components/base/authrityPage/authrityPage.vue'
  import tool from "../../../../api/tool";

  export default {
    components: {
      CrossLine,
      Article,
      BigImg,
      AuthorityPage
    },
    data() {
      return {
        projId: null,
        projContent: null,
        InfraInfo: null,
        InfraPhoto: null,
        riskInfo: null,
        rawMaterialSalesPlan: null,
        marketAnalysis: null,
        competitionAdvantage: null,
        estimatePhoto: null,
        requiredFund: null,
        internalFund: null,
        totalInvestFund: null,
        irr: null,
        npv: null,
        npvSummary: null,
        guaranteeId: null,
        guaranteeNote: null,
        summary: null,
        authorityShow:true,
        memberLevel:false
      }
    },
    props: {},
    watch: {},
    methods: {
      content(str) {
        if (!tool.isBank(str)) {
          return str
        } else {
          return null
        }
      },
      guaranteeType(i) {
        switch (i) {
          case 1:
            return '商业银行担保'
          case 2:
            return '主权担保'
          case 3:
            return '其他'
          default:
            return '无'

        }
      },
      upgrade () {
        this.$router.push({ path: "/mine/member-center" });
      },
      //权限弹框
      authorityHide () {
        this.authorityShow = false;
      },

    },
    filters: {},
    computed: {},
    created() {
      let level = localStorage.getItem("userLevel");
      if(level <2){
        this.memberLevel = false;
        this.authorityShow = true;
      }else{
        this.memberLevel = true;
        this.authorityShow = false;
      }
      this.projId = parseInt(this.$route.query.projId)
    },
    mounted() {
      this.$api.get('/ah/s3/p/projViabilityAnalysis', {projectId: this.projId}).then(r => {
        this.projContent = r.data;
        this.InfraInfo = this.projContent.InfraInfo.valueCn;
        this.InfraPhoto = this.projContent.InfraPhoto;
        this.riskInfo = this.projContent.riskInfo;
        this.rawMaterialSalesPlan = this.projContent.rawMaterialSalesPlan;
        this.marketAnalysis = this.projContent.marketAnalysis;
        this.competitionAdvantage = this.projContent.competitionAdvantage;
        this.estimatePhoto = this.projContent.estimatePhoto;
        this.requiredFund = this.projContent.fund.requiredFund.amount;
        this.internalFund = this.projContent.fund.internalFund.amount;
        this.totalInvestFund = this.projContent.fund.totalInvestFund.amount;
        this.irr = this.projContent.fund.irr;
        this.npv = this.projContent.fund.npv.amount;
        this.npvSummary = this.projContent.fund.npvSummary.valueCn;
        this.guaranteeId = this.projContent.fund.guaranteeId;
        this.guaranteeNote = this.projContent.fund.guaranteeNote.valueCn;
        this.summary = this.projContent.fund.summary.valueCn;

      });
    },
    destroyed() {
    }
  }
</script>

<style type="text/scss" lang="scss" scoped>
  @import '~@/assets/scss/reset.scss';
  @import '~@/assets/scss/mixin.scss';

  .feasibility-analysis {

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
  .finance-info {
    .company-msg{
      padding: 15px;
      margin-bottom: 7px;
      table{
        border-collapse: collapse;
        tr{
          height:28px;
          line-height: 28px;
          font-size: 13px;
          color: #666;
          td:first-child{
            text-align: left;
            width: 130px;
          }
          td:last-child{
            text-align: left;
            color: #333;
          }
        }
      }
    }
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
        .title{
          font-size: 16px;
          color:#666;
          margin-top: 10px;
        }

        .article {
          margin-top: 10px;
          padding: 0 10px;
          font-size: 13px;
          line-height: 22px;
          color: #666;
          text-indent: 2em;

          &.active {
            /*height:330px;*/
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 15;
            -webkit-box-orient: vertical;
          }

        }
      }
    }

  }
  }

</style>

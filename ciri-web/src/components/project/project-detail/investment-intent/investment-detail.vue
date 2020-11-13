<template>
  <div class="investment-detail">
    <header class="clearfix">投资意向
      <i class="icon-back" @click="back"></i>
    </header>
    <div class="project-name">{{projName}}</div>
    <div class="company">
      <div class="project-title">{{companyName}}<label class="direction">【{{lead}}】</label></div>
      <div class="method">参与合投方式：<span>{{joinWay}}</span></div>
      <div class="money">预测投资金额：<span>{{investAmount}}</span></div>
    </div>
    <CrossLine></CrossLine>
    <div class="intent-letter">
      <div class="clearfix title-div">
        <div class="partipate-title fl">【投资意向函】</div>
        <div class="language-wrap fr">
          <div class="language-div">
            <div class="lag-radio">
              <div class="item" :class="{active:intentActive==1}" @click="intentChinese">
                <i class="icon-radio">
                  <input type="radio" name=""/>
                </i>
                <span>中文</span>
              </div>
              <div class="item" :class="{active:intentActive==2}" @click="intentEnglish">
                <i class="icon-radio">
                  <input type="radio" name=""/>
                </i>
                <span>英文</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="content-div">
        <div class="adv-content chinese clearfix" v-show="seeIntent">
          <intentEdit :moreShow="this.moreShowChInt" :content="this.chineseInt"></intentEdit>
        </div>
        <div class="adv-content english" v-show="!seeIntent">
          <intentEdit :moreShow="this.moreShowEnInt" :content="this.englishInt"></intentEdit>
        </div>
      </div>

      <div class="upload-wrap">
        <div class="file-warp">
          <div class="file" v-for="(file,index) in capitalInjectionPhoto" :key="index">
            <div class="title">
              <i class="icon-type icon-pdf"></i>
              <a>
                <span class="file-title">{{file.fileName}}</span>
              </a>
              <label class="handle"  @click="lookFile(file.url)">查看</label>
            </div>
          </div>
        </div>
      </div>

      <CrossLine></CrossLine>
      <div class="intent-letter">
        <div class="clearfix title-div">
          <div class="partipate-title fl">【企业优势】</div>
          <div class="language-wrap fr">
            <div class="language-div">
              <div class="lag-radio">
                <div class="item" :class="{active:advActive==1}" @click="advchinese">
                  <i class="icon-radio">
                    <input type="radio" name=""/>
                  </i>
                  <span>中文</span>
                </div>
                <div class="item" :class="{active:advActive==2}" @click="advEnglish">
                  <i class="icon-radio">
                    <input type="radio" name=""/>
                  </i>
                  <span>英文</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="content-div">
          <div class="adv-content chinese clearfix" v-show="seeLanguage">
            <intentEdit :moreShow="this.moreShowChAdv" :content="this.chineseAdv"></intentEdit>
          </div>
          <div class="adv-content english" v-show="!seeLanguage">
            <intentEdit :moreShow="this.moreShowEnAdv" :content="this.englishAdv"></intentEdit>
          </div>
        </div>

        <div class="upload-wrap">
          <div class="file-warp">
            <div class="file" v-for="(file,index) in capitalInjectionFile" :key="index">
              <div class="title">
                <i class="icon-type icon-pdf"></i>
                <a>
                  <span class="file-title">{{file.fileName}}</span>
                </a>
                <label class="handle" @click="lookFile(file.url)">查看</label>
              </div>
            </div>
          </div>

        </div>
      </div>

    </div>
  </div>
</template>

<script>
  import CrossLine from '@/components/base/cross-line/cross-line'
  import intentEdit from '@/components/base/intent-edit/intent-edit'
  import tool from '@/api/tool'
  export default {
    components: {
      CrossLine,
      intentEdit
    },
    data() {
      return {
        intentActive: 1,
        advActive: 1,
        seeIntent:true,
        seeLanguage: true,
        moreShowChInt:false,
        moreShowEnInt:false,
        moreShowChAdv:false,
        moreShowEnAdv:false,
        chineseInt: '',
        chineseAdv: '',
        englishInt: '',
        englishAdv: '',
        projId:'',
        companyId:'',
        projName:'',
        companyName:'',
        joinWay:'',
        investAmount:'',//资金+单位
        capitalInjectionPhoto:[],//投资意向附件文件
        capitalInjectionFile:[],//企业优势附件文件
        lead:''
      };
    },
    props: {},
    watch: {},
    methods: {
      back() {
        window.history.back();
      },
      intentChinese() {
        this.intentActive = 1;
        this.seeIntent = true;
      },
      intentEnglish() {
        this.intentActive = 2;
        this.seeIntent = false;
      },
      advchinese() {
        this.advActive = 1;
        this.seeLanguage = true;
      },
      advEnglish() {
        this.advActive = 2;
        this.seeLanguage = false;
      },
      lookFile(fileUrl){
        // alert(fileUrl);
        window.location.href = fileUrl;
      }
    },
    filters: {},
    computed: {},
    created() {
      this.projId = this.$route.query.projId;
      this.companyId = this.$route.query.companyId;
      this.$api.post('/ah/s5/getCompanyProjectConInvest', {projId: this.projId, companyId: this.companyId}).then(r => {
        if (r.code == 200) {
          this.projName=r.data.projName.valueCn;
          this.companyName = r.data.companyName;
          let order=r.data.order;
          this.lead=order.isLead ? '领投方':'跟投方';
          //参与合投的方式
          this.joinWay=r.data.joinWay.join(",");
          //参与合投的资金
          let amount = order.investAmount.amount;
          if(amount > 10000){
            this.investAmount=parseInt(amount/10000)+"万"+r.data.currencyName;
          }else {
            this.investAmount=parseInt(amount)+r.data.currencyName;
          }
          //项目投资意向函信息中英文
          if (order.capitalInjectionFormNote.setValueCn) {
            this.chineseInt = order.capitalInjectionFormNote.valueCn;
          }
          if (order.capitalInjectionFormNote.setValueEn) {
            this.englishInt = order.capitalInjectionFormNote.valueEn;
          }
          if (!order.capitalInjectionFormNote.setValueCn && order.capitalInjectionFormNote.setValueEn) {
            this.intentActive = 2;
            this.seeIntent = false;
          }
          //项目企业优势信息中英文
          if (order.advantageNote.setValueCn) {
            this.chineseAdv = order.advantageNote.valueCn;
          }
          if (order.advantageNote.setValueEn) {
            this.englishAdv = order.advantageNote.valueEn;
          }
          if (!order.advantageNote.setValueCn && order.advantageNote.setValueEn) {
            this.advActive = 2;
            this.seeLanguage = false;
          }

          // capitalInjectionPhoto:'',//投资意向附件文件
          //   capitalInjectionFile:'',//企业优势附件文件
          //投资意向函附件
          if (order.capitalInjectionPhoto != null && order.capitalInjectionPhoto.length > 0) {
            for (var photo of order.capitalInjectionPhoto) {
              let a = {
                fileId: photo.name,
                fileName: photo.originalName,
                fileSize: photo.size,
                url: tool.oos() + photo.name,
                val: photo.summary.setValueCn ? photo.summary.valueCn : ''
              }
              this.capitalInjectionPhoto.push(a);
            }
          }
          //企业优势附件
          if (order.capitalInjectionFile != null && order.capitalInjectionFile.length > 0) {
            for (var file of order.capitalInjectionFile) {
              let a = {
                fileId: file.name,
                fileName: file.originalName,
                fileSize: file.size,
                url: tool.oos() + file.name,
                val: file.summary.setValueCn ? file.summary.valueCn : ''
              }
              this.capitalInjectionFile.push(a);
            }
          }
          console.log(r.data);
        }else if(r.code == 403){
          tool.toast("权限不足")
        }else {
          tool.toast(r.msg)
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
  .investment-detail{
    text-align: left;
    header {
      height: 44px;
      line-height: 44px;
      font-size: 20px;
      color: #333;
      text-align: center;
      position: relative;
      border-bottom: 1px solid #dedede;
      .icon-back {
        display: block;
        float: left;
        width: 22px;
        height: 22px;
        margin: 11px auto;
        @include bg-image("../../img/icon-back");
        background-size: 22px auto;
      }
    }
    .project-name{
      height: 44px;
      line-height: 44px;
      font-size: 14px;
      color: #333;
      border-bottom: 1px dashed #dedede;
      padding-left: 10px;
    }
    .title-div{
      border-bottom: 1px solid #dedede;
      .partipate-title{
        font-size: 15px;
        color: #333;
        margin-left: -5px;
        height: 45px;
        line-height: 45px;
        .title-edit{
          color: #528de8;
          font-size: 13px;
        }
      }

    }
    .upload-wrap{
      margin-top: 15px;
      .file-warp {
        .file {
          border-bottom: 1px solid #dedede;
          position: relative;
          padding: 13px 0;
          background-color: #f5f5f5;
          padding-left: 10px;
          font-size: 11px;
          &:last-child {
            border-bottom: none;
          }

          .title {
            padding-left: 17px;
            position: relative;
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
            .handle{
              position: absolute;
              right: 10px;
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

    .item {
      height: 40px;
      line-height: 40px;
      margin-right: 20px;
      i {
        position: relative;
        display: inline-block;
        width: 12px;
        height: 40px;
        background-repeat: no-repeat;
        background-size: 12px auto;
        background-position: center;
        vertical-align: middle;
        input[type="radio"],input[type="checkbox"] {
          position: absolute;
          top: 14px;
          left: 0;
          opacity: 0;
        }

      }
      .icon-check {
        @include bg-image("../../img/check");
        margin-right: 10px;

      }
      .icon-radio {
        @include bg-image("../../img/radio");
        margin-right: 10px;

      }

      span {
        height: 45px;
        line-height: 45px;
        display: inline-block;
        font-size: 15px;
      }

    }
    .active {
      .icon-check {
        @include bg-image("../../img/checked");
        margin-right: 10px;
      }
      .icon-radio {
        @include bg-image("../../img/radioed");
        margin-right: 10px;
      }

    }
    .company{
      padding: 15px 0px 12px 10px;
      span{
        color: #333;
      }
      .project-title{
        height: 28px;
        line-height: 28px;
        font-size: 13px;
        color: #333;
        position: relative;
        .direction{
          position: absolute;
          right: 10px;
          color: #528de8;
        }
      }
      .method{
        height: 25px;
        line-height: 25px;
        font-size: 12px;
        color: #666;

      }
      .money{
        height: 28px;
        line-height: 28px;
        font-size: 12px;
        color: #666;

      }


    }
    .intent-letter{
      color: #333;
      margin: 0px 10px 17px;
      .content-div{
        margin-top: 15px;
      }
      .language-wrap{
        font-size: 13px;
        .language-div{
          .lag-radio{
            text-align: left;
            display: flex;
            justify-content: left;
            .item{
              span{
                font-size: 13px;
              }
            }
          }
        }

      }

    }
    .adv-content{
      border: 1px solid #dedede;
      border-radius: 3px;
      padding:10px;
      .article{
        margin-top: 10px;
        font-size: 13px;
        line-height: 22px;
        color: #666;
        text-indent: 2em;
        max-height: 200px;
        overflow: hidden;
        &.activeWord {
          max-height:10000px;
        }
      }
    }
  }






</style>

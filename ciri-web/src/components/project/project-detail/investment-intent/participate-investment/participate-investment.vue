<template>
  <div class="participate">
    <header class="clearfix">发布合投意向
      <i class="icon-back" @click="back"></i>
    </header>
    <div class="remind">
      请完善投资意向，并上传意向函扫描件，<br/>项目发起人将第一时间与您联系。
    </div>
    <cross-line></cross-line>
    <div class="invest-radio">
      <div class="item" v-show="this.isLeadQualified" :class="{active:isLead}" @click="leadRadio(true)">
        <i class="icon-radio">
          <input type="radio" name=""/>
        </i>
        <span>我要领投</span>
      </div>
      <div class="item" :class="{active:!isLead}" @click="leadRadio(false)">
        <i class="icon-radio">
          <input type="radio" name=""/>
        </i>
        <span>我要跟投</span>
      </div>
    </div>

    <div class="way">
      <div class="partipate-title">【参与合投方式】</div>
      <div class="select-wrap">
        <div class="item" :class="checked(cif.k)" v-for="(cif, index) in cifs" @click.prevent="check($event,cif.k)">
          <i class="icon-check">
            <input type="checkbox" name="cif"/>
          </i>
          <span>{{cif.v}}</span>
        </div>
      </div>

    </div>
    <div class="money">
      <div class="partipate-title">【预期投资金额】</div>
      <div class="item-remark">(若您选择非现金方式参与和投，请估算其在该项目中的现金价值)</div>
      <div class="range clearfix">
        <span class="range-amount fl" @click="reduceAmount" :disabled="investAmount <= 20">-</span>
        <input type="text" v-model="investAmount" class="range-input fl" ref="amountInput"/>
        <span class="range-amount fl" @click="addAmount">+</span>
        <span class="range-word fl">万</span>
      </div>
    </div>
    <div class="company">
      <div class="partipate-title">【参与合投企业】<span class="item-remark">(请选择投资意向函中的主体企业)</span></div>
      <div class="select-wrap" v-if="this.corps != null">
        <div class="item" v-for="(corp ,index) in corps" :key="corp.corpId" :class="{active:cId == corp.corpId}"
             @click="corpRadio(corp.corpId)">
          <i class="icon-radio">
            <input type="radio" name=""/>
          </i>
          <span>{{corp.name.valueCn}}</span>
        </div>

      </div>
    </div>
    <cross-line></cross-line>
    <div class="intent-letter">
      <div class="partipate-title clearfix">【投资意向函】
        <span class="item-remark">(选填)</span>
      </div>
      <div class="language-wrap">
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

            <router-link v-if="this.seeIntent"
                         :to="{path:'/project/project-detail/investment-intent/investment-edit',query: {title:'投资意向函',key:'intCh'}}"
                         class="title-edit fr">编辑
            </router-link>
            <router-link v-if="!this.seeIntent"
                         :to="{path:'/project/project-detail/investment-intent/investment-edit',query: {title:'投资意向函',key:'intEn'}}"
                         class="title-edit fr">编辑
            </router-link>

          </div>
          <div class="item-remark">(填写后将优先受邀参与项目投资策划会)</div>
        </div>
        <div class="adv-content chinese clearfix" v-show="seeIntent">
          <intentEdit :moreShow="this.moreShowChInt" :content="this.chineseInt"></intentEdit>
        </div>
        <div class="adv-content english" v-show="!seeIntent">
          <intentEdit :moreShow="this.moreShowEnInt" :content="this.englishInt"></intentEdit>
        </div>
      </div>

      <div class="upload-wrap">
        <div class="up-title clearfix">
          <div class="up-word fl">投资意向函上传：</div>
          <div class="upload fr">
            <span class="upload-file">上传</span>
            <input type="file" class="fill-input" @change="UploadFile($event,1)">
          </div>
        </div>
        <div class="item-remark">(请上传投资意向函扫描件，支持图片和PDF文件)</div>
        <div class="file-warp">
          <FileIntroduction v-for="(file,index) in askFileList" :key="index"
                            :file="file" :index="index" :tag="1"
                            @delete="deleteAskFile" @update="updateSummaryList"></FileIntroduction>
        </div>
      </div>
    </div>

    <cross-line></cross-line>
    <div class="advantage">
      <div class="partipate-title clearfix">【企业优势】
        <span class="item-remark">(选填)</span>

      </div>
      <div class="language-wrap">
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
            <router-link v-if="this.seeLanguage"
                         :to="{path:'/project/project-detail/investment-intent/investment-edit',query: {title:'企业优势',key:'advCh'}}"
                         class="title-edit fr">编辑
            </router-link>
            <router-link v-if="!this.seeLanguage"
                         :to="{path:'/project/project-detail/investment-intent/investment-edit',query: {title:'企业优势',key:'advEn'}}"
                         class="title-edit fr">编辑
            </router-link>
          </div>
          <div class="item-remark">(填写后将优先受邀参与项目投资策划会)</div>
        </div>
        <div class="adv-content chinese clearfix" v-show="seeLanguage">
          <intentEdit :moreShow="this.moreShowChAdv" :content="this.chineseAdv"></intentEdit>
        </div>
        <div class="adv-content english" v-show="!seeLanguage">
          <intentEdit :moreShow="this.moreShowEnAdv" :content="this.englishAdv"></intentEdit>
        </div>
      </div>

      <div class="upload-wrap">
        <div class="up-title clearfix">
          <div class="up-word fl">附件上传：</div>
          <div class="upload fr">
            <span class="upload-file">上传</span>
            <input type="file" class="fill-input" @change="UploadFile($event,2)">
          </div>
        </div>
        <div class="item-remark">(请上传投资企业资信相关资料)</div>
        <div class="file-warp">
          <FileIntroduction v-for="(file,index) in askFileList1" :key="index"
                            :file="file" :index="index" :tag="2"
                            @delete="deleteAskFile" @update="updateSummaryList"></FileIntroduction>
        </div>
      </div>
    </div>

    <div class="submit-wrap">
      <div class="submit" @click="apply">提交</div>
    </div>
  </div>
</template>

<script>
  import CrossLine from '@/components/base/cross-line/cross-line'
  import FileIntroduction from '@/components/base/file-introduction/file-introduction'
  import tool from "../../../../../api/tool"
  import gbus from '@/api/gbus'
  import intentEdit from '@/components/base/intent-edit/intent-edit'

  export default {
    components: {
      CrossLine,
      FileIntroduction,
      intentEdit
    },
    data() {
      return {
        isLead: false,
        cId: '',
        from: false,//控制是否发送查询请求
        advActive: 1,
        intentActive: 1,
        seeLanguage: true,
        seeIntent: true,
        moreShow: false,
        moreShowChInt:false,
        moreShowEnInt:false,
        moreShowChAdv:false,
        moreShowEnAdv:false,
        iconMore: 'icon-more',
        moreText: '展开',
        article: 'article',
        askFileList: [],
        askFileList1: [],
        askSummaryList: [],
        askSummaryList1: [],
        isLeadQualified: false,
        corps: null,
        investAmount: 0,
        cifs: [],
        projId: '',
        photoMeta: [],
        fileMeta: [],
        capitalInjectionFormId: [],
        chineseInt: '',
        chineseAdv: '',
        englishInt: '',
        englishAdv: ''
      }
    },
    props: {},
    watch: {

    },
    beforeRouteEnter:(to,from,next)=>{
      var path=from.path;
      //不是从编辑页面跳转来的
      if(path.lastIndexOf("investment-edit") == -1){
        localStorage.setItem("fromStatus", 1);
      }else {
        localStorage.setItem("fromStatus", 2);
      }
      next();
    },
    beforeRouteLeave(to,from,next){
      // 不是跳转到编辑页面...终止页面
      if(to.path.lastIndexOf("investment-edit") == -1){  //这里写下你的条件
        localStorage.setItem("intCh", "");
        localStorage.setItem("intEn", "");
        localStorage.setItem("advCh", "");
        localStorage.setItem("advEn", "");
        Object.assign(this.$data, this.$options.data())
      }
      next();
    },
    methods: {
      back() {
        window.history.back();
      },
      reduceAmount(){
        if(this.investAmount>20){
          this.investAmount = (this.investAmount-0) -20;
        }
      },
      addAmount(){
        this.investAmount = (this.investAmount-0)+ 20;
      },
      leadRadio(index) {
        this.isLead = index;
      },
      corpRadio(index) {
        this.cId = index;
      },
      // 默认选中参与合投的方式
      checked(k) {
        if (this.capitalInjectionFormId != null && this.capitalInjectionFormId.length > 0) {
          for (var value of this.capitalInjectionFormId) {
            if (k == value) {
              return "active";
            }
          }
        }
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
      check(e, v) {
        let element = e.currentTarget;
        if (element.classList.contains('active')) {
          element.classList.remove('active');
          if (this.capitalInjectionFormId != null && this.capitalInjectionFormId.length > 0) {
            for (let i = 0; i < this.capitalInjectionFormId.length; i++) {
              if (this.capitalInjectionFormId[i] == v) {
                this.capitalInjectionFormId.splice(i, 1);
                return;
              }
            }
          }
        } else {
          element.classList.add('active');
          this.capitalInjectionFormId.push(v);
        }
      },
      readMore() {
        if (this.moreText == '展开') {
          this.moreText = '收起'
          this.iconMore = 'pack-up'
          this.article = 'article activeWord'
        } else {
          this.moreText = '展开';
          this.iconMore = 'icon-more'
          this.article = 'article'
        }
      },
      UploadFile(e, tag) {
        tool.toast("正在上传文件....");
        let files = e.target.files || e.dataTransfer.files;
        if (!files.length)
          return;
        let imgFormData = new FormData();
        imgFormData.append('upload', files[0]);
        let config = {headers: {'Content-Type': 'multipart/form-data'}};
        //上传文件
        this.axios.post(tool.domind() + '/gateway/file/upload', imgFormData, config)
          .then(res => {
            e.target.value = '';
            if (res.data.code === 200) {
              let temp = res.data.data[0]
              if (tag == 1) {
                this.askFileList.push(temp);
                this.askSummaryList.push('');
              } else {
                this.askFileList1.push(temp);
                this.askSummaryList1.push('');
              }
            }
          });
      },
      deleteAskFile(msg) {
        let tag = msg.tag;
        let index = msg.index;
        if (tag == 1) {
          this.askFileList.splice(index, 1)
          this.askSummaryList.splice(index, 1)
        } else {
          this.askFileList1.splice(index, 1)
          this.askSummaryList1.splice(index, 1)
        }
      },
      updateSummaryList(msg) {
        if (msg.tag == 1) {
          this.askSummaryList[msg.index] = msg.val;
        } else {
          this.askSummaryList1[msg.index] = msg.val;
        }
      },
      listToMeta(array) {
        let split = '__'
        let res = [];
        if (array != null && array.length > 0) {
          for (let i = 0; i < array.length; i++) {
            let id = array[i].fileId;
            let size = array[i].fileSize;
            let name = array[i].fileName;
            res.push(id + split + size + split + name);
          }
          return res;
        }
        return null;
      },
      parameterCheck() {
        if (this.cId == null || this.cId == '')
          return 'corpId不能为空';
        if (this.projId == null || this.projId == '')
          return 'projId不能为空';
        if (this.capitalInjectionFormId == null || this.capitalInjectionFormId.length < 1)
          return '请选择参与合投的方式';
        if (this.investAmount == null || this.investAmount == 0)
          return '无效的投资金额';
        this.photoMeta = this.listToMeta(this.askFileList);
        this.fileMeta = this.listToMeta(this.askFileList1);
        return null;
      },
      apply() {
        let errorMsg = this.parameterCheck();
        if (errorMsg != null) {
          tool.toast(errorMsg);
          return;
        }
        let param = new URLSearchParams();
        param.append('projId', this.projId);
        param.append('lead', this.isLead);
        param.append('name', tool.getuser());
        param.append('corpId', this.cId);
        param.append('photoMeta', this.photoMeta);
        param.append('fileMeta', this.fileMeta);
        param.append('investAmount', this.investAmount);
        param.append('capitalInjectionFormId', this.capitalInjectionFormId);
        param.append('fileSummary', this.askSummaryList1);
        param.append('photoSummary', this.askSummaryList);
        param.append('advantageNoteZh', this.chineseAdv);
        param.append('advantageNoteEn', this.englishAdv);
        param.append('capitalInjectionFormNoteZh', this.chineseInt);
        param.append('capitalInjectionFormNoteEn', this.englishInt);

        tool.IndicatorOpen("正在提交");
        document.body.style.overflow='hidden';
        this.axios.post(tool.domind() + tool.path() + '/ah/s5/apply', param).then(r => {
          tool.IndicatorClose();
          document.body.style.overflow='auto';
          if (r.data.code == 200) {
            tool.toast('提交成功');
            this.$router.push({path:'/project/project-detail/investment-intent',query:{projId:this.projId}});
          } else
            tool.toast(r.data.msg);
        })
      },
      fillAdv() {
        let cont = localStorage.getItem("advCh");
        if (cont == "" || cont == "undefined" || cont == null) {
        } else {
          this.chineseAdv = cont;
          if (cont.length > 405) {
            this.moreShowChAdv = true;
          } else {
            this.moreShowChAdv = false;
          }
          return tool.replaceAll(cont, '\n', '<br/>');
        }

      },
      fillAdvEn() {
        let cont = localStorage.getItem("advEn");
        if (cont === "" || cont === "undefined" || cont === null) {
        } else {
          this.englishAdv = cont;
          if (cont.length > 405) {
            this.moreShowEnAdv = true;
          } else {
            this.moreShowEnAdv = false;
          }

          return tool.replaceAll(cont, '\n', '<br/>');
        }
      },
      fillInt() {
        let cont = localStorage.getItem("intCh");
        if (cont === "" || cont === "undefined" || cont === null) {
        } else {
          this.chineseInt = cont;
          if (cont.length > 405) {
            this.moreShowChInt = true;
          } else {
            this.moreShowChInt = false;
          }

          return tool.replaceAll(cont, '\n', '<br/>');
        }

      },
      fillIntEn() {
        let contEn = localStorage.getItem("intEn");
        if (contEn === "" || contEn === "undefined" || contEn === null) {
        } else {
          this.englishInt = contEn;
          if (contEn.length > 405) {
            this.moreShowEnInt = true;
          } else {
            this.moreShowEnInt = false;
          }
          return tool.replaceAll(contEn, '\n', '<br/>');
        }

      }
    },
    filters: {},
    computed: {},
    activated() {
      this.projId = this.$route.query.projId;
      //判读是否是从编辑页面 跳转来的 是的话不发送请求 用缓存显示数据
      if (localStorage.getItem("fromStatus") == 1) {
        this.$api.post('/ah/s0/getCorpsByName', {}).then(r => {
          if (r.code == 200) {
            this.isLeadQualified = r.isLeadQualified;
            this.corps = r.data;
            this.cifs = r.cifs;
            if (r.data != null)
              this.cId = r.data[0].corpId;
            //当调用方法回显示数据
            this.$api.post('/ah/s5/getUserProjectConInvest',{projId: this.projId, userId: tool.getuser()}).then(r => {
              if (r.code == 200) {
                if (r.data.order != null && r.data.order.length == 1) {
                  let order = r.data.order[0];
                  console.log(order);
                  //用户的合投信息
                  this.isLead = order.isLead;
                  //参与合投方式
                  this.capitalInjectionFormId = this.capitalInjectionFormId.concat(order.capitalInjectionFormId);
                  //预期投资金额
                  this.investAmount = order.investAmount.amount / 10000;
                  //参与合投企业
                  this.cId = order.corpId;
                  //TODO 投资意向函 企业优势 附件
                  // console.log(this.capitalInjectionFormId);
                  //项目投资意向函信息中英文
                  if (order.capitalInjectionFormNote.setValueCn) {
                    this.chineseInt = order.capitalInjectionFormNote.valueCn;
                    localStorage.setItem("intCh", this.chineseInt);
                  }
                  if (order.capitalInjectionFormNote.setValueEn) {
                    this.englishInt = order.capitalInjectionFormNote.valueEn;
                    localStorage.setItem("intEn", this.englishInt);
                  }
                  if (!order.capitalInjectionFormNote.setValueCn && order.capitalInjectionFormNote.setValueEn) {
                    this.intentActive = 2;
                    this.seeIntent = false;
                  }
                  //项目企业优势信息中英文
                  if (order.advantageNote.setValueCn) {
                    this.chineseAdv = order.advantageNote.valueCn;
                    localStorage.setItem("advCh", this.chineseAdv);
                  }
                  if (order.advantageNote.setValueEn) {
                    this.englishAdv = order.advantageNote.valueEn;
                    localStorage.setItem("advEn", this.englishAdv);
                  }
                  if (!order.advantageNote.setValueCn && order.advantageNote.setValueEn) {
                    this.advActive = 2;
                    this.seeLanguage = false;
                  }
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
                      this.askFileList.push(a);
                      this.askSummaryList.push(photo.summary.valueCn)
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
                      this.askFileList1.push(a);
                      this.askSummaryList1.push(file.summary.valueCn)
                    }
                  }
                }
                console.log(r.data);
              }
              else if(r.code != 201){
                tool.toast(r.msg)
              }
            });
          } else
            tool.toast(r.msg);
        });
      }
      this.fillAdv();
      this.fillAdvEn();
      this.fillInt();
      this.fillIntEn();
    },
    mounted() {
    },
    destroyed() {
    }
  }
</script>

<style lang="scss" scoped>
  @import '~@/assets/scss/reset.scss';
  @import '~@/assets/scss/mixin.scss';
  .participate{
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
        @include bg-image("../../../img/icon-back");
        background-size: 22px auto;
      }
    }
    .remind{
      padding: 7px 17px;
      height:30px;
      overflow: hidden;
      line-height: 16px;
      background: #f5f5f5;
      margin: 15px 10px 10px;
      color: #528de8;
      font-size: 10px;
      border-radius: 2px;
      text-align: center;
    }
    .item-remark{
      font-size: 11px;
      color: #666;
      height: 26px;
      line-height: 26px;
    }
    .partipate-title{
      font-size: 15px;
      color: #333;
      margin-left: -5px;
      .title-edit{
        color: #528de8;
        font-size: 13px;
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
        @include bg-image("../../../img/check");
        margin-right: 10px;

      }
      .icon-radio {
        @include bg-image("../../../img/radio");
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
        @include bg-image("../../../img/checked");
        margin-right: 10px;
      }
      .icon-radio {
        @include bg-image("../../../img/radioed");
        margin-right: 10px;
      }

    }
    .invest-radio{
      text-align: left;
      display: flex;
      justify-content: left;
      border-bottom: 1px solid #dedede;
      margin: 0px 10px;
    }
    .way{
      color: #333;
      padding: 15px 0px;
      border-bottom: 1px solid #dedede;
      margin: 0px 10px;
      .item{
        margin-left: 33px;
        font-size: 13px;
        height: 30px;
        line-height: 30px;
        span{
          height: 30px;
          line-height: 30px;
          font-size: 13px;
        }
      }

    }
    .money{
      color: #333;
      padding: 15px 0px;
      border-bottom: 1px solid #dedede;
      margin: 0px 10px;
      .range{
        margin: 15px 0px 0px 45px;
        font-size: 13px;
        color: #333;
        .range-amount{
          display: inline-block;
          width: 18px;
          height: 22px;
          background-color: #dedede;
          text-align: center;
        }
        .range-word{
          display: inline-block;
          height: 22px;
          line-height: 22px;
          margin-left: 6px;
          color: #528de8;
        }
        input{
          display: inline-block;
        }
      }
      .range-input{
        width: 65px;
        height: 20px;
        border: 1px solid #b8b8b8;
        text-align: center;
      }

    }
    .company{
      color: #333;
      padding: 15px 0px;
      margin: 0px 10px;
      .item{
        margin-left: 33px;
        font-size: 13px;
        height: 30px;
        line-height: 30px;
        span{
          height: 30px;
          line-height: 30px;
          font-size: 13px;
        }
      }

    }
    .upload-wrap{
      .up-title{
        margin-top: 15px;
        .up-word{
          font-size: 13px;
        }
        .upload{
          font-size: 13px;
          color: #3f83e6;
          position: relative;
          .upload-file{
            font-size: 12px;
            color:#528de8;
            display: inline-block;
            height:27px;
            line-height: 27px;
            position: relative;
            right: -100px;
          }
          .fill-input{
            height:27px;
            opacity: 0;
            width: 100px;
          }

        }

      }
    }
    .intent-letter{
      color: #333;
      padding: 15px 0px;
      margin: 0px 10px;
      .language-wrap{
        font-size: 13px;
        .language-div{
          border-top: 1px solid #dedede;
          .item-remark{

          }
          .lag-radio{
            text-align: left;
            display: flex;
            justify-content: left;
            position: relative;
            .item{
              span{
                font-size: 13px;
              }
            }
            a{
              height: 40px;
              line-height: 45px;
              display: inline-block;
              color: #528de8;
              position: absolute;
              right: 10px;
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
      .read-more {
        font-size: 13px;
        color: #3f80e9;
        line-height: 1;
        text-align: center;
        float: right;
        margin-top: 10px;
        padding-right: 10px;

        i {
          display: inline-block;
          width: 10px;
          height: 10px;
          background-size: 10px auto;
        }

        i.icon-more {
          @include bg-image("../../../../news/img/more");
        }

        i.pack-up {
          @include bg-image("../../../img/pack-up");
        }

      }
    }
    .advantage{
      color: #333;
      padding: 15px 0px;
      margin: 0px 10px;
      .language-wrap{
        font-size: 13px;
        .language-div{
          border-top: 1px solid #dedede;
          .item-remark{

          }
          .lag-radio{
            text-align: left;
            display: flex;
            justify-content: left;
            position: relative;
            .item{
              span{
                font-size: 13px;
              }
            }
            a{
              height: 40px;
              line-height: 45px;
              display: inline-block;
              color: #528de8;
              position: absolute;
              right: 10px;
            }
          }
        }
        .adv-content{
          border: 1px solid #dedede;
          border-radius: 3px;
          padding: 10px;
        }
      }
    }
    .submit-wrap{
      width: 100%;
      height: 70px;
      background-color: #f5f5f5;
      display: flex;
      justify-content: center;
      align-items: center;
      .submit{
        width: 150px;
        height: 30px;
        line-height: 30px;
        font-size: 13px;
        border-radius: 6px;
        background-color: #528de8;
        color: #fff;
        text-align: center;
      }
    }
  }
</style>

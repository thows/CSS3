<template>
  <div class="project-answering">
    <div class="answering-warp">
      <div class="ask-warp ask-bt">
          <div class="ask-describe"></div>
          <textarea name="" cols="30" rows="10" placeholder="相关问题的答复会展示在项目答疑区哟~" maxlength="1000" v-model="askMessage"></textarea>
          <p class="hint">问题答复后，将第一时间邮件或短信通知您</p>
          <div class="file-warp">
            <FileDelete v-for="(file,index) in askFileList"  :key="index"
                          :file="file" :index="index" :tag="1"
                          @delete="deleteAskFile"></FileDelete>
          </div>
          <div class="pop-bottom clearfix">
            <div class="fl">
              <i class="icon-uploading"></i>
              <span class="upload-file">上传文件</span>
              <input type="file" class="fill-input"  @change="UploadFile($event,1)">
            </div>
            <div class="fr btn-warp">
              <input type="checkbox" v-model="askChecked">匿名
              <div class="small-btn" @click="askAQuestion">提交</div>
            </div>
          </div>
      </div>
      <CrossLine></CrossLine>
      <!--<div class="small-btn" @click="askQuestion">我要提问</div>-->
      <div class="question">
        <ul class="tab clearfix">
          <li :class="{active:tabActive==1}" @click="allShow">全部 <em>{{questionCount}}</em></li>
          <li :class="{active:tabActive==2}" @click="mineShow">我的问题 <em>{{myQuestionCount}}</em></li>
        </ul>
        <!--所有问题-->
        <div class="all-warp" v-show="questionShow" >

          <div class="question-warp"  >
            <!--显示问题-->
            <div class="question-list" v-if="questions != null && questions.length != 0 " v-for="(question,index) in questions" :key="index" >
              <!--显示头像-->
              <div class="head-portrait">
                <img v-if="question.headUrl != null && question.headUrl !='' "  v-lazy="question.headUrl"  alt="">
                <img v-else  src="../../img/ques-def.png"  alt="">
              </div>
              <!--显示用户名和时间-->
              <div class="top-infor">
                <div class="user-name" v-text="hiddenName(question.userid)"></div>
                <div class="time">{{question.updateTime|time}}</div>
              </div>
              <!--提问信息-->
              <div class="ques-title">
                <intentEdit :moreShow="question.message.length>405" :content="question.message"></intentEdit>
              </div>

              <div class="main-news">
                <div class="delete" :class="[question.oneselfInfo?'main-del':'']" @click="deleteAsk(question.id,1)">{{question.oneselfInfo == true?"删除" :""}}</div>
                <div class="file-warp">
                  <div class="file" v-if="question.fileMetas != null && question.fileMetas.length !=0 " v-for="(fileMeta,index) in question.fileMetas" :key="index">
                    <i class="icon-type icon-pdf"></i>
                    <span class="file-title">{{fileMeta.fileName.length >15 ? fileMeta.fileName.substr(0,15)+'...'+fileMeta.fileName.replace(/.+\./, "") :fileMeta.fileName}}</span>
                    <div class="view" @click="lookFile(fileMeta.url)">查看</div>
                  </div>
                </div>
                <div class="qs-bottom clearfix">
                  <div class="fr dz-hf" >
                    <div class="dz-wrap" :class="[question.likeStatus?'active-like':'']" @click="likesChat(question)">
                      <div v-if="question.likes">
                        <i class="icon-dz"></i>
                        <span class="dz-count">{{question.likes}}</span>
                      </div>
                      <div v-else>看好</div>
                    </div>
                    <div class="dz-wrap" @click="askQuestion(question.id)">
                      <div v-if="question.total">
                        <i class="icon-replay"></i>
                        <span class="dz-count">{{question.total>999?"999+":question.total}}</span>
                      </div>
                      <div v-else>回复</div>

                    </div>
                  </div>
                </div>
                <div class="canot-see-replay" v-if="!memberLevel && question.total>0">
                  回复限项目库会员及更高等级会员查看，<span @click="upgrade">立即开通></span>
                </div>
                <!--回答信息-->
                <div class="questioner-visible" v-if="question.projectChatList !== null && question.projectChatList.length !=0  " v-for="(ask,index) in question.projectChatList" :key="index">
                  <!--回复的信息-->
                  <div v-if="ask != null">
                    <div class="marked-warp">
                      <div class="marked-words">
                        <div class="user-warp clearfix">
                          <div class="head-portrait small-head-portrait">
                            <!--<img src="../../../news/img/p_1.jpg" alt="">-->
                            <img v-if="ask.headUrl != null && ask.headUrl !='' "  v-lazy="ask.headUrl"  alt="">
                            <img v-else  src="../../img/rep-def.png"  alt="">
                          </div>
                          <div class="fl">
                            <div class="user-name">{{hiddenName(ask.userid)}}<em class="em-blue">{{ask.isVisible==0?"":"(仅提问者可见)"}}</em></div>
                            <div class="delete" v-bind:class="[ask.oneselfInfo ? 'back-del' : '']" @click="deleteAsk(ask.id,2)">{{ask.oneselfInfo == true?"删除" :""}}</div>
                            <div class="time small-time">{{ask.updateTime|time}}</div>
                          </div>
                        </div>
                        <div class="ques-title ques-no-padding">
                          <intentEdit :moreShow="ask.message.length>405" :content="ask.message"></intentEdit>
                        </div>
                      </div>
                    </div>
                    <!--设置回答文件信息-->
                    <div class="file-warp">
                    <div class="file"  v-for="(askFileMeta,index) in ask.fileMetas" :key="index">
                      <i class="icon-type icon-pdf"></i>
                      <span class="file-title">{{askFileMeta.fileName.length >15 ? askFileMeta.fileName.substr(0,15)+'...'+askFileMeta.fileName.replace(/.+\./, "") :askFileMeta.fileName}}</span>
                      <div class="view" @click="lookFile(askFileMeta.url)">查看</div>
                    </div>
                  </div>
                  </div>
                  <div v-else class="only-question">
                    此回复仅提问者可见
                  </div>
                </div>
                <!--判断当回复的总数大于显示的数量时显示查看更多 当最后一页时显示收起-->
                <div v-if="question.projectChatList !=null && question.projectChatList.length >0 &&memberLevel">
                  <div class="read-more back-more" v-if="question.total > question.projectChatList.length" @click="moreAsk(question,$event)" pageId="1">
                    <span>查看全部{{question.total}}条回复</span>
                    <!--<i class="icon-more"></i>-->
                  </div>
                  <div class="read-more back-more" @click="backUpAsk(question)" v-if="question.projectChatList.length>pageSize && question.total<=question.projectChatList.length">
                    <span >收起</span>
                    <!--<i class="pack-up"></i>-->
                  </div>
                </div>
              </div>
              <CrossLine></CrossLine>
            </div>
            <!--当问题不存在时显示-->
            <div v-if="questions == null || questions.length == 0 ">
              <img class="none-answering" src="../../img/none-answering@2x.png" alt="">
            </div>
          </div>
          <!--加载更多-->
          <div class="read-more" @click="allQuestion()"
               v-if="questions!=null && questions.length > 0 && page < questionCount/pageSize">
            <span>查看更多</span>
            <i class="icon-more"></i>
          </div>
          <!--收起-->
          <div class="read-more" @click="backUp(1)"
               v-if="questions!=null && questions.length > 0 && page > 1 && page >= (questionCount/pageSize)">
            <span>收起</span>
            <i class="pack-up"></i>
          </div>
        </div>
        <!--我的问题-->
        <div class="mine-warp" v-show="!questionShow">
          <div class="question-list" v-if="myQuestions != null && myQuestions.length >0 " v-for="(myQuestion,aindex) in myQuestions" :key="aindex" >
            <div class="head-portrait">
              <!--<img src="../../../news/img/p_1.jpg" alt="">-->
              <img v-if="myQuestion.headUrl != null && myQuestion.headUrl !='' "  v-lazy="myQuestion.headUrl"  alt="">
              <img v-else  src="../../img/ques-def.png"  alt="">
            </div>

            <div class="top-infor">
              <div class="user-name" v-text="hiddenName(myQuestion.userid)"></div>
              <div class="time">{{myQuestion.updateTime|time}}</div>
            </div>
            <div class="ques-title">
              <intentEdit :moreShow="myQuestion.message.length>405" :content="myQuestion.message"></intentEdit>
            </div>

            <div class="main-news">
              <div class="delete" :class="[myQuestion.oneselfInfo?'main-del':'']" @click="deleteAsk(myQuestion.id,1)">{{myQuestion.oneselfInfo == true?"删除" :""}}</div>

              <div class="file-warp">
                <div class="file" v-if="myQuestion.fileMetas != null && myQuestion.fileMetas.length > 0 " v-for="(fileMeta,zzindex) in myQuestion.fileMetas"  :key="zzindex" >
                  <i class="icon-type icon-pdf"></i>
                  <span class="file-title">{{fileMeta.fileName.length >15 ? fileMeta.fileName.substr(0,15)+'...'+fileMeta.fileName.replace(/.+\./, "") :fileMeta.fileName}}</span>
                  <div class="view" @click="lookFile(fileMeta.url)">查看</div>
                </div>
              </div>
              <div class="qs-bottom clearfix">
                <div class="fr dz-hf" >
                  <div class="dz-wrap" :class="[myQuestion.likeStatus?'active-like':'']" @click="likesChat(myQuestion)">
                    <div v-if="myQuestion.likes">
                      <i class="icon-dz active"></i>
                      <span class="dz-count">{{myQuestion.likes}}</span>
                    </div>
                    <div v-else>看好</div>
                  </div>
                  <div class="dz-wrap" @click="askQuestion(myQuestion.id)">
                    <div v-if="myQuestion.total">
                      <i class="icon-replay"></i>
                      <span class="dz-count">{{myQuestion.total>999?"999+":myQuestion.total}}</span>
                    </div>
                    <div v-else>回复</div>
                  </div>
                </div>
              </div>
              <div class="canot-see-replay" v-if="!memberLevel && myQuestion.total>0">
                回复限项目库会员及更高等级会员查看，<span @click="upgrade">立即开通></span>
              </div>
              <!--回答信息-->
              <div class="questioner-visible"　v-if="myQuestion.projectChatList!=null && myQuestion.projectChatList.length>0 " v-for="(ask,aaindex) in myQuestion.projectChatList" :key="aaindex" >
                <div v-if="ask != null">
                  <!--回复的信息-->
                  <div class="marked-warp">
                    <div class="marked-words">
                      <div class="user-warp clearfix">
                        <div class="head-portrait small-head-portrait">
                          <!--<img src="../../../news/img/p_1.jpg" alt="">-->
                          <img v-if="ask.headUrl != null && ask.headUrl !=''"  v-lazy="ask.headUrl"  alt="">
                          <img v-else  src="../../img/rep-def.png"  alt="">
                        </div>
                        <div class="fl">
                          <div class="user-name" >hiddenName(ask.userid)<em class="em-blue">{{ask.isVisible==0?"":"(仅提问者可见)"}}</em></div>
                          <div class="delete" :class="[ask.oneselfInfo?'back-del':'']" @click="deleteAsk(ask.id,2)">{{ask.oneselfInfo == true?"删除" :""}}</div>
                          <div class="time small-time">{{ask.updateTime|time}}</div>
                          <!--回复点赞数量-->
                        </div>
                      </div>
                      <div class="ques-title ques-no-padding">
                        <intentEdit :moreShow="ask.message.length>405" :content="ask.message"></intentEdit>
                      </div>
                    </div>
                  </div>
                  <!--设置回答文件信息-->
                  <div class="file-warp">
                  <div class="file" v-if="ask.fileMetas != null && ask.fileMetas.length > 0" v-for="(askFileMeta,ccindex) in ask.fileMetas" :key="ccindex">
                    <i class="icon-type icon-pdf"></i>
                    <span class="file-title">{{askFileMeta.fileName.length >15 ? askFileMeta.fileName.substr(0,15)+'...'+askFileMeta.fileName.replace(/.+\./, "") :askFileMeta.fileName}}</span>
                    <div class="view" @click="lookFile(askFileMeta.url)">查看</div>
                  </div>
                </div>
                </div>
                <div v-else class="only-question">
                  此回复仅提问者可见
                </div>
              </div>
              <!--判断当回复的总数大于显示的数量时显示查看更多 收起我的问题回复信息-->
              <div v-if="myQuestion.projectChatList!=null && myQuestion.projectChatList.length>0 &&memberLevel">
                <div class="read-more back-more" v-if="myQuestion.total > myQuestion.projectChatList.length" @click="moreAsk(myQuestion,$event)" pageId="1">
                  <span>查看全部{{myQuestion.total}}条回复</span>
                  <!--<i class="icon-more"></i>-->
                </div>
                <div class="read-more back-more" @click="backUpAsk(myQuestion)" v-if="myQuestion.projectChatList.length>pageSize && myQuestion.total<=myQuestion.projectChatList.length">
                  <span >收起</span>
                  <!--<i class="pack-up"></i>-->
              </div>
              </div>
            </div>
            <CrossLine></CrossLine>
          </div>
          <div v-if="myQuestions == null || myQuestions.length == 0 ">
            <img class="none-answering" src="../../img/none-answering@2x.png" alt="">
          </div>

          <!--点击加载更多我的问题-->
          <div class="read-more" @click="myQuestion" v-if="myQuestions != null && myQuestions.length>0 && myPage < myQuestionCount/pageSize">
            <span >查看更多</span>
            <i class="icon-more"></i>
          </div>
          <div class="read-more" @click="backUp(2)" v-if="myQuestions != null && myQuestions.length > 0 && myPage > 1 && myPage >= (myQuestionCount/pageSize)">
            <span >收起</span>
            <i class="pack-up"></i>
          </div>
        </div>
      </div>
      <div class="ask-pop pop-bg" v-show="askPop" @click="switchShow"></div>
      <div class="pop-up ask-warp" v-show="askPop">
        <div class="checkbox-warp">
          <input type="checkbox" v-model="backVisibleStatus">仅提问者可见
        </div>
        <textarea maxlength="1000" name="" id="" cols="30" rows="10" placeholder="写回复" v-model="backMessage"></textarea>
        <div class="file-warp">
          <FileDelete v-for="(file,index) in backFileList"  :key="index"
                      :file="file" :index="index" :tag="2"
                      @delete="deleteAskFile"></FileDelete>
        </div>
        <div class="pop-bottom clearfix">
          <div class="fl">

            <i class="icon-uploading"></i>
            <span class="upload-file">上传文件</span>
            <input type="file" class="fill-input" @change="UploadFile($event,2)">
          </div>
          <div class="fr btn-warp">
            <input type="checkbox"  v-model="backChecked" >匿名
            <!--<label for="checkbox">{{ askChecked }}</label>-->
            <div class="small-btn" @click="submitQuestion">提交</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import CrossLine from '@/components/base/cross-line/cross-line'
  import FileDelete from '@/components/base/file-delete/file-delete'
  import Authority from '@/components/base/authority/authority'
  import moment from 'moment'
  import tool from "../../../../api/tool"
  import intentEdit from '@/components/base/intent-edit/intent-edit'
  import { MessageBox } from 'mint-ui';

  export default {
    components: {
      CrossLine,
      FileDelete,
      Authority,
      tool,
      MessageBox,
      intentEdit
    },
    data() {
      return {
        proId:364000018,//项目id
        askPop : false,
        pageSize:5,
        // 权限弹框
        authorityShow : false,
        questionShow : true,
        tabActive : 1,
        page:0,      //全部问题默认页码数
        myPage:0,    //我的提问默认页码数
        moreQuestion : '查看更多', //所有问题下拉按钮
        moreMyQuestion:'查看更多',//我的提问下拉按钮
        iconMore :'icon-more',
        iconMyMore :'icon-more',
        moreShow : true,
        questionCount:0,
        myQuestionCount:0,
        askPage:1,
        questions:[],  //项目提问信息
        myQuestions:[], //我的问题
        askMessage:"",        //提问的信息栏
        askChecked:false,  //提问匿名选项框
        askFileList:[],  //提问的文件数组
        backFileList:[],  //回复的文件数组
        backVisibleStatus:false, //回复仅提问者可见
        backChecked:false,       //回复匿名
        backMessage:"",          //回复信息
        parentId:"",             //回复的父id值
        memberLevel:true,
        article:'article',
        moreText:'展开',

      }
    },
    props: {},
    watch: {},
    methods: {
      readMore(){
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
      hiddenName(username){
        return tool.hiddenName(username == null || username == '' ? "匿名用户": username)
      },
      switchShow(){
        this.askPop = false;
      },
      // 提问弹框
      askQuestion (id){
        this.parentId = id;
        this.askPop = true;
      },
      //权限弹框
      authorityHide () {
        this.authorityShow = false;
      },
      upgrade () {
        this.$router.push({ path: "/mine/member-center" });
      },
      allShow () {
        this.questionShow = true;
        this.tabActive = 1;
        this.page=0;
        this.allQuestion();
      },
      mineShow () {
        this.questionShow = false;
        this.tabActive = 2;
        //初始化我的问题
        this.myPage=0;
        this.myQuestion();
      },
      likesChat(question){
        // question.id,question.likes,question.likeStatus
        let tag = 0;
        if (!question.likeStatus) {
          question.likes = question.likes + 1;
        } else {
          question.likes = question.likes - 1;
          tag= 1;
        }
        question.likeStatus=!(question.likeStatus);
        //alert(tag)
        this.$api.post('/ah/s0/chat/giveLikes', {userId: tool.getuser(), chatId: question.id, tag: tag}).then(r => {
          if (r.code == 200) {
          }
        })
      },
      //查看文件
      lookFile(fileUrl){
        // tool.toast(fileUrl);
        window.location.href = fileUrl;
      },
      //删除交流信息
      deleteAsk(chatId,t){
        let flag='';
        if(t==1){
           flag='确认要删除这个问题吗?'
        }else if(t == 2){
           flag='确认要删除这个回复吗?'
        }
        console.log(MessageBox);
        console.dir(MessageBox);
        MessageBox.confirm('',{
          message: flag,
          confirmButtonText: '删除',
        }).then(action => {
          this.$api.post('/ah/s0/chat/delProjectChatByProjChatId',{name:tool.getuser(),chatId:chatId}).then(r => {
            if(r.code==200){
              tool.toast('删除成功');
              //所有项目删除列表中信息
              if(this.tabActive == 1){
                for (var i = 0; i < this.questions.length; i++) {
                  let que = this.questions[i];
                  if (que.id == chatId) {
                    //注意对比这行代码：删除元素后调整i的值
                    this.questions.splice(i--, 1);
                    // alert(chatId);
                    //提问总数减一
                    this.questionCount=this.questionCount-1;
                    this.myQuestionCount=this.myQuestionCount-1;
                    return;
                  }
                  //删除回复中信息
                  if (que.projectChatList!=null && que.projectChatList.length > 0) {
                    for (var j = 0; j < que.projectChatList.length; j++) {
                      let ask = que.projectChatList[j];
                      if (ask.id == chatId) {
                        //注意对比这行代码：删除元素后调整i的值
                        que.projectChatList.splice(j--, 1);
                        // alert(chatId);
                        //问题回答信息总数-1
                        que.total = que.total - 1;
                        return;
                      }
                    }
                  }
                }
              }
              if(this.tabActive == 2){
                //删除我的问题中的信息
                for (var i = 0; i < this.myQuestions.length; i++) {
                  let que = this.myQuestions[i];
                  if (que.id == chatId) {
                    //注意对比这行代码：删除元素后调整i的值
                    this.myQuestions.splice(i--, 1);
                    return;
                  }
                  //删除回复中信息
                  if (que.projectChatList!=null && que.projectChatList.length > 0) {
                    for (var j = 0; j < que.projectChatList.length; j++) {
                      let ask = que.projectChatList[j];
                      if (ask.id == chatId) {
                        //注意对比这行代码：删除元素后调整i的值
                        que.projectChatList.splice(j--, 1);
                        // alert(chatId);
                        //问题回答信息总数-1
                        que.total = que.total - 1;
                        return;
                      }
                    }
                  }
                }
              }

            }else {
              tool.toast('删除失败请重试');
            }
          });
        });
      },
      //获取所有的问答信息15201197830
      allQuestion(){
        // console.log(Math.ceil(this.questionCount/this.pageSize));
        // alert(this.page-1 < Math.ceil(this.questionCount/this.pageSize))
        //增加页码
        if(this.page - 1 < Math.ceil(this.questionCount/this.pageSize)){
          this.page = this.page+1;
          //发送请求分页查询数据
          this.$api.post('/ah/s0/chat/getProjectQuestions',{pageId: this.page, pageSize:this.pageSize,userId:tool.getuser(),proId:this.proId}).then(r => {
            if(r.level==0){
              tool.toast("会员等级太低，无法查看回复信息");
            }
            //设置总问题数
            this.questionCount=r.total;
            //设置我的提问数
            this.myQuestionCount= r.myTotal;
            if(r.data !== "" && r.data !== null && r.data.length >0){
              if (this.page === 1) {
                //如追加数据
                this.questions= r.data;
              } else {
                this.questions = this.questions.concat(r.data);
              }
            }
          });
        }
      },
      backUp(tag){
        //所有问题收起
        if (tag == 1) {
          if (this.questions != null && this.questions.length > 0) {
            this.questions = this.questions.slice(0, this.pageSize);
            this.page = 1;
          }
        }
        //我的问题收起
        if (tag == 2) {
          if(this.myQuestions !=null && this.myQuestions.length>0){
            this.myQuestions = this.myQuestions.slice(0,  this.pageSize);
            this.myPage = 1;
          }
        }
      },
      //获取我的提问信息
      myQuestion(){
        //判读收起
        if (this.myPage - 1 < Math.ceil(this.myQuestionCount / this.pageSize)) {
          this.myPage = this.myPage + 1;
          //发送请求分页查询数据
          this.$api.post('/ah/s0/chat/getMyQuestions', {
            pageId: this.myPage,
            pageSize: this.pageSize,
            userId: tool.getuser(),
            proId: this.proId
          }).then(r => {
            if (r.level == 0) {
              tool.toast("会员等级太低，无法查看回复信息");
            }
            if (r.data !== "" && r.data !== null && r.data.length > 0) {
              //设置我的回答总数
              this.myQuestionCount = r.total;
              if (this.myPage === 1) {
                //如追加数据
                this.myQuestions = r.data;
              } else {
                this.myQuestions = this.myQuestions.concat(r.data);
              }
            }
          });
        }
        },
      //获取
      moreAsk(quesiton,e){
        var d = e.currentTarget;
        console.log(d);
        let pageId = 1;
        // if(quesiton.projectChatList == null || question.projectChatList.length<=5){
        //   pageId = 2;
        // }else{
          pageId = parseInt(d.getAttribute("pageId")) + 1;
        // }
        // console.log(quesiton);
        //获取更多信息pageId
        this.$api.post('/ah/s0/chat/getProjectAsk',{pageSize:this.pageSize,pageId: pageId,userId:tool.getuser(),proId:this.proId,parentId:quesiton.id}).then(r => {
          if(r.code==200){
            if(r.level==0){
              tool.toast("会员等级太低，无法查看回复信息");
            }
            quesiton.total=r.total;
            quesiton.projectChatList=quesiton.projectChatList.concat(r.data);

           /* console.log(quesiton);
            console.log(quesiton.projectChatList.length)

            console.log(quesiton.total > quesiton.projectChatList.length);*/
            d.setAttribute("pageId",pageId);
            // console.log(parseInt(d.getAttribute("pageId")));
          }
        })
      },
      //收起回复
      backUpAsk(question){
        if(question != null && question.projectChatList !=null){
          question.projectChatList = question.projectChatList.slice(0, 5);
        }
      },
      //提问
      askAQuestion(){
        if(this.askMessage==""){
          tool.toast("提问信息不能为空")
          return
        }
        let fileStr=[];
        for (var file of this.askFileList) {
          fileStr.push(file.fileName+","+file.fileId);
        }
        var files=fileStr.join(";");
        this.$api.post('/ah/s0/chat/addProjectChat',
          { userid: tool.getuser(),
            projid: this.proId, files: files,
            message: this.askMessage,
            status : this.askChecked ? 1 : 0,
          }).then(r => {
          if(r.code===200){
            this.askMessage="";//提问的信息栏
            this.askChecked=false;  //提问匿名选项框
            this.askFileList=Array();
            tool.toast("提问成功");
            if(this.tabActive === 1){
              //刷新全部问题页面
              this.page=0;
              this.allQuestion();
            }else if(this.tabActive === 2){
              this.questionCount=this.questionCount+1;
              this.myQuestionCount=this.myQuestionCount+1;
              //刷新我的页面
              this.myPage=0;
              this.myQuestion();
            }

          }
        });
      },
      //回复
      submitQuestion(){
        if(this.backMessage==""){
          tool.toast("回复信息不能为空")
          return
        }
        let fileStr=[];
        for (var file of this.backFileList) {
          fileStr.push(file.fileName+","+file.fileId)
        }
        var files=fileStr.join(";");
        this.askPop = false;
        this.$api.post('/ah/s0/chat/addProjectChat',
          { userid: tool.getuser(),
            projid: this.proId, files: files,
            message: this.backMessage,
            parent: this.parentId,
            status: this.backChecked ? 1 : 0,
            isVisible: this.backVisibleStatus ? 1 : 0
          }).then(r => {
          if (r.code === 200) {
            //隐藏弹窗
            this.askPop = false;
            //提示信息
            tool.toast("回复成功");

            if(this.tabActive == 1){
              // questions:null,  //项目提问信息
                // myQuestions:null
              for (var question of this.questions) {
                if(question.id == this.parentId){
                  if(question.projectChatList == null ||question.projectChatList.length==0){
                    question.projectChatList=new Array(r.data);
                  }else {
                    question.projectChatList.unshift(r.data);
                  }
                  question.total=question.total+1;
                  break;
                }
              }
              // allShow ();
            }else if(this.tabActive==2){
              // mineShow();
              for (var question of this.myQuestions) {
                if(question.id == this.parentId){
                  if(question.projectChatList == null ||question.projectChatList.length==0){
                    question.projectChatList=new Array(r.data);
                  }else {
                    question.projectChatList.unshift(r.data);
                  }
                  question.total=question.total+1;
                  break;
                }
              }
            }
            //内容重置
            this.backMessage="";
            //回答问题的id重置
            this.parentId="";
            //将回复的文件信息删除
            this.backFileList=new Array();
          }
        });
      },
      //上传文件
      UploadFile(e, tag) {
        tool.toast("正在上传文件....");
        var files = e.target.files || e.dataTransfer.files;
        if (!files.length)
          return;
        var imgFormData = new FormData();
        imgFormData.append('upload', files[0]);
        let config = {headers: {'Content-Type': 'multipart/form-data'}};
        //上传文件
        this.axios.post(tool.domind() + '/gateway/file/upload', imgFormData, config)
          .then(res => {
            // e.after(e.clone().val(""));
            // e.remove();
            e.target.value='';
            if (res.data.code === 200) {
              let temp = res.data.data[0]
              switch (tag) {
                case 1:
                  this.askFileList.push(temp);
                  break;
            case 2:
                  this.backFileList.push(temp);
                  break;
              }
            }
          });
      },
      //删除文件
      deleteAskFile(msg){
          let tag=msg.tag;
          let index=msg.index;
          //删除文件
          if(tag===1){
            this.askFileList.splice(index,1)
          }
          if(tag===2){
            this.backFileList.splice(index,1)
          }
      }
    },
    filters: {
      time(time) {
        return moment(time).format("YYYY-MM-DD");
      }
    },
    computed: {},
    created() {
      let level = localStorage.getItem("userLevel");
      if (level == '1' || level == '3') {
        this.memberLevel = false;
      } else {
        this.memberLevel = true;
      }
      this.proId = parseInt(this.$route.query.projId);
      this.allQuestion();
    },
    mounted() {
      //tool.getuser();
    },
    destroyed() {
    }
  }
</script>
<style type="text/scss" lang="scss" scoped>
  @import '~@/assets/scss/reset.scss';
  @import '~@/assets/scss/mixin.scss';
  @import '~@/assets/scss/const.scss';
  .project-answering{
    text-align: left;
    .em-blue{
      color: #528de8;
    }
    .none-answering{
      width: 100%;
      height: 100%;
    }
    .answering-warp{
      .ask-warp{
        width:100%;
        background: #fff;
        padding: 0 15px;
        box-sizing: border-box;
        .checkbox-warp{
          font-size: 11px;
          color:#333;
          margin: 15px 0 10px;
          input{
            margin-right: 6px;
            vertical-align: middle;
          }
        }
        .ask-describe{
          height:40px;
          width:215px;
          @include bg-image('../../img/ask-describe');
          background-size: 215px 40px;
        }
        textarea{
          height:97px;
          width: 100%;
          border:1px solid #dedede;
          border-radius: 3px;
          outline: none;
          padding: 10px;
          font-size: 13px;
          color:#666;
          box-sizing: border-box;
          font-family: "Microsoft Yahei";
        }
        p.hint{
          margin-top:10px ;
          font-size: 13px;
        }
        .pop-bottom{
          height:27px;
          line-height: 27px;
          margin-top: 21px;
          position: relative;
          .icon-uploading{
            height:27px;
            width:15px;
            margin-right: 10px;
            display: inline-block;
            @include bg-image('../../img/upload-file');
            background-size: 15px 17px;
            background-repeat: no-repeat;
            background-position: center;

          }
          .upload-file{
            font-size: 12px;
            color:#528de8;
            display: inline-block;
            height:27px;
            line-height: 27px;
            position: absolute;
            top:0;
            left: 25px;

          }
          .fill-input{
            position: absolute;
            top:0;
            left: 0px;
            height:27px;
            opacity: 0;
            z-index: 111;
            width: 100px;
          }
          .btn-warp{
            font-size: 11px;
            color:#333;
            input{
              margin-right: 6px;
              vertical-align: middle;

            }
            .small-btn{
              height:27px;
              line-height:27px;
              width:52px;
              display: inline-block;
              margin-left: 15px;
              font-size: 15px;

            }
          }

        }

      }
      .ask-bt{
        margin-bottom: 17px;
      }
      .ask-pop{
        padding: 0;
        z-index: 998;
      }
      .pop-up{
        position: fixed;
        bottom: 0;
        background: #fcfcfc;
        z-index: 999;
      }
      .question{
        .only-question{
          font-size: 14px;
          color: #528de8;
          padding-top: 15px;
        }
        .tab{
          margin:15px 0 5px;
          padding: 0 10px;
          li{
            float:left;
            margin-right: 15px;
            color:#528de8;
            font-size: 10px;
            width:60px;
            height:20px;
            line-height: 20px;
            border-radius: 20px;
            border: 1px solid #528de8;
            text-align: center;
            &.active{
              background:#528de8 ;
              color:#fff;
            }

          }
          li:last-child{
            width: 80px;
          }
        }
        .canot-see-replay{
          height: 44px;
          line-height: 44px;
          color: #ff0000;
          background-color: #f5f5f5;
          font-size: 14px;
          padding-left: 10px;
        }
        .question-list{
          margin-top: 15px;
          position: relative;
          .head-portrait{
            height:35px;
            width: 35px;
            border-radius: 50%;
            overflow: hidden;
            position: absolute;
            top:0;
            left: 10px;
            img{
              width: 100%;
              height:100%;
            }
          }
          .top-infor{
            padding-left: 57px;
            height: 35px;
            .user-name{
              font-size: 15px;
              color: #333;
              line-height: 1;
              margin-bottom: 3px;
              em{
                margin-left: 7px;
                color:#528de8;
                font-size: 10px;
              }
            }
            .time{
              color: #666;
              font-size: 13px;
            }
          }
          .ques-title{
            font-size: 14px;
            color:#333;
            line-height: 23px;
            margin-top: 10px;
            padding:0px 15px;
          }
          .ques-no-padding{
            padding:0px;
          }
          .main-news{
            padding: 0 10px 0px 27px;
            margin-bottom: 15px;
            .delete{
              font-size: 12px;
              color:#666;
              line-height: 1;
              position: absolute;
              right:10px;
              top:0;
              text-align: right;
              background-size: 12px 12px;
              background-repeat: no-repeat;
              background-position: 0px center;
              width: 41px;
              height: 12px;
              &.main-del{
                @include bg-image('../../img/delete-question');
              }
              &.back-del{
                @include bg-image('../../img/delete');
              }
            }
            .file-warp{
              .file{
                padding: 11px 10px;
                line-height: 13px;
                position: relative;
                padding-left: 28px;
                border: 1px solid #dedede;
                &:first-child{
                  margin-top: 10px;
                }
                &:nth-child(n+2){
                  border-top:none;
                }
                .icon-type{
                  position: absolute;
                  top:11px;
                  left: 10px;
                  display: inline-block;
                  width:11px;
                  height:13px;
                  background-size: 11px 13px;
                  vertical-align: middle;
                  &.icon-pdf{
                    @include bg-image("../../img/pdf");
                  }
                  &.icon-jpg{
                    @include bg-image("../../img/jpg");
                  }
                  &.icon-ppt{
                    @include bg-image("../../img/ppt");
                  }
                  &.icon-xls{
                    @include bg-image("../../img/xls");
                  }
                }
                .file-title{
                  display: inline-block;
                  line-height: 13px;
                  font-size: 11px;
                  color: #333;
                }
                .view{
                  position: absolute;
                  right:10px;
                  top:11px;
                  color:#528de8;
                  font-size: 11px;
                  line-height: 1;
                }
              }
            }
            .qs-bottom{
              font-size: 12px;
              color:#666;
              padding: 11px 0 15px 0px;
              .dz-hf{
                .dz-wrap{
                  width: 57px;
                  height: 22px;
                  line-height: 22px;
                  border: 1px solid #dedede;
                  border-radius: 30px;
                  display: inline-block;
                  text-align: center;
                  font-size: 12px;
                  &.active-like{
                    border: 1px solid #528de8;
                    background-color: #528de8;
                    .icon-dz{
                      @include bg-image('../../img/thumbs-uped-white');
                    }
                    .dz-count{
                      color: #fff;
                      font-size: 12px;
                    }
                  }
                  .icon-dz{
                    display: inline-block;
                    width: 12px;
                    height: 12px;
                    @include bg-image('../../img/thumbs-up');
                    background-size: 12px 12px;
                    background-repeat: no-repeat;
                    background-position: center;
                    margin-right: 4px;
                  }
                  .icon-replay{
                    display: inline-block;
                    width: 12px;
                    height: 12px;
                    @include bg-image('../../img/replay');
                    background-size: 12px auto;
                    background-repeat: no-repeat;
                    background-position: center 1px;
                    margin-right: 4px;
                  }
                }
                .dz-wrap:first-child{
                  margin-right: 12px;
                }
                .reply{
                  em{
                    margin-left: 10px;
                  }
                }
              }
            }
            .questioner-visible{
              background: #f5f5f5;
              padding:0 10px 15px;
              &:nth-child(n+5){
                border-top: 1px dashed #666;
              }
              .marked-words{
                color:#528de8;
                font-size: 14px;
                line-height: 1;
                padding: 15px 0;
                @include onepx-dashed('bottom');
                &:last-child{
                  padding-bottom: 0;
                  &:after{
                    border:none;
                  }
                }
                .user-warp{
                  position: relative;
                  padding-left: 37px;
                  .small-head-portrait{
                    width: 30px;
                    height: 30px;
                    left: 0px;
                  }
                  .small-time{
                    margin-top:4px;
                  }
                  .user-name{
                    font-size: 14px;
                    color: #333;
                  }
                  .time{
                    font-size: 12px;
                    color: #666;
                  }
                  .delete{
                    color: #528de8;
                    width: 41px;
                    height: 12px;
                    text-align: right;
                    background-size: 12px 12px;
                    background-repeat: no-repeat;
                    background-position: 0px center;
                    &.back-del{
                      @include bg-image('../../img/delete');
                    }
                    &.main-del{
                      @include bg-image('../../img/delete-question');
                    }
                  }


                }
                .ques-title{
                  font-size: 13px;
                }
              }
            }

          }

        }
        .read-more{
          font-size: 13px;
          color: #3f80e9;
          line-height: 1;
          text-align: center;
          margin-top: 10px;
          padding-right: 10px;
          margin-bottom: 16px;
          padding-bottom: 10px;
          i {
            display: inline-block;
            width: 10px;
            height: 10px;
            background-size: 10px auto;
          }
          i.icon-more{
            @include bg-image("../../../news/img/more");
          }
          i.pack-up{
            @include bg-image("../../img/pack-up");
          }
        }
        .back-more{
          text-align: left;
          margin-top: 0px;
          background-color: #f5f5f5;
          padding: 0px 0px 15px 17px;
        }
      }
    }

  }

</style>

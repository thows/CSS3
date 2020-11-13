<template>
  <div class="my-profile">
    <header-bar text="资料设置" @back="back"></header-bar>
    <cross-line style="margin-top: 44px;"></cross-line>
    <div class="main">
      <div class="more-bar head-portrait">
        <i class="icon-more" @click="headShow"></i>
        <div class="key icon-head" @click="headShow">
            <img v-lazy="userInfo.portraitFileUrl" />
        </div>
        <h1>头像</h1>
      </div>
      <div class="title-line">个人信息</div>
      <div class="more-bar">
        <h1 class="key mr35">{{userInfo.roleStr}}</h1>
        <h1>用户角色</h1>
      </div>
      <!--<more text="用户角色" textKey="项目代理"></more>-->
      <border-line></border-line>
      <more text="真实姓名" :textKey="userInfo.realName" :to="'/mine/change-key/realName/'+userInfo.realName" ></more>
      <border-line></border-line>
      <more text="我的国家" :textKey="userInfo.myCountryName" :to="'/mine/change-country/'+userInfo.myCountryName"></more>
      <border-line></border-line>
      <more text="我的公司" :textKey="userInfo.corpName" :to="'/mine/change-key/corpName/'+userInfo.corpName"></more>
      <border-line></border-line>
      <more text="我的部门" :textKey="userInfo.department" :to="'/mine/change-key/department/'+userInfo.department"></more>
      <border-line></border-line>
      <more text="我的职位" :textKey="userInfo.jobTitle" :to="'/mine/change-key/jobTitle/'+userInfo.jobTitle"></more>
      <border-line></border-line>
      <more text="关注国家" :textKey="userInfo.careCountryStr" :to="'/mine/focus-country/careCountries/'+userInfo.careCountries" ></more>
      <border-line></border-line>
      <more text="关注行业" :textKey="userInfo.careIndustryStr" :to="'/mine/focus-country/careIndustries/'+userInfo.careIndustries" ></more>
      <div class="title-line">非公开信息</div>

      <more text="会员等级" :textKey="userInfo.memberLevelId" :show=show keyClass="mr35"></more>
      <border-line></border-line>
      <more text="我的邮箱" :textKey="userInfo.email" :show=show keyClass="mr35"></more>
      <border-line></border-line>
      <more text="我的手机" :textKey="userInfo.phone" :show=show keyClass="mr35"></more>
      <border-line></border-line>
      <more text="我的微信" :textKey="userInfo.wechat" :show=show keyClass="mr35"></more>
      <border-line></border-line>
      <more text="用户状态" :textKey="userInfo.userStatus" :show=show keyClass="mr35"></more>
      <border-line></border-line>
      <more text="我的地址" :textKey="userInfo.corpAddress" :to="'/mine/change-key/corpAddress/'+userInfo.corpAddress"></more>
      <div class="title-line" style="height:80px;"></div>
    </div>
    <div class="head-bounced ping-bg" v-show="showBounced">
      <div class="btn-warp">
        <div class="select selectbtn" >
          <span>从相册选择</span>
          <input type="file" class="uploadImg" @change="uploadHead($event)" accept="image/*"  id="uploadHead" multiple/>
        </div>
        <div class="cancel selectbtn" @click="headHide">取消</div>
      </div>

    </div>
  </div>
</template>

<script>
  import HeaderBar from '@/components/base/header-bar/header-bar';
  import CrossLine from '@/components/base/cross-line/cross-line';
  import More from '@/components/base/more/more';
  import BorderLine from '@/components/base/border-line/border-line';
  import tool from '@/api/tool'
  import { Indicator } from 'mint-ui';

  export default {
    components: {
      HeaderBar,
      CrossLine,
      BorderLine,
      More,
      tool
    },
    data(){
      return {
        show:false,
        showBounced: false,
        to : '',
        userInfo:"",
        img: null
      }
    },
    methods: {
      back() {
        window.history.back()
      },
      headShow () {
        this.showBounced = true;
      },
      headHide () {
        this.showBounced = false;
      },
      uploadHead(e){
        var files = e.target.files || e.dataTransfer.files;
        console.log(e.target.files);
        if (!files.length)
          return;
        // console.log(files[0].size);

        if(files[0].size>1*1024*1024){
          tool.toast("您上传图片过大,请重新上传");
          e.target.value='';
          return;
        }
        Indicator.open({
          text: '正在上传文件...',
          spinnerType: 'fading-circle'
        });

        var imgFormData = new FormData();
        imgFormData.append('img', files[0]);
        let config = { headers: { 'Content-Type': 'multipart/form-data' } };

        this.axios.post(tool.domind() + '/gateway/file/upload', imgFormData, config)
          .then(res => {
            if (res.data.code === 200) {
              let params = new URLSearchParams();
              params.append("name",tool.getuser());
              params.append("portraitFileSize",res.data.data[0].fileSize);
              params.append("portraitFileId",res.data.data[0].fileId);
              // tool.toast("正在上传...");
              this.updateUserInfo(params);
              Indicator.close();
              //刷新页面
              this.userInfo.portraitFileUrl=res.data.data[0].url;
            }else{
              tool.toast("上传用户头像失败")
            }
          });

        this.headHide();
      },
      updateUserInfo(params){
        this.axios
          .post(tool.domind() + "/gateway/user/updateUserBasicInfo" ,params)
          .then(res => {
            if (res.data.code === 200) {
              tool.toast("修改头像成功");
            }else {
              tool.toast("修改头像失败")
            }
          });
      }
    },
    created() {
      if (tool.islogin() === "true") {
        this.axios
          .get(tool.domind() + "/gateway/user/getUserBasicInfo?name=" + tool.getuser())
          .then(res => {
            if (res.data.code === 200) {
              this.userInfo=res.data.data;
              var level=this.userInfo.memberLevelId;
              if(!this.userInfo.portraitFileUrl){
                this.userInfo.portraitFileUrl = require('../img/user_face.png');
              }
              if(level>=5){
                this.userInfo.memberLevelId='源合网会员'
              }else if(level >=3){
                this.userInfo.memberLevelId='项目库会员'
              }else if(level >=3){
                this.userInfo.memberLevelId='VIP会员'
              }else {
                this.userInfo.memberLevelId='普通会员'
              }
            }
          });
      }else {
        this.portraitUrl = require('../img/user_face.png');
      }
    },
  }
</script>

<style type="text/scss" lang="scss" scoped>
  @import '~@/assets/scss/mixin.scss';
  @import '~@/assets/scss/const.scss';
.main{
  text-align: left;
  .more-bar {
    height: 40px;
    line-height: 40px;
    background: #fff;
    padding: 0 10px;
    i {
      display: block;
      float:right;
      width: 20px;
      height: 40px;
      background-repeat: no-repeat;
      @include bg-image("../../base/img/more");
      background-size: 20px auto;
      background-position: center;
    }
    .icon-more {
      @include bg-image("../../base/img/more");
      cursor: pointer;
    }
    h1 {
      display: inline-block;
      text-align: left;
      font-size: 15px;
      color: #333;
      font-weight: normal;
    }
    .key{
      float:right;
    }
    .mr35{
      margin-right: 25px;
      float: right;
    }
  }
  .head-portrait{
    height:100px;
    line-height: 100px;
    .icon-more{
      height:100px;
    }

    .icon-head{
      height:66px;
      width:66px;
      margin-right: 5px;
      margin-top: 17px;
      cursor: pointer;
      img{
        height: 66px;
        width: 66px;
        border:1px solid #ccc;
        border-radius: 50%;
      }
    }

  }
  .title-line{
    font-size: 16px;
    color:#333;
    padding: 9px;
    background: #f5f5f5;
    text-align: center;
  }
}
.head-bounced{
  background: rgba(51,51,51,0.5);
  z-index: 999;
  padding: 0 2.7%;
  .btn-warp{
    position: fixed;
    bottom: 0;
    width:94.6%;

    .selectbtn{
      height:35px;
      line-height: 35px;
      width:100%;
      border-radius: 3px;
      background: #fff;
      font-size: 13px;
      color:#333;
      margin-bottom: 15px;
      position: relative;
      .uploadImg{
        position: absolute;
        left: 0px;
        top: 0px;
        right:0;
        bottom:0;
        width:100%;
        opacity: 0;
        -ms-filter: 'alpha(opacity=0)';
      }
    }
  }

}
</style>

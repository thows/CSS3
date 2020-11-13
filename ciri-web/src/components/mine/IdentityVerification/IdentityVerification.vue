<template>
  <div class="identity">
    <header-bar text="实名认证" @back="back"></header-bar>
    <cross-line style="margin-top: 44px;"></cross-line>
    <div class="main">
      <p class="prompt-warp"><span class="warm-prompt">温馨提示：</span>以下真实姓名和证件信息，一旦通过认证，将无法修改，请认真填写！</p>
      <div class="personal-details">
        <div class="name fl">真实姓名：</div><div class="details-warp fl"><input type="text" v-model="realName"/></div>
        <div class="idcard fl">身份证号：</div><div class="details-warp fl"><input type="text" v-model="idCardNum"/></div>
      </div>
      <div class="passport-phone">
        <p class="title">证件照上传</p>
        <ul class="img_upload">
          <li class="first">
            <div>
              <div class="img"><img v-lazy="idCardFrontPortraitSrc==null?addPhoto:idCardFrontPortraitSrc" alt=""/></div>
              <input type="file" class="input3" @change="uploadImg($event,1)"/>
              <em>身份证图片</em>
            </div>
          </li>
          <li>
            <div>
              <div class="img"><img v-lazy="idCardBackPortraitSrc==null?addPhoto:idCardBackPortraitSrc" alt=""/></div>
              <input type="file" class="input3" @change="uploadImg($event,2)"/>
              <em>身份证图片(反面)</em>
            </div>
          </li>
          <li>
            <div>
              <div class="img"><img v-lazy="idCardHoldPortraitSrc==null?addPhoto:idCardHoldPortraitSrc" alt=""/></div>
              <input type="file" class="input3" @change="uploadImg($event,3)"/>
              <em class="mb20">身份证图片(手持)</em>
            </div>
          </li>
        </ul>
        <p class="title mt20">名片上传（可选）</p>
        <ul class="img_upload">
          <li class="first">
            <div>
              <div class="img"><img v-lazy="nameCardFrontSrc==null?addPhoto:nameCardFrontSrc" alt=""/></div>
              <input type="file" class="input3" @change="uploadImg($event,4)"/>
              <em class="mb20">名片正面照片</em>
            </div>
          </li>
          <li>
            <div>
              <div class="img"><img v-lazy="nameCardBackSrc==null?addPhoto:nameCardBackSrc" alt=""/></div>
              <input type="file" class="input3" @change="uploadImg($event,5)"/>
              <em class="mb20">名片背面照片</em>
            </div>
          </li>
        </ul>
        <div class="btn" @click="submit1">提交审核</div>
      </div>
    </div>
  </div>

</template>

<script>
  import HeaderBar from '@/components/base/header-bar/header-bar'
  import CrossLine from '@/components/base/cross-line/cross-line';
  import tool from '@/api/tool';
  import { Indicator } from 'mint-ui';

  export default {
    components: {
      HeaderBar,
      CrossLine,
      tool
    },
    data (){
      return {
        headTitle: '',
        addPhoto: require('../img/add-photo.png'),
        realName: '',
        idCardNum: '',
        idCardFrontPortraitSrc: null,
        idCardBackPortraitSrc: null,
        idCardHoldPortraitSrc: null,
        nameCardFrontSrc: null,
        nameCardBackSrc: null,

        idCardFrontPortraitFileId: '',
        idCardBackPortraitFileId: '',
        idCardHoldPortraitFileId: '',
        nameCardFrontFileId: '',
        nameCardBackFileId: ''
      }
    },
    methods: {
      back () {
        window.history.back()
      },

      uploadImg (e, tag) {
        var files = e.target.files || e.dataTransfer.files;
        if (!files.length)
          return;
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
              let temp = res.data.data[0]
              switch (tag){
                case 1:
                  this.idCardFrontPortraitSrc = temp.url;
                  this.idCardFrontPortraitFileId = temp.fileId;
                  break;
                case 2:
                  this.idCardBackPortraitSrc = temp.url;
                  this.idCardBackPortraitFileId = temp.fileId;
                  break;
                case 3:
                  this.idCardHoldPortraitSrc = temp.url;
                  this.idCardHoldPortraitFileId = temp.fileId;
                  break;
                case 4:
                  this.nameCardFrontSrc = temp.url;
                  this.nameCardFrontFileId = temp.fileId;
                  break;
                case 5:
                  this.nameCardBackSrc = temp.url;
                  this.nameCardBackFileId = temp.fileId;
                  break;
              }
              Indicator.close();
            }
          });

      },
      submit1 () {
        let params = new URLSearchParams();
        params.append('name', tool.getuser());
        params.append('realName', this.realName);
        params.append('idCardNum', this.idCardNum);
        params.append('idCardFrontPortraitFileId', this.idCardFrontPortraitFileId);
        params.append('idCardBackPortraitFileId', this.idCardBackPortraitFileId);
        params.append('idCardHoldPortraitFileId', this.idCardHoldPortraitFileId);
        params.append('nameCardFrontFileId', this.nameCardFrontFileId);
        params.append('nameCardBackFileId', this.nameCardBackFileId);
        this.axios.post(tool.domind() + '/gateway/userAuth/saveUserAuth', params)
          .then(res => {
            if (res.data.code > 100 & res.data.code < 200) {
              tool.toast(res.data.msg);
            }else if (res.data.code === 200) {
              this.$router.push({path: '/mine/identity?tag=1'});
            }
          })
      }
    },
    created () {
    }
  }
</script>

<style type="text/scss" lang="scss" scoped>
  @import '~@/assets/scss/mixin.scss';
  @import '~@/assets/scss/const.scss';
  .main{
    text-align: left;
    padding-top:17px;
    .prompt-warp{
      padding: 0 10px 17px;
      @include onepx("bottom");
      font-size: 15px;
      color:#333;
      height:42px;
      line-height: 21px;
      .warm-prompt{
        color:#fdb140;
      }
    }
    .personal-details{
      margin: 0 10px 20px;
      padding-top: 20px;
      @include onepx("bottom");
      font-size: 14px;
      color:#333;
      overflow: hidden;
      .name{
        width: 25%;
        height:30px;
        line-height: 30px;
        margin-bottom:20px; ;
      }
      .idcard{
        width: 25%;
        height:30px;
        line-height: 30px;
      }
      .details-warp{
        width:75%;
        height:30px;
        box-sizing: border-box;
        border: 1px solid #dedede;
        border-radius: 3px;
        margin-bottom: 20px;
        input{
          border: none;
          outline:none;
          width: 100%;
          height:100%;
        }
      }

    }
    .passport-phone{
      padding: 0 10px;
      .title{
        font-size: 16px;
        height:16px;
        line-height: 16px;
        color:#333;
        margin-bottom: 11px;
      }
      .mt20{margin-top: 20px;}
      .img_upload{
        overflow: hidden;
        @include onepx("bottom");
        li{
          float: left;
          position: relative;
          width:48.7%;
          .img{
            width: 100%;
            height:109px;
            line-height: 109px;
            text-align: center;
            background: #eee;
            img{
              width: 100%;
              height:100%;
            }
          }
          input{
            position: absolute;
            width:100%;
            height:109px;
            top:0;
            left: 0;
            opacity: 0;
          }
          em{
            display: block;
            width:100%;
            font-size: 13px;
            color:#333;
            height:13px;
            line-height: 13px;
            margin: 10px auto 15px;
            font-style: normal;
            text-align: center;
          }
          .mb20{
            margin-bottom: 20px;
          }

        }
        .first{
          margin-right: 2.5%;
        }
      }
    }
  }
</style>

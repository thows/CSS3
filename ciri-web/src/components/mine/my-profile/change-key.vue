<template>
<div class="change-key ping-bg">
  <header-bar :text="headTitle" @back="back"></header-bar>
  <cross-line style="margin-top: 44px;"></cross-line>
  <div class="change">
    <input type="text" v-model="info"/>
  </div>
  <div class="btn" @click="updateUserInfo">保存</div>
</div>
</template>

<script>
  import HeaderBar from '@/components/base/header-bar/header-bar'
  import CrossLine from '@/components/base/cross-line/cross-line'
  import tool from '@/api/tool'
  export default {
    components: {
      HeaderBar,
      CrossLine,
      tool
    },
    data(){
      return {
        headTitle : '',
        info:''
      }
    },
    methods: {
      back() {
        window.history.back()
      },
      updateUserInfo(){
        let params = new URLSearchParams();
        let flag = this.$route.params.id;
        params.append("name",tool.getuser());
        params.append(flag,this.info);
        this.axios
          .post(tool.domind() + "/gateway/user/updateUserBasicInfo" ,params)
          .then(res => {
            if (res.data.code === 200) {
              tool.toast("修改个人信息成功");
              window.history.back();
            }else {
              tool.toast("修改个人信息失败");
            }
          });
      }
    },
    created () {
      let flag=this.$route.params.id;
      //截取url参数
      let url = window.location.href;
      url=decodeURI(url);
      let vs = url.split('/');
      let last = vs.pop();
      if (last !== 'null' && last !== '') {
        this.info=last;
      }

      if( flag=='realName' ){
        this.headTitle ='修改姓名'
      }else if(flag=='corpName'){
        this.headTitle ='修改公司'
      }else if(flag=='department'){
        this.headTitle ='修改部门'
      } else if(flag=='jobTitle'){
        this.headTitle ='修改职位'
      } else if(flag =='corpAddress'){
        this.headTitle ='修改地址'
      }
    }
  }
</script>

<style type="text/scss" lang="scss" scoped>
  @import '~@/assets/scss/mixin.scss';
  @import '~@/assets/scss/const.scss';
.change{
  background: #fff;
  border: 1px solid #dedede;
  margin:0 10px 55px;
  padding:0 15px;
  border-radius: 3px;
  input{
    font-size: 13px;
    height:35px;
    line-height:35px;
    color:#333;
    outline: none;
    border: none;
    width: 100%;

  }
}
  .btn{
    width: 150px;
    color:#fefeff;
    margin: 0 auto;
  }
</style>

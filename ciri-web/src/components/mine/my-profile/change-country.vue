<template>
  <div :class="changeCountry">
    <header-bar text="修改国家" btnShow="true" @back="back" @saveInfo="updateUserInfo"></header-bar>
    <cross-line style="margin-top: 44px;"></cross-line>
    <div class="main">
      <div class="change">
        <div class="fl" v-text="chooseCountry">请选择国家</div>
        <div class="fr">
          <i :class="showCountry" @click="Country"></i>
        </div>
      </div>
      <div class="country-warp" v-show="show">
        <div class="country" @click="choose($event,item)"  v-for="(item,index) in country" :key="index">
          {{item.name}}
        </div>
      </div>
    </div>
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
        showCountry : 'show-country',
        show : true,
        country : [{name:'中国',id:"11156"},{name:'日本',id:"11392"},{name:'伊朗',id:"15364"},{name:'巴西',id:"73076"}],
        chooseCountry :'请选择国家',
        chooseCountryId :'',
        changeCountry : 'change-country'
      }
    },
    methods: {
      back() {
        window.history.back()
      },
      Country(){
        this.show = !this.show
        if(this.show){
          this.showCountry= 'show-country';
          this.changeCountry = 'change-country'
        }else {
          this.showCountry= 'hide-country';
          this.changeCountry = 'change-country ping-bg'
        }
      },
      choose (e ,item) {
        //回显
        this.chooseCountry = item.name;
        this.chooseCountryId = item.id;
        this.Country();
      },
      updateUserInfo(){
          //修改国家信息
          let params = new URLSearchParams();
          params.append("name",tool.getuser());
          params.append("countryId",this.chooseCountryId);
          this.axios
            .post(tool.domind() + "/gateway/user/updateUserBasicInfo" ,params)
            .then(res => {
              if (res.data.code === 200) {
                tool.toast("修改国家成功");
                window.history.back();
              }else {
                tool.toast("修改国家失败,请重新选择");
              }
            });
        }
    },
    created () {
      let flag=this.$route.params.id;
      //判断用户是否已经选择国家
      if(flag != null && flag !=='' && flag !="null"){
        this.chooseCountry=flag;
      }
      //查询所有的国家信息
      this.axios
        .get(tool.domind() + "/gateway/app/getAllCountry")
        .then(res => {
          if (res.data.code === 200) {
            this.country = res.data.data;
          }
        });
    }
  }
</script>

<style type="text/scss" lang="scss" scoped>
  @import '~@/assets/scss/mixin.scss';
  @import '~@/assets/scss/const.scss';
  .change-country{
    background: #f5f5f5;
    .main{
      margin: 0 10px;
      background: #fff;
      text-align: left;
      border:1px solid #dedede;
      border-bottom: none;
      color:#333;
      .change{
        overflow: hidden;
        height:35px;
        line-height: 35px;
        border-bottom:1px solid #dedede;
        font-size: 13px;
        padding: 0 15px;
        i{
          display: block;
          float:right;
          width: 18px;
          height: 35px;
          background-repeat: no-repeat;
          background-size: 18px auto;
          background-position: center;

        }
        .show-country{
          @include bg-image("../img/show-country");
        }
        .hide-country{
          @include bg-image("../img/hide-country");
        }
      }
      .country{
        height:40px;
        line-height: 40px;
        padding:0 15px;
        border-bottom: 1px dashed #dedede;
        font-size: 14px;
      }
    }
    .btn-warp{
      overflow: hidden;
      .change-save{
        width:150px;
        margin: 65px auto;
      }
    }
  }
</style>

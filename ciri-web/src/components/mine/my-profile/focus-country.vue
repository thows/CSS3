<template>
  <div :class="changeCountry">
    <header-bar :text="headTitle" btnShow="true" @back="back" @saveInfo="submit"></header-bar>
    <cross-line style="margin-top: 44px;"></cross-line>
    <div class="main">
      <div class="change">
        <div class="fl">{{title}}</div>
        <div class="fr">
          <i :class="showCountry" @click="Country"></i>
        </div>
      </div>

      <form @submit.prevent="submit">
        <div class="country-warp">
          <div class="country" v-show="show">
            <div :class="checked(item)" class="fl item" @click.prevent="checkCountry($event,item)"
                 v-for="item in country" :key="item.id" :ids="item.id">
              <i class="icon-check">
                <input type="checkbox" name="country" :value="item.id" :id="item.id" v-model="isread"/>
              </i>
              <span>{{item.name.substr(0,8)}}</span>
            </div>
          </div>
        </div>
      </form>
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
    data() {
      return {
        headTitle: '',
        title: '',
        showCountry: 'show-country',
        country: [{name: '中国', id: "11156"}, {name: '日本', id: "11392"}, {name: '伊朗', id: "15364"}, {
          name: '巴西',
          id: "73076"
        }],
        show: true,
        iconChecked: 'icon-checked',
        isread: false,
        unread: true,
        arrs: [],
        hobby:'',
        changeCountry:'change-country'
      }
    },
    methods: {
      checked(ik) {

        let t = this.arrs.filter(value => {
          if (ik.id == value) {
            return true;
          }
        })
        if (t.length > 0) {
          return 'active'
        }
      },
      submit() {
        let parms = new URLSearchParams();
        parms.append(this.hobby, this.arrs.join(','))
        parms.append('name', tool.getuser())
        this.axios
          .post(tool.domind() + "/gateway/user/updateUserBasicInfo",parms)
          .then(res => {
            if (res.data.code === 200) {
              tool.toast("修改成功");
              window.history.back();
            }
          });
      },
      back() {
        window.history.back()
      },
      Country() {
        this.show = !this.show
        if (this.show) {
          this.showCountry = 'show-country';
          this.changeCountry ='change-country';
        } else {
          this.showCountry = 'hide-country';
          this.changeCountry ='change-country ping-bg';
        }
      },
      checkCountry(e, item) {
        let element = e.currentTarget;
        if (element.classList.contains('active')) {
          element.classList.remove('active');
          this.arrs = this.arrs.filter(value => value !== e.currentTarget.getAttribute("ids"))

        } else {
          element.classList.add('active')
          this.arrs.push(e.currentTarget.getAttribute("ids"));
        }
      }

    },
    created() {
      //判断标题
      let url = window.location.href;
      url=decodeURI(url);
      // alert(url);
      let vs = url.split('/');

      let last = vs.pop();
      let flag = vs.pop();
      if (last !== 'undefined' && last !== 'null' && last !== '') {
        vs = last.split(',')
        this.arrs = vs;
      }
      let path = '';
      if (flag === "careCountries") {
        this.headTitle = '关注国家';
        this.title = '请选择国家';
        path = "getAllCountry";
        this.hobby = 'careCountryStr'
      } else if (flag === 'careIndustries') {
        this.headTitle = '关注行业';
        this.title = '请选择行业';
        path = "getAllIndustry";
        this.hobby = 'careIndustryStr'
      }

      //查询所有的国家信息
      this.axios
        .get(tool.domind() + "/gateway/app/" + path)
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
    padding-bottom: 168px;
    .main {
      margin: 0 10px;
      background: #fff;
      text-align: left;
      border: 1px solid #dedede;
      border-bottom: none;
      color: #333;

      .change {
        overflow: hidden;
        height: 35px;
        line-height: 35px;
        border-bottom: 1px solid #dedede;
        font-size: 13px;
        padding: 0 15px;

        i {
          display: block;
          float: right;
          width: 18px;
          height: 35px;
          background-repeat: no-repeat;
          background-size: 18px auto;
          background-position: center;

        }

        .show-country {
          @include bg-image("../img/show-country");
        }

        .hide-country {
          @include bg-image("../img/hide-country");
        }

      }
      .country-warp{
        position: relative;
        .country {
          line-height: 40px;
          font-size: 14px;
          overflow: hidden;

          .item {
            width: 50%;
            height: 40px;
            line-height: 40px;
            border-bottom: 1px dashed #dedede;

            i {
              position: relative;
              display: inline-block;
              width: 12px;
              height: 40px;
              background-repeat: no-repeat;
              background-size: 12px auto;
              background-position: center;
              vertical-align: middle;
              margin-left: 15px;

              input[type="checkbox"] {
                position: absolute;
                top: 14px;
                left: 0;
                opacity: 0;
              }

            }
            .icon-check {
              @include bg-image("../img/check");
              margin-right: 10px;

            }

            span {
              height: 40px;
              line-height: 40px;
              display: inline-block;
            }

          }
          .active {

            .icon-check {
              @include bg-image("../img/checked");
              margin-right: 10px;
            }

          }
        }
        .btn-warp{
          background: #f5f5f5;
          position: absolute;
          bottom:-168px;
          width: 100%;
          .focus-save {
            width: 150px;
            margin: 65px auto;
            display: table;
          }
        }
      }

    }
  }
</style>

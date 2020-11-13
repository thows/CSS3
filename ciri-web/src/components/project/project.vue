<template>
  <div class="project-list bg-blank" :class="projectList">
    <div class="tab-offset" ref="tabOffset" id="tab-offset">
      <div class="banner">
        <h2>项目</h2>
        <div class="search-warp" id="search-warp">
          <div class="search" @click="searchFocus" :class="scrollSearch">
            <div class="search-box">
              <i class="icon-search" @click="search"></i>
              <input type="text" v-model="text" ref="inputSearch" placeholder="请搜索您想要的项目" @focus="popSwitch" @keyup.enter="search">
            </div>
          </div>
        </div>
      </div>
      <!--本周推荐-->
      <div class="project-rec">
        <!-- 轮播图 -->
        <div class="slider project-slider" id="slider1">
          <mt-swipe :auto="4000" :prevent="false" id="project-slider">
            <mt-swipe-item v-for="(project) in this.weekProjects" class="recommdnd-card" :key="project.projId">
              <router-link   :to="{path:'/project/project-land',query: {projId: project.projId}}">
                <img :src="project.url" :onerror="defaultImg(project.industryId)">
                <div class="status" v-text="project.status"></div>
                <p id="slider2">{{project.name.length>14 ? project.name.substr(0,14) +'...' : project.name}} </p>
                <div class="bg-slider"></div>
              </router-link>
            </mt-swipe-item>
          </mt-swipe>
        </div>
      </div>
    </div>
    <div class="project">
      <div class="tab-warp" id="tab-warp">
        <ul class="tab"  :class="searchBarFixed == true ? 'isFixed' :''">
          <li v-for="(item,index) in tabs" :class="{active:index == num}" @click="tab(index)">
            <span>{{item}}</span>
            <i></i>
          </li>
        </ul>

        <div class="pop-bg" id="pop-bg" v-show="popShow">
          <ul class="tab isFixed">
            <li v-for="(item,index) in tabs" :class="{active:index == num}" @click="tab(index)">
              <span>{{item}}</span>
              <i></i>
            </li>
          </ul>
          <div class="tabCon" v-show="popShow">
            <div class="content" v-for='(itemCon,index) in tabContents'
                 v-show=" index == num" :key="index">
              <form @submit.prevent="submit">
                <ul>
                  <!--:class="{active:activeSwitch}"-->
                  <li :id="all(index)" @click="allActive($event ,index)" class="active">全部
                    <input type="checkbox" value="全部"/>
                  </li>
                  <li v-for='(item,t) in itemCon' @click="liActive($event,item[0] ,index)" :id="t" :name="'li'+index"
                      :key="t">{{item[1]}}
                    <input type="checkbox"/>
                  </li>
                </ul>
                <div class="btn-warp clearfix">
                  <button class="small-btn reset fl" @click="resetActive(index)">重置</button>
                  <button class="small-btn confirm fr" @click="init1">确定</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <Loading v-if="notloading"></Loading>
      <div class="main" v-else>
        <router-link v-for="(project) in this.projects" :key="project.projId"
                     :to="{path:'/project/project-land',query: {projId: project.projId}}">
          <div class="pro-list">
            <em class="icon-video" v-if="project.projVideoStatus"></em>
            <div class="img">
              <!--<div class="icon-state">认证中</div>-->
              <img :src="project.url" :onerror="defaultImg(project.industryId)" alt="">
              <i class="favorite icon-favorite"></i>
            </div>
            <div class="main-news">
              <div class="title">
                <div class="icon-quality fl" v-if="project.cornerTagName != null && project.cornerTagName != '无'">
                  {{project.cornerTagName!=null && project.cornerTagName != '无' ? project.cornerTagName.substr(0, 2):project.cornerTagName}}
                </div>
                <h2 class="fl" :class="{active:project.cornerTagName != null && project.cornerTagName != '无'}">{{project.name.length>30 ? project.name.substr(0, 30) + '...' : project.name}}</h2></div>
              <div class="tip-news">
                <i class="coun"></i>
                <span class="country">{{project.countryName.length>4 ? project.countryName.substr(0,4) : project.countryName}}</span>
                <i class="mold"></i>
                <span class="genre">{{project.constructionTypeName}}</span>
                <i class="shot"></i>
                <span class="count">{{project.status}}</span>
              </div>
            </div>
          </div>
        </router-link>
      </div>
      <button @click="loadMore()" :disabled="this.disabled" class="more" v-show="isIcon">
        <span v-text="moreText">{{this.moreText}}</span><i v-show="isIcon"></i>
      </button>
      <div class="tofooter" v-show="!isIcon">
        <em></em>
        <span>已经到底了，去别的栏目中逛逛吧</span>
      </div>
    </div>
    <div class="to-top" v-show="totopShow" @click="toTop">
      <em></em>
    </div>

    <tab-bar></tab-bar>
  </div>
</template>

<script>
  import TabBar from '@/components/base/tab-bar/tab-bar'
  import CrossLine from '@/components/base/cross-line/cross-line'
  import Nationality from '@/components/base/nationality/nationality'
  import Loading from '@/components/base/loading/loading'
  import tool from "@/api/tool";

  export default {
    components: {
      TabBar,
      CrossLine,
      Nationality,
      Loading
    },
    data() {
      return {
        projectList:'active',
        scrollSearch: 'fixed',
        searchBarFixed: false,
        totopShow:false,
        popShow: false,
        tabs: ["国别", "行业", "类型", "进度"],
        tabContents:
          [
            [[3, "绿地投资"], [4, "项目出售"], [5, "项目扩建"], [6, "其他"]],
            [[0, "规划阶段"], [1, "概念阶段"], [2, "审批阶段"], [3, "可研阶段"], [4, "投融资阶段"], [5, "建设阶段"], [6, "运营阶段"], [7, "出售阶段"]]
          ],
        num: 5,
        isIcon: true,
        activeSwitch: true,
        liSwitch: false,
        //加载数据
        moreText: '查看更多',
        projects: null,
        weekProjects: null,
        pageId: 1,
        status: [7],
        tag: [101001, 101002],
        disabled: false,
        notloading: true,
        countryList: [[15364, "伊朗"], [14398, "哈萨克斯坦"], [14860, "乌兹别克斯坦"], [73076, "巴西"], [12764, "泰国"], [12104, "缅甸"]],
        indestryList: [[1, "新能源"], [8, "市政环保"], [9, "农林牧渔"]],
        floatp : false,
        CornerTag: 1,
        i: [],
        c: [],
        m: [],
        t: [],
        text: ''
      }
    },
    props: {},
    watch:{
      popShow(newVal, oldVal) {
        if (newVal == true) {
          let cssStr = "overflow-y: hidden;height:100%;";
          document.getElementById('pop-bg').style.overflow ='hidden';
          // document.body.style.cssText = cssStr;
        } else {
          document.getElementById('pop-bg').style.overflow ='auto';
        }

        // 下面需要这两行代码，兼容不同浏览器
        // document.body.scrollTop = this.pageScrollYoffset;
        // window.scroll(0, this.pageScrollYoffset);
      }

    },
    methods: {
      search() {
        let path = '/search'
        if (!tool.isBank(this.text)) {
          path = path + '?text=' + this.text
        }
        this.$router.push({path: path});
      },
      toTop(){
        window.scroll(0,0);
      },
      searchFocus(){
        this.$refs.inputSearch.focus()
      },
      init1() {
        this.pageId = 1
        this.loadMore()
        this.searchBarFixed = false
        this.popShow = false
        let searchWarp = document.getElementById('search-warp');
        searchWarp.style.position = 'static';

      },
      loadMore() {
        this.$api.post('/pb/i/fetprojects', {
          pageId: this.pageId,
          pageSize: 10,
          industry: this.i,
          country: this.c,
          mature: this.m,
          userId: tool.getuser(),
          constructionTypeId: this.t
        }).then(r => {
          this.notloading = false;
          if (this.pageId == 1 || this.projects == null) {
            this.projects = r.data.list;
          } else {
            this.projects = this.projects.concat(r.data.list);
          }
          this.pageId = this.pageId + 1;
          if (r.data.list.length == 0 || r.data.list.length < 5) {
            this.moreText = '没有更多了';
            this.disabled = 'disabled';
            this.isIcon = false;
          } else {
            this.moreText = '查看更多';
            this.disabled = false;
          }
        });
      },
      // 国家列表
      country(path, type) {
        this.axios
          .get(tool.domind() + "/gateway/app/" + path)
          .then(res => {
            if (res.data.code === 200) {
              let country = res.data.data;
              country.forEach(v => {
                let temp = new Array()
                temp.push(v.id)
                temp.push(v.name)
                type.push(temp);
              });
            }
          });
        return this.type;
      },

      submit() {
      },
      //页面滚动时
      handleScroll() {
        let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
        let searchWarp = document.getElementById('search-warp');
        this.searchBarFixed = scrollTop > 350;
        // let opcaity = (scrollTop / 350 > 1) ? 1 : scrollTop / 350;

          // searchWarp.style.background = 'rgba(82,141,232,' + opcaity + ')';
        if(scrollTop<=90 && this.popShow == false){
          searchWarp.style.position = 'static';       }else {
          searchWarp.style.position = 'fixed';
        }

        if (scrollTop>100){
          this.totopShow=true;
        }else {
          this.totopShow=false;
        }
      },
      tab(index) {
        let d = this.$refs.tabOffset;
        scrollTo(0,d.offsetHeight);
        this.floatp=true;
        if(this.floatp){
          this.num = index;
          let searchWarp = document.getElementById('search-warp');
          // this.searchBarFixed = true
          this.popShow = true;
          if (searchWarp != null) {
            // searchWarp.style.background = 'rgba(82,141,232,1)';
          }
          this.projectList='active';
          this.floatp=false;
          searchWarp.style.position = 'fixed';
        }
      },
      liActive(e, v, index) {
        let all=document.getElementById('all'+index);
        if(all.classList.contains('active')){
          all.classList.remove('active');
        }
        console.log(index);
        let element = e.currentTarget;
        if (element.classList.contains('active')) {
          element.classList.remove('active');
          this.removeList(index, v)
        } else {
          this.addList(index, v)
          element.classList.add('active')
        }
        this.activeSwitch = false
      },

      popSwitch() {
        this.popShow = false;
        this.searchBarFixed = false
        this.projectList='active';
        searchWarp.style.position = 'static';
      },
      allActive(e, index) {
        console.log(index);
        let element = e.currentTarget
        if (element.classList.contains('active')) {
          element.classList.remove('active')
        } else {
          element.classList.add('active')
          this.resetActive(index)
        }
      },
      resetActive(index) {
        this.clearList(index)
        let all = document.getElementById('all' + index);
        all.classList.add('active')
        let lis = document.getElementsByName("li" + index);
        for (let i = 0; i < lis.length; i++) {
          if (lis[i].classList.contains('active')) {
            lis[i].classList.remove('active');
          }
        }
        this.liSwitch = false
      },
      all(index) {
        return 'all' + index;
      },
      removeList(index, v) {
        switch (index) {
          case 0:
            this.delList(this.c, v);
            break;
          case 1:
            this.delList(this.i, v);
            break;
          case 2:
            this.delList(this.t, v);
            break;
          case 3:
            this.delList(this.m, v);
            break;
        }
      },
      delList(array, v) {
        for (var i = 0; i < array.length; i++) {
          if (array[i] == v)
            return array.splice(i, 1)
        }
      },
      clearList(index) {
        switch (index) {
          case 0:
            this.c = []
            break;
          case 1:
            this.i = []
            break;
          case 2:
            this.t = []
            break;
          case 3:
            this.m = []
            break;
        }
      },
      addList(index, v) {
        switch (index) {
          case 0:
            this.c.push(v)
            break;
          case 1:
            this.i.push(v)
            break;
          case 2:
            this.t.push(v)
            break;
          case 3:
            this.m.push(v)
            break;
        }
      },
      //点赞
      likeProject(pro) {
        let projId = pro.project.projId;
        if (tool.getuser() == null) {
          tool.toast("登录状态下才能点赞")
          return
        }
        //不能重复点赞
        if (pro.project.likesStatus == true) {
          return;
        }
        pro.project.likesStatus = true;
        let likes=parseInt(pro.project.likes)+1;
        if(likes > 1000){
          pro.project.likes = '999+'
        }else {
          pro.project.likes = likes
        }
        this.$api.post('/pb/p/addLike', {projId: projId, userId: tool.getuser(), tag: 0}).then(r => {
          if (r.code == 200) {
          }
        });
      },
      defaultImg (index){
        if(index){
          return 'this.src="' + require('../index/img/p_'+index+'.jpg') + '"'
        }
      }
    },
    filters: {},
    computed: {},
    mounted() {
      // 本周推荐
      this.$api.post('/pb/i/fetprojects', {
        pageId: this.pageId,
        pageSize: 5,
        status: this.status,
        CornerTag: this.CornerTag,
        tag: this.tag,
        industryCategory: this.industryCategory
      }).then(r => {
        this.notloading = false;
        this.weekProjects = r.data.list;

      });
      // 默认图片
      this.defaultImg();
    },
    created() {
      //页面滚动时
      window.addEventListener('scroll', this.handleScroll);
      this.loadMore(this.pageId);
      // this.country('getAllCountry', this.countryList);
      // this.country('getAllIndustry', this.indestryList);
      this.tabContents.unshift(this.countryList, this.indestryList)
    },
    destroyed() {
      window.removeEventListener("scroll", this.handleScroll);

    }


  }
</script>

<style type="text/scss" lang="scss" scoped>
  @import '~@/assets/scss/reset.scss';
  @import '~@/assets/scss/const.scss';
  @import '~@/assets/scss/mixin.scss';

  .project-list {
    min-height: 627px;
    background:#f5f5f5 ;
    &.active{
      overflow: hidden;
    }
    header {
      height: 44px;
      line-height: 44px;
      color: #fff;
      font-size: 20px;
      text-align: center;
      background: #528de8;
      position: fixed;
      top: 0;
      z-index: 999;
      width: 100%;
    }
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
    .isFixed {
      position: fixed;
      top: 0;
      z-index: 999;
      width: 100%;
      box-sizing: border-box;
    }
    .banner {
      width: 100%;
      height: 100px;
      position: relative;
      background: #fff;
      padding-top: 40px;
      h2{
        margin: 0 10px 0;
        font-size: 30px;
        line-height: 30px;
        height:30px;
        font-weight: bold;
        color:#333;
        text-align: left;
      }
      .search-warp {
        /*position: fixed;*/
        top: 0;
        z-index: 999;
        left: 0;
        right: 0;
        padding: 20px 0 8px;
        background: #fff;
      }
      .search {
        width: 94.7%;
        height: 30px;
        border-radius: 30px;
        margin: auto;
        left: 0;
        right: 0;
        background: #f1f1f1;
        text-align: left;
        .search-box{
          margin: auto;
          display: table;
          .icon-search {
            display: inline-block;
            width: 13px;
            height: 13px;
            background-size: 13px auto;
            background-repeat: no-repeat;
            margin-right: 10px;
            background-image: url('./img/search.png');
            position: relative;
            top: 2px;
          }
          input {
            height: 30px;
            width: 107px;
            border: none;
            outline: none;
            background: #f1f1f1;
            font-size: 12px;
            color:#444;

          }
          input::-webkit-input-placeholder{
            color:#999;
          }
        }
      }
    }
    .project-rec {
      padding: 0 10px 15px;
      background: #fff;
      .slider{
        touch-action: none;
        height: 199px;
        font-size: 30px;
        text-align: center;
        overflow: hidden;
        img {
          width: 100%;
          height: 100%;
        }
        .status{
          position: absolute;
          top:20px;
          left:0;
          padding: 4px 8px;
          font-size: 11px;
          color:#fff;
          background: #fdb140;
          border-radius: 0 38px 38px 0;

        }
        #slider2 {
          font-size: 16px;
          font-weight: 600;
          color: #fff;
          height: 36px;
          line-height: 18px;
          margin-top: -34px;
          padding: 0px 10px;
          text-align: left;
          width: 214px;
          text-overflow:ellipsis;
          white-space : nowrap;
          overflow : hidden;
          /*background: rgba(51,51,51,.5);*/
          z-index: 11;
          position: relative;
        }
      }
      #slider1 {
        position: relative;
        .mint-swipe-indicators {
          right: 10px;
        }
        .bg-slider{
          background: rgba(51,51,51,.5);
          position:absolute;
          bottom: 0;
          left: 0;
          width:100%;
          height:35px;
          z-index: 10;
        }
      }
    }
    .project {
      background: #fff;
      .tab-warp {
        height: 35px;
        .tab {
          display: flex;
          flex-direction: row;
          height: 35px;
          line-height: 35px;
          padding: 0 4.5%;
          background: #fff;
          li {
            flex: 1;
            width: 16%;
            margin-right: 9%;
            height: 25px;
            line-height: 25px;
            margin-top: 5px;
            border-radius: 25px;
            &:last-child {
              margin-right: 0;
            }
            span {
              font-size: 14px;
              color: #333;

            }
            i {
              display: inline-block;
              width: 6px;
              height: 6px;
              background-size: 6px auto;
              background-position: center;
              background-repeat: no-repeat;
              vertical-align: middle;
              margin-top: -3px;
              @include bg-image('./img/country-packup');

            }
            &.active {
              i {
                @include bg-image('./img/country-more');
              }
            }
          }
        }
        .tab.isFixed {
          position: fixed;
          background-color: #Fff;
          top: 50px;
          z-index: 999;
          width: 100%;
          box-sizing: border-box;
        }
        .pop-bg {
          z-index: 998;
          padding: 0;
        }
        .tabCon {
          z-index: 999;
          position: fixed;
          top: 85px;
          width: 100%;
          min-height: 150px;
          .content {
            background: #fff;
            text-align: left;
            padding: 10px 10px 16px;
            ul {
              overflow: scroll;
              max-height: 350px;
              li {
                padding: 4px 13px;
                border: 1px solid #999;
                font-size: 14px;
                color: #999;
                border-radius: 2px;
                margin-right: 10px;
                margin-bottom: 16px;
                display: inline-block;
                position: relative;
                &.active {
                  background: #528de8;
                  color: #fff;
                  border: 1px solid #333;
                }
                input {
                  position: absolute;
                  top: 0;
                  left: 0;
                  width: 100%;
                  height: 100%;
                  opacity: 0;
                }

              }
            }
            .btn-warp {
              color: #fff;
              font-size: 15px;
              box-sizing: border-box;
              margin: 8px 0 0;
              .reset {
                background: #5c5c5c;
                width: 35.8%;
                height: 37px;
                line-height: 37px;
                margin: 0;
                margin-right: 2.8%;
                display: inline-block;
              }
              .confirm {
                width: 61.4%;
                height: 37px;
                line-height: 37px;
                margin: 0;
                display: inline-block;
              }
            }

          }
        }
      }
      .main {
        padding: 0 10px;
        background: #fff;
        .pro-list {
          padding: 15px 0 15px 132px;
          position: relative;
          height: 83px;
          @include onepx('bottom');
          .icon-video{
            width:12px;
            height:12px;
            display: block;
            position: absolute;
            bottom:20px;
            left:5px;
            background-size: 12px auto;
            background-image: url("./img/icon-video.png");
            z-index: 1;
          }
          .img {
            width: 118px;
            height: 83px;
            position: absolute;
            top: 15px;
            left: 0;
            img {
              width: 100%;
              height: 100%;
            }
            .icon-state {
              position: absolute;
              left: 5px;
              top: 5px;
              font-size: 9px;
              color: #fff;
              background: #27caa0;
              border-radius: 3px;
              padding: 1px 2px;
              text-align: center;
            }
          }
          .video {
            width: 12px;
            height: 12px;
            background-repeat: no-repeat;
            @include bg-image("../base/img/video-left");
            background-size: 12px auto;
            background-position: center;
            position: absolute;
            top: 58px;
            left: 5px;
          }
          .main-news {
            position: relative;
            height: 76px;
            .title {
              overflow: hidden;
              line-height: 24px;
              height:48px;
              position: relative;
              text-align: left;
              margin-bottom: 27px;
              margin-top: -4px;
              .icon-quality {
                color: #fff;
                font-size: 11px;
                background: #fdb140;
                padding: 0px 3px;
                height:16px;
                line-height: 16px;
                text-align: center;
                margin-right: 5px;
                margin-top: 4px;
                border-radius: 2px;
                position: absolute;
                top:0;
                left:0;

              }

              h2 {
                font-size: 16px;
                color: #333;
                &.active{
                  text-indent:40px;
                }
              }

            }
            .tip {
              overflow: hidden;
              font-size: 9px;
              color: #333;
              margin: 5px 0;

              .red {
                height: 14px;
                width: 50px;
                line-height: 14px;
                font-size: 9px;
                margin-right: 5px;
                text-align: center;
                border: 1px solid #ff0000;
              }

              .yellow {
                height: 14px;
                width: 50px;
                line-height: 14px;
                margin-right: 5px;
                text-align: center;
                border: 1px solid #fdb140;

              }

            }
            .maturity {
              text-align: left;
              margin: 5px 0 10px;
              height: 14px;
              line-height: 1;
              p {
                float: left;
                font-size: 11px;
                color: #666;
                &:first-child {
                  @include right-bar(-10px, 14px);
                  margin-right: 20px;
                  &:after {
                    top: -2px;
                  }
                }
                em {
                  font-size: 12px;
                  color: #528de8;
                }
              }
            }
            .tip-news {
              height: 12px;
              position: absolute;
              left: 0;
              width: 100%;
              i {
                display: block;
                float: left;
                margin-right: 3px;
                width: 12px;
                height: 12px;
                background-size: 12px auto;
              }
              .coun {
                background-image: url("./img/country.png");
              }
              .mold {
                background-image: url("./img/mold.png");
              }
              .shot {
                background-image: url("./img/shot.png");
              }
              .dz-wrap {
                border: 1px solid #dedede;
                border-radius: 14px;
                color: #999;
                padding: 0 2px;
                font-size: 10px;
                position: absolute;
                right: 5px;
                z-index: 99;
                height: 16px;
                line-height: 16px;
                .dz-count{
                  font-size: 12px;
                  height: 12px;
                  display: inline-block;
                  margin-top: 2px;
                }
                &.active{
                  border: 1px solid #528de8;
                  background-color: #528de8;
                  .icon-dz{
                    @include bg-image("../index/img/thumb-uped");
                  }
                  .dz-count{
                    color: #fff;
                  }
                }
                .icon-thumbup {
                  @include bg-image("./img/thumbs-up");
                  display: inline-block;
                  width: 10px;
                  height: 10px;
                  line-height: 10px;
                  background-repeat: no-repeat;
                  background-size: 10px auto;
                  background-position: center;
                  margin: 3px 2px 0px 5px;
                }
              }
              span {
                float: left;
                margin-right: 10px;
                font-size: 12px;
                line-height: 12px;
                color: #666;
                margin-top: 1px;
              }
            }
          }
        }
      }
      .more {
        font-size: 12px;
        color: #3f80e9;
        margin-top: 20px;
        text-align: center;
        background: #fff;
        margin-bottom: 60px;

        i {
          display: inline-block;
          width: 12px;
          height: 12px;
          @include bg-image("../news/img/more");
          background-size: 12px auto;
          margin-left: 6px;
        }
      }
      .tofooter{
        font-size: 11px;
        color:#999;
        height:11px;
        line-height: 11px;
        padding: 38px 0 93px;
        background: #f5f5f5;
        position: relative;
        span{
          padding: 0 5px;
          background: #f5f5f5;
          display: table;
          margin: -5px auto 0;
        }
        em{
          margin-right: 20px;
          border-bottom: 1px solid #eee;
          display: block;
          width: 100%;
          z-index: 1;
        }
      }
    }
    .to-top{
      width:20px;
      height:20px;
      position: fixed;
      bottom:63px;
      right:10px;
      padding: 13.5px;
      border-radius: 50%;
      background-color: #fff;
      border: 1px solid #dedede;
      box-shadow: 1px 1px 20px 0 rgba(46,61,73,.2);
      em{
        width:20px;
        height:20px;
        display: block;
        background-size: 20px auto;
        background-image:url("./img/totop.png") ;
      }
    }
  }

</style>

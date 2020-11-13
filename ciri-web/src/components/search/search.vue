<template>
  <div id="search">
    <div class="header-warp">
      <div class="header-bar gradient">
        <i class="icon-back" @click="back"></i>
        <h1>资讯详情</h1>
      </div>
    </div>
    <div class="search-warp" id="search-warp">
      <div class="search-box">
        <i class="icon-search" @click="searchKey"></i>
        <input type="text" placeholder="搜索项目" v-model="searchValue" @keyup.enter="searchKey">
        <i class="search-cancel" @click="searchCancel" v-show="this.searchValue"></i>
      </div>
    </div>
    <div class="main">
      <div class="hot-search" v-show="keyword">
        <div class="title">热门搜索</div>
        <ul class="clearfix">
          <li @click="search('新能源')">新能源
            <div class="line"></div>
          </li>
          <li @click="search('水电')">水电
            <div class="line"></div>
          </li>
          <li @click="search('农业')">农业</li>
          <li @click="search('伊朗')">伊朗
            <div class="line"></div>
          </li>
          <li @click="search('巴西')">巴西
            <div class="line"></div>
          </li>
          <li @click="search('哈萨克斯坦')">哈萨克斯坦</li>
        </ul>
      </div>
      <SearchList ref="ccc" v-show="!keyword" :ent="this.ent" :isRightAwaySearch="this.isRightAwaySearch"
                  :searchValue="this.searchValue"></SearchList>
    </div>
  </div>
</template>

<script>
  import HeaderBar from '@/components/base/header-bar/header-bar'
  import SearchList from '@/components/search/search-list'
  import tool from "@/api/tool";

  export default {
    components: {
      HeaderBar,
      SearchList
    },
    data() {
      return {
        searchValue: '',
        ent: true,
        keyword: true,
        isRightAwaySearch: false
      }
    },
    props: {},
    watch: {},
    methods: {
      back() {
        window.history.back()
      },
      search(val){
        this.searchValue = val;
        this.isRightAwaySearch = !this.isRightAwaySearch;
        this.keyword = false;
      },
      searchKey() {
        if (this.searchValue) {
          this.keyword = false;
        }
        this.ent = !this.ent;
      },
      searchCancel() {
        this.searchValue = '';
      }
    },
    filters: {},
    computed: {},
    created() {
    },
    mounted() {
      let temp = this.$route.query.text
      if (!tool.isBank(temp)){
        this.searchValue = temp;
        this.searchKey();
      }
    },
    destroyed() {
    }
  }
</script>

<style lang="scss" scoped>
  @import '~@/assets/scss/reset.scss';
  @import '~@/assets/scss/mixin.scss';
  @import '~@/assets/scss/const.scss';

  #search {
    padding-top: 44px;
    .header-warp {
      height: 44px;
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      z-index: 998;
      .header-bar {
        height: 44px;
        line-height: 44px;
        color: #fff;
        font-size: 14px;
        text-align: center;
        position: relative;
        padding: 0 10px;
        h1 {
          color: #fff;
          font-size: 20px;
        }
        .icon-back {
          display: block;
          float: left;
          width: 22px;
          height: 22px;
          margin: 11px auto;
          @include bg-image("../news/img/back");
          background-size: 22px auto;
          margin-right: 10px;
        }
      }
    }
    .search-warp {
      position: fixed;
      top: 0;
      z-index: 999;
      left: 0;
      right: 0;
      padding: 6px 0;
      margin: 0 10px 0 42px;
      .search-box {
        width: 100%;
        height: 30px;
        border-radius: 30px;
        margin: auto;
        left: 0;
        right: 0;
        background: #fff;
        text-align: left;
        .icon-search {
          display: inline-block;
          width: 15px;
          height: 15px;
          background-size: 15px auto;
          background-repeat: no-repeat;
          margin: 0 10px 0 12px;
          @include bg-image('../project/img/icon-search');
          position: relative;
          top: 4px;

        }
        .search-cancel {
          display: inline-block;
          width: 15px;
          height: 15px;
          background-size: 15px auto;
          background-repeat: no-repeat;
          margin: 8px 15px 0 0;
          @include bg-image('../index/img/search-cancel');
          position: relative;
          float: right;
          &.hidden{
             display:none;
          }
        }
        input {
          height: 30px;
          width: 70%;
          border: none;
          outline: none;

        }
      }
    }
    .main {
      .hot-search {
        padding: 50px 10px 0;
        .title {
          font-size: 14px;
          color: #666;
          line-height: 1;
        }
        ul {
          margin-top: 18px;
          li {
            float: left;
            width: 33.33%;
            font-size: 16px;
            color: #528de8;
            line-height: 1;
            position: relative;
            margin: 12px 0;
            .line {
              position: absolute;
              right: 0;
              top: 0;
              width: 1px;
              height: 15px;
              background: #b6d3ff;

            }

          }
        }
      }
    }
  }

</style>

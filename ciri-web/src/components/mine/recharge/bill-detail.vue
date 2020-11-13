<template>
  <div class="bill-detail">
    <div class="header-bar">
      <i class="icon-back" @click="back"></i>
      <h1>账单明细</h1>
    </div>
    <div class="bill-item clearfix" v-if="billList!=null && billList.length>0" v-for="(bill,index) in billList" :key="index">
      <div class="detail fl">
        <div>{{bill.typeStr}}</div>
        <div class="time">{{bill.createTime|time}}</div>
      </div>
      <div class="count fr"><span>{{bill.operatingStr=='增加'?'+':'-'}}</span>{{bill.amount}}</div>
    </div>

    <div class="more">
      <span @click='seeMoreBill' v-text="moreText">查看更多</span><i v-show="isIcon"></i>
    </div>

  </div>

</template>

<script>
  import HeaderBar from '@/components/base/header-bar/header-bar'
  import CrossLine from '@/components/base/cross-line/cross-line'
  import tool from "@/api/tool"
  import moment from 'moment'

  export default {
    components: {
      HeaderBar,
      CrossLine,
      tool
    },
    data() {
      return {
        page: 1,
        pageSize: 20,
        billList: null,
        moreText: '查看更多',
        isIcon: true
      }
    },
    methods: {
      back() {
        window.history.back()
      },
      seeMoreBill() {
        if(!this.isIcon){
          return
        }
        this.$api.post(tool.domind() + "/gateway/ah/s0/member/getGoldDetailsByUser", {
          pageId: this.page,
          pageSize: this.pageSize
        }).then(res => {
            if (res.code === 200) {
              if (this.page == "1") {
                this.billList = res.data;
              } else {
                this.billList = this.billList.concat(res.data);
              }
              if (this.billList.length < res.total) {
                this.moreText = '查看更多';
              } else {
                this.moreText = '没有更多了';
                this.isIcon = false;
              }
            }
            this.page += 1;
          });
      }

    },
    created() {

    },
    mounted() {
      this.seeMoreBill();
    },
    filters: {
      time(time) {
        return moment(time).format("YYYY-MM-DD HH:mm:ss");
      }
    }
  }
</script>

<style type="text/scss" lang="scss" scoped>
  @import '~@/assets/scss/mixin.scss';
  @import '~@/assets/scss/const.scss';

  .bill-detail {
    .header-bar {
      height: 44px;
      line-height: 44px;
      font-size: 14px;
      text-align: center;
      position: relative;
      @include onepx('bottom');
      h1 {
        font-size: 20px;
      }

      .icon-back {
        display: block;
        float: left;
        width: 22px;
        height: 22px;
        margin: 11px auto;
        @include bg-image("../../base/header-bar/icon-arrow_lift");
        background-size: 22px auto;
      }

    }
    .bill-item {
      padding: 20px 10px 20px 20px;
      height: 38px;
      text-align: left;
      font-size: 15px;
      color: #333;
      border-bottom: 1px solid #dedede;
      .time {
        font-size: 13px;
        color: #666;
        line-height: 23px;
      }
      .count {
        line-height: 38px;
        color: #528de8;
        font-size: 16px;
        text-align: left;
        width: 60px;
      }
    }
    .more {
      font-size: 12px;
      color: #3f80e9;
      margin: 20px 0;
      text-align: center;

      i {
        display: inline-block;
        width: 12px;
        height: 12px;
        @include bg-image("../../news/img/more");
        background-size: 12px auto;
        margin-left: 6px;
      }
    }

  }

</style>

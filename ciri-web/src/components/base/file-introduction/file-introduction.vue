<template>
  <div class="file">
    <i class="icon-type icon-pdf"></i>
    <span class="file-title">{{file.fileName.length >15 ? file.fileName.substr(0,15)+'...'+file.fileName.replace(/.+\./, "") :file.fileName}}</span>
    <!--<span class="file-title">{{file}}</span>-->
    <div class="delete-warp">
      <i class="icon-delete" v-show="deleteShow" @click="Delete"></i>
      <div v-show="!deleteShow" class="btn-warp"><span class="cancel" @click="Cancel">取消</span><span class="confirm" @click="deleteFile">确定</span></div>
    </div>
    <div class="introduction">
      文件说明： <input type="text" v-model="file.val" @change="textChange"/>
    </div>
  </div>
</template>

<script>
  export default {
    components: {
    },
    data() {
      return {
        deleteShow : true,
        // val: '',
      }
    },
    props: ["file","index","tag"],
    watch: {},
    methods: {
      Delete () {
        this.deleteShow = false ;
      },
      Cancel () {
        this.deleteShow = true ;
      },
      //删除文件返回方法
      deleteFile(){
        this.$emit('delete',{index:this.index,tag:this.tag});
      },
      textChange(){
        this.$emit('update',{index:this.index,tag:this.tag,val:this.file.val});
      }
    },
    filters: {},
    computed: {},
    created() {
    },
    mounted() {
    },
    destroyed() {
    }
  }
</script>

<style type="text/scss" lang="scss" scoped>
  @import '~@/assets/scss/reset.scss';
  @import '~@/assets/scss/mixin.scss';
  .file{
    padding: 11px 10px;
    line-height: 13px;
    position: relative;
    padding-left: 28px;
    background: #f5f5f5;
    border-bottom: 1px solid #dedede;
    &:first-child{
      margin-top: 10px;
    }
    &:last-child{
      border-bottom:none;
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
        @include bg-image("../../project/img/pdf");
      }
      &.icon-jpg{
        @include bg-image("../../project/img/jpg");
      }
      &.icon-ppt{
        @include bg-image("../../project/img/ppt");
      }
      &.icon-xls{
        @include bg-image("../../project/img/xls");
      }
    }
    .file-title{
      display: inline-block;
      line-height: 13px;
      font-size: 11px;
      color: #333;
    }
    .delete-warp{
      position: absolute;
      right:10px;
      top:11px;
      .icon-delete{
        display: block;
        width: 13px;
        height:13px;
        @include bg-image("../../project/img/file-delete");
        background-size: 13px auto;
      }
      .btn-warp{
        font-size: 11px;
        color:#333;
        .cancel{
          margin-right: 20px;
        }
      }
    }
    .introduction{
      position: relative;
      left: -18px;
      font-size: 13px;
      margin-top: 10px;
      input{
        border: 1px solid #dedede;
        border-radius: 3px;
        height: 22px;
        padding-left: 10px;
        color: #333;
      }
    }
  }

</style>

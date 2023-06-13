<template>
  <div id="app">
    <router-view v-wechat-title="$route.meta.title"/>
  </div>
</template>

<style lang="less">
  body .el-table th.gutter{
    display: table-cell!important;
  }
</style>

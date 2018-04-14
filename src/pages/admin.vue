<template>
  <div class="innerbox">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/admin' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/admin' }">企业审核</el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>

<script>
  export default{}
</script>

<style lang="less" scoped>
  .innerbox{
    padding: 40px 80px;
  }
</style>
<template>
  <div class="mainBox">
    <div class="fixed">
      <el-row>
        <el-col :span="20" :offset="4">
          <h1>职位名称</h1>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="14" :offset="4">
          <h2>公司名称</h2>
        </el-col>
        <el-col :span="6">
          <el-button type="primary">收藏</el-button>
          <el-button type="primary">申请</el-button>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="20" :offset="4">
          <p>3k-5k /天津 / 经验1-3年 / 本科及以上 / 全职 </p>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="20" :offset="4">
          <el-tag>标签一</el-tag>
          <el-tag type="success">标签二</el-tag>
          <el-tag type="info">标签三</el-tag>
          <el-tag type="warning">标签四</el-tag>
          <el-tag type="danger">标签五</el-tag>
        </el-col>
      </el-row>
    </div>
    <div class="detail">
      <el-row>
        <el-col :span="16" :offset="4">
          <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="职位描述" name="first">职位描述</el-tab-pane>
            <el-tab-pane label="公司介绍" name="second">公司介绍</el-tab-pane>
          </el-tabs>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      activeName: 'second'
    }
  }
}
</script>

<style lang="less" scoped>
.mainBox {
  width: 100%;
  .fixed {
    width: 100%;
    padding: 20px 0;
    background: #eeeeee;
    position: fixed;
    top: 61px;
    left: 0;
    z-index: 10;
    h1 {
      font-size: 1.6em;
    }
    h2 {
      font-size: 1.2em;
    }
  }
  .detail {
    position: relative;
    top: 300px;
    left: 0;
    padding: 20px 0;
  }
}
</style>


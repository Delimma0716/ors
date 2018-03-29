<template>
  <div class="fixed">
    <el-menu default-active="" class="el-menu-demo" mode="horizontal" :router="true">
      <div class="logo"></div>
      <el-menu-item index="/enterprise/recruit">发布职位</el-menu-item>
      <el-submenu>
        <template slot="title">{{entername}},你好</template>
        <el-menu-item index="settings">企业中心</el-menu-item>
        <el-menu-item @click="exit">退出</el-menu-item>
      </el-submenu>
    </el-menu>
  </div>
</template>

<script>
export default {
  data () {
    return {
      entername: ''
    }
  },
  methods: {
    exit(){
      localStorage.clear()
      this.$router.push('/login')
    }
  },
  mounted () {
    this.entername = localStorage.getItem('en_account')
  }

}
</script>

<style lang="less" scoped>
.fixed {
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 10;
  ul {
    display: flex;
    justify-content: flex-end;
  }
  .logo {
    width: 100px;
    height: 61px;
    position: fixed;
    top: 0;
    left: 0;
    background: #879adc;
  }
}
</style>


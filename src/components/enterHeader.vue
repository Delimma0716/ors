<template>
  <div class="fixed">
    <el-menu default-active="/enterprise/recruit" class="el-menu-demo" mode="horizontal" :router="true">
      <div class="logo"></div>
      <el-menu-item index="/enterprise/recruit">发布职位</el-menu-item>
      <el-dropdown @command="handleCommand">
        <span class="el-dropdown-link">
          {{entername}},你好<i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="settings">
            企业中心
          </el-dropdown-item>
          <el-dropdown-item command="exit">退出</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </el-menu>
  </div>
</template>

<script>
export default {
  data () {
    return {
      entername: '',
    }
  },
  methods: {
    handleCommand(command) {
      switch (command) {
        case 'exit':
          this.exit()
          break
      
        case 'settings':
          this.$router.push('/enterprise/settings')
          break
      }
    },
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
  .el-dropdown-link{
    line-height:58px;
    margin:0 20px;
  }
}
</style>


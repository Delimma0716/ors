<template>
  <div class="fixed">
    <el-menu :default-active="routes[0].path" class="el-menu-demo" mode="horizontal" :router="true">
      <div class="logo"></div>
      <el-menu-item v-for="route in routes" :index="route.path">{{route.name}}</el-menu-item>
      <el-submenu>
        <template slot="title" index="">user,你好</template>
        <el-menu-item index="settings">个人中心</el-menu-item>
        <el-menu-item index="">退出</el-menu-item>
      </el-submenu>
    </el-menu>
  </div>
</template>

<script>
export default {
  data() {
    return {
      routes: this.$router.options.routes[0].children.slice(0, 2)
    }
  },
  methods: {
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
  .logo{
    width:100px;
    height:61px;
    position:fixed;
    top:0;
    left:0;
    background:#879adc;
  }
}
</style>


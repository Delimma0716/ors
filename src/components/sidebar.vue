<template>
  <div class="side">
  <el-menu
      :default-active="routes[0].path"
      :router="true"
      class="el-menu-vertical">
      <el-menu-item v-for="route in routes" :index="route.path">
        <i class="el-icon-menu"></i>
        <span slot="title">{{route.name}}</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script>
  export default{
    data () {
      return {
        routes: [],
        username: ''
      }
    },
    mounted () {
      if(this.$route.name==='个人中心'){
        this.routes=this.$router.options.routes[0].children[0].children
      }else{
        this.routes=this.$router.options.routes[1].children[0].children
      }
    },
    methods:{
    }
  }
</script>

<style lang="less" scoped>
  .side{
    width:20%;
    height:100%;
  }
</style>
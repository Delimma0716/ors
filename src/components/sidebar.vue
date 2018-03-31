<template>
  <div class="side">
    <el-tabs tab-position="left">
      <el-tab-pane v-for="route in routes">
      <span slot="label" @click="go(route.path)" class="tab-text">
        <i class="el-icon-date"></i>
        {{route.name}}
      </span>
    </el-tab-pane>
  </el-tabs>

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
      // 判断是普通用户还是企业
      if(localStorage.getItem('user_account')){
        this.routes=this.$router.options.routes[0].children[0].children
      }else if(localStorage.getItem('en_account')){
        this.routes=this.$router.options.routes[1].children[0].children
      }
    },
    methods:{
      go(path){
        this.$router.push(path)
      }
    }
  }
</script>

<style lang="less" scoped>
  .side{
    height:100%;
    .el-tabs--left{
      height:100%;
    }
  }
</style>
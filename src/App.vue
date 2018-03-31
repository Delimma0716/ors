<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
  mounted(){
    // 已登陆过直接进入首页
    if(localStorage.getItem('user_account')){
      // this.$router.push('apply')
    }else if(localStorage.getItem('en_account')){
      // this.$router.push('enterprise/recruit')
    }else{
      this.$router.push('login')
    }
  }
}
</script>

<style lang="less" scoped>
</style>

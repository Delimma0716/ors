<template>
  <div class="mainBox">
    <o-sidebar></o-sidebar>
    <router-view class="subBox"/>
  </div>
</template>

<script>
import SideBar from '@/components/sidebar'
  export default {
    mounted(){
      if(this.$route.name==='个人中心'){
        this.$router.push('settings')
      }else{
        this.$router.push('settings/info')
      }
    },
    components:{
      'o-sidebar':SideBar
    }
  }
</script>

<style lang="less" scoped>
.mainBox {
  width: 100%;
  position: relative;
  top: 61px;
  left: 0;
  display: flex;
  .subBox{
    width:100%;
    padding:5%;
  }
}
</style>
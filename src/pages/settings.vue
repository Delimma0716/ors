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
    },
    components:{
      'o-sidebar':SideBar
    }
  }
</script>

<style lang="less" scoped>
.mainBox {
  width: 100%;
  height:100%;
  position: relative;
  top: 61px;
  left: 0;
  display: flex;
  .subBox{
    width:80%;
    padding:5% 2%;
  }
}
</style>
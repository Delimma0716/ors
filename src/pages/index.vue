<template>
  <div class="main">
    <o-header></o-header>
    <router-view/>
  </div>
</template>

<script>
import Header from '@/components/header'
export default {
  data() {
    return {
    }
  },
  components: {
    'o-header': Header
  },
  mounted() {
  }
}
</script>

<style lang="less" scoped>
  .main{
    width:100%;
    height:100%;
  }
</style>

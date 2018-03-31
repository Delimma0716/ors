<template>
  <div class="main">
    <o-header></o-header>
    <router-view/>
  </div>
</template>

<script>
import EnterHeader from '@/components/enterHeader'
export default {
  data() {
    return {
    }
  },
  components: {
    'o-header': EnterHeader
  },
  mounted() {
    // this.$router.push('/login')
  }
}
</script>

<style lang="less" scoped>
  .main{
    width:100%;
    height:100%;
  }
</style>

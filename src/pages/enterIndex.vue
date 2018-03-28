<template>
  <div>
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

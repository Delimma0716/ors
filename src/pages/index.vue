<template>
  <div>
    <o-header></o-header>
    <router-view/>
  </div>
</template>

<script>
import Header from '@/components/header'
export default {
  data() {
    return {
      user: ''
    }
  },
  components: {
    'o-header': Header
  },
  mounted() {
    this.$router.push('/login')
  }
}
</script>

<template>
  <v-overlay :value="isLoading">
    <v-progress-linear
      rounded
      :stream="progress !== null"
      height="8"
      buffer-value="0"
      :value="progress"
      :indeterminate="progress === null"
      style="width: 300px"
    >
    </v-progress-linear>
  </v-overlay>
</template>
<script>
export default {
  computed: {
    progress () {
      return this.$store.getters['general/getProgress']
    },
    isLoading () {
      return this.$store.getters['general/getLoading']
    }
  }
}
</script>
<style scoped>
.v-overlay__content {
  width: 75%
}
</style>

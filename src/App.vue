<template>
  <v-app>
    <Loader/>
    <v-main>
      <router-view/>
    </v-main>
  </v-app>
</template>

<script>
import Loader from './components/general/Loader'
export default {
  name: 'App',

  components: {
    Loader
  },

  data: () => ({
    //
  })
}
</script>

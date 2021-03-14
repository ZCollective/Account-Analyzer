<template>
  <v-btn icon @click="buttonClicked">
    <v-icon>mdi-cloud-upload</v-icon>
    <input
    ref="uploader"
    style="display: none"
    type="file"
    accept=".json"
    @change="onFileChanged"/>
    <v-snackbar
      v-model="showErrorSnackBar"
      timeout="5000">
      Could not JSON parse the mapping!
    </v-snackbar>
  </v-btn>
</template>
<script>
export default {
  props: {
    updateMapping: Function
  },
  data () {
    return {
      selectedFile: null,
      showErrorSnackBar: false
    }
  },
  watch: {
    selectedFile: async function (newValue) {
      if (newValue !== null) {
        try {
          const readFile = await this.selectedFile.text()
          const parsedFile = JSON.parse(readFile)
          this.updateMapping(parsedFile)
        } catch (error) {
          console.log(error)
          this.showErrorSnackBar = true
        }
      }
    }
  },
  methods: {
    onFileChanged (e) {
      this.selectedFile = e.target.files[0]
    },
    buttonClicked () {
      this.$refs.uploader.click()
    }
  }
}
</script>

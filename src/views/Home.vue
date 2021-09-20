<template>
  <v-container style="height: 100%" fluid>
    <v-row style="height: 100%" justify="center" align="center">
      <v-card min-width="450px">
        <v-card-title>Drop export here!</v-card-title>
        <v-card-text
          v-cloak
          @drop.prevent="addDropFile"
          @dragover.prevent
          >
          <v-file-input
          :loading="showFileInputLoading"
          accept=".txt"
          chips
          show-size
          truncate-length="35"
          v-model="selectedFile">
          </v-file-input>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn text @click="loadDemo">Try a Demo!</v-btn>
          <v-btn
            text
            :disabled="selectedFile === null"
            @click="analyze"
            >Analyze!</v-btn>
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
    </v-row>
    <v-snackbar
      v-model="showErrorSnackBar"
      timeout="5000">
      We only support files in the MT940 Format!
    </v-snackbar>
  </v-container>
</template>
<script>
// eslint-disable-next-line
import demoFile from 'raw-loader!../assets/demo-data/account.txt'
const parser = require('@centrapay/swift-parser')
export default {
  data () {
    return {
      selectedFile: null,
      parsedFile: null,
      showErrorSnackBar: false,
      showFileInputLoading: false
    }
  },
  watch: {
    selectedFile: async function (newValue) {
      if (newValue !== null) {
        this.showFileInputLoading = true
        try {
          const readFile = await this.selectedFile.text()
          this.parsedFile = parser.parse({
            type: 'mt940',
            data: readFile
          })
        } catch (error) {
          console.log(error)
          this.selectedFile = null
          this.showErrorSnackBar = true
        } finally {
          this.showFileInputLoading = false
        }
      }
    }
  },
  methods: {
    addDropFile (e) {
      const tempFile = e.dataTransfer.files[0]
      if (tempFile.name.toLowerCase().endsWith('.txt')) {
        this.selectedFile = tempFile
      } else {
        this.showErrorSnackBar = true
      }
    },
    async analyze () {
      this.$store.dispatch('general/setLoading', true)
      this.$store.dispatch('data/setEntries', this.parsedFile)
      this.$router.push('Analysis')
    },
    async loadDemo () {
      this.$store.dispatch('general/setLoading', true)
      this.$store.dispatch('general/setDemo', true)
      this.$store.dispatch('data/setEntries', parser.parse({
        type: 'mt940',
        data: demoFile
      }))
      this.$router.push('Analysis')
      console.log('Loading demo!')
    }
  }
}
</script>

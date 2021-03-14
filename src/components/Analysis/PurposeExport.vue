<template>
  <v-btn icon @click="exportPurposeMapping">
    <v-icon>mdi-cloud-download</v-icon>
  </v-btn>
</template>
<script>
export default {
  props: {
    transactions: Array
  },
  data () {
    return {
    }
  },
  methods: {
    exportPurposeMapping () {
      // Create Mapping
      const mapping = {}
      for (const transaction of this.transactions) {
        const recipient = transaction.recipient
        const purpose = transaction.purpose
        if (!mapping[recipient]) mapping[recipient] = purpose
      }
      const fileContent = JSON.stringify(mapping, null, 2)
      const downloadElement = document.createElement('a')
      downloadElement.setAttribute('href', `data:text/plain;charset=utf-8,${encodeURIComponent(fileContent)}`)
      downloadElement.setAttribute('download', 'mapping.json')
      downloadElement.style.display = 'none'
      document.body.appendChild(downloadElement)
      downloadElement.click()
      document.body.removeChild(downloadElement)
    }
  }
}
</script>

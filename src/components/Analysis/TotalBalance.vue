<template>
  <v-card
    class="mx-auto text-center mt-4" min-width="100%" min-height="200">
    <v-card-text class="mb-n3">
      <v-row>
        <v-spacer></v-spacer>
        <v-btn class="mb-n5" icon @click="moneyLabels = !moneyLabels">
          <v-icon v-if="!moneyLabels">mdi-calendar-range</v-icon>
          <v-icon v-else>mdi-currency-eur</v-icon>
        </v-btn>
      </v-row>
    </v-card-text>
    <v-card-text>
      <v-sheet color="#f5f5f5" rounded>
      <v-sparkline
        :gradient="gradient"
        :value="values"
        :labels="labels"
        :smooth="15"
        auto-draw
        :line-width="3"
        stroke-linecap="round"
        :padding="20"
        >
      </v-sparkline>
      </v-sheet>
    </v-card-text>
    <v-card-text>
      <div class="display-1 font-weight-thin">Balance Change</div>
    </v-card-text>
  </v-card>
</template>
<script>
const dateLookup = require('../general/dateLookup')
export default {
  props: {
    entries: Array
  },
  data () {
    return {
      gradient: ['#17d149', '#17d149', '#a6a6a6', '#fc0303', '#fc0303'],
      moneyLabels: false
    }
  },
  computed: {
    values () {
      return this.entries.map(entry => entry.closingBalance)
    },
    labels () {
      const labelsToBeReturned = []
      const maxLabels = 7
      const shouldRemoveLabels = this.entries.length > maxLabels
      console.log('Should remove labels: ', shouldRemoveLabels)
      // If we have too many labels we need to remove some and replace them with empty strings
      for (let i = 0; i < this.entries.length; i++) {
        const isEmptyLabel = shouldRemoveLabels && (i % (Math.round(this.entries.length / maxLabels)) !== 0)
        if (!isEmptyLabel) {
          if (this.moneyLabels) {
            labelsToBeReturned[i] = `${this.entries[i].statementDate.getDate()}.${dateLookup.months[this.entries[i].statementDate.getMonth()]}`
          } else {
            labelsToBeReturned[i] = `${this.entries[i].closingBalance}€`
          }
        } else {
          labelsToBeReturned[i] = ' '
        }
      }
      return labelsToBeReturned
    }
  }
}
</script>

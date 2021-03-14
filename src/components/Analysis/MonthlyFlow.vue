<template>
  <v-card class="mt-4">
    <v-card-title>Monthly balance!</v-card-title>
    <v-card-text>
      <v-col v-if="dataObject !== null">
        <v-row align="end" justify="space-around" style="height: 250px">
          <v-col justify="center" class="text-center">
            <v-row justify="center">
              <v-expand-x-transition>
                <v-sheet color="green" elevation="2" :height="inFlowHeight" width=100 class="mb-5" v-show="showFlowHeight"></v-sheet>
              </v-expand-x-transition>
            </v-row>
            <div class="font-weight-bold" style="color: green">{{`+${dataObject.inflow}€`}}</div>
          </v-col>
          <v-col justify="center" class="text-center">
            <v-row justify="center">
              <v-expand-x-transition>
                <v-sheet color="red" elevation="2" :height="outFlowHeight" width=100 class="mb-5" v-show="showFlowHeight"></v-sheet>
              </v-expand-x-transition>
            </v-row>
            <div class="font-weight-bold" style="color: red">{{`${dataObject.outflow}€`}}</div>
          </v-col>
        </v-row>
        <v-divider></v-divider>
        <v-row class="mt-2" justify="center">
          <div>Total Average Flow:</div>
          <div class="font-weight-bold">{{`${(parseFloat(dataObject.inflow) + parseFloat(dataObject.outflow)).toFixed(2)}€`}}</div>
        </v-row>
      </v-col>
      <v-col v-else>
        <v-row align="center" justify="space-around" style="height: 250px">
          <div class="display-1 font-weight-light">No Data</div>
        </v-row>
      </v-col>
    </v-card-text>
  </v-card>
</template>
<script>
// const dateLookup = require('../general/dateLookup')
export default {
  props: {
    entries: Array
  },
  data () {
    return {
      inFlowHeight: 0,
      showFlowHeight: false,
      outFlowHeight: 0
    }
  },
  computed: {
    pickedMonths () {
      return this.$store.getters['data/getPickedMonths']
    },
    keysToFilter () {
      return this.$store.getters['data/getKeysToFilter']
    },
    dataObject () {
      console.log('Computing flows')
      if (this.pickedMonths.length === 0) {
        return null
      }
      let inflow = 0
      let outflow = 0
      for (const entry of this.entries) {
        for (const transaction of entry.transactions) {
          if (this.keysToFilter.includes(transaction.key)) continue
          if (transaction.amount > 0) inflow += transaction.amount
          else outflow += transaction.amount
        }
      }
      console.log('Inflow: ', inflow)
      console.log('Outflow: ', outflow)
      const averageInflow = (inflow / this.pickedMonths.length)
      const averageOutflow = (outflow / this.pickedMonths.length)
      return {
        outflow: isNaN(averageOutflow) ? null : averageOutflow.toFixed(2),
        inflow: isNaN(averageInflow) ? null : averageInflow.toFixed(2)
      }
    }
  },
  watch: {
    dataObject: function (newValue) {
      if (newValue !== null) {
        this.setNewFlowHeight(parseInt(newValue.inflow), parseInt(newValue.outflow))
      } else {
        this.setNewFlowHeight(0, 0)
      }
    }
  },
  methods: {
    setNewFlowHeight (inFlow, outFlow) {
      console.log('')
      const totalFlow = inFlow + Math.abs(outFlow)
      console.log('totalFlow', totalFlow)
      const inPercentage = inFlow / totalFlow
      const outPercentage = Math.abs(outFlow) / totalFlow
      const inHeight = Math.round(200 * inPercentage)
      const outHeight = Math.round(200 * outPercentage)
      console.log('Calculated inHeight: ', inHeight)
      console.log('Calculated outHeight: ', outHeight)
      const vm = this
      this.showFlowHeight = false
      setTimeout(() => {
        vm.inFlowHeight = isNaN(inHeight) ? 0 : inHeight
        vm.outFlowHeight = isNaN(outHeight) ? 0 : outHeight
        setTimeout(() => {
          console.log('Showing new flowheights!')
          vm.showFlowHeight = true
        }, 300)
      }, 200)
    }
  }
}
</script>

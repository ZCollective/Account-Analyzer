<template>
  <v-container>
    <v-col>
      <v-row>
        <v-col cols=3>
          <RangePicker/>
          <MonthlyFlow :entries="filteredEntries"/>
          <TotalBalance :entries="filteredEntries"/>
        </v-col>
        <v-col cols=9>
          <RegularExpenses :entries="entries"/>
        </v-col>
      </v-row>
    </v-col>
  </v-container>
</template>
<script>
import TotalBalance from '../components/Analysis/TotalBalance.vue'
import RangePicker from '../components/Analysis/RangePicker'
import RegularExpenses from '../components/Analysis/RegularExpenses'
import MonthlyFlow from '../components/Analysis/MonthlyFlow.vue'

export default {
  components: { TotalBalance, RangePicker, RegularExpenses, MonthlyFlow },
  data () {
    return {
      progress: null,
      loading: true
    }
  },
  computed: {
    entries () {
      return this.$store.getters['data/getEntries']
    },
    filteredEntries () {
      const vm = this
      return this.entries.filter(entry => !vm.keysToFilter.includes(entry.key))
    },
    keysToFilter () {
      return this.$store.getters['data/getKeysToFilter']
    }
  },
  created () {
    this.computeStatistics()
  },
  methods: {
    computeStatistics () {
      try {
        console.log('Computing statistics')
      } catch (error) {
        console.log('error')
      } finally {
        this.$store.dispatch('general/clearLoader')
      }
    }
  }
}
</script>

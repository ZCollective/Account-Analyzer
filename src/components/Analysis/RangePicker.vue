<template>
  <v-card>
    <v-card-text>
      <v-date-picker
        v-model="selection"
        type="month"
        :min="selectableMonths.min"
        :max="selectableMonths.max"
        full-width
        multiple
        :show-current="false"
      >
      </v-date-picker>
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
      selection: undefined
    }
  },
  watch: {
    selection: function (newValue) {
      this.$store.dispatch('data/filterMonth', newValue)
    }
  },
  computed: {
    selectableMonths () {
      return this.$store.getters['data/getValidMonths']
    }
  },
  mounted () {
  }
}
</script>

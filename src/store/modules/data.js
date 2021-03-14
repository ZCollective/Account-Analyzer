const state = {
  entries: [],
  filteredEntries: [],
  validMonths: {},
  keysToFilter: [],
  pickedMonths: []
}

// getters
const getters = {
  getEntries: state => state.filteredEntries,
  getValidMonths: state => state.validMonths,
  getKeysToFilter: state => state.keysToFilter,
  getPickedMonths: state => state.pickedMonths
}

// actions
const actions = {
  setKeysToFilter ({ commit }, keys) {
    commit('setkeystofilter', keys)
  },
  setEntries ({ commit }, entries) {
    const parsedEntries = entries.map(entry => {
      // Parse all bignums to normal numbers
      entry.openingBalance = entry.openingBalance.toNumber()
      entry.closingBalance = entry.closingBalance.toNumber()
      entry.closingAvailableBalance = entry.closingAvailableBalance.toNumber()
      entry.forwardAvailableBalance = entry.forwardAvailableBalance.toNumber()
      entry.transactions.map(transaction => {
        transaction.amount = transaction.amount.toNumber()
        transaction.key = `${Math.random()}`
        return transaction
      })
      // Sort transactions from earliest to latest
      entry.transactions.sort((a, b) => a.date.getTime() - b.date.getTime())
      return entry
    })
    parsedEntries.sort((a, b) => a.statementDate.getTime() - b.statementDate.getTime())

    // Computing valid selection months
    var maxDate = { year: 0, month: 0 }
    var minDate = { year: 999999, month: 13 }
    parsedEntries.forEach(entry => {
      const year = entry.statementDate.getFullYear()
      const month = entry.statementDate.getMonth() + 1
      if ((year > maxDate.year) || (year === maxDate.year && month > maxDate.month)) maxDate = { year, month }
      if ((year < minDate.year) || (year === minDate.year && month < minDate.month)) minDate = { year, month }
    })
    commit('setvalidmonths', {
      min: `${minDate.year}-${maxDate.month > 9 ? '' : '0'}${minDate.month}`,
      max: `${maxDate.year}-${maxDate.month > 9 ? '' : '0'}${maxDate.month}`
    })
    commit('setentries', parsedEntries)
    commit('setfilteredentries', parsedEntries)
  },
  filterMonth ({ commit, state }, pickedDates) {
    const filteredStatements = state.entries.filter(entry => {
      const year = entry.statementDate.getFullYear()
      const month = entry.statementDate.getMonth() + 1
      const dateString = `${year}-${month > 9 ? '' : '0'}${month}`
      return pickedDates.includes(dateString)
    })
    commit('setpickedmonths', pickedDates)
    commit('setfilteredentries', filteredStatements)
  }
}

// mutations
const mutations = {
  setkeystofilter (state, keys) {
    state.keysToFilter = keys
  },
  setentries (state, entries) {
    state.entries = entries
  },
  setfilteredentries (state, entries) {
    state.filteredEntries = entries
  },
  setvalidmonths (state, months) {
    state.validMonths = months
  },
  setpickedmonths (state, months) {
    state.pickedMonths = months
  }
}

export default {
  namespaced: true,
  name: 'data',
  state,
  getters,
  actions,
  mutations
}

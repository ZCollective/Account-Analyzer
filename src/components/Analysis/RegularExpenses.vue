<template>
  <v-card min-height="100%">
    <v-card-title>
      Expenses
      <v-spacer></v-spacer>
      <v-text-field
        v-model="search"
        append-icon="mdi-magnify"
        label="Search"
        single-line
        hide-details
      ></v-text-field>
      <PurposeImport :updateMapping="updateMapping" class="mt-3"/>
      <PurposeExport :transactions="transactions" class="mt-3"/>
    </v-card-title>
    <v-card-text>
    <v-data-table
      v-model="selected"
      :headers="headers"
      :items="transactions"
      item-key="key"
      sort-by="recipient"
      :items-per-page="transactions.length"
      :search="search"
      show-group-by
      show-select>
      <template v-slot:group.summary="props">
        <td class="text-end" colspan="4">
          <v-row justify="end">
          <div class="title font-weight-thin">
            Cumulated:
          </div>
          <div class="title ml-2 text-decoration-underline">
            {{ props.items.filter(i => !keysToFilter.includes(i.key)).map(i => i.amount).reduce((a,b) => a+b, 0).toFixed(2)}}
          </div>
          </v-row>
        </td>
      </template>
      <template v-slot:item.amount="{ item }">
        <v-chip
          :color="getColor(item.amount)">
          {{item.amount}}
        </v-chip>
      </template>
      <template v-slot:item.purpose="props">
        <v-edit-dialog
          :return-value.sync="props.item.purpose"
        >
          {{ props.item.purpose }}
          <template v-slot:input>
            <v-text-field
              v-model="props.item.purpose"
              :rules="[max25chars]"
              label="Edit"
              single-line
              counter
            ></v-text-field>
          </template>
        </v-edit-dialog>
      </template>
    </v-data-table>
    </v-card-text>
  </v-card>
</template>
<script>
import PurposeExport from './PurposeExport.vue'
import PurposeImport from './PurposeImport.vue'
const detailsLookup = require('../general/detailLookup')
export default {
  components: { PurposeExport, PurposeImport },
  props: {
    entries: Array
  },
  data () {
    return {
      selected: [],
      search: '',
      purposeMapping: {},
      max25chars: v => v.length <= 25 || 'Input too long!',
      headers: [
        { text: 'Recipient', value: 'recipient', align: 'start', groupable: true },
        { text: 'Type', value: 'type', align: 'center' },
        { text: 'Flow', value: 'flow', align: 'center' },
        { text: 'Amount', value: 'amount', align: 'center' },
        { text: 'Purpose', value: 'purpose', align: 'center' }
      ]
    }
  },
  watch: {
    selected: function (newValue) {
      this.$store.dispatch('data/setKeysToFilter', newValue.map(entry => entry.key))
    }
  },
  computed: {
    terminal () {
      return console
    },
    keysToFilter () {
      return this.$store.getters['data/getKeysToFilter']
    },
    transactions () {
      const temp = []
      console.log('Computing transactions')
      for (const entry of this.entries) {
        // console.log('Statement: ', entry)
        for (const transaction of entry.transactions) {
          // console.log('Transaction: ', transaction)

          const insertObject = {
            key: transaction.key,
            purpose: ''
          }
          const details = transaction.detailSegments[0]

          insertObject.flow = transaction.amount < 0 ? 'OUT' : 'IN'
          insertObject.amount = transaction.amount
          const detailLines = details.split('?')
          // console.log('detailLines: ', detailLines)

          const typeLine = detailLines.filter(line => line.startsWith(detailsLookup.paymentType))[0]
          // console.log('typeLine', typeLine)
          insertObject.type = typeLine.split(detailsLookup.paymentType)[1]

          let firstRecipientLine = detailLines.filter(line => line.startsWith(detailsLookup.recipient))[0]
          // console.log('firstRecipientLine', firstRecipientLine)
          const secondRecipientLine = detailLines.filter(line => line.startsWith(detailsLookup.recipient2))[0]
          // console.log('secondRecipientLine', secondRecipientLine)
          if (secondRecipientLine) firstRecipientLine += secondRecipientLine.split(detailsLookup.recipient2)[1]
          if (firstRecipientLine) insertObject.recipient = firstRecipientLine.split(detailsLookup.recipient)[1].replace(/\r?\n|\r/g, '')
          else insertObject.recipient = 'Unkown'
          insertObject.purpose = this.purposeMapping[insertObject.recipient] || ''
          // console.log('InsertObject: ', insertObject)
          temp.push(insertObject)
        }
      }
      return temp
    }
  },
  methods: {
    getColor (amount) {
      return amount > 0 ? '#17d149' : '#ed3e24'
    },
    updateMapping (mapping) {
      this.purposeMapping = mapping
    }
  }
}
</script>

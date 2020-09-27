<template>
  <q-page>
    <div class="row justify-center q-pb-xl">
    <img
      style="width:300px"
      alt="Sedo-Network logo"
      src="~assets/sedo-network-cropped.svg"
    >
    </div>
  <div class="row justify-center q-pt-xl my-font">
    <q-input reactive-rules @change="performRequest" rounded outlined v-model="text" color="grey" style="width:80vw; max-width: 500px; font-size: 25px">
         <template v-slot:append>
          <q-btn round color="grey-10" icon="search" @click="performRequest"/>
        </template>
      </q-input>
    </div>
  <div class="row justify-center q-pa-md">
    <q-spinner-cube
        color="orange"
        :class="dynamicClass"
        size="5.5em"
      />
  </div>
  <div class="row justify-center q-pt-xl my-font">
    <q-list bordered separator style="width:80vw; max-width: 500px; font-size: 25px">
      <q-item clickable v-ripple v-for="domains in foundDomains" :key="domains.id">
        <q-item-section>
          <q-item-label>{{domains.domain}}</q-item-label>
          <q-item-label caption>{{domains.owner}}</q-item-label>
        </q-item-section>
      </q-item>
    </q-list>
      </div>
  </q-page>
</template>

<script>
const Web3 = require('web3')
export default {
  name: 'PageIndex',
  data () {
    return {
      text: '',
      foundDomains: [],
      currentUserAddress: '',
      ethEnabled: null,
      showSpinner: false,
      dynamicClass: ''
    }
  },
  async mounted () {
    console.log(window.web3)
    this.ethEnabled = () => {
      if (window.web3) {
        window.web3 = new Web3(window.web3.currentProvider)
        window.ethereum.enable()
        return true
      }
      return false
    }
    if (this.ethEnabled() === false) {
      alert('Please install MetaMask to use this dApp!')
    }
    var accounts = await window.web3.eth.getAccounts()
    this.currentUserAddress = accounts[0]
    this.performRequest()
  },
  methods: {
    async performRequest (e) {
      this.dynamicClass = ''
      if (this.text === '') {
        const result = await this.$axios.post('https://api.thegraph.com/subgraphs/name/genievot/sedo-network', {
          query: `{
          domains(where: {
            owner: "${this.currentUserAddress}"
          }) {
            id
            owner
            domain
          }
        }`
        })
        this.foundDomains = result.data.data.domains
        this.dynamicClass = 'hidden'
        // show user domains...
      } else {
        this.dynamicClass = ''
        const result = await this.$axios.post('https://api.thegraph.com/subgraphs/name/genievot/sedo-network', {
          query: `{
          domains(where: {
            domain_starts_with: "${this.text}"
          }) {
            id
            owner
            domain
          }
        }`
        })
        this.foundDomains = result.data.data.domains
        this.dynamicClass = 'hidden'
      }
    }
  }
}
</script>

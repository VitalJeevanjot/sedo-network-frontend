// import something here
const Web3 = require('web3')
// "async" is optional;
// more info on params: https://quasar.dev/quasar-cli/cli-documentation/boot-files#Anatomy-of-a-boot-file
export default async (Vue) => {
  // something to do
  Vue.prototype.$web3 = Web3
}

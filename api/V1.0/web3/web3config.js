const Web3 = require("web3");
const abi = require("./abis/devAbi");

const option = {
  reconnect: {
    auto: true,
    delay: 5000, // ms
    maxAttempts: 5,
    onTimeout: false
  }
};
// const Web3 = require('web3');

// const url = 'https://sayBl:Kunal12345@apis.ankr.com/5e96a4f0d7214426ac29801a4135ff20/406bd161e989df73b0364b05fe7d2dee/avax/archive/main'  // url string

// const web3 = new Web3(new Web3.providers.HttpProvider(url));

// web3.eth.getBlockNumber((error, blockNumber) => {
//     if(!error){
//         console.log(blockNumber);
//     }else{
//         console.log(error);
//     }
// });
const web3 = new Web3(new Web3.providers.WebsocketProvider("https://rpc.ankr.com/avalanche_fuji/5e96a4f0d7214426ac29801a4135ff20/406bd161e989df73b0364b05fe7d2dee/avax/archive/main", option));

const contract = new web3.eth.Contract(abi, "0xd76Af335266ac42166D859527AF7DFd615Fc9c0E");

module.exports = {
  contract
};

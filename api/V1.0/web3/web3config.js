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

// let wP = Web3.providers;

// console.log({wP});
// const web3 = new Web3(new web3.pr)

const web3 = new Web3(new Web3.providers.WebsocketProvider("wss://speedy-nodes-nyc.moralis.io/7451cc05a7014c06a356bedc/avalanche/testnet/ws", option));

const contract = new web3.eth.Contract(abi, "0xd76Af335266ac42166D859527AF7DFd615Fc9c0E");

module.exports = {
  contract
};

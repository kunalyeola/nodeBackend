const { contract } = require("./web3config");

contract.events.TransferSingle({ fromBlock: 0 }, async (_error, event) => {
  try {
    // if (process.env.NODE_ENV === "production") {
    //   return;
    // }
    // console.log(process.env.NODE_ENV);
    if (event) {
      console.log(event);
    }
  } catch (err) {
    console.log(err);
  }
});

const Web3 = require('web3');
require('dotenv').config();
const HDWalletProvider = require("@truffle/hdwallet-provider");
let express = require('express');
let router = express.Router();
const { readFile } = require("../utils/fileSystem");

async function transaction (req) {
  let receiptAddress = req;
  console.log(req);
  const myPrivateKeyHex = process.env.DAPPPRIVATEKEY;
  let provider = new HDWalletProvider(myPrivateKeyHex, process.env.FTM_TEST_NET);
  const localKeyProvider = new HDWalletProvider({
      privateKeys: [myPrivateKeyHex],
      providerOrUrl: provider,
  });
  const web3 = new Web3(localKeyProvider);
  let gasData = await readFile('./gasdata.json');
  let gasPrice = JSON.parse(gasData).gasprice;
  web3.eth.sendTransaction({
    to: receiptAddress,
    value: parseInt(gasPrice),
    data: '',
    from: process.env.DAPPPUBLICKEY 
  })
  .on('transactionHash', function(hash){
      console.log(hash);
  })
  .on('error', console.error);
};

module.exports = {transaction};

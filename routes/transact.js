const Web3 = require('web3');
require('dotenv').config();
const HDWalletProvider = require("@truffle/hdwallet-provider");
var express = require('express');
var router = express.Router();
const fs = require('fs');






function transaction (req) {
    let receiptAddress = req;
    console.log(req);
    const myPrivateKeyHex = process.env.DAPPPRIVATEKEY;
    let provider = new HDWalletProvider(myPrivateKeyHex, process.env.FTM_TEST_NET);
    const localKeyProvider = new HDWalletProvider({
        privateKeys: [myPrivateKeyHex],
        providerOrUrl: provider,
    });
    const web3 = new Web3(localKeyProvider);
    fs.readFile("./gasdata.json", "utf8", (err, jsonString) => {
        if (err) {
          console.log("Error reading file from disk:", err);
          return;
        }
        try {
          gasPrice = JSON.parse(jsonString);
          console.log(gasPrice);

            web3.eth.sendTransaction({
                to: receiptAddress,
                value: parseInt(gasPrice.gasprice),
                data: '',
                from: process.env.DAPPPUBLICKEY 
            })
            .on('transactionHash', function(hash){
                console.log(hash);
            })
            .on('error', console.error);
          
        } catch (err) {
          console.log("Error parsing JSON string:", err);
        }
    });
    
  };



module.exports = {transaction};

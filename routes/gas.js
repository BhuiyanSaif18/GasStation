var express = require('express');
var router = express.Router();
var Web3 = require('web3');
const fs = require('fs');
const schedule = require('node-schedule');
require('dotenv').config();
const { ethers } = require("ethers");

/* GET users listing. */
router.get('/', function(req, res, next) {

  
  var web3 = new Web3(new Web3.providers.HttpProvider(process.env.FTM_MAIN_NET));
  fs.readFile("./gasdata.json", "utf8", (err, jsonString) => {
    if (err) {
      console.log("Error reading file from disk:", err);
      return;
    }
    try {
      gasPrice = JSON.parse(jsonString);
      // web3.utils.fromWei(gasPrice.gasprice)
      if(gasPrice.gasprice){
        res.render('keys/gasprice', {viewTitle : "Gas Price " + web3.utils.fromWei(gasPrice.gasprice) + " FTM"});
      }
      else{
        res.render('keys/gasprice', {viewTitle : "Gas Price not retrived yet"});
      }
      
    } catch (err) {
      console.log("Error parsing JSON string:", err);
    }
  });
   
});


module.exports = router;

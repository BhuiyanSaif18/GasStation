"use strict";
let express = require('express');
let router = express.Router();
let Web3 = require('web3');
require('dotenv').config();
const { ethers } = require("ethers");
const { readFile } = require("../utils/fileSystem");

/* GET users listing. */
router.get('/', async function(req, res, next) {

  
  let web3 = new Web3(new Web3.providers.HttpProvider(process.env.FTM_MAIN_NET));

  let data = await readFile('./gasdata.json');
  let gasPriceData = JSON.parse(data);
  
  if(gasPriceData){
    res.render('keys/gasprice', {
      viewTitle : ethers.utils.formatUnits(gasPriceData.gasprice, "gwei"),
      LastUpdateTime : gasPriceData.updateTime
    });
  }
  else{
    res.render('keys/gasprice', {viewTitle : "Gas Price not retrived yet"});
  }
});


module.exports = router;

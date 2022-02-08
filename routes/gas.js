let express = require('express');
let router = express.Router();
let Web3 = require('web3');
const schedule = require('node-schedule');
require('dotenv').config();
const { ethers } = require("ethers");
const { readFile } = require("../utils/fileSystem");

/* GET users listing. */
router.get('/', async function(req, res, next) {

  
  let web3 = new Web3(new Web3.providers.HttpProvider(process.env.FTM_MAIN_NET));

  let data = await readFile('./gasdata.json');
  let gasPrice = JSON.parse(data).gasprice;

  if(gasPrice){
    res.render('keys/gasprice', {viewTitle : "Gas Price " + ethers.utils.formatUnits(gasPrice, "gwei") + " GWei"});
  }
  else{
    res.render('keys/gasprice', {viewTitle : "Gas Price not retrived yet"});
  }
});


module.exports = router;

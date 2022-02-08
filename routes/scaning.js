let express = require('express');
let router = express.Router();
let request = require('request');
let Web3 = require('web3');
const fs = require('fs');
require('dotenv').config();
const { ethers } = require("ethers");
const { readFile } = require("../utils/fileSystem");

/* GET users listing. */
router.get('/', async function(req, res, next) {
  let address = req.query.pubKey;
  let web3 = new Web3(new Web3.providers.HttpProvider(process.env.FTM_TEST_NET));

  let CustomerData = await readFile('./customer.json', 'utf8');
  let whiteListedCustomers = JSON.parse(CustomerData).WhiteList;
  if(whiteListedCustomers.length>0){
    let gasData = await readFile('./gasdata.json');
    let gasPrice = JSON.parse(gasData).gasprice;
    let whiteListedCustomerAddresses = whiteListedCustomers.join(',');
    let url = process.env.FTM_TEST_NET_API_URL+'?module=account&action=balancemulti&address='+whiteListedCustomerAddresses+'&tag=latest&apikey=' + process.env.FTM_API_KEY

    request.get(url, async function (error, response, body) {
      if (!error && response.statusCode == 200) {
        result = JSON.parse(body).result;
        for (let i in result) {
            result[i].difference = ethers.utils.formatUnits((parseInt(result[i].balance) - parseInt(gasPrice)).toString(), "gwei") + " GWei" ;
            result[i].balance = web3.utils.fromWei(result[i].balance.toString() )+ " FTM";
          }
        }
        res.render("keys/balancelist", {
          list: result
        });
      }
    );
  }
  else{
    res.render("keys/balancelist", {
      list: []
    });
  }
});



module.exports = router;

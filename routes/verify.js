var express = require('express');
var Web3 = require('web3');
var router = express.Router();
const fs = require('fs');
var request = require('request');
require('dotenv').config();
const { readFile, writeFile } = require("../utils/fileSystem");

var transactRouter = require('./transact');

router.get('/', async function(req, res, next) {
    var address = req.query.publicKey;
    var web3 = new Web3(new Web3.providers.HttpProvider( process.env.FTM_TEST_NET ));


    if(web3.utils.isAddress(address)){
      var CustomersStringifyData = await readFile('./customer.json');
      customerData = JSON.parse(CustomersStringifyData);
        console.log("Customer address is:", customerData);
        
        if(!customerData.WhiteList.includes(address)){
          customerData.WhiteList.push( address)
          const outputjsonString = JSON.stringify(customerData);
          await writeFile('./customer.json', outputjsonString)
          var url = process.env.FTM_TEST_NET_API_URL +'?module=account&action=txlist&address='+address+'&startblock=0&endblock=99999999&sort=asc&apikey='+process.env.FTM_API_KEY;
          request.get(url, async function (error, response, body) {
            if (!error && response.statusCode == 200) {
              result = JSON.parse(response.body).result;
                console.log( result.length);
                if(result.length == 0){
                  transactRouter.transaction(address);
                }
            }
          });
        }
    }
    res.render("keys/add", {
      viewTitle: address? web3.utils.isAddress(address)? "Valid Address Added" : "Invalid Address" :  "Insert Public Key"
    });
    }
);



router.get('/list',async  (req, res) => {
  var CustomersStringifyData = await readFile('./customer.json');
  var publist = JSON.parse(CustomersStringifyData).WhiteList;
  res.render("keys/list", {
    list: publist
  });
});


module.exports = router;





 

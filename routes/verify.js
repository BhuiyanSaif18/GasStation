let express = require('express');
let Web3 = require('web3');
let router = express.Router();
const fs = require('fs');
let request = require('request');
require('dotenv').config();
const { readFile, writeFile } = require("../utils/fileSystem");

let transactRouter = require('./transact');

router.get('/', async function(req, res, next) {
  let address = req.query.publicKey;
  let web3 = new Web3(new Web3.providers.HttpProvider( process.env.FTM_TEST_NET ));

  if(web3.utils.isAddress(address)){
    let CustomersStringifyData = await readFile('./customer.json');
    customerData = JSON.parse(CustomersStringifyData);
      console.log("Customer address is:", customerData);
      
      if(!customerData.WhiteList.includes(address)){
        customerData.WhiteList.push( address)
        const outputjsonString = JSON.stringify(customerData);
        await writeFile('./customer.json', outputjsonString)
        let url = process.env.FTM_TEST_NET_API_URL +'?module=account&action=txlist&address='+address+'&startblock=0&endblock=99999999&sort=asc&apikey='+process.env.FTM_API_KEY;
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
  let CustomersStringifyData = await readFile('./customer.json');
  let publist = JSON.parse(CustomersStringifyData).WhiteList;
  res.render("keys/list", {
    list: publist
  });
});


module.exports = router;





 

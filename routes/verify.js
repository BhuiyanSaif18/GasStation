var express = require('express');
var Web3 = require('web3');
var router = express.Router();
const fs = require('fs');
var request = require('request');

var transactRouter = require('./transact');

router.get('/', async function(req, res, next) {
    var address = req.query.publicKey;
    var web3 = new Web3(new Web3.providers.HttpProvider('https://rpc.testnet.fantom.network/'));


    if(web3.utils.isAddress(address)){
      fs.readFile("./customer.json", "utf8", (err, jsonString) => {
        if (err) {
          console.log("Error reading file from disk:", err);
          return;
        }
        try {
          customer = JSON.parse(jsonString);
          console.log("Customer address is:", customer);
          
          if(!customer.WhiteList.includes( address)){
            customer.WhiteList.push( address)
            const outputjsonString = JSON.stringify(customer)
            fs.writeFile('./customer.json', outputjsonString, err => {
                if (err) {
                    console.log('Error writing file', err)
                } else {
                    console.log('Successfully wrote file')
                }
            })
          }
          else {
            console.log("prints else");
          }
          
          
        } catch (err) {
          console.log("Error parsing JSON string:", err);
        }
      });
      var url = 'https://api-testnet.ftmscan.com/api?module=account&action=txlist&address='+address+'&startblock=0&endblock=99999999&sort=asc&apikey=H1AU183381C5TDNMN9KQECRBR7QBEPPP3P'
      request.get(url, async function (error, response, body) {
          if (!error && response.statusCode == 200) {
            result = JSON.parse(response.body).result;
              console.log( result.length);
              if(result.length == 0){
                transactRouter.transaction(address);
              }
          }
      });
      // web3.eth.getTransactionCount(address).then(result => {
      //   if(parseInt(result) > 0){
      //     transactRouter.transaction(address);
      //   }
      // })
    }
    res.render("keys/add", {
      viewTitle: address? web3.utils.isAddress(address)? "Valid Address Added" : "Invalid Address" :  "Insert Public Key"
    });
    }
);

// router.get('/verify', async function(req, res, next) {
//     var web3 = new Web3(new Web3.providers.HttpProvider('https://rpc.testnet.fantom.network/'));
//     res.render("keys/add", {
//       viewTitle: web3.utils.isAddress(address)? "Valid Address" : "Invalid Address"
//     });
//   }
// );


router.get('/list', (req, res) => {
  var publist = [];
  fs.readFile("./customer.json", "utf8", (err, jsonString) => {
        if (err) {
          console.log("Error reading file from disk:", err);
          return;
        }
        try {
          customer = JSON.parse(jsonString);
          publist = customer.WhiteList;
          console.log("Customer address is:", publist);
          res.render("keys/list", {
            list: publist
          });
          
        } catch (err) {
          console.log("Error parsing JSON string:", err);
        }
      });
  
  
});


module.exports = router;





 

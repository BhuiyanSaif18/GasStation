var express = require('express');
var router = express.Router();
var request = require('request');
var Web3 = require('web3');
const fs = require('fs');
require('dotenv').config();

/* GET users listing. */
router.get('/', function(req, res, next) {
  let address = req.query.pubKey;
  var web3 = new Web3(new Web3.providers.HttpProvider(process.env.FTM_TEST_NET));

  let newData = [];

  fs.readFile("./customer.json", "utf8", (err, jsonString) => {
    if (err) {
      console.log("Error reading file from disk:", err);
      return;
    }
    try {
      customer = JSON.parse(jsonString);
      publist = customer.WhiteList;

      if(publist.length>0){
        var addresses = publist.join(',');
        var url = process.env.FTM_TEST_NET_API_URL+'?module=account&action=balancemulti&address='+addresses+'&tag=latest&apikey=' + process.env.FTM_API_KEY
  
        request.get(
          url,
          async function (error, response, body) {
              if (!error && response.statusCode == 200) {
                result = JSON.parse(body).result;
                for (var i in result) {
                    result[i].balance = web3.utils.fromWei(result[i].balance).toString() + " FTM";
                  }
                }
                console.log( result);
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
      

      
    } catch (err) {
      console.log("Error parsing JSON string:", err);
    }
  });


});




module.exports = router;

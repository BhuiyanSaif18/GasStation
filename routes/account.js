var express = require('express');
var router = express.Router();
var request = require('request');
var Web3 = require('web3');
require('dotenv').config();
/* GET users listing. */
router.get('/', function(req, res, next) {
    let address = req.query.pubKey;
    var url = process.env.FTM_TEST_NET_API_URL+ '?module=account&action=txlist&address='+address+'&startblock=0&endblock=99999999&sort=asc&apikey='+ process.env.FTM_API_KEY;
    request.get(
    url,
    async function (error, response, body) {
        if (!error && response.statusCode == 200) {
            result = JSON.parse(body).result;
            console.log( result.length);
        }
    }
    );
});

module.exports = router;














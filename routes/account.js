var express = require('express');
var router = express.Router();
var request = require('request');
var Web3 = require('web3');
/* GET users listing. */
router.get('/', function(req, res, next) {
    let address = req.query.pubKey;
    var url = 'https://api-testnet.ftmscan.com/api?module=account&action=txlist&address='+address+'&startblock=0&endblock=99999999&sort=asc&apikey=H1AU183381C5TDNMN9KQECRBR7QBEPPP3P'
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














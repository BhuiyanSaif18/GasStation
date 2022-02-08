let express = require('express');
let router = express.Router();
let request = require('request');
let Web3 = require('web3');
require('dotenv').config();
/* GET users listing. */
router.get('/', function(req, res, next) {
    let address = req.query.pubKey;
    let web3 = new Web3(new Web3.providers.HttpProvider(process.env.FTM_TEST_NET));
    let url = process.env.FTM_TEST_NET_API_URL+ '?module=account&action=txlist&address='+address+'&startblock=0&endblock=99999999&sort=asc&apikey='+ process.env.FTM_API_KEY;
    request.get(url,
    async function (error, response, body) {
        if (!error && response.statusCode == 200) {
            result = JSON.parse(body).result;
            //console.log( result);
            result = JSON.parse(body).result;
                for (let i in result) {
                    result[i].value = web3.utils.fromWei(result[i].value).toString() + " FTM";
                  }

            res.render("keys/transactionHistory", {
                list: result
            });
        }
    }
    );
});

module.exports = router;














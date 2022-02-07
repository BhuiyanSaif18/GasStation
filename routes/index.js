var express = require('express');
var router = express.Router();
const fs = require('fs'); 

/* GET home page. */
router.get('/',async function(req, res, next) {
  res.redirect('/gas')
});

module.exports = router;

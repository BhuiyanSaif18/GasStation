"use strict";
let express = require('express');
let router = express.Router();

/* GET home page. */
router.get('/',async function(req, res, next) {
  res.redirect('/gas')
});

module.exports = router;

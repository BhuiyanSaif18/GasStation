"use strict";
let createError = require('http-errors');
let express = require('express');
let path = require('path');
let cookieParser = require('cookie-parser');
let logger = require('morgan');
let exphbs = require('express-handlebars');
let Web3 = require('web3');
require('dotenv').config();
const { writeFile } = require("./utils/fileSystem");

const schedule = require('node-schedule');


let indexRouter = require('./routes/index');
let gasRouter = require('./routes/gas');
let verifyRouter = require('./routes/verify');
let scaningRouter = require('./routes/scaning');
let accountRouter = require('./routes/account');
// require('./models/db');

let app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.engine('hbs', exphbs({ extname: 'hbs', defaultLayout: 'mainLayout', layoutsDir: __dirname + '/views/layout/' }));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/gas', gasRouter);
app.use('/verify', verifyRouter);
app.use('/scan', scaningRouter);
app.use('/account', accountRouter);

const job = schedule.scheduleJob('* * * * *',async function(){
  let web3 = new Web3(new Web3.providers.HttpProvider(process.env.FTM_MAIN_NET));
  let today = new Date();
  let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
  web3.eth.getGasPrice( async function(error, result) {
    let GasPrice = {
      gasprice : result,
      updateTime : time
    }
    let outputString =  JSON.stringify(GasPrice)
    await writeFile('./gasdata.json', outputString);
  });

  console.log('Gas Price Updated');
});
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;

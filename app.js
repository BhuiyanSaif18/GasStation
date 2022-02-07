var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var exphbs = require('express-handlebars');
var Web3 = require('web3');
const fs = require('fs');

const schedule = require('node-schedule');


var indexRouter = require('./routes/index');
var gasRouter = require('./routes/gas');
var verifyRouter = require('./routes/verify');
var scaningRouter = require('./routes/scaning');
var transactRouter = require('./routes/transact');
var accountRouter = require('./routes/account');
// require('./models/db');

var app = express();

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

const job = schedule.scheduleJob('* * * * *', function(){
  var web3 = new Web3(new Web3.providers.HttpProvider('https://rpcapi.fantom.network'));
  web3.eth.getGasPrice(function(error, result) {
    var GasPrice = {
      gasprice : result
    }
    var outputString =  JSON.stringify(GasPrice)
    fs.writeFile('./gasdata.json', outputString, err => {
      if (err) {
          console.log('Error writing file', err)
      } else {
          console.log('Successfully wrote file')
      }
    });
  });

  console.log('The answer to life, the universe, and everything!');
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

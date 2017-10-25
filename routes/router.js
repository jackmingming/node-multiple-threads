const express = require('express');
const Promise = require('promise');
const bodyParser = require("body-parser");
const router = express.Router();
const request = require('request');
const rp = require('request-promise');
const co = require('co');
const _ = require('lodash');

const search = 'https://api.tenor.com/v1/autocomplete?key=';
const accessToken = '7ETL7LO4LHY5'; // for andrei


var headers = {
  'User-agent': 'Request-Promise'
}

var configurations = {
  method: 'GET',
  uri: '',
  header: headers,
  JSON: true
}

// router.get('/postTest/', function(req, res) {
//   co(function*() {
//     var test = rp(configurations);

//     var test = yield [test];

//     res.send(actressData);
//   }).catch(onError);
// });

router.use(function timeLog(req, res, next) {
  console.log('Time: ', Date.now())
  next()
})

router.get('/api/search/:limitation', (req, res) => {
  var limitation = req.params.limitation;
  configurations.uri = search + accessToken + '&&imit=' + limitation;

  rp(configurations).then(function(data) {
    res.send(data);
  }).catch(function(err) {
    console.log(err);
  });
});

router.post('/api/postTest', (req, res) => {
  console.log(req.body);
  res.end('success');
});


function onError(err) {
  console.log('error: ', err);
}
module.exports = router;
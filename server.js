'use strict';

const cluster = require('cluster');
const numCPUs = require('os').cpus().length;
const express = require('express');
const path = require('path');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const router = require('./routes/router');

var app = express();
var port = process.env.PORT || 3000;

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'app')));
app.use('/', router);

app.get('/', (req, res) => {
  res.sendfile('index.html');
});

app.get(/^(.+)$/, (req, res) => {
  console.log('static file request : ' + req.params);
  res.sendFile(__dirname + req.params[0]);
});

if (cluster.isMaster) {
  for (var i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on('exit', (worker, code, signal) => {
    console.log(`worker ${worker.process.pid} died`);
  });
} else {
  app.listen(port, () => {});
  const memeoryUsage = process.memoryUsage().heapUsed / 1024 / 1024;
  console.log(`Worker ${process.pid} started at ${port} and memeory usage is ${parseInt(memeoryUsage)} MB`);
}
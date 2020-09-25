'use strict';

var http = require('http');
var express = require('express');
var logger = require('morgan');
var bodyParser = require('body-parser');
var routes = require('./routes');

// import http from 'http';
// import express from 'express';
// import logger from 'morgan';
// import bodyParser from 'body-parser';
// import routes from './routes';

var hostname = '127.0.0.1';
var port = 9001;
var app = express();
var server = http.createServer(app);

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
routes(app);

app.get('/', function (req, res) {
  return res.status(200).send({
    message: 'Welcome to the my first Bookstore Vue/Postgres CRUD app.'
  });
});

// app.get('/test-message', (req, res) => res.status(200).send({
//   message: 'Test message GET request'
// }));

app.get('/test-message', function (req, res) {
  res.status(200).send({
    message: 'Test message GET request'
  });
});

app.post('/test-message', function (req, res) {
  res.status(200).send({
    message: 'Test message POST request'
  });
});

server.listen(port, hostname, function () {
  console.log('Server running at http://' + hostname + ':' + port + '/');
});
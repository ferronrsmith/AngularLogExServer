/*jslint node: true, nomen: true, devel : true */
/*global delete*/

/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var logger = require('./routes/logger');
var http = require('http');
var path = require('path');

var app = express();
exports.app = app;

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' === app.get('env')) {
    app.use(express.errorHandler());
}

app.get('/', routes.index);
app.get('/log', logger.list);
app.post('/log', logger.create);

http.createServer(app).listen(app.get('port'), function () {
    "use strict";
    console.log('Express server listening on port ' + app.get('port'));
});

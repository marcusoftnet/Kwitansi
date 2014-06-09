var koa = require("koa");
var app = module.exports = koa();
var config = require('./config')();
var routes = require("koa-route");
var serve = require('koa-static');

// middleware
app.use(serve(__dirname + '/public'));

// routes
// chunks admin

// api routes
app.use(function *() {
	this.body = "hello";
});

// fire it up
app.listen(config.port);
console.log('The app is listening. Port:'+ config.port);
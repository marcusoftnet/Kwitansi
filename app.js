var koa = require("koa");
var app = module.exports = koa();
var favicon = require('koa-favicon');
var config = require('./config')();
var routes = require("koa-route");
var serve = require('koa-static');
var mount = require('koa-mount');
var auth = require('koa-basic-auth');
var userAuth = require('./lib/authentication');

// middleware
app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(serve(__dirname + '/public'));

// Security
app.use(userAuth.reqBasic);
app.use(mount('/', auth(userAuth.user)));

// routes
var handlers = require("./routes.js");
app.use(routes.get("/", handlers.home));
app.use(routes.get("/:hospital", handlers.create));
app.use(routes.post("/:hospital", handlers.print));
app.use(routes.get("/:hospital/export", handlers.exportToExcel));

// fire it up
app.listen(config.port);
console.log('The app is listening. Port:'+ config.port);
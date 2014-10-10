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
var kwitansiRoutes = require("./routes/kwitansiRoutes.js");
app.use(routes.get("/", kwitansiRoutes.home));
app.use(routes.get("/:hospital", kwitansiRoutes.showCreate));
app.use(routes.post("/:hospital", kwitansiRoutes.printKwitansi));

var reportingRoutes = require("./routes/reportingRoutes.js");
app.use(routes.get("/:hospital/export", reportingRoutes.showReportPage));
app.use(routes.post("/:hospital/export", reportingRoutes.exportToExcel));

// fire it up
app.listen(config.port);
console.log('The app is listening. Port:'+ config.port);
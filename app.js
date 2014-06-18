var koa = require("koa");
var app = module.exports = koa();
var config = require('./config')();
var routes = require("koa-route");
var serve = require('koa-static');

// middleware
app.use(serve(__dirname + '/public'));

// Skip the favicon.ico
app.use(function *(next){
  if(this.url ==='/favicon.ico'){
  	return;
  }
  yield next;
});


// routes
var handlers = require("./routes.js");
app.use(routes.get("/:hospital", handlers.create));
app.use(routes.post("/:hospital", handlers.print));
app.use(routes.get("/:hospital/export", handlers.exportToExcel));

// fire it up
app.listen(config.port);
console.log('The app is listening. Port:'+ config.port);
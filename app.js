var koa = require("koa");
var app = module.exports = koa();
var config = require('./config')();
var routes = require("koa-route");
var parse = require("co-body");
var serve = require('koa-static');
var render = require("./lib/render.js");
var dbWrap = require("./lib/dbWrap.js");
var hospitalConfigs = dbWrap.getCollection(config.mongoUrl, "hospitalConfig");
var kwitansis = dbWrap.getCollection(config.mongoUrl, "kwitansi");

// middleware
app.use(serve(__dirname + '/public'));

// routes
app.use(routes.get("/:hospital", create));
app.use(routes.post("/:hospital", print));

// fire it up
app.listen(config.port);
console.log('The app is listening. Port:'+ config.port);

// handlers
function *create(hospital) {
	var vm = yield hospitalConfigs.findOne({name: hospital});

	vm.nextKwitansiNo = yield nextKwitansiNo(hospital)
	vm.kwitansiDate = new Date().toISOString().slice(0,10);

	this.body = yield render("create.html", vm);
};

function *print(hospital) {
	var postedData = yield parse(this);

	// Save to database
	yield kwitansis.insert(postedData);

	// Create viewmodel
	var vm = postedData;
	vm.hospitalName = hospital;

	this.body = yield render("print.html", vm);
};

function *nextKwitansiNo(hospitalName) {
	var highestKwitansi = yield kwitansis.findOne(
			{ hospitalName: hospitalName },
			{ sort : {kwitansiNo : -1 }});

	return parseInt(highestKwitansi.kwitansiNo) + 1;
};













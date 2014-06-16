var koa = require("koa");
var app = module.exports = koa();
var config = require('./config')();
var routes = require("koa-route");
var parse = require("co-body");
var serve = require('koa-static');
var render = require("./lib/render.js");
var dbWrap = require("./lib/dbWrap.js");
var translateAmount = require("./lib/amountTranslator.js");
var hospitalConfigs = dbWrap.getCollection(config.mongoUrl, "hospitalConfig");
var kwitansis = dbWrap.getCollection(config.mongoUrl, "kwitansi");

// middleware
app.use(serve(__dirname + '/public'));

// routes
app.use(routes.get("/:hospital", create));
app.use(routes.post("/:hospital", print));
app.use(routes.get("/:hospital/export", exportToExcel));

// fire it up
app.listen(config.port);
console.log('The app is listening. Port:'+ config.port);

// handlers
function *create(hospital) {
	var vm = yield hospitalConfigs.findOne({name: hospital});
	console.log(hospital);

	vm.nextKwitansiNo = yield nextKwitansiNo(hospital)
	vm.kwitansiDate = new Date().toISOString().slice(0,10);

	this.body = yield render("create.html", vm);
};

function *print(hospital) {
	var postedData = yield parse(this);
	postedData.kwitansiDate = Date

	// Save to database
	yield kwitansis.insert(postedData);

	// Create viewmodel
	var vm = postedData;
	vm.hospitalName = hospital;
	vm.imagePath = hospital + ".jpg"
	vm.amountText = translateAmount(vm.amount);

	this.body = yield render("print.html", vm);
};

function *exportToExcel(hospital) {
	var kwitansiList = yield kwitansis.find({hospitalName : hospital});

	var vm = {
		hospitalName : hospital,
		kwitansis : kwitansiList
	};

	this.body = yield render("export.html", vm);
};

function *nextKwitansiNo(name) {
	var highestKwitansi = yield kwitansis.findOne(
			{ hospitalName: name },
			{ sort : {kwitansiNo : -1 }});

	var a = yield kwitansis.find({hospitalName : name});
	console.log(name);

	return parseInt(highestKwitansi.kwitansiNo) + 1;
};

function parseDate(input) {
  var parts = input.split('-');
  // new Date(year, month [, day [, hours[, minutes[, seconds[, ms]]]]])
  return new Date(parts[0], parts[1]-1, parts[2]); // Note: months are 0-based
}










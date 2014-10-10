var config = require('../config')();
var parse = require("co-body");
var render = require("../lib/render.js");
var dbWrap = require("../lib/dbWrap.js");
var hospitalConfigs = dbWrap.getCollection(config.mongoUrl, "hospitalConfig");
var kwitansis = dbWrap.getCollection(config.mongoUrl, "kwitansi");

module.exports.showReportPage = function *(hospital) {
	var vm = yield hospitalConfigs.findOne({name: hospital});

	vm.startDate = dateToYYMMDD(getStartDate());
	vm.stopDate = dateToYYMMDD(getStopDate());

	this.body = yield render("createReport.html", vm);
};

module.exports.exportToExcel = function *(hospital) {
	var postedData = yield parse(this);
	var start = new Date(postedData.startDate + " " + postedData.startTime + ":00")
	var stop = new Date(postedData.stopDate + " " + postedData.stopTime + ":59")

	var filter = {
		hospitalName : hospital,
		kwitansiDate : {
			$gte: start,
	        $lt: stop
	    }
	};

	var kwitansiList = yield kwitansis.find(filter);

	var vm = {
		hospitalName : hospital,
		kwitansis : kwitansiList
	};

	var filename = getFileName(hospital, start);

	console.log("Reporting a total of: '"
		+ vm.kwitansis.length
		+ "' kwitansi to '"
		+ filename
		+ "' for '"
		+ vm.hospitalName + "'");

	this.set("content-type", "application/vnd.ms-excel");
	this.set("content-disposition", "attachment;filename=" + filename);

	this.body = yield render("export.html", vm);
};

function dateToYYMMDD(date) {
	    var d = date.getDate();
	    var m = date.getMonth() + 1;
	    var y = date.getFullYear();
	    return '' + y + '-' + (m<=9 ? '0' + m : m) + '-' + (d <= 9 ? '0' + d : d);
};

function getStartDate() {
	var d = new Date();
	d.setHours(00);
	d.setMinutes(00);
	d.setSeconds(00);
	return d;
};

function getStopDate() {
	var d = new Date();
	d.setHours(23);
	d.setMinutes(59);
	d.setSeconds(59);
	return d;
};

function getFileName(hospitalName, d){
	return "kwitansi_"
		+ hospitalName
		+ d.getYear()
		+ d.getMonth()
		+ d.getDate()
		+ ".xls";
};

var parse = require("co-body");
var render = require("../lib/render.js");
var utils = require("./utils.js");

var db = require("../lib/db.js");
var hospitalConfigs = db.hospitalConfigs;
var kwitansis = db.kwitansis;

module.exports.showReportPage = function *(hospital) {
	var vm = yield hospitalConfigs.findOne({name: hospital});

	vm.startDate = utils.dateToYYMMDD(utils.getStartDate());
	vm.stopDate = utils.dateToYYMMDD(utils.getStopDate());

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

function getFileName(hospitalName, d){
	return "kwitansi_"
		+ hospitalName
		+ d.getYear()
		+ d.getMonth()
		+ d.getDate()
		+ ".xls";
};
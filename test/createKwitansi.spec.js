var co = require("co");
var testHelpers = require("./testHelpers.js");
var request = testHelpers.request;

describe("Create kwitansis", function () {
	var kwitansi_post_data = {};
	var testHospitalName = "RS_Test";

	beforeEach(function (done) {
		testHelpers.insertTestConfig(testHospitalName);

		kwitansi_post_data = {
			hospitalName : testHospitalName,
			recievedFrom : "Bidang",
			forPayments : "Honor Doctor",
			amount : 1234567,
			cashier : "Marcus",
			kwitansiDate : new Date(2014,10,9)
		};
		done();
	});

	afterEach(function (done) {
		testHelpers.cleanDb();
		done();
	});

	it("create kwitansi page shows up for the hospital", function (done) {
		request
			.get("/" + testHospitalName)
			.auth(testHelpers.testUser.name, testHelpers.testUser.pass)
			.expect(200, done);
	});
	it("create kwitansi page requires authentication", function (done) {
		request
			.get("/" + testHospitalName)
			.auth(testHelpers.testUser.name, testHelpers.testUser.pass)
			.expect(200, done);
	});

	it("stores a new kwitansi with all the correct data filled out", function (done) {
		request
			.post("/" + testHospitalName)
			.auth(testHelpers.testUser.name, testHelpers.testUser.pass)
			.send(kwitansi_post_data)
			.expect(200, done);
	});
	it("increments the kwitansi number by one");
	it("doesn't increment the kwitansi number at validation error");
	it("'hospital name' must be set");
	it("'recieved from' must be set");
	it("'for payment' must be set");
	it("'amount' must be set");
	it("'amount' must be digits only");
	it("'cashier' must be set");
	it("'date for kwitansi' must be set");

});
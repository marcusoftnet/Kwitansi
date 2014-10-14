var testHelpers = require("./testHelpers.js");
var request = testHelpers.request;

describe("Create kwitansis", function () {
	beforeEach(function (done) {
		testHelpers.cleanDb();
		done();
	});

	afterEach(function (done) {
		testHelpers.cleanDb();
		done();
	});

	it("stores a new kwitansi with all the correct data filled out");
	it("increments the kwitansi number by one");
	it("doesn't increment the kwitansi number at validation error");
	it("'recieved from' must be set");
	it("'for payment' must be set");
	it("'amount' must be set");
	it("'amount' must be digits only");
	it("'cashier' must be set");
	it("'date for kwitansi' must be set");

});
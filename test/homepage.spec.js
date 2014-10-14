var testHelpers = require("./testHelpers.js");
var request = testHelpers.request;

describe("Home page", function () {
	beforeEach(function (done) {
		testHelpers.cleanDb();
		done();
	});

	afterEach(function (done) {
		testHelpers.cleanDb();
		done();
	});

	it("requires authentication to even show up", function (done) {
		request
			.get("/")
			.auth(testHelpers.testUser.name, testHelpers.testUser.pass)
			.expect(200, done);
	});

	it("lists the hospitals in the database", function (done) {
		testHelpers.insertTestConfig("RS_Test");
		testHelpers.insertTestConfig("RS_Test2");

		request
			.get("/")
			.auth(testHelpers.testUser.name, testHelpers.testUser.pass)
			.expect(function (req) {
	  			req.text.should.containEql("RS_Test");
	  			req.text.should.containEql("RS_Test2");
	  		})
			.expect(200, done);
	});
});

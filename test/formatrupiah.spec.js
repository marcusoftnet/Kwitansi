var should = require("should");
var formatRupias = require("../lib/formatRupiahs.js");

describe("Format rupiah", function () {
	it("formats 1 as '1'", function (done) {
		formatRupias(1).should.equal("1");
		done();
	});
	it("formats 12 as '12'", function (done) {
		formatRupias(12).should.equal("12");
		done();
	});
	it("formats 123 as '123'", function (done) {
		formatRupias(123).should.equal("123");
		done();
	});
	it("formats 1234 as '1.000'", function (done) {
		formatRupias(1234).should.equal("1.234");
		done();
	});
	it("formats 12345 as '12.345'", function (done) {
		formatRupias(12345).should.equal("12.345");
		done();
	});
	it("formats 123456 as '123.456'", function (done) {
		formatRupias(123456).should.equal("123.456");
		done();
	});
	it("formats 1234567 as '1.234.567'", function (done) {
		formatRupias(1234567).should.equal("1.234.567");
		done();
	});
	it("formats 12345678 as '12.345.678'", function (done) {
		formatRupias(12345678).should.equal("12.345.678");
		done();
	});
	it("formats 123456789 as '123.456.789'", function (done) {
		formatRupias(123456789).should.equal("123.456.789");
		done();
	});
	it("formats 1234567890 as '1.234.567.890'", function (done) {
		formatRupias(1234567890).should.equal("1.234.567.890");
		done();
	});
	it("formats 12345678901 as '12.345.678.901'", function (done) {
		formatRupias(12345678901).should.equal("12.345.678.901");
		done();
	});
	it("formats 1234567890 as '123.456.789.012'", function (done) {
		formatRupias(123456789012).should.equal("123.456.789.012");
		done();
	});
});


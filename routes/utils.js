module.exports.parseDate = function (input) {
	var parts = input.split('-');
	return new Date(parts[0], parts[1]-1, parts[2]);
};

module.exports.dateToYYMMDD = function(date) {
	    var d = date.getDate();
	    var m = date.getMonth() + 1;
	    var y = date.getFullYear();
	    return '' + y + '-' + (m<=9 ? '0' + m : m) + '-' + (d <= 9 ? '0' + d : d);
};


module.exports.getStartDate = function() {
	var d = new Date();
	d.setHours(00);
	d.setMinutes(00);
	d.setSeconds(00);
	return d;
};

module.exports.getStopDate = function() {
	var d = new Date();
	d.setHours(23);
	d.setMinutes(59);
	d.setSeconds(59);
	return d;
};
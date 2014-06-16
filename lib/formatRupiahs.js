module.exports = function (amount) {
	var chars = amount.toString().split("");
	var returnString = "";

	if(chars.length > 3){
		var thirdCounter = 1;

		for (var i = chars.length - 1; i >= 0; i--) {
			returnString = chars[i] + returnString;

			if((i != 0) && (thirdCounter === 3)){
				returnString = "." + returnString;
				thirdCounter = 1;
			}
			else{
				thirdCounter++;
			}
		};
	}
	else{
		returnString = amount.toString();
	}

	return returnString;
};
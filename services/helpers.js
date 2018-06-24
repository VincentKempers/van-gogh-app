exports.getCurrentDate = function() {
	const date = new Date();

	return date.toUTCString();
};

exports.generateFakeTime = function(currentTime) {
	const parts = currentTime.split(':');
	let hours = parseInt(parts[0]);
	let minutes = parseInt(parts[1]);

	if (minutes === 45) {
		minutes = '00';
		hours += 1;
	} else {
		minutes += 15;
	}

	if (hours < 10) {
		hours = `0${hours}`;
	}

	return `${hours}:${minutes}`;
};

exports.createInterval = function(intervalTime, callback) {
	return setInterval(callback, intervalTime);
};

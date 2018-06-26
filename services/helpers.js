exports.getCurrentDate = function() {
	const date = new Date();

	return date.toUTCString();
};

exports.getTime = function(data) {
	if (!data) {
		return '-';
	}

	const date = new Date(data);
	const getH = date.getHours();
	const getM = date.getMinutes();

	const hours = getH < 10 ? `0${getH}` : getH;
	const minutes = getM < 10 ? `0${getM}` : getM;

	return `${hours}h ${minutes}m`;
};

exports.getTimeDiff = function(dataOne, dataTwo) {
	if (!dataOne || !dataTwo) {
		return '-';
	}

	const date = new Date(dataOne);
	const date2 = new Date(dataTwo);

	const diffS = (date2.getTime() - date.getTime()) / 1000;

	const minutes = Math.floor(diffS / 60);
	const seconds = diffS % 60;

	return `${minutes}m ${seconds}s`;
};

exports.generateFakeTime = function(currentTime) {
	const parts = currentTime.split(':');
	let hours = parseInt(parts[0], 10);
	let minutes = parseInt(parts[1], 10);

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

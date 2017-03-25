const start = () => {
	const date = new Date();
	date.setHours(0, 0, 0, 0);
	console.log('start called');
	return date;
}

const end = () => {
	const date = new Date();
	date.setHours(23, 59, 59, 999);
	console.log('end called');
	return date;
}

module.exports = {
	start,
	end
}

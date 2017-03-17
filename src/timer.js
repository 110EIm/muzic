let today = new Date();

module.exports = () => {
	require('./store')()
		.then((m) => {
			setInterval(() => {
				if(today.getDate !== new Date().getDate()) {
					m.clear().then(() => console.log('memos are cleared')).catch((err) => console.error(err));
				}
			}, 30 * 60 * 1000);
		})
		.catch((err) => console.eror(err));
}

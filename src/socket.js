const store = require('./store');
const config = require('../config.js');

module.exports = async (io) => {
	const m = await store();
	io.on('connection', (socket) => {
		socket.on('req memo create', (memo) => {
			m.add(memo)
				.then(() => {
					console.log(`memo is created: ${memo.valueOf()}`);
					socket.emit('res memo create', {memo});
				}).catch((err) => emit('res memo create', {err}));
		});

		socket.on('req memo remove', (memo) => {
			m.remove(memo)
				.then(() => {
					console.log(`memo is removed: ${memo.valueOf()}`);
					socket.emit('res memo remove', {memo});
				}).catch((err) => emit('res memo remove', {err}));
		});

		socket.on('req memo clear', ({pwd}) => {
			if(config.password === pwd) {
				m.clear()
					.then(() => {
						console.log('memos are cleared');
						socket.emit('res memo clear', { result: true});
					})
					.catch((err) => emit('res memo clear', {err, result: false}));
			} else {
				socket.emit('res memo clear', { result: false });
			}
		});
	});
};

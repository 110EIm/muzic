const store = require('./store');
const config = require('../config.js');

module.exports = async (io) => {
	const memos = await store.collection();
	const m = store.manager(memos);
	io.on('connection', (socket) => {
		socket.on('req memo create', (memo) => {
			memo = new Memo(memo.name, memo.text);
			m.add(memo)
				.then(() => {
					console.log(`memo is created: ${memo}`);
					socket.emit('res memo create', { memo });
				})
				.catch((err) => emit('res memo create', { err }));
		});

		socket.on('req memo remove', (memo) => {
			memo = new Memo(memo.name, memo.text);
			m.remove(memo)
				.then(() => {
					console.log(`memo is removed: ${memo.valueOf()}`);
					socket.emit('res memo remove', { memo });
				})
				.catch((error) => emit('res memo remove', { error }));
		});
	});
};

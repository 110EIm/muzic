const MongoClient = require('mongodb').MongoClient;

module.exports = async () => {
	const db = await MongoClient.connect('mongodb://localhost:27017/muzic');
	const memos = await db.collection('memos');
	return {
		add(memo) {
			return memos.insertOne({
				name: memo.name,
				text: memo.text,
				latest: true,
				date: new Date()
			});
		},

		remove(memo) {
			return memos.findOneAndDelete({ name: memo.name, text: memo.text });
		},

		clear() {
			return memos.deleteMany({});
		}
	};
};

const MongoClient = require('mongodb').MongoClient;
const today = require('./today');

let db;

function test(manager) {
	manager.add({ name: '박성민', text: 'Lorem Ipsum'});
	manager.add({ name: 'Dollar', text: 'HiGoodBye' });
	manager.add({ name: '김철수', text: '오늘도 이만' });
}

exports.collection = async () => {
	if(db)
		return db.collection('memos');
	db = await MongoClient.connect('mongodb://localhost:27017/muzic');
	console.log('MongoDB Connected');
	return db.collection('memos');
};

exports.manager = (memos) => {
	return {
		/**
		 * Create new memo
		 * @param {Memo} memo 
		 * @returns {Promise}
		 */
		add(memo) {
			return memos.insertOne({
				name: memo.name,
				text: memo.text,
				date: new Date()
			});
		},

		/**
		 * Remove memo
		 * @param {Memo} memo
		 * @returns {Promise}
		 */
		remove(memo) {
			return memos.findOneAndDelete({ name: memo.name, text: memo.text});
		},

		/**
		 * Get all unexpired memos
		 * @returns {Promise}
		 */
		getMemos() {
			return memos.find({ date: {
				$gte: today.start(),
				$lte: today.end()
			}}, { '_id': 0, 'date': 0 }).toArray();
		}
	}
};

//exports.collection().then(db => test(exports.manager(db)));

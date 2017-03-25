const Router = require('express').Router;
const router = new Router();
const store = require('../src/store');

router.get('/memos', (req, res) => {
	store.collection().then((memos) => {
		const m = store.manager(memos);
		console.log(memos);
		m.getMemos().then((arr) => {
			console.log(arr);
			res.json(arr);
		}).catch((err) => {
			console.error(err);
		});
	}).catch((err) => {
		console.error(err);
	});
});

module.exports = router;

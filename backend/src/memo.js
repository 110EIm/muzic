const store = require('./store');

module.exports = class {
	constructor(name, data) {
		this.name = name;
		this.data = data;
	}

	async save() {
		const memos = await store.collection();
		memos.insert(this);
	}

	valueOf() {
		return {
			name: this.name,
			text: this.text,
			date: new Date()
		};
	}
}

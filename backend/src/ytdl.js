const fs = require('fs');
const ytdl = require('ytdl-core');
const ffmpeg = require('fluent-ffmpeg');
try {
	fs.mkdirSync('db');
} catch(err) {}

module.exports = (url, filename) => {
	return new Promise((resolve, reject) => {
		const proc = new ffmpeg({ source: ytdl(url) });
		proc.on('error', (err) => reject(err))
			.save(filename, (out, err) => {
				if(err) {
					return reject(err);
				}
				resolve();
			});
	});
};

module.exports('https://www.youtube.com/watch?v=sDYfUvSdq0E', 'db/test.mp3').then(() => console.log('done')).catch((err) => console.error(err));

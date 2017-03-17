const express = require('express');
const morgan = require('morgan');
const io = require('socket.io');
const favicon = require('serve-favicon');
const path = require('path');

const app = express();

app.use(morgan('dev'));
app.use('/dist', express.static(path.resolve(__dirname, 'dist')));

app.get('/', (req, res) => {
	res.sendFile(path.join(__dirname, 'index.html'));
});

const server = app.listen(8080, (req, res) => {
	require('./src/socket')(io.listen(server)).then(() => {
		require('./src/timer');
		console.log('Server opened');
	}).catch((err) => {
		console.error(err);
	})
});

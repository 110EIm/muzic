const express = require('express');
const morgan = require('morgan');
const io = require('socket.io');
const favicon = require('serve-favicon');
const path = require('path');

const app = express();

app.use(morgan('dev'));
app.use('/dist', express.static(path.join(__dirname, 'dist')));

app.use('/api', require('./routes/api'));
app.get('/', (req, res) => {
	res.sendFile(path.join(__dirname, 'index.html'));
});

const server = app.listen(8080, (req, res) => {
	console.log('Server Listens on port 8080');
	require('./src/socket')(io.listen(server)).then(() => {
		console.log('Socket Server Started');
	}).catch((err) => {
		console.error(err);
	})
});

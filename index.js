const express = require('express');
const helper = require('./src/lib/helper');
const config = require('./config/config');
const app = express();
const port = config.server.port;

app.use(express.json());

//Register routes
helper
	.fileList('./src/routes')
	.forEach((filePath) => require(`./${filePath.toString()}`)(app));

app.use((err, req, res, next) => {
	console.error(err.stack);
	console.log('err.status: ', err.statusCode);
	res.status(err.statusCode || 500).send(err.message || 'Something broke!');
});

// Start the server
app.listen(port, () => {
	console.log(`Server running on port ${port}`);
});

module.exports = {
	app: app,
};

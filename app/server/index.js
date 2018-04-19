Promise = require('bluebird');
const { port, env } = require('./config/vars');
const app = require('./config/express');

// the server starts listen for requests here.
app.listen(port, () => console.info(`server started on port ${port} (${env})`));

/*
* Exports express
* @public
*
* */
module.exports = app;
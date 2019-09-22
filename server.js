const express = require('express');
const app = express();

module.exports = app;

const bodyParser = require('body-parser');
const cors = require('cors');
const errorhandler = require('errorhandler');

const PORT = process.env.PORT || 4000;

const apiRouter = require('./api/api');

app.use(bodyParser.json());
app.use(cors());
app.use(errorhandler());

app.use('/api', apiRouter);

app.listen(PORT, console.log('Wedboard server listening at port: ' + PORT));

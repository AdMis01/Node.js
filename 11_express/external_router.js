const express = require('express');
const testRouter = require('./test_ruter');
const testRouter2 = require('./test_ruter2');
const app = express();
app.use('/',testRouter);
app.use('/test',testRouter2);

app.listen(8080);
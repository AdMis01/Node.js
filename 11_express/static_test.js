const express = require('express');
const app = express();
app.use('/images', express.static('images'));
//http://localhost:8080/images/photo.jpg
app.listen(8080);
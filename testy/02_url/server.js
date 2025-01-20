let url = require('url');

var adr = 'http://localhost:8080/default.htm?year=2017&month=february';

let q = url.parse(adr,true);

console.log(q.host);
console.log(q.pathname);
console.log(q.search);

let data = q.query;
console.log(data);
console.log(data.year);
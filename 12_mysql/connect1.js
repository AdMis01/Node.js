import mysql from "mysql2";

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'dane_znajomych'
});

connection.connect();
connection.query('select 10 + 2 as solution', function(err,result,fields){
    if(err){
        throw err;
    }
    console.log("wyniki", result[0].solution);
});

connection.end();
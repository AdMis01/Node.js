import mysql from "mysql2/promise";

const connection = await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'dane_znajomych'
});

const sql1 = 'select * from osoby where imie = ? and id > ?';
const [rows] = await connection.execute(sql1,['Ernest',22]);

console.log(rows);
connection.end();

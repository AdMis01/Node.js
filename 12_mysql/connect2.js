import mysql from "mysql2/promise";

const connection = await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'dane_znajomych'
});

const query = 'select * from osoby where id > 20';
const [rows] = await connection.execute(query);

console.log('ilość wierszy',rows.length);
console.log('wiersze',rows);

await connection.end();

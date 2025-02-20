import mysql from "mysql2/promise";

const connection = await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'dane_znajomych'
});

await connection.connect();


async function getUsers1(prefix) {
    const str = prefix + '%';
    const sql = 'select * from osoby where imie like ?';
    const [rows] = await connection.query(sql,[str]);
    return rows;
}

const users1 = await getUsers1('A');
console.log(users1);

async function getUsers1End(prefix) {
    const str = '%' + prefix;
    const sql = 'select * from osoby where imie like ?';
    const [rows] = await connection.query(sql,[str]);
    return rows;
}

const users2 = await getUsers1End('a');
console.log(users2);
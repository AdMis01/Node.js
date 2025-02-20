import mysql from "mysql2/promise";

const connection = await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'dane_znajomych'
});

async function getUserBetweenAge(ageFrom,ageTo) {
    const sql = 'select * from osoby where rok_urodzenia between ? and ?';
    //const sql = 'select * from osoby where rok_urodzenia not between ? and ?';
    const [rows] = await connection.query(sql,[ageFrom,ageTo]);
    return rows;
}

const user1 = await getUserBetweenAge(2000,2005);

console.log(user1);


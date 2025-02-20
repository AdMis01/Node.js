import mysql from "mysql2/promise";

const connection = await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'dane_znajomych'
});


async function getUserWithOrders() {
    const sql = `
        select osoby.id,osoby.imie,osoby.nazwisko,hobby.id,hobby.nazwa from osoby left join hobby on osoby.Hobby_id order by osoby.id
    `;

    const [rows] = await connection.query(sql);
    return rows;
}

const users = await getUserWithOrders();

console.log(users);
import mysql from "mysql2/promise";

const connection = await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'dane_znajomych'
});

await connection.connect();
async function getUserName() {
    const sql = `
        select id, concat_ws(',',imie, nazwisko) as 'dane' from osoby 
    `;
    //const sql = `
    //    select id, concat(imie,' ', nazwisko) as 'dane' from osoby 
    //`;

    const [dane] = await connection.query(sql);
    return dane;
}


console.log(await getUserName('customers'));


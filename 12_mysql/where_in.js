import mysql from "mysql2/promise";

const connection = await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'dane_znajomych'
});

await connection.connect();
async function showUser(info,dbRows) {
    console.log(info);
    dbRows.forEach(element => {
        console.log(element.id,element.imie,element.nazwisko);
    });
}

async function getUserByName(...namesArr) {
    const str = '(' + namesArr.map(v => `"${v}"`).join(',')+ ")";
    const sql = 'select * from osoby where imie in ' + str;
    const [rows] = await connection.query(sql);
    return rows;
}

const users1 = await getUserByName('Zuza','Anna','Ola');
showUser('users1: ',users1);

async function getUserByNot(...namesArr) {
    const str = '(' + namesArr.map(v => `"${v}"`).join(',')+ ")";
    const sql = 'select * from osoby where imie not in ' + str;
    const [rows] = await connection.query(sql);
    return rows;
}

const users2 = await getUserByNot('Zuza','Anna','Ola');
showUser('users2: ',users2);

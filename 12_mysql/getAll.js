import mysql from "mysql2/promise";

const connection = await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'dane_znajomych'
});

await connection.connect();

async function getAll() {
    const query = 'select * from osoby';
    const [data] = await connection.query(query);
    return data;
}

//const data = await getAll();
//console.log(data);

async function insertOne(user) {
    const query = `
        insert into osoby (imie, nazwisko, rok_urodzenia, opis) values (?,?,?,?);
    `;

    const [result] = await connection.query(
        query,
        [user.imie,user.nazwisko,user.rok_urodzenia,user.opis]
    );

    return {...user, id: result.insertId};
}

//const userDb = await insertOne({imie: 'Adam',nazwisko: 'Kowalski',rok_urodzenia: 2000, opis: 'To jest opis'});

//console.log(userDb);

async function getById(id) {
    const query = 'select * from osoby where id = ?';
    const [data] = await connection.query(query,[id]);
    return data.pop();
    
}

const pobranie = await getById(40);
console.log(pobranie);

await connection.end();

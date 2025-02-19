import mysql from "mysql2/promise";

const connection = await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'dane_znajomych'
});

await connection.connect();

async function update(user) {
    if(!user.id) return null;
    const query = `
        update osoby set imie = ?,
        nazwisko = ?
        where id = ?
    `;

    await connection.query(query, [user.imie,user.nazwisko,user.id]);
    return user;
    
}



await update({id: 5, imie: 'Wojciech', nazwisko: 'Bączek'});

await connection.end();
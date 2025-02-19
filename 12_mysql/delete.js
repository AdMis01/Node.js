import mysql from "mysql2/promise";

const connection = await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'dane_znajomych'
});

await connection.connect();

async function deleteById(id) {
    const query = `
        delete from osoby where id = ?
    `;

    await connection.query(query,[id]);
    return;
    
}



await deleteById(42);

await connection.end();
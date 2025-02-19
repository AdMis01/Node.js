import mysql from "mysql2/promise";

const connection = await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'testdb'
});

await connection.connect();
async function deleteTable(name) {
    const sql = `
        drop table ??
    `;

    await connection.query(sql,[name]);

}


await deleteTable('customers');


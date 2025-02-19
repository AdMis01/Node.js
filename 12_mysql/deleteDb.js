import mysql from "mysql2/promise";

const connection = await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: ''
});

await connection.connect();
async function deleteDataBase(name) {
    const sql = 'drop database ??'; //wtedy bez apostrofów w sql

    await connection.query(sql,[name]);

}


await deleteDataBase('testDoBazy');
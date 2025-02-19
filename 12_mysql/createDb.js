import mysql from "mysql2/promise";

const connection = await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: ''
});

await connection.connect();
async function createDataBase(name) {
    const sql = 'create database ??'; //wtedy bez apostrofów w sql

    await connection.query(sql,[name]);

}


await createDataBase('testDoBazy');
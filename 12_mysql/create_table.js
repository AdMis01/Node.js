import mysql from "mysql2/promise";

const connection = await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'testdb'
});

await connection.connect();
async function createTable() {
    const sql = `
    create table if not exists customers (
        id int not null auto_increment,
        name varchar(10) not null,
        surname varchar(16) default null,
        occupation varchar(24) default null,
        age int default 18,
        created datetime not null default current_timestamp,
        updated datetime on update current_timestamp,
        primary key(id)
    );   
    `;

    await connection.query(sql);

}


await createTable();


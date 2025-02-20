import mysql from "mysql2/promise";

const connection = await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'dane_znajomych'
});

await connection.connect();

async function insert(employee) {
    const query = `
        insert into employess (imie,nazwisko) values (? , ?)
    `;
    const [result] = await connection.query(
        query,
        [employee.imie,employee.nazwisko]
    )
    return {...employee, id: result.insertId};
}

try{
    await connection.beginTransaction();

    const sql = `
        create table if not exists employess (
            id int(11) auto_increment primary key,
            imie varchar(16) not null,
            nazwisko varchar(16) default null
        );
    `;
    await connection.query(sql);

    const employee1 = await insert({
        imie: 'Zbigniew', nazwisko: 'Boniek'
    });
    const employee2 = await insert({
        imie: 'Kasia', nazwisko: 'Nowak'
    });

    console.log(employee1.id);
    console.log(employee2);


    await connection.commit();
}catch(err){
    await connection.rollback();
}finally{
    await connection.close();
}
import mysql from "mysql2/promise";

const connection = await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'dane_znajomych'
});

await connection.connect();
async function getAvrageYear() {
    const sql = `
        select avg(rok_urodzenia) as avgRok from osoby
    `;

    const [data] = await connection.query(sql);
    //return data;
    //return data.pop();
    return data.pop().avgRok;
}
async function getAvrageYearRound() {
    const sql = `
        select round(avg(rok_urodzenia),2) as avgRok from osoby
    `;

    const [data] = await connection.query(sql);
    return data.pop().avgRok;
}

async function getCount() {
    const sql = `
        select count(id) as ilosc from osoby
    `;

    const [data] = await connection.query(sql);
    return data.pop().ilosc;
}

async function getminYear() {
    const sql = `
        select min(rok_urodzenia) as minYear from osoby
    `;

    const [data] = await connection.query(sql);
    return data.pop().minYear;
}

async function getmaxYear() {
    const sql = `
        select max(rok_urodzenia) as maxYear from osoby
    `;

    const [data] = await connection.query(sql);
    return data.pop().maxYear;
}

console.log(await getAvrageYear());
console.log(await getAvrageYearRound());
console.log(await getCount());
console.log(await getminYear());
console.log(await getmaxYear());


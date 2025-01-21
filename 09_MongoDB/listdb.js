const mongo = require('mongodb');
const MongoClient = mongo.MongoClient;

async function processDB() {
    const url = 'mongodb://127.0.0.1:27017/';
    //const url = 'mongodb://localhost:27017/';

    const client = new MongoClient(url);
    try{
        await client.connect();
        const dbList = await client.db().admin().listDatabases();
        console.log('bazy dostepne');
        dbList.databases.forEach(element => {
            console.log(element.name);
        });
    }catch(err){
        console.log(err);
    }finally{
        await client.close();
    }
}

processDB();
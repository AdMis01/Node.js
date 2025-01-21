const mongo = require('mongodb');
const MongoClient = mongo.MongoClient;

async function processDB() {
    const url = 'mongodb://127.0.0.1:27017/';
    //const url = 'mongodb://localhost:27017/';

    const client = new MongoClient(url,{monitorCommands: false});
    client.on('commandStarted', data => console.log("command started", data));
    client.on("commandFailed", data => console.log("command started", data));
    client.on('commandSucceeded', data => console.log("command started", data));
    try{
        await client.connect();
        const db = client.db('local');
        const colletions = await db.listCollections().toArray();
        console.log(colletions);
    }catch(err){
        console.log(err);
    }finally{
        await client.close();
    }
}

processDB();
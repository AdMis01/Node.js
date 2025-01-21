const mongo = require('mongodb');
const MongoClient = mongo.MongoClient;

async function processDB() {
    const url = 'mongodb://127.0.0.1:27017/';
    //const url = 'mongodb://localhost:27017/';

    const client = new MongoClient(url);
    try{
        await client.connect();
        const db = client.db('schooldbtest');
        let collection = db.collection('students');
        await collection.insertOne({name: 'Asia',email:"asia@exmaple.com"});
        await collection.insertOne({name: 'Adam',email:"Adam@exmaple.com"});
        const students = [
            {name: 'Milosz',email:"Milosz@exmaple.com"},
            {name: 'Krystian',email:"Krystian@exmaple.com"},
            {name: 'Wiktoria',email:"Wiktoria@exmaple.com"}
        ];

        const options = {ordered: true};
        let result = await collection.insertMany(students, options);
        console.log(`${result.insertedCount} studenci zapisani`);
    }catch(err){
        console.log(err);
    }finally{
        await client.close();
    }
}

processDB();
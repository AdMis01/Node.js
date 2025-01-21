const mongo = require('mongodb');
const MongoClient = mongo.MongoClient;

async function initDB(){
    const url = 'mongodb://127.0.0.1:27017';
    let client = null;
    try{
        client = new MongoClient(url);
        return client
    }catch(err){
        console.log(err);
    }
}

async function findStudetns(client, name, resultsLimit) {
    try{
        const data = client.db('schooldbtest').collection('students').find({name}).limit(resultsLimit);
        const result = await data.toArray();
        if(result.length > 0){
            console.log('znaleziono');
            result.forEach(element => {
                console.log(element);
            });
            return result;
        }else{
            return null;
        }

    }catch(err){
        console.log(err);
    }
}


async function main(){
    let client = null;
    try{
        client = await initDB();
        const students = await findStudetns(client,'Asia',5);
    }catch(err){
        console.log(err);

    }finally{
        await client.close();
    }
}

main();
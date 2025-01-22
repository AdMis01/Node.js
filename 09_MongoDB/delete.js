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

async function showCars(collection, option = {},resultsLimit = 5) {
    try{
        let cursor = collection.find(option).limit(resultsLimit);
        let results = await cursor.toArray();
        if(results.length > 0){
            console.log("found",results.length);
            results.forEach(element => {
                console.log(element)
            });
            return results;
        }
    }catch(err){
        console.log(err);
    }
    return null
}

async function deleteCars(collection,name) {
    return await collection.deleteMany({name});
}

async function main(){
    let client = null;
    try{
        client = await initDB();

        //await addDataToDB(client);
        const collection = client.db('carstestdb').collection('cars');
        let result = await deleteCars(collection,"Mustang");
        console.log(result);
        const cars = await showCars(collection,{},10);
        //console.log(cars);
    }catch(err){
        console.log(err);

    }finally{
        await client.close();
    }
}

main();
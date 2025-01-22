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

async function addDataToDB(client){
    try{
        const db = client.db('carstestdb');
        let colletions = db.collection('cars');

        const cars = [
            {brand: 'ford', name: 'Mustang', year: 2020},
            {brand: 'ford', name: 'Mustang', year: 2022},
            {brand: 'mercedes', name: 'g500', year: 2022},
            {brand: 'dodge', name: 'demonic', year: 2018}
        ];
        const reault = await colletions.insertMany(cars,{ordered: true});
        console.log(reault.insertedCount)
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

async function updateCars(collection,name,updateFields){
    await collection.updateMany({name},{$set: updateFields})
}
async function updateCar(collection,name,updateFields){
    await collection.updateOne({name},{$set: updateFields})
}

async function main(){
    let client = null;
    try{
        client = await initDB();

        //await addDataToDB(client);
        const collection = client.db('carstestdb').collection('cars');

        await updateCars(collection, 'Mustang',{color: 'red'});
        await updateCar(collection, 'g500',{color: 'yellow'});

        const cars = await showCars(collection,{},10);
        //console.log(cars);
    }catch(err){
        console.log(err);

    }finally{
        await client.close();
    }
}

main();
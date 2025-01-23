const MongoSingleton = require('../data/quoteDB');
const ObjectId = require('mongodb').ObjectId;

function saveAll(quotes){
    return new Promise(async (res,rej) => {
        const collection = await MongoSingleton.getCollection();
        const resualt = await collection.insertMany(quotes);

        if(resualt.insertedCount){
            res(resualt);
        }else{
            rej('nie mozna zapisac');
        }
    });
}

function getAll(){
    return new Promise( async (res, rej) => {
        const collection = await MongoSingleton.getCollection();
        const cursor = await collection.find();
        const results = await cursor.toArray();

        if(results.length > 0){
            res(results);
        }else{
            rej('nie mozna pobrac wszystkich ')
        }
    });
}

function getById(id){
    return new Promise(async (res,rej) => {
        const collection = await MongoSingleton.getCollection();
        const resualt = await collection.findOne({_id: new ObjectId(id)})

        if(resualt){
            res(resualt);
        }else{
            rej('nie mozna pobrac cytatu o takim id');
        }
    })
}

function deleteById(id){
    return new Promise(async (res,rej) => {
        const colletion = await MongoSingleton.getCollection();
        const result = await colletion.deleteMany({_id: new ObjectId(id)});

        if(result && result.deletedCount > 0){
            res(result);
        }else{
            rej('cant delete')
        }
    })
}

function updateById(id, updateFileds){
    return new Promise(async (res,rej) => {
        const colletion = await MongoSingleton.getCollection();
        const result = await colletion.updateOne({_id: new ObjectId(id)},{$set: updateFileds});

        if(result && result.matchedCount > 0){
            res(result);
        }else{
            rej('cant delete')
        }
    })
}

function insertOne(quote){
    return new Promise(async (res,rej) => {
        const colletion = await MongoSingleton.getCollection();
        const result = await colletion.insertOne(quote);

        if(result && result.insertedId > 0){
            res(result);
        }else{
            rej('cant delete')
        }
    })
}



module.exports = {
    getAll,
    getById,
    saveAll,
    deleteById,
    updateById,
    insertOne
}
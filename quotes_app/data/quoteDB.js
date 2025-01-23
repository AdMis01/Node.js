const mongo = require('mongodb');
const MongoClient = mongo.MongoClient;

module.exports = (function(){
    const url = 'mongodb://127.0.0.1:27017';
    let client;
    let db;
    let collection;

    function getInstance(){
        return new Promise (async function (res, rej) {
            if(client) return res(client);

            try{
                client = await new MongoClient(url);
                await client.connect();
                db = client.db('quotesdb');
                collection = db.collection('quotes');
                return res(client);
            }catch(err){
                console.log(err);
                return rej(err);
            }
        })
    }

    async function getDB() {
        if(!db) await getInstance();
        return db;
        
    }
    async function getCollection() {
        if(!collection) await getInstance();
        return collection;
        
    }

    return {
        getInstance,
        getDB,
        getCollection
    }
})();
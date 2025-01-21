const jokes = require('../data/jokes.json');

function getAllJokes(){
    return new Promise((res,rej) => {
        res(jokes);
    });
}

function getById(id){
    return new Promise((res,rej) => {
        const joke = jokes.find(j => j.id === parseInt(id));

        if(joke){
            res(joke);
        }else{
            rej("Nie znaleziono zartu o id " + id);
        }
    });
}

module.exports = {
    getAllJokes,
    getById
}
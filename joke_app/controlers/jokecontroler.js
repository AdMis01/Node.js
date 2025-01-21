const Joke = require('../model/jokemode');
async function getJokes(){
    try{
        const jokes = await Joke.getAllJokes();
        return jokes;
    }catch(err){
        console.log(err);
        return null;
    }
}

async function getJoke(id) {
    try{
        const joke = await Joke.getById(id);
        return joke;
    }catch(err){
        console.log(err);
        return null;
    }
}

async function getRandom() {
    try{
        const jokes = await getJokes();
        if(jokes){
            return jokes[Math.floor(Math.random() * jokes.length)];
        }else{
            return null;
        }
    }catch(err){
        console.log(err);
        return null;
    }
}

module.exports = {
    getJoke,
    getJokes,
    getRandom
}
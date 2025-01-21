class RandomJoke {
    constructor(){
        this.init();
    }
    init(){
        this.jokeContainer = document.getElementById('joke-container');
        this.joke = document.getElementById('joke');
        this.jokeBtn = document.getElementById('next-joke');

        this.jokeBtn.addEventListener('click', this.getJoke);

        document.addEventListener('keyup',e =>{
            if(e.code === "Space"){
                this.getJoke();
            }
        });
        this.getJoke();
    }
    getJoke = async () => {
        const apiUrl = 'api/jokes/random';

        try{
            const response = await fetch(apiUrl);
            const data = await response.json();
            this.joke.textContent = data.text;
        }catch(err){
            console.log(err);
            this.joke.textContent = 'bład ' + err;
        }
    }
}

const randomJoke = new RandomJoke();
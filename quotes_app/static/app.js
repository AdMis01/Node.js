class RandomQuote{
    constructor(){
        this.init();
    }

    init(){
        this.quiteContainer = document.querySelector('#quote-container');
        this.quote = document.querySelector('#quote');
        this.author = document.querySelector('#author');
        this.btnQute = document.querySelector('#next-quote');

        this.btnQute.addEventListener('click',this.getQuote);
        document.addEventListener('keyup', e => {
            if(e.code === 'Space') this.getQuote();
        })
        this.getQuote();
    }
    getQuote = async () => {
        const apiUrl = '/api/quotes/random';

        try{
            const response = await fetch(apiUrl);
            const data = await response.json();
            this.quote.textContent = data.quote;
            this.author.textContent =data.author;
        }catch(err){
            console.log(err);
            this.quote.textContent = 'server error: ' + err;
        }
    }
}



const randomQuote = new RandomQuote();
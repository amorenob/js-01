
let btnEl = document.querySelector('#new-quote');
let quoteEl = document.querySelector('.quote');
let personEl = document.querySelector('.person');

let quotes = [];

// Fetch JSON File
async function loadQuotes(){
    try {
        const response = await fetch('quotes.json');
        const data = await response.json();
        quotes = data.quotes;

    } catch(e) {
        console.log('Error laoding quotess', e);
    }
}

function getRandomQuote(){
    if (quotes.length === 0) return;
    rIndex = Math.floor(Math.random() * quotes.length);
    const {quote, author} = quotes[rIndex];
    console.log(quote, author);
    return {quote, author}
}

btnEl.addEventListener('click', () => {
    const {quote, author} = getRandomQuote()
    quoteEl.textContent = quote;
    personEl.textContent = author;
})

loadQuotes();
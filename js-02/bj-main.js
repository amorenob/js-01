// Add JS here

class Card {
    constructor(value, suit){
        this.value = value;
        this.suit = suit;
    }
    get getValue(){
        if (this.value === 'J' || this.value === 'Q' || this.value === 'K'){
            return 10;
        } else if (this.value === 'A'){
            return 11;
        }
        return parseInt(this.value)
    }
    get getSuit(){
        return this.suit;
    }
    toString(){
        return `${this.value} of ${this.suit}`;
    }
}

class Deck {
    suits = ['hearts', 'diamonds', 'clubs', 'spades'];
    values = [2, 3, 4, 5, 6, 7, 8, 9, 10, 'J', 'Q', 'K', 'A'];
    constructor(){
        this.cards = [];
        for (let suit of this.suits){
            for (let value of this.values){
                this.cards.push(new Card(value, suit));
            }
        }
    }
    getRamdonCard(){
        let randomCard = Math.floor(Math.random() * this.cards.length);
        console.log(randomCard);
        return this.cards.splice(randomCard, 1)[0];
    }
}

let deck = new Deck();
let cards = [];

let hasBlackJack = false;
let isAlive = true;
let message = '';

let messageEl = document.getElementById('message-el');
let sumEl = document.querySelector('#sum-el');
let cardsEl = document.querySelector('#cards-el');

function startGame(){ 
    resetGame();
    console.log('started');
    cards.push(deck.getRamdonCard());
    cards.push(deck.getRamdonCard());
    console.log(cards);
    renderResults();
    
}

function newCard(){
    if (isAlive && !hasBlackJack){
        cards.push(deck.getRamdonCard());
        renderResults();
    }
}
function renderResults() {
    sum = cards.reduce((a, b) => a + b.getValue, 0);
    console.log(sum)
    if (sum <= 20){
        message = 'Do you want to draw a new card?';
    } else if (sum === 21){
        message = 'You have got Blackjack!';
        hasBlackJack = true;
        isAlive = false;
    } else {
        message = 'You are out of the game!';
        isAlive = false;
    }
    messageEl.textContent = message;
    sumEl.textContent = 'Sum: ' + sum;
    cardsEl.textContent = 'Cards: ' + cards.map(card => card.toString()).join(', ');

  
    document.getElementById('start-btn').disabled = isAlive;

}
function resetGame() {
    hasBlackJack = false;
    isAlive = true;
    message = 'Want to play a round?';
    cards = [];
    sum = 0;
    messageEl.textContent = message;
    sumEl.textContent = 'Sum: ' + sum;
    cardsEl.textContent = 'Cards: ';
    deck = new Deck();
}


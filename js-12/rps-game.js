
const cChoices = ['✊', '✋', '✌️'];
const results = [
    'Its a Tie !!',
    'Computer wins !!',
    'You won !!',
]

const cChoiceEl = document.querySelector('#cChoice');
const resultEl = document.querySelector('#result');
const uChoicePs = document.querySelectorAll('.user-choice p');
const resetBtn = document.querySelector('#resetBtn');

let uChoice = '';
let intervalId = NaN;

function getRandomChoice(arr){
    return arr[Math.floor(Math.random() * arr.length)];
}

resetBtn.addEventListener('click', () => {
    startComputer();
    resultEl.textContent = 'Ready !!' 
})

uChoicePs.forEach((element) => {
    element.addEventListener('click', () => {
        clearInterval(intervalId);
        intervalId = NaN;
        const winner = checkWinner(cChoiceEl.textContent, element.textContent)
        resultEl.textContent = results[winner];
    });
});

function startComputer(){
    if (!intervalId){
        intervalId = setInterval(()=>{
            let randomChoice;
            do{
                randomChoice = getRandomChoice(cChoices);
            } while (cChoiceEl.textContent === randomChoice)
            cChoiceEl.textContent = randomChoice
        }, 100)
    }
}


function checkWinner(p1, p2){
    switch (p1){
        case '✊':
            return (p2 ==='✊') ? 0: (p2 === '✋') ? 2 : 1;
            break; 
        case '✋':
            return (p2 ==='✋') ? 0: (p2 === '✌️') ? 2 : 1;
            break; 
        case '✌️':
            return (p2 ==='✌️') ? 0: (p2 === '✊') ? 2 : 1;
            break; 
    }
}

startComputer();
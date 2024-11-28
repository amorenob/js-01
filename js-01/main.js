// Add JS here
let count = 0;
let lastInput = '';
console.log(count);

function increment(){ 
    count++; 
    updateDisplay();
}
function savea(){ 
    lastInput += count + ', '; 
    count = 0;
    updateDisplay();
}

function updateDisplay(){
    document.getElementById("result").textContent = count;
    document.getElementById("saved").textContent = lastInput;
    console.log(count);
}
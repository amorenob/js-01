
const playBtnEl = document.querySelector('#play-btn');
const resetBtnEl = document.querySelector('#reset-btn');
const timer = document.querySelector('#timer');

let time = 0;
let timerOn = false;
let intervalId = null;

playBtnEl.addEventListener('click', () => {
    if (intervalId === null){
        startTimer();
        playBtnEl.innerHTML = '<i class="fa-solid fa-pause" id="pause"></i>';
        playBtnEl.style.backgroundColor = 'orange';
    } else {
        stopTimer();
        playBtnEl.innerHTML = '<i class="fa-solid fa-play id="play"" ></i>';
        playBtnEl.style.backgroundColor = 'green';
    }
    
});

resetBtnEl.addEventListener('click', () => {
    timer.textContent = '00:00:00';
    time = 0;
});

function startTimer(){
    intervalId = setInterval(()=>{
        time++;
        renderTimer();
    }, 1000)
}

function stopTimer() {
    clearInterval(intervalId);
    intervalId = null;
}

function renderTimer() {
    const timerTxt = getFormattedTime(time);
    timer.textContent = timerTxt;
}

function getFormattedTime(time){

    // Calculate hours, minutes, seconds
    const hours = Math.floor(time / (60 * 60));
    const minutes = Math.floor((time % (60 * 60)) / 60);
    const seconds = time % 60 ;

    // Pad with zeros and format
    const formattedHours = hours.toString().padStart(2, '0');
    const formattedMinutes = minutes.toString().padStart(2, '0');
    const formattedSeconds = seconds.toString().padStart(2, '0');
    return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
}
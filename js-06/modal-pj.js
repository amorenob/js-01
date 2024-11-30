
let modalBtn = document.querySelector('#modal-btn');
let modalContainer = document.querySelector('#modal-container');
let closeBtn = document.querySelector('#close-btn')

// Event listener
modalBtn.addEventListener('click', () => {
    modalContainer.style.display = 'block';
});

closeBtn.addEventListener('click', () => {
    modalContainer.style.display = 'none';
});

window.addEventListener('click', (event) => {
    console.log(event);
    if (event.target ===  modalContainer){
        modalContainer.style.display = 'none';
    }
});
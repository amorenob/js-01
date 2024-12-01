
const listContainer = document.querySelector('.list-container');
const inputEl = document.querySelector('#todoInput');
const addBtn = document.querySelector('#add');
let tasks = [];

function creteTask(taskTxt){
    const taskDiv = document.createElement('div');
    const checkBtn = document.createElement('button');
    const delBtn = document.createElement('button');
    const todoTxt = document.createElement('p');

    taskDiv.classList.add('task-container');

    // Task setup
    checkBtn.classList.add('check-btn');
    checkBtn.innerHTML = '<i class="fa-solid fa-check"></i>';
    checkBtn.addEventListener('click', () => {
        console.log('check');   
        taskDiv.classList.add('completed');
    });

    delBtn.classList.add('delete-btn');
    delBtn.innerHTML = '<i class="fa-solid fa-trash"></i>';
    delBtn.addEventListener('click', () => {
        taskDiv.remove();
    });

    todoTxt.classList.add('todo-txt');
    todoTxt.textContent = taskTxt;

    taskDiv.appendChild(todoTxt);
    taskDiv.appendChild(checkBtn);
    taskDiv.appendChild(delBtn);
    listContainer.appendChild(taskDiv);
};

addBtn.addEventListener('click', () => {
    const txt = inputEl.value;
    console.log(txt)
    if (txt) {
        creteTask(txt);
        inputEl.value = '';
    } else {
        alert('Please enter the task.')
    }
});

inputEl.addEventListener('keypress', (event) => {
    if (event.key === 'Enter' && inputEl.value){
        creteTask(inputEl.value);
        inputEl.value = '';
    };
});


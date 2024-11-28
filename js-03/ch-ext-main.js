
let myLeads = []

const inputEl = document.querySelector('#input-el');
const inputBtn = document.querySelector('#input-btn');
const deleteBtn = document.querySelector('#delet-btn');
const tabBtn = document.querySelector('#tab-btn');
const ulEl = document.querySelector('#ulEl');

// On load function
if (localStorage.getItem('myLeads')) {
    myLeads = JSON.parse(localStorage.getItem('myLeads'));
    myLeads.forEach(renderUlwithInnerHTML);
};

inputBtn.addEventListener('click', () => {
    myLeads.push(inputEl.value)
    renderUlwithInnerHTML(inputEl.value);
    inputEl.value = '';
    //Update localStorage
    localStorage.setItem('myLeads', JSON.stringify(myLeads));
});

// On click tab
tabBtn.addEventListener('click', () => {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        myLeads.push(tabs[0].url);
        renderUlwithInnerHTML(tabs[0].url);
    })
    localStorage.setItem('myLeads', JSON.stringify(myLeads));
});

// Clear all leads
deleteBtn.addEventListener('dblclick', () => {
    localStorage.clear();
    ulEl.innerHTML = '';
    myLeads = [];
});

// New leed when enter
inputEl.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        inputBtn.click();
    }
});

function renderUl(text) {
    const newItem = document.createElement('li');
    newItem.textContent = text
    ulEl.appendChild(newItem);
}

function renderUlwithInnerHTML(text) {
    const aText = `<a target="_blank" href="https://${text}">${text}</a>`;
    ulEl.innerHTML += tagText('li', aText);
};

function tagText(tag, text){
    return `<${tag}>${text}</${tag}>`;
};

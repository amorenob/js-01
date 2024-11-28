
myLeads = []

const inputEl = document.querySelector('#input-el');
const inputBtn = document.querySelector('#input-btn');
const ulEl = document.querySelector('#ulEl');

inputBtn.addEventListener('click', () => {
    myLeads.push(inputEl.value)
    renderUlwithInnerHTML(inputEl.value);
    inputEl.value = '';
});

function renderUl(text) {
    const newItem = document.createElement('li');
    newItem.textContent = text
    ulEl.appendChild(newItem);
}

function renderUlwithInnerHTML(text) {
    const aText = `<a target="_blank" href="https://${text}">${text}</a>`;
    ulEl.innerHTML += tagText('li', aText);
}

function tagText(tag, text){
    return `<${tag}>${text}</${tag}>`;
}

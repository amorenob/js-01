const accordion = document.getElementsByClassName('content-cotainer')
console.log(accordion.length)

for (let el of accordion){
    console.log(el)
    el.addEventListener('click', ()=>{
        el.classList.toggle('active');
    })
}
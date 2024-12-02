const buttonEl = document.querySelector('button')
const baseUrl = 'https://pokeapi.co/api/v2/pokemon/';
const pokemon = document.querySelector('#PokeName')
const pokemonImage = document.querySelector('#pokeImg')

const pokemonList = [
    "pikachu",
    "charizard",
    "mewtwo",
    "dragonite",
    "gengar",
    "dracolux"  // This one is fake
];


setInterval(() => {
    buttonEl.style.backgroundColor = getRandomColor();
}, 1000)


function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color
}

buttonEl.addEventListener('click', () => {
    fetchApidata( pokemon.value.toLowerCase());
});



async function fetchApidata(pokemon){
    try  {
        const response = await fetch(baseUrl + pokemon)

        if (!response.ok){
            throw new Error('Cant fetch that poke data');
        }

        const data = await response.json();
        const imSrc = data.sprites.front_default;
        pokemonImage.setAttribute('src', imSrc);
        return 
    } catch(error){
        console.log(error)
    }

}

function getRandomPokemon(){
    return pokemonList[Math.floor(Math.random() * pokemonList.length)]
}

console.log(getRandomPokemon());
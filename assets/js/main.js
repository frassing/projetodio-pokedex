const pokemonList = document.getElementById('pokemonList')
const loadMoreButton = document.getElementById('loadMoreButton')

const maxRecords = 151;
const limit = 10;
let offset = 0;

function convertPokemonToLi(pokemon) {
    return `     
        <li class="pokemon ${pokemon.type}">
            <span class="number">#${pokemon.number}</span>
            <span class="name">${pokemon.name}</span>
            <div class="detail">
                <ol class="types">
                    ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                </ol>
                <img src="${pokemon.photo}"
                    alt="${pokemon.name}">
            </div>

            <a class="pokemonInfo" id="infoButton" href="#${pokemon.name}">More</a>
            <div id="${pokemon.name}" class="modalContainer">
                <div class="modalContent">
                    <section class="infoTop ${pokemon.type}">
                        <div class="detailPokemon">
                            <span class="modalNumber">#${pokemon.number}</span>
                            <span class="modalName">${pokemon.name}</span>
                        </div>
                        <img class="modalImg" src="${pokemon.photo}"
                            alt="${pokemon.name}">
                    </section>

                    <section class="infoBottom">  
                        <h4>Abilities</h4>
                        <ul class="abilities">
                            ${pokemon.ability.map((ability) => 
                                `<li class="ability">${ability}</li>`).join('')}
                        </ul>

                        <h4>Stats</h4>
                        <div class="stats">
                            <ul class="firstRow">
                                ${pokemon.statsName.map((statsName) => 
                                    `<li class="statsName">${statsName}</li>`).join('')}
                            </ul>

                            <ul class="secondRow">
                                ${pokemon.statsValues.map((statsValues) => 
                                    `<li class="statsValues">${statsValues}</li>`).join('')}
                            </ul>
                        </div>
                    </section>
                    <a class="modalCloseButton" href="#">Close</a>
                </div>
            </div>
        </li>
    `
}

function loadPokemonItens(offset, limit) {
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        const newHtml = pokemons.map(convertPokemonToLi).join('')
        pokemonList.innerHTML += newHtml
    })
}

loadPokemonItens(offset, limit)

loadMoreButton.addEventListener('click', () => {
    offset += limit
    const qtdRecordsWithNexPage = offset + limit

    if (qtdRecordsWithNexPage >= maxRecords) {
        const newLimit = maxRecords - offset
        loadPokemonItens(offset, newLimit)

        loadMoreButton.parentElement.removeChild(loadMoreButton)
    } else {
        loadPokemonItens(offset, limit)
    }
})
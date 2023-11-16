const pokemonInput = document.getElementById('pokemonInput');
const buscarPokemon = document.getElementById('buscarPokemon');
const pokemonContainer = document.getElementById('pokemonContainer');

buscarPokemon.addEventListener('click', async(e)=>{
    e.preventDefault();
    const pokemonNumber= pokemonInput.value;

    if(!pokemonNumber){
        mostrarError(`Ingresa un número de la pokedex`);
    }
    else{
        try{
            const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonNumber}`);

            if(!response.ok){
                throw new Error(`Ha fallado la conexión con la PokeAPI`)
            }

            const data = await response.json();

            renderizarPokemon(data);
        }
        catch(error){
            mostrarError(error.message)
        }
    }
})
function renderizarPokemon(data) {

    pokemonContainer.innerHTML=``

    // Crear una tarjeta con los datos del Pokémon
    const card = document.createElement('div');
    card.classList.add('pokemon-card');

    const nombre = document.createElement('h2');
    nombre.textContent = data.name;

    const tipo = document.createElement('p');
    tipo.textContent = `Tipo: ${data.types.map((type) => type.type.name).join(', ')}`;

    const altura = document.createElement('p');
    altura.textContent = `Altura: ${data.height / 10} metros`;

    const peso = document.createElement('p');
    peso.textContent = `Peso: ${data.weight / 10} kilogramos`;

    const imagen = document.createElement('img');
    imagen.src = data.sprites.front_default;
    imagen.alt = data.name;

    card.appendChild(nombre);
    card.appendChild(tipo);
    card.appendChild(altura);
    card.appendChild(peso);
    card.appendChild(imagen);

    // Agregar la tarjeta al contenedor
    pokemonContainer.appendChild(card);
}

function mostrarError(mensaje) {
    const errorMensaje = document.createElement('p');
    errorMensaje.textContent = mensaje;
    errorMensaje.classList.add('error');

    // Agregar el mensaje de error al contenedor
    pokemonContainer.appendChild(errorMensaje);
}

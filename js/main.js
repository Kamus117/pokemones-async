const pokemonInput = document.getElementById('pokemonInput');
const buscarPokemon = document.getElementById('buscarPokemon');
const pokemonContainer = document.getElementById('pokemonContainer');

buscarPokemon.addEventListener('click', () => {
    // Obtener el número ingresado por el usuario
    const pokemonNumber = pokemonInput.value;

    // Limpiar el contenedor antes de agregar nuevos datos
    pokemonContainer.innerHTML = '';

    if (!pokemonNumber) {
        // Mostrar mensaje de error si no se ingresó un número
        mostrarError('Por favor, ingresa un número de Pokémon válido.');
    } else {
        // Realizar una solicitud a la PokeAPI
        fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonNumber}`)
            .then((response) => {
                if (!response.ok) {
                    throw new Error('No se pudo encontrar el Pokémon.');
                }
                return response.json();
            })
            .then((data) => {
                // Renderizar los datos del Pokémon en una tarjeta
                renderizarPokemon(data);
            })
            .catch((error) => {
                mostrarError(error.message);
            });
    }
});

function renderizarPokemon(data) {
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

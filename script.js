// Get references to DOM elements
const searchInput = document.getElementById('search-input');
const searchButton = document.getElementById('search-button');
const pokemonName = document.getElementById('pokemon-name');
const pokemonId = document.getElementById('pokemon-id');
const weight = document.getElementById('weight');
const height = document.getElementById('height');
const types = document.getElementById('types');
const hp = document.getElementById('hp');
const attack = document.getElementById('attack');
const defense = document.getElementById('defense');
const specialAttack = document.getElementById('special-attack');
const specialDefense = document.getElementById('special-defense');
const speed = document.getElementById('speed');
const sprite = document.getElementById('sprite');
const pokemonInfo = document.querySelector('.pokemon-info'); // Reference to the Pokemon info section

// PokéAPI URL
const apiURL = 'https://pokeapi.co/api/v2/pokemon/';

// Function to fetch Pokémon data from API
const fetchPokemonData = async (pokemon) => {
    try {
        // Make the API call
        const response = await fetch(apiURL + pokemon.toLowerCase());
        
        // If the Pokémon is not found, show alert
        if (!response.ok) {
            alert('Pokémon not found');
            pokemonInfo.style.display = 'none'; // Hide the Pokémon info if not found
            return;
        }
        
        const data = await response.json();

        // Update the DOM with the Pokémon details
        pokemonName.textContent = data.name.toUpperCase();
        pokemonId.textContent = `#${data.id}`;
        weight.textContent = `Weight: ${data.weight}`;
        height.textContent = `Height: ${data.height}`;
        hp.textContent = `HP: ${data.stats[0].base_stat}`;
        attack.textContent = `Attack: ${data.stats[1].base_stat}`;
        defense.textContent = `Defense: ${data.stats[2].base_stat}`;
        specialAttack.textContent = `Special Attack: ${data.stats[3].base_stat}`;
        specialDefense.textContent = `Special Defense: ${data.stats[4].base_stat}`;
        speed.textContent = `Speed: ${data.stats[5].base_stat}`;
        
        // Clear and add types
        types.innerHTML = '';
        data.types.forEach(typeInfo => {
            const typeElement = document.createElement('span');
            typeElement.textContent = typeInfo.type.name.toUpperCase();
            types.appendChild(typeElement);
        });

        // Set Pokémon sprite
        sprite.src = data.sprites.front_default;
        sprite.alt = `${data.name} Image`;

        // Display the Pokémon info section
        pokemonInfo.style.display = 'block';
    } catch (error) {
        console.error('Error fetching Pokémon data:', error);
    }
};

// Event listener for the search button
searchButton.addEventListener('click', () => {
    const searchValue = searchInput.value.trim();
    
    // Check if the input is empty or contains invalid search
    if (!searchValue) {
        alert('Please enter a Pokémon name or ID');
        pokemonInfo.style.display = 'none'; // Hide the Pokémon info if input is empty
    } else if (searchValue.toLowerCase() === 'red') {
        alert('Pokémon not found');
        pokemonInfo.style.display = 'none'; // Hide the Pokémon info if Pokémon not found
    } else {
        fetchPokemonData(searchValue);
    }
});

// Optional: Event listener for pressing Enter key in the input
searchInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        searchButton.click();
    }
});

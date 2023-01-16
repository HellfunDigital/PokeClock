function updateClock() {
  var currentTime = new Date();
  var hours = currentTime.getHours();
  var minutes = currentTime.getMinutes();
  var seconds = currentTime.getSeconds();
  var days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  var day = days[currentTime.getDay()];
  var months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  var month = months[currentTime.getMonth()];
  var date = currentTime.getDate();
  var year = currentTime.getFullYear();

  // Convert hours to 12-hour format
  hours = hours > 12 ? hours - 12 : hours === 0 ? 12 : hours;

  // Add a leading zero to single-digit hours
  hours = hours < 10 ? "0" + hours : hours;
  // Add a leading zero to single-digit minutes
  minutes = minutes < 10 ? "0" + minutes : minutes;
  // Add a leading zero to single-digit seconds
  seconds = seconds < 10 ? "0" + seconds : seconds;

  // Append AM or PM to the time string based on the current hour
  var timeSuffix = currentTime.getHours() < 12 ? "AM" : "PM";

  // Update the clock display
  document.getElementById("day").innerHTML = day;
  document.getElementById(
    "hour"
  ).innerHTML = `${hours}:${minutes}:${seconds} ${timeSuffix}`;
  document.getElementById("date").innerHTML = `${month} ${date}, ${year}`;
}

setInterval(updateClock, 1000);
const POKEMON_INTERVAL = 60000;

async function getPokemon(nameOrId) {
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${nameOrId}`);
  return response.json();
}

async function updatePokemon() {
  try {
    // Clear the old pokedex entry
    const oldEntry = document.querySelector(".pokemon-entry");
    if (oldEntry) oldEntry.remove();

    const randomId = Math.floor(Math.random() * 905) + 1;
    const pokemon = await getPokemon(randomId);
    const pokemonName = pokemon.name;
    const pokemonId = pokemon.id;
    let spriteUrl = pokemon.sprites.front_default;

    // Randomly select a shiny sprite with a 1 in 4096 chance
    if (Math.random() < 1 / 4096) {
      spriteUrl = pokemon.sprites.front_shiny;
    }

    document.getElementById("pokemon-sprite").onload = function () {
      document.getElementById("pokemon-id").innerHTML = `#${pokemonId}`;
      document.getElementById("pokemon-name").innerHTML =
        pokemonName.charAt(0).toUpperCase() + pokemonName.slice(1);

      // Display the Pokemon types
      displayTypes(pokemon);
    };
    document.getElementById("pokemon-sprite").src = spriteUrl;
  } catch (error) {
    console.error(error);
  }
}

document.getElementById("pokemon-sprite").src =
  "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/poke-ball.png";

updatePokemon();
setInterval(updatePokemon, POKEMON_INTERVAL);

async function displayTypes(pokemon) {
  // Clear the Pokemon types element
  document.getElementById("pokemon-info").innerHTML = "";

  // Get the Pokemon types
  const types = pokemon.types;

  // Create a container element for the Pokemon types
  const typesContainer = document.createElement("div");
  typesContainer.classList.add("type-container");

  // Add a type box for each Pokemon type
  types.forEach((type) => {
    const typeBox = document.createElement("div");
    typeBox.classList.add("type-box");
    typeBox.style.backgroundColor = getTypeColor(type.type.name);
    typeBox.innerHTML = type.type.name;
    typesContainer.appendChild(typeBox);
    typeBox.textContent = type.type.name.toUpperCase();
  });

  // Add the Pokemon types to the webpage
  document.getElementById("pokemon-info").appendChild(typesContainer);
}

function getTypeColor(type) {
  switch (type) {
    case "normal":
      return "#A8A77A";
    case "fighting":
      return "#C22E28";
    case "flying":
      return "#A98FF3";
    case "poison":
      return "#A33EA1";
    case "ground":
      return "#E2BF65";
    case "rock":
      return "#B6A136";
    case "bug":
      return "#A6B91A";
    case "ghost":
      return "#735797";
    case "steel":
      return "#B7B7CE";
    case "fire":
      return "#EE8130";
    case "water":
      return "#6390F0";
    case "grass":
      return "#7AC74C";
    case "electric":
      return "#F7D02C";
    case "psychic":
      return "#F95587";
    case "ice":
      return "#96D9D6";
    case "dragon":
      return "#6F35FC";
    case "dark":
      return "#705746";
    case "fairy":
      return "#D685AD";
    case "shadow":
      return "#FB795E";
    default:
      return "#000000";
  }
}

// function changeBG
function changeBG(bgImage){
  let clock = document.querySelector("#clock").style.setProperty('--background', `url('${bgImage}')`);
}

// Add global variables for tracking the mouse position
let mouseX;
let mouseY;
let bodyX;
let bodyY;
let isDragging = false;

// Get the body element
const body = document.querySelector('body');

// Add an event listener for the mousedown event on the body
body.addEventListener('mousedown', e => {
// Update the mouse position variables
mouseX = e.clientX;
mouseY = e.clientY;

// Update the body position variables
bodyX = parseInt(body.style.left) || 0;
bodyY = parseInt(body.style.top) || 0;

// Set the isDragging flag to true
isDragging = true;
});

// Add an event listener for the mousemove event on the document
document.addEventListener('mousemove', e => {
// If the isDragging flag is true, update the body's position
if (isDragging) {
  body.style.left = `${bodyX + e.clientX - mouseX}px`;
  body.style.top = `${bodyY + e.clientY - mouseY}px`;
}
});

// Add an event listener for the mouseup event on the document
document.addEventListener('mouseup', () => {
// Set the isDragging flag to false
isDragging = false;
});

body.addEventListener('mousedown', e => {
  e.preventDefault();
  // your existing mousedown code here
});

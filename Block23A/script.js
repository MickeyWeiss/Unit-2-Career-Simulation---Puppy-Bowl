// Use the API_URL variable to make fetch requests to the API.
// Replace the placeholder with your cohort name (ex: 2109-UNF-HY-WEB-PT)
const cohortName = "2404-ftb-mt-web-pt";
const API_URL = `https://fsa-puppy-bowl.herokuapp.com/api/${cohortName}`;


/**
 * Fetches all players from the API.
 * @returns {Object[]} the array of player objects
 */

const addForm = document.querySelector("#new-player-form")
const puppyContainer = document.getElementsByTagName("main")[0]
console.log(puppyContainer)

const fetchAllPlayers = async () => {
  try {
    const response = await fetch(API_URL + "/players");
    const result = await response.json();
    console.log(result, "in fetchAllPlayers function")
    return result.data.players
    // TODO
  } catch (err) {
    console.error("Uh oh, trouble fetching players!", err);
  }
};
/**
 * Fetches a single player from the API.
 * @param {number} playerId
 * @returns {Object} the player object
 */
const fetchSinglePlayer = async (playerId) => {
  try {
    const response = await fetch(`${API_URL}/${playerId}`)
    const result = await response.json()
    console.log(result, "In fetch single player")
    return result.data.player
  
    // TODO
  } catch (err) {
    console.error(`Oh no, trouble fetching player #${playerId}!`, err);
  }
};

/**
 * Adds a new player to the roster via the API.
 * @param {Object} playerObj the player to add
 * @returns {Object} the player returned by the API
 */
const addNewPlayer = async (playerObj) => {
  try {
    const response = await fetch(API_URL + "/players",{
      method: "POST",
      headers: {
        'Content-Type': 'application/JSON',
      },
      body:JSON.stringify(playerObj)

    })
    const result = await response.json()
    console.log(result)
// TODO
  } catch (err) {
    console.error("Oops, something went wrong with adding that player!", err);
  }
};

/**
 * Removes a player from the roster via the API.
 * @param {number} playerId the ID of the player to remove
 */
const removePlayer = async (playerId) => {
  try {
    const response = await fetch(`${API_URL}/${playerId}`,{
      method: "DELETE",
    });
    const result = await response.json(playerId)
    const players = await fetchAllPlayers();
    renderAllPlayers(players);
    // TODO
  } catch (err) {
    console.error(
      `Whoops, trouble removing player #${playerId} from the roster!`,
      err
    );
  }
};

/**
 * Updates `<main>` to display a list of all players.
 *
 * If there are no players, a corresponding message is displayed instead.
 *
 * Each player is displayed in a card with the following information:
 * - name
 * - id
 * - image (with alt text of the player's name)
 *
 * Additionally, each card has two buttons:
 * - "See details" button that, when clicked, calls `renderSinglePlayer` to
 *    display more information about the player
 * - "Remove from roster" button that, when clicked, will call `removePlayer` to
 *    remove that specific player and then re-render all players
 *
 * Note: this function should replace the current contents of `<main>`, not append to it.
 * @param {Object[]} playerList - an array of player objects
 */
const renderAllPlayers = (playerList) => {
  // TODO
  console.log("In render function, from parameters: ", playerList)
  const holders = []
  for(let i = 0; i<playerList.length; i++){
    const puppyHolder = document.createElement("div")

    const nameEl = document.createElement("h2")
    const imgEl = document.createElement("img")
    const viewButton = document.createElement("button")
    const deleteButton = document.createElement("button")
    
    viewButton.textContent = "View Description"
    deleteButton.textContent = "Delete this Puppy"
    
    nameEl.textContent = playerList[i].name
    imgEl.setAttribute("src", playerList[i].imageUrl)
    imgEl.setAttribute("alt", playerList[i].name)

    viewButton.addEventListener("click", async (e) => {
      const singlePuppy = await fetchSinglePlayer(playerList[i].id)
      const singlePuppyHolder = document.createElement("div")

      const singleName = document.createElement("h2")
      const singleImage = document.createElement("img")
      const singleDescription = document.createElement("p")

      singleName.textContent = singlePuppy.name
      singleImage.setAttribute("src", singlePuppy.imgURL)
      singleImage.setAttribute("alt", singlePuppy.name)
      singleDescription.textContent = singlePuppy.description

      singlePuppyHolder.append(singleName, singleImage, singleDescription)
      const body = document.getElementsByTagName("body")[0]
      body.append(singlePuppyHolder)
    })

    deleteButton.addEventListener("click", (e) => {
      removePlayer(playerList[i].id)
    })
    puppyHolder.append(nameEl, imgEl, viewButton, deleteButton)
    holders.push(puppyHolder)

  };
  puppyContainer.replaceChildren(...holders)

};

/**
 * Updates `<main>` to display a single player.
 * The player is displayed in a card with the following information:
 * - name
 * - id
 * - breed
 * - image (with alt text of the player's name)
 * - team name, if the player has one, or "Unassigned"
 *
 * The card also contains a "Back to all players" button that, when clicked,
 * will call `renderAllPlayers` to re-render the full list of players.
 * @param {Object} player an object representing a single player
 */
const renderSinglePlayer = (player) => {
  // TODO
};

/**
 * Fills in `<form id="new-player-form">` with the appropriate inputs and a submit button.
 * When the form is submitted, it should call `addNewPlayer`, fetch all players,
 * and then render all players to the DOM.
 */
const renderNewPlayerForm = () => {
  try {
    const form = document.createElement("form")

    const nameLabel = document.createElement("label")
    const breedLabel = document.createElement("label")
    
    const nameInput = document.createElement("input")
    const breedInput = document.createElement("input")
    const submitButton= document.createElement("button")

    submitButton.addEventListener("click",(event) =>{
      event.preventDefault()
      addNewPlayer({name: nameInput.value, breed: breedInput.value})


    })

    nameLabel.textContent = "Name: "
    breedLabel.textContent = "Breed: "
    submitButton.textContent = "Submit"

    form.append(nameLabel, nameInput, breedLabel, breedInput, submitButton)
    addForm.append(form)


  // TODO
  } catch (err) {
    console.error("Uh oh, trouble rendering the new player form!", err);
  }
};

/**
 * Initializes the app by fetching all players and rendering them to the DOM.
 */
const init = async () => {
  const players = await fetchAllPlayers();
  renderAllPlayers(players);

  renderNewPlayerForm();
};

// This script will be run using Node when testing, so here we're doing a quick
// check to see if we're in Node or the browser, and exporting the functions
// we want to test if we're in Node.
if (typeof window === "undefined") {
  module.exports = {
    fetchAllPlayers,
    fetchSinglePlayer,
    addNewPlayer,
    removePlayer,
    renderAllPlayers,
    renderSinglePlayer,
    renderNewPlayerForm,
  };
} else {
  init();
}

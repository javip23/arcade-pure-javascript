const gameList = [
    {name: "Snake", id: 1, selected: true}
]

let currentGame
let currentGamePlaying

function loadGames() {
    let gameListElement = document.getElementById("game-list")
    let list = document.createElement("ul")
    gameListElement.appendChild(list)
    for (let game of gameList) {
        let item = document.createElement("li")
        item.innerHTML = game.name
        item.id = `game-${game.id}`
        if (game.selected) item.className = "selected"
        list.appendChild(item)
        item = document.getElementById(`game-${game.id}`)
        item.onclick = () => {
            
            if (!currentGamePlaying) {
                loadGame(game.id)
                list.querySelector(".selected").classList = ""
                item.className = "selected"
            }
        }
        if(game.selected && !currentGamePlaying) loadGame(game.id)
    }
}

function loadGame(id) {
    let playButton = document.getElementById("play-button")
    if(playButton) playButton.remove()
    
    switch (id) {
        case 1:
            currentGame = new Snake();
        break;
    }

    playButton = document.createElement("button")
    playButton.innerHTML = "Jugar"
    playButton.id = 'play-button'
    playButton.className = "play-button"
    document.getElementById("playroom").appendChild(playButton)
    playButton = document.getElementById("play-button") 
    playButton.onclick = () => {
            playGame()
    }
    setTimeout(() => {
       playButton.className+=" show" 
    }, 200)
}

function playGame() {
    document.getElementById("play-button").remove()
    currentGamePlaying = true
    currentGame.start()
}

document.addEventListener("DOMContentLoaded",function(){
    loadGames()
});

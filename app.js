




//Dom Selectors / variables
let boardElement = document.querySelector("#board")
let gameSpaces = document.getElementsByClassName("gameSpace")
let game_state = {
    players: {
        X: "X",
        O: "O",
    },
    board: [
      [null, null, null],
      [null, null, null],
      [null, null, null]
    ]
    }
let currentPlayer = game_state.players.X

//Event listeners 

document.getElementById("assign").addEventListener("click", assignPlayers);
//gameSpace event listener had to be inside the render function or the board would delete!




//functions for the game 

//This first function is simply to take the two player names and display who will go first 
function assignPlayers() {
    let num = Math.random()
    console.log(num);
    if (num < .5) {
        document.getElementById("playerDeclaration").innerHTML = `[PLAYER 1 : ${playerName1.value}] [PLAYER 2 : ${playerName2.value}]` }
    else {
        document.getElementById("playerDeclaration").innerHTML = `[PLAYER 1 : ${playerName2.value}] [PLAYER 2 : ${playerName1.value}]` }
}

//This function sets up the gameboard 
function render() {
    
    for (let i = 0; i < game_state.board.length; i++) {
        for (let j = 0; j <game_state.board[i].length; j++) {
        let gameSpace = document.createElement("div");
        gameSpace.className = "gameSpace"
        gameSpace.id = [[i],[j]]// CHANGE THIS TO DATASET.. set as a string separate X and Y 
        boardElement.appendChild(gameSpace);
        gameSpace.addEventListener("click", playerClick)
        }
    }
}

function playerClick(event) {
    console.log(event.target, this)
    let boardLocation = Array.from(this.id)
    console.log(boardLocation)
    let i = parseInt(boardLocation[0])// get target of event. element. dataset.x 
    let j = parseInt(boardLocation[2])
    console.log() //
    if (game_state.board[i][j] !== null) {
        //window.alert("INVALID SELECTION. SQUARE ALREADY UTILIZED")
        document.getElementById("gamePhrases").innerHTML = "INVALID SELECTION. SQUARE ALREADY UTILIZED"
        return
    }
    game_state.board[i][j] = currentPlayer
    this.innerHTML = currentPlayer
    //console.log(game_state.board)
    
    
    if (currentPlayer === game_state.players.X) {
        currentPlayer = game_state.players.O
        document.getElementById("gamePhrases").innerHTML = "PLAYER 2 IT IS YOUR TURN"
    } else {
        currentPlayer = game_state.players.X
        document.getElementById("gamePhrases").innerHTML = "PLAYER 1 IT IS YOUR TURN"
    }

   
}





//Bootstrap

render()
console.log(game_state.players)








//Dom Selectors / variables
let boardElement = document.querySelector("#board")
let gameSpaces = document.getElementsByClassName("gameSpace")

let game_state = {
    players: {
        X: "X",
        O: "O",
    },
    player1 : "",
    player2 : "",
    winner: false,
    Tie: true,
    board: [
      [null, null, null],
      [null, null, null],
      [null, null, null]
    ]
    }
let currentPlayer = game_state.players.X

//Event listeners 

document.getElementById("assign").addEventListener("click", assignPlayers);
document.getElementById("reset").addEventListener("click", resetGame);


//functions for the game 

function assignPlayers() {
    document.getElementById("playerDeclaration").innerHTML = `PLAYER 1 : ${playerName1.value} VS PLAYER 2 : ${playerName2.value}` 
    game_state.player1 = playerName1.value
    game_state.player2 = playerName2.value
    console.log(game_state)
}


//winners function checks to see if anyone has won the game
function winners() {
for (let i = 0; i < game_state.board.length; i++) {
    if (game_state.board[i][0] == game_state.board[i][1] && game_state.board[i][1] == game_state.board[i][2] && game_state.board[i][0] !== null) {
        document.getElementById("gamePhrases").innerHTML = "WE HAVE A WINNER"
        game_state.winner = true
        gameSpaces.removeEventListener("click", playerClick)
        return
    }
}
for (let i = 0; i <game_state.board.length; i++) {
    for (let j = 0; j < game_state.board[i].length; j++) {
        if (game_state.board[0][j] == game_state.board[1][j] && game_state.board[1][j] == game_state.board[2][j] && game_state.board[0][j] !== null) {
            document.getElementById("gamePhrases").innerHTML = "WE HAVE A WINNER"
            game_state.winner = true
            gameSpaces.removeEventListener("click", playerClick)
            return
        }
    }
}
if (game_state.board[0][0] == game_state.board[1][1] && game_state.board[1][1] == game_state.board[2][2] && game_state.board[0][0] !== null) {
    document.getElementById("gamePhrases").innerHTML = "WE HAVE A WINNER"
    game_state.winner = true
    gameSpaces.removeEventListener("click", playerClick)
    return
}
if (game_state.board[0][2] == game_state.board[1][1] && game_state.board[1][1] == game_state.board[2][0] && game_state.board[0][2] !== null) {
    document.getElementById("gamePhrases").innerHTML = "WE HAVE A WINNER"
    game_state.winner = true
    gameSpaces.removeEventListener("click", playerClick)
    return 
}
for (let i = 0; i <game_state.board.length; i++) {
    for (let j = 0; j < game_state.board[i].length; j++) {
        if (game_state.board[i][j] == null) {
            Tie = false   
        }
    }
}
if (Tie == true) {
    document.getElementById("gamePhrases").innerHTML = "WE HAVE A TIE"}


}

function resetGame () {
     game_state = {
        players: {
            X: "X",
            O: "O",
        },
        player1 : "",
        player2 : "",
        winner: false,
        Tie: true,
        board: [
          [null, null, null],
          [null, null, null],
          [null, null, null]
        ]
        }
    currentPlayer = game_state.players.X
    render();
    document.getElementById("gamePhrases").innerHTML = "Player 1 IT IS YOUR TURN"
    document.getElementById("playerDeclaration").innerHTML = `"I'M NOT REALLY A BIG X's AND O's GUY" - IRVING,KYRIE`
    console.log(game_state)
}


//This function sets up the gameboard 
function render() {
    boardElement.innerHTML = ""
    for (let i = 0; i < game_state.board.length; i++) {
        for (let j = 0; j <game_state.board[i].length; j++) {
        let gameSpace = document.createElement("div");
        gameSpace.className = "gameSpace"
        gameSpace.id = [[i],[j]]// CHANGE THIS TO DATASET.. set as a string separate X and Y 
        gameSpace.innerHTML = game_state.board[i][j] 
        boardElement.appendChild(gameSpace);
        gameSpace.addEventListener("click", playerClick)
        console.log(game_state)
        }
    }
}


function playerClick(event) {
    if (game_state.player1 == "") {
        document.getElementById("gamePhrases").innerHTML = "YOU MUST ASSIGN AT LEAST ONE PLAYER IN ORDER TO START"
        return
    }
    console.log(event.target, this)
    let boardLocation = Array.from(this.id)
    //console.log(boardLocation)
    let i = parseInt(boardLocation[0])// get target of event. element. dataset.x 
    let j = parseInt(boardLocation[2])
    console.log() 
    if (game_state.board[i][j] !== null) {
        //window.alert("INVALID SELECTION. SQUARE ALREADY UTILIZED")
        document.getElementById("gamePhrases").innerHTML = "INVALID SELECTION. SQUARE ALREADY UTILIZED"
        return
    }
    
    game_state.board[i][j] = currentPlayer
    this.innerHTML = currentPlayer
    //console.log(game_state.board)
    render();
    winners();
    
    if (currentPlayer === game_state.players.X) {
        currentPlayer = game_state.players.O
        document.getElementById("gamePhrases").innerHTML = "PLAYER 2 IT IS YOUR TURN"
    } else {
        currentPlayer = game_state.players.X
        document.getElementById("gamePhrases").innerHTML = "PLAYER 1 IT IS YOUR TURN"
    }

    //THIS SHOULD BE MY SINGLE PLAYER ENTRY CODE BLOCK... 
   if (game_state.player2 === "COMPUTER" || game_state.player2 === "") { 
    for (let i = 0; i < game_state.board.length; i++) {
        for (let j = 0; j <game_state.board[i].length; j++) {
            if (game_state.board[i][j] !== null) {
                continue
            }
            game_state.board[i][j] = currentPlayer
            winners();
            console.log(game_state.board)
            render();
            
            if (currentPlayer === game_state.players.X) {
                currentPlayer = game_state.players.O
                document.getElementById("gamePhrases").innerHTML = "PLAYER 2 IT IS YOUR TURN"
            } else {
                currentPlayer = game_state.players.X
                document.getElementById("gamePhrases").innerHTML = "PLAYER 1 IT IS YOUR TURN"
            }
            return
        }
    }
   }
   
}

//Bootstrap

render()


/* This was my original assign players function which had a 50/50 chance of assigning either player to player 1. 
   I chose to remove this attribute from the game as I need my single player aspect to always leave the computer as player 2...
   I left the original function in the code to demonstrate the code for the grading purposes 
   
   
function assignPlayers() {
    let num = Math.random()
    console.log(num);
    if (num < .5) {
        document.getElementById("playerDeclaration").innerHTML = `PLAYER 1 : ${playerName1.value} VS PLAYER 2 : ${playerName2.value}` 
        game_state.player1 = playerName1.value
        game_state.player2 = playerName2.value}
    else {
        document.getElementById("playerDeclaration").innerHTML = `PLAYER 1 : ${playerName2.value} VS PLAYER 2 : ${playerName1.value}`
        game_state.player1 = playerName2.value
        game_state.player2 = playerName1.value}

    :) --> CHECKING TO SEE FINAL COMMIT/UPLOAD IS DONE
}*/
console.log("Tic Tac Toe");

//gameboard
const Gameboard = {
    board : ["","","","","","","","",""]
}

//players
function createPlayer(name, type){
    return {name, type};
}

//reload page
const reloadPage = document.getElementById("restart");
reloadPage.addEventListener("click",()=>{
    location.reload();
})

//start button
const btn_start = document.getElementById("start");
btn_start.addEventListener("click",()=>{
    playGame.start();
})

//tiles
const cells = document.querySelectorAll("#cell");
cells.forEach(cell => cell.innerHTML = "");

//winner message
const winner = document.getElementById("winner");

// Turn indicator
const turnIndicator = document.getElementById("turn-indicator");

// Player name inputs
const player1Input = document.getElementById("player_1");
const player2Input = document.getElementById("player_2");

function highlightWinningCells(winningCombination) {
    const cellElements = Array.from(cells);
    winningCombination.forEach(index => {
        cellElements[index].classList.add('winning-cell');
    });
}

//game function
const playGame = (function (){
    let players = [];
    let currentPlayerIndex;
    let gameOver;

    const start = () => {
        // Get current player names, use default if empty
        const player1Name = player1Input.value.trim() || "Player X";
        const player2Name = player2Input.value.trim() || "Player O";

        players = [
            createPlayer(player1Name, "X"),
            createPlayer(player2Name, "O"),
        ]
        currentPlayerIndex = 0;
        gameOver = false;
        btn_start.disabled = false;

        // Reset the board
        cells.forEach(cell => {
            cell.innerHTML = "";
            cell.classList.remove('winning-cell');
            cell.removeEventListener("click", cellClickHandler);
            cell.addEventListener("click", cellClickHandler);
        });

        // Clear winner message and update turn indicator
        winner.innerHTML = "";
        updateTurnIndicator();
    };

    function cellClickHandler(event) {
        const cell = event.target;
        
        // Check if cell is empty
        if(cell.innerHTML == "X" || cell.innerHTML == "O"){
            return;
        }
        
        if (gameOver){
            btn_start.disabled = true;
            return;
        }
        
        // Choose cell
        cell.innerHTML = players[currentPlayerIndex].type;
        Gameboard.board[cell.className] = players[currentPlayerIndex].type; 
        console.log(Gameboard.board);

        // Check winner after play
        gameOver = checkWinner(players, currentPlayerIndex);
        console.log(gameOver);
        
        // Change player if game is not over
        if (!gameOver) {
            currentPlayerIndex = currentPlayerIndex === 0 ? 1 : 0;
            updateTurnIndicator();
        }
    }

    function updateTurnIndicator() {
        if (!gameOver) {
            turnIndicator.textContent = `${players[currentPlayerIndex].name}'s Turn (${players[currentPlayerIndex].type})`;
        } else {
            turnIndicator.textContent = "Game Over";
        }
    }

    return {start, updateTurnIndicator};
})();

function checkWinner(array,index){
    const winCondition = [
        //rows
        [0,1,2],
        [3,4,5],
        [6,7,8],
        //columns
        [0,3,6],
        [1,4,7],
        [2,5,8],
        //diagonal
        [0,4,8],
        [2,4,6]
    ];

    for(let condition of winCondition){
        const [a,b,c] = condition;
        if(
            Gameboard.board[a] && 
            Gameboard.board[a] === Gameboard.board[b] && 
            Gameboard.board[a] === Gameboard.board[c]
        ){
            winner.innerHTML = `Winner: ${array[index].name} (${array[index].type})!`;
            highlightWinningCells(condition);
            btn_start.disabled = true;
            playGame.updateTurnIndicator();
            return true;
        }
    }

    // Check for draw
    if(Gameboard.board.every(cell => cell !== "")){
        winner.innerHTML = "It's a Draw!";
        btn_start.disabled = true;
        playGame.updateTurnIndicator();
        return true;
    }

    return false;
}

// Add event listeners to store player names
player1Input.addEventListener('change', () => {
    localStorage.setItem('player1Name', player1Input.value);
});

player2Input.addEventListener('change', () => {
    localStorage.setItem('player2Name', player2Input.value);
});

// Restore player names from localStorage on page load
window.addEventListener('load', () => {
    const savedPlayer1Name = localStorage.getItem('player1Name');
    const savedPlayer2Name = localStorage.getItem('player2Name');

    if (savedPlayer1Name) {
        player1Input.value = savedPlayer1Name;
    }

    if (savedPlayer2Name) {
        player2Input.value = savedPlayer2Name;
    }
});
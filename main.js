
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

//game function
const playGame = (function (){
    let players = [];
    let currentPlayerIndex;
    let gameOver;

    const start = () => {
        players = [
            createPlayer(document.getElementById("player_1").value, "X"),
            createPlayer(document.getElementById("player_2").value, "O"),
        ]
        currentPlayerIndex = 0;
        gameOver = false;

        

        cells.forEach(cell => cell.addEventListener("click", () => {
            //check if cell is empty
            if(cell.innerHTML == "X" || cell.innerHTML == "O"){
                return;
            }else{
                if (gameOver){
                    btn_start.disabled = true;
                    return;
                }
                
                //choose cell
                cell.innerHTML = players[currentPlayerIndex].type;
                Gameboard.board[cell.className] = players[currentPlayerIndex].type; 
                console.log(Gameboard.board);

                //check winner after play
                gameOver = checkWinner(players,currentPlayerIndex);
                console.log(gameOver);
                

                //change player
                if(currentPlayerIndex == 0){
                    console.log("X's turn");
                    currentPlayerIndex = 1;
                }else if(currentPlayerIndex == 1){
                    console.log("O's turn");
                    currentPlayerIndex = 0;
                }
            }
        }));
    };

    return {start};
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

    let roundWon = false;

    for (let i=0; i<winCondition.length;i++){
        const condition = winCondition[i];
        const cellA = Gameboard.board[condition[0]];
        const cellB = Gameboard.board[condition[1]];
        const cellC = Gameboard.board[condition[2]];

        if(cellA === cellB && cellB === cellC && cellA !== ""){
            winner.innerHTML = `Winner: ${array[index].name}`;
            roundWon = true;
            return roundWon;
        }
    }
}
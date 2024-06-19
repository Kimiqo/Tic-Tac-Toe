
console.log("Tic Tac Toe");

const Gameboard = {
    board : [
    ["","",""],
    ["","",""],
    ["","",""]]
}
console.log(Gameboard.board);

// const gameboard = document.getElementsByClassName("gameboard");
// const f1 = document.getElementById("f1");
// const f2 = document.getElementById("f2");
// const f3 = document.getElementById("f3");
// const f4 = document.getElementById("f4");
// const f5 = document.getElementById("f5");
// const f6 = document.getElementById("f6");


function player(name, type){
    const p_name = name;
    const p_type = type;

    return {p_name, p_type};
}
const player1 = player("P1","X");
const player2 = player("P2","O");


console.log(player1.p_name,player1.p_type);
console.log(player2.p_name,player2.p_type);

function playGame(){};


function checkWin(array){
    //who won
    function win_player(){
        if (array[0][0] === "X" || array[0][1] === "X" || array[0][1] === "X" || array[1][0] === "X" || array[2][0] === "X"){
            console.log("Player 1 wins");
        }else if (array[0][0] === "O" || array[0][1] === "O" || array[0][1] === "O" || array[1][0] === "O" || array[2][0] === "O"){
            console.log("Player 2 wins");
        }
    }
    //diagonal win
    if (array[0][0] === array[1][1] === array[2][2] ){
        win_player();
    }
    //1st row win
    if (array[0][0] === array[0][1] === array[0][2] ){
        win_player();
    }
    //2nd row win
    if (array[1][0] === array[1][1] === array[1][2] ){
        win_player();
    }
    //3rd row win
    if (array[2][0] === array[2][1] === array[2][2] ){
        win_player();
    }
    //1st column win
    if (array[0][0] === array[1][0] === array[2][0] ){
        win_player();
    }
    //2nd column win
    if (array[0][1] === array[1][1] === array[2][1] ){
        win_player();
    }
    //3rd column win
    if (array[0][2] === array[1][2] === array[2][2] ){
        win_player();
    }

};
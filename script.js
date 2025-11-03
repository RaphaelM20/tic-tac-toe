const gameBoard = (function (){
    const board = ["", "", "", "", "", "", "", "", ""]
    const getBoard = () => board;

    const setCell = (index, marker) => {
        if (index < 0 || index > 8) return;
        if (board[index] != "") return;
        board[index] = marker;
    } 

    return {getBoard, setCell};
})();

const Player = (name, marker) => {
    return {name, marker};
}

const GameController = () => {
    const player1 = Player("Player 1", "X");
    const player2 = Player("Player 2", "O");
    let currentPlayer = player1;

    const switchTurn = () => {
        currentPlayer = currentPlayer === player1 ? player2 : player1;
    };

    const checkWin = () => {
        const winningCombos = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6]
        ];

        const boardState = gameBoard.getBoard();

        for (const[a, b, c] of winningCombos) {
            if (boardState[a] != "" && 
                boardState[a] === boardState[b] &&
                boardState[a] === boardState[c]
                ){
                return boardState[a];
            }
        }
        return null;
    };

    const playRound = (index) => {
        gameBoard.setCell(index, currentPlayer.marker);

        const winner = checkWin();
        if (winner){
            console.log(`${currentPlayer.name} wins!`);
            return;
        }

        switchTurn();
    };

    return {playRound};
}
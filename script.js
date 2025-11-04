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
    const player1 = Player("Player X", "X")
    const player2 = Player("Player O", "O");
    let currentPlayer;
    let gameStarted = false;
    let gameOver = false;

    const startGame = (choice) => {
        currentPlayer = choice === "X" ? player1 : player2;
        gameStarted = true;
        gameOver = false;
        console.log(`Game Started! ${currentPlayer.name} (${currentPlayer.marker}) goes first.`);
    }

    const switchTurn = () => {
        currentPlayer = currentPlayer === player1 ? player2 : player1;
    };

    const checkWin = () => {
        const winningCombos = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8],
            [0, 3, 6], [1, 4, 7], [2, 5, 8],
            [0, 4, 8], [2, 4, 6]
        ];

        const boardState = gameBoard.getBoard();

        for (const[a, b, c] of winningCombos) {
            if (boardState[a] != "" && 
                boardState[a] === boardState[b] &&
                boardState[a] === boardState[c]
                ){
                    gameOver = true;
                    document.getElementById('winnerText').textContent = `${currentPlayer.marker} Wins!`;
                    document.getElementById('gameOverOverlay').hidden = false;
                    return true;
            }
        }

        if (!boardState.includes("")){
            gameOver = true;
            document.getElementById('winnerText').textContent = `It's a Tie!`;
            document.getElementById('gameOverOverlay').hidden = false;
        }

        return false;
    };

    const playRound = (index) => {
        if (!gameStarted || gameOver) return;

        gameBoard.setCell(index, currentPlayer.marker);
        const winner = checkWin();
        if (!winner) switchTurn();
    }

    return {playRound, startGame};
}

const game = GameController();

document.getElementById('chooseX').addEventListener('click', () => {
    game.startGame("X");
});

document.getElementById('chooseO').addEventListener('click', () => {
    game.startGame("O");
})

document.querySelectorAll('.cell').forEach((cell, index) => {
    cell.addEventListener('click', () => {
        game.playRound(index);
        cell.textContent = gameBoard.getBoard()[index];
    });
});

document.getElementById('restartButton').addEventListener('click', () => {
    gameBoard.getBoard().fill("");
    
    document.querySelectorAll('.cell').forEach(cell => {
        cell.textContent = "";
    });

    document.getElementById('gameOverOverlay').hidden = true;

    const newGame = GameController();
    window.game = newGame;

    document.querySelector('.controls').style.display = "flex";
});
function createGameboard() {
    const board = Array(9).fill(null);
    const userPlayer = createPlayer();
    const pcPlayer = createPCPlayer(userPlayer);
    let currentPlayer = userPlayer.sign === 'X' ? userPlayer : pcPlayer;

    function makeMove(index) {
        if (this.checkCell(index) === false) {
            return false;
        }
        board[index] = this.currentPlayer.sign;
        let winnerSymbol = this.checkWinner();
        if (winnerSymbol === false) {
            this.swapUser();
        }
        else {
            this.endGame(winnerSymbol);
        }
    }

    function checkWinner() {
        const winningConditions = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6]
        ];

        for (let condition of winningConditions) {
            const [a, b, c] = condition;
            if (board[a] && board[a] === board[b] && board[a] === board[c]) {
                return board[a];
            }
        }

        return false;

    }

    function swapUser() {
        this.currentPlayer = this.currentPlayer === this.userPlayer ? this.pcPlayer : this.userPlayer;
    }

    function endGame(winnerSymbol) {
        const message = winnerSymbol === this.userPlayer.sign ? 'You won!' : 'You lost!';
        console.log(message);
    }

    function checkCell(index) {
        if (this.board[index] === null) {
            return true;
        }
        return false;
    }

    return {
        board,
        userPlayer,
        pcPlayer,
        currentPlayer,
        makeMove,
        checkWinner,
        swapUser,
        endGame,
        checkCell
    };
}

function createPlayer() {
    const name = 'User';//getUserName() || 'User';
    const sign = 'X';//getUserSign() || 'X';
    return ({
        name,
        sign
    });

}

function createPCPlayer(userPlayer) {
    const name = 'Computer';
    const sign = userPlayer.sign === 'X' ? 'O' : 'X';
    return {
        name,
        sign
    };

}

function generatePCMove() {
    return Math.floor(Math.random() * 9) + 1;
}

function getUserMove() {
    return prompt('Enter a number between 1 and 9:');
}


const gameboard = createGameboard();

gameboard.makeMove(0);
gameboard.makeMove(1);
gameboard.makeMove(3);
gameboard.makeMove(4);
gameboard.makeMove(6);
gameboard.makeMove(5);
console.log(gameboard.board);
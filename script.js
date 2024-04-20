const gameboard = (function createGameboard() {
    const board = Array(9).fill(null);
    const userPlayer = createPlayer();
    const pcPlayer = createPCPlayer(userPlayer);
    let currentPlayer = userPlayer.sign === 'X' ? userPlayer : pcPlayer;

    function doMove() {
        let index;
        // подбираем ячейку, которая еще не занята
        do {
            index = (this.currentPlayer === this.userPlayer) ?
                this.userPlayer.getPlayerChoice() :
                this.pcPlayer.getPCChoice();
        }
        while (this.checkCell(index) === false);

        board[index] = this.currentPlayer.sign;

        if (this.checkEndGame() === false) {
            this.swapUser();
        }
        else {
            this.endGame();
        }

    }

    function checkEndGame() {
        // let winnerSymbol = this.checkWinner();
        // if (winnerSymbol === false) {
        //     this.swapUser();
        // }
        if (this.checkWinner() !== false || this.board.includes(null) === false ) {
            return true;
        }
        return false;
    }

    function checkCell(index) {
        return this.board[index] === null;
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

    function endGame() {
        const winnerSymbol = this.checkWinner();
        let message;
        if (winnerSymbol !== false) {
            message = winnerSymbol === this.userPlayer.sign ? 'You won!' : 'You lost!';
        }
        else{
            message = 'Draw!';
        }
        console.log(message);
    }

    return {
        board,
        userPlayer,
        pcPlayer,
        currentPlayer,
        doMove,
        checkWinner,
        swapUser,
        checkEndGame,
        endGame,
        checkCell
    };
})();

function createPlayer() {
    const name = 'User';//getUserName() || 'User';
    const sign = 'X';//getUserSign() || 'X';
    // let i = 0;
    function getPlayerChoice() {
        return Math.floor(Math.random() * 9);
        // return i++;
    }

    return ({
        name,
        sign,
        getPlayerChoice
    });

}

function createPCPlayer(userPlayer) {
    const name = 'Computer';
    const sign = userPlayer.sign === 'X' ? 'O' : 'X';
    // let i = 3;
    function getPCChoice() {
        return Math.floor(Math.random() * 9);
        // return i++
    }
    return {
        name,
        sign,
        getPCChoice
    };

}


// const gameboard = createGameboard();


gameboard.doMove();
gameboard.doMove();
gameboard.doMove();
gameboard.doMove();
gameboard.doMove();
gameboard.doMove();
gameboard.doMove();
gameboard.doMove();
gameboard.doMove();


console.log(gameboard.board);
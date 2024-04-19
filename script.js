function createGameboard() {
    const board = Array(9).fill(null);
    const userPlayer = createPlayer();
    const pcPlayer = createPCPlayer(userPlayer);
    let currentPlayer = userPlayer.sign === 'X' ? userPlayer : pcPlayer;

    function doMove() {
        let index;
        do {
            index = (this.currentPlayer === this.userPlayer) ?
                this.userPlayer.getPlayerChoice() :
                this.pcPlayer.getPCChoice();
            
        }
        while (this.checkCell(index) === false);
        board[index] = this.currentPlayer.sign;
        // this.tryMove(index);

        
        let winnerSymbol = this.checkWinner();
        if (winnerSymbol === false) {
            this.swapUser();
        }
        else {
            this.endGame(winnerSymbol);
        }

        
    }


    function tryMove(index) {
        // if (this.checkCell(index) === false) {
        //     return false;
        // }
        board[index] = this.currentPlayer.sign;
        
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
        doMove,
        tryMove,
        checkWinner,
        swapUser,
        endGame,
        checkCell
    };
}

function createPlayer() {
    const name = 'User';//getUserName() || 'User';
    const sign = 'X';//getUserSign() || 'X';
    function getPlayerChoice() {
        // return prompt('Enter a number between 1 and 9:');
        return Math.floor(Math.random() * 9);
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
    function getPCChoice() {
        return Math.floor(Math.random() * 9);
    }
    return {
        name,
        sign,
        getPCChoice
    };

}


const gameboard = createGameboard();


gameboard.doMove();
gameboard.doMove();
gameboard.doMove();
gameboard.doMove();
gameboard.doMove();
gameboard.doMove();

// gameboard.doMove(gameboard.userPlayer.getPlayerChoice());
// gameboard.doMove(gameboard.pcPlayer.getPCChoice());
// gameboard.doMove(gameboard.userPlayer.getPlayerChoice());
// gameboard.doMove(gameboard.pcPlayer.getPCChoice());
// gameboard.doMove(gameboard.userPlayer.getPlayerChoice());
// gameboard.doMove(gameboard.pcPlayer.getPCChoice());
console.log(gameboard.board);
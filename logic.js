function createGameboard() {
    const board = Array(9).fill(null);
    let userPlayer;
    let pcPlayer;
    let currentPlayer; //= userPlayer.sign === 'X' ? userPlayer : pcPlayer;

    function doMove(index) {
        if (index == undefined) {
            index = gameboard.pcPlayer.getPCChoice();
        }
        board[index] = this.currentPlayer.sign;
        cells[index].textContent = gameboard.currentPlayer.sign;
        cells[index].classList.add('disabled');
    }

    function checkEndGame() {
        if (this.checkWinner() !== false || this.board.includes(null) === false) {
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



    return {
        board,
        userPlayer,
        pcPlayer,
        currentPlayer,
        doMove,
        checkWinner,
        swapUser,
        checkEndGame,
        checkCell
    };
}


function createPlayer(nameParam, signParam) {
    const name = nameParam;
    const sign = signParam;

    function getPlayerChoice() {
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
        let index;
        do {
            index = Math.floor(Math.random() * 9);
        }
        while (gameboard.checkCell(index) === false);
        return index;
    }
    return {
        name,
        sign,
        getPCChoice
    };

}


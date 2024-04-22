let gameboard;

// новая игра
const newGameButton = document.getElementById('newGame');
newGameButton.addEventListener('click', function () {
    const dialog = document.getElementById('settingsDialog');
    dialog.showModal();
});

document.getElementById('cancelSettings').addEventListener('click', function () {
    document.getElementById('settingsDialog').close();
});


document.getElementById('confirmSettings').addEventListener('click', startNewGame);

function startNewGame() {
    gameboard = createGameboard();
    const playerName = document.getElementById('playerName').value;
    const playerSign = document.querySelector('input[name="playerSign"]:checked').value;

    document.getElementById('userName').textContent = playerName;
    const userPlayer = createPlayer(playerName, playerSign);
    const pcPlayer = createPCPlayer(userPlayer);

    gameboard.userPlayer = userPlayer;
    gameboard.pcPlayer = pcPlayer;
    gameboard.currentPlayer = playerSign === 'X' ? gameboard.userPlayer : gameboard.pcPlayer;

    document.getElementById('settingsDialog').close();

    updateBoard();
}

// клетки
const disabledCells = Array.from(document.getElementsByClassName('cell disabled'));
disabledCells.forEach(cell => cell.addEventListener('click', function (event) {
    event.preventDefault();
}));

const cells = Array.from(document.getElementsByClassName('cell'));
cells.forEach(cell => cell.addEventListener('click', handleCellClick));

function handleCellClick(event) {
    const cell = event.target;
    if (cell.classList.contains('disabled')) {
        return;
    }
    const index = cells.indexOf(cell);

    if (gameboard.checkCell(index) === true) {
        gameboard.doMove(index);
        cell.textContent = gameboard.currentPlayer.sign;
        cell.classList.add('disabled');
    }
    if (gameboard.checkEndGame() === false) {
        gameboard.swapUser();
        let pcIndex = gameboard.pcPlayer.getPCChoice();
        // console.log(pcIndex);
        gameboard.doMove(pcIndex);
        cells[pcIndex].textContent = gameboard.pcPlayer.sign;
        cells[pcIndex].classList.add('disabled');
        if (gameboard.checkEndGame() === false) {
            gameboard.swapUser();
        }

    }
    if (gameboard.checkEndGame() === true) {
        endGame();
    }
}

function updateBoard() {
    cells.forEach((cell, index) => {
        cell.textContent = gameboard.board[index];
        cell.classList.remove('disabled');
    });
    const resultMessage = document.getElementById('resultMessage');
    resultMessage.textContent = '';

    if (gameboard.currentPlayer === gameboard.pcPlayer) {
        setTimeout(function () {
            gameboard.doMove();
            gameboard.swapUser();
        }, 200);

        /* setTimeout(function () {
            let pcIndex = gameboard.pcPlayer.getPCChoice();
            // console.log(pcIndex);
            gameboard.doMove(pcIndex);
            cells[pcIndex].textContent = gameboard.pcPlayer.sign;
            cells[pcIndex].classList.add('disabled');

            gameboard.swapUser();
        }, 200);
        */
    }
}

function endGame() {
    const winnerSymbol = gameboard.checkWinner();
    let message;
    let color;
    switch (winnerSymbol) {
        case false:
            {
                message = 'Draw!';
                color = 'blue';
                break;
            }
        case gameboard.pcPlayer.sign:
            {
                message = 'You lost!'
                color = 'red';
                break;
            }
        case gameboard.userPlayer.sign:
            {
                message = 'You won!'
                color = 'green';
                break;
            }
    }

    const resultMessage = document.getElementById('resultMessage');
    resultMessage.textContent = message;
    resultMessage.style.color = color;

    cells.forEach((cell, index) => {
        cell.textContent = gameboard.board[index];
        cell.classList.add('disabled');
    });
}
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

// ход игрока
function handleCellClick(event) {
    const cell = event.target;
    const index = cells.indexOf(cell);
    if (gameboard.checkCell(index) === true) {
        gameboard.doMove(index);
        cell.textContent = gameboard.currentPlayer.sign;
        cell.classList.add('disabled');
    }
    if (gameboard.checkEndGame() === false) {
        gameboard.swapUser();
        // ход ПК
    }
    else {
        gameboard.endGame();
    }
}

function updateBoard() {
    cells.forEach((cell, index) => {
        cell.textContent = gameboard.board[index];
        cell.classList.remove('disabled');
    });
}
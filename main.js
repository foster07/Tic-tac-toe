//selecting all classes and ids from the html doc
let allBoxex = document.querySelectorAll('.box');
let playerName = document.querySelector('#playerName');
const newGameBtn = document.querySelector('#newGame');

// defining variables
let gameGrid = ['', '', '', '', '', '', '', '', ''];
const winningPositions = [[1, 2, 3], [4, 5, 6], [7, 8, 9], [1, 4, 7], [2, 5, 8], [3, 6, 9], [1, 5, 9], [3, 5, 7]];
let gameActive = true;
let currentPlayer = 'X';
playerName.innerText = `Player - ${currentPlayer}`;
let winpattern;

// functions defination
function gameWin() {
    return winningPositions.some(pattern => {
        let [a, b, c] = pattern;
        winpattern = pattern;
        return (gameGrid[a - 1] === `${currentPlayer}`) && (gameGrid[b - 1] === `${currentPlayer}`) && (gameGrid[c - 1] === `${currentPlayer}`);
    })
}

function draw() {
    return gameGrid.every(str => str !== '');
}

function initiater() {
    gameGrid = ['', '', '', '', '', '', '', '', ''];
    currentPlayer = 'X';
    gameActive = true;

    //make the text content of the all boxes empty
    allBoxex.forEach(box => {
        box.innerText = '';
        box.classList.remove('win');
    });
    playerName.innerText = `Player - ${currentPlayer}`;
}

function tictac(index) {
    if (gameGrid[index] === '' && gameActive) {
        gameGrid[index] = `${currentPlayer}`;
        allBoxex[index].innerText = `${currentPlayer}`;
        allBoxex[index].style.cursor = 'default';

        if (gameWin()) {
            playerName.innerText = `Player - ${currentPlayer} Won!`;
            winpattern.forEach(i => {
                allBoxex[i - 1].classList.add('win');
            })
            gameActive = false;

        }
        else if (draw()) {
            playerName.innerText = `Game Tied`;
            gameActive = false;
        }
        else {
            currentPlayer = (currentPlayer === 'X') ? 'O' : 'X';
            playerName.innerText = `Player - ${currentPlayer}`;
        }
    }

}

//adding EventListners
allBoxex.forEach((box, index) => {
    box.addEventListener('click', () => {
        tictac(index);
    });
})
newGameBtn.addEventListener('click', () => {
    initiater();
})

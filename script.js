let iAmAngry = true;

const game = (() => {

    let _player1 = {}
    let _player2 = {}
    let _gameState = [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined,]
    let _currentPlayer = undefined;

    const _displayController = (() => {

        const fillTile = (symbol, tileID) => {
            tiles[tileID].innerHTML = symbol;
        };

        const changeUI = (displayState) => {
            if (displayState === "input") {
                inputDiv.style.visibility = "visible";
                inputDiv.style.position = "static";
                turnDiv.style.visibility = "hidden";
                turnDiv.style.position = "absolute";
                resultDiv.style.visibility = "hidden";
                resultDiv.style.position = "absolute";
            } else if (displayState === "turn") {
                inputDiv.style.visibility = "hidden";
                inputDiv.style.position = "absolute";
                turnDiv.style.visibility = "visible";
                turnDiv.style.position = "static";
                resultDiv.style.visibility = "hidden";
                resultDiv.style.position = "absolute";
            } else if (displayState === "result") {
                inputDiv.style.visibility = "hidden";
                inputDiv.style.position = "absolute";
                turnDiv.style.visibility = "hidden";
                turnDiv.style.position = "absolute";
                resultDiv.style.visibility = "visible";
                resultDiv.style.position = "static";
            } else {console.log("Error, please use input, turn or result")}
        };

        const _tileEvent = (player) => {
            if (tiles[event.target.id].innerHTML !== "") {
                _doubleSelectionHandler();
                return;
            }
            tiles[event.target.id].innerHTML = player.symbol;
            _gameState[event.target.id] = player.symbol;
            _changeTurn();
        };

        const addEvents = (player) => {
            boardDiv.addEventListener("click", () => {
                _tileEvent(player);
            }, {once: true});
        };

        const _doubleSelectionHandler = () => { // Added because the game commited suicide when clicking on an already occupied field
            if (_currentPlayer === _player1.name) {
                _currentPlayer = _player2.name;
                _changeTurn();
            } else if (_currentPlayer === _player2.name){
                _currentPlayer = _player1.name
                _changeTurn();
            } else {
                console.log("Error in _doubleSelectionHandler()")
                console.log(_currentPlayer);
            }
        }

        const displayCurrentPlayer = (currentPlayer) => {
            turnText.innerHTML = `It's ${currentPlayer}'s turn!`
        };

        const clearBoard = () => {
            for (let i = 0; i < 9; i++) {
                tiles[i].innerHTML = "";
            }
        };

        return {
            fillTile,
            changeUI,
            addEvents,
            displayCurrentPlayer,
            clearBoard,
        };

    })();

    const _createPlayer = (name, symbol) => {
        return {name, symbol};
    };

    const _changeTurn = () => {
        if (_checkWinner()) {return;}
        if (!_currentPlayer || _currentPlayer === _player2.name) {
            _displayController.addEvents(_player1);
            _currentPlayer = _player1.name;
            _displayController.displayCurrentPlayer(_currentPlayer);
        } else if (_currentPlayer === _player1.name) {
            _displayController.addEvents(_player2);
            _currentPlayer = _player2.name;
            _displayController.displayCurrentPlayer(_currentPlayer);
        } else {
            console.log("Error in _changeTurn()");
            console.log(_currentPlayer);
        }
    };



    const _checkWinner = () => {
        if ((checkIfAllEqual(_gameState[0], _gameState[1], _gameState[2])) ||
            (checkIfAllEqual(_gameState[3], _gameState[4], _gameState[5])) || 
            (checkIfAllEqual(_gameState[6], _gameState[7], _gameState[8])) || 
            (checkIfAllEqual(_gameState[0], _gameState[3], _gameState[6])) || 
            (checkIfAllEqual(_gameState[1], _gameState[4], _gameState[7])) || 
            (checkIfAllEqual(_gameState[2], _gameState[5], _gameState[8])) ||
            (checkIfAllEqual(_gameState[0], _gameState[4], _gameState[8])) ||
            (checkIfAllEqual(_gameState[2], _gameState[4], _gameState[6]))) {
                _endGame(_currentPlayer);
                return true;
        };
        for (let i = 0; i < 9; i++) {
            if (_gameState[i] === undefined) {
                return;
            }
        };
        _endGame("draw")
    };

    const _endGame = (winner) => {
        if (winner === "draw") {
            resultText.innerHTML = `Draw! Everyone loses!`
            _displayController.changeUI("result")
            return;
        }
        resultText.innerHTML = `${winner} wins!`
        _displayController.changeUI("result")
        console.log("congrats")
    }

    const _cleanData = () => {
        _gameState = [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined,];
        _currentPlayer = undefined;
    };

    const start = () => {
        name1 = document.getElementById("p1").value;
        name2 = document.getElementById("p2").value;
        _player1 = _createPlayer(name1, "X");
        _player2 = _createPlayer(name2, "O");
        _displayController.changeUI("turn");
        _changeTurn();
    };

    const restart = () => {
        _cleanData();
        _displayController.clearBoard();
        game.start(_player1.name, _player2.name);
    };

    const reset = () => {
        _cleanData();
        _displayController.clearBoard();
        _displayController.changeUI("input");
    };

    return {
        start,
        restart,
        reset,
    };

})();

const startBtn = document.getElementById("startBtn");
const restartBtn = document.getElementById("restartBtn");
const resetBtn = document.getElementById("resetBtn");

const input1 = document.getElementById("p1");
const input2 = document.getElementById("p2");

startBtn.addEventListener("click", () => {
    game.start()
});

restartBtn.addEventListener("click", () => {game.restart()});
resetBtn.addEventListener("click", () => {game.reset()});

input1.addEventListener("click", () => {
    input1.value = "";
}, {once: true})

input2.addEventListener("click", () => {
    input2.value = "";
}, {once: true})

const inputDiv = document.getElementById("input");
const turnDiv = document.getElementById("turnWrapper");
const turnText = document.getElementById("turn");
const resultDiv = document.getElementById("resultWrapper");
const resultText = document.getElementById("result");
const boardDiv = document.getElementById("board");

let name1 = document.getElementById("p1").value;
let name2 = document.getElementById("p2").value;

const tiles = {
    0: document.getElementById("0"),
    1: document.getElementById("1"),
    2: document.getElementById("2"),
    3: document.getElementById("3"),
    4: document.getElementById("4"),
    5: document.getElementById("5"),
    6: document.getElementById("6"),
    7: document.getElementById("7"),
    8: document.getElementById("8"),
}      

document.onload = init();

function checkIfAllEqual(args) { // Returns false if values are undefined
    for (let i = 0; i < arguments.length; i++) {
        if (arguments[0] !== arguments[i] || arguments[i] === undefined) {
            return false;
        };
    };
    return true;
};

function init() {
    document.getElementById("p1").value = "Player 1";
    document.getElementById("p2").value = "Player 2";
}
let iAmAngry = true;

const game = (() => {

    let _player1 = {}
    let _player2 = {}
    let _gameState = [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, ]
    let _currentPlayer = undefined;

    const _displayController = (() => {

        const fillTile = (symbol, tileID) => {
            tiles[tileID].innerHTML = symbol;
        };

        const changeUI = (displayState) => {
            if (displayState === "input") {
                inputDiv.style.visibility = "visible";
                turnDiv.style.visibility = "hidden";
                resultDiv.style.visibility = "hidden";
            } else if (displayState === "turn") {
                inputDiv.style.visibility = "hidden";
                turnDiv.style.visibility = "visible";
                resultDiv.style.visibility = "hidden";
            } else if (displayState === "result") {
                inputDiv.style.visibility = "hidden";
                turnDiv.style.visibility = "hidden";
                resultDiv.style.visibility = "visible";
            } else {console.log("Error, please use input, turn or result")}
        };

        const addEvents = (player) => {
            // not now I just can't remove those fucking event listeners 

            // for (let i = 0; i < 9; i++) {
            //     tiles[i].addEventListener("click", () => {event(player, i)});
            // };
        };

        return {
            fillTile,
            changeUI,
            addEvents,
        }

    })();

    const _createPlayer = (name, symbol) => {
        return {name, symbol};
    };

    const _changeTurn = () => {
        if (_checkWinner()) {return;}
        if (!_currentPlayer || _currentPlayer === _player2.name) {
            _displayController.addEvents(_player1);
            _currentPlayer = _player1.name;
        } else if (_currentPlayer === _player1.name) {
            _displayController.addEvents(_player2);
            _currentPlayer = _player2.name;
        } else {
            console.log("Error in _changeTurn()")
        }
    };



    const _checkWinner = () => {
        // Placeholder
        // if there is a winner > run _endGame(winner), return true
        // else > return undefined
        return;
    };

    const _endGame = (winner) => {

    }

    const _cleanData = () => {

    };

    const start = (name1, name2) => {
        _player1 = _createPlayer(name1, "X");
        _player2 = _createPlayer(name2, "O");
        _displayController.changeUI("turn");
        _changeTurn();
    };

    const restart = () => {

    };

    const reset = () => {

    };

    const test = () => {
        _player1 = _createPlayer("peter", "X")
        _player2 = _createPlayer("Paul", "O")
        _changeTurn();
    }

    return {
        start,
        restart,
        reset,
        test,
    };

})();

const startBtn = document.getElementById("startBtn");
const restartBtn = document.getElementById("restartBtn");
const resetBtn = document.getElementById("resetBtn");

startBtn.addEventListener("click", () => {
    let p1name = document.getElementById("p1").value;
    let p2name = document.getElementById("p2").value;
    game.start(p1name,p2name)
});
restartBtn.addEventListener("click", () => {game.restart()});
resetBtn.addEventListener("click", () => {game.reset()});

const inputDiv = document.getElementById("input");
const turnDiv = document.getElementById("turnWrapper");
const resultDiv = document.getElementById("resultWrapper");

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


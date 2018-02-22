// board array
let board = [
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
]

// variables
const buttons = document.querySelectorAll("button");
const cols = document.getElementsByClassName("col");
const edgeX = board[0].length - 3;
const edgeY = board.length - 3;
let colPos = [5, 5, 5, 5, 5, 5, 5];
let currentPlayer = "red";
let nextPlayer = "green";
let redWins = 0;
let greenWins = 0;
let draws = 0;

// changes spots in the board array and adds a circle to the HTML
function addDisc(column, type, color) {
    board[colPos[column]][column] = type;
    colPos[column]--;

    const newDiv = document.createElement("div");
    const destination = document.getElementById("col" + column);
    newDiv.className = "disc " + color;
    destination.appendChild(newDiv);
}

// changes the text of who's turn it is
function turnText(text, color) {
    document.getElementById("turnText").className = color;
    document.getElementById("turnText").innerHTML = text;
}

// win stuff
function win() {
    alert(nextPlayer + " has won!");

    for (let i = 0; i < cols.length; i++) {
        cols[i].innerHTML = "";
    }

    board = [
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
    ]

    colPos = [5, 5, 5, 5, 5, 5, 5];

    if (nextPlayer === "red") {
        redWins++;
        document.getElementById("redWins").innerHTML = redWins;
    } else {
        greenWins++;
        document.getElementById("greenWins").innerHTML = greenWins;
    }

    turnText("Red's Turn!", "redText");
    currentPlayer = "red";
    nextPlayer = "green";
}

// tie stuff
function draw() {
    alert("It's a draw!");

    for (let i = 0; i < cols.length; i++) {
        cols[i].innerHTML = "";
    }

    board = [
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
    ]

    colPos = [5, 5, 5, 5, 5, 5, 5];

    draws++;
    document.getElementById("draws").innerHTML = draws;

    turnText("Red's Turn!", "redText");
    currentPlayer = "red";
    nextPlayer = "green";
}

// click handler
handleClick = function (event) {
    const column = event.target;

    // adds discs (visual and backend)
    if (colPos[column.id[3]] >= 0) {
        if (currentPlayer === "red") {
            addDisc(column.id[3], 1, "red");
            turnText("Green's Turn!", "greenText");
            currentPlayer = "green";
            nextPlayer = "red";
        } else if (currentPlayer === "green") {
            addDisc(column.id[3], 2, "green");
            turnText("Red's Turn!", "redText");
            currentPlayer = "red";
            nextPlayer = "green";
        }
    }

    setTimeout(function () {

        // test for horizontal match
        for (let y = 0; y < board.length; y++) {
            for (let x = 0; x < edgeX; x++) {
                let cell = board[y][x];
                if (cell !== 0) {
                    if (cell === board[y][x + 1] && cell === board[y][x + 2] && cell === board[y][x + 3]) {
                        win();
                    }
                }
            }
        }

        // test for vertical match
        for (let y = 0; y < edgeY; y++) {
            for (let x = 0; x < board[y].length; x++) {
                let cell = board[y][x];
                if (cell !== 0) {
                    if (cell === board[y + 1][x] && cell === board[y + 2][x] && cell === board[y + 3][x]) {
                        win();
                    }
                }
            }
        }

        // test for diagonal (down-right) match
        for (let y = 0; y < edgeY; y++) {
            for (let x = 0; x < edgeX; x++) {
                let cell = board[y][x];
                if (cell !== 0) {
                    if (cell === board[y + 1][x + 1] && cell === board[y + 2][x + 2] && cell === board[y + 3][x + 3]) {
                        win();
                    }
                }
            }
        }

        // test for diagonal (down-left) match
        for (let y = 2; y < board.length; y++) {
            for (let x = 0; x < edgeX; x++) {
                let cell = board[y][x];
                if (cell !== 0) {
                    if (cell === board[y - 1][x + 1] && cell === board[y - 2][x + 2] && cell === board[y - 3][x + 3]) {
                        win();
                    }
                }
            }
        }

        // test for draw
        if (board[0].indexOf(0) === -1) {
            draw();
        }

    }, 10);

}

// click listeneres for the cols
for (let i = 0; i < cols.length; i++) {
    cols[i].addEventListener('click', handleClick);
}
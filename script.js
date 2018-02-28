// some variables for later

let status = "pick";
let block = "";
const statusText = document.getElementById("status");
const audio = new Audio('error.wav');

// function that adds back the blocks

function addDiv(id, column) {
    const newDiv = document.createElement("div");
    newDiv.className = "block";
    newDiv.id = id;
    column.appendChild(newDiv);
}

// set click handlers

let columns = document.getElementsByClassName("column");

for (let i = 0; i < columns.length; i++) {
    columns[i].addEventListener("click", handleClick)
}

// click function

function handleClick(event) {
    let column = event.currentTarget;

    // picks up blocks

    if (status === "pick") {
        if (column.childElementCount > 0) {
            block = column.lastElementChild.id;
            column.lastElementChild.remove();
            statusText.innerHTML = "Drop off";
            status = "drop";
        }
    // drops off blocks
    } else {
        if (column.childElementCount === 0 || block[1] < column.lastElementChild.id[1]) {
            statusText.innerHTML = "Pick up";
            status = "pick";
            addDiv(block, column);
        } else {
            audio.play();
        }
    }

    // win test

    if (column.id === "win1" && column.childElementCount === 4 || column.id === "win2" && column.childElementCount === 4) {
        statusText.innerHTML = "You win!";
    }
}

// reset button 

document.getElementById("reset").onclick = function () {

    // clears all columns
    for (let i = 0; i < columns.length; i++) {
        columns[i].innerHTML = "";
    }

    // adds back blocks
    addDiv("b4", columns[0]);
    addDiv("b3", columns[0]);
    addDiv("b2", columns[0]);
    addDiv("b1", columns[0]);
}
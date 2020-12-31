
// Call the main function when the DOM is loaded
window.addEventListener('load', main);

// One global variable that stores board dimensions and related objects 
// (try to limit your use of globals).   The values are initialized in main.
const board = {
    canvas: null,  // The canvas element
    ctx: null,     // The 2D drawing context (CanvasRenderingContext2D)
    width: 0,      // The width in pixels
    height: 0,     // The height in pixels
    cellSize: 0,   // Size of a cell
}

/**
 * The entry point for your application.  This will be called once the 
 * HTML DOM is fully loaded.
 */
function main() {
    board.canvas = document.getElementById('game-canvas');
    board.ctx = board.canvas.getContext('2d');
    board.width = board.canvas.width;
    board.height = board.canvas.height;
    board.cellSize = board.width / 19.0;  // Assume width = height

    drawBoard();

    seedBoard();

    // Add an event listener to the canvas to be triggered on mouse click.  When a
    // click occurs, it will call the function mouseClickOnBoard (2nd parameter).
    board.canvas.addEventListener('click', mouseClickOnBoard);

}

/**
 * Draws the game board.  For details on how to draw with a CanvasRenderingContext2D,
 * see this:  https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D
 */
function drawBoard() {
    const ctx = board.ctx;

    // Clear the canvas
    ctx.clearRect(0, 0, board.width, board.height);

    // Set the style for the grid lines
    ctx.strokeStyle = "black";
    ctx.lineWidth = 2;

    // Draw the grid lines
    const cellSize = board.cellSize;
    ctx.beginPath();
    // Vertical lines
    for( let i = 0; i < 19; i++ ) {
        const x = cellSize / 2 + i * cellSize;
        ctx.moveTo(x, 0);
        ctx.lineTo(x, board.height);
    }
    // Horizontal lines
    for( let i = 0; i < 19; i++ ) {
        const y = cellSize / 2 + i * cellSize;
        ctx.moveTo(0, y);
        ctx.lineTo(board.width, y);
    }
    ctx.closePath();
    ctx.stroke();
}

/**
 * Draw a single piece on the board.
 * 
 * @param {*} x the x cell number (zero based)
 * @param {*} y the y cell number (zero based)
 * @param {*} color the color
 */
function drawPiece(x, y, color) {
    const ctx = board.ctx;
    const cellSize = board.cellSize;

    ctx.fillStyle = color;

    const cx = cellSize / 2 + x * cellSize;
    const cy = cellSize / 2 + y * cellSize;
    const radius = cellSize / 2;

    ctx.beginPath();
    ctx.arc(cx, cy, radius, 0, Math.PI * 2 );
    ctx.fill();
}

/**
 * Called when a mouse click occurs on the game board.  Currently, just 
 * prints the cell corresponding to the click to the Javascript console.
 * 
 * @param {MouseEvent} e the mouse event
 */
function mouseClickOnBoard(e) {

    let flag = true;

    let mouseX = e.offsetX;
    let mouseY = e.offsetY;

    // Clamp mouse coordinates to valid range
    mouseX = Math.max( Math.min(mouseX, board.width - 1), 0);
    mouseY = Math.max( Math.min(mouseY, board.height - 1), 0);

    // Find and print the cell number for the click
    const cellX = Math.floor( mouseX / board.cellSize ); 
    const cellY = Math.floor( mouseY / board.cellSize );
    let url = 'http://35.212.254.221:5001/gogame/game/makemove';
    let param = localStorage['profile'] || 'defaultValue';
    url += '/' + param;
    console.log(url);

    let id = localStorage['gameId'] || 'defaultValue';
    id = parseInt(id);
    fetch(url, {method: "POST", body: JSON.stringify({id: id, x: cellX, y: cellY})})
        .then( (response) => {
            if( response.status !== 200) {
                alert("Error: invalid move!");
                console.log("Error: " + response.status);
                flag = false;
                console.log(flag);
            } else {
                console.log(response.status);
                let color = localStorage['playercolor'] || 'defaultValue';
                if (color == 1) {
                    drawPiece(cellX, cellY, "black");
                } else {
                    drawPiece(cellX, cellY, "white");
                }
                return response.text();
            }
        })
        .then( (text) => {
            console.log(text);
        });
    console.log(flag);
    if (flag) {
        fetch('http://35.212.254.221:5001/gogame/game/checkwin', {method: "POST", body: JSON.stringify({id: id, x: cellX, y: cellY, username: param})})
            .then( (response) => {
                if( response.status !== 200) {
                    console.log("Error: " + response.status);
                } else {
                    alert("User won!");
                    console.log(response.status);
                    return response.text();
                }
            })
            .then( (text) => {
                console.log(text);
            });
    }
    console.log(`Click on cell: (${cellX}, ${cellY})`);
}

function signupClick() {
    let username = document.getElementById('createUsername').value;
    let password = document.getElementById('createPassword').value;
    console.log(`(${username}, ${password})`);
    console.log(JSON.stringify({username: username, password: password}));
    fetch('http://35.212.254.221:5001/gogame/account/create', {method: "POST", body: JSON.stringify({username: username, password: password})})
        .then( (response) => {
            if( response.status !== 200) {
                alert("Error: account already exists!");
                console.log("Error: " + response.status);
            } else {
                console.log(response.status);
                alert("Account created successfully!");
                localStorage['profile'] = username;
                return response.text();
            }
        })
        .then( (text) => {
            console.log(text);
        });
}

function loginClick() {
    let username = document.getElementById('loginUsername').value;
    let password = document.getElementById('loginPassword').value;

    localStorage['profile'] = username;

    console.log(`(${username}, ${password})`);
    console.log(JSON.stringify({username: username, password: password}));
    fetch('http://35.212.254.221:5001/gogame/account/login', {method: "POST", body: JSON.stringify({username: username, password: password})})
        .then( (response) => {
            if( response.status !== 200) {
                alert("Error: invalid login!");
                console.log("Error: " + response.status);
            } else {
                console.log(response.status);
                alert("Login Successful!");
                return response.text();
            }
        })
        .then( (text) => {
            console.log(text);
        });
}

function createGameClick() {
    let player1 = document.getElementById('player1').value;
    let player2 = document.getElementById('player2').value;
    console.log(`(${player1}, ${player2})`);
    console.log(JSON.stringify({player1: player1, player2: player2}));
    fetch('http://35.212.254.221:5001/gogame/game/startgame', {method: "POST", body: JSON.stringify({username1: player1, username2: player2})})
        .then( (response) => {
            if( response.status !== 200) {
                alert("Error: invalid user data!");
                console.log("Error: " + response.status);
            } else {
                alert("Game successfully made!");
                console.log(response.status);
                return response.text();
            }
        })
        .then( (text) => {
            console.log(text);
        });
}

function refreshGamesClick() {
    let url = 'http://35.212.254.221:5001/gogame/game/current';
    let param = localStorage['profile'] || 'defaultValue';
    url += '/' + param;
    fetch(url)
        .then( (response) => {
            if(response.status === 200) {
                return response.json();
            } else {
                console.log("Error: " + response.status);
            }
        })
        .then( (obj) => {
            let output = "";
            let games = obj.games;
            for (var key in games) {
                output += ("gameid: " + JSON.stringify(key) + " ");
                if (games.hasOwnProperty(key)) {
                    output += ("username1 " + games[key].username1 + " ");
                     output += ("username2 " + games[key].username2 + "\n");
                }
            }
            console.log(output);
            document.getElementById('games').innerHTML = "<pre>" + output + "</pre>";
        });
}

function seedBoard() {
    fetch('http://35.212.254.221:5001/gogame/leaderboard/seed', {method : 'DELETE'})
            .then(response => {
                if(response.status === 200) {
                        return response.json();
                    } else {
                        console.log("Error: " + response.status);
                    }
            });
}

function refreshLeaderboard() {
    fetch('http://35.212.254.221:5001/gogame/leaderboard')
        .then( (response) => {
            if(response.status === 200) {
                return response.json();
            } else {
                alert(response.status);
                console.log("Error: " + response.status);
            }
        })
        .then( (obj) => {
            let output = "";
            let usernames = obj.usernames;
            let wins = obj.wins;

            for (let i = 0; i < 20; i++) {
                output += ((i+1) + ". " + usernames[i] + " wins: " + wins[i] + "\n");
            }
            document.getElementById('leaders').innerHTML = "<pre>" + output + "</pre>";
        })
}

function getGame() {

    let id = document.getElementById('gameId').value;
    localStorage['gameId'] = id;

    let url = 'http://35.212.254.221:5001/gogame/game';
    let param = localStorage['gameId'] || 'defaultValue';
    url += '/' + param;
    fetch(url)
        .then( (response) => {
            if(response.status === 200) {
                return response.json();
            } else {
                alert("Error: invalid game id!");
                console.log("Error: " + response.status);
            }
        })
        .then( (obj) => {
            let board = obj.board;
            drawBoard();
            let param = localStorage['profile'] || 'defaultValue';
            if (("\""+param+"\"") === JSON.stringify(obj.player1)) {
                localStorage['playercolor'] = 1;
            } else {
                localStorage['playercolor'] = 2;
            }
            for (let i = 0; i < board.length; i++) {
                let cube = board[i];
                for (let j = 0; j < cube.length; j++) {
                    if (parseInt(JSON.stringify(cube[j])) == 1) {
                        drawPiece(i,j,"black");
                    }
                    if (parseInt(JSON.stringify(cube[j])) == 2) {
                        drawPiece(i,j,"white");
                    }
                }
            }
            console.log("Game retrieved");
        });
}
const Discord = require('discord.js');
const client = new Discord.Client();
const options = ["a1", "a2", "a3", "a4", "b1", "b2", "b3", "b4", "c4", "d1", "d2", "d3", "d4"]

class Game {
    constructor(board, visible, score) {
        this.board = board;
        this.visible = visible;
        this.score = score;
        this.score = 0;
    }
    getBoard() {
        return this.board;
    }
    getVisible() {
        return this.visible;
    } 
    setBoard(newBoard) {
        this.board = newBoard;
    }
    setVisible(newVisible) {
        this.visible = newVisible
    }
    setScore(points, msg) {
        if (points == 0) {
            gameOver();
        } else if (this.score == 0) {
            this.score = points;
        } else {
            this.score = this.score * points;
        }
    }
}

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

function gameOver(msg) {
    msg.channel.send("Game over!");
}

function getType(num) {
    if (num == 1 || num == 2 || num == 3) {
        return 0;
    } else if (num == 4 || num == 5 || num == 6) {
        return 1;
    } else if (num == 7 || num == 8) {
        return 2
    } else {
        return 3;
    }
}

function getVoltorbs(type, num) {
    var i = 0;
    if (type == "row") {
        for (var j = 0; j < 4; j++) {
            console.log(game.board[0][1]);
            if (game.board[num][i] == 0) {
                i++;
            }
        }
        return i;
    } else {
        for (var g = 0; g < 4; g++) {
            if (game.board[g][num] == 0) {
                i++;
            }
        }
    }
}

function getLocation(msg, game) {
    if (msg.content[0] == "a") {
        game.visible[0][Number(msg.content[1]) - 1] = game.board[0][Number(msg.content[1]) - 1];
        game.setScore(game.board[0][Number(msg.content[1]) - 1], msg)
    } else if (msg.content[0] == "b") {
        game.visible[1][Number(msg.content[1]) - 1] = game.board[1][Number(msg.content[1]) - 1];
        game.setScore(game.board[1][Number(msg.content[1]) - 1], msg)
    } else if (msg.content[0] == "c") {
        game.visible[2][Number(msg.content[1]) - 1] = game.board[2][Number(msg.content[1]) - 1];
        game.setScore(game.board[2][Number(msg.content[1]) - 1], msg)
    } else if (msg.content[0] == "d") {
        game.visible[3][Number(msg.content[1]) - 1] = game.board[3][Number(msg.content[1]) - 1];
        game.setScore(game.board[3][Number(msg.content[1]) - 1], msg)
    }
}

function sendBoard(game, msg) {
    msg.channel.send(game.visible[0][0] + "   " + game.visible[0][1] + "   " + game.visible[0][2] + "   " + game.visible[0][3] + "   v:" + getVoltorbs("row", 0)
    + "\n" +game.visible[1][0] + "   " + game.visible[1][1] + "   " + game.visible[1][2] + "   " + game.visible[1][3] + "   v:"  + getVoltorbs("row", 1)
    + "\n" + game.visible[2][0] + "   " + game.visible[2][1] + "   " + game.visible[2][2] + "   " + game.visible[2][3] + "   v:"  + getVoltorbs("row", 2)
    + "\n" + game.visible[3][0] + "   " + game.visible[3][1] + "   " + game.visible[3][2] + "   " + game.visible[3][3] + "   v:"  + getVoltorbs("row", 3)
    + "\n" + getVoltorbs("column", 0) + getVoltorbs("column", 1) + getVoltorbs("column", 2) + getVoltorbs("column", 3)
    + "\n" + "Score: " + game.score);
}

function assignRandom(innerArray) {
    for (var i = 0; i < 4; i++) {
        var boardType = getType(Math.floor((Math.random() * 9) + 1));
        innerArray[i] = boardType;
    }
}

function assignX(innerArray) {
    for (var i = 0; i < 4; i++) {
        innerArray[i] = "x";
    }
}

function createGame() {
    var game = new Game();
    var innerArray1 = new Array();
    var innerArray2 = new Array();
    var innerArray3 = new Array();
    var innerArray4 = new Array();
    var innerVis1 = new Array();
    var innerVis2 = new Array();
    var innerVis3 = new Array();
    var innerVis4 = new Array();
    var gameBoard = [innerArray1, innerArray2, innerArray3, innerArray4];
    var visible = [innerVis1, innerVis2, innerVis3, innerVis4];
    assignRandom(innerArray1);
    assignRandom(innerArray2);
    assignRandom(innerArray3);
    assignRandom(innerArray4);
    assignX(innerVis1);
    assignX(innerVis2);
    assignX(innerVis3);
    assignX(innerVis4);
    game.setBoard(gameBoard);
    game.setVisible(visible);
    console.log(game.visible[1][0]);
    return game;
}

function showBoard(msg, game) {
    msg.channel.send(game.board[0][0] + "   " + game.board[0][1] + "   " + game.board[0][2] + "   " + game.board[0][3] 
    + "\n" +game.board[1][0] + "   " + game.board[1][1] + "   " + game.board[1][2] + "   " + game.board[1][3] 
    + "\n" + game.board[2][0] + "   " + game.board[2][1] + "   " + game.board[2][2] + "   " + game.board[2][3] 
    + "\n" + game.board[3][0] + "   " + game.board[3][1] + "   " + game.board[3][2] + "   " + game.board[3][3] );
}

client.on('message', msg => {
    if (!msg.author.bot) {
        if (msg.content == "!flip start") {
            game = createGame();
            sendBoard(game, msg);
        } else if (options.includes(msg.content)) {
            getLocation(msg, game);
            sendBoard(game, msg);
        } else if (msg.content = "!flip see") {
            // showBoard(msg, game);
        }
    }
});

client.login('ODI0Mjc5MTM4OTYxMzI2MDkx.YFtDxQ.8IOlzWF08j--BYgx6KCXYtmJtw0');
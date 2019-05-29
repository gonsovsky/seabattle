var Board = (function () {
    function Board(_cols, _rows, _xy) {
        this.results = {};
        this.cols = _cols;
        this.rows = _rows;
        this.xy = _xy;
    }
    Board.prototype.countShips = function () {
        var i = 0;
        var j = 0;
        while (i < this.cols) {
            j = 0;
            while (j < this.rows) {
                if (this.xy[j][i] == 0) {
                    j++;
                    continue;
                }
                this.xy[j][i] = 0;
                var ship = 1;
                var q = j + 1;
                while (q < this.cols) {
                    if (this.xy[q][i] == 1) {
                        ship++;
                        this.xy[q][i] = 0;
                    }
                    else {
                        break;
                    }
                    q++;
                }
                if (ship != 1) {
                    j = q - 1;
                }
                else {
                    var p = i + 1;
                    while (p < this.rows) {
                        if (this.xy[j][p] == 1) {
                            ship++;
                            this.xy[j][p] = 0;
                        }
                        else {
                            break;
                        }
                        p++;
                    }
                }
                if (this.results[ship] == null) {
                    this.results[ship] = 0;
                }
                this.results[ship] += 1;
                j++;
            }
            i++;
        }
        ;
    };
    return Board;
}());
var UI = (function () {
    function UI(_board, _container, _results) {
        this.cellSize = 50;
        this.board = _board;
        this.container = _container;
        this.results = _results;
    }
    UI.prototype.displayBoard = function () {
        for (var i = 0; i < this.board.cols; i++) {
            for (var j = 0; j < this.board.rows; j++) {
                var cell = document.createElement("div");
                this.container.appendChild(cell);
                if (this.board.xy[j][i] == 1) {
                    cell.style.background = 'aqua';
                }
                cell.style.top = j * this.cellSize + 'px';
                cell.style.left = i * this.cellSize + 'px';
            }
        }
    };
    UI.prototype.displayResults = function () {
        for (var key in this.board.results) {
            var li = document.createElement('li');
            this.results.appendChild(li);
            li.innerHTML += key + "-палубник: " + this.board.results[key];
        }
    };
    return UI;
}());
var Game = (function () {
    function Game() {
    }
    Game.prototype.start = function () {
        var containerEl = document.getElementById("gameboard");
        var resultsEl = document.getElementById("results");
        this.board = new Board(5, 6, [
            [1, 1, 0, 1, 0],
            [0, 0, 0, 1, 0],
            [1, 0, 0, 0, 0],
            [1, 0, 1, 0, 1],
            [0, 0, 0, 0, 1],
            [0, 1, 1, 0, 0]
        ]);
        this.ui = new UI(this.board, containerEl, resultsEl);
        this.ui.displayBoard();
        this.board.countShips();
        this.ui.displayResults();
    };
    return Game;
}());
(new Game()).start();
//# sourceMappingURL=build.js.map
//Доска
class Board {
	cols: number;
	rows: number; 
    xy: Array<Array<number>>
    results: { [deсk: number] : number; } = {}

    constructor(_cols: number, _rows: number, _xy: Array<Array<number>>) {
        this.cols = _cols;
        this.rows = _rows;
        this.xy = _xy;
    }
    
    countShips(): void {
        var i=0; var j=0;
        while (i < this.cols) {
            j=0;
            while (j < this.rows) {
                if (this.xy[j][i]==0){
                    j++;
                    continue;
                }
                this.xy[j][i]=0;
                var ship = 1;    
                var q = j+1;
                while (q < this.cols) {
                    if (this.xy[q][i]==1){
                        ship++;
                        this.xy[q][i]=0;
                    }else {break}
                    q++;
                }
                if (ship!=1){
                   j=q-1;     
                } else{
                    var p = i+1;
                    while (p < this.rows) {
                        if (this.xy[j][p]==1){
                            ship++;
                            this.xy[j][p]=0;
                        }else {break}
                        p++;
                    }
                }
                if (this.results[ship]==null) {this.results[ship]=0}
                this.results[ship]+=1;  
                j++;
            }
            i++;
        };
    }
}

//HTML
class UI {
	board: Board
    container: HTMLElement  
    results: HTMLElement
	cellSize: number = 50;

    constructor(_board: Board, _container: HTMLElement, _results: HTMLElement) {
		this.board = _board;
        this.container = _container;    
        this.results = _results;
	} 
	
    displayBoard(): void {
        for (var i = 0; i < this.board.cols; i++) {
            for (var j = 0; j < this.board.rows; j++) {
                var cell = document.createElement("div");
                this.container.appendChild(cell);	
                if (this.board.xy[j][i]==1){
                    cell.style.background = 'aqua';
                }     
                cell.style.top = j * this.cellSize + 'px';
                cell.style.left = i * this.cellSize + 'px';						
            }
        }      
    }

    displayResults(): void {
        for (let key in this.board.results) {
            var li = document.createElement('li');
			this.results.appendChild(li);
			li.innerHTML += key + "-палубник: " + this.board.results[key];
        }
    }
}

//Игра
class Game {
    board: Board
    ui: UI

    start(): void {
        var containerEl=document.getElementById("gameboard");
        var resultsEl=document.getElementById("results");
        this.board = new Board(5 , 6,
            [
                [1,1,0,1,0],  
                [0,0,0,1,0], 
                [1,0,0,0,0], 
                [1,0,1,0,1], 
                [0,0,0,0,1],    
                [0,1,1,0,0]     
            ]);
        this.ui = new UI(this.board, containerEl, resultsEl);    
        this.ui.displayBoard();
        this.board.countShips();
        this.ui.displayResults();
    }
 }

(new Game()).start();
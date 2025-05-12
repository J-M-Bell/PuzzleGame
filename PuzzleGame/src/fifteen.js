//#region global variables
var empLeft = "";
var empTop = "";
var puzzlePieces = [];
var movablePuzzlePieces = [];
//#endregion

/**
 * A JS file that controls the functionality
 * of the puzzle pieces on the fifteen.html
 * file.
 * 
 * @author JM Bell
 * @version 2/3/25
 */

window.onload = function() {
    //gather all divs under puzzlearea id into array
    puzzlePieces = $$("#puzzlearea div");

    //set left and top values for each puzzle piece (if left = 400, add 100 to top and set left to 0)
    var left = 0;
    var top = 0;
    for (var i = 0; i < puzzlePieces.length; i++) {
        puzzlePieces[i].className = "puzzlepiece";
        puzzlePieces[i].onclick = moveTile; 
        puzzlePieces[i].onmouseover = tileHoveredOver;
        puzzlePieces[i].onmouseout = tileUnhoveredOver;
        puzzlePieces[i].style.left = left + "px";
        puzzlePieces[i].style.top = top + "px";
        puzzlePieces[i].style.backgroundPosition = "-" + left + "px " + "-" + top + "px";
        left = left + 100;
        if (left >= 400) {
            left = 0;
            top = top + 100;
            if (top >= 400) {
                top = 0;
            }
        }
    }
    empLeft = "300px";
    empTop = "300px";

    document.getElementById("shufflebutton").onclick = shuffleClicked;
    findMovablePieces();
}

/**
 * A function that finds and stores
 * the puzzle pieces that can be moved
 * depending on the position of the
 * empty square. 
 */
function findMovablePieces() {
    movablePuzzlePieces = [];
    var counter = 0;
    var empLeftNumber = parseInt(empLeft);
    var empTopNumber = parseInt(empTop);
    var tileTopNumber;
    var tileLeftNumber;

    // find and store movable squares
    for (var i = 0; i < puzzlePieces.length; i++) {
        tileTopNumber = parseInt(puzzlePieces[i].style.top);
        tileLeftNumber = parseInt(puzzlePieces[i].style.left);

        if ((tileTopNumber >= empTopNumber - 100) && (tileTopNumber <= empTopNumber + 100)
            && (tileLeftNumber >= empLeftNumber - 100) && (tileLeftNumber <= empLeftNumber + 100)) {
                movablePuzzlePieces.push(puzzlePieces[i]);
                counter++;
        }
        if (counter == 8) {
            break;
        }
    }
}

/**
 * A function that moves the tile
 * that has been clicked to the position
 * of the empty square if the puzzle piece can be 
 * moved or not.
 */
function moveTile() {
    if (movablePuzzlePieces.includes(this)) {
        // position of clicked tile
        var tileLeft = this.style.left;
        var tileTop = this.style.top;

        //temp variables
        var tempLeft = tileLeft;
        var tempTop = tileTop;

        //swap position
        tileLeft = empLeft;
        tileTop = empTop;
        empLeft = tempLeft;
        empTop = tempTop;
        this.style.left = tileLeft;
        this.style.top = tileTop;
    }
    findMovablePieces();
}

/**
 * A function that changes the
 * color of the border and text to red when
 * the mouse hovers of it depending on if it
 * can be moved or not.
 */
function tileHoveredOver() {
    if (movablePuzzlePieces.includes(this)) {
        //change tile color
        this.addClassName("hovered");           
    }
}

/**
 * A function that changes the
 * color of the border and text to black when
 * the mouse hovers out of it
 */
function tileUnhoveredOver() {
    //revert tile to original color 
    this.removeClassName("hovered");
}

/**
 * A function that shuffles the puzzle 
 * pieces by continuously making legal
 * tile movement to change the puzzle 
 * from its original position
 */
function shuffle() {
    //pick random element from movable pieces
    var randNum =  Math.floor(Math.random() * movablePuzzlePieces.length);
    var randPiece = movablePuzzlePieces[randNum];

    // position of clicked tile
    var tileLeft = randPiece.style.left;
    var tileTop = randPiece.style.top;

    var tempLeft = tileLeft;
    var tempTop = tileTop;

    //swap position
    tileLeft = empLeft;
    tileTop = empTop;
    empLeft = tempLeft;
    empTop = tempTop;
    randPiece.style.left = tileLeft;
    randPiece.style.top = tileTop;

    // find and store movable squares
    findMovablePieces();
}

/**
 * A function that runs the 'shuffle'
 * function numerous times to shuffle 
 * the puzzle pieces
 */
function shuffleClicked() {
    for (var i = 0; i < 5; i++) {
        shuffle();
    }
}

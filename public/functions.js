export {moveFunctions}


/**
 * Fetches the legal and valid moves of the inputed unit || 
 * 
 * @param {Boolean} isCheckKing Detirmines if we are fetching moves, or checking the safety of moves.
 * @param {*} unit The ChessUnit that will be processed
 * @param {Array} positionsArray The game object's array of positions
 * @returns An object containing the array 'freeMoves' and the array 'eliminateMoves', and the array 'chestMoves'
 */
function getValidMoves(isCheckKing, unit, positionsArray) {

    const row = unit.rowPos; const col = unit.colPos; //Recording the unit's position on the board
    //Setting the coordinates of new moves as function scoped variables
    let newRow; let newCol; //Many move functions actually redeclare these

    const digit = Math.abs(unit.digit); //Recording the unit's type. 

    const freeMoves = []; // Moves to empty squares
    const eliminateMoves = []; // Moves that capture opponent's pieces
    const chestMoves = []; // Moves that land on a chest


    let intruded = false; //Whether a unit is restricted from moving further in a certain direction

    let direction = Math.sign(unit.digit); //Returns 1 (for White Pieces) or -1 (for Black Pieces)
    let opponentSign = -direction; //Gives the inversed sign of the active player. Uses -direction for convenience.

    let isSafe = true; //Will store the presence of a check position when detirmining the king's legal moves


    /**
     * Checks if a given point is within the board boundaries.
     * @param row The row-coordinate of a move that needs checked
     * @param col The col-coordinate of a move that needs checked
     * @returns true if position exists, false otherwise
     */
    const checkPosition = (row, col) => {
        if (row >= 0 && row < 8 && col >= 0 && col < 8) {
            return true;
        } else {
            intruded = true; //ADDED
            return false;
        }
    }

    /**
     * Adds a move to the respective moves array, using checkPosition() as a nested function
     * @param {number} newRow The row-coordinate of the move
     * @param {number} newCol The col-coordinate of the move
     */
    const addMove = (newRow, newCol) => {
    
        if (checkPosition(newRow, newCol)) {//Checks if the move is in the board boundary 

            let arrayDigit = positionsArray[newRow][newCol];
            if (arrayDigit !== 0 && arrayDigit !== 7 && Math.abs(arrayDigit) !== 10) { //The new tile is occupied by a unit
                if ( Math.sign(arrayDigit) === Math.sign(unit.digit) ) { //It is a friendly unit
                    intruded = true; 
                    return;
                }
            }

            if ( simulateMove(false, unit, [newRow, newCol], positionsArray) ) { //Will return true if the move does not place the player's king in check

                if ( arrayDigit === 0 || Math.abs(arrayDigit) === 10 ) { //Moves to Empty || Friendly Mine Tiles
                    freeMoves.push([newRow, newCol]);
                    intruded = false;
                } else if ( arrayDigit === 7 ) { //Moves to a Chest Tile
                    chestMoves.push([newRow, newCol]);
                    intruded = false;
                } else if ( arrayDigit !== 0 && Math.sign(arrayDigit) !== Math.sign(unit.digit) ) { //Moves to an opponents unit
                    eliminateMoves.push([newRow, newCol]);
                    intruded = true; //The unit is obstructing further moves in this direction
                }

            }
        }
    }

    /**
     * Responding to the pawn's niche moving restrictions, this function judges whether a pawn should be able to move vertically
     * @param {Number} newRow The row-coordinate of the desired move
     * @param {Number} col The pawn's col-coordinate
     */
    let pawnMove = (newRow, col) => {
        if (checkPosition(newRow, col)) { //The move is in the board boundaries
            let arrayDigit = positionsArray[newRow][col]

            if (arrayDigit !== 0 && arrayDigit !== 7 && Math.abs(arrayDigit) !== 10) {

                //A unit is in front of the pawn
                intruded = true; 

            } else if ( simulateMove(false, unit, [newRow, col], positionsArray) ) {
                
                //The move is safe
                if (arrayDigit === 7) {
                    chestMoves.push([newRow, col])
                } else {
                    freeMoves.push([newRow, col])
                }
                intruded = false;
            }
        }
    }

    /**
     * Checks if the diagonal moves of a pawn is valid through the presence of an opponent or chest || Checks the safety of a king
     * @param {Boolean} isCheckKing A boolean detirmining if this function is called by the checkKing function or the getValidMoves function
     * @param {Number} row The row-coordinate of the pawn || The row-coordinate of the king
     * @param {Number} col The col-coordinate of the pawn || The col-coordinate of the king
     */
    const diagonalPawn = (isCheckKing, row, col) => {

        isSafe = true; //Used to track the safety of the move when called by checkKing()
        let enemyKing = 6 * opponentSign
        let enemyPawn = 1 * opponentSign

        /**
         * Checks if a diagonal move is legal, and pushes it into the respective array if so
         * @param {Number} newRow The row-position of the move
         * @param {Number} newCol The col-position of the move
         */
        let pusher = (newRow, newCol) => {

            if (checkPosition(newRow, newCol)) {

                let arrayDigit = positionsArray[newRow][newCol];

                if (isCheckKing) { //This function is checking the safety of a king

                    if (arrayDigit === enemyKing || arrayDigit === enemyPawn) {
                        isSafe = false;
                    }


                } else {

                    if ( simulateMove(false, unit, [newRow, newCol], positionsArray) ) {
                        //The move is safe

                        if (arrayDigit === 7) { //Moves to a Chest Tile
                            //The move is legal
                            chestMoves.push([newRow, newCol]);
                        } else if ( arrayDigit !== 0 && Math.sign(arrayDigit) !== Math.sign(unit.digit)) { //Moves to an Opponent's Tile
                            //The move is legal
                            eliminateMoves.push([newRow, newCol]);
                        }
                    }
                }
            }
        }

        let newRow = row + direction; //Shifts the row-coord one tile in the valid direction
        pusher(newRow, col + 1);
        pusher(newRow, col - 1);

        if (isCheckKing) return isSafe; //Returns the safeness of the move for checkKing to act accordingly

    }

    /**
     * Adds the valid moves unique to a Knight unit to the repective moves array || Checks the safety of a king
     * @param {Boolean} isCheckKing A boolean detirmining if this function is called by the checkKing function or the getValidMoves function
     * @param {Number} row The knight's row-coordinate || The row-coordinate of the king
     * @param {Number} col The knight's col-coordinate || The col-coordinate of the king
     */
    let knightMoves = (isCheckKing, row, col) => {

        isSafe = true; //Used to track the safety of the move when called by checkKing()
        let enemyKnight = 3 * opponentSign;

        let moves = [
        [2, 1],   // (row+2, col+1)
        [-2, 1],  // (row-2, col+1)
        [2, -1],  // (row+2, col-1)
        [-2, -1], // (row-2, col-1)
        [1, 2],   // (row+1, col+2)
        [-1, 2],  // (row-1, col+2)
        [1, -2],  // (row+1, col-2)
        [-1, -2]  // (row-1, col-2)
        ]

        moves.forEach( move => {
            let newRow = row + move[0];
            let newCol = col + move[1];

            if ( checkPosition(newRow, newCol) ) {
                let arrayDigit = positionsArray[newRow][newCol];
                if (isCheckKing) {

                    if ( arrayDigit === enemyKnight ) {
                        isSafe = false;
                    }

                } else {

                    addMove(newRow, newCol)

                }
            }

        });

        if (isCheckKing) return isSafe;

    }

    /**
     * Loops through valid moves adding them to a moves array || checking their safety from the king's position
     * @param {Boolean} isCheckKing A boolean detirmining if this function is called by the checkKing function or the getValidMoves function 
     * @param {Number} searchingFor The unit number checkKing() is searching for
     * @param {Number} row The unit's row-position || The king's row-position
     * @param {Number} col The unit's col-position || The king's col-position
     * @param {Number} rowFactor The increment to increase row by in each iteration
     * @param {Number} colFactor The increment to increase col by in each iteration
     */
    let loop = (isCheckKing, searchingFor, row , col, rowFactor, colFactor) => {
        intruded = false;
        let newRow = row
        let newCol = col
        while (!intruded) {
            newRow += rowFactor;
            newCol += colFactor;


            if (isCheckKing) {

                if( checkPosition(newRow, newCol) ) {

                    let arrayDigit = positionsArray[newRow][newCol];

                    if (arrayDigit === searchingFor || arrayDigit === 5 * opponentSign ) { 
                        // The first encountered unit can eliminate the king 
                        // 5 * opponentSign   =>   opponent's Queen
                        isSafe = false;

                        intruded = true;
                        return;

                    } else if ( arrayDigit !== 0 && arrayDigit !== 7 && Math.abs(arrayDigit) !== 10 ) { 
                        // We've found a harmless unit that acts as a shield
                        isSafe = true;
                        intruded = true;
                        return;
                    }
                } else {
                    //Intruded has been made true by checkPosition()
                    return;
                }

            } else {
                addMove(newRow, newCol);
            }
            
        }
    }

    /** Declares the four loop() functions that create the diaginal moves of a bishop unit
     * @param {Boolean} isCheckKing A boolean detirmining if this function is called by the checkKing function or the getValidMoves function
     * @param {Number} row The unit's row-coordinate || The king's row-coordinate
     * @param {Number} col The unit's col-coordinate || The king's col-coordinate
     */
    let bishopMoves = (isCheckKing, row, col) => {

        isSafe = true;
        let enemyBishop = 4 * opponentSign;
 
        loop(isCheckKing, enemyBishop, row, col, 1, 1);
        if(!isSafe && isCheckKing) return isSafe;
        loop(isCheckKing, enemyBishop, row, col, 1, -1);
        if(!isSafe && isCheckKing) return isSafe;
        loop(isCheckKing, enemyBishop, row, col, -1, -1);
        if(!isSafe && isCheckKing) return isSafe;
        loop(isCheckKing, enemyBishop, row, col, -1, 1);

        if (isCheckKing) return isSafe;

    }

    /** Declares the four loop() functions that create the linear moves of a rook unit
     * @param {Boolean} isCheckKing A boolean detirmining if this function is called by the checkKing function or the getValidMoves function
     * @param {Number} row The unit's row-coordinate || The king's row-coordinate
     * @param {Number} col The unit's col-coordinate || The king's col-coordinate
     */
    let rookMoves = (isCheckKing, row, col) => {
        isSafe = true;
        let enemyRook = 2 * opponentSign;

        loop(isCheckKing, enemyRook, row, col, 1, 0);
        if(!isSafe && isCheckKing) return isSafe;
        loop(isCheckKing, enemyRook, row, col, -1, 0);
        if(!isSafe && isCheckKing) return isSafe;
        loop(isCheckKing, enemyRook, row, col, 0, 1);
        if(!isSafe && isCheckKing) return isSafe;
        loop(isCheckKing, enemyRook, row, col, 0, -1);

        if (isCheckKing) return isSafe;

    }

    /**
     * Generates the legal moves of the king unit || Checks the safety of a king from the another king unit
     * @param {Boolean} isCheckKing A boolean detirmining if this function is called by the checkKing function or the getValidMoves function
     * @param {Number} row The row-coordinate of the king
     * @param {Number} col The col-coordinate of the king
     */
    let kingMoves = (isCheckKing, row, col) => {

        /**
         * Loops through the tiles between the king and the board's horizontal edges. 
         * Adding the castling move to freeMoves[] if the castle is located on the edge,
         * and there are no units between the castle and the king, and the final board state is safe.
         * @param {Number} row The king's row-coordinate
         * @param {Number} col The king's col-coordinate
         * @param {Number} direction The direction of movement
         */
        let castlingLoop = (row, col, direction) => {       
            let newCol = col + direction; //Skips the kings own position
            intruded = false //Will keep track of if the gap between the king and the rook's initial position is clear
            for (newCol; newCol < 7 && newCol > 0; newCol += direction) {
                
                let arrayDigit = positionsArray[row][newCol]
                if (arrayDigit === 0 || arrayDigit === 7 || Math.abs(arrayDigit) === 10) {
                    //The path is not intruded
                } else {
                    //A unit occupies a tile that is in between the rook and the king
                    intruded = true;
                }
            }
            if (!intruded && positionsArray[row][newCol] === (2 * Math.sign(unit.digit)) ) {
                //If the path was not intruded and the rook is present, simulate the move before applying it.
                let move = [row, col + (2 * direction)] 
                if (simulateMove(false, unit, move, positionsArray)) {
                    freeMoves.push(move)
                }
            }
        }

        isSafe = true;
        let enemyKing = 6 * opponentSign;

        for (let i = -1; i <= 1; ++i) { 
            for (let j = -1; j <= 1; ++j) {

                if (i === 0 && j === 0) continue;

                let newRow = row + i;
                let newCol = col + j;   

                if(isCheckKing) {
                    if ( checkPosition(newRow, newCol) ) {
                        let arrayDigit = positionsArray[newRow][newCol];
                        if (arrayDigit === enemyKing) {
                            isSafe = false;
                        }
                    }
                } else {
                    addMove(newRow, newCol)
                }
            }
        
        }

        let tryCastling = false

        if (!isCheckKing) {
        //Checking if the king is in it's home tile
            if (Math.sign(unit.digit) === 1) {
                if (row === 0 && col === 4) {
                    tryCastling = true;
                }
            } else {
                if (row === 7 && col === 4) {
                    tryCastling = true;
                }
            }

            //If the king is occupying it's home tile, and is not in check, we'll attempt to find castling opportunities
            if (checkKing(unit, positionsArray) && tryCastling) {
                castlingLoop(row, col, -1) 
                castlingLoop(row, col, 1) 
            }
        }

        if (isCheckKing) return isSafe;

    }

    if (!isCheckKing) {
        switch (digit) {

            case 1: //Pawn
                
                newRow = row + direction;

                diagonalPawn(false, row, col );
                
                pawnMove(newRow, col)


                if ( (row === unit.initialRowPos) && ( !intruded ) ) { //If the pawn is in its initial position and has a movable square in front
                    //The Pawn has the ability to move 2 spaces forward on its inital move
                    newRow += direction
                    pawnMove(newRow, col)
                }

                break;
            case 2: //Rook
                
                rookMoves(false, row, col);

                break;
            case 3: //Knight 

                knightMoves(false, row, col)

                break;
            case 4: //Bishop
                bishopMoves(false, row, col);
                break;
            case 5: //Queen

                rookMoves(false, row, col);
                bishopMoves(false, row, col);

                break;
            case 6: //King
                    kingMoves(false, row, col);
                break;
        }

        return { freeMoves, eliminateMoves, chestMoves };
    } else { //Seeking king's safety
        if ( diagonalPawn(isCheckKing, row, col) ) {

            if ( knightMoves(isCheckKing, row, col) ) {

                if ( bishopMoves(isCheckKing, row, col) ) {

                    if ( rookMoves(isCheckKing, row, col) ) {

                        if ( kingMoves(isCheckKing, row, col) ) {

                            return true;
                        } 
                    } 
                } 
            } 
        }
        
        return false;
    }
}



/**
 * Simulates a given move on a unit in a replica array of the chess board. 
 * 
 * If the caller is after the safety of a move, it returns true or false depending on if the move places the player in check.
 * 
 * If the player is after the board state after the move, it returns that board state as an array.
 * 
 * @param {Boolean} isGettingBoardState Whether the caller is after the resulting board state of just the move safety
 * @param {Unit} unit The unit subject to movement
 * @param {Array} move The coordinates of the desired move - [x, y]
 * @param {Array} positionsArray The unadulterated and current positions array of the game
 * 
 * @returns Conditional results. See function Summary
 */
function simulateMove(isGettingBoardState, unit, move, positionsArray) {

    let replicaBoard;
    let kingPosition;

    //REPLICATING THE PROVIDED ARRAY//
    if ( !isGettingBoardState && Math.abs(unit.digit) !== 6 ) {
        //The caller is after the move safety, and the king's position is unknown.

        replicaBoard = Array.from({ length: 8 }, () => Array(8).fill(null)); //Instantiating an empty 8x8 Array

        for (let row = 7; row >= 0; --row) {
            for (let col = 0; col < 8; ++col) {
                //Creating the replica array inefficiently, but in a way that identifies the king's position

                let sign = Math.sign(unit.digit)
                if ( positionsArray[row][col] === 6 * sign || positionsArray[row][col] === (6 * sign) + (10 * sign)) { //Checking if the position belongs to the unit's king
                    kingPosition = [row, col] //Recording the king's position
                }

                replicaBoard[row][col] = positionsArray[row][col]
            }
        }

    } else { //The kings position is either known, or arbitrary

        //Creating the replica without searching for the king's position with each iteration.
        replicaBoard = structuredClone(positionsArray);

    }



    //SIMULATING THE MOVE WITHIN THE REPLICATED POSITIONS ARRAY//
    /*    
    
    !!!         It should be noted that this function neglects opponent mines in it's simulation of a move.
    !!!         It should be also noted that moves that occupy friendly units have already been filtered out before reaching this function.

    */

    let row = move[0]; let col = move[1];
    let digit = replicaBoard[row][col];
    let oldRow = unit.rowPos; let oldCol = unit.colPos;

    if (Math.abs(unit.digit) === 6 && Math.abs(col - oldCol) === 2) {
        //This is the very special case wereupon the king may castle
        //Unlike regular chess, the king can castle even if either 
        //king or rook has moved before as long as they have returned to their initial tiles
        
        let direction = col > oldCol ? 1 : -1; //Finding what direction to search for an adjacent rook
        let rookC = direction === -1 ? 0 : 7; //Depending on the direction, we search for the rook
        let rookNewC = direction === -1 ? 3 : 5; //Depending on direction, we also detirmine where the rook should move
        replicaBoard[row][col] += unit.digit; // We then move the king
        replicaBoard[oldRow][oldCol] -= unit.digit; // Subtract the king’s original position
        let rookDigit = 2 * Math.sign(unit.digit) //Declare the rook's digit
        replicaBoard[row][rookNewC] += rookDigit; // We then move the Rook to the new tile
        replicaBoard[row][rookC] -= rookDigit; // Subtract the rook’s original position


        //I am yet to add a promotion or cloning simulation for the AI as well
    
    } else if (digit === 7 || digit === 0 || Math.abs(digit) === 10 ) { //Moving the unit to Chest || Empty || Friendly Mine Tiles
        replicaBoard[row][col] += unit.digit;
    } else { //Attacking an enemy unit
        replicaBoard[row][col] = unit.digit
    }
    //Eitherway, the old tile has the unit subtracted
    replicaBoard[oldRow][oldCol] -= unit.digit



    //RETURNING CONDITIONAL RESULTS//
    if(!isGettingBoardState) {

        //The caller wants the move safety

        if ( Math.abs(unit.digit) === 6 ) {

            //The unit was the king
            kingPosition = move //The king is now positioned on the tile of the move.
        }

        //Creating a mock-object that resembles the king's as:
        // 1. We will not always have the king object
        // 2. When we do, we do not want to overwrite it's xPos and yPos
        let king = {
            digit : 6 * Math.sign(unit.digit),
            rowPos : kingPosition[0],
            colPos : kingPosition[1]
        }

        return checkKing(king, replicaBoard);

    } else {

        //The caller wants the resultant board state 
        return replicaBoard;

    }


}



/**
 * Checks if a king is in a safe position that is not directly accessible by an opponent's unit.
 * @param {*} king A makeshift replica of the King object with properties for digit, rowPos, and colPos or the real King object
 * @param {Array} relativepositionsArray The positions array in which the king occupies the coordinates above
 * @returns {Boolean} true (safe position) || false (unsafe/checked position)
 */
function checkKing(king, relativepositionsArray) {
    return getValidMoves(true, king, relativepositionsArray)
}



const moveFunctions = {getValidMoves, simulateMove, checkKing};
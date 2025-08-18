import { Player } from './Player.js';
import { Unit } from './Unit.js';
import { Chest } from './Chest.js';
import { Mine } from './Mine.js';
import { moveFunctions as moveFuncts } from '../functions.js';

export class Game {
    /**
     * A Game object is used to hold all the information of a game. 
     * - The board and all the unit positions
     * - The {Player} objects that represent White and Black
     * - The turn object that records the actions within a turn
     * - The {Chest} object that controls chest behaviour
     * - The game state, and whether the game has ended
     * 
     * The constructor also instantiates the game upon construction.
     * 
     * @param {boolean} isPnP 'true' if the game is Pass and Play, 'false' if the game is vs AI
     */
    constructor (isPnP) {


        //This represents the chess board
        //Pieces are hardcoded into their initial positions
        this.positionsArray = [
        [2, 3, 4, 5, 6, 4, 3, 2],
        [1, 1, 1, 1, 1, 1, 1, 1],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [-1, -1, -1, -1, -1, -1, -1, -1],
        [-2, -3, -4, -5, -6, -4, -3, -2]
        ];

        //This is a temporary property I will use to collect the board states from people playing ChessT Passn'Play
        this.boardStates = {};
        this.counts = 0;
        // Capture initial board state
        this.boardStates[0] = structuredClone(this.positionsArray);  // Starting board State
        this.counts = 1;  // Ready for first move

        
        //These are the two players
        this.whitePlayer = new Player(1)
        this.blackPlayer = new Player(-1)


        //Recording if this game is a two player (PnP), or one player (vAI) game
        //I will likely use a player.style property instead to allow AI vs AI games
        if (isPnP) {
            this.style = 'PnP'
        } else {
            this.style = 'vAI'
        }

        
        //This is the object that stores all the important information regarding a players active turn
        this.turn = {

            activePlayer : this.whitePlayer, //The player whom's turn it currently is
            isChecked : false, //Whether the player is in a checked position
            checkedTile : null, //The tile that the king is occupying when checked
            hasMoved : false, //Whether the player has already moved a unit or not


            isMovingUnit : false, //Recording if the player is in the action of moving a unit
            selectedUnit : null, // The unit that the player has clicked and who's moves are displayed
            displayedMoves : {}, // All the possible moves of the selected unit

            isPlacingMine : false, //Recording if the player is in the action of placing a mine
            selectedMine : null, //The mine the player has selected to place
            legalMinePositions : [], //Used to store the player's legal mine postions during the setting of a mine 

            isCloningUnit : false, //Recording if the player is in the action of placing a clone
            selectedClone : null, //The lost unit that the player would like to clone
            legalClonePositions : [], //Used to store the legal cloning positions during a cloning operation

            isPromotingPawn : false, //Recording if the player is in the action of promoting a pawn

        };


        //This is the game's single chest object
        this.chest = new Chest();

        //Recording if the game has reached an outcome
        this.isOver = false;

        //Instantiating the game in construction
        this.instantiateGame();
        
    }



    /**
     * 1. Takes the positionsArray and creates a DOM element that represents the board
     * 2. Loops through each number on the positions array, 
     * creating and assigning appropriate units to the appropriate player
     * 3. Applies event listeners to the tiles that are occupied by a unit to allow player control
     */
    instantiateGame() {

        const board = document.getElementById('board');
        let turn = this.turn;
        let positionsArray = this.positionsArray;

        for (let row = 7; row >= 0; --row) {  
        //Creates the 8 rows of a chess baord
            for (let col = 0; col < 8; ++col) {
            //Creates the 8 colomns of a chess board
    
                //Creating an appropriate tile for each digit in the positions array
                let tile = document.createElement('div');
                tile.className = 'tiles';

                //Adding the tile's coordinates into it's id string 
                tile.id = `tile(${row}${col})`; 

                //Apply an empty sprite to each tile
                const img = document.createElement('img');
                img.src = '../images/0.png';
    
                
                const digit = positionsArray[row][col];
                if (digit != 0) { //Chess piece identified as occupying this tile
    
                    // Creating a Unit with the digit and initial position
                    const unit = new Unit(digit, row, col);
                    // Applying an appropriate sprite according to the units digit 
                    img.src = unit.sprite;
    
                    // Checking the digit's sign to assign the unit to the white or black player
                    if (digit > 0) {
                        this.whitePlayer.livingUnits.push(unit);
                        if ( Math.abs(digit) !== 6 ) {
                            //Pushing all units but the king into the units a pawn can be promoted to
                            this.whitePlayer.promotableUnits.push(unit);
                        }
                    } else {
                        this.blackPlayer.livingUnits.push(unit);
                        if ( Math.abs(digit) !== 6 ) {
                            //Pushing all units but the king into the units a pawn can be promoted to
                            this.blackPlayer.promotableUnits.push(unit);
                        }
                    }

                }


                //Applying an appropriate hover effect to the tiles
                tile.addEventListener('mouseenter', () => {

                   if (!turn.hasMoved && !turn.isCloningUnit && !turn.isPromotingPawn) { //If the player can interact with units

                        let [row, col] = this.fetchTileCoordinates(tile)
                        const digit = positionsArray[row][col]; //Fetches the digit that occupies that tile
                        if (this.isAFriendlyUnit(digit)) {
                            
                            this.hover(true, row, col)
                        }

                   }

                })

    
                //Removing any applied hover effects when the mouse has left
                tile.addEventListener('mouseleave', () => {

                    const [row, col] = this.fetchTileCoordinates(tile)
                    const digit = positionsArray[row][col]; //Fetches the digit that occupies that tile

                    if ( this.isAFriendlyUnit(digit) ) {
                        this.hover(false, row, col)
                    }

                    //Need to make sure the selected unit hover stays active

                });
                    

                //Applying appropriate click events to the tiles
                tile.addEventListener('click', () => {
                    let [row, col] = this.fetchTileCoordinates(tile)
                    let digit = positionsArray[row][col]; //Fetches the digit that occupies the tile on the board
                
                    if (!turn.hasMoved && !turn.isMovingUnit && 
                        !turn.isPlacingMine && !turn.isCloningUnit && 
                        !turn.isPromotingPawn) 
                    { //If the user is allowed to move a piece

                        if ( this.isAFriendlyUnit(digit) ) {
                            turn.selectedUnit = null; //Safe-checking that there is no unit pre-selected

                            //We need now identify the unit of subject
                            turn.selectedUnit = this.searchForUnit(row, col, turn.activePlayer.livingUnits);

                            this.initiateMoveState(); //Placeing the player into a 'moving unit' state

                        }

                    } else if (turn.isMovingUnit) { //The player has already selected a unit to move

                        if ( this.searchMoves(row, col) ) { //Searching if the clicked tile belongs to the displayed set of moves

                            this.makeMove(row, col); //If so, the player may make the move

                        } else if (row === turn.selectedUnit.rowPos && col === turn.selectedUnit.colPos) {
                            //The player has clicked the already selected unit
                            this.cancelMove();
                            
                        } else if ( this.isAFriendlyUnit(digit) ) {
                            //The player has clicked another friendly unit
                            this.cancelMove();

                            //Selecting that unit and re-entering the move state
                            turn.selectedUnit = this.searchForUnit(row, col, turn.activePlayer.livingUnits);
                            this.initiateMoveState();

                        } else {
                            this.cancelMove()
                        }

                    } else if (turn.isPlacingMine) { //The player is placing a mine
                        
                        if (this.searchArray([row, col], turn.legalMinePositions)) { //It is a valid position
                            this.setMine(turn.selectedMine, row, col) //The player may set the mine

                        } else { //player has selected an invalid position
                            turn.isPlacingMine = false; //Canceling the operation
                        }
                        this.settingMineDisplay() //Removing the displayed positions
                        this.displayStats() //Updating the players information window

                    } else if (turn.isCloningUnit) { //The player is cloning a dead unit

                        if (this.searchArray([row, col], turn.legalClonePositions)) {
                            //The player has selected a valid position

                            turn.isCloningUnit = false; //Reseting the player's state
                            
                            if (this.isOnEnemyMine(row, col)) {
                                //The clone has been placed on a mine.

                                positionsArray[row][col] = 0;
                                digit = 0;
                                this.explosion(row, col)

                            } else {

                                /* !!!CLONING MECHANISM !!!   ...If you are reading this, I was lazy and didn't make it a function */
                                /* !!!CLONING MECHANISM !!!   ...but motivated enough to put two lines of comment for visibility */
                                turn.activePlayer.reviveUnit(turn.selectedClone) //Clone the selected unit
                                turn.selectedClone.rowPos = row; turn.selectedClone.colPos = col; //Update it's position values
                                positionsArray[row][col] += turn.selectedClone.digit //Add it's digit to the tiles position
                                digit = positionsArray[row][col] //update the digit reading
                                img.src = `../images/${turn.selectedClone.digit}.png`
                                if (Math.abs(digit) > 10) {
                                    tile.style.borderColor = 'red';
                                }

                                this.getPlayersMoves() //Refetching the player's moves as some may now be obstructed
                                turn.isChecked = false; //Resetting this otherwise the next line removes the display by default
                                this.displayCheckedKing() //Rechecking if the player is checked as it may remove them from being so

                            }

                            this.displayClonePositions(false) //Hiding the displayed
                            turn.selectedClone = null //Resetting the selection 
                            turn.legalClonePositions = []; 
                            this.displayStats(); //Updating the player's information window
                        } //There is no else, the player must clone a unit when prompted

                    }
                })


                tile.appendChild(img); //Adding the sprite to the tile
                board.appendChild(tile); //Adding the tile to the board display
     
            }
        }

        this.getPlayersMoves() //Getting the white players moves
        this.displayStats() //Displaying the white players information

        //Instantiating the button used to let players end their turn
        let endTurnBttn = document.getElementsByClassName('button'); 
        //Take note that it is not the only button in this class
        //But we cannot use the id, as that will be changing to alter the display
        endTurnBttn[3].addEventListener('click', () => {
            this.endTurn();
        })

    }



    /**
     * Fetches a tile's coordinates.
     * @param {String} tile The tile of subject
     * @returns The tile's coordinates --- [row, col]
     */
    fetchTileCoordinates(tile) {
        let col = parseInt(tile.id[6]); //Fetches the row-coordinate from the ID
        let row = parseInt(tile.id[5]); //Fetches the col-coordinate from the ID
        return [row, col];
    }



    /**
     * Checks if a digit is that of a chess unit.
     * @param {Number} digit The digit that occupies a tile's position on the board
     * @returns 
     */
    isAUnit(digit) {

        if ( digit !== 0 && digit !== 7 && Math.abs(digit) !== 10 ) {
            //The digit is not that of an (Empty Tile || Chest || Mine)
            //Therefore, it is a unit
            return true;
        }

        //The digit is not that of a unit
        return false;

    }



    /**
     * Checks if a digit is that of a friendly chess unit
     * @param {Number} digit The digit that occupies a tile's position on the board
     * @returns 
     */
    isAFriendlyUnit(digit) {

        if ( this.isAUnit(digit) ) {
            if ( Math.sign(digit) === this.turn.activePlayer.sign ) {
                //The unit belongs to the current player
                return true;
            }
        }

        //The digit is not that of a friendly unit
        return false;

    }



    /**
     * Applies or removes the hover effect to a specific unit's sprite on the board
     * @param {boolean} makeHover true => apply hover || false => remove hover
     * @param {Number} row The row-coordinate of the tile
     * @param {Number} col The col-coordinate of the tile
     */
    hover(makeHover, row, col) {
        let digit = this.positionsArray[row][col];

        if (Math.abs(digit) > 10) { //If the tile hosts a unit atop a mine
            digit -= 10 * Math.sign(digit)
        }

        let t = document.getElementById(`tile(${row}${col})`);
        let img = t.firstChild;
        if (makeHover) {
            img.src = `../images/${digit}-hover.png`;
        } else {
            img.src = `../images/${digit}.png`;
        }
        
    }



    /**
     * Searches the provided list to find a unit that occupies the specified coordinate.
     * @param {Number} row The desired unit's row-coordinate 
     * @param {Number} col The desired unit's col-coordinate 
     * @param {Array} listOfUnits The list of units to search within
     * @returns The desired unit
     */
    searchForUnit(row, col, listOfUnits ) {
    
        let theUnit = null;
        listOfUnits.forEach(unit => {
            if (unit.rowPos === row && unit.colPos === col)
                theUnit = unit;
                return;
        })

        if (theUnit === null) {
            let message = "The unit was not present in the provided list. Double check you have passed the correct parameters."
            console.log(message)
        }
        return theUnit;
    }



    /**
     * Places the player into the state of moving a piece and displays the legal moves of the selected unit.
     */
    initiateMoveState() {
        this.turn.displayedMoves = this.turn.selectedUnit.moves; //Reading the selected unit's legal moves
        this.displayMoves(); //Displaying these legal moves to the player
        this.turn.isMovingUnit = true; //Recording that the user is moving a unit
    }



    /**
     * Loops through each living unit, fetching it's valid moves and storing them in unit.moves
     */
    getPlayersMoves() {

        let turn = this.turn; //Creating a shorthand
        turn.activePlayer.allMoves = [] //Clearing the last set of moves

        function pushToAll(array) {
            if (array.length > 0) {
                turn.activePlayer.allMoves.push(array)
            }
        }

        turn.activePlayer.livingUnits.forEach(unit => {
            unit.moves = moveFuncts.getValidMoves(false, unit, this.positionsArray)
            
            pushToAll(unit.moves.freeMoves)
            pushToAll(unit.moves.eliminateMoves)
            pushToAll(unit.moves.chestMoves)
            
        })
    }



    /**
     * Removes the player from the 'moving unit' state
     */
    cancelMove() {

        this.turn.selectedUnit = null; //Clearing the selected unit
        this.hideMoves(); //Hiding the displayed moves
        this.turn.displayedMoves = []; //Clearing the moves list
        this.turn.isMovingUnit = false; //Resetting the players state

    }



    /**
     * Searches if a given move is within turn.displayedMoves (the legal moves of turn.selectedUnit)
     * @param {Nunber} row //The specific x-coordinate you are searching for
     * @param {Number} cos //The specific y-coordinate you are searching for
     * @returns true(present)/false(not present)
     */
    searchMoves(row, col) {
        let isPresent = false;
        let moves = this.turn.displayedMoves;
        Object.keys(moves).forEach(moveSet => {
            if ( this.searchArray([row, col], moves[moveSet]) ) {
                isPresent = true;
                return;
            }
        });
        if (isPresent) return true;
        return false;
    }



    /**
     * Filters through the moves stored in turn.displayedMoves ( the legal moves of turn.selectedUnit ) 
     * and displays them on the board in appropriate style.
     */
    displayMoves() {

        let moves = this.turn.displayedMoves;

        let freeMoves = moves.freeMoves;
        freeMoves.forEach(move => {
            let t = document.getElementById(`tile(${move[0]}${move[1]})`);
            t.style.background = 'rgba(15, 217, 222, 0.3)';
            t.style.borderColor = 'blue';
        })

        let eliminateMoves = moves.eliminateMoves;
        eliminateMoves.forEach(move => { //eliminateMoves
            let t = document.getElementById(`tile(${move[0]}${move[1]})`);
            t.style.background = 'rgba(255, 60, 60, 0.3)';
            t.style.borderColor = 'red';
        })

        let chestMoves = moves.chestMoves;
        chestMoves.forEach(move => { //chestMoves
            let t = document.getElementById(`tile(${move[0]}${move[1]})`);
            t.style.background = 'rgba(240, 255, 0, 0.3)';
            t.style.borderColor = 'yellow';
        })

    }



    /**
     * Filters through turn.displayedMoves ( highlighted on the board by this.displayMoves() ), 
     * and removes their displayedness from the board.
     * 
     */
    hideMoves() {
        let moves = this.turn.displayedMoves;

        let freeMoves = moves.freeMoves;
        freeMoves.forEach(move => {
            let t = document.getElementById(`tile(${move[0]}${move[1]})`);
            t.style.background = '';
            t.style.borderColor = '#B3710E';
        })


        let eliminateMoves = moves.eliminateMoves;
        eliminateMoves.forEach(move => {
            let t = document.getElementById(`tile(${move[0]}${move[1]})`);
            t.style.background = '';
            t.style.borderColor = '#B3710E';
        })

        let chestMoves = moves.chestMoves;
        chestMoves.forEach(move => {
            let t = document.getElementById(`tile(${move[0]}${move[1]})`);
            t.style.background = '';
            t.style.borderColor = '#B3710E';
        })
    }



    /**
     * Trawls through an array of positions, looking for a specific coordinate.
     * @param {Array} specificCoords [row, col] -- The coords you are looking for.
     * @param {Array} array [ [int, int], [int, int], [int, int] ] -- The array you are searching in.
     * @returns {Boolean} true => [row, col] was found || false => [row, col] was not found
     */
    searchArray(specificCoords, array) {
        let isPresent = false;
        let row = specificCoords[0]
        let col = specificCoords[1]

        array.forEach(set => {
            if (row === set[0] && col === set[1]) {
                isPresent = true;
                return;
            }
        })

        if (isPresent) return true;
        return false;
    }



    /**
     * @returns The active player's opponent player object
     */
    getOpponent() {
        if (this.turn.activePlayer === this.whitePlayer) {
            return this.blackPlayer
        } else {
            return this.whitePlayer
        }
    }



    /**
     * Checks if a specified coordinate is occupied by an enemy mine.
     * @param {Number} row 
     * @param {Number} col 
     * @returns true/false
     */
    isOnEnemyMine(row, col) {
        const opponent = this.getOpponent();
        let isOnMine = false;

        opponent.setMines.forEach(mine => {
            if (mine.rowPos === row && mine.colPos === col) {
                isOnMine = true;
                return; //Breaks the forEach loop
            }
        })

        return isOnMine
    }



    /**
     * Gives the active player the contents of a chest
     */
    async collectChest() {
        let unit = this.turn.selectedUnit
        let chest = this.chest
        let positionsArray = this.positionsArray
        let player = this.turn.activePlayer

        switch (chest.contains) {
            case 'Mine': 
                let mine = new Mine(player.sign);
                player.storedMines.push(mine);
                break;
            case 'Clone': 
                player.clones += 1;
                this.attemptCloning()
                
                break;
            case 'Mimic': 
                this.mimicGif(chest.rowPos, chest.colPos)

                positionsArray[unit.rowPos][unit.colPos] -= unit.digit; //Subtracting the unit from its tile
                player.eliminateUnit(chest.rowPos, chest.colPos); // Remove from player's living units

                let digit = positionsArray[unit.rowPos][unit.colPos];
                let tile = document.getElementById(`tile(${unit.rowPos}${unit.colPos})`)
                tile.firstChild.src = `../images/${digit}.png`
                
                break;
        }
        chest.resetChest(this.positionsArray)
        this.displayStats()
    }



    /**
     * Excecutes a valid move.
     * @param {*} row The move's row-coordinate
     * @param {*} col The move's col-coordinate
     */
    makeMove(row, col) {

        this.hideMoves(); //Removes the display of possible moves

        //Turns the 'End Turn' button green
        //Signaling to the player that they may end their turn now 
        let endTurnBttn = document.getElementsByClassName('button')
        endTurnBttn[3].id = 'endTurnActive'

        let positionsArray = this.positionsArray;
        let turn = this.turn;
        let unit = turn.selectedUnit;
        let player = turn.activePlayer;
        let opponent = this.getOpponent();

        let oldR = unit.rowPos;
        let oldC = unit.colPos;

        let digit = positionsArray[row][col]; //Digit of tile moving to
        let oldDigit = positionsArray[oldR][oldC]

        let newTile = document.getElementById(`tile(${row}${col})`)
        let oldTile = document.getElementById(`tile(${oldR}${oldC})`)



        turn.hasMoved = true; //Restricting the player from moving another piece
        turn.isMovingUnit = false; //Reactivates hover abilities and other event listeners for other actions 

        if (this.isOnEnemyMine(row, col)) { //The player has activated an opponent's mine

            player.eliminateUnit(oldR, oldC) //Eliminating the player's unit before "moving" it
            opponent.eliminateUnit(row, col) //IF (only if) the opponent also has a unit on the move's tile, bon voyage to it

            let mine = this.searchForUnit(row, col, opponent.setMines) //Using the function to find the mine instead

            let index = opponent.setMines.indexOf(mine)
            opponent.setMines.splice(index, 1) //Removes the mine from the opponent's list of set mines

            positionsArray[row][col] = 0
            positionsArray[oldR][oldC] -= unit.digit
            oldDigit -= unit.digit
            oldTile.firstChild.src = `../images/${Math.abs(oldDigit)}.png`
            this.displayCheckedKing()
            this.displayStats() //Updating the player's information window
            this.explosion(row, col) //triggering the explosion animation
            this.attemptCloning() //If the user has a clone available, it will use it
            return;
        }

        if (Math.abs(unit.digit) === 6 && Math.abs(col - oldC) === 2) {
            //This is the very special case wereupon the king may castle
            //Unlike regular chess, the king can castle even if either 
            //king or rook has moved before as long as they have returned to their initial tiles
            
            let direction = col > oldC ? 1 : -1; //Finding what direction to search for an adjacent rook
            let rookC = direction === -1 ? 0 : 7; //Depending on the direction, we search for the rook
            let rookNewC = direction === -1 ? 3 : 5; //Depending on direction, we also detirmine where the rook should move

            //Using the info we collected on the rook, we identify its object
            let rook;
            player.livingUnits.forEach(unit => {
                if (unit.rowPos === row && unit.colPos === rookC) {
                    rook = unit;
                }
            })

            positionsArray[row][col] += unit.digit; // We then move the king
            newTile.firstChild.src = unit.sprite;
            unit.setPos([row, col]);

            positionsArray[oldR][oldC] -= unit.digit; // Subtract from the king’s original position
            oldDigit -= unit.digit;
            oldTile.firstChild.src = `../images/${Math.abs(oldDigit)}.png`

            

            positionsArray[row][rookNewC] += rook.digit; // We then move the Rook to the new tile
            newTile = document.getElementById(`tile-(${row}${rookNewC})`) 
            newTile.firstChild.src = rook.sprite
            rook.rowPos = row; rook.colPos = rookNewC;



            positionsArray[row][rookC] -= rook.digit; // Subtract from the rook’s original position
            oldDigit = positionsArray[row][rookC]
            oldTile = document.getElementById(`tile-(${row}${rookC})`)
            oldTile.firstChild.src = `../images/${Math.abs(oldDigit)}.png`
       

            return;
        }

        if (digit === 7) {
        
            this.collectChest();
            if (this.chest.contains === 'Mimic') {
                return; //The collectChest() function takes it from here
            }
        }
        
        if (!this.isAUnit(digit)) {
            
            positionsArray[row][col] += unit.digit;

        } else { //It's an enemy
             
            opponent.eliminateUnit(row, col);
            positionsArray[row][col] = unit.digit;

        }

        digit = positionsArray[row][col];
        newTile.firstChild.src = unit.sprite;

        if (Math.abs(digit) > 10) { //If the unit is placed atop a friendly mine
            newTile.style.borderColor = 'red';
        }

        newTile.firstChild.src = unit.sprite;

        positionsArray[oldR][oldC] -= unit.digit;
        oldDigit -= unit.digit;
        oldTile.firstChild.src = `../images/${Math.abs(oldDigit)}.png`;
        if (oldTile.style.borderColor === 'red') { //If there was a mine underneath the unit
            oldTile.style.borderColor = '#B3710E';
        }

        unit.setPos([row, col])


        this.promotePawn(); //Checks if pawn promotion is valid
        this.displayCheckedKing(); //Updates the 'checked' state display for when you move out of check
    }



    /**
     * Displays the active players lost units as cards that are in sequential order.
     * @param {string} parentElementID The class name of the element we are adding into.
     * @param {array} units The array of units to display.
     */
    displaySpecificUnits(parentElementID, units) {

        //Setting a boolean to track whether a suitable unit is found to occupy the display card
        let isEmpty = true;
        let player = this.turn.activePlayer

        let parentElement = document.getElementById(parentElementID)
        parentElement.innerHTML = ''
        for (let i = 1; i < 7; i++) {

            //Marking the lost unit display for digit 'i' as empty
            isEmpty = true;
            //Instantiating the specific lost unit card and image
            let lostUnitDiv = document.createElement('div')
            lostUnitDiv.className = 'lostUnitDiv';
            let sprite = document.createElement('img');
            sprite.className = 'lostUnitSprite';
        
        
            //This nested loop where i will be used to find units by their digit creates an ordering effect of lost units
            for (let unit of units) {
        
                //Setting i to find the appropriate digits
                let playersI = i * player.sign;
        
                //Add the unit's image to the sprite.src if it is found in lost
                if (unit.digit === playersI) {
                    sprite.src = unit.hoveredSprite;
                    isEmpty = false;

                    if(parentElement.parentElement.className === 'selectionWindow') { //This ensures that the player may interact with the sprites within selection windows

                        sprite.addEventListener('mouseenter', () => {
                            sprite.src = unit.sprite;
                        })
        
                        sprite.addEventListener('mouseleave', () => {
                            sprite.src = unit.hoveredSprite; //Uses hovered as default for visibility
                        })

                    
                        sprite.addEventListener('click', () => {

                            if (this.turn.isCloningUnit) {
                                parentElement.innerHTML = '' //Removes unit selection
                                parentElement.parentElement.className = 'hidden' //Removes the classname from the selectionWindow, reverting it back to hidden
                                this.turn.selectedClone = unit;

                                this.displayClonePositions(true)
                            } else if (this.turn.isPromotingPawn) {
                                let promotableUnit = this.findPromotablePawn()

                                let row = promotableUnit.rowPos; let col = promotableUnit.colPos;
                                this.positionsArray[row][col] = promotableUnit.digit = unit.digit;

                                let tile = document.getElementById(`tile(${row}${col})`)
                                tile.firstChild.src = promotableUnit.sprite = unit.sprite
                                promotableUnit.hoveredSprite = unit.hoveredSprite

                                parentElement.innerHTML = '' //Removes unit selection
                                parentElement.parentElement.className = 'hidden' //Removes the classname from the selectionWindow, reverting it back to hidden
                                this.turn.isPromotingPawn = false
                                
                            }

                        })
                    }
                    
                    lostUnitDiv.appendChild(sprite);
        
                    break; //This crucial! It breaks the search for a unit with i as a digit, so that duplicates are not added
                }
            }
        
            //If no unit was found in this.lost that had the digit 'i', make an empty display
            if (isEmpty) {
                sprite.src = '../images/0.png' 
                lostUnitDiv.appendChild(sprite);
            }
            //And you know what this does
            parentElement.appendChild(lostUnitDiv)
        }
    }



    /**
    *Inititiates cloning if the requirements are present
    */
    attemptCloning() {
        let player = this.turn.activePlayer
    
        if (player.clones > 0 && player.lostUnits.length > 0) {
            this.cloneUnit()
            player.clones--
            this.attemptCloning()
        } else {
            return;
        }
    }



    /**
     * Presents the lost unit selection window and adds a click event to the sprites that allow unit selection, 
     * position selection, and ultimatly unit cloning.
     */
    cloneUnit() {

        let cloneWindow = document.getElementById('selectUnitWindow')
        cloneWindow.className = 'selectionWindow'
        this.turn.isCloningUnit = true;
    
        this.displaySpecificUnits('selectableUnits', this.turn.activePlayer.lostUnits)
    }
    


    /**
     * Toggles the display of legal clone positions.
     * @param {Boolean} makeVisible Whether or not you are making the display or removing the display.
     */
    displayClonePositions(makeVisible) {
    
        if (makeVisible) {
            let positionsArray = this.positionsArray;
            let digit;
            let rowLimit;
            if (this.turn.activePlayer === this.whitePlayer) {
                rowLimit = 0
            } else {
                rowLimit = 6
            }
    
            for (let row = rowLimit; row <= rowLimit + 1; row++) {
    
                for (let col = 0; col < 8; col++) {
                    digit = positionsArray[row][col]
                    if( digit === 0 || Math.abs(digit) === 10) {
                        this.turn.legalClonePositions.push([row, col])
                        let tile = document.getElementById(`tile(${row}${col})`)
                        tile.style.background = 'rgba(15, 217, 222, 0.3)';
                        tile.style.borderColor = 'blue';
                    }
                }
    
            }
        } else {
            this.turn.legalClonePositions.forEach(position => {
                let tile = document.getElementById(`tile(${position[0]}${position[1]})`)
                tile.style = ''
                if (this.turn.activePlayer === this.blackPlayer) {
                    tile.style.transform = 'rotate(180deg)' //Returning the tile back to it's rotated state
                }
            })
        }
    }



    /**
     * Searches the active player's units seeing if they have a pawn that meets promotable criterea.
     * */
    findPromotablePawn() {
        let maxRow;
        if (this.turn.activePlayer === this.whitePlayer) {
            maxRow = 7
        } else {
            maxRow = 0
        }

        let isFound = false;
        let unit;
        this.turn.activePlayer.livingUnits.forEach(liveUnit => {
            if ( liveUnit.rowPos === maxRow && Math.abs(liveUnit.digit) === 1 ) {
                isFound = true
                unit = liveUnit
                return;
            }
        })

        if (isFound) return unit 
        else return false
    }



    /**
     * Presents the player with a selection of units to select from then enacts the promotion.
     */
    promotePawn() {
        if (this.findPromotablePawn() !== false) {
            this.turn.isPromotingPawn = true;
            let promoteWindow = document.getElementById('selectUnitWindow')
            promoteWindow.className = 'selectionWindow'
            this.displaySpecificUnits('selectableUnits', this.turn.activePlayer.promotableUnits)
        }
    }



    /**
    * Appropriatly applies or removes a background to the board tiles that are valid positions to set a mine.
    */
    settingMineDisplay() {  
        let turn = this.turn;
        if (turn.isPlacingMine) {
            turn.legalMinePositions.forEach(position => {
                let row = position[0]; let col = position[1];
                let tile = document.getElementById(`tile(${row}${col})`)
                tile.style.background = 'rgba(255, 111, 0, 0.3)';
            })
        } else {
            turn.legalMinePositions.forEach(position => {
                let row = position[0]; let col = position[1];
                let tile = document.getElementById(`tile(${row}${col})`)
                tile.style.background = '';
            })
        }
    }



    /**
     * Takes a mine out of a players storage array, places it on the board, and into the players set array
     * @param {Mine} mine The mine of subject
     * @param {Number} row The row-coordinate to set to
     * @param {Number} col The col-coordinate to set to
     */
    setMine(mine, row, col) {
        let player = this.turn.activePlayer
        mine.rowPos = row; mine.colPos = col;
        this.positionsArray[row][col] += mine.digit;

        let index = player.storedMines.indexOf(mine)
        player.storedMines.splice(index, 1)
        player.setMines.push(mine)
        this.turn.isPlacingMine = false;

        let tile = document.getElementById(`tile(${row}${col})`)
        tile.style.borderColor = 'red';

    }



    /**
     *  A function used to create a pause in animations.
     * @param {Number} ms Delay in milliseconds
     * @returns 
     */
    async delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }



    /**
     * Triggers the animation depicting the explosion of a mine in a specific tile.
     * 
     * Resolves by applying by an empty sprite over the tile.
     * @param {Number} row The row-coordinate of the tile.
     * @param {Number} col The col-coordinate of the tile.
     */
    async explosion(row, col) {

        let tile = document.getElementById(`tile(${row}${col})`)
        tile.firstChild.src = '../images/10.png'
        await this.delay(175)
        for (let i = 1; i < 9; i++) {
            tile.firstChild.src = `../images/Explosion-${i}.png`
            await this.delay(150)
        }
        tile.firstChild.src = '../images/0.png'

    }



    /**
     * Triggers the animation depicting the distruption of a mimic.
     * 
     * Resolves by placing an empty sprite over the tile.
     * @param {Number} row The row-coordinate of the tile.
     * @param {Number} col The col-coordinate of the tile.
     */
    async mimicGif(row, col) {

        let tile = document.getElementById(`tile(${row}${col})`)
        let sets = 3;
        while (sets >= 0) {
            --sets;
            for (let i = 1; i <= 3; ++i) {
                tile.firstChild.src = `../images/Mimic-Frame${i}.png`;
                await this.delay(150);
            }
            tile.firstChild.src = `../images/Mimic-Frame2.png`;
            await this.delay(150);
        }
        tile.firstChild.src = '../images/0.png'
    }


    /**
     * Fetches the active player's king.
     * @returns The unit if found. Else, false.
     */
    getKingUnit() {
        let king = false;
        this.turn.activePlayer.livingUnits.forEach(unit => {
                if ( Math.abs(unit.digit) === 6 ) {
                    king = unit; //Found him
                }
            })
        return king
    }


    /**
     * Applies a red background to the king's position if he is in check. Removes it if he is not.
     */
    displayCheckedKing() {
        let turn = this.turn
        
        let king = this.getKingUnit()
        

        if (king === false) {

            //This means the king has been eliminated by a mimic or a mine
            this.endGame()

        } else if (!moveFuncts.checkKing(king, this.positionsArray)) {
            //The king is in a checked position
            turn.isChecked = true;
            if (!turn.activePlayer.allMoves.length > 0) {
                //There are no moves that take the king out of check.
                this.endGame()
            } else {
                
                let row = king.rowPos; let col = king.colPos;
                
                turn.checkedTile = document.getElementById(`tile(${row}${col})`)
                let tile = turn.checkedTile;

                tile.style.background = 'rgba(255, 115, 0, 0.45)'; //Applying a background to the checked tile so that the user realizes
                tile.style.borderColor = 'red';
            }

        } else if (turn.isChecked){
            //If the turn is already in check, this is being called to hide the display
            turn.isChecked = false;
            let tile = turn.checkedTile;
            tile.style.background = '';
            tile.style.borderColor = '';
        }
    }



    /**
     * Ends the game. 
     * Displaying the victor's name and sending all the board states to the firestore database.
     */
    async endGame() {
        this.isOver = true;
        this.displayIntermediatoryScreen();
        
        // Generates valid document ID
        const gameId = `game_${new Date().toISOString().replace(/[:.-]/g, '_')}`;
        await window.saveBoardStates(gameId, this); // Save entire boardStates
    }   



    /**
     * Formats the structure of this.boardStates ready for sending to the firestore database.
     * @returns Object fromatted for database storage.
     */
    getSerializableState() {
        // Convert boardStates object to an array for easier querying (optional)
        const boardStatesArray = Object.keys(this.boardStates).map(key => ({
            moveNumber: parseInt(key),
            positionsArray: this.boardStates[key]
        }));
        return {
            boardStates: this.boardStates, // Original object format
            boardStatesArray: boardStatesArray, // Array format for flexibility
            gameStyle: this.style,
            timestamp: new Date().toISOString()
        };
    }



    /**
     * Displays the player's lost units and special objects when it is their turn.
     */
    displayStats() {
            
        let turn = this.turn;
        let player = turn.activePlayer;

        
        this.displaySpecificUnits('lostUnits', player.lostUnits)

        let mineDisplay = document.getElementById('mines');
        //Clearing the elements from the previous display
        mineDisplay.innerHTML = '';

        let j = 1;
        player.storedMines.forEach(mine => {

            if ( j > 3) {
                return
            }
            j++
            let mineDisplayDiv = document.createElement('div')
            mineDisplayDiv.className = 'lostUnitDiv';
            let sprite = document.createElement('img');
            sprite.className = 'lostUnitSprite';

            mineDisplayDiv.addEventListener('click', () => {
                if (turn.isMovingUnit) this.hideMoves(turn.displayedMoves)
                if (turn.isCloningUnit) return
                if (!turn.isPlacingMine) {
                    turn.legalMinePositions = [];
                    turn.isPlacingMine = true;
                    sprite.src = mine.activeSprite
                    turn.isPlacingMine = true
                    turn.selectedMine = mine;

                    player.livingUnits.forEach(unit => {
                        turn.legalMinePositions.push([unit.rowPos, unit.colPos])
                    })
                    this.settingMineDisplay()
                }
            })

            mineDisplayDiv.addEventListener('mouseenter', () => {
                if (!turn.isPlacingMine) sprite.src = mine.activeSprite
            })

            mineDisplayDiv.addEventListener('mouseleave', () => {
                if (!turn.isPlacingMine) sprite.src = mine.inactiveSprite
            })

            sprite.src = mine.inactiveSprite;
            mineDisplayDiv.appendChild(sprite);
            mineDisplay.appendChild(mineDisplayDiv);

        })

        let cloneDisplay = document.getElementById('clones');
        cloneDisplay.innerHTML = '';

        let k = player.clones
        if (k > 3) k = 3
        let l = k - 3
        for (let i = 0; i < 4; i++) {

            let CloneDisplayDiv = document.createElement('div')
            CloneDisplayDiv.className = 'lostUnitDiv';
            let sprite = document.createElement('img');
            sprite.className = 'lostUnitSprite';

            if (k > 0) {
                sprite.src = "../images/CloneIcon.png";
            } else {
                return
            }
            
            CloneDisplayDiv.appendChild(sprite);
            cloneDisplay.appendChild(CloneDisplayDiv);

            --k;
            
        }

    }



    /**
     * Hides the board and stats display as players transact. 
     * This keeps one player's special information undisclosed to the other.
     */
    displayIntermediatoryScreen() {
        let board = document.getElementById('board')
        let tiles = document.getElementsByClassName('tiles')
        let boardScreen = document.getElementById('boardScreen')
        let displayScreen = document.getElementById('displayScreen')

        let goButton = document.getElementById('goButton')
        let text = document.getElementById('playerName')
        
        let styleWhiteButton = () => {
            goButton.style.color = '#000000'
            goButton.style.backgroundColor = '#e39a7c'
            goButton.style.boxShadow = 'inset -2px -2px 0px 0px #cc655a'
        }

        let whiteHover = () => {
            goButton.style.color = '#85362a'
            goButton.style.boxShadow = 'inset -2px -2px 0px 0px #da6b5fff'
        }

        let styleBlackButton = () => {
            goButton.style.color = '#000000'
            goButton.style.backgroundColor = '#4767a8'
            goButton.style.boxShadow = 'inset -2px -2px 0px 0px #33336bff'
        }

        let blackHover = () => {
            goButton.style.color = '#1b1940ff'
            goButton.style.boxShadow = 'inset -2px -2px 0px 0px #40406e'
        }

        if (this.turn.activePlayer === this.whitePlayer) {

            board.style.transform = ''; //Rotating the board to White's perspective
            Array.from(tiles).forEach(tile => {
                tile.style.transform = '';
            })
            
            if (this.isOver) {
                text.textContent = 'Player 2 Won!'
                styleBlackButton()
            } else {
                text.textContent = 'Player 1'
                styleWhiteButton()
            }
          
            goButton.addEventListener('mouseenter', () => {
                if (this.isOver) {
                    blackHover()
                } else {
                    whiteHover()
                }
            })

            goButton.addEventListener('mouseleave', () => {
                if (this.isOver) {
                    styleBlackButton()
                } else {
                    styleWhiteButton()
                }
            })

        } else {

            board.style.transform = 'rotate(180deg)'; //Rotating the board to Black's perspective
            Array.from(tiles).forEach(tile => {
                tile.style.transform = 'rotate(180deg)';
            })

            if (this.isOver) {
                text.textContent = 'Player 1 Won!'
                styleWhiteButton()
            } else {
                text.textContent = 'Player 2'
                styleBlackButton()
            }
            
            

            goButton.addEventListener('mouseenter', () => {
                if (this.isOver) {
                    whiteHover()
                } else {
                    blackHover()
                }
            })
            goButton.addEventListener('mouseleave', () => {
                
                if (this.isOver) {
                    styleWhiteButton()
                } else {
                    styleBlackButton()
                }

            })

        }
        
        boardScreen.className = 'screen'
        displayScreen.className = 'screen'

        if (this.isOver) {
            goButton.textContent = 'Okay'
        }

        goButton.addEventListener('click', () => {
            if (this.isOver) { 
                this.backToHomePage()
                goButton.textContent = 'Start'
            } 
            boardScreen.className = 'hidden'
            displayScreen.className = 'hidden'
            //Checking if the new player meets clone specifications
            this.attemptCloning()

        })
        
    }



    /**
     * Ends the active turn, and sets the game ready for the next player.
     */
    endTurn() {

        if (this.turn.hasMoved && !this.turn.isCloningUnit) {

            //Clearing the settingMineDisplays
            if (this.turn.isPlacingMine) {
                this.turn.isPlacingMine = false
                this.settingMineDisplay();
            }
            let player = this.turn.activePlayer

            let isKingAlive = this.getKingUnit();

            //Filtering through set Mines and removing them from the display
            player.setMines.forEach(mine => {
                let row = mine.rowPos; let col = mine.colPos;
                this.positionsArray[row][col] -= (10 * player.sign)
                let tile = document.getElementById(`tile(${row}${col})`)
                tile.style.borderColor = '#B3710E'
                let digit = this.positionsArray[row][col]
                tile.firstChild.src = `../images/${digit}.png`
                tile.style.borderColor = ''
            })

            //Resetting the 'END TURN' button to it's inactive styles
            let endTurnBttn = document.getElementsByClassName('button')
            endTurnBttn[3].id = 'endTurnInactive'

            //Redeclaring all the turn variables as to not let them carry over
            if (this.turn.activePlayer === this.whitePlayer) {
                this.turn.activePlayer = this.blackPlayer
            } else { 
                this.turn.activePlayer = this.whitePlayer
            }
            this.isChecked = false;

            this.turn.hasMoved = false;
            this.turn.isMovingUnit = false;
            this.turn.isPlacingMine = false;
            this.turn.isCloningUnit = false;
            this.turn.isPromotingPawn = false;
            this.turn.selectedUnit = null;
            this.turn.displayedMoves = {};
            this.turn.selectedMine = null;
            this.turn.legalMinePositions = [];
            this.selectedClone = null;
            this.legalClonePositions = []

            let newPlayer = this.turn.activePlayer
            player = newPlayer

            //Adding the new players mines to the map
            newPlayer.setMines.forEach(mine => {
                let row = mine.rowPos; let col = mine.colPos;
                this.positionsArray[row][col] += (10 * newPlayer.sign)
                let tile = document.getElementById(`tile(${row}${col})`)
                if (Math.abs(this.positionsArray[row][col]) > 10) {
                    tile.style.borderColor = 'red'
                } else {
                    tile.firstChild.src = `../images/10.png`
                }
            })

            if (isKingAlive === false) this.endGame()

            //Ticking the chest in its countdowns
            this.chest.tick(this.positionsArray);

            //Getting all the players moves
            this.getPlayersMoves()

            //Displaying whether the king is in check
            this.displayCheckedKing()

            //Displaying the new player's key information
            this.displayStats()


            //These are temporary mechanics I am using to store board states from people playing ChessT Passn'Play
            let counts = this.counts;
            this.boardStates[counts] = structuredClone(this.positionsArray);

            if(this.isOver) {
                //Send the boardStates object to firestore
            }
            ++this.counts

            this.displayIntermediatoryScreen();

        }

    }



    /**
     * Hides the game display and sends the player back to homepage.
     */
    backToHomePage() {
        window.location.reload();
    }

}
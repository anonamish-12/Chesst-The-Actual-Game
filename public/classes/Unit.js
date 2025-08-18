export class Unit {

    /**
     * The Unit class creates a chess unit object. 
     * 
     * The unit object stores;
     * - A digit representing its piece type
     * - A string representing its sprite address
     * - Its initial rowPos and colPos
     * - Its current rowPos and colPos
     * - Its available moves
     * 
     * @param {Number} digit The number that correlates to the piece type (eg. -1 => Black Pawn)
     * @param {Number} initialRowPos The unit's initiated rowPos
     * @param {Number} initialColPos The unit's initiated colPos
     */
    constructor(digit, initialRowPos, initialColPos) {

        //This represents what kind of piece is being stored
        this.digit = digit;
        // +ve => White    -ve => Black
        // 1 => Pawn
        // 2 => Rook
        // 3 => Knight
        // 4 => Bishop
        // 5 => Queen
        // 6 => King

        // This is the address to the unit's sprite
        this.sprite = `./images/units/${digit}.png`;
        this.hoveredSprite = `./images/units/${digit}-hover.png`;


        //These are the initial row and coloumn positions of the unit.
        //This is used primarily to allow pawns to move two squares on their first move.
        this.initialRowPos = initialRowPos;
        this.initialColPos = initialColPos;

        //These are the dynamic position values that represent the unit's current (row, col) position
        this.rowPos = initialRowPos; // Row position (0-7)
        this.colPos = initialColPos; // Column position (0-7)

        this.moves = {}; //The object that will hold the unit's legal moves
    }



    /**
     * This updates the unit's current position when passed an aray [x, y].
     * @param {Array} position [row, col]
     */
    setPos(position) { 
        this.rowPos = position[0];
        this.colPos = position[1];
    }


}
import { Unit } from "/classes/Unit.js";

export class Player {

    /**
     * The player object stores all the information regarding a player within the game.
     * - Whether the player is Black (-ve sign) or White (+ve sign)
     * - The living units that belong to the player.
     * - The units that the player has lost.
     * - The mines that a player owns.
     * - The number of moves that player has available.
     * - The number of clones stored by the player.
     * @param {Number} sign The number representing the player's color (1 => White || -1 => Black)
     */
    constructor(sign) {

        // sign ===>     1 => white     -1 => black
        this.sign = sign;

        this.livingUnits = [];
        this.lostUnits = [];
        //A messy way of seperating the king unit from selection that a pawn can promote into
        this.promotableUnits = []; 

        this.storedMines = [];
        this.setMines = [];

        //Array primarily used to see if the player has been checkmated
        this.allMoves = [];

        this.clones = 0;
        
    }

    /**
     * This searches through the player's living units
     * for one with specified coordinates.
     * If found, the unit is spliced from the array of the living,
     * and pushed into that of the dead.
     * @param {Number} row The guilty x-coord
     * @param {Number} col The guilty y-coord
     */
    eliminateUnit(row, col) {
        

        let i = 0; //Used to track the index of the unit
        this.livingUnits.forEach(unit => {
            if (unit.rowPos === row && unit.colPos === col) {
                this.lostUnits.push(unit);
                this.livingUnits.splice(i, 1);
                unit.moves = {} //Clearing the unit's moves
                return;
            }
            ++i;
        })

    }

    /**
     * This searches through the player's dead units.
     * If the specified unit is found, it is spliced from the array of the dead,
     * and pushed into that of the living.
     * @param {Unit} unit The unit that is being revived
     */
    reviveUnit(unit) {

        let i = 0; //Used to track the index of the unit
        this.lostUnits.forEach(u => {
            if (u == unit) {
                this.livingUnits.push(unit);
                this.lostUnits.splice( i, 1 );
                return;
                //The units available moves are applied by the caller.
            }
            ++i;
        })
    }

    
}
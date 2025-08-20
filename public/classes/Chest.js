
export class Chest {

    /**
     * The chest is an object that spawns and vanishes from the internal region of the board.
     * If collected by a unit, the user can collect it's bounty before resetting it.
     */
    constructor() {

        this.digit = 7;
        this.rowPos = -1;
        this.colPos = -1;

        //Number of rounds till vanishes
        this.longevity = -1;
        //Later set by this.setLongevity(); 


        //Round delay till next spawned
        this.count;
        this.countFactor = 1;
        this.setCount(true);
        

        //Contents
        // 2% 'Mimic'
        // 33% 'Clone'
        // 65% 'Mine'
        this.contains;
        //this.setContents();

        this.sprite = '../images/Chest-CLOSED.png';

    }

    /**
     * Used to set the count of the chest to a random int between 6-8(inc), representing 3-4 full rounds.
     * 
     * @param {Boolean} first Whether this is the first time set count is called. Causing a shorter countdown to be set.
     */
    setCount(first) {
        let randNum;
        randNum = Math.random() * (7 - 3) + 3; //Random number between 3-(inclusive) and 9-(exclusive) 

        //Enabling a shorter countdown on the first setting. (1-3 Rounds)
        if (first) randNum = Math.random() * (5 - 1) + 1; //Random number between 1-(inclusive) and 5-(exclusive) 

        randNum *= this.countFactor;
        let randInt = Math.ceil(randNum); //Converts to integer
        this.count = randInt
        this.countFactor *= 0.9;
        console.log(this.count)
        
    }

    /**
     * Randomly sets the chest.cotains value to a string detirmining the contents.
     * 
     * Contents are;
     * - 64% Mines
     * - 33% Clones
     * - 2% Mimics
     */
    setContents() {

        let randNum = Math.random()
        if (randNum > 0.34) {
            this.contains = 'Mine';
        } else if (randNum > 0.02) {
            this.contains = 'Clone';
        } else {
            this.contains = 'Mimic';
        }
    }

    /**
     * Sets the longevity of the chest to a number between 2-6(inc). 
     * Representing 1-3 full rounds.
     */
    setLongevity() {
        let randNum = Math.random() * (7 - 2) + 1; //Random number between 2(inc) and 7(exc)
        let randInt = Math.floor(randNum); //Random integer between 2(inc) and 6(inc) -- This represents 1-3 full rounds
        this.longevity = randInt;
    }

    /**
     * Provides a random position within the internal region of the board.
     * @returns [row, col]
     */
    randomPosition() {

        let randomRowPos = Math.floor( Math.random() * (6 - 2) + 2); //Random int between 2-6(exc)
        let randomColPos = Math.floor( Math.random() * 8 ); //Random int between 0-8(exc)
        return [randomRowPos, randomColPos];
    }
    
    /**
     * Ticks the chest towards spawning or vanishing.
     * @param {Array} posArray The game object's positions array
     */
    tick(posArray) {

        if (this.longevity === -1) { //No chest is present on the board

            if (this.count === 0) {
                this.spawnChest(posArray);
            } else {
                this.count--;
                console.log("tick")
                console.log(this.count)
            }

        } else if (this.longevity > 0 ) {
            this.longevity--;
        } else {  // this.longevity === 0
            this.resetChest(posArray);
        }

    }

    /**
     * Spawns the chest onto a random tile within the boards internal region.
     * @param {Array} posArray The game object's postions array
     */
    spawnChest(posArray) {

        this.setLongevity()
        this.setContents();

        let [row, col] = this.randomPosition();
        let occupied = Math.abs( posArray[row][col] );

        while ( occupied !== 0 ) { //checks of a unit is on the selected tile
            //Therfore, chests can not spawn on mines either.
            [row, col] = this.randomPosition();
            occupied = posArray[row][col];
        }
        
        posArray[row][col] = this.digit;
        let tile = document.getElementById(`tile(${row}${col})`)
        let image = tile.firstChild;
        image.src = this.sprite;

        this.rowPos = row;
        this.colPos = col;


    }

    /**
     * Resets all values of the chest, making it a non-spawned object with a new countdown.
     * @param {Array} posArray The game object's postions array
     */
    resetChest(posArray) {

        this.longevity = -1
        this.setCount(false)

        let digit = posArray[this.rowPos][this.colPos]
        if (digit === this.digit) {
            posArray[this.rowPos][this.colPos] = 0
            digit = 0;
        } else if (Math.abs(digit) === 17) {
            posArray[this.rowPos][this.colPos] -= this.digit * Math.sign(digit)
            digit -= this.digit * Math.sign(digit)
        } else { 
            //It is being collected and further deciscion making is being made in makeMove()
            return
        }

        let tile = document.getElementById(`tile(${this.rowPos}${this.colPos})`)
        let image = tile.firstChild;
        image.src = `../images/${digit}.png`

        this.rowPos = -1;
        this.colPos = -1;
    }

}
export class Mine {

    /**
     * The mine is an object that, when set by an opponent, can eliminate the occupying units.
     * @param {Number} playerSign The sign of the player of whom this mine will belong.
     */
    constructor(playerSign) {

        this.digit = 10 * playerSign;

        //Is assigned when the mine is set.
        this.rowPos = -1;
        this.colPos = -1;

        this.inactiveSprite = './images/units/Mine-OFF.png';
        this.activeSprite = './images/units/10.png';

    }

}
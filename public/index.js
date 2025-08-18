console.log(`Built By:`)
console.log(`  //\\ ||\\  ||█████||\\  ||`)
console.log(` //--\\|| \\ ||     █| \\ ||`)
console.log(`//    \\|  \\||█████||  \\||`)

import { Game } from './classes/Game.js';

import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore, doc, setDoc, getDoc } from "firebase/firestore";

/**
 * Applies a red color to the infoText.
 */
let makeRed = () => {
    infoText.style.color = '#a70000';
}

/**
* Removes the red color applied to the infoText.
*/
let stopRed = () => {
    infoText.style.color = '';
}

/**
 * Hides the homepage and presents the set chess board.
 */
let HideHomePage = () => {
    let homePage = document.getElementById('homePage');
    homePage.className = 'hidden';

    let gamePage = document.getElementById('game');
    gamePage.className = 'visible';
    
    //Apply mobile layout after showing game page as otherwise the endTurn button becomes present.
    applyMobileLayout();
}

let PnPBttn = document.getElementById('PnPBttn');
let vAIBttn = document.getElementById('closedBttn');

let infoText = document.getElementById('inDev');

//Event Listners
vAIBttn.addEventListener('mouseenter', makeRed)
vAIBttn.addEventListener('mouseleave', stopRed)
infoText.addEventListener('mouseenter', makeRed)
infoText.addEventListener('mouseleave', stopRed)

PnPBttn.addEventListener('click', () => {
    const game = new Game(true);
    HideHomePage()
})

/* Style formatting for Mobile devices */
let buttonOriginalParent = null;
let buttonNextSibling = null;

function applyMobileLayout() {
    const displaySection = document.getElementById('displaySection');
    const button = document.getElementById('endTurnInactive') || document.getElementById('endTurnActive');
    const gamePage = document.getElementById('game');
    
    // Only apply mobile layout if we're on the game page (not home page)
    if (gamePage.classList.contains('hidden')) {
        return; // Exit early if game page is hidden
    }
    
    if (window.innerWidth <= 850) {
        displaySection.classList.add('mobile-display-grid');
        
        // Move button to body for mobile
        if (button && !buttonOriginalParent) {
            buttonOriginalParent = button.parentNode;
            buttonNextSibling = button.nextSibling;
            document.body.appendChild(button);
            button.classList.add('mobile-button');
        }
    } else {
        displaySection.classList.remove('mobile-display-grid');
        
        // Move button back to original position for desktop
        if (button && buttonOriginalParent) {
            button.classList.remove('mobile-button');
            if (buttonNextSibling) {
                buttonOriginalParent.insertBefore(button, buttonNextSibling);
            } else {
                buttonOriginalParent.appendChild(button);
            }
            buttonOriginalParent = null;
            buttonNextSibling = null;
        }
    }
}

// Apply on page load
document.addEventListener('DOMContentLoaded', applyMobileLayout);
// Apply on window resize
window.addEventListener('resize', applyMobileLayout);

//Configuring the firestore data base to store completed game board states.
const firebaseConfig = {
  apiKey: "AIzaSyD5T3x1PFMTVmqES7KJsWwghQFRGZWNHPI",
  authDomain: "chesst-b67fa.firebaseapp.com",
  projectId: "chesst-b67fa",
  storageBucket: "chesst-b67fa.firebasestorage.app",
  messagingSenderId: "437851747871",
  appId: "1:437851747871:web:5ea9f8502ee34d0147072a",
  measurementId: "G-7R8Q77VSSB"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app); 

/**
 * Collects and stores each board position from completed games in a firestore database.
 * @param {String} gameId The identifying string generated to represent this specific game.
 * @param {Game} game The active game.
 */
window.saveBoardStates = async function(gameId, game) {
    try {
        const gameData = game.getSerializableState();
        await setDoc(doc(db, "games", gameId), gameData);
        console.log(`Board states saved to Firestore with ID: ${gameId}`); //For my own testing (will be done after deployment)
    } catch (error) {
        console.error("Error saving board states: ", error);
    }
};


//Array of all images addresses
const images = [
    './images/-1-hover.png',
    './images/-1.png',
    './images/-2-hover.png',
    './images/-2.png',
    './images/-3-hover.png',
    './images/-3.png',
    './images/-4-hover.png',
    './images/-4.png',
    './images/-5-hover.png',
    './images/-5.png',
    './images/-6-hover.png',
    './images/-6.png',
    './images/0.png',
    './images/1-hover.png',
    './images/1.png',
    './images/2-hover.png',
    './images/2.png',
    './images/3-hover.png',
    './images/3.png',
    './images/4-hover.png',
    './images/4.png',
    './images/5-hover.png',
    './images/5.png',
    './images/6-hover.png',
    './images/6.png',
    './images/10.png',
    './images/BlackSkin.png',
    './images/Board.png',
    './images/ChessTfavicon.png',
    './images/Chest-CLOSED.png',
    './images/CloneIcon.png',
    './images/Clouds-BACK-1.png',
    './images/Clouds-BACK-2.png',
    './images/Clouds-BACK-3.png',
    './images/Clouds-FRONT-1.png',
    './images/Clouds-FRONT-2.png',
    './images/Explosion-1.png',
    './images/Explosion-2.png',
    './images/Explosion-3.png',
    './images/Explosion-4.png',
    './images/Explosion-5.png',
    './images/Explosion-6.png',
    './images/Explosion-7.png',
    './images/Explosion-8.png',
    './images/Mimic-Frame1.png',
    './images/Mimic-Frame2.png',
    './images/Mimic-Frame3.png',
    './images/Mine-OFF.png'
];

/**
 * Function to preload all images allowing smooth animations in mobile environments
 */
function preLoadImages() {
    images.forEach(imageI => {
        const image = new Image();
        image.src = imageI;
    });
}
preLoadImages()
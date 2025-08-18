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



 
const modules = import.meta.glob('./public/images/*.png', { eager: true });
/**
 * Caches all the required photos to enable better animations on mobile.
 */
async function preloadAllImages() {
  console.log(`Preloading ${Object.keys(modules).length} images...`);
  
  const imagePromises = Object.entries(modules).map(([path, module]) => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => {
        console.log(`✓ Loaded: ${path}`);
        resolve();
      };
      img.onerror = () => {
        console.error(`✗ Failed to load: ${path}`);
        reject(new Error(`Failed to load ${path}`));
      };
      img.src = module.default || module;
    });
  });
  
  try {
    await Promise.all(imagePromises);
    console.log('All images preloaded successfully!');
  } catch (error) {
    console.error('Some images failed to preload:', error);
  }
}

preloadAllImages();

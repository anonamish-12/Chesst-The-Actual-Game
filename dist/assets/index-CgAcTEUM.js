(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))i(s);new MutationObserver(s=>{for(const o of s)if(o.type==="childList")for(const l of o.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&i(l)}).observe(document,{childList:!0,subtree:!0});function e(s){const o={};return s.integrity&&(o.integrity=s.integrity),s.referrerPolicy&&(o.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?o.credentials="include":s.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function i(s){if(s.ep)return;s.ep=!0;const o=e(s);fetch(s.href,o)}})();class Hc{constructor(t,e,i){this.digit=t,this.sprite=`./images/units/${t}.png`,this.hoveredSprite=`./images/units/${t}-hover.png`,this.initialRowPos=e,this.initialColPos=i,this.rowPos=e,this.colPos=i,this.moves={}}setPos(t){this.rowPos=t[0],this.colPos=t[1]}}class co{constructor(t){this.sign=t,this.livingUnits=[],this.lostUnits=[],this.promotableUnits=[],this.storedMines=[],this.setMines=[],this.allMoves=[],this.clones=0}eliminateUnit(t,e){let i=0;this.livingUnits.forEach(s=>{if(s.rowPos===t&&s.colPos===e){this.lostUnits.push(s),this.livingUnits.splice(i,1),s.moves={};return}++i})}reviveUnit(t){let e=0;this.lostUnits.forEach(i=>{if(i==t){this.livingUnits.push(t),this.lostUnits.splice(e,1);return}++e})}}class Gc{constructor(){this.digit=7,this.rowPos=-1,this.colPos=-1,this.longevity=-1,this.count,this.setCount(!0),this.contains,this.sprite="./images/Chest-CLOSED.png"}setCount(t){let e;e=Math.random()*3+6,t&&(e=Math.random()*5+2);let i=Math.floor(e);this.count=i}setContents(){let t=Math.random();t>.34?this.contains="Mine":t>.02?this.contains="Clone":this.contains="Mimic"}setLongevity(){let t=Math.random()*5+1,e=Math.floor(t);this.longevity=e}randomPosition(){let t=Math.floor(Math.random()*4+2),e=Math.floor(Math.random()*8);return[t,e]}tick(t){this.longevity===-1?this.count===0?this.spawnChest(t):this.count--:this.longevity>0?this.longevity--:this.resetChest(t)}spawnChest(t){this.setLongevity(),this.setContents();let[e,i]=this.randomPosition(),s=Math.abs(t[e][i]);for(;s!==0;)[e,i]=this.randomPosition(),s=t[e][i];t[e][i]=this.digit;let l=document.getElementById(`tile(${e}${i})`).firstChild;l.src=this.sprite,this.rowPos=e,this.colPos=i}resetChest(t){this.longevity=-1,this.setCount(!1);let e=t[this.rowPos][this.colPos];if(e===this.digit)t[this.rowPos][this.colPos]=0,e=0;else if(Math.abs(e)===17)t[this.rowPos][this.colPos]-=this.digit*Math.sign(e),e-=this.digit*Math.sign(e);else return;let s=document.getElementById(`tile(${this.rowPos}${this.colPos})`).firstChild;s.src=`./images/units/${e}.png`,this.rowPos=-1,this.colPos=-1}}class Wc{constructor(t){this.digit=10*t,this.rowPos=-1,this.colPos=-1,this.inactiveSprite="./images/units/Mine-OFF.png",this.activeSprite="./images/units/10.png"}}function Ea(n,t,e){const i=t.rowPos,s=t.colPos;let o;const l=Math.abs(t.digit),u=[],h=[],f=[];let y=!1,v=Math.sign(t.digit),w=-v,S=!0;const R=(_,p)=>_>=0&&_<8&&p>=0&&p<8?!0:(y=!0,!1),k=(_,p)=>{if(R(_,p)){let m=e[_][p];if(m!==0&&m!==7&&Math.abs(m)!==10&&Math.sign(m)===Math.sign(t.digit)){y=!0;return}Ze(!1,t,[_,p],e)&&(m===0||Math.abs(m)===10?(u.push([_,p]),y=!1):m===7?(f.push([_,p]),y=!1):m!==0&&Math.sign(m)!==Math.sign(t.digit)&&(h.push([_,p]),y=!0))}};let D=(_,p)=>{if(R(_,p)){let m=e[_][p];m!==0&&m!==7&&Math.abs(m)!==10?y=!0:Ze(!1,t,[_,p],e)&&(m===7?f.push([_,p]):u.push([_,p]),y=!1)}};const $=(_,p,m)=>{S=!0;let E=6*w,T=1*w,I=(j,H)=>{if(R(j,H)){let it=e[j][H];_?(it===E||it===T)&&(S=!1):Ze(!1,t,[j,H],e)&&(it===7?f.push([j,H]):it!==0&&Math.sign(it)!==Math.sign(t.digit)&&h.push([j,H]))}},g=p+v;if(I(g,m+1),I(g,m-1),_)return S};let L=(_,p,m)=>{S=!0;let E=3*w;if([[2,1],[-2,1],[2,-1],[-2,-1],[1,2],[-1,2],[1,-2],[-1,-2]].forEach(I=>{let g=p+I[0],j=m+I[1];if(R(g,j)){let H=e[g][j];_?H===E&&(S=!1):k(g,j)}}),_)return S},O=(_,p,m,E,T,I)=>{y=!1;let g=m,j=E;for(;!y;)if(g+=T,j+=I,_)if(R(g,j)){let H=e[g][j];if(H===p||H===5*w){S=!1,y=!0;return}else if(H!==0&&H!==7&&Math.abs(H)!==10){S=!0,y=!0;return}}else return;else k(g,j)},nt=(_,p,m)=>{S=!0;let E=4*w;if(O(_,E,p,m,1,1),!S&&_||(O(_,E,p,m,1,-1),!S&&_)||(O(_,E,p,m,-1,-1),!S&&_)||(O(_,E,p,m,-1,1),_))return S},Ct=(_,p,m)=>{S=!0;let E=2*w;if(O(_,E,p,m,1,0),!S&&_||(O(_,E,p,m,-1,0),!S&&_)||(O(_,E,p,m,0,1),!S&&_)||(O(_,E,p,m,0,-1),_))return S},ht=(_,p,m)=>{let E=(g,j,H)=>{let it=j+H;for(y=!1,it;it<7&&it>0;it+=H){let Pt=e[g][it];Pt===0||Pt===7||Math.abs(Pt)===10||(y=!0)}if(!y&&e[g][it]===2*Math.sign(t.digit)){let Pt=[g,j+2*H];Ze(!1,t,Pt,e)&&u.push(Pt)}};S=!0;let T=6*w;for(let g=-1;g<=1;++g)for(let j=-1;j<=1;++j){if(g===0&&j===0)continue;let H=p+g,it=m+j;_?R(H,it)&&e[H][it]===T&&(S=!1):k(H,it)}let I=!1;if(_||(Math.sign(t.digit)===1?p===0&&m===4&&(I=!0):p===7&&m===4&&(I=!0),Cr(t,e)&&I&&(E(p,m,-1),E(p,m,1))),_)return S};if(n)return!!($(n,i,s)&&L(n,i,s)&&nt(n,i,s)&&Ct(n,i,s)&&ht(n,i,s));switch(l){case 1:o=i+v,$(!1,i,s),D(o,s),i===t.initialRowPos&&!y&&(o+=v,D(o,s));break;case 2:Ct(!1,i,s);break;case 3:L(!1,i,s);break;case 4:nt(!1,i,s);break;case 5:Ct(!1,i,s),nt(!1,i,s);break;case 6:ht(!1,i,s);break}return{freeMoves:u,eliminateMoves:h,chestMoves:f}}function Ze(n,t,e,i){let s,o;if(!n&&Math.abs(t.digit)!==6){s=Array.from({length:8},()=>Array(8).fill(null));for(let v=7;v>=0;--v)for(let w=0;w<8;++w){let S=Math.sign(t.digit);(i[v][w]===6*S||i[v][w]===6*S+10*S)&&(o=[v,w]),s[v][w]=i[v][w]}}else s=structuredClone(i);let l=e[0],u=e[1],h=s[l][u],f=t.rowPos,y=t.colPos;if(Math.abs(t.digit)===6&&Math.abs(u-y)===2){let v=u>y?1:-1,w=v===-1?0:7,S=v===-1?3:5;s[l][u]+=t.digit,s[f][y]-=t.digit;let R=2*Math.sign(t.digit);s[l][S]+=R,s[l][w]-=R}else h===7||h===0||Math.abs(h)===10?s[l][u]+=t.digit:s[l][u]=t.digit;if(s[f][y]-=t.digit,n)return s;{Math.abs(t.digit)===6&&(o=e);let v={digit:6*Math.sign(t.digit),rowPos:o[0],colPos:o[1]};return Cr(v,s)}}function Cr(n,t){return Ea(!0,n,t)}const uo={getValidMoves:Ea,simulateMove:Ze,checkKing:Cr};class Kc{constructor(t){this.positionsArray=[[2,3,4,5,6,4,3,2],[1,1,1,1,1,1,1,1],[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0],[-1,-1,-1,-1,-1,-1,-1,-1],[-2,-3,-4,-5,-6,-4,-3,-2]],this.boardStates={},this.counts=0,this.boardStates[0]=structuredClone(this.positionsArray),this.counts=1,this.whitePlayer=new co(1),this.blackPlayer=new co(-1),t?this.style="PnP":this.style="vAI",this.turn={activePlayer:this.whitePlayer,isChecked:!1,checkedTile:null,hasMoved:!1,isMovingUnit:!1,selectedUnit:null,displayedMoves:{},isPlacingMine:!1,selectedMine:null,legalMinePositions:[],isCloningUnit:!1,selectedClone:null,legalClonePositions:[],isPromotingPawn:!1},this.chest=new Gc,this.isOver=!1,this.instantiateGame()}instantiateGame(){const t=document.getElementById("board");let e=this.turn,i=this.positionsArray;for(let o=7;o>=0;--o)for(let l=0;l<8;++l){let u=document.createElement("div");u.className="tiles",u.id=`tile(${o}${l})`;const h=document.createElement("img");h.src="./images/units/0.png";const f=i[o][l];if(f!=0){const y=new Hc(f,o,l);h.src=y.sprite,f>0?(this.whitePlayer.livingUnits.push(y),Math.abs(f)!==6&&this.whitePlayer.promotableUnits.push(y)):(this.blackPlayer.livingUnits.push(y),Math.abs(f)!==6&&this.blackPlayer.promotableUnits.push(y))}u.addEventListener("mouseenter",()=>{if(!e.hasMoved&&!e.isCloningUnit&&!e.isPromotingPawn){let[y,v]=this.fetchTileCoordinates(u);const w=i[y][v];this.isAFriendlyUnit(w)&&this.hover(!0,y,v)}}),u.addEventListener("mouseleave",()=>{const[y,v]=this.fetchTileCoordinates(u),w=i[y][v];this.isAFriendlyUnit(w)&&this.hover(!1,y,v)}),u.addEventListener("click",()=>{let[y,v]=this.fetchTileCoordinates(u),w=i[y][v];!e.hasMoved&&!e.isMovingUnit&&!e.isPlacingMine&&!e.isCloningUnit&&!e.isPromotingPawn?this.isAFriendlyUnit(w)&&(e.selectedUnit=null,e.selectedUnit=this.searchForUnit(y,v,e.activePlayer.livingUnits),this.initiateMoveState()):e.isMovingUnit?this.searchMoves(y,v)?this.makeMove(y,v):y===e.selectedUnit.rowPos&&v===e.selectedUnit.colPos?this.cancelMove():this.isAFriendlyUnit(w)?(this.cancelMove(),e.selectedUnit=this.searchForUnit(y,v,e.activePlayer.livingUnits),this.initiateMoveState()):this.cancelMove():e.isPlacingMine?(this.searchArray([y,v],e.legalMinePositions)?this.setMine(e.selectedMine,y,v):e.isPlacingMine=!1,this.settingMineDisplay(),this.displayStats()):e.isCloningUnit&&this.searchArray([y,v],e.legalClonePositions)&&(e.isCloningUnit=!1,this.isOnEnemyMine(y,v)?(i[y][v]=0,w=0,this.explosion(y,v)):(e.activePlayer.reviveUnit(e.selectedClone),e.selectedClone.rowPos=y,e.selectedClone.colPos=v,i[y][v]+=e.selectedClone.digit,w=i[y][v],h.src=`./images/units/${e.selectedClone.digit}.png`,Math.abs(w)>10&&(u.style.borderColor="red"),this.getPlayersMoves(),e.isChecked=!1,this.displayCheckedKing()),this.displayClonePositions(!1),e.selectedClone=null,e.legalClonePositions=[],this.displayStats())}),u.appendChild(h),t.appendChild(u)}this.getPlayersMoves(),this.displayStats(),document.getElementsByClassName("button")[3].addEventListener("click",()=>{this.endTurn()})}fetchTileCoordinates(t){let e=parseInt(t.id[6]);return[parseInt(t.id[5]),e]}isAUnit(t){return t!==0&&t!==7&&Math.abs(t)!==10}isAFriendlyUnit(t){return!!(this.isAUnit(t)&&Math.sign(t)===this.turn.activePlayer.sign)}hover(t,e,i){let s=this.positionsArray[e][i];Math.abs(s)>10&&(s-=10*Math.sign(s));let l=document.getElementById(`tile(${e}${i})`).firstChild;t?l.src=`./images/units/${s}-hover.png`:l.src=`./images/units/${s}.png`}searchForUnit(t,e,i){let s=null;return i.forEach(o=>{o.rowPos===t&&o.colPos===e&&(s=o)}),s===null&&console.log("The unit was not present in the provided list. Double check you have passed the correct parameters."),s}initiateMoveState(){this.turn.displayedMoves=this.turn.selectedUnit.moves,this.displayMoves(),this.turn.isMovingUnit=!0}getPlayersMoves(){let t=this.turn;t.activePlayer.allMoves=[];function e(i){i.length>0&&t.activePlayer.allMoves.push(i)}t.activePlayer.livingUnits.forEach(i=>{i.moves=uo.getValidMoves(!1,i,this.positionsArray),e(i.moves.freeMoves),e(i.moves.eliminateMoves),e(i.moves.chestMoves)})}cancelMove(){this.turn.selectedUnit=null,this.hideMoves(),this.turn.displayedMoves=[],this.turn.isMovingUnit=!1}searchMoves(t,e){let i=!1,s=this.turn.displayedMoves;return Object.keys(s).forEach(o=>{if(this.searchArray([t,e],s[o])){i=!0;return}}),!!i}displayMoves(){let t=this.turn.displayedMoves;t.freeMoves.forEach(o=>{let l=document.getElementById(`tile(${o[0]}${o[1]})`);l.style.background="rgba(15, 217, 222, 0.3)",l.style.borderColor="blue"}),t.eliminateMoves.forEach(o=>{let l=document.getElementById(`tile(${o[0]}${o[1]})`);l.style.background="rgba(255, 60, 60, 0.3)",l.style.borderColor="red"}),t.chestMoves.forEach(o=>{let l=document.getElementById(`tile(${o[0]}${o[1]})`);l.style.background="rgba(240, 255, 0, 0.3)",l.style.borderColor="yellow"})}hideMoves(){let t=this.turn.displayedMoves;t.freeMoves.forEach(o=>{let l=document.getElementById(`tile(${o[0]}${o[1]})`);l.style.background="",l.style.borderColor="#B3710E"}),t.eliminateMoves.forEach(o=>{let l=document.getElementById(`tile(${o[0]}${o[1]})`);l.style.background="",l.style.borderColor="#B3710E"}),t.chestMoves.forEach(o=>{let l=document.getElementById(`tile(${o[0]}${o[1]})`);l.style.background="",l.style.borderColor="#B3710E"})}searchArray(t,e){let i=!1,s=t[0],o=t[1];return e.forEach(l=>{if(s===l[0]&&o===l[1]){i=!0;return}}),!!i}getOpponent(){return this.turn.activePlayer===this.whitePlayer?this.blackPlayer:this.whitePlayer}isOnEnemyMine(t,e){const i=this.getOpponent();let s=!1;return i.setMines.forEach(o=>{if(o.rowPos===t&&o.colPos===e){s=!0;return}}),s}async collectChest(){console.log("Chest Collected");let t=this.turn.selectedUnit,e=this.chest,i=this.positionsArray,s=this.turn.activePlayer;switch(e.contains){case"Mine":let o=new Wc(s.sign);s.storedMines.push(o);break;case"Clone":s.clones+=1,this.attemptCloning();break;case"Mimic":this.mimicGif(e.rowPos,e.colPos),i[t.rowPos][t.colPos]-=t.digit,s.eliminateUnit(e.rowPos,e.colPos);let l=i[t.rowPos][t.colPos],u=document.getElementById(`tile(${t.rowPos}${t.colPos})`);u.firstChild.src=`./images/units/${l}.png`;break}e.resetChest(this.positionsArray),this.displayStats()}makeMove(t,e){this.hideMoves();let i=document.getElementsByClassName("button");i[3].id="endTurnActive";let s=this.positionsArray,o=this.turn,l=o.selectedUnit,u=o.activePlayer,h=this.getOpponent(),f=l.rowPos,y=l.colPos,v=s[t][e],w=s[f][y],S=document.getElementById(`tile(${t}${e})`),R=document.getElementById(`tile(${f}${y})`);if(o.hasMoved=!0,o.isMovingUnit=!1,this.isOnEnemyMine(t,e)){u.eliminateUnit(f,y),h.eliminateUnit(t,e);let k=this.searchForUnit(t,e,h.setMines),D=h.setMines.indexOf(k);h.setMines.splice(D,1),s[t][e]=0,s[f][y]-=l.digit,w-=l.digit,R.firstChild.src=`./images/units/${Math.abs(w)}.png`,this.displayStats(),this.explosion(t,e),this.attemptCloning();return}if(Math.abs(l.digit)===6&&Math.abs(e-y)===2){let k=e>y?1:-1,D=k===-1?0:7,$=k===-1?3:5,L;u.livingUnits.forEach(O=>{O.rowPos===t&&O.colPos===D&&(L=O)}),s[t][e]+=l.digit,S.firstChild.src=l.sprite,l.setPos([t,e]),s[f][y]-=l.digit,w-=l.digit,R.firstChild.src=`./images/units/${Math.abs(w)}.png`,s[t][$]+=L.digit,S=document.getElementById(`tile-(${t}${$})`),S.firstChild.src=L.sprite,L.rowPos=t,L.colPos=$,s[t][D]-=L.digit,w=s[t][D],R=document.getElementById(`tile-(${t}${D})`),R.firstChild.src=`./images/units/${Math.abs(w)}.png`;return}v===7&&(this.collectChest(),this.chest.contains==="Mimic")||(this.isAUnit(v)?(h.eliminateUnit(t,e),s[t][e]=l.digit):s[t][e]+=l.digit,v=s[t][e],S.firstChild.src=l.sprite,Math.abs(v)>10&&(S.style.borderColor="red"),S.firstChild.src=l.sprite,s[f][y]-=l.digit,w-=l.digit,R.firstChild.src=`./images/units/${Math.abs(w)}.png`,R.style.borderColor==="red"&&(R.style.borderColor="#B3710E"),l.setPos([t,e]),this.promotePawn(),this.displayCheckedKing())}displaySpecificUnits(t,e){let i=!0,s=this.turn.activePlayer,o=document.getElementById(t);o.innerHTML="";for(let l=1;l<7;l++){i=!0;let u=document.createElement("div");u.className="lostUnitDiv";let h=document.createElement("img");h.className="lostUnitSprite";for(let f of e){let y=l*s.sign;if(f.digit===y){h.src=f.hoveredSprite,i=!1,o.parentElement.className==="selectionWindow"&&(h.addEventListener("mouseenter",()=>{h.src=f.sprite}),h.addEventListener("mouseleave",()=>{h.src=f.hoveredSprite}),h.addEventListener("click",()=>{if(this.turn.isCloningUnit)o.innerHTML="",o.parentElement.className="hidden",this.turn.selectedClone=f,this.displayClonePositions(!0);else if(this.turn.isPromotingPawn){let v=this.findPromotablePawn(),w=v.rowPos,S=v.colPos;this.positionsArray[w][S]=v.digit=f.digit;let R=document.getElementById(`tile(${w}${S})`);R.firstChild.src=v.sprite=f.sprite,v.hoveredSprite=f.hoveredSprite,o.innerHTML="",o.parentElement.className="hidden",this.turn.isPromotingPawn=!1}})),u.appendChild(h);break}}i&&(h.src="./images/units/0.png",u.appendChild(h)),o.appendChild(u)}}attemptCloning(){let t=this.turn.activePlayer;if(t.clones>0&&t.lostUnits.length>0)this.cloneUnit(),t.clones--,this.attemptCloning();else return}cloneUnit(){let t=document.getElementById("selectUnitWindow");t.className="selectionWindow",this.turn.isCloningUnit=!0,this.displaySpecificUnits("selectableUnits",this.turn.activePlayer.lostUnits)}displayClonePositions(t){if(t){let e=this.positionsArray,i,s;this.turn.activePlayer===this.whitePlayer?s=0:s=6;for(let o=s;o<=s+1;o++)for(let l=0;l<8;l++)if(i=e[o][l],i===0||Math.abs(i)===10){this.turn.legalClonePositions.push([o,l]);let u=document.getElementById(`tile(${o}${l})`);u.style.background="rgba(15, 217, 222, 0.3)",u.style.borderColor="blue"}}else this.turn.legalClonePositions.forEach(e=>{let i=document.getElementById(`tile(${e[0]}${e[1]})`);i.style="",this.turn.activePlayer===this.blackPlayer&&(i.style.transform="rotate(180deg)")})}findPromotablePawn(){let t;this.turn.activePlayer===this.whitePlayer?t=7:t=0;let e=!1,i;return this.turn.activePlayer.livingUnits.forEach(s=>{if(s.rowPos===t&&Math.abs(s.digit)===1){e=!0,i=s;return}}),e?i:!1}promotePawn(){if(this.findPromotablePawn()!==!1){this.turn.isPromotingPawn=!0;let t=document.getElementById("selectUnitWindow");t.className="selectionWindow",this.displaySpecificUnits("selectableUnits",this.turn.activePlayer.promotableUnits)}}settingMineDisplay(){let t=this.turn;t.isPlacingMine?t.legalMinePositions.forEach(e=>{let i=e[0],s=e[1],o=document.getElementById(`tile(${i}${s})`);o.style.background="rgba(255, 111, 0, 0.3)"}):t.legalMinePositions.forEach(e=>{let i=e[0],s=e[1],o=document.getElementById(`tile(${i}${s})`);o.style.background=""})}setMine(t,e,i){let s=this.turn.activePlayer;t.rowPos=e,t.colPos=i,this.positionsArray[e][i]+=t.digit;let o=s.storedMines.indexOf(t);s.storedMines.splice(o,1),s.setMines.push(t),this.turn.isPlacingMine=!1;let l=document.getElementById(`tile(${e}${i})`);l.style.borderColor="red"}async delay(t){return new Promise(e=>setTimeout(e,t))}async explosion(t,e){let i=document.getElementById(`tile(${t}${e})`);i.firstChild.src="./images/units/10.png",await this.delay(175);for(let s=1;s<9;s++)i.firstChild.src=`./images/explosion/Explosion-${s}.png`,await this.delay(150);i.firstChild.src="./images/units/0.png"}async mimicGif(t,e){let i=document.getElementById(`tile(${t}${e})`),s=3;for(;s>=0;){--s;for(let o=1;o<=3;++o)i.firstChild.src=`./images/mimic/Mimic-Frame${o}.png`,await this.delay(150);i.firstChild.src="./images/mimic/Mimic-Frame2.png",await this.delay(150)}i.firstChild.src="./images/units/0.png"}displayCheckedKing(){let t=this.turn,e=null;if(t.activePlayer.livingUnits.forEach(i=>{Math.abs(i.digit)===6&&(e=i)}),e===null)this.endGame();else if(uo.checkKing(e,this.positionsArray)){if(t.isChecked){t.isChecked=!1;let i=t.checkedTile;i.style.background="",i.style.borderColor=""}}else if(t.isChecked=!0,!t.activePlayer.allMoves.length>0)this.endGame();else{let i=e.rowPos,s=e.colPos;t.checkedTile=document.getElementById(`tile(${i}${s})`);let o=t.checkedTile;o.style.background="rgba(255, 115, 0, 0.45)",o.style.borderColor="red"}}async endGame(){this.isOver=!0,this.displayIntermediatoryScreen();const t=`game_${new Date().toISOString().replace(/[:.-]/g,"_")}`;await window.saveBoardStates(t,this)}getSerializableState(){const t=Object.keys(this.boardStates).map(e=>({moveNumber:parseInt(e),positionsArray:this.boardStates[e]}));return{boardStates:this.boardStates,boardStatesArray:t,gameStyle:this.style,timestamp:new Date().toISOString()}}displayStats(){let t=this.turn,e=t.activePlayer;this.displaySpecificUnits("lostUnits",e.lostUnits);let i=document.getElementById("mines");i.innerHTML="";let s=1;e.storedMines.forEach(u=>{if(s>3)return;s++;let h=document.createElement("div");h.className="lostUnitDiv";let f=document.createElement("img");f.className="lostUnitSprite",h.addEventListener("click",()=>{t.isMovingUnit&&this.hideMoves(t.displayedMoves),!t.isCloningUnit&&(t.isPlacingMine||(t.legalMinePositions=[],t.isPlacingMine=!0,f.src=u.activeSprite,t.isPlacingMine=!0,t.selectedMine=u,e.livingUnits.forEach(y=>{t.legalMinePositions.push([y.rowPos,y.colPos])}),this.settingMineDisplay()))}),h.addEventListener("mouseenter",()=>{t.isPlacingMine||(f.src=u.activeSprite)}),h.addEventListener("mouseleave",()=>{t.isPlacingMine||(f.src=u.inactiveSprite)}),f.src=u.inactiveSprite,h.appendChild(f),i.appendChild(h)});let o=document.getElementById("clones");o.innerHTML="";let l=e.clones;l>3&&(l=3);for(let u=0;u<4;u++){let h=document.createElement("div");h.className="lostUnitDiv";let f=document.createElement("img");if(f.className="lostUnitSprite",l>0)f.src="./images/CloneIcon.png";else return;h.appendChild(f),o.appendChild(h),--l}}displayIntermediatoryScreen(){let t=document.getElementById("board"),e=document.getElementsByClassName("tiles"),i=document.getElementById("boardScreen"),s=document.getElementById("displayScreen"),o=document.getElementById("goButton"),l=document.getElementById("playerName"),u=()=>{o.style.color="#000000",o.style.backgroundColor="#e39a7c",o.style.boxShadow="inset -2px -2px 0px 0px #cc655a"},h=()=>{o.style.color="#85362a",o.style.boxShadow="inset -2px -2px 0px 0px #da6b5fff"},f=()=>{o.style.color="#000000",o.style.backgroundColor="#4767a8",o.style.boxShadow="inset -2px -2px 0px 0px #33336bff"},y=()=>{o.style.color="#1b1940ff",o.style.boxShadow="inset -2px -2px 0px 0px #40406e"};this.turn.activePlayer===this.whitePlayer?(t.style.transform="",Array.from(e).forEach(v=>{v.style.transform=""}),this.isOver?(l.textContent="Player 2 Won!",f()):(l.textContent="Player 1",u()),o.addEventListener("mouseenter",()=>{this.isOver?y():h()}),o.addEventListener("mouseleave",()=>{this.isOver?f():u()})):(t.style.transform="rotate(180deg)",Array.from(e).forEach(v=>{v.style.transform="rotate(180deg)"}),this.isOver?(l.textContent="Player 1 Won!",u()):(l.textContent="Player 2",f()),o.addEventListener("mouseenter",()=>{this.isOver?h():y()}),o.addEventListener("mouseleave",()=>{this.isOver?u():f()})),i.className="screen",s.className="screen",this.isOver&&(o.textContent="Okay"),o.addEventListener("click",()=>{this.isOver&&(this.backToHomePage(),o.textContent="Start"),i.className="hidden",s.className="hidden",this.attemptCloning()})}endTurn(){if(this.turn.hasMoved&&!this.turn.isCloningUnit){this.turn.isPlacingMine&&(this.turn.isPlacingMine=!1,this.settingMineDisplay());let t=this.turn.activePlayer;t.setMines.forEach(o=>{let l=o.rowPos,u=o.colPos;this.positionsArray[l][u]-=10*t.sign;let h=document.getElementById(`tile(${l}${u})`);h.style.borderColor="#B3710E";let f=this.positionsArray[l][u];h.firstChild.src=`./images/units/${f}.png`,h.style.borderColor=""});let e=document.getElementsByClassName("button");e[3].id="endTurnInactive",this.turn.activePlayer===this.whitePlayer?this.turn.activePlayer=this.blackPlayer:this.turn.activePlayer=this.whitePlayer,this.isChecked=!1,this.turn.hasMoved=!1,this.turn.isMovingUnit=!1,this.turn.isPlacingMine=!1,this.turn.isCloningUnit=!1,this.turn.isPromotingPawn=!1,this.turn.selectedUnit=null,this.turn.displayedMoves={},this.turn.selectedMine=null,this.turn.legalMinePositions=[],this.selectedClone=null,this.legalClonePositions=[];let i=this.turn.activePlayer;t=i,i.setMines.forEach(o=>{let l=o.rowPos,u=o.colPos;this.positionsArray[l][u]+=10*i.sign;let h=document.getElementById(`tile(${l}${u})`);Math.abs(this.positionsArray[l][u])>10?h.style.borderColor="red":h.firstChild.src="./images/units/10.png"}),this.chest.tick(this.positionsArray),this.getPlayersMoves(),this.displayCheckedKing(),this.displayStats();let s=this.counts;this.boardStates[s]=structuredClone(this.positionsArray),this.isOver,++this.counts,this.displayIntermediatoryScreen(),console.log(this.boardStates)}}backToHomePage(){}}const Qc=()=>{};var ho={};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const va=function(n){const t=[];let e=0;for(let i=0;i<n.length;i++){let s=n.charCodeAt(i);s<128?t[e++]=s:s<2048?(t[e++]=s>>6|192,t[e++]=s&63|128):(s&64512)===55296&&i+1<n.length&&(n.charCodeAt(i+1)&64512)===56320?(s=65536+((s&1023)<<10)+(n.charCodeAt(++i)&1023),t[e++]=s>>18|240,t[e++]=s>>12&63|128,t[e++]=s>>6&63|128,t[e++]=s&63|128):(t[e++]=s>>12|224,t[e++]=s>>6&63|128,t[e++]=s&63|128)}return t},Xc=function(n){const t=[];let e=0,i=0;for(;e<n.length;){const s=n[e++];if(s<128)t[i++]=String.fromCharCode(s);else if(s>191&&s<224){const o=n[e++];t[i++]=String.fromCharCode((s&31)<<6|o&63)}else if(s>239&&s<365){const o=n[e++],l=n[e++],u=n[e++],h=((s&7)<<18|(o&63)<<12|(l&63)<<6|u&63)-65536;t[i++]=String.fromCharCode(55296+(h>>10)),t[i++]=String.fromCharCode(56320+(h&1023))}else{const o=n[e++],l=n[e++];t[i++]=String.fromCharCode((s&15)<<12|(o&63)<<6|l&63)}}return t.join("")},Ta={byteToCharMap_:null,charToByteMap_:null,byteToCharMapWebSafe_:null,charToByteMapWebSafe_:null,ENCODED_VALS_BASE:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",get ENCODED_VALS(){return this.ENCODED_VALS_BASE+"+/="},get ENCODED_VALS_WEBSAFE(){return this.ENCODED_VALS_BASE+"-_."},HAS_NATIVE_SUPPORT:typeof atob=="function",encodeByteArray(n,t){if(!Array.isArray(n))throw Error("encodeByteArray takes an array as a parameter");this.init_();const e=t?this.byteToCharMapWebSafe_:this.byteToCharMap_,i=[];for(let s=0;s<n.length;s+=3){const o=n[s],l=s+1<n.length,u=l?n[s+1]:0,h=s+2<n.length,f=h?n[s+2]:0,y=o>>2,v=(o&3)<<4|u>>4;let w=(u&15)<<2|f>>6,S=f&63;h||(S=64,l||(w=64)),i.push(e[y],e[v],e[w],e[S])}return i.join("")},encodeString(n,t){return this.HAS_NATIVE_SUPPORT&&!t?btoa(n):this.encodeByteArray(va(n),t)},decodeString(n,t){return this.HAS_NATIVE_SUPPORT&&!t?atob(n):Xc(this.decodeStringToByteArray(n,t))},decodeStringToByteArray(n,t){this.init_();const e=t?this.charToByteMapWebSafe_:this.charToByteMap_,i=[];for(let s=0;s<n.length;){const o=e[n.charAt(s++)],u=s<n.length?e[n.charAt(s)]:0;++s;const f=s<n.length?e[n.charAt(s)]:64;++s;const v=s<n.length?e[n.charAt(s)]:64;if(++s,o==null||u==null||f==null||v==null)throw new Jc;const w=o<<2|u>>4;if(i.push(w),f!==64){const S=u<<4&240|f>>2;if(i.push(S),v!==64){const R=f<<6&192|v;i.push(R)}}}return i},init_(){if(!this.byteToCharMap_){this.byteToCharMap_={},this.charToByteMap_={},this.byteToCharMapWebSafe_={},this.charToByteMapWebSafe_={};for(let n=0;n<this.ENCODED_VALS.length;n++)this.byteToCharMap_[n]=this.ENCODED_VALS.charAt(n),this.charToByteMap_[this.byteToCharMap_[n]]=n,this.byteToCharMapWebSafe_[n]=this.ENCODED_VALS_WEBSAFE.charAt(n),this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[n]]=n,n>=this.ENCODED_VALS_BASE.length&&(this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(n)]=n,this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(n)]=n)}}};class Jc extends Error{constructor(){super(...arguments),this.name="DecodeBase64StringError"}}const Yc=function(n){const t=va(n);return Ta.encodeByteArray(t,!0)},ti=function(n){return Yc(n).replace(/\./g,"")},Zc=function(n){try{return Ta.decodeString(n,!0)}catch(t){console.error("base64Decode failed: ",t)}return null};/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function tu(){if(typeof self<"u")return self;if(typeof window<"u")return window;if(typeof global<"u")return global;throw new Error("Unable to locate global object.")}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const eu=()=>tu().__FIREBASE_DEFAULTS__,nu=()=>{if(typeof process>"u"||typeof ho>"u")return;const n=ho.__FIREBASE_DEFAULTS__;if(n)return JSON.parse(n)},iu=()=>{if(typeof document>"u")return;let n;try{n=document.cookie.match(/__FIREBASE_DEFAULTS__=([^;]+)/)}catch{return}const t=n&&Zc(n[1]);return t&&JSON.parse(t)},Rr=()=>{try{return Qc()||eu()||nu()||iu()}catch(n){console.info(`Unable to get __FIREBASE_DEFAULTS__ due to: ${n}`);return}},ru=n=>Rr()?.emulatorHosts?.[n],su=n=>{const t=ru(n);if(!t)return;const e=t.lastIndexOf(":");if(e<=0||e+1===t.length)throw new Error(`Invalid host ${t} with no separate hostname and port!`);const i=parseInt(t.substring(e+1),10);return t[0]==="["?[t.substring(1,e-1),i]:[t.substring(0,e),i]},Ia=()=>Rr()?.config;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ou{constructor(){this.reject=()=>{},this.resolve=()=>{},this.promise=new Promise((t,e)=>{this.resolve=t,this.reject=e})}wrapCallback(t){return(e,i)=>{e?this.reject(e):this.resolve(i),typeof t=="function"&&(this.promise.catch(()=>{}),t.length===1?t(e):t(e,i))}}}/**
 * @license
 * Copyright 2025 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Vr(n){try{return(n.startsWith("http://")||n.startsWith("https://")?new URL(n).hostname:n).endsWith(".cloudworkstations.dev")}catch{return!1}}async function au(n){return(await fetch(n,{credentials:"include"})).ok}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function lu(n,t){if(n.uid)throw new Error('The "uid" field is no longer supported by mockUserToken. Please use "sub" instead for Firebase Auth User ID.');const e={alg:"none",type:"JWT"},i=t||"demo-project",s=n.iat||0,o=n.sub||n.user_id;if(!o)throw new Error("mockUserToken must contain 'sub' or 'user_id' field!");const l={iss:`https://securetoken.google.com/${i}`,aud:i,iat:s,exp:s+3600,auth_time:s,sub:o,user_id:o,firebase:{sign_in_provider:"custom",identities:{}},...n};return[ti(JSON.stringify(e)),ti(JSON.stringify(l)),""].join(".")}const en={};function cu(){const n={prod:[],emulator:[]};for(const t of Object.keys(en))en[t]?n.emulator.push(t):n.prod.push(t);return n}function uu(n){let t=document.getElementById(n),e=!1;return t||(t=document.createElement("div"),t.setAttribute("id",n),e=!0),{created:e,element:t}}let fo=!1;function hu(n,t){if(typeof window>"u"||typeof document>"u"||!Vr(window.location.host)||en[n]===t||en[n]||fo)return;en[n]=t;function e(w){return`__firebase__banner__${w}`}const i="__firebase__banner",o=cu().prod.length>0;function l(){const w=document.getElementById(i);w&&w.remove()}function u(w){w.style.display="flex",w.style.background="#7faaf0",w.style.position="fixed",w.style.bottom="5px",w.style.left="5px",w.style.padding=".5em",w.style.borderRadius="5px",w.style.alignItems="center"}function h(w,S){w.setAttribute("width","24"),w.setAttribute("id",S),w.setAttribute("height","24"),w.setAttribute("viewBox","0 0 24 24"),w.setAttribute("fill","none"),w.style.marginLeft="-6px"}function f(){const w=document.createElement("span");return w.style.cursor="pointer",w.style.marginLeft="16px",w.style.fontSize="24px",w.innerHTML=" &times;",w.onclick=()=>{fo=!0,l()},w}function y(w,S){w.setAttribute("id",S),w.innerText="Learn more",w.href="https://firebase.google.com/docs/studio/preview-apps#preview-backend",w.setAttribute("target","__blank"),w.style.paddingLeft="5px",w.style.textDecoration="underline"}function v(){const w=uu(i),S=e("text"),R=document.getElementById(S)||document.createElement("span"),k=e("learnmore"),D=document.getElementById(k)||document.createElement("a"),$=e("preprendIcon"),L=document.getElementById($)||document.createElementNS("http://www.w3.org/2000/svg","svg");if(w.created){const O=w.element;u(O),y(D,k);const nt=f();h(L,$),O.append(L,R,D,nt),document.body.appendChild(O)}o?(R.innerText="Preview backend disconnected.",L.innerHTML=`<g clip-path="url(#clip0_6013_33858)">
<path d="M4.8 17.6L12 5.6L19.2 17.6H4.8ZM6.91667 16.4H17.0833L12 7.93333L6.91667 16.4ZM12 15.6C12.1667 15.6 12.3056 15.5444 12.4167 15.4333C12.5389 15.3111 12.6 15.1667 12.6 15C12.6 14.8333 12.5389 14.6944 12.4167 14.5833C12.3056 14.4611 12.1667 14.4 12 14.4C11.8333 14.4 11.6889 14.4611 11.5667 14.5833C11.4556 14.6944 11.4 14.8333 11.4 15C11.4 15.1667 11.4556 15.3111 11.5667 15.4333C11.6889 15.5444 11.8333 15.6 12 15.6ZM11.4 13.6H12.6V10.4H11.4V13.6Z" fill="#212121"/>
</g>
<defs>
<clipPath id="clip0_6013_33858">
<rect width="24" height="24" fill="white"/>
</clipPath>
</defs>`):(L.innerHTML=`<g clip-path="url(#clip0_6083_34804)">
<path d="M11.4 15.2H12.6V11.2H11.4V15.2ZM12 10C12.1667 10 12.3056 9.94444 12.4167 9.83333C12.5389 9.71111 12.6 9.56667 12.6 9.4C12.6 9.23333 12.5389 9.09444 12.4167 8.98333C12.3056 8.86111 12.1667 8.8 12 8.8C11.8333 8.8 11.6889 8.86111 11.5667 8.98333C11.4556 9.09444 11.4 9.23333 11.4 9.4C11.4 9.56667 11.4556 9.71111 11.5667 9.83333C11.6889 9.94444 11.8333 10 12 10ZM12 18.4C11.1222 18.4 10.2944 18.2333 9.51667 17.9C8.73889 17.5667 8.05556 17.1111 7.46667 16.5333C6.88889 15.9444 6.43333 15.2611 6.1 14.4833C5.76667 13.7056 5.6 12.8778 5.6 12C5.6 11.1111 5.76667 10.2833 6.1 9.51667C6.43333 8.73889 6.88889 8.06111 7.46667 7.48333C8.05556 6.89444 8.73889 6.43333 9.51667 6.1C10.2944 5.76667 11.1222 5.6 12 5.6C12.8889 5.6 13.7167 5.76667 14.4833 6.1C15.2611 6.43333 15.9389 6.89444 16.5167 7.48333C17.1056 8.06111 17.5667 8.73889 17.9 9.51667C18.2333 10.2833 18.4 11.1111 18.4 12C18.4 12.8778 18.2333 13.7056 17.9 14.4833C17.5667 15.2611 17.1056 15.9444 16.5167 16.5333C15.9389 17.1111 15.2611 17.5667 14.4833 17.9C13.7167 18.2333 12.8889 18.4 12 18.4ZM12 17.2C13.4444 17.2 14.6722 16.6944 15.6833 15.6833C16.6944 14.6722 17.2 13.4444 17.2 12C17.2 10.5556 16.6944 9.32778 15.6833 8.31667C14.6722 7.30555 13.4444 6.8 12 6.8C10.5556 6.8 9.32778 7.30555 8.31667 8.31667C7.30556 9.32778 6.8 10.5556 6.8 12C6.8 13.4444 7.30556 14.6722 8.31667 15.6833C9.32778 16.6944 10.5556 17.2 12 17.2Z" fill="#212121"/>
</g>
<defs>
<clipPath id="clip0_6083_34804">
<rect width="24" height="24" fill="white"/>
</clipPath>
</defs>`,R.innerText="Preview backend running in this workspace."),R.setAttribute("id",S)}document.readyState==="loading"?window.addEventListener("DOMContentLoaded",v):v()}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function du(){return typeof navigator<"u"&&typeof navigator.userAgent=="string"?navigator.userAgent:""}function fu(){const n=Rr()?.forceEnvironment;if(n==="node")return!0;if(n==="browser")return!1;try{return Object.prototype.toString.call(global.process)==="[object process]"}catch{return!1}}function pu(){const n=typeof chrome=="object"?chrome.runtime:typeof browser=="object"?browser.runtime:void 0;return typeof n=="object"&&n.id!==void 0}function mu(){return!fu()&&!!navigator.userAgent&&navigator.userAgent.includes("Safari")&&!navigator.userAgent.includes("Chrome")}function wa(){try{return typeof indexedDB=="object"}catch{return!1}}function Aa(){return new Promise((n,t)=>{try{let e=!0;const i="validate-browser-context-for-indexeddb-analytics-module",s=self.indexedDB.open(i);s.onsuccess=()=>{s.result.close(),e||self.indexedDB.deleteDatabase(i),n(!0)},s.onupgradeneeded=()=>{e=!1},s.onerror=()=>{t(s.error?.message||"")}}catch(e){t(e)}})}function gu(){return!(typeof navigator>"u"||!navigator.cookieEnabled)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const yu="FirebaseError";class ne extends Error{constructor(t,e,i){super(e),this.code=t,this.customData=i,this.name=yu,Object.setPrototypeOf(this,ne.prototype),Error.captureStackTrace&&Error.captureStackTrace(this,gi.prototype.create)}}class gi{constructor(t,e,i){this.service=t,this.serviceName=e,this.errors=i}create(t,...e){const i=e[0]||{},s=`${this.service}/${t}`,o=this.errors[t],l=o?_u(o,i):"Error",u=`${this.serviceName}: ${l} (${s}).`;return new ne(s,u,i)}}function _u(n,t){return n.replace(Eu,(e,i)=>{const s=t[i];return s!=null?String(s):`<${i}?>`})}const Eu=/\{\$([^}]+)}/g;function cn(n,t){if(n===t)return!0;const e=Object.keys(n),i=Object.keys(t);for(const s of e){if(!i.includes(s))return!1;const o=n[s],l=t[s];if(po(o)&&po(l)){if(!cn(o,l))return!1}else if(o!==l)return!1}for(const s of i)if(!e.includes(s))return!1;return!0}function po(n){return n!==null&&typeof n=="object"}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const vu=1e3,Tu=2,Iu=14400*1e3,wu=.5;function mo(n,t=vu,e=Tu){const i=t*Math.pow(e,n),s=Math.round(wu*i*(Math.random()-.5)*2);return Math.min(Iu,i+s)}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Re(n){return n&&n._delegate?n._delegate:n}class qt{constructor(t,e,i){this.name=t,this.instanceFactory=e,this.type=i,this.multipleInstances=!1,this.serviceProps={},this.instantiationMode="LAZY",this.onInstanceCreated=null}setInstantiationMode(t){return this.instantiationMode=t,this}setMultipleInstances(t){return this.multipleInstances=t,this}setServiceProps(t){return this.serviceProps=t,this}setInstanceCreatedCallback(t){return this.onInstanceCreated=t,this}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ae="[DEFAULT]";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Au{constructor(t,e){this.name=t,this.container=e,this.component=null,this.instances=new Map,this.instancesDeferred=new Map,this.instancesOptions=new Map,this.onInitCallbacks=new Map}get(t){const e=this.normalizeInstanceIdentifier(t);if(!this.instancesDeferred.has(e)){const i=new ou;if(this.instancesDeferred.set(e,i),this.isInitialized(e)||this.shouldAutoInitialize())try{const s=this.getOrInitializeService({instanceIdentifier:e});s&&i.resolve(s)}catch{}}return this.instancesDeferred.get(e).promise}getImmediate(t){const e=this.normalizeInstanceIdentifier(t?.identifier),i=t?.optional??!1;if(this.isInitialized(e)||this.shouldAutoInitialize())try{return this.getOrInitializeService({instanceIdentifier:e})}catch(s){if(i)return null;throw s}else{if(i)return null;throw Error(`Service ${this.name} is not available`)}}getComponent(){return this.component}setComponent(t){if(t.name!==this.name)throw Error(`Mismatching Component ${t.name} for Provider ${this.name}.`);if(this.component)throw Error(`Component for ${this.name} has already been provided`);if(this.component=t,!!this.shouldAutoInitialize()){if(bu(t))try{this.getOrInitializeService({instanceIdentifier:ae})}catch{}for(const[e,i]of this.instancesDeferred.entries()){const s=this.normalizeInstanceIdentifier(e);try{const o=this.getOrInitializeService({instanceIdentifier:s});i.resolve(o)}catch{}}}}clearInstance(t=ae){this.instancesDeferred.delete(t),this.instancesOptions.delete(t),this.instances.delete(t)}async delete(){const t=Array.from(this.instances.values());await Promise.all([...t.filter(e=>"INTERNAL"in e).map(e=>e.INTERNAL.delete()),...t.filter(e=>"_delete"in e).map(e=>e._delete())])}isComponentSet(){return this.component!=null}isInitialized(t=ae){return this.instances.has(t)}getOptions(t=ae){return this.instancesOptions.get(t)||{}}initialize(t={}){const{options:e={}}=t,i=this.normalizeInstanceIdentifier(t.instanceIdentifier);if(this.isInitialized(i))throw Error(`${this.name}(${i}) has already been initialized`);if(!this.isComponentSet())throw Error(`Component ${this.name} has not been registered yet`);const s=this.getOrInitializeService({instanceIdentifier:i,options:e});for(const[o,l]of this.instancesDeferred.entries()){const u=this.normalizeInstanceIdentifier(o);i===u&&l.resolve(s)}return s}onInit(t,e){const i=this.normalizeInstanceIdentifier(e),s=this.onInitCallbacks.get(i)??new Set;s.add(t),this.onInitCallbacks.set(i,s);const o=this.instances.get(i);return o&&t(o,i),()=>{s.delete(t)}}invokeOnInitCallbacks(t,e){const i=this.onInitCallbacks.get(e);if(i)for(const s of i)try{s(t,e)}catch{}}getOrInitializeService({instanceIdentifier:t,options:e={}}){let i=this.instances.get(t);if(!i&&this.component&&(i=this.component.instanceFactory(this.container,{instanceIdentifier:Pu(t),options:e}),this.instances.set(t,i),this.instancesOptions.set(t,e),this.invokeOnInitCallbacks(i,t),this.component.onInstanceCreated))try{this.component.onInstanceCreated(this.container,t,i)}catch{}return i||null}normalizeInstanceIdentifier(t=ae){return this.component?this.component.multipleInstances?t:ae:t}shouldAutoInitialize(){return!!this.component&&this.component.instantiationMode!=="EXPLICIT"}}function Pu(n){return n===ae?void 0:n}function bu(n){return n.instantiationMode==="EAGER"}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Su{constructor(t){this.name=t,this.providers=new Map}addComponent(t){const e=this.getProvider(t.name);if(e.isComponentSet())throw new Error(`Component ${t.name} has already been registered with ${this.name}`);e.setComponent(t)}addOrOverwriteComponent(t){this.getProvider(t.name).isComponentSet()&&this.providers.delete(t.name),this.addComponent(t)}getProvider(t){if(this.providers.has(t))return this.providers.get(t);const e=new Au(t,this);return this.providers.set(t,e),e}getProviders(){return Array.from(this.providers.values())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var B;(function(n){n[n.DEBUG=0]="DEBUG",n[n.VERBOSE=1]="VERBOSE",n[n.INFO=2]="INFO",n[n.WARN=3]="WARN",n[n.ERROR=4]="ERROR",n[n.SILENT=5]="SILENT"})(B||(B={}));const Cu={debug:B.DEBUG,verbose:B.VERBOSE,info:B.INFO,warn:B.WARN,error:B.ERROR,silent:B.SILENT},Ru=B.INFO,Vu={[B.DEBUG]:"log",[B.VERBOSE]:"log",[B.INFO]:"info",[B.WARN]:"warn",[B.ERROR]:"error"},Du=(n,t,...e)=>{if(t<n.logLevel)return;const i=new Date().toISOString(),s=Vu[t];if(s)console[s](`[${i}]  ${n.name}:`,...e);else throw new Error(`Attempted to log a message with an invalid logType (value: ${t})`)};class Dr{constructor(t){this.name=t,this._logLevel=Ru,this._logHandler=Du,this._userLogHandler=null}get logLevel(){return this._logLevel}set logLevel(t){if(!(t in B))throw new TypeError(`Invalid value "${t}" assigned to \`logLevel\``);this._logLevel=t}setLogLevel(t){this._logLevel=typeof t=="string"?Cu[t]:t}get logHandler(){return this._logHandler}set logHandler(t){if(typeof t!="function")throw new TypeError("Value assigned to `logHandler` must be a function");this._logHandler=t}get userLogHandler(){return this._userLogHandler}set userLogHandler(t){this._userLogHandler=t}debug(...t){this._userLogHandler&&this._userLogHandler(this,B.DEBUG,...t),this._logHandler(this,B.DEBUG,...t)}log(...t){this._userLogHandler&&this._userLogHandler(this,B.VERBOSE,...t),this._logHandler(this,B.VERBOSE,...t)}info(...t){this._userLogHandler&&this._userLogHandler(this,B.INFO,...t),this._logHandler(this,B.INFO,...t)}warn(...t){this._userLogHandler&&this._userLogHandler(this,B.WARN,...t),this._logHandler(this,B.WARN,...t)}error(...t){this._userLogHandler&&this._userLogHandler(this,B.ERROR,...t),this._logHandler(this,B.ERROR,...t)}}const Mu=(n,t)=>t.some(e=>n instanceof e);let go,yo;function Nu(){return go||(go=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction])}function ku(){return yo||(yo=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey])}const Pa=new WeakMap,cr=new WeakMap,ba=new WeakMap,Yi=new WeakMap,Mr=new WeakMap;function Ou(n){const t=new Promise((e,i)=>{const s=()=>{n.removeEventListener("success",o),n.removeEventListener("error",l)},o=()=>{e(Qt(n.result)),s()},l=()=>{i(n.error),s()};n.addEventListener("success",o),n.addEventListener("error",l)});return t.then(e=>{e instanceof IDBCursor&&Pa.set(e,n)}).catch(()=>{}),Mr.set(t,n),t}function xu(n){if(cr.has(n))return;const t=new Promise((e,i)=>{const s=()=>{n.removeEventListener("complete",o),n.removeEventListener("error",l),n.removeEventListener("abort",l)},o=()=>{e(),s()},l=()=>{i(n.error||new DOMException("AbortError","AbortError")),s()};n.addEventListener("complete",o),n.addEventListener("error",l),n.addEventListener("abort",l)});cr.set(n,t)}let ur={get(n,t,e){if(n instanceof IDBTransaction){if(t==="done")return cr.get(n);if(t==="objectStoreNames")return n.objectStoreNames||ba.get(n);if(t==="store")return e.objectStoreNames[1]?void 0:e.objectStore(e.objectStoreNames[0])}return Qt(n[t])},set(n,t,e){return n[t]=e,!0},has(n,t){return n instanceof IDBTransaction&&(t==="done"||t==="store")?!0:t in n}};function Lu(n){ur=n(ur)}function Fu(n){return n===IDBDatabase.prototype.transaction&&!("objectStoreNames"in IDBTransaction.prototype)?function(t,...e){const i=n.call(Zi(this),t,...e);return ba.set(i,t.sort?t.sort():[t]),Qt(i)}:ku().includes(n)?function(...t){return n.apply(Zi(this),t),Qt(Pa.get(this))}:function(...t){return Qt(n.apply(Zi(this),t))}}function Uu(n){return typeof n=="function"?Fu(n):(n instanceof IDBTransaction&&xu(n),Mu(n,Nu())?new Proxy(n,ur):n)}function Qt(n){if(n instanceof IDBRequest)return Ou(n);if(Yi.has(n))return Yi.get(n);const t=Uu(n);return t!==n&&(Yi.set(n,t),Mr.set(t,n)),t}const Zi=n=>Mr.get(n);function Sa(n,t,{blocked:e,upgrade:i,blocking:s,terminated:o}={}){const l=indexedDB.open(n,t),u=Qt(l);return i&&l.addEventListener("upgradeneeded",h=>{i(Qt(l.result),h.oldVersion,h.newVersion,Qt(l.transaction),h)}),e&&l.addEventListener("blocked",h=>e(h.oldVersion,h.newVersion,h)),u.then(h=>{o&&h.addEventListener("close",()=>o()),s&&h.addEventListener("versionchange",f=>s(f.oldVersion,f.newVersion,f))}).catch(()=>{}),u}const Bu=["get","getKey","getAll","getAllKeys","count"],$u=["put","add","delete","clear"],tr=new Map;function _o(n,t){if(!(n instanceof IDBDatabase&&!(t in n)&&typeof t=="string"))return;if(tr.get(t))return tr.get(t);const e=t.replace(/FromIndex$/,""),i=t!==e,s=$u.includes(e);if(!(e in(i?IDBIndex:IDBObjectStore).prototype)||!(s||Bu.includes(e)))return;const o=async function(l,...u){const h=this.transaction(l,s?"readwrite":"readonly");let f=h.store;return i&&(f=f.index(u.shift())),(await Promise.all([f[e](...u),s&&h.done]))[0]};return tr.set(t,o),o}Lu(n=>({...n,get:(t,e,i)=>_o(t,e)||n.get(t,e,i),has:(t,e)=>!!_o(t,e)||n.has(t,e)}));/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ju{constructor(t){this.container=t}getPlatformInfoString(){return this.container.getProviders().map(e=>{if(qu(e)){const i=e.getImmediate();return`${i.library}/${i.version}`}else return null}).filter(e=>e).join(" ")}}function qu(n){return n.getComponent()?.type==="VERSION"}const hr="@firebase/app",Eo="0.14.1";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const zt=new Dr("@firebase/app"),zu="@firebase/app-compat",Hu="@firebase/analytics-compat",Gu="@firebase/analytics",Wu="@firebase/app-check-compat",Ku="@firebase/app-check",Qu="@firebase/auth",Xu="@firebase/auth-compat",Ju="@firebase/database",Yu="@firebase/data-connect",Zu="@firebase/database-compat",th="@firebase/functions",eh="@firebase/functions-compat",nh="@firebase/installations",ih="@firebase/installations-compat",rh="@firebase/messaging",sh="@firebase/messaging-compat",oh="@firebase/performance",ah="@firebase/performance-compat",lh="@firebase/remote-config",ch="@firebase/remote-config-compat",uh="@firebase/storage",hh="@firebase/storage-compat",dh="@firebase/firestore",fh="@firebase/ai",ph="@firebase/firestore-compat",mh="firebase",gh="12.1.0";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const dr="[DEFAULT]",yh={[hr]:"fire-core",[zu]:"fire-core-compat",[Gu]:"fire-analytics",[Hu]:"fire-analytics-compat",[Ku]:"fire-app-check",[Wu]:"fire-app-check-compat",[Qu]:"fire-auth",[Xu]:"fire-auth-compat",[Ju]:"fire-rtdb",[Yu]:"fire-data-connect",[Zu]:"fire-rtdb-compat",[th]:"fire-fn",[eh]:"fire-fn-compat",[nh]:"fire-iid",[ih]:"fire-iid-compat",[rh]:"fire-fcm",[sh]:"fire-fcm-compat",[oh]:"fire-perf",[ah]:"fire-perf-compat",[lh]:"fire-rc",[ch]:"fire-rc-compat",[uh]:"fire-gcs",[hh]:"fire-gcs-compat",[dh]:"fire-fst",[ph]:"fire-fst-compat",[fh]:"fire-vertex","fire-js":"fire-js",[mh]:"fire-js-all"};/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ei=new Map,_h=new Map,fr=new Map;function vo(n,t){try{n.container.addComponent(t)}catch(e){zt.debug(`Component ${t.name} failed to register with FirebaseApp ${n.name}`,e)}}function Jt(n){const t=n.name;if(fr.has(t))return zt.debug(`There were multiple attempts to register component ${t}.`),!1;fr.set(t,n);for(const e of ei.values())vo(e,n);for(const e of _h.values())vo(e,n);return!0}function gn(n,t){const e=n.container.getProvider("heartbeat").getImmediate({optional:!0});return e&&e.triggerHeartbeat(),n.container.getProvider(t)}function Eh(n){return n==null?!1:n.settings!==void 0}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const vh={"no-app":"No Firebase App '{$appName}' has been created - call initializeApp() first","bad-app-name":"Illegal App name: '{$appName}'","duplicate-app":"Firebase App named '{$appName}' already exists with different options or config","app-deleted":"Firebase App named '{$appName}' already deleted","server-app-deleted":"Firebase Server App has been deleted","no-options":"Need to provide options, when not being deployed to hosting via source.","invalid-app-argument":"firebase.{$appName}() takes either no argument or a Firebase App instance.","invalid-log-argument":"First argument to `onLog` must be null or a function.","idb-open":"Error thrown when opening IndexedDB. Original error: {$originalErrorMessage}.","idb-get":"Error thrown when reading from IndexedDB. Original error: {$originalErrorMessage}.","idb-set":"Error thrown when writing to IndexedDB. Original error: {$originalErrorMessage}.","idb-delete":"Error thrown when deleting from IndexedDB. Original error: {$originalErrorMessage}.","finalization-registry-not-supported":"FirebaseServerApp deleteOnDeref field defined but the JS runtime does not support FinalizationRegistry.","invalid-server-app-environment":"FirebaseServerApp is not for use in browser environments."},Xt=new gi("app","Firebase",vh);/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Th{constructor(t,e,i){this._isDeleted=!1,this._options={...t},this._config={...e},this._name=e.name,this._automaticDataCollectionEnabled=e.automaticDataCollectionEnabled,this._container=i,this.container.addComponent(new qt("app",()=>this,"PUBLIC"))}get automaticDataCollectionEnabled(){return this.checkDestroyed(),this._automaticDataCollectionEnabled}set automaticDataCollectionEnabled(t){this.checkDestroyed(),this._automaticDataCollectionEnabled=t}get name(){return this.checkDestroyed(),this._name}get options(){return this.checkDestroyed(),this._options}get config(){return this.checkDestroyed(),this._config}get container(){return this._container}get isDeleted(){return this._isDeleted}set isDeleted(t){this._isDeleted=t}checkDestroyed(){if(this.isDeleted)throw Xt.create("app-deleted",{appName:this._name})}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ih=gh;function Ca(n,t={}){let e=n;typeof t!="object"&&(t={name:t});const i={name:dr,automaticDataCollectionEnabled:!0,...t},s=i.name;if(typeof s!="string"||!s)throw Xt.create("bad-app-name",{appName:String(s)});if(e||(e=Ia()),!e)throw Xt.create("no-options");const o=ei.get(s);if(o){if(cn(e,o.options)&&cn(i,o.config))return o;throw Xt.create("duplicate-app",{appName:s})}const l=new Su(s);for(const h of fr.values())l.addComponent(h);const u=new Th(e,i,l);return ei.set(s,u),u}function Ra(n=dr){const t=ei.get(n);if(!t&&n===dr&&Ia())return Ca();if(!t)throw Xt.create("no-app",{appName:n});return t}function Ot(n,t,e){let i=yh[n]??n;e&&(i+=`-${e}`);const s=i.match(/\s|\//),o=t.match(/\s|\//);if(s||o){const l=[`Unable to register library "${i}" with version "${t}":`];s&&l.push(`library name "${i}" contains illegal characters (whitespace or "/")`),s&&o&&l.push("and"),o&&l.push(`version name "${t}" contains illegal characters (whitespace or "/")`),zt.warn(l.join(" "));return}Jt(new qt(`${i}-version`,()=>({library:i,version:t}),"VERSION"))}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const wh="firebase-heartbeat-database",Ah=1,un="firebase-heartbeat-store";let er=null;function Va(){return er||(er=Sa(wh,Ah,{upgrade:(n,t)=>{switch(t){case 0:try{n.createObjectStore(un)}catch(e){console.warn(e)}}}}).catch(n=>{throw Xt.create("idb-open",{originalErrorMessage:n.message})})),er}async function Ph(n){try{const e=(await Va()).transaction(un),i=await e.objectStore(un).get(Da(n));return await e.done,i}catch(t){if(t instanceof ne)zt.warn(t.message);else{const e=Xt.create("idb-get",{originalErrorMessage:t?.message});zt.warn(e.message)}}}async function To(n,t){try{const i=(await Va()).transaction(un,"readwrite");await i.objectStore(un).put(t,Da(n)),await i.done}catch(e){if(e instanceof ne)zt.warn(e.message);else{const i=Xt.create("idb-set",{originalErrorMessage:e?.message});zt.warn(i.message)}}}function Da(n){return`${n.name}!${n.options.appId}`}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const bh=1024,Sh=30;class Ch{constructor(t){this.container=t,this._heartbeatsCache=null;const e=this.container.getProvider("app").getImmediate();this._storage=new Vh(e),this._heartbeatsCachePromise=this._storage.read().then(i=>(this._heartbeatsCache=i,i))}async triggerHeartbeat(){try{const e=this.container.getProvider("platform-logger").getImmediate().getPlatformInfoString(),i=Io();if(this._heartbeatsCache?.heartbeats==null&&(this._heartbeatsCache=await this._heartbeatsCachePromise,this._heartbeatsCache?.heartbeats==null)||this._heartbeatsCache.lastSentHeartbeatDate===i||this._heartbeatsCache.heartbeats.some(s=>s.date===i))return;if(this._heartbeatsCache.heartbeats.push({date:i,agent:e}),this._heartbeatsCache.heartbeats.length>Sh){const s=Dh(this._heartbeatsCache.heartbeats);this._heartbeatsCache.heartbeats.splice(s,1)}return this._storage.overwrite(this._heartbeatsCache)}catch(t){zt.warn(t)}}async getHeartbeatsHeader(){try{if(this._heartbeatsCache===null&&await this._heartbeatsCachePromise,this._heartbeatsCache?.heartbeats==null||this._heartbeatsCache.heartbeats.length===0)return"";const t=Io(),{heartbeatsToSend:e,unsentEntries:i}=Rh(this._heartbeatsCache.heartbeats),s=ti(JSON.stringify({version:2,heartbeats:e}));return this._heartbeatsCache.lastSentHeartbeatDate=t,i.length>0?(this._heartbeatsCache.heartbeats=i,await this._storage.overwrite(this._heartbeatsCache)):(this._heartbeatsCache.heartbeats=[],this._storage.overwrite(this._heartbeatsCache)),s}catch(t){return zt.warn(t),""}}}function Io(){return new Date().toISOString().substring(0,10)}function Rh(n,t=bh){const e=[];let i=n.slice();for(const s of n){const o=e.find(l=>l.agent===s.agent);if(o){if(o.dates.push(s.date),wo(e)>t){o.dates.pop();break}}else if(e.push({agent:s.agent,dates:[s.date]}),wo(e)>t){e.pop();break}i=i.slice(1)}return{heartbeatsToSend:e,unsentEntries:i}}class Vh{constructor(t){this.app=t,this._canUseIndexedDBPromise=this.runIndexedDBEnvironmentCheck()}async runIndexedDBEnvironmentCheck(){return wa()?Aa().then(()=>!0).catch(()=>!1):!1}async read(){if(await this._canUseIndexedDBPromise){const e=await Ph(this.app);return e?.heartbeats?e:{heartbeats:[]}}else return{heartbeats:[]}}async overwrite(t){if(await this._canUseIndexedDBPromise){const i=await this.read();return To(this.app,{lastSentHeartbeatDate:t.lastSentHeartbeatDate??i.lastSentHeartbeatDate,heartbeats:t.heartbeats})}else return}async add(t){if(await this._canUseIndexedDBPromise){const i=await this.read();return To(this.app,{lastSentHeartbeatDate:t.lastSentHeartbeatDate??i.lastSentHeartbeatDate,heartbeats:[...i.heartbeats,...t.heartbeats]})}else return}}function wo(n){return ti(JSON.stringify({version:2,heartbeats:n})).length}function Dh(n){if(n.length===0)return-1;let t=0,e=n[0].date;for(let i=1;i<n.length;i++)n[i].date<e&&(e=n[i].date,t=i);return t}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Mh(n){Jt(new qt("platform-logger",t=>new ju(t),"PRIVATE")),Jt(new qt("heartbeat",t=>new Ch(t),"PRIVATE")),Ot(hr,Eo,n),Ot(hr,Eo,"esm2020"),Ot("fire-js","")}Mh("");var Nh="firebase",kh="12.1.0";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */Ot(Nh,kh,"app");const Ma="@firebase/installations",Nr="0.6.19";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Na=1e4,ka=`w:${Nr}`,Oa="FIS_v2",Oh="https://firebaseinstallations.googleapis.com/v1",xh=3600*1e3,Lh="installations",Fh="Installations";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Uh={"missing-app-config-values":'Missing App configuration value: "{$valueName}"',"not-registered":"Firebase Installation is not registered.","installation-not-found":"Firebase Installation not found.","request-failed":'{$requestName} request failed with error "{$serverCode} {$serverStatus}: {$serverMessage}"',"app-offline":"Could not process request. Application offline.","delete-pending-registration":"Can't delete installation while there is a pending registration request."},de=new gi(Lh,Fh,Uh);function xa(n){return n instanceof ne&&n.code.includes("request-failed")}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function La({projectId:n}){return`${Oh}/projects/${n}/installations`}function Fa(n){return{token:n.token,requestStatus:2,expiresIn:$h(n.expiresIn),creationTime:Date.now()}}async function Ua(n,t){const i=(await t.json()).error;return de.create("request-failed",{requestName:n,serverCode:i.code,serverMessage:i.message,serverStatus:i.status})}function Ba({apiKey:n}){return new Headers({"Content-Type":"application/json",Accept:"application/json","x-goog-api-key":n})}function Bh(n,{refreshToken:t}){const e=Ba(n);return e.append("Authorization",jh(t)),e}async function $a(n){const t=await n();return t.status>=500&&t.status<600?n():t}function $h(n){return Number(n.replace("s","000"))}function jh(n){return`${Oa} ${n}`}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function qh({appConfig:n,heartbeatServiceProvider:t},{fid:e}){const i=La(n),s=Ba(n),o=t.getImmediate({optional:!0});if(o){const f=await o.getHeartbeatsHeader();f&&s.append("x-firebase-client",f)}const l={fid:e,authVersion:Oa,appId:n.appId,sdkVersion:ka},u={method:"POST",headers:s,body:JSON.stringify(l)},h=await $a(()=>fetch(i,u));if(h.ok){const f=await h.json();return{fid:f.fid||e,registrationStatus:2,refreshToken:f.refreshToken,authToken:Fa(f.authToken)}}else throw await Ua("Create Installation",h)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ja(n){return new Promise(t=>{setTimeout(t,n)})}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function zh(n){return btoa(String.fromCharCode(...n)).replace(/\+/g,"-").replace(/\//g,"_")}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Hh=/^[cdef][\w-]{21}$/,pr="";function Gh(){try{const n=new Uint8Array(17);(self.crypto||self.msCrypto).getRandomValues(n),n[0]=112+n[0]%16;const e=Wh(n);return Hh.test(e)?e:pr}catch{return pr}}function Wh(n){return zh(n).substr(0,22)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function yi(n){return`${n.appName}!${n.appId}`}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const qa=new Map;function za(n,t){const e=yi(n);Ha(e,t),Kh(e,t)}function Ha(n,t){const e=qa.get(n);if(e)for(const i of e)i(t)}function Kh(n,t){const e=Qh();e&&e.postMessage({key:n,fid:t}),Xh()}let le=null;function Qh(){return!le&&"BroadcastChannel"in self&&(le=new BroadcastChannel("[Firebase] FID Change"),le.onmessage=n=>{Ha(n.data.key,n.data.fid)}),le}function Xh(){qa.size===0&&le&&(le.close(),le=null)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Jh="firebase-installations-database",Yh=1,fe="firebase-installations-store";let nr=null;function kr(){return nr||(nr=Sa(Jh,Yh,{upgrade:(n,t)=>{switch(t){case 0:n.createObjectStore(fe)}}})),nr}async function ni(n,t){const e=yi(n),s=(await kr()).transaction(fe,"readwrite"),o=s.objectStore(fe),l=await o.get(e);return await o.put(t,e),await s.done,(!l||l.fid!==t.fid)&&za(n,t.fid),t}async function Ga(n){const t=yi(n),i=(await kr()).transaction(fe,"readwrite");await i.objectStore(fe).delete(t),await i.done}async function _i(n,t){const e=yi(n),s=(await kr()).transaction(fe,"readwrite"),o=s.objectStore(fe),l=await o.get(e),u=t(l);return u===void 0?await o.delete(e):await o.put(u,e),await s.done,u&&(!l||l.fid!==u.fid)&&za(n,u.fid),u}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Or(n){let t;const e=await _i(n.appConfig,i=>{const s=Zh(i),o=td(n,s);return t=o.registrationPromise,o.installationEntry});return e.fid===pr?{installationEntry:await t}:{installationEntry:e,registrationPromise:t}}function Zh(n){const t=n||{fid:Gh(),registrationStatus:0};return Wa(t)}function td(n,t){if(t.registrationStatus===0){if(!navigator.onLine){const s=Promise.reject(de.create("app-offline"));return{installationEntry:t,registrationPromise:s}}const e={fid:t.fid,registrationStatus:1,registrationTime:Date.now()},i=ed(n,e);return{installationEntry:e,registrationPromise:i}}else return t.registrationStatus===1?{installationEntry:t,registrationPromise:nd(n)}:{installationEntry:t}}async function ed(n,t){try{const e=await qh(n,t);return ni(n.appConfig,e)}catch(e){throw xa(e)&&e.customData.serverCode===409?await Ga(n.appConfig):await ni(n.appConfig,{fid:t.fid,registrationStatus:0}),e}}async function nd(n){let t=await Ao(n.appConfig);for(;t.registrationStatus===1;)await ja(100),t=await Ao(n.appConfig);if(t.registrationStatus===0){const{installationEntry:e,registrationPromise:i}=await Or(n);return i||e}return t}function Ao(n){return _i(n,t=>{if(!t)throw de.create("installation-not-found");return Wa(t)})}function Wa(n){return id(n)?{fid:n.fid,registrationStatus:0}:n}function id(n){return n.registrationStatus===1&&n.registrationTime+Na<Date.now()}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function rd({appConfig:n,heartbeatServiceProvider:t},e){const i=sd(n,e),s=Bh(n,e),o=t.getImmediate({optional:!0});if(o){const f=await o.getHeartbeatsHeader();f&&s.append("x-firebase-client",f)}const l={installation:{sdkVersion:ka,appId:n.appId}},u={method:"POST",headers:s,body:JSON.stringify(l)},h=await $a(()=>fetch(i,u));if(h.ok){const f=await h.json();return Fa(f)}else throw await Ua("Generate Auth Token",h)}function sd(n,{fid:t}){return`${La(n)}/${t}/authTokens:generate`}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function xr(n,t=!1){let e;const i=await _i(n.appConfig,o=>{if(!Ka(o))throw de.create("not-registered");const l=o.authToken;if(!t&&ld(l))return o;if(l.requestStatus===1)return e=od(n,t),o;{if(!navigator.onLine)throw de.create("app-offline");const u=ud(o);return e=ad(n,u),u}});return e?await e:i.authToken}async function od(n,t){let e=await Po(n.appConfig);for(;e.authToken.requestStatus===1;)await ja(100),e=await Po(n.appConfig);const i=e.authToken;return i.requestStatus===0?xr(n,t):i}function Po(n){return _i(n,t=>{if(!Ka(t))throw de.create("not-registered");const e=t.authToken;return hd(e)?{...t,authToken:{requestStatus:0}}:t})}async function ad(n,t){try{const e=await rd(n,t),i={...t,authToken:e};return await ni(n.appConfig,i),e}catch(e){if(xa(e)&&(e.customData.serverCode===401||e.customData.serverCode===404))await Ga(n.appConfig);else{const i={...t,authToken:{requestStatus:0}};await ni(n.appConfig,i)}throw e}}function Ka(n){return n!==void 0&&n.registrationStatus===2}function ld(n){return n.requestStatus===2&&!cd(n)}function cd(n){const t=Date.now();return t<n.creationTime||n.creationTime+n.expiresIn<t+xh}function ud(n){const t={requestStatus:1,requestTime:Date.now()};return{...n,authToken:t}}function hd(n){return n.requestStatus===1&&n.requestTime+Na<Date.now()}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function dd(n){const t=n,{installationEntry:e,registrationPromise:i}=await Or(t);return i?i.catch(console.error):xr(t).catch(console.error),e.fid}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function fd(n,t=!1){const e=n;return await pd(e),(await xr(e,t)).token}async function pd(n){const{registrationPromise:t}=await Or(n);t&&await t}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function md(n){if(!n||!n.options)throw ir("App Configuration");if(!n.name)throw ir("App Name");const t=["projectId","apiKey","appId"];for(const e of t)if(!n.options[e])throw ir(e);return{appName:n.name,projectId:n.options.projectId,apiKey:n.options.apiKey,appId:n.options.appId}}function ir(n){return de.create("missing-app-config-values",{valueName:n})}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Qa="installations",gd="installations-internal",yd=n=>{const t=n.getProvider("app").getImmediate(),e=md(t),i=gn(t,"heartbeat");return{app:t,appConfig:e,heartbeatServiceProvider:i,_delete:()=>Promise.resolve()}},_d=n=>{const t=n.getProvider("app").getImmediate(),e=gn(t,Qa).getImmediate();return{getId:()=>dd(e),getToken:s=>fd(e,s)}};function Ed(){Jt(new qt(Qa,yd,"PUBLIC")),Jt(new qt(gd,_d,"PRIVATE"))}Ed();Ot(Ma,Nr);Ot(Ma,Nr,"esm2020");/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ii="analytics",vd="firebase_id",Td="origin",Id=60*1e3,wd="https://firebase.googleapis.com/v1alpha/projects/-/apps/{app-id}/webConfig",Lr="https://www.googletagmanager.com/gtag/js";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const wt=new Dr("@firebase/analytics");/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ad={"already-exists":"A Firebase Analytics instance with the appId {$id}  already exists. Only one Firebase Analytics instance can be created for each appId.","already-initialized":"initializeAnalytics() cannot be called again with different options than those it was initially called with. It can be called again with the same options to return the existing instance, or getAnalytics() can be used to get a reference to the already-initialized instance.","already-initialized-settings":"Firebase Analytics has already been initialized.settings() must be called before initializing any Analytics instanceor it will have no effect.","interop-component-reg-failed":"Firebase Analytics Interop Component failed to instantiate: {$reason}","invalid-analytics-context":"Firebase Analytics is not supported in this environment. Wrap initialization of analytics in analytics.isSupported() to prevent initialization in unsupported environments. Details: {$errorInfo}","indexeddb-unavailable":"IndexedDB unavailable or restricted in this environment. Wrap initialization of analytics in analytics.isSupported() to prevent initialization in unsupported environments. Details: {$errorInfo}","fetch-throttle":"The config fetch request timed out while in an exponential backoff state. Unix timestamp in milliseconds when fetch request throttling ends: {$throttleEndTimeMillis}.","config-fetch-failed":"Dynamic config fetch failed: [{$httpStatus}] {$responseMessage}","no-api-key":'The "apiKey" field is empty in the local Firebase config. Firebase Analytics requires this field tocontain a valid API key.',"no-app-id":'The "appId" field is empty in the local Firebase config. Firebase Analytics requires this field tocontain a valid app ID.',"no-client-id":'The "client_id" field is empty.',"invalid-gtag-resource":"Trusted Types detected an invalid gtag resource: {$gtagURL}."},St=new gi("analytics","Analytics",Ad);/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Pd(n){if(!n.startsWith(Lr)){const t=St.create("invalid-gtag-resource",{gtagURL:n});return wt.warn(t.message),""}return n}function Xa(n){return Promise.all(n.map(t=>t.catch(e=>e)))}function bd(n,t){let e;return window.trustedTypes&&(e=window.trustedTypes.createPolicy(n,t)),e}function Sd(n,t){const e=bd("firebase-js-sdk-policy",{createScriptURL:Pd}),i=document.createElement("script"),s=`${Lr}?l=${n}&id=${t}`;i.src=e?e?.createScriptURL(s):s,i.async=!0,document.head.appendChild(i)}function Cd(n){let t=[];return Array.isArray(window[n])?t=window[n]:window[n]=t,t}async function Rd(n,t,e,i,s,o){const l=i[s];try{if(l)await t[l];else{const h=(await Xa(e)).find(f=>f.measurementId===s);h&&await t[h.appId]}}catch(u){wt.error(u)}n("config",s,o)}async function Vd(n,t,e,i,s){try{let o=[];if(s&&s.send_to){let l=s.send_to;Array.isArray(l)||(l=[l]);const u=await Xa(e);for(const h of l){const f=u.find(v=>v.measurementId===h),y=f&&t[f.appId];if(y)o.push(y);else{o=[];break}}}o.length===0&&(o=Object.values(t)),await Promise.all(o),n("event",i,s||{})}catch(o){wt.error(o)}}function Dd(n,t,e,i){async function s(o,...l){try{if(o==="event"){const[u,h]=l;await Vd(n,t,e,u,h)}else if(o==="config"){const[u,h]=l;await Rd(n,t,e,i,u,h)}else if(o==="consent"){const[u,h]=l;n("consent",u,h)}else if(o==="get"){const[u,h,f]=l;n("get",u,h,f)}else if(o==="set"){const[u]=l;n("set",u)}else n(o,...l)}catch(u){wt.error(u)}}return s}function Md(n,t,e,i,s){let o=function(...l){window[i].push(arguments)};return window[s]&&typeof window[s]=="function"&&(o=window[s]),window[s]=Dd(o,n,t,e),{gtagCore:o,wrappedGtag:window[s]}}function Nd(n){const t=window.document.getElementsByTagName("script");for(const e of Object.values(t))if(e.src&&e.src.includes(Lr)&&e.src.includes(n))return e;return null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const kd=30,Od=1e3;class xd{constructor(t={},e=Od){this.throttleMetadata=t,this.intervalMillis=e}getThrottleMetadata(t){return this.throttleMetadata[t]}setThrottleMetadata(t,e){this.throttleMetadata[t]=e}deleteThrottleMetadata(t){delete this.throttleMetadata[t]}}const Ja=new xd;function Ld(n){return new Headers({Accept:"application/json","x-goog-api-key":n})}async function Fd(n){const{appId:t,apiKey:e}=n,i={method:"GET",headers:Ld(e)},s=wd.replace("{app-id}",t),o=await fetch(s,i);if(o.status!==200&&o.status!==304){let l="";try{const u=await o.json();u.error?.message&&(l=u.error.message)}catch{}throw St.create("config-fetch-failed",{httpStatus:o.status,responseMessage:l})}return o.json()}async function Ud(n,t=Ja,e){const{appId:i,apiKey:s,measurementId:o}=n.options;if(!i)throw St.create("no-app-id");if(!s){if(o)return{measurementId:o,appId:i};throw St.create("no-api-key")}const l=t.getThrottleMetadata(i)||{backoffCount:0,throttleEndTimeMillis:Date.now()},u=new jd;return setTimeout(async()=>{u.abort()},Id),Ya({appId:i,apiKey:s,measurementId:o},l,u,t)}async function Ya(n,{throttleEndTimeMillis:t,backoffCount:e},i,s=Ja){const{appId:o,measurementId:l}=n;try{await Bd(i,t)}catch(u){if(l)return wt.warn(`Timed out fetching this Firebase app's measurement ID from the server. Falling back to the measurement ID ${l} provided in the "measurementId" field in the local Firebase config. [${u?.message}]`),{appId:o,measurementId:l};throw u}try{const u=await Fd(n);return s.deleteThrottleMetadata(o),u}catch(u){const h=u;if(!$d(h)){if(s.deleteThrottleMetadata(o),l)return wt.warn(`Failed to fetch this Firebase app's measurement ID from the server. Falling back to the measurement ID ${l} provided in the "measurementId" field in the local Firebase config. [${h?.message}]`),{appId:o,measurementId:l};throw u}const f=Number(h?.customData?.httpStatus)===503?mo(e,s.intervalMillis,kd):mo(e,s.intervalMillis),y={throttleEndTimeMillis:Date.now()+f,backoffCount:e+1};return s.setThrottleMetadata(o,y),wt.debug(`Calling attemptFetch again in ${f} millis`),Ya(n,y,i,s)}}function Bd(n,t){return new Promise((e,i)=>{const s=Math.max(t-Date.now(),0),o=setTimeout(e,s);n.addEventListener(()=>{clearTimeout(o),i(St.create("fetch-throttle",{throttleEndTimeMillis:t}))})})}function $d(n){if(!(n instanceof ne)||!n.customData)return!1;const t=Number(n.customData.httpStatus);return t===429||t===500||t===503||t===504}class jd{constructor(){this.listeners=[]}addEventListener(t){this.listeners.push(t)}abort(){this.listeners.forEach(t=>t())}}async function qd(n,t,e,i,s){if(s&&s.global){n("event",e,i);return}else{const o=await t,l={...i,send_to:o};n("event",e,l)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function zd(){if(wa())try{await Aa()}catch(n){return wt.warn(St.create("indexeddb-unavailable",{errorInfo:n?.toString()}).message),!1}else return wt.warn(St.create("indexeddb-unavailable",{errorInfo:"IndexedDB is not available in this environment."}).message),!1;return!0}async function Hd(n,t,e,i,s,o,l){const u=Ud(n);u.then(w=>{e[w.measurementId]=w.appId,n.options.measurementId&&w.measurementId!==n.options.measurementId&&wt.warn(`The measurement ID in the local Firebase config (${n.options.measurementId}) does not match the measurement ID fetched from the server (${w.measurementId}). To ensure analytics events are always sent to the correct Analytics property, update the measurement ID field in the local config or remove it from the local config.`)}).catch(w=>wt.error(w)),t.push(u);const h=zd().then(w=>{if(w)return i.getId()}),[f,y]=await Promise.all([u,h]);Nd(o)||Sd(o,f.measurementId),s("js",new Date);const v=l?.config??{};return v[Td]="firebase",v.update=!0,y!=null&&(v[vd]=y),s("config",f.measurementId,v),f.measurementId}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Gd{constructor(t){this.app=t}_delete(){return delete nn[this.app.options.appId],Promise.resolve()}}let nn={},bo=[];const So={};let rr="dataLayer",Wd="gtag",Co,Za,Ro=!1;function Kd(){const n=[];if(pu()&&n.push("This is a browser extension environment."),gu()||n.push("Cookies are not available."),n.length>0){const t=n.map((i,s)=>`(${s+1}) ${i}`).join(" "),e=St.create("invalid-analytics-context",{errorInfo:t});wt.warn(e.message)}}function Qd(n,t,e){Kd();const i=n.options.appId;if(!i)throw St.create("no-app-id");if(!n.options.apiKey)if(n.options.measurementId)wt.warn(`The "apiKey" field is empty in the local Firebase config. This is needed to fetch the latest measurement ID for this Firebase app. Falling back to the measurement ID ${n.options.measurementId} provided in the "measurementId" field in the local Firebase config.`);else throw St.create("no-api-key");if(nn[i]!=null)throw St.create("already-exists",{id:i});if(!Ro){Cd(rr);const{wrappedGtag:o,gtagCore:l}=Md(nn,bo,So,rr,Wd);Za=o,Co=l,Ro=!0}return nn[i]=Hd(n,bo,So,t,Co,rr,e),new Gd(n)}function Xd(n=Ra()){n=Re(n);const t=gn(n,ii);return t.isInitialized()?t.getImmediate():Jd(n)}function Jd(n,t={}){const e=gn(n,ii);if(e.isInitialized()){const s=e.getImmediate();if(cn(t,e.getOptions()))return s;throw St.create("already-initialized")}return e.initialize({options:t})}function Yd(n,t,e,i){n=Re(n),qd(Za,nn[n.app.options.appId],t,e,i).catch(s=>wt.error(s))}const Vo="@firebase/analytics",Do="0.10.18";function Zd(){Jt(new qt(ii,(t,{options:e})=>{const i=t.getProvider("app").getImmediate(),s=t.getProvider("installations-internal").getImmediate();return Qd(i,s,e)},"PUBLIC")),Jt(new qt("analytics-internal",n,"PRIVATE")),Ot(Vo,Do),Ot(Vo,Do,"esm2020");function n(t){try{const e=t.getProvider(ii).getImmediate();return{logEvent:(i,s,o)=>Yd(e,i,s,o)}}catch(e){throw St.create("interop-component-reg-failed",{reason:e})}}}Zd();var Mo=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};/** @license
Copyright The Closure Library Authors.
SPDX-License-Identifier: Apache-2.0
*/var Fr;(function(){var n;/** @license

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/function t(_,p){function m(){}m.prototype=p.prototype,_.D=p.prototype,_.prototype=new m,_.prototype.constructor=_,_.C=function(E,T,I){for(var g=Array(arguments.length-2),j=2;j<arguments.length;j++)g[j-2]=arguments[j];return p.prototype[T].apply(E,g)}}function e(){this.blockSize=-1}function i(){this.blockSize=-1,this.blockSize=64,this.g=Array(4),this.B=Array(this.blockSize),this.o=this.h=0,this.s()}t(i,e),i.prototype.s=function(){this.g[0]=1732584193,this.g[1]=4023233417,this.g[2]=2562383102,this.g[3]=271733878,this.o=this.h=0};function s(_,p,m){m||(m=0);var E=Array(16);if(typeof p=="string")for(var T=0;16>T;++T)E[T]=p.charCodeAt(m++)|p.charCodeAt(m++)<<8|p.charCodeAt(m++)<<16|p.charCodeAt(m++)<<24;else for(T=0;16>T;++T)E[T]=p[m++]|p[m++]<<8|p[m++]<<16|p[m++]<<24;p=_.g[0],m=_.g[1],T=_.g[2];var I=_.g[3],g=p+(I^m&(T^I))+E[0]+3614090360&4294967295;p=m+(g<<7&4294967295|g>>>25),g=I+(T^p&(m^T))+E[1]+3905402710&4294967295,I=p+(g<<12&4294967295|g>>>20),g=T+(m^I&(p^m))+E[2]+606105819&4294967295,T=I+(g<<17&4294967295|g>>>15),g=m+(p^T&(I^p))+E[3]+3250441966&4294967295,m=T+(g<<22&4294967295|g>>>10),g=p+(I^m&(T^I))+E[4]+4118548399&4294967295,p=m+(g<<7&4294967295|g>>>25),g=I+(T^p&(m^T))+E[5]+1200080426&4294967295,I=p+(g<<12&4294967295|g>>>20),g=T+(m^I&(p^m))+E[6]+2821735955&4294967295,T=I+(g<<17&4294967295|g>>>15),g=m+(p^T&(I^p))+E[7]+4249261313&4294967295,m=T+(g<<22&4294967295|g>>>10),g=p+(I^m&(T^I))+E[8]+1770035416&4294967295,p=m+(g<<7&4294967295|g>>>25),g=I+(T^p&(m^T))+E[9]+2336552879&4294967295,I=p+(g<<12&4294967295|g>>>20),g=T+(m^I&(p^m))+E[10]+4294925233&4294967295,T=I+(g<<17&4294967295|g>>>15),g=m+(p^T&(I^p))+E[11]+2304563134&4294967295,m=T+(g<<22&4294967295|g>>>10),g=p+(I^m&(T^I))+E[12]+1804603682&4294967295,p=m+(g<<7&4294967295|g>>>25),g=I+(T^p&(m^T))+E[13]+4254626195&4294967295,I=p+(g<<12&4294967295|g>>>20),g=T+(m^I&(p^m))+E[14]+2792965006&4294967295,T=I+(g<<17&4294967295|g>>>15),g=m+(p^T&(I^p))+E[15]+1236535329&4294967295,m=T+(g<<22&4294967295|g>>>10),g=p+(T^I&(m^T))+E[1]+4129170786&4294967295,p=m+(g<<5&4294967295|g>>>27),g=I+(m^T&(p^m))+E[6]+3225465664&4294967295,I=p+(g<<9&4294967295|g>>>23),g=T+(p^m&(I^p))+E[11]+643717713&4294967295,T=I+(g<<14&4294967295|g>>>18),g=m+(I^p&(T^I))+E[0]+3921069994&4294967295,m=T+(g<<20&4294967295|g>>>12),g=p+(T^I&(m^T))+E[5]+3593408605&4294967295,p=m+(g<<5&4294967295|g>>>27),g=I+(m^T&(p^m))+E[10]+38016083&4294967295,I=p+(g<<9&4294967295|g>>>23),g=T+(p^m&(I^p))+E[15]+3634488961&4294967295,T=I+(g<<14&4294967295|g>>>18),g=m+(I^p&(T^I))+E[4]+3889429448&4294967295,m=T+(g<<20&4294967295|g>>>12),g=p+(T^I&(m^T))+E[9]+568446438&4294967295,p=m+(g<<5&4294967295|g>>>27),g=I+(m^T&(p^m))+E[14]+3275163606&4294967295,I=p+(g<<9&4294967295|g>>>23),g=T+(p^m&(I^p))+E[3]+4107603335&4294967295,T=I+(g<<14&4294967295|g>>>18),g=m+(I^p&(T^I))+E[8]+1163531501&4294967295,m=T+(g<<20&4294967295|g>>>12),g=p+(T^I&(m^T))+E[13]+2850285829&4294967295,p=m+(g<<5&4294967295|g>>>27),g=I+(m^T&(p^m))+E[2]+4243563512&4294967295,I=p+(g<<9&4294967295|g>>>23),g=T+(p^m&(I^p))+E[7]+1735328473&4294967295,T=I+(g<<14&4294967295|g>>>18),g=m+(I^p&(T^I))+E[12]+2368359562&4294967295,m=T+(g<<20&4294967295|g>>>12),g=p+(m^T^I)+E[5]+4294588738&4294967295,p=m+(g<<4&4294967295|g>>>28),g=I+(p^m^T)+E[8]+2272392833&4294967295,I=p+(g<<11&4294967295|g>>>21),g=T+(I^p^m)+E[11]+1839030562&4294967295,T=I+(g<<16&4294967295|g>>>16),g=m+(T^I^p)+E[14]+4259657740&4294967295,m=T+(g<<23&4294967295|g>>>9),g=p+(m^T^I)+E[1]+2763975236&4294967295,p=m+(g<<4&4294967295|g>>>28),g=I+(p^m^T)+E[4]+1272893353&4294967295,I=p+(g<<11&4294967295|g>>>21),g=T+(I^p^m)+E[7]+4139469664&4294967295,T=I+(g<<16&4294967295|g>>>16),g=m+(T^I^p)+E[10]+3200236656&4294967295,m=T+(g<<23&4294967295|g>>>9),g=p+(m^T^I)+E[13]+681279174&4294967295,p=m+(g<<4&4294967295|g>>>28),g=I+(p^m^T)+E[0]+3936430074&4294967295,I=p+(g<<11&4294967295|g>>>21),g=T+(I^p^m)+E[3]+3572445317&4294967295,T=I+(g<<16&4294967295|g>>>16),g=m+(T^I^p)+E[6]+76029189&4294967295,m=T+(g<<23&4294967295|g>>>9),g=p+(m^T^I)+E[9]+3654602809&4294967295,p=m+(g<<4&4294967295|g>>>28),g=I+(p^m^T)+E[12]+3873151461&4294967295,I=p+(g<<11&4294967295|g>>>21),g=T+(I^p^m)+E[15]+530742520&4294967295,T=I+(g<<16&4294967295|g>>>16),g=m+(T^I^p)+E[2]+3299628645&4294967295,m=T+(g<<23&4294967295|g>>>9),g=p+(T^(m|~I))+E[0]+4096336452&4294967295,p=m+(g<<6&4294967295|g>>>26),g=I+(m^(p|~T))+E[7]+1126891415&4294967295,I=p+(g<<10&4294967295|g>>>22),g=T+(p^(I|~m))+E[14]+2878612391&4294967295,T=I+(g<<15&4294967295|g>>>17),g=m+(I^(T|~p))+E[5]+4237533241&4294967295,m=T+(g<<21&4294967295|g>>>11),g=p+(T^(m|~I))+E[12]+1700485571&4294967295,p=m+(g<<6&4294967295|g>>>26),g=I+(m^(p|~T))+E[3]+2399980690&4294967295,I=p+(g<<10&4294967295|g>>>22),g=T+(p^(I|~m))+E[10]+4293915773&4294967295,T=I+(g<<15&4294967295|g>>>17),g=m+(I^(T|~p))+E[1]+2240044497&4294967295,m=T+(g<<21&4294967295|g>>>11),g=p+(T^(m|~I))+E[8]+1873313359&4294967295,p=m+(g<<6&4294967295|g>>>26),g=I+(m^(p|~T))+E[15]+4264355552&4294967295,I=p+(g<<10&4294967295|g>>>22),g=T+(p^(I|~m))+E[6]+2734768916&4294967295,T=I+(g<<15&4294967295|g>>>17),g=m+(I^(T|~p))+E[13]+1309151649&4294967295,m=T+(g<<21&4294967295|g>>>11),g=p+(T^(m|~I))+E[4]+4149444226&4294967295,p=m+(g<<6&4294967295|g>>>26),g=I+(m^(p|~T))+E[11]+3174756917&4294967295,I=p+(g<<10&4294967295|g>>>22),g=T+(p^(I|~m))+E[2]+718787259&4294967295,T=I+(g<<15&4294967295|g>>>17),g=m+(I^(T|~p))+E[9]+3951481745&4294967295,_.g[0]=_.g[0]+p&4294967295,_.g[1]=_.g[1]+(T+(g<<21&4294967295|g>>>11))&4294967295,_.g[2]=_.g[2]+T&4294967295,_.g[3]=_.g[3]+I&4294967295}i.prototype.u=function(_,p){p===void 0&&(p=_.length);for(var m=p-this.blockSize,E=this.B,T=this.h,I=0;I<p;){if(T==0)for(;I<=m;)s(this,_,I),I+=this.blockSize;if(typeof _=="string"){for(;I<p;)if(E[T++]=_.charCodeAt(I++),T==this.blockSize){s(this,E),T=0;break}}else for(;I<p;)if(E[T++]=_[I++],T==this.blockSize){s(this,E),T=0;break}}this.h=T,this.o+=p},i.prototype.v=function(){var _=Array((56>this.h?this.blockSize:2*this.blockSize)-this.h);_[0]=128;for(var p=1;p<_.length-8;++p)_[p]=0;var m=8*this.o;for(p=_.length-8;p<_.length;++p)_[p]=m&255,m/=256;for(this.u(_),_=Array(16),p=m=0;4>p;++p)for(var E=0;32>E;E+=8)_[m++]=this.g[p]>>>E&255;return _};function o(_,p){var m=u;return Object.prototype.hasOwnProperty.call(m,_)?m[_]:m[_]=p(_)}function l(_,p){this.h=p;for(var m=[],E=!0,T=_.length-1;0<=T;T--){var I=_[T]|0;E&&I==p||(m[T]=I,E=!1)}this.g=m}var u={};function h(_){return-128<=_&&128>_?o(_,function(p){return new l([p|0],0>p?-1:0)}):new l([_|0],0>_?-1:0)}function f(_){if(isNaN(_)||!isFinite(_))return v;if(0>_)return D(f(-_));for(var p=[],m=1,E=0;_>=m;E++)p[E]=_/m|0,m*=4294967296;return new l(p,0)}function y(_,p){if(_.length==0)throw Error("number format error: empty string");if(p=p||10,2>p||36<p)throw Error("radix out of range: "+p);if(_.charAt(0)=="-")return D(y(_.substring(1),p));if(0<=_.indexOf("-"))throw Error('number format error: interior "-" character');for(var m=f(Math.pow(p,8)),E=v,T=0;T<_.length;T+=8){var I=Math.min(8,_.length-T),g=parseInt(_.substring(T,T+I),p);8>I?(I=f(Math.pow(p,I)),E=E.j(I).add(f(g))):(E=E.j(m),E=E.add(f(g)))}return E}var v=h(0),w=h(1),S=h(16777216);n=l.prototype,n.m=function(){if(k(this))return-D(this).m();for(var _=0,p=1,m=0;m<this.g.length;m++){var E=this.i(m);_+=(0<=E?E:4294967296+E)*p,p*=4294967296}return _},n.toString=function(_){if(_=_||10,2>_||36<_)throw Error("radix out of range: "+_);if(R(this))return"0";if(k(this))return"-"+D(this).toString(_);for(var p=f(Math.pow(_,6)),m=this,E="";;){var T=nt(m,p).g;m=$(m,T.j(p));var I=((0<m.g.length?m.g[0]:m.h)>>>0).toString(_);if(m=T,R(m))return I+E;for(;6>I.length;)I="0"+I;E=I+E}},n.i=function(_){return 0>_?0:_<this.g.length?this.g[_]:this.h};function R(_){if(_.h!=0)return!1;for(var p=0;p<_.g.length;p++)if(_.g[p]!=0)return!1;return!0}function k(_){return _.h==-1}n.l=function(_){return _=$(this,_),k(_)?-1:R(_)?0:1};function D(_){for(var p=_.g.length,m=[],E=0;E<p;E++)m[E]=~_.g[E];return new l(m,~_.h).add(w)}n.abs=function(){return k(this)?D(this):this},n.add=function(_){for(var p=Math.max(this.g.length,_.g.length),m=[],E=0,T=0;T<=p;T++){var I=E+(this.i(T)&65535)+(_.i(T)&65535),g=(I>>>16)+(this.i(T)>>>16)+(_.i(T)>>>16);E=g>>>16,I&=65535,g&=65535,m[T]=g<<16|I}return new l(m,m[m.length-1]&-2147483648?-1:0)};function $(_,p){return _.add(D(p))}n.j=function(_){if(R(this)||R(_))return v;if(k(this))return k(_)?D(this).j(D(_)):D(D(this).j(_));if(k(_))return D(this.j(D(_)));if(0>this.l(S)&&0>_.l(S))return f(this.m()*_.m());for(var p=this.g.length+_.g.length,m=[],E=0;E<2*p;E++)m[E]=0;for(E=0;E<this.g.length;E++)for(var T=0;T<_.g.length;T++){var I=this.i(E)>>>16,g=this.i(E)&65535,j=_.i(T)>>>16,H=_.i(T)&65535;m[2*E+2*T]+=g*H,L(m,2*E+2*T),m[2*E+2*T+1]+=I*H,L(m,2*E+2*T+1),m[2*E+2*T+1]+=g*j,L(m,2*E+2*T+1),m[2*E+2*T+2]+=I*j,L(m,2*E+2*T+2)}for(E=0;E<p;E++)m[E]=m[2*E+1]<<16|m[2*E];for(E=p;E<2*p;E++)m[E]=0;return new l(m,0)};function L(_,p){for(;(_[p]&65535)!=_[p];)_[p+1]+=_[p]>>>16,_[p]&=65535,p++}function O(_,p){this.g=_,this.h=p}function nt(_,p){if(R(p))throw Error("division by zero");if(R(_))return new O(v,v);if(k(_))return p=nt(D(_),p),new O(D(p.g),D(p.h));if(k(p))return p=nt(_,D(p)),new O(D(p.g),p.h);if(30<_.g.length){if(k(_)||k(p))throw Error("slowDivide_ only works with positive integers.");for(var m=w,E=p;0>=E.l(_);)m=Ct(m),E=Ct(E);var T=ht(m,1),I=ht(E,1);for(E=ht(E,2),m=ht(m,2);!R(E);){var g=I.add(E);0>=g.l(_)&&(T=T.add(m),I=g),E=ht(E,1),m=ht(m,1)}return p=$(_,T.j(p)),new O(T,p)}for(T=v;0<=_.l(p);){for(m=Math.max(1,Math.floor(_.m()/p.m())),E=Math.ceil(Math.log(m)/Math.LN2),E=48>=E?1:Math.pow(2,E-48),I=f(m),g=I.j(p);k(g)||0<g.l(_);)m-=E,I=f(m),g=I.j(p);R(I)&&(I=w),T=T.add(I),_=$(_,g)}return new O(T,_)}n.A=function(_){return nt(this,_).h},n.and=function(_){for(var p=Math.max(this.g.length,_.g.length),m=[],E=0;E<p;E++)m[E]=this.i(E)&_.i(E);return new l(m,this.h&_.h)},n.or=function(_){for(var p=Math.max(this.g.length,_.g.length),m=[],E=0;E<p;E++)m[E]=this.i(E)|_.i(E);return new l(m,this.h|_.h)},n.xor=function(_){for(var p=Math.max(this.g.length,_.g.length),m=[],E=0;E<p;E++)m[E]=this.i(E)^_.i(E);return new l(m,this.h^_.h)};function Ct(_){for(var p=_.g.length+1,m=[],E=0;E<p;E++)m[E]=_.i(E)<<1|_.i(E-1)>>>31;return new l(m,_.h)}function ht(_,p){var m=p>>5;p%=32;for(var E=_.g.length-m,T=[],I=0;I<E;I++)T[I]=0<p?_.i(I+m)>>>p|_.i(I+m+1)<<32-p:_.i(I+m);return new l(T,_.h)}i.prototype.digest=i.prototype.v,i.prototype.reset=i.prototype.s,i.prototype.update=i.prototype.u,l.prototype.add=l.prototype.add,l.prototype.multiply=l.prototype.j,l.prototype.modulo=l.prototype.A,l.prototype.compare=l.prototype.l,l.prototype.toNumber=l.prototype.m,l.prototype.toString=l.prototype.toString,l.prototype.getBits=l.prototype.i,l.fromNumber=f,l.fromString=y,Fr=l}).apply(typeof Mo<"u"?Mo:typeof self<"u"?self:typeof window<"u"?window:{});var jn=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};/** @license
Copyright The Closure Library Authors.
SPDX-License-Identifier: Apache-2.0
*/var tl,tn,el,Qn,mr,nl,il,rl;(function(){var n,t=typeof Object.defineProperties=="function"?Object.defineProperty:function(r,a,c){return r==Array.prototype||r==Object.prototype||(r[a]=c.value),r};function e(r){r=[typeof globalThis=="object"&&globalThis,r,typeof window=="object"&&window,typeof self=="object"&&self,typeof jn=="object"&&jn];for(var a=0;a<r.length;++a){var c=r[a];if(c&&c.Math==Math)return c}throw Error("Cannot find global object")}var i=e(this);function s(r,a){if(a)t:{var c=i;r=r.split(".");for(var d=0;d<r.length-1;d++){var A=r[d];if(!(A in c))break t;c=c[A]}r=r[r.length-1],d=c[r],a=a(d),a!=d&&a!=null&&t(c,r,{configurable:!0,writable:!0,value:a})}}function o(r,a){r instanceof String&&(r+="");var c=0,d=!1,A={next:function(){if(!d&&c<r.length){var P=c++;return{value:a(P,r[P]),done:!1}}return d=!0,{done:!0,value:void 0}}};return A[Symbol.iterator]=function(){return A},A}s("Array.prototype.values",function(r){return r||function(){return o(this,function(a,c){return c})}});/** @license

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/var l=l||{},u=this||self;function h(r){var a=typeof r;return a=a!="object"?a:r?Array.isArray(r)?"array":a:"null",a=="array"||a=="object"&&typeof r.length=="number"}function f(r){var a=typeof r;return a=="object"&&r!=null||a=="function"}function y(r,a,c){return r.call.apply(r.bind,arguments)}function v(r,a,c){if(!r)throw Error();if(2<arguments.length){var d=Array.prototype.slice.call(arguments,2);return function(){var A=Array.prototype.slice.call(arguments);return Array.prototype.unshift.apply(A,d),r.apply(a,A)}}return function(){return r.apply(a,arguments)}}function w(r,a,c){return w=Function.prototype.bind&&Function.prototype.bind.toString().indexOf("native code")!=-1?y:v,w.apply(null,arguments)}function S(r,a){var c=Array.prototype.slice.call(arguments,1);return function(){var d=c.slice();return d.push.apply(d,arguments),r.apply(this,d)}}function R(r,a){function c(){}c.prototype=a.prototype,r.aa=a.prototype,r.prototype=new c,r.prototype.constructor=r,r.Qb=function(d,A,P){for(var V=Array(arguments.length-2),G=2;G<arguments.length;G++)V[G-2]=arguments[G];return a.prototype[A].apply(d,V)}}function k(r){const a=r.length;if(0<a){const c=Array(a);for(let d=0;d<a;d++)c[d]=r[d];return c}return[]}function D(r,a){for(let c=1;c<arguments.length;c++){const d=arguments[c];if(h(d)){const A=r.length||0,P=d.length||0;r.length=A+P;for(let V=0;V<P;V++)r[A+V]=d[V]}else r.push(d)}}class ${constructor(a,c){this.i=a,this.j=c,this.h=0,this.g=null}get(){let a;return 0<this.h?(this.h--,a=this.g,this.g=a.next,a.next=null):a=this.i(),a}}function L(r){return/^[\s\xa0]*$/.test(r)}function O(){var r=u.navigator;return r&&(r=r.userAgent)?r:""}function nt(r){return nt[" "](r),r}nt[" "]=function(){};var Ct=O().indexOf("Gecko")!=-1&&!(O().toLowerCase().indexOf("webkit")!=-1&&O().indexOf("Edge")==-1)&&!(O().indexOf("Trident")!=-1||O().indexOf("MSIE")!=-1)&&O().indexOf("Edge")==-1;function ht(r,a,c){for(const d in r)a.call(c,r[d],d,r)}function _(r,a){for(const c in r)a.call(void 0,r[c],c,r)}function p(r){const a={};for(const c in r)a[c]=r[c];return a}const m="constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" ");function E(r,a){let c,d;for(let A=1;A<arguments.length;A++){d=arguments[A];for(c in d)r[c]=d[c];for(let P=0;P<m.length;P++)c=m[P],Object.prototype.hasOwnProperty.call(d,c)&&(r[c]=d[c])}}function T(r){var a=1;r=r.split(":");const c=[];for(;0<a&&r.length;)c.push(r.shift()),a--;return r.length&&c.push(r.join(":")),c}function I(r){u.setTimeout(()=>{throw r},0)}function g(){var r=Ci;let a=null;return r.g&&(a=r.g,r.g=r.g.next,r.g||(r.h=null),a.next=null),a}class j{constructor(){this.h=this.g=null}add(a,c){const d=H.get();d.set(a,c),this.h?this.h.next=d:this.g=d,this.h=d}}var H=new $(()=>new it,r=>r.reset());class it{constructor(){this.next=this.g=this.h=null}set(a,c){this.h=a,this.g=c,this.next=null}reset(){this.next=this.g=this.h=null}}let Pt,Le=!1,Ci=new j,cs=()=>{const r=u.Promise.resolve(void 0);Pt=()=>{r.then(hc)}};var hc=()=>{for(var r;r=g();){try{r.h.call(r.g)}catch(c){I(c)}var a=H;a.j(r),100>a.h&&(a.h++,r.next=a.g,a.g=r)}Le=!1};function Ht(){this.s=this.s,this.C=this.C}Ht.prototype.s=!1,Ht.prototype.ma=function(){this.s||(this.s=!0,this.N())},Ht.prototype.N=function(){if(this.C)for(;this.C.length;)this.C.shift()()};function dt(r,a){this.type=r,this.g=this.target=a,this.defaultPrevented=!1}dt.prototype.h=function(){this.defaultPrevented=!0};var dc=(function(){if(!u.addEventListener||!Object.defineProperty)return!1;var r=!1,a=Object.defineProperty({},"passive",{get:function(){r=!0}});try{const c=()=>{};u.addEventListener("test",c,a),u.removeEventListener("test",c,a)}catch{}return r})();function Fe(r,a){if(dt.call(this,r?r.type:""),this.relatedTarget=this.g=this.target=null,this.button=this.screenY=this.screenX=this.clientY=this.clientX=0,this.key="",this.metaKey=this.shiftKey=this.altKey=this.ctrlKey=!1,this.state=null,this.pointerId=0,this.pointerType="",this.i=null,r){var c=this.type=r.type,d=r.changedTouches&&r.changedTouches.length?r.changedTouches[0]:null;if(this.target=r.target||r.srcElement,this.g=a,a=r.relatedTarget){if(Ct){t:{try{nt(a.nodeName);var A=!0;break t}catch{}A=!1}A||(a=null)}}else c=="mouseover"?a=r.fromElement:c=="mouseout"&&(a=r.toElement);this.relatedTarget=a,d?(this.clientX=d.clientX!==void 0?d.clientX:d.pageX,this.clientY=d.clientY!==void 0?d.clientY:d.pageY,this.screenX=d.screenX||0,this.screenY=d.screenY||0):(this.clientX=r.clientX!==void 0?r.clientX:r.pageX,this.clientY=r.clientY!==void 0?r.clientY:r.pageY,this.screenX=r.screenX||0,this.screenY=r.screenY||0),this.button=r.button,this.key=r.key||"",this.ctrlKey=r.ctrlKey,this.altKey=r.altKey,this.shiftKey=r.shiftKey,this.metaKey=r.metaKey,this.pointerId=r.pointerId||0,this.pointerType=typeof r.pointerType=="string"?r.pointerType:fc[r.pointerType]||"",this.state=r.state,this.i=r,r.defaultPrevented&&Fe.aa.h.call(this)}}R(Fe,dt);var fc={2:"touch",3:"pen",4:"mouse"};Fe.prototype.h=function(){Fe.aa.h.call(this);var r=this.i;r.preventDefault?r.preventDefault():r.returnValue=!1};var wn="closure_listenable_"+(1e6*Math.random()|0),pc=0;function mc(r,a,c,d,A){this.listener=r,this.proxy=null,this.src=a,this.type=c,this.capture=!!d,this.ha=A,this.key=++pc,this.da=this.fa=!1}function An(r){r.da=!0,r.listener=null,r.proxy=null,r.src=null,r.ha=null}function Pn(r){this.src=r,this.g={},this.h=0}Pn.prototype.add=function(r,a,c,d,A){var P=r.toString();r=this.g[P],r||(r=this.g[P]=[],this.h++);var V=Vi(r,a,d,A);return-1<V?(a=r[V],c||(a.fa=!1)):(a=new mc(a,this.src,P,!!d,A),a.fa=c,r.push(a)),a};function Ri(r,a){var c=a.type;if(c in r.g){var d=r.g[c],A=Array.prototype.indexOf.call(d,a,void 0),P;(P=0<=A)&&Array.prototype.splice.call(d,A,1),P&&(An(a),r.g[c].length==0&&(delete r.g[c],r.h--))}}function Vi(r,a,c,d){for(var A=0;A<r.length;++A){var P=r[A];if(!P.da&&P.listener==a&&P.capture==!!c&&P.ha==d)return A}return-1}var Di="closure_lm_"+(1e6*Math.random()|0),Mi={};function us(r,a,c,d,A){if(Array.isArray(a)){for(var P=0;P<a.length;P++)us(r,a[P],c,d,A);return null}return c=fs(c),r&&r[wn]?r.K(a,c,f(d)?!!d.capture:!1,A):gc(r,a,c,!1,d,A)}function gc(r,a,c,d,A,P){if(!a)throw Error("Invalid event type");var V=f(A)?!!A.capture:!!A,G=ki(r);if(G||(r[Di]=G=new Pn(r)),c=G.add(a,c,d,V,P),c.proxy)return c;if(d=yc(),c.proxy=d,d.src=r,d.listener=c,r.addEventListener)dc||(A=V),A===void 0&&(A=!1),r.addEventListener(a.toString(),d,A);else if(r.attachEvent)r.attachEvent(ds(a.toString()),d);else if(r.addListener&&r.removeListener)r.addListener(d);else throw Error("addEventListener and attachEvent are unavailable.");return c}function yc(){function r(c){return a.call(r.src,r.listener,c)}const a=_c;return r}function hs(r,a,c,d,A){if(Array.isArray(a))for(var P=0;P<a.length;P++)hs(r,a[P],c,d,A);else d=f(d)?!!d.capture:!!d,c=fs(c),r&&r[wn]?(r=r.i,a=String(a).toString(),a in r.g&&(P=r.g[a],c=Vi(P,c,d,A),-1<c&&(An(P[c]),Array.prototype.splice.call(P,c,1),P.length==0&&(delete r.g[a],r.h--)))):r&&(r=ki(r))&&(a=r.g[a.toString()],r=-1,a&&(r=Vi(a,c,d,A)),(c=-1<r?a[r]:null)&&Ni(c))}function Ni(r){if(typeof r!="number"&&r&&!r.da){var a=r.src;if(a&&a[wn])Ri(a.i,r);else{var c=r.type,d=r.proxy;a.removeEventListener?a.removeEventListener(c,d,r.capture):a.detachEvent?a.detachEvent(ds(c),d):a.addListener&&a.removeListener&&a.removeListener(d),(c=ki(a))?(Ri(c,r),c.h==0&&(c.src=null,a[Di]=null)):An(r)}}}function ds(r){return r in Mi?Mi[r]:Mi[r]="on"+r}function _c(r,a){if(r.da)r=!0;else{a=new Fe(a,this);var c=r.listener,d=r.ha||r.src;r.fa&&Ni(r),r=c.call(d,a)}return r}function ki(r){return r=r[Di],r instanceof Pn?r:null}var Oi="__closure_events_fn_"+(1e9*Math.random()>>>0);function fs(r){return typeof r=="function"?r:(r[Oi]||(r[Oi]=function(a){return r.handleEvent(a)}),r[Oi])}function ft(){Ht.call(this),this.i=new Pn(this),this.M=this,this.F=null}R(ft,Ht),ft.prototype[wn]=!0,ft.prototype.removeEventListener=function(r,a,c,d){hs(this,r,a,c,d)};function vt(r,a){var c,d=r.F;if(d)for(c=[];d;d=d.F)c.push(d);if(r=r.M,d=a.type||a,typeof a=="string")a=new dt(a,r);else if(a instanceof dt)a.target=a.target||r;else{var A=a;a=new dt(d,r),E(a,A)}if(A=!0,c)for(var P=c.length-1;0<=P;P--){var V=a.g=c[P];A=bn(V,d,!0,a)&&A}if(V=a.g=r,A=bn(V,d,!0,a)&&A,A=bn(V,d,!1,a)&&A,c)for(P=0;P<c.length;P++)V=a.g=c[P],A=bn(V,d,!1,a)&&A}ft.prototype.N=function(){if(ft.aa.N.call(this),this.i){var r=this.i,a;for(a in r.g){for(var c=r.g[a],d=0;d<c.length;d++)An(c[d]);delete r.g[a],r.h--}}this.F=null},ft.prototype.K=function(r,a,c,d){return this.i.add(String(r),a,!1,c,d)},ft.prototype.L=function(r,a,c,d){return this.i.add(String(r),a,!0,c,d)};function bn(r,a,c,d){if(a=r.i.g[String(a)],!a)return!0;a=a.concat();for(var A=!0,P=0;P<a.length;++P){var V=a[P];if(V&&!V.da&&V.capture==c){var G=V.listener,ot=V.ha||V.src;V.fa&&Ri(r.i,V),A=G.call(ot,d)!==!1&&A}}return A&&!d.defaultPrevented}function ps(r,a,c){if(typeof r=="function")c&&(r=w(r,c));else if(r&&typeof r.handleEvent=="function")r=w(r.handleEvent,r);else throw Error("Invalid listener argument");return 2147483647<Number(a)?-1:u.setTimeout(r,a||0)}function ms(r){r.g=ps(()=>{r.g=null,r.i&&(r.i=!1,ms(r))},r.l);const a=r.h;r.h=null,r.m.apply(null,a)}class Ec extends Ht{constructor(a,c){super(),this.m=a,this.l=c,this.h=null,this.i=!1,this.g=null}j(a){this.h=arguments,this.g?this.i=!0:ms(this)}N(){super.N(),this.g&&(u.clearTimeout(this.g),this.g=null,this.i=!1,this.h=null)}}function Ue(r){Ht.call(this),this.h=r,this.g={}}R(Ue,Ht);var gs=[];function ys(r){ht(r.g,function(a,c){this.g.hasOwnProperty(c)&&Ni(a)},r),r.g={}}Ue.prototype.N=function(){Ue.aa.N.call(this),ys(this)},Ue.prototype.handleEvent=function(){throw Error("EventHandler.handleEvent not implemented")};var xi=u.JSON.stringify,vc=u.JSON.parse,Tc=class{stringify(r){return u.JSON.stringify(r,void 0)}parse(r){return u.JSON.parse(r,void 0)}};function Li(){}Li.prototype.h=null;function _s(r){return r.h||(r.h=r.i())}function Es(){}var Be={OPEN:"a",kb:"b",Ja:"c",wb:"d"};function Fi(){dt.call(this,"d")}R(Fi,dt);function Ui(){dt.call(this,"c")}R(Ui,dt);var ie={},vs=null;function Sn(){return vs=vs||new ft}ie.La="serverreachability";function Ts(r){dt.call(this,ie.La,r)}R(Ts,dt);function $e(r){const a=Sn();vt(a,new Ts(a))}ie.STAT_EVENT="statevent";function Is(r,a){dt.call(this,ie.STAT_EVENT,r),this.stat=a}R(Is,dt);function Tt(r){const a=Sn();vt(a,new Is(a,r))}ie.Ma="timingevent";function ws(r,a){dt.call(this,ie.Ma,r),this.size=a}R(ws,dt);function je(r,a){if(typeof r!="function")throw Error("Fn must not be null and must be a function");return u.setTimeout(function(){r()},a)}function qe(){this.g=!0}qe.prototype.xa=function(){this.g=!1};function Ic(r,a,c,d,A,P){r.info(function(){if(r.g)if(P)for(var V="",G=P.split("&"),ot=0;ot<G.length;ot++){var q=G[ot].split("=");if(1<q.length){var pt=q[0];q=q[1];var mt=pt.split("_");V=2<=mt.length&&mt[1]=="type"?V+(pt+"="+q+"&"):V+(pt+"=redacted&")}}else V=null;else V=P;return"XMLHTTP REQ ("+d+") [attempt "+A+"]: "+a+`
`+c+`
`+V})}function wc(r,a,c,d,A,P,V){r.info(function(){return"XMLHTTP RESP ("+d+") [ attempt "+A+"]: "+a+`
`+c+`
`+P+" "+V})}function ve(r,a,c,d){r.info(function(){return"XMLHTTP TEXT ("+a+"): "+Pc(r,c)+(d?" "+d:"")})}function Ac(r,a){r.info(function(){return"TIMEOUT: "+a})}qe.prototype.info=function(){};function Pc(r,a){if(!r.g)return a;if(!a)return null;try{var c=JSON.parse(a);if(c){for(r=0;r<c.length;r++)if(Array.isArray(c[r])){var d=c[r];if(!(2>d.length)){var A=d[1];if(Array.isArray(A)&&!(1>A.length)){var P=A[0];if(P!="noop"&&P!="stop"&&P!="close")for(var V=1;V<A.length;V++)A[V]=""}}}}return xi(c)}catch{return a}}var Cn={NO_ERROR:0,gb:1,tb:2,sb:3,nb:4,rb:5,ub:6,Ia:7,TIMEOUT:8,xb:9},As={lb:"complete",Hb:"success",Ja:"error",Ia:"abort",zb:"ready",Ab:"readystatechange",TIMEOUT:"timeout",vb:"incrementaldata",yb:"progress",ob:"downloadprogress",Pb:"uploadprogress"},Bi;function Rn(){}R(Rn,Li),Rn.prototype.g=function(){return new XMLHttpRequest},Rn.prototype.i=function(){return{}},Bi=new Rn;function Gt(r,a,c,d){this.j=r,this.i=a,this.l=c,this.R=d||1,this.U=new Ue(this),this.I=45e3,this.H=null,this.o=!1,this.m=this.A=this.v=this.L=this.F=this.S=this.B=null,this.D=[],this.g=null,this.C=0,this.s=this.u=null,this.X=-1,this.J=!1,this.O=0,this.M=null,this.W=this.K=this.T=this.P=!1,this.h=new Ps}function Ps(){this.i=null,this.g="",this.h=!1}var bs={},$i={};function ji(r,a,c){r.L=1,r.v=Nn(Ft(a)),r.m=c,r.P=!0,Ss(r,null)}function Ss(r,a){r.F=Date.now(),Vn(r),r.A=Ft(r.v);var c=r.A,d=r.R;Array.isArray(d)||(d=[String(d)]),$s(c.i,"t",d),r.C=0,c=r.j.J,r.h=new Ps,r.g=so(r.j,c?a:null,!r.m),0<r.O&&(r.M=new Ec(w(r.Y,r,r.g),r.O)),a=r.U,c=r.g,d=r.ca;var A="readystatechange";Array.isArray(A)||(A&&(gs[0]=A.toString()),A=gs);for(var P=0;P<A.length;P++){var V=us(c,A[P],d||a.handleEvent,!1,a.h||a);if(!V)break;a.g[V.key]=V}a=r.H?p(r.H):{},r.m?(r.u||(r.u="POST"),a["Content-Type"]="application/x-www-form-urlencoded",r.g.ea(r.A,r.u,r.m,a)):(r.u="GET",r.g.ea(r.A,r.u,null,a)),$e(),Ic(r.i,r.u,r.A,r.l,r.R,r.m)}Gt.prototype.ca=function(r){r=r.target;const a=this.M;a&&Ut(r)==3?a.j():this.Y(r)},Gt.prototype.Y=function(r){try{if(r==this.g)t:{const mt=Ut(this.g);var a=this.g.Ba();const we=this.g.Z();if(!(3>mt)&&(mt!=3||this.g&&(this.h.h||this.g.oa()||Ks(this.g)))){this.J||mt!=4||a==7||(a==8||0>=we?$e(3):$e(2)),qi(this);var c=this.g.Z();this.X=c;e:if(Cs(this)){var d=Ks(this.g);r="";var A=d.length,P=Ut(this.g)==4;if(!this.h.i){if(typeof TextDecoder>"u"){re(this),ze(this);var V="";break e}this.h.i=new u.TextDecoder}for(a=0;a<A;a++)this.h.h=!0,r+=this.h.i.decode(d[a],{stream:!(P&&a==A-1)});d.length=0,this.h.g+=r,this.C=0,V=this.h.g}else V=this.g.oa();if(this.o=c==200,wc(this.i,this.u,this.A,this.l,this.R,mt,c),this.o){if(this.T&&!this.K){e:{if(this.g){var G,ot=this.g;if((G=ot.g?ot.g.getResponseHeader("X-HTTP-Initial-Response"):null)&&!L(G)){var q=G;break e}}q=null}if(c=q)ve(this.i,this.l,c,"Initial handshake response via X-HTTP-Initial-Response"),this.K=!0,zi(this,c);else{this.o=!1,this.s=3,Tt(12),re(this),ze(this);break t}}if(this.P){c=!0;let Rt;for(;!this.J&&this.C<V.length;)if(Rt=bc(this,V),Rt==$i){mt==4&&(this.s=4,Tt(14),c=!1),ve(this.i,this.l,null,"[Incomplete Response]");break}else if(Rt==bs){this.s=4,Tt(15),ve(this.i,this.l,V,"[Invalid Chunk]"),c=!1;break}else ve(this.i,this.l,Rt,null),zi(this,Rt);if(Cs(this)&&this.C!=0&&(this.h.g=this.h.g.slice(this.C),this.C=0),mt!=4||V.length!=0||this.h.h||(this.s=1,Tt(16),c=!1),this.o=this.o&&c,!c)ve(this.i,this.l,V,"[Invalid Chunked Response]"),re(this),ze(this);else if(0<V.length&&!this.W){this.W=!0;var pt=this.j;pt.g==this&&pt.ba&&!pt.M&&(pt.j.info("Great, no buffering proxy detected. Bytes received: "+V.length),Xi(pt),pt.M=!0,Tt(11))}}else ve(this.i,this.l,V,null),zi(this,V);mt==4&&re(this),this.o&&!this.J&&(mt==4?eo(this.j,this):(this.o=!1,Vn(this)))}else qc(this.g),c==400&&0<V.indexOf("Unknown SID")?(this.s=3,Tt(12)):(this.s=0,Tt(13)),re(this),ze(this)}}}catch{}finally{}};function Cs(r){return r.g?r.u=="GET"&&r.L!=2&&r.j.Ca:!1}function bc(r,a){var c=r.C,d=a.indexOf(`
`,c);return d==-1?$i:(c=Number(a.substring(c,d)),isNaN(c)?bs:(d+=1,d+c>a.length?$i:(a=a.slice(d,d+c),r.C=d+c,a)))}Gt.prototype.cancel=function(){this.J=!0,re(this)};function Vn(r){r.S=Date.now()+r.I,Rs(r,r.I)}function Rs(r,a){if(r.B!=null)throw Error("WatchDog timer not null");r.B=je(w(r.ba,r),a)}function qi(r){r.B&&(u.clearTimeout(r.B),r.B=null)}Gt.prototype.ba=function(){this.B=null;const r=Date.now();0<=r-this.S?(Ac(this.i,this.A),this.L!=2&&($e(),Tt(17)),re(this),this.s=2,ze(this)):Rs(this,this.S-r)};function ze(r){r.j.G==0||r.J||eo(r.j,r)}function re(r){qi(r);var a=r.M;a&&typeof a.ma=="function"&&a.ma(),r.M=null,ys(r.U),r.g&&(a=r.g,r.g=null,a.abort(),a.ma())}function zi(r,a){try{var c=r.j;if(c.G!=0&&(c.g==r||Hi(c.h,r))){if(!r.K&&Hi(c.h,r)&&c.G==3){try{var d=c.Da.g.parse(a)}catch{d=null}if(Array.isArray(d)&&d.length==3){var A=d;if(A[0]==0){t:if(!c.u){if(c.g)if(c.g.F+3e3<r.F)Un(c),Ln(c);else break t;Qi(c),Tt(18)}}else c.za=A[1],0<c.za-c.T&&37500>A[2]&&c.F&&c.v==0&&!c.C&&(c.C=je(w(c.Za,c),6e3));if(1>=Ms(c.h)&&c.ca){try{c.ca()}catch{}c.ca=void 0}}else oe(c,11)}else if((r.K||c.g==r)&&Un(c),!L(a))for(A=c.Da.g.parse(a),a=0;a<A.length;a++){let q=A[a];if(c.T=q[0],q=q[1],c.G==2)if(q[0]=="c"){c.K=q[1],c.ia=q[2];const pt=q[3];pt!=null&&(c.la=pt,c.j.info("VER="+c.la));const mt=q[4];mt!=null&&(c.Aa=mt,c.j.info("SVER="+c.Aa));const we=q[5];we!=null&&typeof we=="number"&&0<we&&(d=1.5*we,c.L=d,c.j.info("backChannelRequestTimeoutMs_="+d)),d=c;const Rt=r.g;if(Rt){const $n=Rt.g?Rt.g.getResponseHeader("X-Client-Wire-Protocol"):null;if($n){var P=d.h;P.g||$n.indexOf("spdy")==-1&&$n.indexOf("quic")==-1&&$n.indexOf("h2")==-1||(P.j=P.l,P.g=new Set,P.h&&(Gi(P,P.h),P.h=null))}if(d.D){const Ji=Rt.g?Rt.g.getResponseHeader("X-HTTP-Session-Id"):null;Ji&&(d.ya=Ji,K(d.I,d.D,Ji))}}c.G=3,c.l&&c.l.ua(),c.ba&&(c.R=Date.now()-r.F,c.j.info("Handshake RTT: "+c.R+"ms")),d=c;var V=r;if(d.qa=ro(d,d.J?d.ia:null,d.W),V.K){Ns(d.h,V);var G=V,ot=d.L;ot&&(G.I=ot),G.B&&(qi(G),Vn(G)),d.g=V}else Zs(d);0<c.i.length&&Fn(c)}else q[0]!="stop"&&q[0]!="close"||oe(c,7);else c.G==3&&(q[0]=="stop"||q[0]=="close"?q[0]=="stop"?oe(c,7):Ki(c):q[0]!="noop"&&c.l&&c.l.ta(q),c.v=0)}}$e(4)}catch{}}var Sc=class{constructor(r,a){this.g=r,this.map=a}};function Vs(r){this.l=r||10,u.PerformanceNavigationTiming?(r=u.performance.getEntriesByType("navigation"),r=0<r.length&&(r[0].nextHopProtocol=="hq"||r[0].nextHopProtocol=="h2")):r=!!(u.chrome&&u.chrome.loadTimes&&u.chrome.loadTimes()&&u.chrome.loadTimes().wasFetchedViaSpdy),this.j=r?this.l:1,this.g=null,1<this.j&&(this.g=new Set),this.h=null,this.i=[]}function Ds(r){return r.h?!0:r.g?r.g.size>=r.j:!1}function Ms(r){return r.h?1:r.g?r.g.size:0}function Hi(r,a){return r.h?r.h==a:r.g?r.g.has(a):!1}function Gi(r,a){r.g?r.g.add(a):r.h=a}function Ns(r,a){r.h&&r.h==a?r.h=null:r.g&&r.g.has(a)&&r.g.delete(a)}Vs.prototype.cancel=function(){if(this.i=ks(this),this.h)this.h.cancel(),this.h=null;else if(this.g&&this.g.size!==0){for(const r of this.g.values())r.cancel();this.g.clear()}};function ks(r){if(r.h!=null)return r.i.concat(r.h.D);if(r.g!=null&&r.g.size!==0){let a=r.i;for(const c of r.g.values())a=a.concat(c.D);return a}return k(r.i)}function Cc(r){if(r.V&&typeof r.V=="function")return r.V();if(typeof Map<"u"&&r instanceof Map||typeof Set<"u"&&r instanceof Set)return Array.from(r.values());if(typeof r=="string")return r.split("");if(h(r)){for(var a=[],c=r.length,d=0;d<c;d++)a.push(r[d]);return a}a=[],c=0;for(d in r)a[c++]=r[d];return a}function Rc(r){if(r.na&&typeof r.na=="function")return r.na();if(!r.V||typeof r.V!="function"){if(typeof Map<"u"&&r instanceof Map)return Array.from(r.keys());if(!(typeof Set<"u"&&r instanceof Set)){if(h(r)||typeof r=="string"){var a=[];r=r.length;for(var c=0;c<r;c++)a.push(c);return a}a=[],c=0;for(const d in r)a[c++]=d;return a}}}function Os(r,a){if(r.forEach&&typeof r.forEach=="function")r.forEach(a,void 0);else if(h(r)||typeof r=="string")Array.prototype.forEach.call(r,a,void 0);else for(var c=Rc(r),d=Cc(r),A=d.length,P=0;P<A;P++)a.call(void 0,d[P],c&&c[P],r)}var xs=RegExp("^(?:([^:/?#.]+):)?(?://(?:([^\\\\/?#]*)@)?([^\\\\/?#]*?)(?::([0-9]+))?(?=[\\\\/?#]|$))?([^?#]+)?(?:\\?([^#]*))?(?:#([\\s\\S]*))?$");function Vc(r,a){if(r){r=r.split("&");for(var c=0;c<r.length;c++){var d=r[c].indexOf("="),A=null;if(0<=d){var P=r[c].substring(0,d);A=r[c].substring(d+1)}else P=r[c];a(P,A?decodeURIComponent(A.replace(/\+/g," ")):"")}}}function se(r){if(this.g=this.o=this.j="",this.s=null,this.m=this.l="",this.h=!1,r instanceof se){this.h=r.h,Dn(this,r.j),this.o=r.o,this.g=r.g,Mn(this,r.s),this.l=r.l;var a=r.i,c=new We;c.i=a.i,a.g&&(c.g=new Map(a.g),c.h=a.h),Ls(this,c),this.m=r.m}else r&&(a=String(r).match(xs))?(this.h=!1,Dn(this,a[1]||"",!0),this.o=He(a[2]||""),this.g=He(a[3]||"",!0),Mn(this,a[4]),this.l=He(a[5]||"",!0),Ls(this,a[6]||"",!0),this.m=He(a[7]||"")):(this.h=!1,this.i=new We(null,this.h))}se.prototype.toString=function(){var r=[],a=this.j;a&&r.push(Ge(a,Fs,!0),":");var c=this.g;return(c||a=="file")&&(r.push("//"),(a=this.o)&&r.push(Ge(a,Fs,!0),"@"),r.push(encodeURIComponent(String(c)).replace(/%25([0-9a-fA-F]{2})/g,"%$1")),c=this.s,c!=null&&r.push(":",String(c))),(c=this.l)&&(this.g&&c.charAt(0)!="/"&&r.push("/"),r.push(Ge(c,c.charAt(0)=="/"?Nc:Mc,!0))),(c=this.i.toString())&&r.push("?",c),(c=this.m)&&r.push("#",Ge(c,Oc)),r.join("")};function Ft(r){return new se(r)}function Dn(r,a,c){r.j=c?He(a,!0):a,r.j&&(r.j=r.j.replace(/:$/,""))}function Mn(r,a){if(a){if(a=Number(a),isNaN(a)||0>a)throw Error("Bad port number "+a);r.s=a}else r.s=null}function Ls(r,a,c){a instanceof We?(r.i=a,xc(r.i,r.h)):(c||(a=Ge(a,kc)),r.i=new We(a,r.h))}function K(r,a,c){r.i.set(a,c)}function Nn(r){return K(r,"zx",Math.floor(2147483648*Math.random()).toString(36)+Math.abs(Math.floor(2147483648*Math.random())^Date.now()).toString(36)),r}function He(r,a){return r?a?decodeURI(r.replace(/%25/g,"%2525")):decodeURIComponent(r):""}function Ge(r,a,c){return typeof r=="string"?(r=encodeURI(r).replace(a,Dc),c&&(r=r.replace(/%25([0-9a-fA-F]{2})/g,"%$1")),r):null}function Dc(r){return r=r.charCodeAt(0),"%"+(r>>4&15).toString(16)+(r&15).toString(16)}var Fs=/[#\/\?@]/g,Mc=/[#\?:]/g,Nc=/[#\?]/g,kc=/[#\?@]/g,Oc=/#/g;function We(r,a){this.h=this.g=null,this.i=r||null,this.j=!!a}function Wt(r){r.g||(r.g=new Map,r.h=0,r.i&&Vc(r.i,function(a,c){r.add(decodeURIComponent(a.replace(/\+/g," ")),c)}))}n=We.prototype,n.add=function(r,a){Wt(this),this.i=null,r=Te(this,r);var c=this.g.get(r);return c||this.g.set(r,c=[]),c.push(a),this.h+=1,this};function Us(r,a){Wt(r),a=Te(r,a),r.g.has(a)&&(r.i=null,r.h-=r.g.get(a).length,r.g.delete(a))}function Bs(r,a){return Wt(r),a=Te(r,a),r.g.has(a)}n.forEach=function(r,a){Wt(this),this.g.forEach(function(c,d){c.forEach(function(A){r.call(a,A,d,this)},this)},this)},n.na=function(){Wt(this);const r=Array.from(this.g.values()),a=Array.from(this.g.keys()),c=[];for(let d=0;d<a.length;d++){const A=r[d];for(let P=0;P<A.length;P++)c.push(a[d])}return c},n.V=function(r){Wt(this);let a=[];if(typeof r=="string")Bs(this,r)&&(a=a.concat(this.g.get(Te(this,r))));else{r=Array.from(this.g.values());for(let c=0;c<r.length;c++)a=a.concat(r[c])}return a},n.set=function(r,a){return Wt(this),this.i=null,r=Te(this,r),Bs(this,r)&&(this.h-=this.g.get(r).length),this.g.set(r,[a]),this.h+=1,this},n.get=function(r,a){return r?(r=this.V(r),0<r.length?String(r[0]):a):a};function $s(r,a,c){Us(r,a),0<c.length&&(r.i=null,r.g.set(Te(r,a),k(c)),r.h+=c.length)}n.toString=function(){if(this.i)return this.i;if(!this.g)return"";const r=[],a=Array.from(this.g.keys());for(var c=0;c<a.length;c++){var d=a[c];const P=encodeURIComponent(String(d)),V=this.V(d);for(d=0;d<V.length;d++){var A=P;V[d]!==""&&(A+="="+encodeURIComponent(String(V[d]))),r.push(A)}}return this.i=r.join("&")};function Te(r,a){return a=String(a),r.j&&(a=a.toLowerCase()),a}function xc(r,a){a&&!r.j&&(Wt(r),r.i=null,r.g.forEach(function(c,d){var A=d.toLowerCase();d!=A&&(Us(this,d),$s(this,A,c))},r)),r.j=a}function Lc(r,a){const c=new qe;if(u.Image){const d=new Image;d.onload=S(Kt,c,"TestLoadImage: loaded",!0,a,d),d.onerror=S(Kt,c,"TestLoadImage: error",!1,a,d),d.onabort=S(Kt,c,"TestLoadImage: abort",!1,a,d),d.ontimeout=S(Kt,c,"TestLoadImage: timeout",!1,a,d),u.setTimeout(function(){d.ontimeout&&d.ontimeout()},1e4),d.src=r}else a(!1)}function Fc(r,a){const c=new qe,d=new AbortController,A=setTimeout(()=>{d.abort(),Kt(c,"TestPingServer: timeout",!1,a)},1e4);fetch(r,{signal:d.signal}).then(P=>{clearTimeout(A),P.ok?Kt(c,"TestPingServer: ok",!0,a):Kt(c,"TestPingServer: server error",!1,a)}).catch(()=>{clearTimeout(A),Kt(c,"TestPingServer: error",!1,a)})}function Kt(r,a,c,d,A){try{A&&(A.onload=null,A.onerror=null,A.onabort=null,A.ontimeout=null),d(c)}catch{}}function Uc(){this.g=new Tc}function Bc(r,a,c){const d=c||"";try{Os(r,function(A,P){let V=A;f(A)&&(V=xi(A)),a.push(d+P+"="+encodeURIComponent(V))})}catch(A){throw a.push(d+"type="+encodeURIComponent("_badmap")),A}}function kn(r){this.l=r.Ub||null,this.j=r.eb||!1}R(kn,Li),kn.prototype.g=function(){return new On(this.l,this.j)},kn.prototype.i=(function(r){return function(){return r}})({});function On(r,a){ft.call(this),this.D=r,this.o=a,this.m=void 0,this.status=this.readyState=0,this.responseType=this.responseText=this.response=this.statusText="",this.onreadystatechange=null,this.u=new Headers,this.h=null,this.B="GET",this.A="",this.g=!1,this.v=this.j=this.l=null}R(On,ft),n=On.prototype,n.open=function(r,a){if(this.readyState!=0)throw this.abort(),Error("Error reopening a connection");this.B=r,this.A=a,this.readyState=1,Qe(this)},n.send=function(r){if(this.readyState!=1)throw this.abort(),Error("need to call open() first. ");this.g=!0;const a={headers:this.u,method:this.B,credentials:this.m,cache:void 0};r&&(a.body=r),(this.D||u).fetch(new Request(this.A,a)).then(this.Sa.bind(this),this.ga.bind(this))},n.abort=function(){this.response=this.responseText="",this.u=new Headers,this.status=0,this.j&&this.j.cancel("Request was aborted.").catch(()=>{}),1<=this.readyState&&this.g&&this.readyState!=4&&(this.g=!1,Ke(this)),this.readyState=0},n.Sa=function(r){if(this.g&&(this.l=r,this.h||(this.status=this.l.status,this.statusText=this.l.statusText,this.h=r.headers,this.readyState=2,Qe(this)),this.g&&(this.readyState=3,Qe(this),this.g)))if(this.responseType==="arraybuffer")r.arrayBuffer().then(this.Qa.bind(this),this.ga.bind(this));else if(typeof u.ReadableStream<"u"&&"body"in r){if(this.j=r.body.getReader(),this.o){if(this.responseType)throw Error('responseType must be empty for "streamBinaryChunks" mode responses.');this.response=[]}else this.response=this.responseText="",this.v=new TextDecoder;js(this)}else r.text().then(this.Ra.bind(this),this.ga.bind(this))};function js(r){r.j.read().then(r.Pa.bind(r)).catch(r.ga.bind(r))}n.Pa=function(r){if(this.g){if(this.o&&r.value)this.response.push(r.value);else if(!this.o){var a=r.value?r.value:new Uint8Array(0);(a=this.v.decode(a,{stream:!r.done}))&&(this.response=this.responseText+=a)}r.done?Ke(this):Qe(this),this.readyState==3&&js(this)}},n.Ra=function(r){this.g&&(this.response=this.responseText=r,Ke(this))},n.Qa=function(r){this.g&&(this.response=r,Ke(this))},n.ga=function(){this.g&&Ke(this)};function Ke(r){r.readyState=4,r.l=null,r.j=null,r.v=null,Qe(r)}n.setRequestHeader=function(r,a){this.u.append(r,a)},n.getResponseHeader=function(r){return this.h&&this.h.get(r.toLowerCase())||""},n.getAllResponseHeaders=function(){if(!this.h)return"";const r=[],a=this.h.entries();for(var c=a.next();!c.done;)c=c.value,r.push(c[0]+": "+c[1]),c=a.next();return r.join(`\r
`)};function Qe(r){r.onreadystatechange&&r.onreadystatechange.call(r)}Object.defineProperty(On.prototype,"withCredentials",{get:function(){return this.m==="include"},set:function(r){this.m=r?"include":"same-origin"}});function qs(r){let a="";return ht(r,function(c,d){a+=d,a+=":",a+=c,a+=`\r
`}),a}function Wi(r,a,c){t:{for(d in c){var d=!1;break t}d=!0}d||(c=qs(c),typeof r=="string"?c!=null&&encodeURIComponent(String(c)):K(r,a,c))}function J(r){ft.call(this),this.headers=new Map,this.o=r||null,this.h=!1,this.v=this.g=null,this.D="",this.m=0,this.l="",this.j=this.B=this.u=this.A=!1,this.I=null,this.H="",this.J=!1}R(J,ft);var $c=/^https?$/i,jc=["POST","PUT"];n=J.prototype,n.Ha=function(r){this.J=r},n.ea=function(r,a,c,d){if(this.g)throw Error("[goog.net.XhrIo] Object is active with another request="+this.D+"; newUri="+r);a=a?a.toUpperCase():"GET",this.D=r,this.l="",this.m=0,this.A=!1,this.h=!0,this.g=this.o?this.o.g():Bi.g(),this.v=this.o?_s(this.o):_s(Bi),this.g.onreadystatechange=w(this.Ea,this);try{this.B=!0,this.g.open(a,String(r),!0),this.B=!1}catch(P){zs(this,P);return}if(r=c||"",c=new Map(this.headers),d)if(Object.getPrototypeOf(d)===Object.prototype)for(var A in d)c.set(A,d[A]);else if(typeof d.keys=="function"&&typeof d.get=="function")for(const P of d.keys())c.set(P,d.get(P));else throw Error("Unknown input type for opt_headers: "+String(d));d=Array.from(c.keys()).find(P=>P.toLowerCase()=="content-type"),A=u.FormData&&r instanceof u.FormData,!(0<=Array.prototype.indexOf.call(jc,a,void 0))||d||A||c.set("Content-Type","application/x-www-form-urlencoded;charset=utf-8");for(const[P,V]of c)this.g.setRequestHeader(P,V);this.H&&(this.g.responseType=this.H),"withCredentials"in this.g&&this.g.withCredentials!==this.J&&(this.g.withCredentials=this.J);try{Ws(this),this.u=!0,this.g.send(r),this.u=!1}catch(P){zs(this,P)}};function zs(r,a){r.h=!1,r.g&&(r.j=!0,r.g.abort(),r.j=!1),r.l=a,r.m=5,Hs(r),xn(r)}function Hs(r){r.A||(r.A=!0,vt(r,"complete"),vt(r,"error"))}n.abort=function(r){this.g&&this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1,this.m=r||7,vt(this,"complete"),vt(this,"abort"),xn(this))},n.N=function(){this.g&&(this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1),xn(this,!0)),J.aa.N.call(this)},n.Ea=function(){this.s||(this.B||this.u||this.j?Gs(this):this.bb())},n.bb=function(){Gs(this)};function Gs(r){if(r.h&&typeof l<"u"&&(!r.v[1]||Ut(r)!=4||r.Z()!=2)){if(r.u&&Ut(r)==4)ps(r.Ea,0,r);else if(vt(r,"readystatechange"),Ut(r)==4){r.h=!1;try{const V=r.Z();t:switch(V){case 200:case 201:case 202:case 204:case 206:case 304:case 1223:var a=!0;break t;default:a=!1}var c;if(!(c=a)){var d;if(d=V===0){var A=String(r.D).match(xs)[1]||null;!A&&u.self&&u.self.location&&(A=u.self.location.protocol.slice(0,-1)),d=!$c.test(A?A.toLowerCase():"")}c=d}if(c)vt(r,"complete"),vt(r,"success");else{r.m=6;try{var P=2<Ut(r)?r.g.statusText:""}catch{P=""}r.l=P+" ["+r.Z()+"]",Hs(r)}}finally{xn(r)}}}}function xn(r,a){if(r.g){Ws(r);const c=r.g,d=r.v[0]?()=>{}:null;r.g=null,r.v=null,a||vt(r,"ready");try{c.onreadystatechange=d}catch{}}}function Ws(r){r.I&&(u.clearTimeout(r.I),r.I=null)}n.isActive=function(){return!!this.g};function Ut(r){return r.g?r.g.readyState:0}n.Z=function(){try{return 2<Ut(this)?this.g.status:-1}catch{return-1}},n.oa=function(){try{return this.g?this.g.responseText:""}catch{return""}},n.Oa=function(r){if(this.g){var a=this.g.responseText;return r&&a.indexOf(r)==0&&(a=a.substring(r.length)),vc(a)}};function Ks(r){try{if(!r.g)return null;if("response"in r.g)return r.g.response;switch(r.H){case"":case"text":return r.g.responseText;case"arraybuffer":if("mozResponseArrayBuffer"in r.g)return r.g.mozResponseArrayBuffer}return null}catch{return null}}function qc(r){const a={};r=(r.g&&2<=Ut(r)&&r.g.getAllResponseHeaders()||"").split(`\r
`);for(let d=0;d<r.length;d++){if(L(r[d]))continue;var c=T(r[d]);const A=c[0];if(c=c[1],typeof c!="string")continue;c=c.trim();const P=a[A]||[];a[A]=P,P.push(c)}_(a,function(d){return d.join(", ")})}n.Ba=function(){return this.m},n.Ka=function(){return typeof this.l=="string"?this.l:String(this.l)};function Xe(r,a,c){return c&&c.internalChannelParams&&c.internalChannelParams[r]||a}function Qs(r){this.Aa=0,this.i=[],this.j=new qe,this.ia=this.qa=this.I=this.W=this.g=this.ya=this.D=this.H=this.m=this.S=this.o=null,this.Ya=this.U=0,this.Va=Xe("failFast",!1,r),this.F=this.C=this.u=this.s=this.l=null,this.X=!0,this.za=this.T=-1,this.Y=this.v=this.B=0,this.Ta=Xe("baseRetryDelayMs",5e3,r),this.cb=Xe("retryDelaySeedMs",1e4,r),this.Wa=Xe("forwardChannelMaxRetries",2,r),this.wa=Xe("forwardChannelRequestTimeoutMs",2e4,r),this.pa=r&&r.xmlHttpFactory||void 0,this.Xa=r&&r.Tb||void 0,this.Ca=r&&r.useFetchStreams||!1,this.L=void 0,this.J=r&&r.supportsCrossDomainXhr||!1,this.K="",this.h=new Vs(r&&r.concurrentRequestLimit),this.Da=new Uc,this.P=r&&r.fastHandshake||!1,this.O=r&&r.encodeInitMessageHeaders||!1,this.P&&this.O&&(this.O=!1),this.Ua=r&&r.Rb||!1,r&&r.xa&&this.j.xa(),r&&r.forceLongPolling&&(this.X=!1),this.ba=!this.P&&this.X&&r&&r.detectBufferingProxy||!1,this.ja=void 0,r&&r.longPollingTimeout&&0<r.longPollingTimeout&&(this.ja=r.longPollingTimeout),this.ca=void 0,this.R=0,this.M=!1,this.ka=this.A=null}n=Qs.prototype,n.la=8,n.G=1,n.connect=function(r,a,c,d){Tt(0),this.W=r,this.H=a||{},c&&d!==void 0&&(this.H.OSID=c,this.H.OAID=d),this.F=this.X,this.I=ro(this,null,this.W),Fn(this)};function Ki(r){if(Xs(r),r.G==3){var a=r.U++,c=Ft(r.I);if(K(c,"SID",r.K),K(c,"RID",a),K(c,"TYPE","terminate"),Je(r,c),a=new Gt(r,r.j,a),a.L=2,a.v=Nn(Ft(c)),c=!1,u.navigator&&u.navigator.sendBeacon)try{c=u.navigator.sendBeacon(a.v.toString(),"")}catch{}!c&&u.Image&&(new Image().src=a.v,c=!0),c||(a.g=so(a.j,null),a.g.ea(a.v)),a.F=Date.now(),Vn(a)}io(r)}function Ln(r){r.g&&(Xi(r),r.g.cancel(),r.g=null)}function Xs(r){Ln(r),r.u&&(u.clearTimeout(r.u),r.u=null),Un(r),r.h.cancel(),r.s&&(typeof r.s=="number"&&u.clearTimeout(r.s),r.s=null)}function Fn(r){if(!Ds(r.h)&&!r.s){r.s=!0;var a=r.Ga;Pt||cs(),Le||(Pt(),Le=!0),Ci.add(a,r),r.B=0}}function zc(r,a){return Ms(r.h)>=r.h.j-(r.s?1:0)?!1:r.s?(r.i=a.D.concat(r.i),!0):r.G==1||r.G==2||r.B>=(r.Va?0:r.Wa)?!1:(r.s=je(w(r.Ga,r,a),no(r,r.B)),r.B++,!0)}n.Ga=function(r){if(this.s)if(this.s=null,this.G==1){if(!r){this.U=Math.floor(1e5*Math.random()),r=this.U++;const A=new Gt(this,this.j,r);let P=this.o;if(this.S&&(P?(P=p(P),E(P,this.S)):P=this.S),this.m!==null||this.O||(A.H=P,P=null),this.P)t:{for(var a=0,c=0;c<this.i.length;c++){e:{var d=this.i[c];if("__data__"in d.map&&(d=d.map.__data__,typeof d=="string")){d=d.length;break e}d=void 0}if(d===void 0)break;if(a+=d,4096<a){a=c;break t}if(a===4096||c===this.i.length-1){a=c+1;break t}}a=1e3}else a=1e3;a=Ys(this,A,a),c=Ft(this.I),K(c,"RID",r),K(c,"CVER",22),this.D&&K(c,"X-HTTP-Session-Id",this.D),Je(this,c),P&&(this.O?a="headers="+encodeURIComponent(String(qs(P)))+"&"+a:this.m&&Wi(c,this.m,P)),Gi(this.h,A),this.Ua&&K(c,"TYPE","init"),this.P?(K(c,"$req",a),K(c,"SID","null"),A.T=!0,ji(A,c,null)):ji(A,c,a),this.G=2}}else this.G==3&&(r?Js(this,r):this.i.length==0||Ds(this.h)||Js(this))};function Js(r,a){var c;a?c=a.l:c=r.U++;const d=Ft(r.I);K(d,"SID",r.K),K(d,"RID",c),K(d,"AID",r.T),Je(r,d),r.m&&r.o&&Wi(d,r.m,r.o),c=new Gt(r,r.j,c,r.B+1),r.m===null&&(c.H=r.o),a&&(r.i=a.D.concat(r.i)),a=Ys(r,c,1e3),c.I=Math.round(.5*r.wa)+Math.round(.5*r.wa*Math.random()),Gi(r.h,c),ji(c,d,a)}function Je(r,a){r.H&&ht(r.H,function(c,d){K(a,d,c)}),r.l&&Os({},function(c,d){K(a,d,c)})}function Ys(r,a,c){c=Math.min(r.i.length,c);var d=r.l?w(r.l.Na,r.l,r):null;t:{var A=r.i;let P=-1;for(;;){const V=["count="+c];P==-1?0<c?(P=A[0].g,V.push("ofs="+P)):P=0:V.push("ofs="+P);let G=!0;for(let ot=0;ot<c;ot++){let q=A[ot].g;const pt=A[ot].map;if(q-=P,0>q)P=Math.max(0,A[ot].g-100),G=!1;else try{Bc(pt,V,"req"+q+"_")}catch{d&&d(pt)}}if(G){d=V.join("&");break t}}}return r=r.i.splice(0,c),a.D=r,d}function Zs(r){if(!r.g&&!r.u){r.Y=1;var a=r.Fa;Pt||cs(),Le||(Pt(),Le=!0),Ci.add(a,r),r.v=0}}function Qi(r){return r.g||r.u||3<=r.v?!1:(r.Y++,r.u=je(w(r.Fa,r),no(r,r.v)),r.v++,!0)}n.Fa=function(){if(this.u=null,to(this),this.ba&&!(this.M||this.g==null||0>=this.R)){var r=2*this.R;this.j.info("BP detection timer enabled: "+r),this.A=je(w(this.ab,this),r)}},n.ab=function(){this.A&&(this.A=null,this.j.info("BP detection timeout reached."),this.j.info("Buffering proxy detected and switch to long-polling!"),this.F=!1,this.M=!0,Tt(10),Ln(this),to(this))};function Xi(r){r.A!=null&&(u.clearTimeout(r.A),r.A=null)}function to(r){r.g=new Gt(r,r.j,"rpc",r.Y),r.m===null&&(r.g.H=r.o),r.g.O=0;var a=Ft(r.qa);K(a,"RID","rpc"),K(a,"SID",r.K),K(a,"AID",r.T),K(a,"CI",r.F?"0":"1"),!r.F&&r.ja&&K(a,"TO",r.ja),K(a,"TYPE","xmlhttp"),Je(r,a),r.m&&r.o&&Wi(a,r.m,r.o),r.L&&(r.g.I=r.L);var c=r.g;r=r.ia,c.L=1,c.v=Nn(Ft(a)),c.m=null,c.P=!0,Ss(c,r)}n.Za=function(){this.C!=null&&(this.C=null,Ln(this),Qi(this),Tt(19))};function Un(r){r.C!=null&&(u.clearTimeout(r.C),r.C=null)}function eo(r,a){var c=null;if(r.g==a){Un(r),Xi(r),r.g=null;var d=2}else if(Hi(r.h,a))c=a.D,Ns(r.h,a),d=1;else return;if(r.G!=0){if(a.o)if(d==1){c=a.m?a.m.length:0,a=Date.now()-a.F;var A=r.B;d=Sn(),vt(d,new ws(d,c)),Fn(r)}else Zs(r);else if(A=a.s,A==3||A==0&&0<a.X||!(d==1&&zc(r,a)||d==2&&Qi(r)))switch(c&&0<c.length&&(a=r.h,a.i=a.i.concat(c)),A){case 1:oe(r,5);break;case 4:oe(r,10);break;case 3:oe(r,6);break;default:oe(r,2)}}}function no(r,a){let c=r.Ta+Math.floor(Math.random()*r.cb);return r.isActive()||(c*=2),c*a}function oe(r,a){if(r.j.info("Error code "+a),a==2){var c=w(r.fb,r),d=r.Xa;const A=!d;d=new se(d||"//www.google.com/images/cleardot.gif"),u.location&&u.location.protocol=="http"||Dn(d,"https"),Nn(d),A?Lc(d.toString(),c):Fc(d.toString(),c)}else Tt(2);r.G=0,r.l&&r.l.sa(a),io(r),Xs(r)}n.fb=function(r){r?(this.j.info("Successfully pinged google.com"),Tt(2)):(this.j.info("Failed to ping google.com"),Tt(1))};function io(r){if(r.G=0,r.ka=[],r.l){const a=ks(r.h);(a.length!=0||r.i.length!=0)&&(D(r.ka,a),D(r.ka,r.i),r.h.i.length=0,k(r.i),r.i.length=0),r.l.ra()}}function ro(r,a,c){var d=c instanceof se?Ft(c):new se(c);if(d.g!="")a&&(d.g=a+"."+d.g),Mn(d,d.s);else{var A=u.location;d=A.protocol,a=a?a+"."+A.hostname:A.hostname,A=+A.port;var P=new se(null);d&&Dn(P,d),a&&(P.g=a),A&&Mn(P,A),c&&(P.l=c),d=P}return c=r.D,a=r.ya,c&&a&&K(d,c,a),K(d,"VER",r.la),Je(r,d),d}function so(r,a,c){if(a&&!r.J)throw Error("Can't create secondary domain capable XhrIo object.");return a=r.Ca&&!r.pa?new J(new kn({eb:c})):new J(r.pa),a.Ha(r.J),a}n.isActive=function(){return!!this.l&&this.l.isActive(this)};function oo(){}n=oo.prototype,n.ua=function(){},n.ta=function(){},n.sa=function(){},n.ra=function(){},n.isActive=function(){return!0},n.Na=function(){};function Bn(){}Bn.prototype.g=function(r,a){return new bt(r,a)};function bt(r,a){ft.call(this),this.g=new Qs(a),this.l=r,this.h=a&&a.messageUrlParams||null,r=a&&a.messageHeaders||null,a&&a.clientProtocolHeaderRequired&&(r?r["X-Client-Protocol"]="webchannel":r={"X-Client-Protocol":"webchannel"}),this.g.o=r,r=a&&a.initMessageHeaders||null,a&&a.messageContentType&&(r?r["X-WebChannel-Content-Type"]=a.messageContentType:r={"X-WebChannel-Content-Type":a.messageContentType}),a&&a.va&&(r?r["X-WebChannel-Client-Profile"]=a.va:r={"X-WebChannel-Client-Profile":a.va}),this.g.S=r,(r=a&&a.Sb)&&!L(r)&&(this.g.m=r),this.v=a&&a.supportsCrossDomainXhr||!1,this.u=a&&a.sendRawJson||!1,(a=a&&a.httpSessionIdParam)&&!L(a)&&(this.g.D=a,r=this.h,r!==null&&a in r&&(r=this.h,a in r&&delete r[a])),this.j=new Ie(this)}R(bt,ft),bt.prototype.m=function(){this.g.l=this.j,this.v&&(this.g.J=!0),this.g.connect(this.l,this.h||void 0)},bt.prototype.close=function(){Ki(this.g)},bt.prototype.o=function(r){var a=this.g;if(typeof r=="string"){var c={};c.__data__=r,r=c}else this.u&&(c={},c.__data__=xi(r),r=c);a.i.push(new Sc(a.Ya++,r)),a.G==3&&Fn(a)},bt.prototype.N=function(){this.g.l=null,delete this.j,Ki(this.g),delete this.g,bt.aa.N.call(this)};function ao(r){Fi.call(this),r.__headers__&&(this.headers=r.__headers__,this.statusCode=r.__status__,delete r.__headers__,delete r.__status__);var a=r.__sm__;if(a){t:{for(const c in a){r=c;break t}r=void 0}(this.i=r)&&(r=this.i,a=a!==null&&r in a?a[r]:void 0),this.data=a}else this.data=r}R(ao,Fi);function lo(){Ui.call(this),this.status=1}R(lo,Ui);function Ie(r){this.g=r}R(Ie,oo),Ie.prototype.ua=function(){vt(this.g,"a")},Ie.prototype.ta=function(r){vt(this.g,new ao(r))},Ie.prototype.sa=function(r){vt(this.g,new lo)},Ie.prototype.ra=function(){vt(this.g,"b")},Bn.prototype.createWebChannel=Bn.prototype.g,bt.prototype.send=bt.prototype.o,bt.prototype.open=bt.prototype.m,bt.prototype.close=bt.prototype.close,rl=function(){return new Bn},il=function(){return Sn()},nl=ie,mr={mb:0,pb:1,qb:2,Jb:3,Ob:4,Lb:5,Mb:6,Kb:7,Ib:8,Nb:9,PROXY:10,NOPROXY:11,Gb:12,Cb:13,Db:14,Bb:15,Eb:16,Fb:17,ib:18,hb:19,jb:20},Cn.NO_ERROR=0,Cn.TIMEOUT=8,Cn.HTTP_ERROR=6,Qn=Cn,As.COMPLETE="complete",el=As,Es.EventType=Be,Be.OPEN="a",Be.CLOSE="b",Be.ERROR="c",Be.MESSAGE="d",ft.prototype.listen=ft.prototype.K,tn=Es,J.prototype.listenOnce=J.prototype.L,J.prototype.getLastError=J.prototype.Ka,J.prototype.getLastErrorCode=J.prototype.Ba,J.prototype.getStatus=J.prototype.Z,J.prototype.getResponseJson=J.prototype.Oa,J.prototype.getResponseText=J.prototype.oa,J.prototype.send=J.prototype.ea,J.prototype.setWithCredentials=J.prototype.Ha,tl=J}).apply(typeof jn<"u"?jn:typeof self<"u"?self:typeof window<"u"?window:{});const No="@firebase/firestore",ko="4.9.0";/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class yt{constructor(t){this.uid=t}isAuthenticated(){return this.uid!=null}toKey(){return this.isAuthenticated()?"uid:"+this.uid:"anonymous-user"}isEqual(t){return t.uid===this.uid}}yt.UNAUTHENTICATED=new yt(null),yt.GOOGLE_CREDENTIALS=new yt("google-credentials-uid"),yt.FIRST_PARTY=new yt("first-party-uid"),yt.MOCK_USER=new yt("mock-user");/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Oe="12.0.0";/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const pe=new Dr("@firebase/firestore");function Pe(){return pe.logLevel}function M(n,...t){if(pe.logLevel<=B.DEBUG){const e=t.map(Ur);pe.debug(`Firestore (${Oe}): ${n}`,...e)}}function me(n,...t){if(pe.logLevel<=B.ERROR){const e=t.map(Ur);pe.error(`Firestore (${Oe}): ${n}`,...e)}}function Ei(n,...t){if(pe.logLevel<=B.WARN){const e=t.map(Ur);pe.warn(`Firestore (${Oe}): ${n}`,...e)}}function Ur(n){if(typeof n=="string")return n;try{/**
* @license
* Copyright 2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/return(function(e){return JSON.stringify(e)})(n)}catch{return n}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function F(n,t,e){let i="Unexpected state";typeof t=="string"?i=t:e=t,sl(n,i,e)}function sl(n,t,e){let i=`FIRESTORE (${Oe}) INTERNAL ASSERTION FAILED: ${t} (ID: ${n.toString(16)})`;if(e!==void 0)try{i+=" CONTEXT: "+JSON.stringify(e)}catch{i+=" CONTEXT: "+e}throw me(i),new Error(i)}function Y(n,t,e,i){let s="Unexpected state";typeof e=="string"?s=e:i=e,n||sl(t,s,i)}function W(n,t){return n}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const C={OK:"ok",CANCELLED:"cancelled",UNKNOWN:"unknown",INVALID_ARGUMENT:"invalid-argument",DEADLINE_EXCEEDED:"deadline-exceeded",NOT_FOUND:"not-found",ALREADY_EXISTS:"already-exists",PERMISSION_DENIED:"permission-denied",UNAUTHENTICATED:"unauthenticated",RESOURCE_EXHAUSTED:"resource-exhausted",FAILED_PRECONDITION:"failed-precondition",ABORTED:"aborted",OUT_OF_RANGE:"out-of-range",UNIMPLEMENTED:"unimplemented",INTERNAL:"internal",UNAVAILABLE:"unavailable",DATA_LOSS:"data-loss"};class N extends ne{constructor(t,e){super(t,e),this.code=t,this.message=e,this.toString=()=>`${this.name}: [code=${this.code}]: ${this.message}`}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ue{constructor(){this.promise=new Promise(((t,e)=>{this.resolve=t,this.reject=e}))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ol{constructor(t,e){this.user=e,this.type="OAuth",this.headers=new Map,this.headers.set("Authorization",`Bearer ${t}`)}}class tf{getToken(){return Promise.resolve(null)}invalidateToken(){}start(t,e){t.enqueueRetryable((()=>e(yt.UNAUTHENTICATED)))}shutdown(){}}class ef{constructor(t){this.token=t,this.changeListener=null}getToken(){return Promise.resolve(this.token)}invalidateToken(){}start(t,e){this.changeListener=e,t.enqueueRetryable((()=>e(this.token.user)))}shutdown(){this.changeListener=null}}class nf{constructor(t){this.t=t,this.currentUser=yt.UNAUTHENTICATED,this.i=0,this.forceRefresh=!1,this.auth=null}start(t,e){Y(this.o===void 0,42304);let i=this.i;const s=h=>this.i!==i?(i=this.i,e(h)):Promise.resolve();let o=new ue;this.o=()=>{this.i++,this.currentUser=this.u(),o.resolve(),o=new ue,t.enqueueRetryable((()=>s(this.currentUser)))};const l=()=>{const h=o;t.enqueueRetryable((async()=>{await h.promise,await s(this.currentUser)}))},u=h=>{M("FirebaseAuthCredentialsProvider","Auth detected"),this.auth=h,this.o&&(this.auth.addAuthTokenListener(this.o),l())};this.t.onInit((h=>u(h))),setTimeout((()=>{if(!this.auth){const h=this.t.getImmediate({optional:!0});h?u(h):(M("FirebaseAuthCredentialsProvider","Auth not yet detected"),o.resolve(),o=new ue)}}),0),l()}getToken(){const t=this.i,e=this.forceRefresh;return this.forceRefresh=!1,this.auth?this.auth.getToken(e).then((i=>this.i!==t?(M("FirebaseAuthCredentialsProvider","getToken aborted due to token change."),this.getToken()):i?(Y(typeof i.accessToken=="string",31837,{l:i}),new ol(i.accessToken,this.currentUser)):null)):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.auth&&this.o&&this.auth.removeAuthTokenListener(this.o),this.o=void 0}u(){const t=this.auth&&this.auth.getUid();return Y(t===null||typeof t=="string",2055,{h:t}),new yt(t)}}class rf{constructor(t,e,i){this.P=t,this.T=e,this.I=i,this.type="FirstParty",this.user=yt.FIRST_PARTY,this.A=new Map}R(){return this.I?this.I():null}get headers(){this.A.set("X-Goog-AuthUser",this.P);const t=this.R();return t&&this.A.set("Authorization",t),this.T&&this.A.set("X-Goog-Iam-Authorization-Token",this.T),this.A}}class sf{constructor(t,e,i){this.P=t,this.T=e,this.I=i}getToken(){return Promise.resolve(new rf(this.P,this.T,this.I))}start(t,e){t.enqueueRetryable((()=>e(yt.FIRST_PARTY)))}shutdown(){}invalidateToken(){}}class Oo{constructor(t){this.value=t,this.type="AppCheck",this.headers=new Map,t&&t.length>0&&this.headers.set("x-firebase-appcheck",this.value)}}class of{constructor(t,e){this.V=e,this.forceRefresh=!1,this.appCheck=null,this.m=null,this.p=null,Eh(t)&&t.settings.appCheckToken&&(this.p=t.settings.appCheckToken)}start(t,e){Y(this.o===void 0,3512);const i=o=>{o.error!=null&&M("FirebaseAppCheckTokenProvider",`Error getting App Check token; using placeholder token instead. Error: ${o.error.message}`);const l=o.token!==this.m;return this.m=o.token,M("FirebaseAppCheckTokenProvider",`Received ${l?"new":"existing"} token.`),l?e(o.token):Promise.resolve()};this.o=o=>{t.enqueueRetryable((()=>i(o)))};const s=o=>{M("FirebaseAppCheckTokenProvider","AppCheck detected"),this.appCheck=o,this.o&&this.appCheck.addTokenListener(this.o)};this.V.onInit((o=>s(o))),setTimeout((()=>{if(!this.appCheck){const o=this.V.getImmediate({optional:!0});o?s(o):M("FirebaseAppCheckTokenProvider","AppCheck not yet detected")}}),0)}getToken(){if(this.p)return Promise.resolve(new Oo(this.p));const t=this.forceRefresh;return this.forceRefresh=!1,this.appCheck?this.appCheck.getToken(t).then((e=>e?(Y(typeof e.token=="string",44558,{tokenResult:e}),this.m=e.token,new Oo(e.token)):null)):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.appCheck&&this.o&&this.appCheck.removeTokenListener(this.o),this.o=void 0}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function af(n){const t=typeof self<"u"&&(self.crypto||self.msCrypto),e=new Uint8Array(n);if(t&&typeof t.getRandomValues=="function")t.getRandomValues(e);else for(let i=0;i<n;i++)e[i]=Math.floor(256*Math.random());return e}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Br{static newId(){const t="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",e=62*Math.floor(4.129032258064516);let i="";for(;i.length<20;){const s=af(40);for(let o=0;o<s.length;++o)i.length<20&&s[o]<e&&(i+=t.charAt(s[o]%62))}return i}}function z(n,t){return n<t?-1:n>t?1:0}function gr(n,t){const e=Math.min(n.length,t.length);for(let i=0;i<e;i++){const s=n.charAt(i),o=t.charAt(i);if(s!==o)return sr(s)===sr(o)?z(s,o):sr(s)?1:-1}return z(n.length,t.length)}const lf=55296,cf=57343;function sr(n){const t=n.charCodeAt(0);return t>=lf&&t<=cf}function Ve(n,t,e){return n.length===t.length&&n.every(((i,s)=>e(i,t[s])))}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const xo="__name__";class kt{constructor(t,e,i){e===void 0?e=0:e>t.length&&F(637,{offset:e,range:t.length}),i===void 0?i=t.length-e:i>t.length-e&&F(1746,{length:i,range:t.length-e}),this.segments=t,this.offset=e,this.len=i}get length(){return this.len}isEqual(t){return kt.comparator(this,t)===0}child(t){const e=this.segments.slice(this.offset,this.limit());return t instanceof kt?t.forEach((i=>{e.push(i)})):e.push(t),this.construct(e)}limit(){return this.offset+this.length}popFirst(t){return t=t===void 0?1:t,this.construct(this.segments,this.offset+t,this.length-t)}popLast(){return this.construct(this.segments,this.offset,this.length-1)}firstSegment(){return this.segments[this.offset]}lastSegment(){return this.get(this.length-1)}get(t){return this.segments[this.offset+t]}isEmpty(){return this.length===0}isPrefixOf(t){if(t.length<this.length)return!1;for(let e=0;e<this.length;e++)if(this.get(e)!==t.get(e))return!1;return!0}isImmediateParentOf(t){if(this.length+1!==t.length)return!1;for(let e=0;e<this.length;e++)if(this.get(e)!==t.get(e))return!1;return!0}forEach(t){for(let e=this.offset,i=this.limit();e<i;e++)t(this.segments[e])}toArray(){return this.segments.slice(this.offset,this.limit())}static comparator(t,e){const i=Math.min(t.length,e.length);for(let s=0;s<i;s++){const o=kt.compareSegments(t.get(s),e.get(s));if(o!==0)return o}return z(t.length,e.length)}static compareSegments(t,e){const i=kt.isNumericId(t),s=kt.isNumericId(e);return i&&!s?-1:!i&&s?1:i&&s?kt.extractNumericId(t).compare(kt.extractNumericId(e)):gr(t,e)}static isNumericId(t){return t.startsWith("__id")&&t.endsWith("__")}static extractNumericId(t){return Fr.fromString(t.substring(4,t.length-2))}}class Z extends kt{construct(t,e,i){return new Z(t,e,i)}canonicalString(){return this.toArray().join("/")}toString(){return this.canonicalString()}toUriEncodedString(){return this.toArray().map(encodeURIComponent).join("/")}static fromString(...t){const e=[];for(const i of t){if(i.indexOf("//")>=0)throw new N(C.INVALID_ARGUMENT,`Invalid segment (${i}). Paths must not contain // in them.`);e.push(...i.split("/").filter((s=>s.length>0)))}return new Z(e)}static emptyPath(){return new Z([])}}const uf=/^[_a-zA-Z][_a-zA-Z0-9]*$/;class ct extends kt{construct(t,e,i){return new ct(t,e,i)}static isValidIdentifier(t){return uf.test(t)}canonicalString(){return this.toArray().map((t=>(t=t.replace(/\\/g,"\\\\").replace(/`/g,"\\`"),ct.isValidIdentifier(t)||(t="`"+t+"`"),t))).join(".")}toString(){return this.canonicalString()}isKeyField(){return this.length===1&&this.get(0)===xo}static keyField(){return new ct([xo])}static fromServerFormat(t){const e=[];let i="",s=0;const o=()=>{if(i.length===0)throw new N(C.INVALID_ARGUMENT,`Invalid field path (${t}). Paths must not be empty, begin with '.', end with '.', or contain '..'`);e.push(i),i=""};let l=!1;for(;s<t.length;){const u=t[s];if(u==="\\"){if(s+1===t.length)throw new N(C.INVALID_ARGUMENT,"Path has trailing escape character: "+t);const h=t[s+1];if(h!=="\\"&&h!=="."&&h!=="`")throw new N(C.INVALID_ARGUMENT,"Path has invalid escape sequence: "+t);i+=h,s+=2}else u==="`"?(l=!l,s++):u!=="."||l?(i+=u,s++):(o(),s++)}if(o(),l)throw new N(C.INVALID_ARGUMENT,"Unterminated ` in path: "+t);return new ct(e)}static emptyPath(){return new ct([])}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class x{constructor(t){this.path=t}static fromPath(t){return new x(Z.fromString(t))}static fromName(t){return new x(Z.fromString(t).popFirst(5))}static empty(){return new x(Z.emptyPath())}get collectionGroup(){return this.path.popLast().lastSegment()}hasCollectionId(t){return this.path.length>=2&&this.path.get(this.path.length-2)===t}getCollectionGroup(){return this.path.get(this.path.length-2)}getCollectionPath(){return this.path.popLast()}isEqual(t){return t!==null&&Z.comparator(this.path,t.path)===0}toString(){return this.path.toString()}static comparator(t,e){return Z.comparator(t.path,e.path)}static isDocumentKey(t){return t.length%2==0}static fromSegments(t){return new x(new Z(t.slice()))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function hf(n,t,e){if(!e)throw new N(C.INVALID_ARGUMENT,`Function ${n}() cannot be called with an empty ${t}.`)}function df(n,t,e,i){if(t===!0&&i===!0)throw new N(C.INVALID_ARGUMENT,`${n} and ${e} cannot be used together.`)}function Lo(n){if(!x.isDocumentKey(n))throw new N(C.INVALID_ARGUMENT,`Invalid document reference. Document references must have an even number of segments, but ${n} has ${n.length}.`)}function al(n){return typeof n=="object"&&n!==null&&(Object.getPrototypeOf(n)===Object.prototype||Object.getPrototypeOf(n)===null)}function $r(n){if(n===void 0)return"undefined";if(n===null)return"null";if(typeof n=="string")return n.length>20&&(n=`${n.substring(0,20)}...`),JSON.stringify(n);if(typeof n=="number"||typeof n=="boolean")return""+n;if(typeof n=="object"){if(n instanceof Array)return"an array";{const t=(function(i){return i.constructor?i.constructor.name:null})(n);return t?`a custom ${t} object`:"an object"}}return typeof n=="function"?"a function":F(12329,{type:typeof n})}function yr(n,t){if("_delegate"in n&&(n=n._delegate),!(n instanceof t)){if(t.name===n.constructor.name)throw new N(C.INVALID_ARGUMENT,"Type does not match the expected instance. Did you pass a reference from a different Firestore SDK?");{const e=$r(n);throw new N(C.INVALID_ARGUMENT,`Expected type '${t.name}', but it was: ${e}`)}}return n}/**
 * @license
 * Copyright 2025 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function et(n,t){const e={typeString:n};return t&&(e.value=t),e}function yn(n,t){if(!al(n))throw new N(C.INVALID_ARGUMENT,"JSON must be an object");let e;for(const i in t)if(t[i]){const s=t[i].typeString,o="value"in t[i]?{value:t[i].value}:void 0;if(!(i in n)){e=`JSON missing required field: '${i}'`;break}const l=n[i];if(s&&typeof l!==s){e=`JSON field '${i}' must be a ${s}.`;break}if(o!==void 0&&l!==o.value){e=`Expected '${i}' field to equal '${o.value}'`;break}}if(e)throw new N(C.INVALID_ARGUMENT,e);return!0}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Fo=-62135596800,Uo=1e6;class X{static now(){return X.fromMillis(Date.now())}static fromDate(t){return X.fromMillis(t.getTime())}static fromMillis(t){const e=Math.floor(t/1e3),i=Math.floor((t-1e3*e)*Uo);return new X(e,i)}constructor(t,e){if(this.seconds=t,this.nanoseconds=e,e<0)throw new N(C.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+e);if(e>=1e9)throw new N(C.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+e);if(t<Fo)throw new N(C.INVALID_ARGUMENT,"Timestamp seconds out of range: "+t);if(t>=253402300800)throw new N(C.INVALID_ARGUMENT,"Timestamp seconds out of range: "+t)}toDate(){return new Date(this.toMillis())}toMillis(){return 1e3*this.seconds+this.nanoseconds/Uo}_compareTo(t){return this.seconds===t.seconds?z(this.nanoseconds,t.nanoseconds):z(this.seconds,t.seconds)}isEqual(t){return t.seconds===this.seconds&&t.nanoseconds===this.nanoseconds}toString(){return"Timestamp(seconds="+this.seconds+", nanoseconds="+this.nanoseconds+")"}toJSON(){return{type:X._jsonSchemaVersion,seconds:this.seconds,nanoseconds:this.nanoseconds}}static fromJSON(t){if(yn(t,X._jsonSchema))return new X(t.seconds,t.nanoseconds)}valueOf(){const t=this.seconds-Fo;return String(t).padStart(12,"0")+"."+String(this.nanoseconds).padStart(9,"0")}}X._jsonSchemaVersion="firestore/timestamp/1.0",X._jsonSchema={type:et("string",X._jsonSchemaVersion),seconds:et("number"),nanoseconds:et("number")};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Q{static fromTimestamp(t){return new Q(t)}static min(){return new Q(new X(0,0))}static max(){return new Q(new X(253402300799,999999999))}constructor(t){this.timestamp=t}compareTo(t){return this.timestamp._compareTo(t.timestamp)}isEqual(t){return this.timestamp.isEqual(t.timestamp)}toMicroseconds(){return 1e6*this.timestamp.seconds+this.timestamp.nanoseconds/1e3}toString(){return"SnapshotVersion("+this.timestamp.toString()+")"}toTimestamp(){return this.timestamp}}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const hn=-1;function ff(n,t){const e=n.toTimestamp().seconds,i=n.toTimestamp().nanoseconds+1,s=Q.fromTimestamp(i===1e9?new X(e+1,0):new X(e,i));return new Yt(s,x.empty(),t)}function pf(n){return new Yt(n.readTime,n.key,hn)}class Yt{constructor(t,e,i){this.readTime=t,this.documentKey=e,this.largestBatchId=i}static min(){return new Yt(Q.min(),x.empty(),hn)}static max(){return new Yt(Q.max(),x.empty(),hn)}}function mf(n,t){let e=n.readTime.compareTo(t.readTime);return e!==0?e:(e=x.comparator(n.documentKey,t.documentKey),e!==0?e:z(n.largestBatchId,t.largestBatchId))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const gf="The current tab is not in the required state to perform this operation. It might be necessary to refresh the browser tab.";class yf{constructor(){this.onCommittedListeners=[]}addOnCommittedListener(t){this.onCommittedListeners.push(t)}raiseOnCommittedEvent(){this.onCommittedListeners.forEach((t=>t()))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function jr(n){if(n.code!==C.FAILED_PRECONDITION||n.message!==gf)throw n;M("LocalStore","Unexpectedly lost primary lease")}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class b{constructor(t){this.nextCallback=null,this.catchCallback=null,this.result=void 0,this.error=void 0,this.isDone=!1,this.callbackAttached=!1,t((e=>{this.isDone=!0,this.result=e,this.nextCallback&&this.nextCallback(e)}),(e=>{this.isDone=!0,this.error=e,this.catchCallback&&this.catchCallback(e)}))}catch(t){return this.next(void 0,t)}next(t,e){return this.callbackAttached&&F(59440),this.callbackAttached=!0,this.isDone?this.error?this.wrapFailure(e,this.error):this.wrapSuccess(t,this.result):new b(((i,s)=>{this.nextCallback=o=>{this.wrapSuccess(t,o).next(i,s)},this.catchCallback=o=>{this.wrapFailure(e,o).next(i,s)}}))}toPromise(){return new Promise(((t,e)=>{this.next(t,e)}))}wrapUserFunction(t){try{const e=t();return e instanceof b?e:b.resolve(e)}catch(e){return b.reject(e)}}wrapSuccess(t,e){return t?this.wrapUserFunction((()=>t(e))):b.resolve(e)}wrapFailure(t,e){return t?this.wrapUserFunction((()=>t(e))):b.reject(e)}static resolve(t){return new b(((e,i)=>{e(t)}))}static reject(t){return new b(((e,i)=>{i(t)}))}static waitFor(t){return new b(((e,i)=>{let s=0,o=0,l=!1;t.forEach((u=>{++s,u.next((()=>{++o,l&&o===s&&e()}),(h=>i(h)))})),l=!0,o===s&&e()}))}static or(t){let e=b.resolve(!1);for(const i of t)e=e.next((s=>s?b.resolve(s):i()));return e}static forEach(t,e){const i=[];return t.forEach(((s,o)=>{i.push(e.call(this,s,o))})),this.waitFor(i)}static mapArray(t,e){return new b(((i,s)=>{const o=t.length,l=new Array(o);let u=0;for(let h=0;h<o;h++){const f=h;e(t[f]).next((y=>{l[f]=y,++u,u===o&&i(l)}),(y=>s(y)))}}))}static doWhile(t,e){return new b(((i,s)=>{const o=()=>{t()===!0?e().next((()=>{o()}),s):i()};o()}))}}function _f(n){const t=n.match(/Android ([\d.]+)/i),e=t?t[1].split(".").slice(0,2).join("."):"-1";return Number(e)}function _n(n){return n.name==="IndexedDbTransactionError"}/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class qr{constructor(t,e){this.previousValue=t,e&&(e.sequenceNumberHandler=i=>this.ae(i),this.ue=i=>e.writeSequenceNumber(i))}ae(t){return this.previousValue=Math.max(t,this.previousValue),this.previousValue}next(){const t=++this.previousValue;return this.ue&&this.ue(t),t}}qr.ce=-1;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const zr=-1;function Hr(n){return n==null}function ri(n){return n===0&&1/n==-1/0}function Ef(n){return typeof n=="number"&&Number.isInteger(n)&&!ri(n)&&n<=Number.MAX_SAFE_INTEGER&&n>=Number.MIN_SAFE_INTEGER}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ll="";function vf(n){let t="";for(let e=0;e<n.length;e++)t.length>0&&(t=Bo(t)),t=Tf(n.get(e),t);return Bo(t)}function Tf(n,t){let e=t;const i=n.length;for(let s=0;s<i;s++){const o=n.charAt(s);switch(o){case"\0":e+="";break;case ll:e+="";break;default:e+=o}}return e}function Bo(n){return n+ll+""}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function $o(n){let t=0;for(const e in n)Object.prototype.hasOwnProperty.call(n,e)&&t++;return t}function xe(n,t){for(const e in n)Object.prototype.hasOwnProperty.call(n,e)&&t(e,n[e])}function cl(n){for(const t in n)if(Object.prototype.hasOwnProperty.call(n,t))return!1;return!0}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class At{constructor(t,e){this.comparator=t,this.root=e||at.EMPTY}insert(t,e){return new At(this.comparator,this.root.insert(t,e,this.comparator).copy(null,null,at.BLACK,null,null))}remove(t){return new At(this.comparator,this.root.remove(t,this.comparator).copy(null,null,at.BLACK,null,null))}get(t){let e=this.root;for(;!e.isEmpty();){const i=this.comparator(t,e.key);if(i===0)return e.value;i<0?e=e.left:i>0&&(e=e.right)}return null}indexOf(t){let e=0,i=this.root;for(;!i.isEmpty();){const s=this.comparator(t,i.key);if(s===0)return e+i.left.size;s<0?i=i.left:(e+=i.left.size+1,i=i.right)}return-1}isEmpty(){return this.root.isEmpty()}get size(){return this.root.size}minKey(){return this.root.minKey()}maxKey(){return this.root.maxKey()}inorderTraversal(t){return this.root.inorderTraversal(t)}forEach(t){this.inorderTraversal(((e,i)=>(t(e,i),!1)))}toString(){const t=[];return this.inorderTraversal(((e,i)=>(t.push(`${e}:${i}`),!1))),`{${t.join(", ")}}`}reverseTraversal(t){return this.root.reverseTraversal(t)}getIterator(){return new qn(this.root,null,this.comparator,!1)}getIteratorFrom(t){return new qn(this.root,t,this.comparator,!1)}getReverseIterator(){return new qn(this.root,null,this.comparator,!0)}getReverseIteratorFrom(t){return new qn(this.root,t,this.comparator,!0)}}class qn{constructor(t,e,i,s){this.isReverse=s,this.nodeStack=[];let o=1;for(;!t.isEmpty();)if(o=e?i(t.key,e):1,e&&s&&(o*=-1),o<0)t=this.isReverse?t.left:t.right;else{if(o===0){this.nodeStack.push(t);break}this.nodeStack.push(t),t=this.isReverse?t.right:t.left}}getNext(){let t=this.nodeStack.pop();const e={key:t.key,value:t.value};if(this.isReverse)for(t=t.left;!t.isEmpty();)this.nodeStack.push(t),t=t.right;else for(t=t.right;!t.isEmpty();)this.nodeStack.push(t),t=t.left;return e}hasNext(){return this.nodeStack.length>0}peek(){if(this.nodeStack.length===0)return null;const t=this.nodeStack[this.nodeStack.length-1];return{key:t.key,value:t.value}}}class at{constructor(t,e,i,s,o){this.key=t,this.value=e,this.color=i??at.RED,this.left=s??at.EMPTY,this.right=o??at.EMPTY,this.size=this.left.size+1+this.right.size}copy(t,e,i,s,o){return new at(t??this.key,e??this.value,i??this.color,s??this.left,o??this.right)}isEmpty(){return!1}inorderTraversal(t){return this.left.inorderTraversal(t)||t(this.key,this.value)||this.right.inorderTraversal(t)}reverseTraversal(t){return this.right.reverseTraversal(t)||t(this.key,this.value)||this.left.reverseTraversal(t)}min(){return this.left.isEmpty()?this:this.left.min()}minKey(){return this.min().key}maxKey(){return this.right.isEmpty()?this.key:this.right.maxKey()}insert(t,e,i){let s=this;const o=i(t,s.key);return s=o<0?s.copy(null,null,null,s.left.insert(t,e,i),null):o===0?s.copy(null,e,null,null,null):s.copy(null,null,null,null,s.right.insert(t,e,i)),s.fixUp()}removeMin(){if(this.left.isEmpty())return at.EMPTY;let t=this;return t.left.isRed()||t.left.left.isRed()||(t=t.moveRedLeft()),t=t.copy(null,null,null,t.left.removeMin(),null),t.fixUp()}remove(t,e){let i,s=this;if(e(t,s.key)<0)s.left.isEmpty()||s.left.isRed()||s.left.left.isRed()||(s=s.moveRedLeft()),s=s.copy(null,null,null,s.left.remove(t,e),null);else{if(s.left.isRed()&&(s=s.rotateRight()),s.right.isEmpty()||s.right.isRed()||s.right.left.isRed()||(s=s.moveRedRight()),e(t,s.key)===0){if(s.right.isEmpty())return at.EMPTY;i=s.right.min(),s=s.copy(i.key,i.value,null,null,s.right.removeMin())}s=s.copy(null,null,null,null,s.right.remove(t,e))}return s.fixUp()}isRed(){return this.color}fixUp(){let t=this;return t.right.isRed()&&!t.left.isRed()&&(t=t.rotateLeft()),t.left.isRed()&&t.left.left.isRed()&&(t=t.rotateRight()),t.left.isRed()&&t.right.isRed()&&(t=t.colorFlip()),t}moveRedLeft(){let t=this.colorFlip();return t.right.left.isRed()&&(t=t.copy(null,null,null,null,t.right.rotateRight()),t=t.rotateLeft(),t=t.colorFlip()),t}moveRedRight(){let t=this.colorFlip();return t.left.left.isRed()&&(t=t.rotateRight(),t=t.colorFlip()),t}rotateLeft(){const t=this.copy(null,null,at.RED,null,this.right.left);return this.right.copy(null,null,this.color,t,null)}rotateRight(){const t=this.copy(null,null,at.RED,this.left.right,null);return this.left.copy(null,null,this.color,null,t)}colorFlip(){const t=this.left.copy(null,null,!this.left.color,null,null),e=this.right.copy(null,null,!this.right.color,null,null);return this.copy(null,null,!this.color,t,e)}checkMaxDepth(){const t=this.check();return Math.pow(2,t)<=this.size+1}check(){if(this.isRed()&&this.left.isRed())throw F(43730,{key:this.key,value:this.value});if(this.right.isRed())throw F(14113,{key:this.key,value:this.value});const t=this.left.check();if(t!==this.right.check())throw F(27949);return t+(this.isRed()?0:1)}}at.EMPTY=null,at.RED=!0,at.BLACK=!1;at.EMPTY=new class{constructor(){this.size=0}get key(){throw F(57766)}get value(){throw F(16141)}get color(){throw F(16727)}get left(){throw F(29726)}get right(){throw F(36894)}copy(t,e,i,s,o){return this}insert(t,e,i){return new at(t,e)}remove(t,e){return this}isEmpty(){return!0}inorderTraversal(t){return!1}reverseTraversal(t){return!1}minKey(){return null}maxKey(){return null}isRed(){return!1}checkMaxDepth(){return!0}check(){return 0}};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ut{constructor(t){this.comparator=t,this.data=new At(this.comparator)}has(t){return this.data.get(t)!==null}first(){return this.data.minKey()}last(){return this.data.maxKey()}get size(){return this.data.size}indexOf(t){return this.data.indexOf(t)}forEach(t){this.data.inorderTraversal(((e,i)=>(t(e),!1)))}forEachInRange(t,e){const i=this.data.getIteratorFrom(t[0]);for(;i.hasNext();){const s=i.getNext();if(this.comparator(s.key,t[1])>=0)return;e(s.key)}}forEachWhile(t,e){let i;for(i=e!==void 0?this.data.getIteratorFrom(e):this.data.getIterator();i.hasNext();)if(!t(i.getNext().key))return}firstAfterOrEqual(t){const e=this.data.getIteratorFrom(t);return e.hasNext()?e.getNext().key:null}getIterator(){return new jo(this.data.getIterator())}getIteratorFrom(t){return new jo(this.data.getIteratorFrom(t))}add(t){return this.copy(this.data.remove(t).insert(t,!0))}delete(t){return this.has(t)?this.copy(this.data.remove(t)):this}isEmpty(){return this.data.isEmpty()}unionWith(t){let e=this;return e.size<t.size&&(e=t,t=this),t.forEach((i=>{e=e.add(i)})),e}isEqual(t){if(!(t instanceof ut)||this.size!==t.size)return!1;const e=this.data.getIterator(),i=t.data.getIterator();for(;e.hasNext();){const s=e.getNext().key,o=i.getNext().key;if(this.comparator(s,o)!==0)return!1}return!0}toArray(){const t=[];return this.forEach((e=>{t.push(e)})),t}toString(){const t=[];return this.forEach((e=>t.push(e))),"SortedSet("+t.toString()+")"}copy(t){const e=new ut(this.comparator);return e.data=t,e}}class jo{constructor(t){this.iter=t}getNext(){return this.iter.getNext().key}hasNext(){return this.iter.hasNext()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Nt{constructor(t){this.fields=t,t.sort(ct.comparator)}static empty(){return new Nt([])}unionWith(t){let e=new ut(ct.comparator);for(const i of this.fields)e=e.add(i);for(const i of t)e=e.add(i);return new Nt(e.toArray())}covers(t){for(const e of this.fields)if(e.isPrefixOf(t))return!0;return!1}isEqual(t){return Ve(this.fields,t.fields,((e,i)=>e.isEqual(i)))}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class If extends Error{constructor(){super(...arguments),this.name="Base64DecodeError"}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class xt{constructor(t){this.binaryString=t}static fromBase64String(t){const e=(function(s){try{return atob(s)}catch(o){throw typeof DOMException<"u"&&o instanceof DOMException?new If("Invalid base64 string: "+o):o}})(t);return new xt(e)}static fromUint8Array(t){const e=(function(s){let o="";for(let l=0;l<s.length;++l)o+=String.fromCharCode(s[l]);return o})(t);return new xt(e)}[Symbol.iterator](){let t=0;return{next:()=>t<this.binaryString.length?{value:this.binaryString.charCodeAt(t++),done:!1}:{value:void 0,done:!0}}}toBase64(){return(function(e){return btoa(e)})(this.binaryString)}toUint8Array(){return(function(e){const i=new Uint8Array(e.length);for(let s=0;s<e.length;s++)i[s]=e.charCodeAt(s);return i})(this.binaryString)}approximateByteSize(){return 2*this.binaryString.length}compareTo(t){return z(this.binaryString,t.binaryString)}isEqual(t){return this.binaryString===t.binaryString}}xt.EMPTY_BYTE_STRING=new xt("");const wf=new RegExp(/^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d(?:\.(\d+))?Z$/);function ge(n){if(Y(!!n,39018),typeof n=="string"){let t=0;const e=wf.exec(n);if(Y(!!e,46558,{timestamp:n}),e[1]){let s=e[1];s=(s+"000000000").substr(0,9),t=Number(s)}const i=new Date(n);return{seconds:Math.floor(i.getTime()/1e3),nanos:t}}return{seconds:lt(n.seconds),nanos:lt(n.nanos)}}function lt(n){return typeof n=="number"?n:typeof n=="string"?Number(n):0}function De(n){return typeof n=="string"?xt.fromBase64String(n):xt.fromUint8Array(n)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ul="server_timestamp",hl="__type__",dl="__previous_value__",fl="__local_write_time__";function Gr(n){return(n?.mapValue?.fields||{})[hl]?.stringValue===ul}function Wr(n){const t=n.mapValue.fields[dl];return Gr(t)?Wr(t):t}function si(n){const t=ge(n.mapValue.fields[fl].timestampValue);return new X(t.seconds,t.nanos)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Af{constructor(t,e,i,s,o,l,u,h,f,y){this.databaseId=t,this.appId=e,this.persistenceKey=i,this.host=s,this.ssl=o,this.forceLongPolling=l,this.autoDetectLongPolling=u,this.longPollingOptions=h,this.useFetchStreams=f,this.isUsingEmulator=y}}const oi="(default)";class ai{constructor(t,e){this.projectId=t,this.database=e||oi}static empty(){return new ai("","")}get isDefaultDatabase(){return this.database===oi}isEqual(t){return t instanceof ai&&t.projectId===this.projectId&&t.database===this.database}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const pl="__type__",Pf="__max__",zn={mapValue:{}},ml="__vector__",_r="value";function ye(n){return"nullValue"in n?0:"booleanValue"in n?1:"integerValue"in n||"doubleValue"in n?2:"timestampValue"in n?3:"stringValue"in n?5:"bytesValue"in n?6:"referenceValue"in n?7:"geoPointValue"in n?8:"arrayValue"in n?9:"mapValue"in n?Gr(n)?4:Sf(n)?9007199254740991:bf(n)?10:11:F(28295,{value:n})}function Lt(n,t){if(n===t)return!0;const e=ye(n);if(e!==ye(t))return!1;switch(e){case 0:case 9007199254740991:return!0;case 1:return n.booleanValue===t.booleanValue;case 4:return si(n).isEqual(si(t));case 3:return(function(s,o){if(typeof s.timestampValue=="string"&&typeof o.timestampValue=="string"&&s.timestampValue.length===o.timestampValue.length)return s.timestampValue===o.timestampValue;const l=ge(s.timestampValue),u=ge(o.timestampValue);return l.seconds===u.seconds&&l.nanos===u.nanos})(n,t);case 5:return n.stringValue===t.stringValue;case 6:return(function(s,o){return De(s.bytesValue).isEqual(De(o.bytesValue))})(n,t);case 7:return n.referenceValue===t.referenceValue;case 8:return(function(s,o){return lt(s.geoPointValue.latitude)===lt(o.geoPointValue.latitude)&&lt(s.geoPointValue.longitude)===lt(o.geoPointValue.longitude)})(n,t);case 2:return(function(s,o){if("integerValue"in s&&"integerValue"in o)return lt(s.integerValue)===lt(o.integerValue);if("doubleValue"in s&&"doubleValue"in o){const l=lt(s.doubleValue),u=lt(o.doubleValue);return l===u?ri(l)===ri(u):isNaN(l)&&isNaN(u)}return!1})(n,t);case 9:return Ve(n.arrayValue.values||[],t.arrayValue.values||[],Lt);case 10:case 11:return(function(s,o){const l=s.mapValue.fields||{},u=o.mapValue.fields||{};if($o(l)!==$o(u))return!1;for(const h in l)if(l.hasOwnProperty(h)&&(u[h]===void 0||!Lt(l[h],u[h])))return!1;return!0})(n,t);default:return F(52216,{left:n})}}function dn(n,t){return(n.values||[]).find((e=>Lt(e,t)))!==void 0}function Me(n,t){if(n===t)return 0;const e=ye(n),i=ye(t);if(e!==i)return z(e,i);switch(e){case 0:case 9007199254740991:return 0;case 1:return z(n.booleanValue,t.booleanValue);case 2:return(function(o,l){const u=lt(o.integerValue||o.doubleValue),h=lt(l.integerValue||l.doubleValue);return u<h?-1:u>h?1:u===h?0:isNaN(u)?isNaN(h)?0:-1:1})(n,t);case 3:return qo(n.timestampValue,t.timestampValue);case 4:return qo(si(n),si(t));case 5:return gr(n.stringValue,t.stringValue);case 6:return(function(o,l){const u=De(o),h=De(l);return u.compareTo(h)})(n.bytesValue,t.bytesValue);case 7:return(function(o,l){const u=o.split("/"),h=l.split("/");for(let f=0;f<u.length&&f<h.length;f++){const y=z(u[f],h[f]);if(y!==0)return y}return z(u.length,h.length)})(n.referenceValue,t.referenceValue);case 8:return(function(o,l){const u=z(lt(o.latitude),lt(l.latitude));return u!==0?u:z(lt(o.longitude),lt(l.longitude))})(n.geoPointValue,t.geoPointValue);case 9:return zo(n.arrayValue,t.arrayValue);case 10:return(function(o,l){const u=o.fields||{},h=l.fields||{},f=u[_r]?.arrayValue,y=h[_r]?.arrayValue,v=z(f?.values?.length||0,y?.values?.length||0);return v!==0?v:zo(f,y)})(n.mapValue,t.mapValue);case 11:return(function(o,l){if(o===zn.mapValue&&l===zn.mapValue)return 0;if(o===zn.mapValue)return 1;if(l===zn.mapValue)return-1;const u=o.fields||{},h=Object.keys(u),f=l.fields||{},y=Object.keys(f);h.sort(),y.sort();for(let v=0;v<h.length&&v<y.length;++v){const w=gr(h[v],y[v]);if(w!==0)return w;const S=Me(u[h[v]],f[y[v]]);if(S!==0)return S}return z(h.length,y.length)})(n.mapValue,t.mapValue);default:throw F(23264,{he:e})}}function qo(n,t){if(typeof n=="string"&&typeof t=="string"&&n.length===t.length)return z(n,t);const e=ge(n),i=ge(t),s=z(e.seconds,i.seconds);return s!==0?s:z(e.nanos,i.nanos)}function zo(n,t){const e=n.values||[],i=t.values||[];for(let s=0;s<e.length&&s<i.length;++s){const o=Me(e[s],i[s]);if(o)return o}return z(e.length,i.length)}function Ne(n){return Er(n)}function Er(n){return"nullValue"in n?"null":"booleanValue"in n?""+n.booleanValue:"integerValue"in n?""+n.integerValue:"doubleValue"in n?""+n.doubleValue:"timestampValue"in n?(function(e){const i=ge(e);return`time(${i.seconds},${i.nanos})`})(n.timestampValue):"stringValue"in n?n.stringValue:"bytesValue"in n?(function(e){return De(e).toBase64()})(n.bytesValue):"referenceValue"in n?(function(e){return x.fromName(e).toString()})(n.referenceValue):"geoPointValue"in n?(function(e){return`geo(${e.latitude},${e.longitude})`})(n.geoPointValue):"arrayValue"in n?(function(e){let i="[",s=!0;for(const o of e.values||[])s?s=!1:i+=",",i+=Er(o);return i+"]"})(n.arrayValue):"mapValue"in n?(function(e){const i=Object.keys(e.fields||{}).sort();let s="{",o=!0;for(const l of i)o?o=!1:s+=",",s+=`${l}:${Er(e.fields[l])}`;return s+"}"})(n.mapValue):F(61005,{value:n})}function Xn(n){switch(ye(n)){case 0:case 1:return 4;case 2:return 8;case 3:case 8:return 16;case 4:const t=Wr(n);return t?16+Xn(t):16;case 5:return 2*n.stringValue.length;case 6:return De(n.bytesValue).approximateByteSize();case 7:return n.referenceValue.length;case 9:return(function(i){return(i.values||[]).reduce(((s,o)=>s+Xn(o)),0)})(n.arrayValue);case 10:case 11:return(function(i){let s=0;return xe(i.fields,((o,l)=>{s+=o.length+Xn(l)})),s})(n.mapValue);default:throw F(13486,{value:n})}}function vr(n){return!!n&&"integerValue"in n}function Kr(n){return!!n&&"arrayValue"in n}function Jn(n){return!!n&&"mapValue"in n}function bf(n){return(n?.mapValue?.fields||{})[pl]?.stringValue===ml}function rn(n){if(n.geoPointValue)return{geoPointValue:{...n.geoPointValue}};if(n.timestampValue&&typeof n.timestampValue=="object")return{timestampValue:{...n.timestampValue}};if(n.mapValue){const t={mapValue:{fields:{}}};return xe(n.mapValue.fields,((e,i)=>t.mapValue.fields[e]=rn(i))),t}if(n.arrayValue){const t={arrayValue:{values:[]}};for(let e=0;e<(n.arrayValue.values||[]).length;++e)t.arrayValue.values[e]=rn(n.arrayValue.values[e]);return t}return{...n}}function Sf(n){return(((n.mapValue||{}).fields||{}).__type__||{}).stringValue===Pf}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Dt{constructor(t){this.value=t}static empty(){return new Dt({mapValue:{}})}field(t){if(t.isEmpty())return this.value;{let e=this.value;for(let i=0;i<t.length-1;++i)if(e=(e.mapValue.fields||{})[t.get(i)],!Jn(e))return null;return e=(e.mapValue.fields||{})[t.lastSegment()],e||null}}set(t,e){this.getFieldsMap(t.popLast())[t.lastSegment()]=rn(e)}setAll(t){let e=ct.emptyPath(),i={},s=[];t.forEach(((l,u)=>{if(!e.isImmediateParentOf(u)){const h=this.getFieldsMap(e);this.applyChanges(h,i,s),i={},s=[],e=u.popLast()}l?i[u.lastSegment()]=rn(l):s.push(u.lastSegment())}));const o=this.getFieldsMap(e);this.applyChanges(o,i,s)}delete(t){const e=this.field(t.popLast());Jn(e)&&e.mapValue.fields&&delete e.mapValue.fields[t.lastSegment()]}isEqual(t){return Lt(this.value,t.value)}getFieldsMap(t){let e=this.value;e.mapValue.fields||(e.mapValue={fields:{}});for(let i=0;i<t.length;++i){let s=e.mapValue.fields[t.get(i)];Jn(s)&&s.mapValue.fields||(s={mapValue:{fields:{}}},e.mapValue.fields[t.get(i)]=s),e=s}return e.mapValue.fields}applyChanges(t,e,i){xe(e,((s,o)=>t[s]=o));for(const s of i)delete t[s]}clone(){return new Dt(rn(this.value))}}function gl(n){const t=[];return xe(n.fields,((e,i)=>{const s=new ct([e]);if(Jn(i)){const o=gl(i.mapValue).fields;if(o.length===0)t.push(s);else for(const l of o)t.push(s.child(l))}else t.push(s)})),new Nt(t)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Vt{constructor(t,e,i,s,o,l,u){this.key=t,this.documentType=e,this.version=i,this.readTime=s,this.createTime=o,this.data=l,this.documentState=u}static newInvalidDocument(t){return new Vt(t,0,Q.min(),Q.min(),Q.min(),Dt.empty(),0)}static newFoundDocument(t,e,i,s){return new Vt(t,1,e,Q.min(),i,s,0)}static newNoDocument(t,e){return new Vt(t,2,e,Q.min(),Q.min(),Dt.empty(),0)}static newUnknownDocument(t,e){return new Vt(t,3,e,Q.min(),Q.min(),Dt.empty(),2)}convertToFoundDocument(t,e){return!this.createTime.isEqual(Q.min())||this.documentType!==2&&this.documentType!==0||(this.createTime=t),this.version=t,this.documentType=1,this.data=e,this.documentState=0,this}convertToNoDocument(t){return this.version=t,this.documentType=2,this.data=Dt.empty(),this.documentState=0,this}convertToUnknownDocument(t){return this.version=t,this.documentType=3,this.data=Dt.empty(),this.documentState=2,this}setHasCommittedMutations(){return this.documentState=2,this}setHasLocalMutations(){return this.documentState=1,this.version=Q.min(),this}setReadTime(t){return this.readTime=t,this}get hasLocalMutations(){return this.documentState===1}get hasCommittedMutations(){return this.documentState===2}get hasPendingWrites(){return this.hasLocalMutations||this.hasCommittedMutations}isValidDocument(){return this.documentType!==0}isFoundDocument(){return this.documentType===1}isNoDocument(){return this.documentType===2}isUnknownDocument(){return this.documentType===3}isEqual(t){return t instanceof Vt&&this.key.isEqual(t.key)&&this.version.isEqual(t.version)&&this.documentType===t.documentType&&this.documentState===t.documentState&&this.data.isEqual(t.data)}mutableCopy(){return new Vt(this.key,this.documentType,this.version,this.readTime,this.createTime,this.data.clone(),this.documentState)}toString(){return`Document(${this.key}, ${this.version}, ${JSON.stringify(this.data.value)}, {createTime: ${this.createTime}}), {documentType: ${this.documentType}}), {documentState: ${this.documentState}})`}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class li{constructor(t,e){this.position=t,this.inclusive=e}}function Ho(n,t,e){let i=0;for(let s=0;s<n.position.length;s++){const o=t[s],l=n.position[s];if(o.field.isKeyField()?i=x.comparator(x.fromName(l.referenceValue),e.key):i=Me(l,e.data.field(o.field)),o.dir==="desc"&&(i*=-1),i!==0)break}return i}function Go(n,t){if(n===null)return t===null;if(t===null||n.inclusive!==t.inclusive||n.position.length!==t.position.length)return!1;for(let e=0;e<n.position.length;e++)if(!Lt(n.position[e],t.position[e]))return!1;return!0}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ci{constructor(t,e="asc"){this.field=t,this.dir=e}}function Cf(n,t){return n.dir===t.dir&&n.field.isEqual(t.field)}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class yl{}class st extends yl{constructor(t,e,i){super(),this.field=t,this.op=e,this.value=i}static create(t,e,i){return t.isKeyField()?e==="in"||e==="not-in"?this.createKeyFieldInFilter(t,e,i):new Vf(t,e,i):e==="array-contains"?new Nf(t,i):e==="in"?new kf(t,i):e==="not-in"?new Of(t,i):e==="array-contains-any"?new xf(t,i):new st(t,e,i)}static createKeyFieldInFilter(t,e,i){return e==="in"?new Df(t,i):new Mf(t,i)}matches(t){const e=t.data.field(this.field);return this.op==="!="?e!==null&&e.nullValue===void 0&&this.matchesComparison(Me(e,this.value)):e!==null&&ye(this.value)===ye(e)&&this.matchesComparison(Me(e,this.value))}matchesComparison(t){switch(this.op){case"<":return t<0;case"<=":return t<=0;case"==":return t===0;case"!=":return t!==0;case">":return t>0;case">=":return t>=0;default:return F(47266,{operator:this.op})}}isInequality(){return["<","<=",">",">=","!=","not-in"].indexOf(this.op)>=0}getFlattenedFilters(){return[this]}getFilters(){return[this]}}class Zt extends yl{constructor(t,e){super(),this.filters=t,this.op=e,this.Pe=null}static create(t,e){return new Zt(t,e)}matches(t){return _l(this)?this.filters.find((e=>!e.matches(t)))===void 0:this.filters.find((e=>e.matches(t)))!==void 0}getFlattenedFilters(){return this.Pe!==null||(this.Pe=this.filters.reduce(((t,e)=>t.concat(e.getFlattenedFilters())),[])),this.Pe}getFilters(){return Object.assign([],this.filters)}}function _l(n){return n.op==="and"}function El(n){return Rf(n)&&_l(n)}function Rf(n){for(const t of n.filters)if(t instanceof Zt)return!1;return!0}function Tr(n){if(n instanceof st)return n.field.canonicalString()+n.op.toString()+Ne(n.value);if(El(n))return n.filters.map((t=>Tr(t))).join(",");{const t=n.filters.map((e=>Tr(e))).join(",");return`${n.op}(${t})`}}function vl(n,t){return n instanceof st?(function(i,s){return s instanceof st&&i.op===s.op&&i.field.isEqual(s.field)&&Lt(i.value,s.value)})(n,t):n instanceof Zt?(function(i,s){return s instanceof Zt&&i.op===s.op&&i.filters.length===s.filters.length?i.filters.reduce(((o,l,u)=>o&&vl(l,s.filters[u])),!0):!1})(n,t):void F(19439)}function Tl(n){return n instanceof st?(function(e){return`${e.field.canonicalString()} ${e.op} ${Ne(e.value)}`})(n):n instanceof Zt?(function(e){return e.op.toString()+" {"+e.getFilters().map(Tl).join(" ,")+"}"})(n):"Filter"}class Vf extends st{constructor(t,e,i){super(t,e,i),this.key=x.fromName(i.referenceValue)}matches(t){const e=x.comparator(t.key,this.key);return this.matchesComparison(e)}}class Df extends st{constructor(t,e){super(t,"in",e),this.keys=Il("in",e)}matches(t){return this.keys.some((e=>e.isEqual(t.key)))}}class Mf extends st{constructor(t,e){super(t,"not-in",e),this.keys=Il("not-in",e)}matches(t){return!this.keys.some((e=>e.isEqual(t.key)))}}function Il(n,t){return(t.arrayValue?.values||[]).map((e=>x.fromName(e.referenceValue)))}class Nf extends st{constructor(t,e){super(t,"array-contains",e)}matches(t){const e=t.data.field(this.field);return Kr(e)&&dn(e.arrayValue,this.value)}}class kf extends st{constructor(t,e){super(t,"in",e)}matches(t){const e=t.data.field(this.field);return e!==null&&dn(this.value.arrayValue,e)}}class Of extends st{constructor(t,e){super(t,"not-in",e)}matches(t){if(dn(this.value.arrayValue,{nullValue:"NULL_VALUE"}))return!1;const e=t.data.field(this.field);return e!==null&&e.nullValue===void 0&&!dn(this.value.arrayValue,e)}}class xf extends st{constructor(t,e){super(t,"array-contains-any",e)}matches(t){const e=t.data.field(this.field);return!(!Kr(e)||!e.arrayValue.values)&&e.arrayValue.values.some((i=>dn(this.value.arrayValue,i)))}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Lf{constructor(t,e=null,i=[],s=[],o=null,l=null,u=null){this.path=t,this.collectionGroup=e,this.orderBy=i,this.filters=s,this.limit=o,this.startAt=l,this.endAt=u,this.Te=null}}function Wo(n,t=null,e=[],i=[],s=null,o=null,l=null){return new Lf(n,t,e,i,s,o,l)}function Qr(n){const t=W(n);if(t.Te===null){let e=t.path.canonicalString();t.collectionGroup!==null&&(e+="|cg:"+t.collectionGroup),e+="|f:",e+=t.filters.map((i=>Tr(i))).join(","),e+="|ob:",e+=t.orderBy.map((i=>(function(o){return o.field.canonicalString()+o.dir})(i))).join(","),Hr(t.limit)||(e+="|l:",e+=t.limit),t.startAt&&(e+="|lb:",e+=t.startAt.inclusive?"b:":"a:",e+=t.startAt.position.map((i=>Ne(i))).join(",")),t.endAt&&(e+="|ub:",e+=t.endAt.inclusive?"a:":"b:",e+=t.endAt.position.map((i=>Ne(i))).join(",")),t.Te=e}return t.Te}function Xr(n,t){if(n.limit!==t.limit||n.orderBy.length!==t.orderBy.length)return!1;for(let e=0;e<n.orderBy.length;e++)if(!Cf(n.orderBy[e],t.orderBy[e]))return!1;if(n.filters.length!==t.filters.length)return!1;for(let e=0;e<n.filters.length;e++)if(!vl(n.filters[e],t.filters[e]))return!1;return n.collectionGroup===t.collectionGroup&&!!n.path.isEqual(t.path)&&!!Go(n.startAt,t.startAt)&&Go(n.endAt,t.endAt)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class vi{constructor(t,e=null,i=[],s=[],o=null,l="F",u=null,h=null){this.path=t,this.collectionGroup=e,this.explicitOrderBy=i,this.filters=s,this.limit=o,this.limitType=l,this.startAt=u,this.endAt=h,this.Ie=null,this.Ee=null,this.de=null,this.startAt,this.endAt}}function Ff(n,t,e,i,s,o,l,u){return new vi(n,t,e,i,s,o,l,u)}function Uf(n){return new vi(n)}function Ko(n){return n.filters.length===0&&n.limit===null&&n.startAt==null&&n.endAt==null&&(n.explicitOrderBy.length===0||n.explicitOrderBy.length===1&&n.explicitOrderBy[0].field.isKeyField())}function Bf(n){return n.collectionGroup!==null}function sn(n){const t=W(n);if(t.Ie===null){t.Ie=[];const e=new Set;for(const o of t.explicitOrderBy)t.Ie.push(o),e.add(o.field.canonicalString());const i=t.explicitOrderBy.length>0?t.explicitOrderBy[t.explicitOrderBy.length-1].dir:"asc";(function(l){let u=new ut(ct.comparator);return l.filters.forEach((h=>{h.getFlattenedFilters().forEach((f=>{f.isInequality()&&(u=u.add(f.field))}))})),u})(t).forEach((o=>{e.has(o.canonicalString())||o.isKeyField()||t.Ie.push(new ci(o,i))})),e.has(ct.keyField().canonicalString())||t.Ie.push(new ci(ct.keyField(),i))}return t.Ie}function he(n){const t=W(n);return t.Ee||(t.Ee=$f(t,sn(n))),t.Ee}function $f(n,t){if(n.limitType==="F")return Wo(n.path,n.collectionGroup,t,n.filters,n.limit,n.startAt,n.endAt);{t=t.map((s=>{const o=s.dir==="desc"?"asc":"desc";return new ci(s.field,o)}));const e=n.endAt?new li(n.endAt.position,n.endAt.inclusive):null,i=n.startAt?new li(n.startAt.position,n.startAt.inclusive):null;return Wo(n.path,n.collectionGroup,t,n.filters,n.limit,e,i)}}function Ir(n,t,e){return new vi(n.path,n.collectionGroup,n.explicitOrderBy.slice(),n.filters.slice(),t,e,n.startAt,n.endAt)}function wl(n,t){return Xr(he(n),he(t))&&n.limitType===t.limitType}function Al(n){return`${Qr(he(n))}|lt:${n.limitType}`}function Ye(n){return`Query(target=${(function(e){let i=e.path.canonicalString();return e.collectionGroup!==null&&(i+=" collectionGroup="+e.collectionGroup),e.filters.length>0&&(i+=`, filters: [${e.filters.map((s=>Tl(s))).join(", ")}]`),Hr(e.limit)||(i+=", limit: "+e.limit),e.orderBy.length>0&&(i+=`, orderBy: [${e.orderBy.map((s=>(function(l){return`${l.field.canonicalString()} (${l.dir})`})(s))).join(", ")}]`),e.startAt&&(i+=", startAt: ",i+=e.startAt.inclusive?"b:":"a:",i+=e.startAt.position.map((s=>Ne(s))).join(",")),e.endAt&&(i+=", endAt: ",i+=e.endAt.inclusive?"a:":"b:",i+=e.endAt.position.map((s=>Ne(s))).join(",")),`Target(${i})`})(he(n))}; limitType=${n.limitType})`}function Jr(n,t){return t.isFoundDocument()&&(function(i,s){const o=s.key.path;return i.collectionGroup!==null?s.key.hasCollectionId(i.collectionGroup)&&i.path.isPrefixOf(o):x.isDocumentKey(i.path)?i.path.isEqual(o):i.path.isImmediateParentOf(o)})(n,t)&&(function(i,s){for(const o of sn(i))if(!o.field.isKeyField()&&s.data.field(o.field)===null)return!1;return!0})(n,t)&&(function(i,s){for(const o of i.filters)if(!o.matches(s))return!1;return!0})(n,t)&&(function(i,s){return!(i.startAt&&!(function(l,u,h){const f=Ho(l,u,h);return l.inclusive?f<=0:f<0})(i.startAt,sn(i),s)||i.endAt&&!(function(l,u,h){const f=Ho(l,u,h);return l.inclusive?f>=0:f>0})(i.endAt,sn(i),s))})(n,t)}function jf(n){return(t,e)=>{let i=!1;for(const s of sn(n)){const o=qf(s,t,e);if(o!==0)return o;i=i||s.field.isKeyField()}return 0}}function qf(n,t,e){const i=n.field.isKeyField()?x.comparator(t.key,e.key):(function(o,l,u){const h=l.data.field(o),f=u.data.field(o);return h!==null&&f!==null?Me(h,f):F(42886)})(n.field,t,e);switch(n.dir){case"asc":return i;case"desc":return-1*i;default:return F(19790,{direction:n.dir})}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class _e{constructor(t,e){this.mapKeyFn=t,this.equalsFn=e,this.inner={},this.innerSize=0}get(t){const e=this.mapKeyFn(t),i=this.inner[e];if(i!==void 0){for(const[s,o]of i)if(this.equalsFn(s,t))return o}}has(t){return this.get(t)!==void 0}set(t,e){const i=this.mapKeyFn(t),s=this.inner[i];if(s===void 0)return this.inner[i]=[[t,e]],void this.innerSize++;for(let o=0;o<s.length;o++)if(this.equalsFn(s[o][0],t))return void(s[o]=[t,e]);s.push([t,e]),this.innerSize++}delete(t){const e=this.mapKeyFn(t),i=this.inner[e];if(i===void 0)return!1;for(let s=0;s<i.length;s++)if(this.equalsFn(i[s][0],t))return i.length===1?delete this.inner[e]:i.splice(s,1),this.innerSize--,!0;return!1}forEach(t){xe(this.inner,((e,i)=>{for(const[s,o]of i)t(s,o)}))}isEmpty(){return cl(this.inner)}size(){return this.innerSize}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const zf=new At(x.comparator);function ui(){return zf}const Pl=new At(x.comparator);function Hn(...n){let t=Pl;for(const e of n)t=t.insert(e.key,e);return t}function bl(n){let t=Pl;return n.forEach(((e,i)=>t=t.insert(e,i.overlayedDocument))),t}function ce(){return on()}function Sl(){return on()}function on(){return new _e((n=>n.toString()),((n,t)=>n.isEqual(t)))}const Hf=new At(x.comparator),Gf=new ut(x.comparator);function _t(...n){let t=Gf;for(const e of n)t=t.add(e);return t}const Wf=new ut(z);function Kf(){return Wf}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Yr(n,t){if(n.useProto3Json){if(isNaN(t))return{doubleValue:"NaN"};if(t===1/0)return{doubleValue:"Infinity"};if(t===-1/0)return{doubleValue:"-Infinity"}}return{doubleValue:ri(t)?"-0":t}}function Cl(n){return{integerValue:""+n}}function Qf(n,t){return Ef(t)?Cl(t):Yr(n,t)}/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ti{constructor(){this._=void 0}}function Xf(n,t,e){return n instanceof hi?(function(s,o){const l={fields:{[hl]:{stringValue:ul},[fl]:{timestampValue:{seconds:s.seconds,nanos:s.nanoseconds}}}};return o&&Gr(o)&&(o=Wr(o)),o&&(l.fields[dl]=o),{mapValue:l}})(e,t):n instanceof fn?Vl(n,t):n instanceof pn?Dl(n,t):(function(s,o){const l=Rl(s,o),u=Qo(l)+Qo(s.Ae);return vr(l)&&vr(s.Ae)?Cl(u):Yr(s.serializer,u)})(n,t)}function Jf(n,t,e){return n instanceof fn?Vl(n,t):n instanceof pn?Dl(n,t):e}function Rl(n,t){return n instanceof di?(function(i){return vr(i)||(function(o){return!!o&&"doubleValue"in o})(i)})(t)?t:{integerValue:0}:null}class hi extends Ti{}class fn extends Ti{constructor(t){super(),this.elements=t}}function Vl(n,t){const e=Ml(t);for(const i of n.elements)e.some((s=>Lt(s,i)))||e.push(i);return{arrayValue:{values:e}}}class pn extends Ti{constructor(t){super(),this.elements=t}}function Dl(n,t){let e=Ml(t);for(const i of n.elements)e=e.filter((s=>!Lt(s,i)));return{arrayValue:{values:e}}}class di extends Ti{constructor(t,e){super(),this.serializer=t,this.Ae=e}}function Qo(n){return lt(n.integerValue||n.doubleValue)}function Ml(n){return Kr(n)&&n.arrayValue.values?n.arrayValue.values.slice():[]}function Yf(n,t){return n.field.isEqual(t.field)&&(function(i,s){return i instanceof fn&&s instanceof fn||i instanceof pn&&s instanceof pn?Ve(i.elements,s.elements,Lt):i instanceof di&&s instanceof di?Lt(i.Ae,s.Ae):i instanceof hi&&s instanceof hi})(n.transform,t.transform)}class Zf{constructor(t,e){this.version=t,this.transformResults=e}}class Bt{constructor(t,e){this.updateTime=t,this.exists=e}static none(){return new Bt}static exists(t){return new Bt(void 0,t)}static updateTime(t){return new Bt(t)}get isNone(){return this.updateTime===void 0&&this.exists===void 0}isEqual(t){return this.exists===t.exists&&(this.updateTime?!!t.updateTime&&this.updateTime.isEqual(t.updateTime):!t.updateTime)}}function Yn(n,t){return n.updateTime!==void 0?t.isFoundDocument()&&t.version.isEqual(n.updateTime):n.exists===void 0||n.exists===t.isFoundDocument()}class Ii{}function Nl(n,t){if(!n.hasLocalMutations||t&&t.fields.length===0)return null;if(t===null)return n.isNoDocument()?new Ol(n.key,Bt.none()):new En(n.key,n.data,Bt.none());{const e=n.data,i=Dt.empty();let s=new ut(ct.comparator);for(let o of t.fields)if(!s.has(o)){let l=e.field(o);l===null&&o.length>1&&(o=o.popLast(),l=e.field(o)),l===null?i.delete(o):i.set(o,l),s=s.add(o)}return new Ee(n.key,i,new Nt(s.toArray()),Bt.none())}}function tp(n,t,e){n instanceof En?(function(s,o,l){const u=s.value.clone(),h=Jo(s.fieldTransforms,o,l.transformResults);u.setAll(h),o.convertToFoundDocument(l.version,u).setHasCommittedMutations()})(n,t,e):n instanceof Ee?(function(s,o,l){if(!Yn(s.precondition,o))return void o.convertToUnknownDocument(l.version);const u=Jo(s.fieldTransforms,o,l.transformResults),h=o.data;h.setAll(kl(s)),h.setAll(u),o.convertToFoundDocument(l.version,h).setHasCommittedMutations()})(n,t,e):(function(s,o,l){o.convertToNoDocument(l.version).setHasCommittedMutations()})(0,t,e)}function an(n,t,e,i){return n instanceof En?(function(o,l,u,h){if(!Yn(o.precondition,l))return u;const f=o.value.clone(),y=Yo(o.fieldTransforms,h,l);return f.setAll(y),l.convertToFoundDocument(l.version,f).setHasLocalMutations(),null})(n,t,e,i):n instanceof Ee?(function(o,l,u,h){if(!Yn(o.precondition,l))return u;const f=Yo(o.fieldTransforms,h,l),y=l.data;return y.setAll(kl(o)),y.setAll(f),l.convertToFoundDocument(l.version,y).setHasLocalMutations(),u===null?null:u.unionWith(o.fieldMask.fields).unionWith(o.fieldTransforms.map((v=>v.field)))})(n,t,e,i):(function(o,l,u){return Yn(o.precondition,l)?(l.convertToNoDocument(l.version).setHasLocalMutations(),null):u})(n,t,e)}function ep(n,t){let e=null;for(const i of n.fieldTransforms){const s=t.data.field(i.field),o=Rl(i.transform,s||null);o!=null&&(e===null&&(e=Dt.empty()),e.set(i.field,o))}return e||null}function Xo(n,t){return n.type===t.type&&!!n.key.isEqual(t.key)&&!!n.precondition.isEqual(t.precondition)&&!!(function(i,s){return i===void 0&&s===void 0||!(!i||!s)&&Ve(i,s,((o,l)=>Yf(o,l)))})(n.fieldTransforms,t.fieldTransforms)&&(n.type===0?n.value.isEqual(t.value):n.type!==1||n.data.isEqual(t.data)&&n.fieldMask.isEqual(t.fieldMask))}class En extends Ii{constructor(t,e,i,s=[]){super(),this.key=t,this.value=e,this.precondition=i,this.fieldTransforms=s,this.type=0}getFieldMask(){return null}}class Ee extends Ii{constructor(t,e,i,s,o=[]){super(),this.key=t,this.data=e,this.fieldMask=i,this.precondition=s,this.fieldTransforms=o,this.type=1}getFieldMask(){return this.fieldMask}}function kl(n){const t=new Map;return n.fieldMask.fields.forEach((e=>{if(!e.isEmpty()){const i=n.data.field(e);t.set(e,i)}})),t}function Jo(n,t,e){const i=new Map;Y(n.length===e.length,32656,{Re:e.length,Ve:n.length});for(let s=0;s<e.length;s++){const o=n[s],l=o.transform,u=t.data.field(o.field);i.set(o.field,Jf(l,u,e[s]))}return i}function Yo(n,t,e){const i=new Map;for(const s of n){const o=s.transform,l=e.data.field(s.field);i.set(s.field,Xf(o,l,t))}return i}class Ol extends Ii{constructor(t,e){super(),this.key=t,this.precondition=e,this.type=2,this.fieldTransforms=[]}getFieldMask(){return null}}class np extends Ii{constructor(t,e){super(),this.key=t,this.precondition=e,this.type=3,this.fieldTransforms=[]}getFieldMask(){return null}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ip{constructor(t,e,i,s){this.batchId=t,this.localWriteTime=e,this.baseMutations=i,this.mutations=s}applyToRemoteDocument(t,e){const i=e.mutationResults;for(let s=0;s<this.mutations.length;s++){const o=this.mutations[s];o.key.isEqual(t.key)&&tp(o,t,i[s])}}applyToLocalView(t,e){for(const i of this.baseMutations)i.key.isEqual(t.key)&&(e=an(i,t,e,this.localWriteTime));for(const i of this.mutations)i.key.isEqual(t.key)&&(e=an(i,t,e,this.localWriteTime));return e}applyToLocalDocumentSet(t,e){const i=Sl();return this.mutations.forEach((s=>{const o=t.get(s.key),l=o.overlayedDocument;let u=this.applyToLocalView(l,o.mutatedFields);u=e.has(s.key)?null:u;const h=Nl(l,u);h!==null&&i.set(s.key,h),l.isValidDocument()||l.convertToNoDocument(Q.min())})),i}keys(){return this.mutations.reduce(((t,e)=>t.add(e.key)),_t())}isEqual(t){return this.batchId===t.batchId&&Ve(this.mutations,t.mutations,((e,i)=>Xo(e,i)))&&Ve(this.baseMutations,t.baseMutations,((e,i)=>Xo(e,i)))}}class Zr{constructor(t,e,i,s){this.batch=t,this.commitVersion=e,this.mutationResults=i,this.docVersions=s}static from(t,e,i){Y(t.mutations.length===i.length,58842,{me:t.mutations.length,fe:i.length});let s=(function(){return Hf})();const o=t.mutations;for(let l=0;l<o.length;l++)s=s.insert(o[l].key,i[l].version);return new Zr(t,e,i,s)}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class rp{constructor(t,e){this.largestBatchId=t,this.mutation=e}getKey(){return this.mutation.key}isEqual(t){return t!==null&&this.mutation===t.mutation}toString(){return`Overlay{
      largestBatchId: ${this.largestBatchId},
      mutation: ${this.mutation.toString()}
    }`}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var tt,U;function sp(n){switch(n){case C.OK:return F(64938);case C.CANCELLED:case C.UNKNOWN:case C.DEADLINE_EXCEEDED:case C.RESOURCE_EXHAUSTED:case C.INTERNAL:case C.UNAVAILABLE:case C.UNAUTHENTICATED:return!1;case C.INVALID_ARGUMENT:case C.NOT_FOUND:case C.ALREADY_EXISTS:case C.PERMISSION_DENIED:case C.FAILED_PRECONDITION:case C.ABORTED:case C.OUT_OF_RANGE:case C.UNIMPLEMENTED:case C.DATA_LOSS:return!0;default:return F(15467,{code:n})}}function op(n){if(n===void 0)return me("GRPC error has no .code"),C.UNKNOWN;switch(n){case tt.OK:return C.OK;case tt.CANCELLED:return C.CANCELLED;case tt.UNKNOWN:return C.UNKNOWN;case tt.DEADLINE_EXCEEDED:return C.DEADLINE_EXCEEDED;case tt.RESOURCE_EXHAUSTED:return C.RESOURCE_EXHAUSTED;case tt.INTERNAL:return C.INTERNAL;case tt.UNAVAILABLE:return C.UNAVAILABLE;case tt.UNAUTHENTICATED:return C.UNAUTHENTICATED;case tt.INVALID_ARGUMENT:return C.INVALID_ARGUMENT;case tt.NOT_FOUND:return C.NOT_FOUND;case tt.ALREADY_EXISTS:return C.ALREADY_EXISTS;case tt.PERMISSION_DENIED:return C.PERMISSION_DENIED;case tt.FAILED_PRECONDITION:return C.FAILED_PRECONDITION;case tt.ABORTED:return C.ABORTED;case tt.OUT_OF_RANGE:return C.OUT_OF_RANGE;case tt.UNIMPLEMENTED:return C.UNIMPLEMENTED;case tt.DATA_LOSS:return C.DATA_LOSS;default:return F(39323,{code:n})}}(U=tt||(tt={}))[U.OK=0]="OK",U[U.CANCELLED=1]="CANCELLED",U[U.UNKNOWN=2]="UNKNOWN",U[U.INVALID_ARGUMENT=3]="INVALID_ARGUMENT",U[U.DEADLINE_EXCEEDED=4]="DEADLINE_EXCEEDED",U[U.NOT_FOUND=5]="NOT_FOUND",U[U.ALREADY_EXISTS=6]="ALREADY_EXISTS",U[U.PERMISSION_DENIED=7]="PERMISSION_DENIED",U[U.UNAUTHENTICATED=16]="UNAUTHENTICATED",U[U.RESOURCE_EXHAUSTED=8]="RESOURCE_EXHAUSTED",U[U.FAILED_PRECONDITION=9]="FAILED_PRECONDITION",U[U.ABORTED=10]="ABORTED",U[U.OUT_OF_RANGE=11]="OUT_OF_RANGE",U[U.UNIMPLEMENTED=12]="UNIMPLEMENTED",U[U.INTERNAL=13]="INTERNAL",U[U.UNAVAILABLE=14]="UNAVAILABLE",U[U.DATA_LOSS=15]="DATA_LOSS";/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */new Fr([4294967295,4294967295],0);class ap{constructor(t,e){this.databaseId=t,this.useProto3Json=e}}function wr(n,t){return n.useProto3Json?`${new Date(1e3*t.seconds).toISOString().replace(/\.\d*/,"").replace("Z","")}.${("000000000"+t.nanoseconds).slice(-9)}Z`:{seconds:""+t.seconds,nanos:t.nanoseconds}}function lp(n,t){return n.useProto3Json?t.toBase64():t.toUint8Array()}function cp(n,t){return wr(n,t.toTimestamp())}function Se(n){return Y(!!n,49232),Q.fromTimestamp((function(e){const i=ge(e);return new X(i.seconds,i.nanos)})(n))}function xl(n,t){return Ar(n,t).canonicalString()}function Ar(n,t){const e=(function(s){return new Z(["projects",s.projectId,"databases",s.database])})(n).child("documents");return t===void 0?e:e.child(t)}function up(n){const t=Z.fromString(n);return Y(_p(t),10190,{key:t.toString()}),t}function Pr(n,t){return xl(n.databaseId,t.path)}function hp(n){const t=up(n);return t.length===4?Z.emptyPath():fp(t)}function dp(n){return new Z(["projects",n.databaseId.projectId,"databases",n.databaseId.database]).canonicalString()}function fp(n){return Y(n.length>4&&n.get(4)==="documents",29091,{key:n.toString()}),n.popFirst(5)}function Zo(n,t,e){return{name:Pr(n,t),fields:e.value.mapValue.fields}}function pp(n,t){let e;if(t instanceof En)e={update:Zo(n,t.key,t.value)};else if(t instanceof Ol)e={delete:Pr(n,t.key)};else if(t instanceof Ee)e={update:Zo(n,t.key,t.data),updateMask:yp(t.fieldMask)};else{if(!(t instanceof np))return F(16599,{Vt:t.type});e={verify:Pr(n,t.key)}}return t.fieldTransforms.length>0&&(e.updateTransforms=t.fieldTransforms.map((i=>(function(o,l){const u=l.transform;if(u instanceof hi)return{fieldPath:l.field.canonicalString(),setToServerValue:"REQUEST_TIME"};if(u instanceof fn)return{fieldPath:l.field.canonicalString(),appendMissingElements:{values:u.elements}};if(u instanceof pn)return{fieldPath:l.field.canonicalString(),removeAllFromArray:{values:u.elements}};if(u instanceof di)return{fieldPath:l.field.canonicalString(),increment:u.Ae};throw F(20930,{transform:l.transform})})(0,i)))),t.precondition.isNone||(e.currentDocument=(function(s,o){return o.updateTime!==void 0?{updateTime:cp(s,o.updateTime)}:o.exists!==void 0?{exists:o.exists}:F(27497)})(n,t.precondition)),e}function mp(n,t){return n&&n.length>0?(Y(t!==void 0,14353),n.map((e=>(function(s,o){let l=s.updateTime?Se(s.updateTime):Se(o);return l.isEqual(Q.min())&&(l=Se(o)),new Zf(l,s.transformResults||[])})(e,t)))):[]}function gp(n){let t=hp(n.parent);const e=n.structuredQuery,i=e.from?e.from.length:0;let s=null;if(i>0){Y(i===1,65062);const y=e.from[0];y.allDescendants?s=y.collectionId:t=t.child(y.collectionId)}let o=[];e.where&&(o=(function(v){const w=Ll(v);return w instanceof Zt&&El(w)?w.getFilters():[w]})(e.where));let l=[];e.orderBy&&(l=(function(v){return v.map((w=>(function(R){return new ci(be(R.field),(function(D){switch(D){case"ASCENDING":return"asc";case"DESCENDING":return"desc";default:return}})(R.direction))})(w)))})(e.orderBy));let u=null;e.limit&&(u=(function(v){let w;return w=typeof v=="object"?v.value:v,Hr(w)?null:w})(e.limit));let h=null;e.startAt&&(h=(function(v){const w=!!v.before,S=v.values||[];return new li(S,w)})(e.startAt));let f=null;return e.endAt&&(f=(function(v){const w=!v.before,S=v.values||[];return new li(S,w)})(e.endAt)),Ff(t,s,l,o,u,"F",h,f)}function Ll(n){return n.unaryFilter!==void 0?(function(e){switch(e.unaryFilter.op){case"IS_NAN":const i=be(e.unaryFilter.field);return st.create(i,"==",{doubleValue:NaN});case"IS_NULL":const s=be(e.unaryFilter.field);return st.create(s,"==",{nullValue:"NULL_VALUE"});case"IS_NOT_NAN":const o=be(e.unaryFilter.field);return st.create(o,"!=",{doubleValue:NaN});case"IS_NOT_NULL":const l=be(e.unaryFilter.field);return st.create(l,"!=",{nullValue:"NULL_VALUE"});case"OPERATOR_UNSPECIFIED":return F(61313);default:return F(60726)}})(n):n.fieldFilter!==void 0?(function(e){return st.create(be(e.fieldFilter.field),(function(s){switch(s){case"EQUAL":return"==";case"NOT_EQUAL":return"!=";case"GREATER_THAN":return">";case"GREATER_THAN_OR_EQUAL":return">=";case"LESS_THAN":return"<";case"LESS_THAN_OR_EQUAL":return"<=";case"ARRAY_CONTAINS":return"array-contains";case"IN":return"in";case"NOT_IN":return"not-in";case"ARRAY_CONTAINS_ANY":return"array-contains-any";case"OPERATOR_UNSPECIFIED":return F(58110);default:return F(50506)}})(e.fieldFilter.op),e.fieldFilter.value)})(n):n.compositeFilter!==void 0?(function(e){return Zt.create(e.compositeFilter.filters.map((i=>Ll(i))),(function(s){switch(s){case"AND":return"and";case"OR":return"or";default:return F(1026)}})(e.compositeFilter.op))})(n):F(30097,{filter:n})}function be(n){return ct.fromServerFormat(n.fieldPath)}function yp(n){const t=[];return n.fields.forEach((e=>t.push(e.canonicalString()))),{fieldPaths:t}}function _p(n){return n.length>=4&&n.get(0)==="projects"&&n.get(2)==="databases"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ep{constructor(t){this.yt=t}}function vp(n){const t=gp({parent:n.parent,structuredQuery:n.structuredQuery});return n.limitType==="LAST"?Ir(t,t.limit,"L"):t}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Tp{constructor(){this.Cn=new Ip}addToCollectionParentIndex(t,e){return this.Cn.add(e),b.resolve()}getCollectionParents(t,e){return b.resolve(this.Cn.getEntries(e))}addFieldIndex(t,e){return b.resolve()}deleteFieldIndex(t,e){return b.resolve()}deleteAllFieldIndexes(t){return b.resolve()}createTargetIndexes(t,e){return b.resolve()}getDocumentsMatchingTarget(t,e){return b.resolve(null)}getIndexType(t,e){return b.resolve(0)}getFieldIndexes(t,e){return b.resolve([])}getNextCollectionGroupToUpdate(t){return b.resolve(null)}getMinOffset(t,e){return b.resolve(Yt.min())}getMinOffsetFromCollectionGroup(t,e){return b.resolve(Yt.min())}updateCollectionGroup(t,e,i){return b.resolve()}updateIndexEntries(t,e){return b.resolve()}}class Ip{constructor(){this.index={}}add(t){const e=t.lastSegment(),i=t.popLast(),s=this.index[e]||new ut(Z.comparator),o=!s.has(i);return this.index[e]=s.add(i),o}has(t){const e=t.lastSegment(),i=t.popLast(),s=this.index[e];return s&&s.has(i)}getEntries(t){return(this.index[t]||new ut(Z.comparator)).toArray()}}/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ta={didRun:!1,sequenceNumbersCollected:0,targetsRemoved:0,documentsRemoved:0},Fl=41943040;class It{static withCacheSize(t){return new It(t,It.DEFAULT_COLLECTION_PERCENTILE,It.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT)}constructor(t,e,i){this.cacheSizeCollectionThreshold=t,this.percentileToCollect=e,this.maximumSequenceNumbersToCollect=i}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */It.DEFAULT_COLLECTION_PERCENTILE=10,It.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT=1e3,It.DEFAULT=new It(Fl,It.DEFAULT_COLLECTION_PERCENTILE,It.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT),It.DISABLED=new It(-1,0,0);/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ke{constructor(t){this.ar=t}next(){return this.ar+=2,this.ar}static ur(){return new ke(0)}static cr(){return new ke(-1)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ea="LruGarbageCollector",wp=1048576;function na([n,t],[e,i]){const s=z(n,e);return s===0?z(t,i):s}class Ap{constructor(t){this.Ir=t,this.buffer=new ut(na),this.Er=0}dr(){return++this.Er}Ar(t){const e=[t,this.dr()];if(this.buffer.size<this.Ir)this.buffer=this.buffer.add(e);else{const i=this.buffer.last();na(e,i)<0&&(this.buffer=this.buffer.delete(i).add(e))}}get maxValue(){return this.buffer.last()[0]}}class Pp{constructor(t,e,i){this.garbageCollector=t,this.asyncQueue=e,this.localStore=i,this.Rr=null}start(){this.garbageCollector.params.cacheSizeCollectionThreshold!==-1&&this.Vr(6e4)}stop(){this.Rr&&(this.Rr.cancel(),this.Rr=null)}get started(){return this.Rr!==null}Vr(t){M(ea,`Garbage collection scheduled in ${t}ms`),this.Rr=this.asyncQueue.enqueueAfterDelay("lru_garbage_collection",t,(async()=>{this.Rr=null;try{await this.localStore.collectGarbage(this.garbageCollector)}catch(e){_n(e)?M(ea,"Ignoring IndexedDB error during garbage collection: ",e):await jr(e)}await this.Vr(3e5)}))}}class bp{constructor(t,e){this.mr=t,this.params=e}calculateTargetCount(t,e){return this.mr.gr(t).next((i=>Math.floor(e/100*i)))}nthSequenceNumber(t,e){if(e===0)return b.resolve(qr.ce);const i=new Ap(e);return this.mr.forEachTarget(t,(s=>i.Ar(s.sequenceNumber))).next((()=>this.mr.pr(t,(s=>i.Ar(s))))).next((()=>i.maxValue))}removeTargets(t,e,i){return this.mr.removeTargets(t,e,i)}removeOrphanedDocuments(t,e){return this.mr.removeOrphanedDocuments(t,e)}collect(t,e){return this.params.cacheSizeCollectionThreshold===-1?(M("LruGarbageCollector","Garbage collection skipped; disabled"),b.resolve(ta)):this.getCacheSize(t).next((i=>i<this.params.cacheSizeCollectionThreshold?(M("LruGarbageCollector",`Garbage collection skipped; Cache size ${i} is lower than threshold ${this.params.cacheSizeCollectionThreshold}`),ta):this.yr(t,e)))}getCacheSize(t){return this.mr.getCacheSize(t)}yr(t,e){let i,s,o,l,u,h,f;const y=Date.now();return this.calculateTargetCount(t,this.params.percentileToCollect).next((v=>(v>this.params.maximumSequenceNumbersToCollect?(M("LruGarbageCollector",`Capping sequence numbers to collect down to the maximum of ${this.params.maximumSequenceNumbersToCollect} from ${v}`),s=this.params.maximumSequenceNumbersToCollect):s=v,l=Date.now(),this.nthSequenceNumber(t,s)))).next((v=>(i=v,u=Date.now(),this.removeTargets(t,i,e)))).next((v=>(o=v,h=Date.now(),this.removeOrphanedDocuments(t,i)))).next((v=>(f=Date.now(),Pe()<=B.DEBUG&&M("LruGarbageCollector",`LRU Garbage Collection
	Counted targets in ${l-y}ms
	Determined least recently used ${s} in `+(u-l)+`ms
	Removed ${o} targets in `+(h-u)+`ms
	Removed ${v} documents in `+(f-h)+`ms
Total Duration: ${f-y}ms`),b.resolve({didRun:!0,sequenceNumbersCollected:s,targetsRemoved:o,documentsRemoved:v}))))}}function Sp(n,t){return new bp(n,t)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Cp{constructor(){this.changes=new _e((t=>t.toString()),((t,e)=>t.isEqual(e))),this.changesApplied=!1}addEntry(t){this.assertNotApplied(),this.changes.set(t.key,t)}removeEntry(t,e){this.assertNotApplied(),this.changes.set(t,Vt.newInvalidDocument(t).setReadTime(e))}getEntry(t,e){this.assertNotApplied();const i=this.changes.get(e);return i!==void 0?b.resolve(i):this.getFromCache(t,e)}getEntries(t,e){return this.getAllFromCache(t,e)}apply(t){return this.assertNotApplied(),this.changesApplied=!0,this.applyChanges(t)}assertNotApplied(){}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Rp{constructor(t,e){this.overlayedDocument=t,this.mutatedFields=e}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Vp{constructor(t,e,i,s){this.remoteDocumentCache=t,this.mutationQueue=e,this.documentOverlayCache=i,this.indexManager=s}getDocument(t,e){let i=null;return this.documentOverlayCache.getOverlay(t,e).next((s=>(i=s,this.remoteDocumentCache.getEntry(t,e)))).next((s=>(i!==null&&an(i.mutation,s,Nt.empty(),X.now()),s)))}getDocuments(t,e){return this.remoteDocumentCache.getEntries(t,e).next((i=>this.getLocalViewOfDocuments(t,i,_t()).next((()=>i))))}getLocalViewOfDocuments(t,e,i=_t()){const s=ce();return this.populateOverlays(t,s,e).next((()=>this.computeViews(t,e,s,i).next((o=>{let l=Hn();return o.forEach(((u,h)=>{l=l.insert(u,h.overlayedDocument)})),l}))))}getOverlayedDocuments(t,e){const i=ce();return this.populateOverlays(t,i,e).next((()=>this.computeViews(t,e,i,_t())))}populateOverlays(t,e,i){const s=[];return i.forEach((o=>{e.has(o)||s.push(o)})),this.documentOverlayCache.getOverlays(t,s).next((o=>{o.forEach(((l,u)=>{e.set(l,u)}))}))}computeViews(t,e,i,s){let o=ui();const l=on(),u=(function(){return on()})();return e.forEach(((h,f)=>{const y=i.get(f.key);s.has(f.key)&&(y===void 0||y.mutation instanceof Ee)?o=o.insert(f.key,f):y!==void 0?(l.set(f.key,y.mutation.getFieldMask()),an(y.mutation,f,y.mutation.getFieldMask(),X.now())):l.set(f.key,Nt.empty())})),this.recalculateAndSaveOverlays(t,o).next((h=>(h.forEach(((f,y)=>l.set(f,y))),e.forEach(((f,y)=>u.set(f,new Rp(y,l.get(f)??null)))),u)))}recalculateAndSaveOverlays(t,e){const i=on();let s=new At(((l,u)=>l-u)),o=_t();return this.mutationQueue.getAllMutationBatchesAffectingDocumentKeys(t,e).next((l=>{for(const u of l)u.keys().forEach((h=>{const f=e.get(h);if(f===null)return;let y=i.get(h)||Nt.empty();y=u.applyToLocalView(f,y),i.set(h,y);const v=(s.get(u.batchId)||_t()).add(h);s=s.insert(u.batchId,v)}))})).next((()=>{const l=[],u=s.getReverseIterator();for(;u.hasNext();){const h=u.getNext(),f=h.key,y=h.value,v=Sl();y.forEach((w=>{if(!o.has(w)){const S=Nl(e.get(w),i.get(w));S!==null&&v.set(w,S),o=o.add(w)}})),l.push(this.documentOverlayCache.saveOverlays(t,f,v))}return b.waitFor(l)})).next((()=>i))}recalculateAndSaveOverlaysForDocumentKeys(t,e){return this.remoteDocumentCache.getEntries(t,e).next((i=>this.recalculateAndSaveOverlays(t,i)))}getDocumentsMatchingQuery(t,e,i,s){return(function(l){return x.isDocumentKey(l.path)&&l.collectionGroup===null&&l.filters.length===0})(e)?this.getDocumentsMatchingDocumentQuery(t,e.path):Bf(e)?this.getDocumentsMatchingCollectionGroupQuery(t,e,i,s):this.getDocumentsMatchingCollectionQuery(t,e,i,s)}getNextDocuments(t,e,i,s){return this.remoteDocumentCache.getAllFromCollectionGroup(t,e,i,s).next((o=>{const l=s-o.size>0?this.documentOverlayCache.getOverlaysForCollectionGroup(t,e,i.largestBatchId,s-o.size):b.resolve(ce());let u=hn,h=o;return l.next((f=>b.forEach(f,((y,v)=>(u<v.largestBatchId&&(u=v.largestBatchId),o.get(y)?b.resolve():this.remoteDocumentCache.getEntry(t,y).next((w=>{h=h.insert(y,w)}))))).next((()=>this.populateOverlays(t,f,o))).next((()=>this.computeViews(t,h,f,_t()))).next((y=>({batchId:u,changes:bl(y)})))))}))}getDocumentsMatchingDocumentQuery(t,e){return this.getDocument(t,new x(e)).next((i=>{let s=Hn();return i.isFoundDocument()&&(s=s.insert(i.key,i)),s}))}getDocumentsMatchingCollectionGroupQuery(t,e,i,s){const o=e.collectionGroup;let l=Hn();return this.indexManager.getCollectionParents(t,o).next((u=>b.forEach(u,(h=>{const f=(function(v,w){return new vi(w,null,v.explicitOrderBy.slice(),v.filters.slice(),v.limit,v.limitType,v.startAt,v.endAt)})(e,h.child(o));return this.getDocumentsMatchingCollectionQuery(t,f,i,s).next((y=>{y.forEach(((v,w)=>{l=l.insert(v,w)}))}))})).next((()=>l))))}getDocumentsMatchingCollectionQuery(t,e,i,s){let o;return this.documentOverlayCache.getOverlaysForCollection(t,e.path,i.largestBatchId).next((l=>(o=l,this.remoteDocumentCache.getDocumentsMatchingQuery(t,e,i,o,s)))).next((l=>{o.forEach(((h,f)=>{const y=f.getKey();l.get(y)===null&&(l=l.insert(y,Vt.newInvalidDocument(y)))}));let u=Hn();return l.forEach(((h,f)=>{const y=o.get(h);y!==void 0&&an(y.mutation,f,Nt.empty(),X.now()),Jr(e,f)&&(u=u.insert(h,f))})),u}))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Dp{constructor(t){this.serializer=t,this.Lr=new Map,this.kr=new Map}getBundleMetadata(t,e){return b.resolve(this.Lr.get(e))}saveBundleMetadata(t,e){return this.Lr.set(e.id,(function(s){return{id:s.id,version:s.version,createTime:Se(s.createTime)}})(e)),b.resolve()}getNamedQuery(t,e){return b.resolve(this.kr.get(e))}saveNamedQuery(t,e){return this.kr.set(e.name,(function(s){return{name:s.name,query:vp(s.bundledQuery),readTime:Se(s.readTime)}})(e)),b.resolve()}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Mp{constructor(){this.overlays=new At(x.comparator),this.qr=new Map}getOverlay(t,e){return b.resolve(this.overlays.get(e))}getOverlays(t,e){const i=ce();return b.forEach(e,(s=>this.getOverlay(t,s).next((o=>{o!==null&&i.set(s,o)})))).next((()=>i))}saveOverlays(t,e,i){return i.forEach(((s,o)=>{this.St(t,e,o)})),b.resolve()}removeOverlaysForBatchId(t,e,i){const s=this.qr.get(i);return s!==void 0&&(s.forEach((o=>this.overlays=this.overlays.remove(o))),this.qr.delete(i)),b.resolve()}getOverlaysForCollection(t,e,i){const s=ce(),o=e.length+1,l=new x(e.child("")),u=this.overlays.getIteratorFrom(l);for(;u.hasNext();){const h=u.getNext().value,f=h.getKey();if(!e.isPrefixOf(f.path))break;f.path.length===o&&h.largestBatchId>i&&s.set(h.getKey(),h)}return b.resolve(s)}getOverlaysForCollectionGroup(t,e,i,s){let o=new At(((f,y)=>f-y));const l=this.overlays.getIterator();for(;l.hasNext();){const f=l.getNext().value;if(f.getKey().getCollectionGroup()===e&&f.largestBatchId>i){let y=o.get(f.largestBatchId);y===null&&(y=ce(),o=o.insert(f.largestBatchId,y)),y.set(f.getKey(),f)}}const u=ce(),h=o.getIterator();for(;h.hasNext()&&(h.getNext().value.forEach(((f,y)=>u.set(f,y))),!(u.size()>=s)););return b.resolve(u)}St(t,e,i){const s=this.overlays.get(i.key);if(s!==null){const l=this.qr.get(s.largestBatchId).delete(i.key);this.qr.set(s.largestBatchId,l)}this.overlays=this.overlays.insert(i.key,new rp(e,i));let o=this.qr.get(e);o===void 0&&(o=_t(),this.qr.set(e,o)),this.qr.set(e,o.add(i.key))}}/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Np{constructor(){this.sessionToken=xt.EMPTY_BYTE_STRING}getSessionToken(t){return b.resolve(this.sessionToken)}setSessionToken(t,e){return this.sessionToken=e,b.resolve()}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ts{constructor(){this.Qr=new ut(rt.$r),this.Ur=new ut(rt.Kr)}isEmpty(){return this.Qr.isEmpty()}addReference(t,e){const i=new rt(t,e);this.Qr=this.Qr.add(i),this.Ur=this.Ur.add(i)}Wr(t,e){t.forEach((i=>this.addReference(i,e)))}removeReference(t,e){this.Gr(new rt(t,e))}zr(t,e){t.forEach((i=>this.removeReference(i,e)))}jr(t){const e=new x(new Z([])),i=new rt(e,t),s=new rt(e,t+1),o=[];return this.Ur.forEachInRange([i,s],(l=>{this.Gr(l),o.push(l.key)})),o}Jr(){this.Qr.forEach((t=>this.Gr(t)))}Gr(t){this.Qr=this.Qr.delete(t),this.Ur=this.Ur.delete(t)}Hr(t){const e=new x(new Z([])),i=new rt(e,t),s=new rt(e,t+1);let o=_t();return this.Ur.forEachInRange([i,s],(l=>{o=o.add(l.key)})),o}containsKey(t){const e=new rt(t,0),i=this.Qr.firstAfterOrEqual(e);return i!==null&&t.isEqual(i.key)}}class rt{constructor(t,e){this.key=t,this.Yr=e}static $r(t,e){return x.comparator(t.key,e.key)||z(t.Yr,e.Yr)}static Kr(t,e){return z(t.Yr,e.Yr)||x.comparator(t.key,e.key)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class kp{constructor(t,e){this.indexManager=t,this.referenceDelegate=e,this.mutationQueue=[],this.tr=1,this.Zr=new ut(rt.$r)}checkEmpty(t){return b.resolve(this.mutationQueue.length===0)}addMutationBatch(t,e,i,s){const o=this.tr;this.tr++,this.mutationQueue.length>0&&this.mutationQueue[this.mutationQueue.length-1];const l=new ip(o,e,i,s);this.mutationQueue.push(l);for(const u of s)this.Zr=this.Zr.add(new rt(u.key,o)),this.indexManager.addToCollectionParentIndex(t,u.key.path.popLast());return b.resolve(l)}lookupMutationBatch(t,e){return b.resolve(this.Xr(e))}getNextMutationBatchAfterBatchId(t,e){const i=e+1,s=this.ei(i),o=s<0?0:s;return b.resolve(this.mutationQueue.length>o?this.mutationQueue[o]:null)}getHighestUnacknowledgedBatchId(){return b.resolve(this.mutationQueue.length===0?zr:this.tr-1)}getAllMutationBatches(t){return b.resolve(this.mutationQueue.slice())}getAllMutationBatchesAffectingDocumentKey(t,e){const i=new rt(e,0),s=new rt(e,Number.POSITIVE_INFINITY),o=[];return this.Zr.forEachInRange([i,s],(l=>{const u=this.Xr(l.Yr);o.push(u)})),b.resolve(o)}getAllMutationBatchesAffectingDocumentKeys(t,e){let i=new ut(z);return e.forEach((s=>{const o=new rt(s,0),l=new rt(s,Number.POSITIVE_INFINITY);this.Zr.forEachInRange([o,l],(u=>{i=i.add(u.Yr)}))})),b.resolve(this.ti(i))}getAllMutationBatchesAffectingQuery(t,e){const i=e.path,s=i.length+1;let o=i;x.isDocumentKey(o)||(o=o.child(""));const l=new rt(new x(o),0);let u=new ut(z);return this.Zr.forEachWhile((h=>{const f=h.key.path;return!!i.isPrefixOf(f)&&(f.length===s&&(u=u.add(h.Yr)),!0)}),l),b.resolve(this.ti(u))}ti(t){const e=[];return t.forEach((i=>{const s=this.Xr(i);s!==null&&e.push(s)})),e}removeMutationBatch(t,e){Y(this.ni(e.batchId,"removed")===0,55003),this.mutationQueue.shift();let i=this.Zr;return b.forEach(e.mutations,(s=>{const o=new rt(s.key,e.batchId);return i=i.delete(o),this.referenceDelegate.markPotentiallyOrphaned(t,s.key)})).next((()=>{this.Zr=i}))}ir(t){}containsKey(t,e){const i=new rt(e,0),s=this.Zr.firstAfterOrEqual(i);return b.resolve(e.isEqual(s&&s.key))}performConsistencyCheck(t){return this.mutationQueue.length,b.resolve()}ni(t,e){return this.ei(t)}ei(t){return this.mutationQueue.length===0?0:t-this.mutationQueue[0].batchId}Xr(t){const e=this.ei(t);return e<0||e>=this.mutationQueue.length?null:this.mutationQueue[e]}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Op{constructor(t){this.ri=t,this.docs=(function(){return new At(x.comparator)})(),this.size=0}setIndexManager(t){this.indexManager=t}addEntry(t,e){const i=e.key,s=this.docs.get(i),o=s?s.size:0,l=this.ri(e);return this.docs=this.docs.insert(i,{document:e.mutableCopy(),size:l}),this.size+=l-o,this.indexManager.addToCollectionParentIndex(t,i.path.popLast())}removeEntry(t){const e=this.docs.get(t);e&&(this.docs=this.docs.remove(t),this.size-=e.size)}getEntry(t,e){const i=this.docs.get(e);return b.resolve(i?i.document.mutableCopy():Vt.newInvalidDocument(e))}getEntries(t,e){let i=ui();return e.forEach((s=>{const o=this.docs.get(s);i=i.insert(s,o?o.document.mutableCopy():Vt.newInvalidDocument(s))})),b.resolve(i)}getDocumentsMatchingQuery(t,e,i,s){let o=ui();const l=e.path,u=new x(l.child("__id-9223372036854775808__")),h=this.docs.getIteratorFrom(u);for(;h.hasNext();){const{key:f,value:{document:y}}=h.getNext();if(!l.isPrefixOf(f.path))break;f.path.length>l.length+1||mf(pf(y),i)<=0||(s.has(y.key)||Jr(e,y))&&(o=o.insert(y.key,y.mutableCopy()))}return b.resolve(o)}getAllFromCollectionGroup(t,e,i,s){F(9500)}ii(t,e){return b.forEach(this.docs,(i=>e(i)))}newChangeBuffer(t){return new xp(this)}getSize(t){return b.resolve(this.size)}}class xp extends Cp{constructor(t){super(),this.Nr=t}applyChanges(t){const e=[];return this.changes.forEach(((i,s)=>{s.isValidDocument()?e.push(this.Nr.addEntry(t,s)):this.Nr.removeEntry(i)})),b.waitFor(e)}getFromCache(t,e){return this.Nr.getEntry(t,e)}getAllFromCache(t,e){return this.Nr.getEntries(t,e)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Lp{constructor(t){this.persistence=t,this.si=new _e((e=>Qr(e)),Xr),this.lastRemoteSnapshotVersion=Q.min(),this.highestTargetId=0,this.oi=0,this._i=new ts,this.targetCount=0,this.ai=ke.ur()}forEachTarget(t,e){return this.si.forEach(((i,s)=>e(s))),b.resolve()}getLastRemoteSnapshotVersion(t){return b.resolve(this.lastRemoteSnapshotVersion)}getHighestSequenceNumber(t){return b.resolve(this.oi)}allocateTargetId(t){return this.highestTargetId=this.ai.next(),b.resolve(this.highestTargetId)}setTargetsMetadata(t,e,i){return i&&(this.lastRemoteSnapshotVersion=i),e>this.oi&&(this.oi=e),b.resolve()}Pr(t){this.si.set(t.target,t);const e=t.targetId;e>this.highestTargetId&&(this.ai=new ke(e),this.highestTargetId=e),t.sequenceNumber>this.oi&&(this.oi=t.sequenceNumber)}addTargetData(t,e){return this.Pr(e),this.targetCount+=1,b.resolve()}updateTargetData(t,e){return this.Pr(e),b.resolve()}removeTargetData(t,e){return this.si.delete(e.target),this._i.jr(e.targetId),this.targetCount-=1,b.resolve()}removeTargets(t,e,i){let s=0;const o=[];return this.si.forEach(((l,u)=>{u.sequenceNumber<=e&&i.get(u.targetId)===null&&(this.si.delete(l),o.push(this.removeMatchingKeysForTargetId(t,u.targetId)),s++)})),b.waitFor(o).next((()=>s))}getTargetCount(t){return b.resolve(this.targetCount)}getTargetData(t,e){const i=this.si.get(e)||null;return b.resolve(i)}addMatchingKeys(t,e,i){return this._i.Wr(e,i),b.resolve()}removeMatchingKeys(t,e,i){this._i.zr(e,i);const s=this.persistence.referenceDelegate,o=[];return s&&e.forEach((l=>{o.push(s.markPotentiallyOrphaned(t,l))})),b.waitFor(o)}removeMatchingKeysForTargetId(t,e){return this._i.jr(e),b.resolve()}getMatchingKeysForTargetId(t,e){const i=this._i.Hr(e);return b.resolve(i)}containsKey(t,e){return b.resolve(this._i.containsKey(e))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ul{constructor(t,e){this.ui={},this.overlays={},this.ci=new qr(0),this.li=!1,this.li=!0,this.hi=new Np,this.referenceDelegate=t(this),this.Pi=new Lp(this),this.indexManager=new Tp,this.remoteDocumentCache=(function(s){return new Op(s)})((i=>this.referenceDelegate.Ti(i))),this.serializer=new Ep(e),this.Ii=new Dp(this.serializer)}start(){return Promise.resolve()}shutdown(){return this.li=!1,Promise.resolve()}get started(){return this.li}setDatabaseDeletedListener(){}setNetworkEnabled(){}getIndexManager(t){return this.indexManager}getDocumentOverlayCache(t){let e=this.overlays[t.toKey()];return e||(e=new Mp,this.overlays[t.toKey()]=e),e}getMutationQueue(t,e){let i=this.ui[t.toKey()];return i||(i=new kp(e,this.referenceDelegate),this.ui[t.toKey()]=i),i}getGlobalsCache(){return this.hi}getTargetCache(){return this.Pi}getRemoteDocumentCache(){return this.remoteDocumentCache}getBundleCache(){return this.Ii}runTransaction(t,e,i){M("MemoryPersistence","Starting transaction:",t);const s=new Fp(this.ci.next());return this.referenceDelegate.Ei(),i(s).next((o=>this.referenceDelegate.di(s).next((()=>o)))).toPromise().then((o=>(s.raiseOnCommittedEvent(),o)))}Ai(t,e){return b.or(Object.values(this.ui).map((i=>()=>i.containsKey(t,e))))}}class Fp extends yf{constructor(t){super(),this.currentSequenceNumber=t}}class es{constructor(t){this.persistence=t,this.Ri=new ts,this.Vi=null}static mi(t){return new es(t)}get fi(){if(this.Vi)return this.Vi;throw F(60996)}addReference(t,e,i){return this.Ri.addReference(i,e),this.fi.delete(i.toString()),b.resolve()}removeReference(t,e,i){return this.Ri.removeReference(i,e),this.fi.add(i.toString()),b.resolve()}markPotentiallyOrphaned(t,e){return this.fi.add(e.toString()),b.resolve()}removeTarget(t,e){this.Ri.jr(e.targetId).forEach((s=>this.fi.add(s.toString())));const i=this.persistence.getTargetCache();return i.getMatchingKeysForTargetId(t,e.targetId).next((s=>{s.forEach((o=>this.fi.add(o.toString())))})).next((()=>i.removeTargetData(t,e)))}Ei(){this.Vi=new Set}di(t){const e=this.persistence.getRemoteDocumentCache().newChangeBuffer();return b.forEach(this.fi,(i=>{const s=x.fromPath(i);return this.gi(t,s).next((o=>{o||e.removeEntry(s,Q.min())}))})).next((()=>(this.Vi=null,e.apply(t))))}updateLimboDocument(t,e){return this.gi(t,e).next((i=>{i?this.fi.delete(e.toString()):this.fi.add(e.toString())}))}Ti(t){return 0}gi(t,e){return b.or([()=>b.resolve(this.Ri.containsKey(e)),()=>this.persistence.getTargetCache().containsKey(t,e),()=>this.persistence.Ai(t,e)])}}class fi{constructor(t,e){this.persistence=t,this.pi=new _e((i=>vf(i.path)),((i,s)=>i.isEqual(s))),this.garbageCollector=Sp(this,e)}static mi(t,e){return new fi(t,e)}Ei(){}di(t){return b.resolve()}forEachTarget(t,e){return this.persistence.getTargetCache().forEachTarget(t,e)}gr(t){const e=this.wr(t);return this.persistence.getTargetCache().getTargetCount(t).next((i=>e.next((s=>i+s))))}wr(t){let e=0;return this.pr(t,(i=>{e++})).next((()=>e))}pr(t,e){return b.forEach(this.pi,((i,s)=>this.br(t,i,s).next((o=>o?b.resolve():e(s)))))}removeTargets(t,e,i){return this.persistence.getTargetCache().removeTargets(t,e,i)}removeOrphanedDocuments(t,e){let i=0;const s=this.persistence.getRemoteDocumentCache(),o=s.newChangeBuffer();return s.ii(t,(l=>this.br(t,l,e).next((u=>{u||(i++,o.removeEntry(l,Q.min()))})))).next((()=>o.apply(t))).next((()=>i))}markPotentiallyOrphaned(t,e){return this.pi.set(e,t.currentSequenceNumber),b.resolve()}removeTarget(t,e){const i=e.withSequenceNumber(t.currentSequenceNumber);return this.persistence.getTargetCache().updateTargetData(t,i)}addReference(t,e,i){return this.pi.set(i,t.currentSequenceNumber),b.resolve()}removeReference(t,e,i){return this.pi.set(i,t.currentSequenceNumber),b.resolve()}updateLimboDocument(t,e){return this.pi.set(e,t.currentSequenceNumber),b.resolve()}Ti(t){let e=t.key.toString().length;return t.isFoundDocument()&&(e+=Xn(t.data.value)),e}br(t,e,i){return b.or([()=>this.persistence.Ai(t,e),()=>this.persistence.getTargetCache().containsKey(t,e),()=>{const s=this.pi.get(e);return b.resolve(s!==void 0&&s>i)}])}getCacheSize(t){return this.persistence.getRemoteDocumentCache().getSize(t)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ns{constructor(t,e,i,s){this.targetId=t,this.fromCache=e,this.Es=i,this.ds=s}static As(t,e){let i=_t(),s=_t();for(const o of e.docChanges)switch(o.type){case 0:i=i.add(o.doc.key);break;case 1:s=s.add(o.doc.key)}return new ns(t,e.fromCache,i,s)}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Up{constructor(){this._documentReadCount=0}get documentReadCount(){return this._documentReadCount}incrementDocumentReadCount(t){this._documentReadCount+=t}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Bp{constructor(){this.Rs=!1,this.Vs=!1,this.fs=100,this.gs=(function(){return mu()?8:_f(du())>0?6:4})()}initialize(t,e){this.ps=t,this.indexManager=e,this.Rs=!0}getDocumentsMatchingQuery(t,e,i,s){const o={result:null};return this.ys(t,e).next((l=>{o.result=l})).next((()=>{if(!o.result)return this.ws(t,e,s,i).next((l=>{o.result=l}))})).next((()=>{if(o.result)return;const l=new Up;return this.Ss(t,e,l).next((u=>{if(o.result=u,this.Vs)return this.bs(t,e,l,u.size)}))})).next((()=>o.result))}bs(t,e,i,s){return i.documentReadCount<this.fs?(Pe()<=B.DEBUG&&M("QueryEngine","SDK will not create cache indexes for query:",Ye(e),"since it only creates cache indexes for collection contains","more than or equal to",this.fs,"documents"),b.resolve()):(Pe()<=B.DEBUG&&M("QueryEngine","Query:",Ye(e),"scans",i.documentReadCount,"local documents and returns",s,"documents as results."),i.documentReadCount>this.gs*s?(Pe()<=B.DEBUG&&M("QueryEngine","The SDK decides to create cache indexes for query:",Ye(e),"as using cache indexes may help improve performance."),this.indexManager.createTargetIndexes(t,he(e))):b.resolve())}ys(t,e){if(Ko(e))return b.resolve(null);let i=he(e);return this.indexManager.getIndexType(t,i).next((s=>s===0?null:(e.limit!==null&&s===1&&(e=Ir(e,null,"F"),i=he(e)),this.indexManager.getDocumentsMatchingTarget(t,i).next((o=>{const l=_t(...o);return this.ps.getDocuments(t,l).next((u=>this.indexManager.getMinOffset(t,i).next((h=>{const f=this.Ds(e,u);return this.Cs(e,f,l,h.readTime)?this.ys(t,Ir(e,null,"F")):this.vs(t,f,e,h)}))))})))))}ws(t,e,i,s){return Ko(e)||s.isEqual(Q.min())?b.resolve(null):this.ps.getDocuments(t,i).next((o=>{const l=this.Ds(e,o);return this.Cs(e,l,i,s)?b.resolve(null):(Pe()<=B.DEBUG&&M("QueryEngine","Re-using previous result from %s to execute query: %s",s.toString(),Ye(e)),this.vs(t,l,e,ff(s,hn)).next((u=>u)))}))}Ds(t,e){let i=new ut(jf(t));return e.forEach(((s,o)=>{Jr(t,o)&&(i=i.add(o))})),i}Cs(t,e,i,s){if(t.limit===null)return!1;if(i.size!==e.size)return!0;const o=t.limitType==="F"?e.last():e.first();return!!o&&(o.hasPendingWrites||o.version.compareTo(s)>0)}Ss(t,e,i){return Pe()<=B.DEBUG&&M("QueryEngine","Using full collection scan to execute query:",Ye(e)),this.ps.getDocumentsMatchingQuery(t,e,Yt.min(),i)}vs(t,e,i,s){return this.ps.getDocumentsMatchingQuery(t,i,s).next((o=>(e.forEach((l=>{o=o.insert(l.key,l)})),o)))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const $p="LocalStore";class jp{constructor(t,e,i,s){this.persistence=t,this.Fs=e,this.serializer=s,this.Ms=new At(z),this.xs=new _e((o=>Qr(o)),Xr),this.Os=new Map,this.Ns=t.getRemoteDocumentCache(),this.Pi=t.getTargetCache(),this.Ii=t.getBundleCache(),this.Bs(i)}Bs(t){this.documentOverlayCache=this.persistence.getDocumentOverlayCache(t),this.indexManager=this.persistence.getIndexManager(t),this.mutationQueue=this.persistence.getMutationQueue(t,this.indexManager),this.localDocuments=new Vp(this.Ns,this.mutationQueue,this.documentOverlayCache,this.indexManager),this.Ns.setIndexManager(this.indexManager),this.Fs.initialize(this.localDocuments,this.indexManager)}collectGarbage(t){return this.persistence.runTransaction("Collect garbage","readwrite-primary",(e=>t.collect(e,this.Ms)))}}function qp(n,t,e,i){return new jp(n,t,e,i)}async function Bl(n,t){const e=W(n);return await e.persistence.runTransaction("Handle user change","readonly",(i=>{let s;return e.mutationQueue.getAllMutationBatches(i).next((o=>(s=o,e.Bs(t),e.mutationQueue.getAllMutationBatches(i)))).next((o=>{const l=[],u=[];let h=_t();for(const f of s){l.push(f.batchId);for(const y of f.mutations)h=h.add(y.key)}for(const f of o){u.push(f.batchId);for(const y of f.mutations)h=h.add(y.key)}return e.localDocuments.getDocuments(i,h).next((f=>({Ls:f,removedBatchIds:l,addedBatchIds:u})))}))}))}function zp(n,t){const e=W(n);return e.persistence.runTransaction("Acknowledge batch","readwrite-primary",(i=>{const s=t.batch.keys(),o=e.Ns.newChangeBuffer({trackRemovals:!0});return(function(u,h,f,y){const v=f.batch,w=v.keys();let S=b.resolve();return w.forEach((R=>{S=S.next((()=>y.getEntry(h,R))).next((k=>{const D=f.docVersions.get(R);Y(D!==null,48541),k.version.compareTo(D)<0&&(v.applyToRemoteDocument(k,f),k.isValidDocument()&&(k.setReadTime(f.commitVersion),y.addEntry(k)))}))})),S.next((()=>u.mutationQueue.removeMutationBatch(h,v)))})(e,i,t,o).next((()=>o.apply(i))).next((()=>e.mutationQueue.performConsistencyCheck(i))).next((()=>e.documentOverlayCache.removeOverlaysForBatchId(i,s,t.batch.batchId))).next((()=>e.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(i,(function(u){let h=_t();for(let f=0;f<u.mutationResults.length;++f)u.mutationResults[f].transformResults.length>0&&(h=h.add(u.batch.mutations[f].key));return h})(t)))).next((()=>e.localDocuments.getDocuments(i,s)))}))}function Hp(n){const t=W(n);return t.persistence.runTransaction("Get last remote snapshot version","readonly",(e=>t.Pi.getLastRemoteSnapshotVersion(e)))}function Gp(n,t){const e=W(n);return e.persistence.runTransaction("Get next mutation batch","readonly",(i=>(t===void 0&&(t=zr),e.mutationQueue.getNextMutationBatchAfterBatchId(i,t))))}class ia{constructor(){this.activeTargetIds=Kf()}zs(t){this.activeTargetIds=this.activeTargetIds.add(t)}js(t){this.activeTargetIds=this.activeTargetIds.delete(t)}Gs(){const t={activeTargetIds:this.activeTargetIds.toArray(),updateTimeMs:Date.now()};return JSON.stringify(t)}}class Wp{constructor(){this.Mo=new ia,this.xo={},this.onlineStateHandler=null,this.sequenceNumberHandler=null}addPendingMutation(t){}updateMutationState(t,e,i){}addLocalQueryTarget(t,e=!0){return e&&this.Mo.zs(t),this.xo[t]||"not-current"}updateQueryState(t,e,i){this.xo[t]=e}removeLocalQueryTarget(t){this.Mo.js(t)}isLocalQueryTarget(t){return this.Mo.activeTargetIds.has(t)}clearQueryState(t){delete this.xo[t]}getAllActiveQueryTargets(){return this.Mo.activeTargetIds}isActiveQueryTarget(t){return this.Mo.activeTargetIds.has(t)}start(){return this.Mo=new ia,Promise.resolve()}handleUserChange(t,e,i){}setOnlineState(t){}shutdown(){}writeSequenceNumber(t){}notifyBundleLoaded(t){}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Kp{Oo(t){}shutdown(){}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ra="ConnectivityMonitor";class sa{constructor(){this.No=()=>this.Bo(),this.Lo=()=>this.ko(),this.qo=[],this.Qo()}Oo(t){this.qo.push(t)}shutdown(){window.removeEventListener("online",this.No),window.removeEventListener("offline",this.Lo)}Qo(){window.addEventListener("online",this.No),window.addEventListener("offline",this.Lo)}Bo(){M(ra,"Network connectivity changed: AVAILABLE");for(const t of this.qo)t(0)}ko(){M(ra,"Network connectivity changed: UNAVAILABLE");for(const t of this.qo)t(1)}static v(){return typeof window<"u"&&window.addEventListener!==void 0&&window.removeEventListener!==void 0}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Gn=null;function br(){return Gn===null?Gn=(function(){return 268435456+Math.round(2147483648*Math.random())})():Gn++,"0x"+Gn.toString(16)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const or="RestConnection",Qp={BatchGetDocuments:"batchGet",Commit:"commit",RunQuery:"runQuery",RunAggregationQuery:"runAggregationQuery"};class Xp{get $o(){return!1}constructor(t){this.databaseInfo=t,this.databaseId=t.databaseId;const e=t.ssl?"https":"http",i=encodeURIComponent(this.databaseId.projectId),s=encodeURIComponent(this.databaseId.database);this.Uo=e+"://"+t.host,this.Ko=`projects/${i}/databases/${s}`,this.Wo=this.databaseId.database===oi?`project_id=${i}`:`project_id=${i}&database_id=${s}`}Go(t,e,i,s,o){const l=br(),u=this.zo(t,e.toUriEncodedString());M(or,`Sending RPC '${t}' ${l}:`,u,i);const h={"google-cloud-resource-prefix":this.Ko,"x-goog-request-params":this.Wo};this.jo(h,s,o);const{host:f}=new URL(u),y=Vr(f);return this.Jo(t,u,h,i,y).then((v=>(M(or,`Received RPC '${t}' ${l}: `,v),v)),(v=>{throw Ei(or,`RPC '${t}' ${l} failed with error: `,v,"url: ",u,"request:",i),v}))}Ho(t,e,i,s,o,l){return this.Go(t,e,i,s,o)}jo(t,e,i){t["X-Goog-Api-Client"]=(function(){return"gl-js/ fire/"+Oe})(),t["Content-Type"]="text/plain",this.databaseInfo.appId&&(t["X-Firebase-GMPID"]=this.databaseInfo.appId),e&&e.headers.forEach(((s,o)=>t[o]=s)),i&&i.headers.forEach(((s,o)=>t[o]=s))}zo(t,e){const i=Qp[t];return`${this.Uo}/v1/${e}:${i}`}terminate(){}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Jp{constructor(t){this.Yo=t.Yo,this.Zo=t.Zo}Xo(t){this.e_=t}t_(t){this.n_=t}r_(t){this.i_=t}onMessage(t){this.s_=t}close(){this.Zo()}send(t){this.Yo(t)}o_(){this.e_()}__(){this.n_()}a_(t){this.i_(t)}u_(t){this.s_(t)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const gt="WebChannelConnection";class Yp extends Xp{constructor(t){super(t),this.c_=[],this.forceLongPolling=t.forceLongPolling,this.autoDetectLongPolling=t.autoDetectLongPolling,this.useFetchStreams=t.useFetchStreams,this.longPollingOptions=t.longPollingOptions}Jo(t,e,i,s,o){const l=br();return new Promise(((u,h)=>{const f=new tl;f.setWithCredentials(!0),f.listenOnce(el.COMPLETE,(()=>{try{switch(f.getLastErrorCode()){case Qn.NO_ERROR:const v=f.getResponseJson();M(gt,`XHR for RPC '${t}' ${l} received:`,JSON.stringify(v)),u(v);break;case Qn.TIMEOUT:M(gt,`RPC '${t}' ${l} timed out`),h(new N(C.DEADLINE_EXCEEDED,"Request time out"));break;case Qn.HTTP_ERROR:const w=f.getStatus();if(M(gt,`RPC '${t}' ${l} failed with status:`,w,"response text:",f.getResponseText()),w>0){let S=f.getResponseJson();Array.isArray(S)&&(S=S[0]);const R=S?.error;if(R&&R.status&&R.message){const k=(function($){const L=$.toLowerCase().replace(/_/g,"-");return Object.values(C).indexOf(L)>=0?L:C.UNKNOWN})(R.status);h(new N(k,R.message))}else h(new N(C.UNKNOWN,"Server responded with status "+f.getStatus()))}else h(new N(C.UNAVAILABLE,"Connection failed."));break;default:F(9055,{l_:t,streamId:l,h_:f.getLastErrorCode(),P_:f.getLastError()})}}finally{M(gt,`RPC '${t}' ${l} completed.`)}}));const y=JSON.stringify(s);M(gt,`RPC '${t}' ${l} sending request:`,s),f.send(e,"POST",y,i,15)}))}T_(t,e,i){const s=br(),o=[this.Uo,"/","google.firestore.v1.Firestore","/",t,"/channel"],l=rl(),u=il(),h={httpSessionIdParam:"gsessionid",initMessageHeaders:{},messageUrlParams:{database:`projects/${this.databaseId.projectId}/databases/${this.databaseId.database}`},sendRawJson:!0,supportsCrossDomainXhr:!0,internalChannelParams:{forwardChannelRequestTimeoutMs:6e5},forceLongPolling:this.forceLongPolling,detectBufferingProxy:this.autoDetectLongPolling},f=this.longPollingOptions.timeoutSeconds;f!==void 0&&(h.longPollingTimeout=Math.round(1e3*f)),this.useFetchStreams&&(h.useFetchStreams=!0),this.jo(h.initMessageHeaders,e,i),h.encodeInitMessageHeaders=!0;const y=o.join("");M(gt,`Creating RPC '${t}' stream ${s}: ${y}`,h);const v=l.createWebChannel(y,h);this.I_(v);let w=!1,S=!1;const R=new Jp({Yo:D=>{S?M(gt,`Not sending because RPC '${t}' stream ${s} is closed:`,D):(w||(M(gt,`Opening RPC '${t}' stream ${s} transport.`),v.open(),w=!0),M(gt,`RPC '${t}' stream ${s} sending:`,D),v.send(D))},Zo:()=>v.close()}),k=(D,$,L)=>{D.listen($,(O=>{try{L(O)}catch(nt){setTimeout((()=>{throw nt}),0)}}))};return k(v,tn.EventType.OPEN,(()=>{S||(M(gt,`RPC '${t}' stream ${s} transport opened.`),R.o_())})),k(v,tn.EventType.CLOSE,(()=>{S||(S=!0,M(gt,`RPC '${t}' stream ${s} transport closed`),R.a_(),this.E_(v))})),k(v,tn.EventType.ERROR,(D=>{S||(S=!0,Ei(gt,`RPC '${t}' stream ${s} transport errored. Name:`,D.name,"Message:",D.message),R.a_(new N(C.UNAVAILABLE,"The operation could not be completed")))})),k(v,tn.EventType.MESSAGE,(D=>{if(!S){const $=D.data[0];Y(!!$,16349);const L=$,O=L?.error||L[0]?.error;if(O){M(gt,`RPC '${t}' stream ${s} received error:`,O);const nt=O.status;let Ct=(function(p){const m=tt[p];if(m!==void 0)return op(m)})(nt),ht=O.message;Ct===void 0&&(Ct=C.INTERNAL,ht="Unknown error status: "+nt+" with message "+O.message),S=!0,R.a_(new N(Ct,ht)),v.close()}else M(gt,`RPC '${t}' stream ${s} received:`,$),R.u_($)}})),k(u,nl.STAT_EVENT,(D=>{D.stat===mr.PROXY?M(gt,`RPC '${t}' stream ${s} detected buffering proxy`):D.stat===mr.NOPROXY&&M(gt,`RPC '${t}' stream ${s} detected no buffering proxy`)})),setTimeout((()=>{R.__()}),0),R}terminate(){this.c_.forEach((t=>t.close())),this.c_=[]}I_(t){this.c_.push(t)}E_(t){this.c_=this.c_.filter((e=>e===t))}}function ar(){return typeof document<"u"?document:null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function wi(n){return new ap(n,!0)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class $l{constructor(t,e,i=1e3,s=1.5,o=6e4){this.Mi=t,this.timerId=e,this.d_=i,this.A_=s,this.R_=o,this.V_=0,this.m_=null,this.f_=Date.now(),this.reset()}reset(){this.V_=0}g_(){this.V_=this.R_}p_(t){this.cancel();const e=Math.floor(this.V_+this.y_()),i=Math.max(0,Date.now()-this.f_),s=Math.max(0,e-i);s>0&&M("ExponentialBackoff",`Backing off for ${s} ms (base delay: ${this.V_} ms, delay with jitter: ${e} ms, last attempt: ${i} ms ago)`),this.m_=this.Mi.enqueueAfterDelay(this.timerId,s,(()=>(this.f_=Date.now(),t()))),this.V_*=this.A_,this.V_<this.d_&&(this.V_=this.d_),this.V_>this.R_&&(this.V_=this.R_)}w_(){this.m_!==null&&(this.m_.skipDelay(),this.m_=null)}cancel(){this.m_!==null&&(this.m_.cancel(),this.m_=null)}y_(){return(Math.random()-.5)*this.V_}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const oa="PersistentStream";class Zp{constructor(t,e,i,s,o,l,u,h){this.Mi=t,this.S_=i,this.b_=s,this.connection=o,this.authCredentialsProvider=l,this.appCheckCredentialsProvider=u,this.listener=h,this.state=0,this.D_=0,this.C_=null,this.v_=null,this.stream=null,this.F_=0,this.M_=new $l(t,e)}x_(){return this.state===1||this.state===5||this.O_()}O_(){return this.state===2||this.state===3}start(){this.F_=0,this.state!==4?this.auth():this.N_()}async stop(){this.x_()&&await this.close(0)}B_(){this.state=0,this.M_.reset()}L_(){this.O_()&&this.C_===null&&(this.C_=this.Mi.enqueueAfterDelay(this.S_,6e4,(()=>this.k_())))}q_(t){this.Q_(),this.stream.send(t)}async k_(){if(this.O_())return this.close(0)}Q_(){this.C_&&(this.C_.cancel(),this.C_=null)}U_(){this.v_&&(this.v_.cancel(),this.v_=null)}async close(t,e){this.Q_(),this.U_(),this.M_.cancel(),this.D_++,t!==4?this.M_.reset():e&&e.code===C.RESOURCE_EXHAUSTED?(me(e.toString()),me("Using maximum backoff delay to prevent overloading the backend."),this.M_.g_()):e&&e.code===C.UNAUTHENTICATED&&this.state!==3&&(this.authCredentialsProvider.invalidateToken(),this.appCheckCredentialsProvider.invalidateToken()),this.stream!==null&&(this.K_(),this.stream.close(),this.stream=null),this.state=t,await this.listener.r_(e)}K_(){}auth(){this.state=1;const t=this.W_(this.D_),e=this.D_;Promise.all([this.authCredentialsProvider.getToken(),this.appCheckCredentialsProvider.getToken()]).then((([i,s])=>{this.D_===e&&this.G_(i,s)}),(i=>{t((()=>{const s=new N(C.UNKNOWN,"Fetching auth token failed: "+i.message);return this.z_(s)}))}))}G_(t,e){const i=this.W_(this.D_);this.stream=this.j_(t,e),this.stream.Xo((()=>{i((()=>this.listener.Xo()))})),this.stream.t_((()=>{i((()=>(this.state=2,this.v_=this.Mi.enqueueAfterDelay(this.b_,1e4,(()=>(this.O_()&&(this.state=3),Promise.resolve()))),this.listener.t_())))})),this.stream.r_((s=>{i((()=>this.z_(s)))})),this.stream.onMessage((s=>{i((()=>++this.F_==1?this.J_(s):this.onNext(s)))}))}N_(){this.state=5,this.M_.p_((async()=>{this.state=0,this.start()}))}z_(t){return M(oa,`close with error: ${t}`),this.stream=null,this.close(4,t)}W_(t){return e=>{this.Mi.enqueueAndForget((()=>this.D_===t?e():(M(oa,"stream callback skipped by getCloseGuardedDispatcher."),Promise.resolve())))}}}class tm extends Zp{constructor(t,e,i,s,o,l){super(t,"write_stream_connection_backoff","write_stream_idle","health_check_timeout",e,i,s,l),this.serializer=o}get X_(){return this.F_>0}start(){this.lastStreamToken=void 0,super.start()}K_(){this.X_&&this.ea([])}j_(t,e){return this.connection.T_("Write",t,e)}J_(t){return Y(!!t.streamToken,31322),this.lastStreamToken=t.streamToken,Y(!t.writeResults||t.writeResults.length===0,55816),this.listener.ta()}onNext(t){Y(!!t.streamToken,12678),this.lastStreamToken=t.streamToken,this.M_.reset();const e=mp(t.writeResults,t.commitTime),i=Se(t.commitTime);return this.listener.na(i,e)}ra(){const t={};t.database=dp(this.serializer),this.q_(t)}ea(t){const e={streamToken:this.lastStreamToken,writes:t.map((i=>pp(this.serializer,i)))};this.q_(e)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class em{}class nm extends em{constructor(t,e,i,s){super(),this.authCredentials=t,this.appCheckCredentials=e,this.connection=i,this.serializer=s,this.ia=!1}sa(){if(this.ia)throw new N(C.FAILED_PRECONDITION,"The client has already been terminated.")}Go(t,e,i,s){return this.sa(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then((([o,l])=>this.connection.Go(t,Ar(e,i),s,o,l))).catch((o=>{throw o.name==="FirebaseError"?(o.code===C.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),o):new N(C.UNKNOWN,o.toString())}))}Ho(t,e,i,s,o){return this.sa(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then((([l,u])=>this.connection.Ho(t,Ar(e,i),s,l,u,o))).catch((l=>{throw l.name==="FirebaseError"?(l.code===C.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),l):new N(C.UNKNOWN,l.toString())}))}terminate(){this.ia=!0,this.connection.terminate()}}class im{constructor(t,e){this.asyncQueue=t,this.onlineStateHandler=e,this.state="Unknown",this.oa=0,this._a=null,this.aa=!0}ua(){this.oa===0&&(this.ca("Unknown"),this._a=this.asyncQueue.enqueueAfterDelay("online_state_timeout",1e4,(()=>(this._a=null,this.la("Backend didn't respond within 10 seconds."),this.ca("Offline"),Promise.resolve()))))}ha(t){this.state==="Online"?this.ca("Unknown"):(this.oa++,this.oa>=1&&(this.Pa(),this.la(`Connection failed 1 times. Most recent error: ${t.toString()}`),this.ca("Offline")))}set(t){this.Pa(),this.oa=0,t==="Online"&&(this.aa=!1),this.ca(t)}ca(t){t!==this.state&&(this.state=t,this.onlineStateHandler(t))}la(t){const e=`Could not reach Cloud Firestore backend. ${t}
This typically indicates that your device does not have a healthy Internet connection at the moment. The client will operate in offline mode until it is able to successfully connect to the backend.`;this.aa?(me(e),this.aa=!1):M("OnlineStateTracker",e)}Pa(){this._a!==null&&(this._a.cancel(),this._a=null)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const vn="RemoteStore";class rm{constructor(t,e,i,s,o){this.localStore=t,this.datastore=e,this.asyncQueue=i,this.remoteSyncer={},this.Ta=[],this.Ia=new Map,this.Ea=new Set,this.da=[],this.Aa=o,this.Aa.Oo((l=>{i.enqueueAndForget((async()=>{In(this)&&(M(vn,"Restarting streams for network reachability change."),await(async function(h){const f=W(h);f.Ea.add(4),await Tn(f),f.Ra.set("Unknown"),f.Ea.delete(4),await Ai(f)})(this))}))})),this.Ra=new im(i,s)}}async function Ai(n){if(In(n))for(const t of n.da)await t(!0)}async function Tn(n){for(const t of n.da)await t(!1)}function In(n){return W(n).Ea.size===0}async function jl(n,t,e){if(!_n(t))throw t;n.Ea.add(1),await Tn(n),n.Ra.set("Offline"),e||(e=()=>Hp(n.localStore)),n.asyncQueue.enqueueRetryable((async()=>{M(vn,"Retrying IndexedDB access"),await e(),n.Ea.delete(1),await Ai(n)}))}function ql(n,t){return t().catch((e=>jl(n,e,t)))}async function Pi(n){const t=W(n),e=te(t);let i=t.Ta.length>0?t.Ta[t.Ta.length-1].batchId:zr;for(;sm(t);)try{const s=await Gp(t.localStore,i);if(s===null){t.Ta.length===0&&e.L_();break}i=s.batchId,om(t,s)}catch(s){await jl(t,s)}zl(t)&&Hl(t)}function sm(n){return In(n)&&n.Ta.length<10}function om(n,t){n.Ta.push(t);const e=te(n);e.O_()&&e.X_&&e.ea(t.mutations)}function zl(n){return In(n)&&!te(n).x_()&&n.Ta.length>0}function Hl(n){te(n).start()}async function am(n){te(n).ra()}async function lm(n){const t=te(n);for(const e of n.Ta)t.ea(e.mutations)}async function cm(n,t,e){const i=n.Ta.shift(),s=Zr.from(i,t,e);await ql(n,(()=>n.remoteSyncer.applySuccessfulWrite(s))),await Pi(n)}async function um(n,t){t&&te(n).X_&&await(async function(i,s){if((function(l){return sp(l)&&l!==C.ABORTED})(s.code)){const o=i.Ta.shift();te(i).B_(),await ql(i,(()=>i.remoteSyncer.rejectFailedWrite(o.batchId,s))),await Pi(i)}})(n,t),zl(n)&&Hl(n)}async function aa(n,t){const e=W(n);e.asyncQueue.verifyOperationInProgress(),M(vn,"RemoteStore received new credentials");const i=In(e);e.Ea.add(3),await Tn(e),i&&e.Ra.set("Unknown"),await e.remoteSyncer.handleCredentialChange(t),e.Ea.delete(3),await Ai(e)}async function hm(n,t){const e=W(n);t?(e.Ea.delete(2),await Ai(e)):t||(e.Ea.add(2),await Tn(e),e.Ra.set("Unknown"))}function te(n){return n.fa||(n.fa=(function(e,i,s){const o=W(e);return o.sa(),new tm(i,o.connection,o.authCredentials,o.appCheckCredentials,o.serializer,s)})(n.datastore,n.asyncQueue,{Xo:()=>Promise.resolve(),t_:am.bind(null,n),r_:um.bind(null,n),ta:lm.bind(null,n),na:cm.bind(null,n)}),n.da.push((async t=>{t?(n.fa.B_(),await Pi(n)):(await n.fa.stop(),n.Ta.length>0&&(M(vn,`Stopping write stream with ${n.Ta.length} pending writes`),n.Ta=[]))}))),n.fa}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class is{constructor(t,e,i,s,o){this.asyncQueue=t,this.timerId=e,this.targetTimeMs=i,this.op=s,this.removalCallback=o,this.deferred=new ue,this.then=this.deferred.promise.then.bind(this.deferred.promise),this.deferred.promise.catch((l=>{}))}get promise(){return this.deferred.promise}static createAndSchedule(t,e,i,s,o){const l=Date.now()+i,u=new is(t,e,l,s,o);return u.start(i),u}start(t){this.timerHandle=setTimeout((()=>this.handleDelayElapsed()),t)}skipDelay(){return this.handleDelayElapsed()}cancel(t){this.timerHandle!==null&&(this.clearTimeout(),this.deferred.reject(new N(C.CANCELLED,"Operation cancelled"+(t?": "+t:""))))}handleDelayElapsed(){this.asyncQueue.enqueueAndForget((()=>this.timerHandle!==null?(this.clearTimeout(),this.op().then((t=>this.deferred.resolve(t)))):Promise.resolve()))}clearTimeout(){this.timerHandle!==null&&(this.removalCallback(this),clearTimeout(this.timerHandle),this.timerHandle=null)}}function Gl(n,t){if(me("AsyncQueue",`${t}: ${n}`),_n(n))return new N(C.UNAVAILABLE,`${t}: ${n}`);throw n}class dm{constructor(){this.queries=la(),this.onlineState="Unknown",this.Ca=new Set}terminate(){(function(e,i){const s=W(e),o=s.queries;s.queries=la(),o.forEach(((l,u)=>{for(const h of u.Sa)h.onError(i)}))})(this,new N(C.ABORTED,"Firestore shutting down"))}}function la(){return new _e((n=>Al(n)),wl)}function fm(n){n.Ca.forEach((t=>{t.next()}))}var ca,ua;(ua=ca||(ca={})).Ma="default",ua.Cache="cache";const pm="SyncEngine";class mm{constructor(t,e,i,s,o,l){this.localStore=t,this.remoteStore=e,this.eventManager=i,this.sharedClientState=s,this.currentUser=o,this.maxConcurrentLimboResolutions=l,this.Pu={},this.Tu=new _e((u=>Al(u)),wl),this.Iu=new Map,this.Eu=new Set,this.du=new At(x.comparator),this.Au=new Map,this.Ru=new ts,this.Vu={},this.mu=new Map,this.fu=ke.cr(),this.onlineState="Unknown",this.gu=void 0}get isPrimaryClient(){return this.gu===!0}}async function gm(n,t,e){const i=vm(n);try{const s=await(function(l,u){const h=W(l),f=X.now(),y=u.reduce(((S,R)=>S.add(R.key)),_t());let v,w;return h.persistence.runTransaction("Locally write mutations","readwrite",(S=>{let R=ui(),k=_t();return h.Ns.getEntries(S,y).next((D=>{R=D,R.forEach((($,L)=>{L.isValidDocument()||(k=k.add($))}))})).next((()=>h.localDocuments.getOverlayedDocuments(S,R))).next((D=>{v=D;const $=[];for(const L of u){const O=ep(L,v.get(L.key).overlayedDocument);O!=null&&$.push(new Ee(L.key,O,gl(O.value.mapValue),Bt.exists(!0)))}return h.mutationQueue.addMutationBatch(S,f,$,u)})).next((D=>{w=D;const $=D.applyToLocalDocumentSet(v,k);return h.documentOverlayCache.saveOverlays(S,D.batchId,$)}))})).then((()=>({batchId:w.batchId,changes:bl(v)})))})(i.localStore,t);i.sharedClientState.addPendingMutation(s.batchId),(function(l,u,h){let f=l.Vu[l.currentUser.toKey()];f||(f=new At(z)),f=f.insert(u,h),l.Vu[l.currentUser.toKey()]=f})(i,s.batchId,e),await bi(i,s.changes),await Pi(i.remoteStore)}catch(s){const o=Gl(s,"Failed to persist write");e.reject(o)}}function ha(n,t,e){const i=W(n);if(i.isPrimaryClient&&e===0||!i.isPrimaryClient&&e===1){const s=[];i.Tu.forEach(((o,l)=>{const u=l.view.va(t);u.snapshot&&s.push(u.snapshot)})),(function(l,u){const h=W(l);h.onlineState=u;let f=!1;h.queries.forEach(((y,v)=>{for(const w of v.Sa)w.va(u)&&(f=!0)})),f&&fm(h)})(i.eventManager,t),s.length&&i.Pu.H_(s),i.onlineState=t,i.isPrimaryClient&&i.sharedClientState.setOnlineState(t)}}async function ym(n,t){const e=W(n),i=t.batch.batchId;try{const s=await zp(e.localStore,t);Kl(e,i,null),Wl(e,i),e.sharedClientState.updateMutationState(i,"acknowledged"),await bi(e,s)}catch(s){await jr(s)}}async function _m(n,t,e){const i=W(n);try{const s=await(function(l,u){const h=W(l);return h.persistence.runTransaction("Reject batch","readwrite-primary",(f=>{let y;return h.mutationQueue.lookupMutationBatch(f,u).next((v=>(Y(v!==null,37113),y=v.keys(),h.mutationQueue.removeMutationBatch(f,v)))).next((()=>h.mutationQueue.performConsistencyCheck(f))).next((()=>h.documentOverlayCache.removeOverlaysForBatchId(f,y,u))).next((()=>h.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(f,y))).next((()=>h.localDocuments.getDocuments(f,y)))}))})(i.localStore,t);Kl(i,t,e),Wl(i,t),i.sharedClientState.updateMutationState(t,"rejected",e),await bi(i,s)}catch(s){await jr(s)}}function Wl(n,t){(n.mu.get(t)||[]).forEach((e=>{e.resolve()})),n.mu.delete(t)}function Kl(n,t,e){const i=W(n);let s=i.Vu[i.currentUser.toKey()];if(s){const o=s.get(t);o&&(e?o.reject(e):o.resolve(),s=s.remove(t)),i.Vu[i.currentUser.toKey()]=s}}async function bi(n,t,e){const i=W(n),s=[],o=[],l=[];i.Tu.isEmpty()||(i.Tu.forEach(((u,h)=>{l.push(i.pu(h,t,e).then((f=>{if((f||e)&&i.isPrimaryClient){const y=f?!f.fromCache:e?.targetChanges.get(h.targetId)?.current;i.sharedClientState.updateQueryState(h.targetId,y?"current":"not-current")}if(f){s.push(f);const y=ns.As(h.targetId,f);o.push(y)}})))})),await Promise.all(l),i.Pu.H_(s),await(async function(h,f){const y=W(h);try{await y.persistence.runTransaction("notifyLocalViewChanges","readwrite",(v=>b.forEach(f,(w=>b.forEach(w.Es,(S=>y.persistence.referenceDelegate.addReference(v,w.targetId,S))).next((()=>b.forEach(w.ds,(S=>y.persistence.referenceDelegate.removeReference(v,w.targetId,S)))))))))}catch(v){if(!_n(v))throw v;M($p,"Failed to update sequence numbers: "+v)}for(const v of f){const w=v.targetId;if(!v.fromCache){const S=y.Ms.get(w),R=S.snapshotVersion,k=S.withLastLimboFreeSnapshotVersion(R);y.Ms=y.Ms.insert(w,k)}}})(i.localStore,o))}async function Em(n,t){const e=W(n);if(!e.currentUser.isEqual(t)){M(pm,"User change. New user:",t.toKey());const i=await Bl(e.localStore,t);e.currentUser=t,(function(o,l){o.mu.forEach((u=>{u.forEach((h=>{h.reject(new N(C.CANCELLED,l))}))})),o.mu.clear()})(e,"'waitForPendingWrites' promise is rejected due to a user change."),e.sharedClientState.handleUserChange(t,i.removedBatchIds,i.addedBatchIds),await bi(e,i.Ls)}}function vm(n){const t=W(n);return t.remoteStore.remoteSyncer.applySuccessfulWrite=ym.bind(null,t),t.remoteStore.remoteSyncer.rejectFailedWrite=_m.bind(null,t),t}class pi{constructor(){this.kind="memory",this.synchronizeTabs=!1}async initialize(t){this.serializer=wi(t.databaseInfo.databaseId),this.sharedClientState=this.Du(t),this.persistence=this.Cu(t),await this.persistence.start(),this.localStore=this.vu(t),this.gcScheduler=this.Fu(t,this.localStore),this.indexBackfillerScheduler=this.Mu(t,this.localStore)}Fu(t,e){return null}Mu(t,e){return null}vu(t){return qp(this.persistence,new Bp,t.initialUser,this.serializer)}Cu(t){return new Ul(es.mi,this.serializer)}Du(t){return new Wp}async terminate(){this.gcScheduler?.stop(),this.indexBackfillerScheduler?.stop(),this.sharedClientState.shutdown(),await this.persistence.shutdown()}}pi.provider={build:()=>new pi};class Tm extends pi{constructor(t){super(),this.cacheSizeBytes=t}Fu(t,e){Y(this.persistence.referenceDelegate instanceof fi,46915);const i=this.persistence.referenceDelegate.garbageCollector;return new Pp(i,t.asyncQueue,e)}Cu(t){const e=this.cacheSizeBytes!==void 0?It.withCacheSize(this.cacheSizeBytes):It.DEFAULT;return new Ul((i=>fi.mi(i,e)),this.serializer)}}class Sr{async initialize(t,e){this.localStore||(this.localStore=t.localStore,this.sharedClientState=t.sharedClientState,this.datastore=this.createDatastore(e),this.remoteStore=this.createRemoteStore(e),this.eventManager=this.createEventManager(e),this.syncEngine=this.createSyncEngine(e,!t.synchronizeTabs),this.sharedClientState.onlineStateHandler=i=>ha(this.syncEngine,i,1),this.remoteStore.remoteSyncer.handleCredentialChange=Em.bind(null,this.syncEngine),await hm(this.remoteStore,this.syncEngine.isPrimaryClient))}createEventManager(t){return(function(){return new dm})()}createDatastore(t){const e=wi(t.databaseInfo.databaseId),i=(function(o){return new Yp(o)})(t.databaseInfo);return(function(o,l,u,h){return new nm(o,l,u,h)})(t.authCredentials,t.appCheckCredentials,i,e)}createRemoteStore(t){return(function(i,s,o,l,u){return new rm(i,s,o,l,u)})(this.localStore,this.datastore,t.asyncQueue,(e=>ha(this.syncEngine,e,0)),(function(){return sa.v()?new sa:new Kp})())}createSyncEngine(t,e){return(function(s,o,l,u,h,f,y){const v=new mm(s,o,l,u,h,f);return y&&(v.gu=!0),v})(this.localStore,this.remoteStore,this.eventManager,this.sharedClientState,t.initialUser,t.maxConcurrentLimboResolutions,e)}async terminate(){await(async function(e){const i=W(e);M(vn,"RemoteStore shutting down."),i.Ea.add(5),await Tn(i),i.Aa.shutdown(),i.Ra.set("Unknown")})(this.remoteStore),this.datastore?.terminate(),this.eventManager?.terminate()}}Sr.provider={build:()=>new Sr};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ee="FirestoreClient";class Im{constructor(t,e,i,s,o){this.authCredentials=t,this.appCheckCredentials=e,this.asyncQueue=i,this.databaseInfo=s,this.user=yt.UNAUTHENTICATED,this.clientId=Br.newId(),this.authCredentialListener=()=>Promise.resolve(),this.appCheckCredentialListener=()=>Promise.resolve(),this._uninitializedComponentsProvider=o,this.authCredentials.start(i,(async l=>{M(ee,"Received user=",l.uid),await this.authCredentialListener(l),this.user=l})),this.appCheckCredentials.start(i,(l=>(M(ee,"Received new app check token=",l),this.appCheckCredentialListener(l,this.user))))}get configuration(){return{asyncQueue:this.asyncQueue,databaseInfo:this.databaseInfo,clientId:this.clientId,authCredentials:this.authCredentials,appCheckCredentials:this.appCheckCredentials,initialUser:this.user,maxConcurrentLimboResolutions:100}}setCredentialChangeListener(t){this.authCredentialListener=t}setAppCheckTokenChangeListener(t){this.appCheckCredentialListener=t}terminate(){this.asyncQueue.enterRestrictedMode();const t=new ue;return this.asyncQueue.enqueueAndForgetEvenWhileRestricted((async()=>{try{this._onlineComponents&&await this._onlineComponents.terminate(),this._offlineComponents&&await this._offlineComponents.terminate(),this.authCredentials.shutdown(),this.appCheckCredentials.shutdown(),t.resolve()}catch(e){const i=Gl(e,"Failed to shutdown persistence");t.reject(i)}})),t.promise}}async function lr(n,t){n.asyncQueue.verifyOperationInProgress(),M(ee,"Initializing OfflineComponentProvider");const e=n.configuration;await t.initialize(e);let i=e.initialUser;n.setCredentialChangeListener((async s=>{i.isEqual(s)||(await Bl(t.localStore,s),i=s)})),t.persistence.setDatabaseDeletedListener((()=>n.terminate())),n._offlineComponents=t}async function da(n,t){n.asyncQueue.verifyOperationInProgress();const e=await wm(n);M(ee,"Initializing OnlineComponentProvider"),await t.initialize(e,n.configuration),n.setCredentialChangeListener((i=>aa(t.remoteStore,i))),n.setAppCheckTokenChangeListener(((i,s)=>aa(t.remoteStore,s))),n._onlineComponents=t}async function wm(n){if(!n._offlineComponents)if(n._uninitializedComponentsProvider){M(ee,"Using user provided OfflineComponentProvider");try{await lr(n,n._uninitializedComponentsProvider._offline)}catch(t){const e=t;if(!(function(s){return s.name==="FirebaseError"?s.code===C.FAILED_PRECONDITION||s.code===C.UNIMPLEMENTED:!(typeof DOMException<"u"&&s instanceof DOMException)||s.code===22||s.code===20||s.code===11})(e))throw e;Ei("Error using user provided cache. Falling back to memory cache: "+e),await lr(n,new pi)}}else M(ee,"Using default OfflineComponentProvider"),await lr(n,new Tm(void 0));return n._offlineComponents}async function Am(n){return n._onlineComponents||(n._uninitializedComponentsProvider?(M(ee,"Using user provided OnlineComponentProvider"),await da(n,n._uninitializedComponentsProvider._online)):(M(ee,"Using default OnlineComponentProvider"),await da(n,new Sr))),n._onlineComponents}function Pm(n){return Am(n).then((t=>t.syncEngine))}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ql(n){const t={};return n.timeoutSeconds!==void 0&&(t.timeoutSeconds=n.timeoutSeconds),t}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const fa=new Map;/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Xl="firestore.googleapis.com",pa=!0;class ma{constructor(t){if(t.host===void 0){if(t.ssl!==void 0)throw new N(C.INVALID_ARGUMENT,"Can't provide ssl option if host option is not set");this.host=Xl,this.ssl=pa}else this.host=t.host,this.ssl=t.ssl??pa;if(this.isUsingEmulator=t.emulatorOptions!==void 0,this.credentials=t.credentials,this.ignoreUndefinedProperties=!!t.ignoreUndefinedProperties,this.localCache=t.localCache,t.cacheSizeBytes===void 0)this.cacheSizeBytes=Fl;else{if(t.cacheSizeBytes!==-1&&t.cacheSizeBytes<wp)throw new N(C.INVALID_ARGUMENT,"cacheSizeBytes must be at least 1048576");this.cacheSizeBytes=t.cacheSizeBytes}df("experimentalForceLongPolling",t.experimentalForceLongPolling,"experimentalAutoDetectLongPolling",t.experimentalAutoDetectLongPolling),this.experimentalForceLongPolling=!!t.experimentalForceLongPolling,this.experimentalForceLongPolling?this.experimentalAutoDetectLongPolling=!1:t.experimentalAutoDetectLongPolling===void 0?this.experimentalAutoDetectLongPolling=!0:this.experimentalAutoDetectLongPolling=!!t.experimentalAutoDetectLongPolling,this.experimentalLongPollingOptions=Ql(t.experimentalLongPollingOptions??{}),(function(i){if(i.timeoutSeconds!==void 0){if(isNaN(i.timeoutSeconds))throw new N(C.INVALID_ARGUMENT,`invalid long polling timeout: ${i.timeoutSeconds} (must not be NaN)`);if(i.timeoutSeconds<5)throw new N(C.INVALID_ARGUMENT,`invalid long polling timeout: ${i.timeoutSeconds} (minimum allowed value is 5)`);if(i.timeoutSeconds>30)throw new N(C.INVALID_ARGUMENT,`invalid long polling timeout: ${i.timeoutSeconds} (maximum allowed value is 30)`)}})(this.experimentalLongPollingOptions),this.useFetchStreams=!!t.useFetchStreams}isEqual(t){return this.host===t.host&&this.ssl===t.ssl&&this.credentials===t.credentials&&this.cacheSizeBytes===t.cacheSizeBytes&&this.experimentalForceLongPolling===t.experimentalForceLongPolling&&this.experimentalAutoDetectLongPolling===t.experimentalAutoDetectLongPolling&&(function(i,s){return i.timeoutSeconds===s.timeoutSeconds})(this.experimentalLongPollingOptions,t.experimentalLongPollingOptions)&&this.ignoreUndefinedProperties===t.ignoreUndefinedProperties&&this.useFetchStreams===t.useFetchStreams}}class rs{constructor(t,e,i,s){this._authCredentials=t,this._appCheckCredentials=e,this._databaseId=i,this._app=s,this.type="firestore-lite",this._persistenceKey="(lite)",this._settings=new ma({}),this._settingsFrozen=!1,this._emulatorOptions={},this._terminateTask="notTerminated"}get app(){if(!this._app)throw new N(C.FAILED_PRECONDITION,"Firestore was not initialized using the Firebase SDK. 'app' is not available");return this._app}get _initialized(){return this._settingsFrozen}get _terminated(){return this._terminateTask!=="notTerminated"}_setSettings(t){if(this._settingsFrozen)throw new N(C.FAILED_PRECONDITION,"Firestore has already been started and its settings can no longer be changed. You can only modify settings before calling any other methods on a Firestore object.");this._settings=new ma(t),this._emulatorOptions=t.emulatorOptions||{},t.credentials!==void 0&&(this._authCredentials=(function(i){if(!i)return new tf;switch(i.type){case"firstParty":return new sf(i.sessionIndex||"0",i.iamToken||null,i.authTokenFactory||null);case"provider":return i.client;default:throw new N(C.INVALID_ARGUMENT,"makeAuthCredentialsProvider failed due to invalid credential type")}})(t.credentials))}_getSettings(){return this._settings}_getEmulatorOptions(){return this._emulatorOptions}_freezeSettings(){return this._settingsFrozen=!0,this._settings}_delete(){return this._terminateTask==="notTerminated"&&(this._terminateTask=this._terminate()),this._terminateTask}async _restart(){this._terminateTask==="notTerminated"?await this._terminate():this._terminateTask="notTerminated"}toJSON(){return{app:this._app,databaseId:this._databaseId,settings:this._settings}}_terminate(){return(function(e){const i=fa.get(e);i&&(M("ComponentProvider","Removing Datastore"),fa.delete(e),i.terminate())})(this),Promise.resolve()}}function bm(n,t,e,i={}){n=yr(n,rs);const s=Vr(t),o=n._getSettings(),l={...o,emulatorOptions:n._getEmulatorOptions()},u=`${t}:${e}`;s&&(au(`https://${u}`),hu("Firestore",!0)),o.host!==Xl&&o.host!==u&&Ei("Host has been set in both settings() and connectFirestoreEmulator(), emulator host will be used.");const h={...o,host:u,ssl:s,emulatorOptions:i};if(!cn(h,l)&&(n._setSettings(h),i.mockUserToken)){let f,y;if(typeof i.mockUserToken=="string")f=i.mockUserToken,y=yt.MOCK_USER;else{f=lu(i.mockUserToken,n._app?.options.projectId);const v=i.mockUserToken.sub||i.mockUserToken.user_id;if(!v)throw new N(C.INVALID_ARGUMENT,"mockUserToken must contain 'sub' or 'user_id' field!");y=new yt(v)}n._authCredentials=new ef(new ol(f,y))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ss{constructor(t,e,i){this.converter=e,this._query=i,this.type="query",this.firestore=t}withConverter(t){return new ss(this.firestore,t,this._query)}}class Et{constructor(t,e,i){this.converter=e,this._key=i,this.type="document",this.firestore=t}get _path(){return this._key.path}get id(){return this._key.path.lastSegment()}get path(){return this._key.path.canonicalString()}get parent(){return new mn(this.firestore,this.converter,this._key.path.popLast())}withConverter(t){return new Et(this.firestore,t,this._key)}toJSON(){return{type:Et._jsonSchemaVersion,referencePath:this._key.toString()}}static fromJSON(t,e,i){if(yn(e,Et._jsonSchema))return new Et(t,i||null,new x(Z.fromString(e.referencePath)))}}Et._jsonSchemaVersion="firestore/documentReference/1.0",Et._jsonSchema={type:et("string",Et._jsonSchemaVersion),referencePath:et("string")};class mn extends ss{constructor(t,e,i){super(t,e,Uf(i)),this._path=i,this.type="collection"}get id(){return this._query.path.lastSegment()}get path(){return this._query.path.canonicalString()}get parent(){const t=this._path.popLast();return t.isEmpty()?null:new Et(this.firestore,null,new x(t))}withConverter(t){return new mn(this.firestore,t,this._path)}}function Sm(n,t,...e){if(n=Re(n),arguments.length===1&&(t=Br.newId()),hf("doc","path",t),n instanceof rs){const i=Z.fromString(t,...e);return Lo(i),new Et(n,null,new x(i))}{if(!(n instanceof Et||n instanceof mn))throw new N(C.INVALID_ARGUMENT,"Expected first argument to collection() to be a CollectionReference, a DocumentReference or FirebaseFirestore");const i=n._path.child(Z.fromString(t,...e));return Lo(i),new Et(n.firestore,n instanceof mn?n.converter:null,new x(i))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ga="AsyncQueue";class ya{constructor(t=Promise.resolve()){this.Xu=[],this.ec=!1,this.tc=[],this.nc=null,this.rc=!1,this.sc=!1,this.oc=[],this.M_=new $l(this,"async_queue_retry"),this._c=()=>{const i=ar();i&&M(ga,"Visibility state changed to "+i.visibilityState),this.M_.w_()},this.ac=t;const e=ar();e&&typeof e.addEventListener=="function"&&e.addEventListener("visibilitychange",this._c)}get isShuttingDown(){return this.ec}enqueueAndForget(t){this.enqueue(t)}enqueueAndForgetEvenWhileRestricted(t){this.uc(),this.cc(t)}enterRestrictedMode(t){if(!this.ec){this.ec=!0,this.sc=t||!1;const e=ar();e&&typeof e.removeEventListener=="function"&&e.removeEventListener("visibilitychange",this._c)}}enqueue(t){if(this.uc(),this.ec)return new Promise((()=>{}));const e=new ue;return this.cc((()=>this.ec&&this.sc?Promise.resolve():(t().then(e.resolve,e.reject),e.promise))).then((()=>e.promise))}enqueueRetryable(t){this.enqueueAndForget((()=>(this.Xu.push(t),this.lc())))}async lc(){if(this.Xu.length!==0){try{await this.Xu[0](),this.Xu.shift(),this.M_.reset()}catch(t){if(!_n(t))throw t;M(ga,"Operation failed with retryable error: "+t)}this.Xu.length>0&&this.M_.p_((()=>this.lc()))}}cc(t){const e=this.ac.then((()=>(this.rc=!0,t().catch((i=>{throw this.nc=i,this.rc=!1,me("INTERNAL UNHANDLED ERROR: ",_a(i)),i})).then((i=>(this.rc=!1,i))))));return this.ac=e,e}enqueueAfterDelay(t,e,i){this.uc(),this.oc.indexOf(t)>-1&&(e=0);const s=is.createAndSchedule(this,t,e,i,(o=>this.hc(o)));return this.tc.push(s),s}uc(){this.nc&&F(47125,{Pc:_a(this.nc)})}verifyOperationInProgress(){}async Tc(){let t;do t=this.ac,await t;while(t!==this.ac)}Ic(t){for(const e of this.tc)if(e.timerId===t)return!0;return!1}Ec(t){return this.Tc().then((()=>{this.tc.sort(((e,i)=>e.targetTimeMs-i.targetTimeMs));for(const e of this.tc)if(e.skipDelay(),t!=="all"&&e.timerId===t)break;return this.Tc()}))}dc(t){this.oc.push(t)}hc(t){const e=this.tc.indexOf(t);this.tc.splice(e,1)}}function _a(n){let t=n.message||"";return n.stack&&(t=n.stack.includes(n.message)?n.stack:n.message+`
`+n.stack),t}class Jl extends rs{constructor(t,e,i,s){super(t,e,i,s),this.type="firestore",this._queue=new ya,this._persistenceKey=s?.name||"[DEFAULT]"}async _terminate(){if(this._firestoreClient){const t=this._firestoreClient.terminate();this._queue=new ya(t),this._firestoreClient=void 0,await t}}}function Cm(n,t){const e=typeof n=="object"?n:Ra(),i=typeof n=="string"?n:oi,s=gn(e,"firestore").getImmediate({identifier:i});if(!s._initialized){const o=su("firestore");o&&bm(s,...o)}return s}function Rm(n){if(n._terminated)throw new N(C.FAILED_PRECONDITION,"The client has already been terminated.");return n._firestoreClient||Vm(n),n._firestoreClient}function Vm(n){const t=n._freezeSettings(),e=(function(s,o,l,u){return new Af(s,o,l,u.host,u.ssl,u.experimentalForceLongPolling,u.experimentalAutoDetectLongPolling,Ql(u.experimentalLongPollingOptions),u.useFetchStreams,u.isUsingEmulator)})(n._databaseId,n._app?.options.appId||"",n._persistenceKey,t);n._componentsProvider||t.localCache?._offlineComponentProvider&&t.localCache?._onlineComponentProvider&&(n._componentsProvider={_offline:t.localCache._offlineComponentProvider,_online:t.localCache._onlineComponentProvider}),n._firestoreClient=new Im(n._authCredentials,n._appCheckCredentials,n._queue,e,n._componentsProvider&&(function(s){const o=s?._online.build();return{_offline:s?._offline.build(o),_online:o}})(n._componentsProvider))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Mt{constructor(t){this._byteString=t}static fromBase64String(t){try{return new Mt(xt.fromBase64String(t))}catch(e){throw new N(C.INVALID_ARGUMENT,"Failed to construct data from Base64 string: "+e)}}static fromUint8Array(t){return new Mt(xt.fromUint8Array(t))}toBase64(){return this._byteString.toBase64()}toUint8Array(){return this._byteString.toUint8Array()}toString(){return"Bytes(base64: "+this.toBase64()+")"}isEqual(t){return this._byteString.isEqual(t._byteString)}toJSON(){return{type:Mt._jsonSchemaVersion,bytes:this.toBase64()}}static fromJSON(t){if(yn(t,Mt._jsonSchema))return Mt.fromBase64String(t.bytes)}}Mt._jsonSchemaVersion="firestore/bytes/1.0",Mt._jsonSchema={type:et("string",Mt._jsonSchemaVersion),bytes:et("string")};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class os{constructor(...t){for(let e=0;e<t.length;++e)if(t[e].length===0)throw new N(C.INVALID_ARGUMENT,"Invalid field name at argument $(i + 1). Field names must not be empty.");this._internalPath=new ct(t)}isEqual(t){return this._internalPath.isEqual(t._internalPath)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Yl{constructor(t){this._methodName=t}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class $t{constructor(t,e){if(!isFinite(t)||t<-90||t>90)throw new N(C.INVALID_ARGUMENT,"Latitude must be a number between -90 and 90, but was: "+t);if(!isFinite(e)||e<-180||e>180)throw new N(C.INVALID_ARGUMENT,"Longitude must be a number between -180 and 180, but was: "+e);this._lat=t,this._long=e}get latitude(){return this._lat}get longitude(){return this._long}isEqual(t){return this._lat===t._lat&&this._long===t._long}_compareTo(t){return z(this._lat,t._lat)||z(this._long,t._long)}toJSON(){return{latitude:this._lat,longitude:this._long,type:$t._jsonSchemaVersion}}static fromJSON(t){if(yn(t,$t._jsonSchema))return new $t(t.latitude,t.longitude)}}$t._jsonSchemaVersion="firestore/geoPoint/1.0",$t._jsonSchema={type:et("string",$t._jsonSchemaVersion),latitude:et("number"),longitude:et("number")};/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class jt{constructor(t){this._values=(t||[]).map((e=>e))}toArray(){return this._values.map((t=>t))}isEqual(t){return(function(i,s){if(i.length!==s.length)return!1;for(let o=0;o<i.length;++o)if(i[o]!==s[o])return!1;return!0})(this._values,t._values)}toJSON(){return{type:jt._jsonSchemaVersion,vectorValues:this._values}}static fromJSON(t){if(yn(t,jt._jsonSchema)){if(Array.isArray(t.vectorValues)&&t.vectorValues.every((e=>typeof e=="number")))return new jt(t.vectorValues);throw new N(C.INVALID_ARGUMENT,"Expected 'vectorValues' field to be a number array")}}}jt._jsonSchemaVersion="firestore/vectorValue/1.0",jt._jsonSchema={type:et("string",jt._jsonSchemaVersion),vectorValues:et("object")};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Dm=/^__.*__$/;class Mm{constructor(t,e,i){this.data=t,this.fieldMask=e,this.fieldTransforms=i}toMutation(t,e){return this.fieldMask!==null?new Ee(t,this.data,this.fieldMask,e,this.fieldTransforms):new En(t,this.data,e,this.fieldTransforms)}}function Zl(n){switch(n){case 0:case 2:case 1:return!0;case 3:case 4:return!1;default:throw F(40011,{Ac:n})}}class as{constructor(t,e,i,s,o,l){this.settings=t,this.databaseId=e,this.serializer=i,this.ignoreUndefinedProperties=s,o===void 0&&this.Rc(),this.fieldTransforms=o||[],this.fieldMask=l||[]}get path(){return this.settings.path}get Ac(){return this.settings.Ac}Vc(t){return new as({...this.settings,...t},this.databaseId,this.serializer,this.ignoreUndefinedProperties,this.fieldTransforms,this.fieldMask)}mc(t){const e=this.path?.child(t),i=this.Vc({path:e,fc:!1});return i.gc(t),i}yc(t){const e=this.path?.child(t),i=this.Vc({path:e,fc:!1});return i.Rc(),i}wc(t){return this.Vc({path:void 0,fc:!0})}Sc(t){return mi(t,this.settings.methodName,this.settings.bc||!1,this.path,this.settings.Dc)}contains(t){return this.fieldMask.find((e=>t.isPrefixOf(e)))!==void 0||this.fieldTransforms.find((e=>t.isPrefixOf(e.field)))!==void 0}Rc(){if(this.path)for(let t=0;t<this.path.length;t++)this.gc(this.path.get(t))}gc(t){if(t.length===0)throw this.Sc("Document fields must not be empty");if(Zl(this.Ac)&&Dm.test(t))throw this.Sc('Document fields cannot begin and end with "__"')}}class Nm{constructor(t,e,i){this.databaseId=t,this.ignoreUndefinedProperties=e,this.serializer=i||wi(t)}Cc(t,e,i,s=!1){return new as({Ac:t,methodName:e,Dc:i,path:ct.emptyPath(),fc:!1,bc:s},this.databaseId,this.serializer,this.ignoreUndefinedProperties)}}function km(n){const t=n._freezeSettings(),e=wi(n._databaseId);return new Nm(n._databaseId,!!t.ignoreUndefinedProperties,e)}function Om(n,t,e,i,s,o={}){const l=n.Cc(o.merge||o.mergeFields?2:0,t,e,s);ic("Data must be an object, but it was:",l,i);const u=ec(i,l);let h,f;if(o.merge)h=new Nt(l.fieldMask),f=l.fieldTransforms;else if(o.mergeFields){const y=[];for(const v of o.mergeFields){const w=xm(t,v,e);if(!l.contains(w))throw new N(C.INVALID_ARGUMENT,`Field '${w}' is specified in your field mask but missing from your input data.`);Fm(y,w)||y.push(w)}h=new Nt(y),f=l.fieldTransforms.filter((v=>h.covers(v.field)))}else h=null,f=l.fieldTransforms;return new Mm(new Dt(u),h,f)}function tc(n,t){if(nc(n=Re(n)))return ic("Unsupported field value:",t,n),ec(n,t);if(n instanceof Yl)return(function(i,s){if(!Zl(s.Ac))throw s.Sc(`${i._methodName}() can only be used with update() and set()`);if(!s.path)throw s.Sc(`${i._methodName}() is not currently supported inside arrays`);const o=i._toFieldTransform(s);o&&s.fieldTransforms.push(o)})(n,t),null;if(n===void 0&&t.ignoreUndefinedProperties)return null;if(t.path&&t.fieldMask.push(t.path),n instanceof Array){if(t.settings.fc&&t.Ac!==4)throw t.Sc("Nested arrays are not supported");return(function(i,s){const o=[];let l=0;for(const u of i){let h=tc(u,s.wc(l));h==null&&(h={nullValue:"NULL_VALUE"}),o.push(h),l++}return{arrayValue:{values:o}}})(n,t)}return(function(i,s){if((i=Re(i))===null)return{nullValue:"NULL_VALUE"};if(typeof i=="number")return Qf(s.serializer,i);if(typeof i=="boolean")return{booleanValue:i};if(typeof i=="string")return{stringValue:i};if(i instanceof Date){const o=X.fromDate(i);return{timestampValue:wr(s.serializer,o)}}if(i instanceof X){const o=new X(i.seconds,1e3*Math.floor(i.nanoseconds/1e3));return{timestampValue:wr(s.serializer,o)}}if(i instanceof $t)return{geoPointValue:{latitude:i.latitude,longitude:i.longitude}};if(i instanceof Mt)return{bytesValue:lp(s.serializer,i._byteString)};if(i instanceof Et){const o=s.databaseId,l=i.firestore._databaseId;if(!l.isEqual(o))throw s.Sc(`Document reference is for database ${l.projectId}/${l.database} but should be for database ${o.projectId}/${o.database}`);return{referenceValue:xl(i.firestore._databaseId||s.databaseId,i._key.path)}}if(i instanceof jt)return(function(l,u){return{mapValue:{fields:{[pl]:{stringValue:ml},[_r]:{arrayValue:{values:l.toArray().map((f=>{if(typeof f!="number")throw u.Sc("VectorValues must only contain numeric values.");return Yr(u.serializer,f)}))}}}}}})(i,s);throw s.Sc(`Unsupported field value: ${$r(i)}`)})(n,t)}function ec(n,t){const e={};return cl(n)?t.path&&t.path.length>0&&t.fieldMask.push(t.path):xe(n,((i,s)=>{const o=tc(s,t.mc(i));o!=null&&(e[i]=o)})),{mapValue:{fields:e}}}function nc(n){return!(typeof n!="object"||n===null||n instanceof Array||n instanceof Date||n instanceof X||n instanceof $t||n instanceof Mt||n instanceof Et||n instanceof Yl||n instanceof jt)}function ic(n,t,e){if(!nc(e)||!al(e)){const i=$r(e);throw i==="an object"?t.Sc(n+" a custom object"):t.Sc(n+" "+i)}}function xm(n,t,e){if((t=Re(t))instanceof os)return t._internalPath;if(typeof t=="string")return rc(n,t);throw mi("Field path arguments must be of type string or ",n,!1,void 0,e)}const Lm=new RegExp("[~\\*/\\[\\]]");function rc(n,t,e){if(t.search(Lm)>=0)throw mi(`Invalid field path (${t}). Paths must not contain '~', '*', '/', '[', or ']'`,n,!1,void 0,e);try{return new os(...t.split("."))._internalPath}catch{throw mi(`Invalid field path (${t}). Paths must not be empty, begin with '.', end with '.', or contain '..'`,n,!1,void 0,e)}}function mi(n,t,e,i,s){const o=i&&!i.isEmpty(),l=s!==void 0;let u=`Function ${t}() called with invalid data`;e&&(u+=" (via `toFirestore()`)"),u+=". ";let h="";return(o||l)&&(h+=" (found",o&&(h+=` in field ${i}`),l&&(h+=` in document ${s}`),h+=")"),new N(C.INVALID_ARGUMENT,u+n+h)}function Fm(n,t){return n.some((e=>e.isEqual(t)))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class sc{constructor(t,e,i,s,o){this._firestore=t,this._userDataWriter=e,this._key=i,this._document=s,this._converter=o}get id(){return this._key.path.lastSegment()}get ref(){return new Et(this._firestore,this._converter,this._key)}exists(){return this._document!==null}data(){if(this._document){if(this._converter){const t=new Um(this._firestore,this._userDataWriter,this._key,this._document,null);return this._converter.fromFirestore(t)}return this._userDataWriter.convertValue(this._document.data.value)}}get(t){if(this._document){const e=this._document.data.field(oc("DocumentSnapshot.get",t));if(e!==null)return this._userDataWriter.convertValue(e)}}}class Um extends sc{data(){return super.data()}}function oc(n,t){return typeof t=="string"?rc(n,t):t instanceof os?t._internalPath:t._delegate._internalPath}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Bm(n,t,e){let i;return i=n?n.toFirestore(t):t,i}class Wn{constructor(t,e){this.hasPendingWrites=t,this.fromCache=e}isEqual(t){return this.hasPendingWrites===t.hasPendingWrites&&this.fromCache===t.fromCache}}class Ce extends sc{constructor(t,e,i,s,o,l){super(t,e,i,s,l),this._firestore=t,this._firestoreImpl=t,this.metadata=o}exists(){return super.exists()}data(t={}){if(this._document){if(this._converter){const e=new Zn(this._firestore,this._userDataWriter,this._key,this._document,this.metadata,null);return this._converter.fromFirestore(e,t)}return this._userDataWriter.convertValue(this._document.data.value,t.serverTimestamps)}}get(t,e={}){if(this._document){const i=this._document.data.field(oc("DocumentSnapshot.get",t));if(i!==null)return this._userDataWriter.convertValue(i,e.serverTimestamps)}}toJSON(){if(this.metadata.hasPendingWrites)throw new N(C.FAILED_PRECONDITION,"DocumentSnapshot.toJSON() attempted to serialize a document with pending writes. Await waitForPendingWrites() before invoking toJSON().");const t=this._document,e={};return e.type=Ce._jsonSchemaVersion,e.bundle="",e.bundleSource="DocumentSnapshot",e.bundleName=this._key.toString(),!t||!t.isValidDocument()||!t.isFoundDocument()?e:(this._userDataWriter.convertObjectMap(t.data.value.mapValue.fields,"previous"),e.bundle=(this._firestore,this.ref.path,"NOT SUPPORTED"),e)}}Ce._jsonSchemaVersion="firestore/documentSnapshot/1.0",Ce._jsonSchema={type:et("string",Ce._jsonSchemaVersion),bundleSource:et("string","DocumentSnapshot"),bundleName:et("string"),bundle:et("string")};class Zn extends Ce{data(t={}){return super.data(t)}}class ln{constructor(t,e,i,s){this._firestore=t,this._userDataWriter=e,this._snapshot=s,this.metadata=new Wn(s.hasPendingWrites,s.fromCache),this.query=i}get docs(){const t=[];return this.forEach((e=>t.push(e))),t}get size(){return this._snapshot.docs.size}get empty(){return this.size===0}forEach(t,e){this._snapshot.docs.forEach((i=>{t.call(e,new Zn(this._firestore,this._userDataWriter,i.key,i,new Wn(this._snapshot.mutatedKeys.has(i.key),this._snapshot.fromCache),this.query.converter))}))}docChanges(t={}){const e=!!t.includeMetadataChanges;if(e&&this._snapshot.excludesMetadataChanges)throw new N(C.INVALID_ARGUMENT,"To include metadata changes with your document changes, you must also pass { includeMetadataChanges:true } to onSnapshot().");return this._cachedChanges&&this._cachedChangesIncludeMetadataChanges===e||(this._cachedChanges=(function(s,o){if(s._snapshot.oldDocs.isEmpty()){let l=0;return s._snapshot.docChanges.map((u=>{const h=new Zn(s._firestore,s._userDataWriter,u.doc.key,u.doc,new Wn(s._snapshot.mutatedKeys.has(u.doc.key),s._snapshot.fromCache),s.query.converter);return u.doc,{type:"added",doc:h,oldIndex:-1,newIndex:l++}}))}{let l=s._snapshot.oldDocs;return s._snapshot.docChanges.filter((u=>o||u.type!==3)).map((u=>{const h=new Zn(s._firestore,s._userDataWriter,u.doc.key,u.doc,new Wn(s._snapshot.mutatedKeys.has(u.doc.key),s._snapshot.fromCache),s.query.converter);let f=-1,y=-1;return u.type!==0&&(f=l.indexOf(u.doc.key),l=l.delete(u.doc.key)),u.type!==1&&(l=l.add(u.doc),y=l.indexOf(u.doc.key)),{type:$m(u.type),doc:h,oldIndex:f,newIndex:y}}))}})(this,e),this._cachedChangesIncludeMetadataChanges=e),this._cachedChanges}toJSON(){if(this.metadata.hasPendingWrites)throw new N(C.FAILED_PRECONDITION,"QuerySnapshot.toJSON() attempted to serialize a document with pending writes. Await waitForPendingWrites() before invoking toJSON().");const t={};t.type=ln._jsonSchemaVersion,t.bundleSource="QuerySnapshot",t.bundleName=Br.newId(),this._firestore._databaseId.database,this._firestore._databaseId.projectId;const e=[],i=[],s=[];return this.docs.forEach((o=>{o._document!==null&&(e.push(o._document),i.push(this._userDataWriter.convertObjectMap(o._document.data.value.mapValue.fields,"previous")),s.push(o.ref.path))})),t.bundle=(this._firestore,this.query._query,t.bundleName,"NOT SUPPORTED"),t}}function $m(n){switch(n){case 0:return"added";case 2:case 3:return"modified";case 1:return"removed";default:return F(61501,{type:n})}}ln._jsonSchemaVersion="firestore/querySnapshot/1.0",ln._jsonSchema={type:et("string",ln._jsonSchemaVersion),bundleSource:et("string","QuerySnapshot"),bundleName:et("string"),bundle:et("string")};function jm(n,t,e){n=yr(n,Et);const i=yr(n.firestore,Jl),s=Bm(n.converter,t);return qm(i,[Om(km(i),"setDoc",n._key,s,n.converter!==null,e).toMutation(n._key,Bt.none())])}function qm(n,t){return(function(i,s){const o=new ue;return i.asyncQueue.enqueueAndForget((async()=>gm(await Pm(i),s,o))),o.promise})(Rm(n),t)}(function(t,e=!0){(function(s){Oe=s})(Ih),Jt(new qt("firestore",((i,{instanceIdentifier:s,options:o})=>{const l=i.getProvider("app").getImmediate(),u=new Jl(new nf(i.getProvider("auth-internal")),new of(l,i.getProvider("app-check-internal")),(function(f,y){if(!Object.prototype.hasOwnProperty.apply(f.options,["projectId"]))throw new N(C.INVALID_ARGUMENT,'"projectId" not provided in firebase.initializeApp.');return new ai(f.options.projectId,y)})(l,s),l);return o={useFetchStreams:e,...o},u._setSettings(o),u}),"PUBLIC").setMultipleInstances(!0)),Ot(No,ko,t),Ot(No,ko,"esm2020")})();console.log("Made By:");console.log("  //\\\\ ||\\\\  ||█████||\\\\  ||");console.log(" //--\\\\|| \\\\ ||     █| \\\\ ||");console.log("//    \\\\|  \\\\||█████||  \\\\||");let ac=()=>{Si.style.color="#a70000"},lc=()=>{Si.style.color=""},zm=()=>{let n=document.getElementById("homePage");n.className="hidden";let t=document.getElementById("game");t.className="visible",ls()},Hm=document.getElementById("PnPBttn"),cc=document.getElementById("closedBttn"),Si=document.getElementById("inDev");cc.addEventListener("mouseenter",ac);cc.addEventListener("mouseleave",lc);Si.addEventListener("mouseenter",ac);Si.addEventListener("mouseleave",lc);Hm.addEventListener("click",()=>{new Kc(!0),zm()});let Ae=null,Kn=null;function ls(){const n=document.getElementById("displaySection"),t=document.getElementById("endTurnInactive")||document.getElementById("endTurnActive");document.getElementById("game").classList.contains("hidden")||(window.innerWidth<=1090?(n.classList.add("mobile-display-grid"),t&&!Ae&&(Ae=t.parentNode,Kn=t.nextSibling,document.body.appendChild(t),t.classList.add("mobile-button"))):(n.classList.remove("mobile-display-grid"),t&&Ae&&(t.classList.remove("mobile-button"),Kn?Ae.insertBefore(t,Kn):Ae.appendChild(t),Ae=null,Kn=null)))}document.addEventListener("DOMContentLoaded",ls);window.addEventListener("resize",ls);const Gm={apiKey:"AIzaSyD5T3x1PFMTVmqES7KJsWwghQFRGZWNHPI",authDomain:"chesst-b67fa.firebaseapp.com",projectId:"chesst-b67fa",storageBucket:"chesst-b67fa.firebasestorage.app",messagingSenderId:"437851747871",appId:"1:437851747871:web:5ea9f8502ee34d0147072a",measurementId:"G-7R8Q77VSSB"},uc=Ca(Gm);Xd(uc);const Wm=Cm(uc);window.saveBoardStates=async function(n,t){try{const e=t.getSerializableState();await jm(Sm(Wm,"games",n),e),console.log(`Board states saved to Firestore with ID: ${n}`)}catch(e){console.error("Error saving board states: ",e)}};
//# sourceMappingURL=index-CgAcTEUM.js.map

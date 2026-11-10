// Craps main Data
let crapsUsername = ""

// Craps Game Settings
let startingMoney = 1000
let startingRounds = 0
const bets = {
    even: "EVEN",
    odd: "ODD"
}
// craps dice roll settings 
const minimumBet = 100
const NumOfDiceToRoll = 2
const NumHideDiceDelayms = 10000000 
const processDiceResultDelay = 1800


// html elements IDs
const crapsUsernameInput = "craps-username-input"
const crapsRegistrationPane = "craps-registration-pane"
const crapsMainSection = "craps-main-section"
const crapsStatUserName = "craps-stat-username"
const crapsStatsMoney = "craps-stat-money"
const crapsStatsRound = "craps-stat-rounds"
const crapsUserbetAmount= "craps-user-bet-amount"
const crapsRoleDiceButton = "craps-roleDice-button"
const CrapsRoleDiceAnimationContainer = "craps-role-dice-animation-container"
const crapsBettingGridContainer = "craps-betting-grid-container"
const crapsFinishRoundGridCOntainer = "craps-Round-finishGrid-container"
const crapsRoundFinishMessage = "craps-roundFinish-message"
const crapsNextRoundDisable = "craps-next-round--disable-botton"
const crapsNextRoundButton = "craps-next-round-button"

// in-game variables 
let currentMoney = startingMoney
let currentRound = startingRounds
let currentBet = bets.even
let currentbetAmount = minimumBet
let canChangeBet = true

    // HTML ELEMENTS MANUPULATION FUNCTIONS
    function showElementID (elementId) {
        document.getElementById(elementId).style.display = "block"
    }

    function hideElementID (elementId) {
        document.getElementById(elementId).style.display = "none"
    }

    function showRegistrationPane () {
        let collection = document.getElementsByClassName(crapsRegistrationPane)
        collection[0].style.display = "block"
    }
    function removeRegistrationPane () {
        let collection = document.getElementsByClassName(crapsRegistrationPane)
        collection[0].style.display = "none"
    }

    function showMainGameSection () {
       showElementID(crapsMainSection) 
    }

    function exitMainGameSection () {
        hideElementID(crapsMainSection)
    }

// GAME STARTING POINT
    
function registerCrapsPlayer () {
        crapsUsername = document.getElementById(crapsUsernameInput).value
        // validation check for the following:
        // (i) contains spaces (ii) username starts with number
        // (iii) username is lesser than 5 character
        // (iv) contains alphanumerical (a-zA-z0-9_)

        let userNameCheck = /^[0-9]|[^a-zA-z0-9_]/g
        if (crapsUsername.length < 5 || userNameCheck.test(crapsUsername)) {
            alert("username must be at least 5 characters long, alphanumeric and underscore only, no spaces, and cannot have spaces")
        } else {
             removeRegistrationPane()
             showMainGameSection()
             startupFirstRound()
        }
       
    }

    // ROUND MANAGEMENT FUNCTIONS
    function startupFirstRound () {
        document.getElementById(crapsStatUserName).innerHTML = crapsUsername
        showElementID(crapsNextRoundButton)
        hideElementID(crapsNextRoundDisable)
        setMoney(startingMoney)
        setRounds(startingRounds)
        betEven()
        startupNextRound()
    }
    function startupNextRound () {
        showElementID(crapsRoleDiceButton)
        hideElementID(CrapsRoleDiceAnimationContainer)
        showElementID(crapsBettingGridContainer)
        hideElementID(crapsFinishRoundGridCOntainer)
        canChangeBet = true
        setBetAmount(minimumBet)
        
    }

    // USER SCORE SETTINGS

    function setMoney (money) {
       currentMoney = money 
       document.getElementById(crapsStatsMoney).innerHTML = money 

    }

    function setRounds (round) {
        currentRound = round
       document.getElementById(crapsStatsRound).innerHTML = round

    }


    // MANAGE USER BET SELECTION FUCNTION
    function betEven () {
        chooseBet(bets.even)
    }

    function betOdd () {
        chooseBet(bets.odd)
    }


    function chooseBet (bet) {
        if (canChangeBet) {
          currentBet = bet
          document.getElementById(bet).style.backgroundColor = "red"
                        // tenary operator 
                        // condition ? valueiftrue : valueiffalse
          const deselect = bet == bets.even ? bets.odd : bets.even
          document.getElementById(deselect).style.backgroundColor = "transparent"
        }
        
    }


    function increaseBet () {
        setBetAmount(Math.min(currentbetAmount + minimumBet, currentMoney))
    }
    function decreaseBet () { 
        setBetAmount(Math.max(currentbetAmount - minimumBet, minimumBet))
    }

    function setBetAmount (betAmount) {
        if (canChangeBet){
           currentbetAmount = betAmount
           document.getElementById(crapsUserbetAmount).innerHTML = "$" + betAmount
        }
        
    }

    // ROLL DICE & PROCESS RESULTS
    function rollDice () { 
        canChangeBet = false
        formatDiceScale()
        showElementID(CrapsRoleDiceAnimationContainer)
        hideElementID(crapsRoleDiceButton)
        const rollDiceElement = document.getElementById(CrapsRoleDiceAnimationContainer)
        rollADie({element: rollDiceElement, numberOfDice: NumOfDiceToRoll,callback: delayedProcessDiceResult, delay: NumHideDiceDelayms})
    }
    window.addEventListener("resize", formatDiceScale)
    function formatDiceScale () {
         const vw = window.innerWidth * 0.8
         const vh = window.innerHeight * 0.8
         const widthScale = Math.min(700, vh, vw)
         const heightScale = widthScale * 0.714
         const scale = heightScale / 494.6592
         document.getElementById(CrapsRoleDiceAnimationContainer).style.transform = "scale(" + scale + ")"
    }
    

    function delayedProcessDiceResult (diceResult) {
      setTimeout(function() {processDiceResult(diceResult)}, processDiceResultDelay )
    }

    function processDiceResult (diceResult) {
        const sum = diceResult.reduce((accumulator, currnetValue) => {
            return accumulator + currnetValue
        },0)
        setRounds(currentRound + 1)

        let diceSumResult = bets.even
        if (sum % 2 === 1) {
            diceSumResult = bets.odd
        }
        let roundFinishMessage = ""
        if (diceSumResult === currentBet) {
            setMoney(currentMoney + currentbetAmount)
            roundFinishMessage = "YOU WIN!"
        } else {
            setMoney(currentMoney - currentbetAmount)
            roundFinishMessage = "YOU LOSE!"
        }

        if (currentMoney === 0) {
            roundFinishMessage = "YOU'RE OUT!"
            showElementID(crapsNextRoundDisable)
            hideElementID(crapsNextRoundButton)
        }
        showElementID(crapsFinishRoundGridCOntainer)
        hideElementID(crapsBettingGridContainer) 
        document.getElementById(crapsRoundFinishMessage).innerHTML = roundFinishMessage
    }

    // EXIT GAME 
    function exitGame () {
        alert("after " + currentRound + " round, you leave with $" + currentMoney)
     exitMainGameSection() 
     showRegistrationPane()  
     document.getElementById(crapsUsernameInput).value = ""
    }
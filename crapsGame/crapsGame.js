// Craps main Data
let crapsUsername = ""

// Craps Game Settings
let startingMoney = 1000
let startingRounds = 0

// html elements IDs
const crapsUsernameInput = "craps-username-input"
const crapsRegistrationPane = "craps-registration-pane"
const crapsMainSection = "craps-main-section"
const crapsStatUserName = "craps-stat-username"
const crapsStatsMoney = "craps-stat-money"
const crapsStatsRound = "craps-stat-rounds"


function registerCrapsPlayer () {
        crapsUsername = document.getElementById(crapsUsernameInput).value
        // validation check for the following:
        // (i) contains spaces (ii) username starts with number
        // (iii) username is lesser than 5 character
        // (iv) contains alphanumerical (a-zA-z0-9_)

        let userNameCheck = /^[0-9]|[^a-zA-z0-9_]/g
        if (crapsUsername < 5 || userNameCheck.test(crapsUsername)) {
            alert("username must be at least 5 characters long, alphanumeric and underscore only, no spaces, and cannot have spaces")
        } else {
             removeRegistrationPane()
             showMainGameSection()
             startupFirstRound()
        }
       
    }

    function removeRegistrationPane () {
        let collection = document.getElementsByClassName(crapsRegistrationPane)
        collection[0].style.display = "none"
    }

    function showMainGameSection () {
        document.getElementById(crapsMainSection).style.display = "block"
    }

    function startupFirstRound () {
        document.getElementById(crapsStatUserName).innerHTML = crapsUsername
        setMoney(startingMoney)
        setRounds(startingRounds)
    }

    function setMoney (money) {
       document.getElementById(crapsStatsMoney).innerHTML = money 

    }

    function setRounds (round) {
       document.getElementById(crapsStatsRound).innerHTML = round

    }

    
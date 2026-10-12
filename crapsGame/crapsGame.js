// html elements 
const crapsUsernameInput = "craps-username-input"
const crapsRegistrationPane = "craps-registration-pane"
const crapsMainSection = "craps-main-section"

function registerCrapsPlayer () {
        let crapsUsername = document.getElementById(crapsUsernameInput).value
        removeRegistrationPane()
        showMainGameSection()
    }

    function removeRegistrationPane () {
        let collection = document.getElementsByClassName(crapsRegistrationPane)
        collection[0].style.display = "none"
    }

    function showMainGameSection () {
        document.getElementById(crapsMainSection).style.display = "block"
    }
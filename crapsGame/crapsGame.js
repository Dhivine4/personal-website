// html elements 
const crapsUsernameInput = "craps-username-input"
const crapsRegistrationPane = "craps-registration-pane"
const crapsMainSection = "craps-main-section"

function registerCrapsPlayer () {
        let crapsUsername = document.getElementById(crapsUsernameInput).value
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
        }
       
    }

    function removeRegistrationPane () {
        let collection = document.getElementsByClassName(crapsRegistrationPane)
        collection[0].style.display = "none"
    }

    function showMainGameSection () {
        document.getElementById(crapsMainSection).style.display = "block"
    }
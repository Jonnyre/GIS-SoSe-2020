"use strict";
var HFUChat;
(function (HFUChat) {
    let loginButton = document.getElementById("login");
    loginButton.addEventListener("click", handleLogin);
    let registerButton = document.getElementById("register");
    registerButton.addEventListener("click", handleRegister);
    let logoutButton = document.getElementById("logout");
    logoutButton.addEventListener("click", handleLogout);
    if (localStorage.getItem("username"))
        hideShowLog(true, "block");
    else
        hideShowLog(false, "none");
    function hideShowLog(_showFormular, _logoutStyle) {
        let formular = document.getElementById("formular");
        formular.hidden = _showFormular;
        let logoutButton = document.getElementById("logout");
        logoutButton.style.display = _logoutStyle;
    }
    async function handleLogin() {
        let serverResponse = await HFUChat.setServerURL("/login");
        console.log(serverResponse);
        if (serverResponse) {
            localStorage.setItem("username", serverResponse);
            hideShowLog(true, "block");
            HFUChat.setChatText("1", "/receiveChatOne");
            HFUChat.setChatText("2", "/receiveChatTwo");
        }
        else
            alert("Die eingegeben Daten aus Nutzername und Passwort ist nicht korrekt");
    }
    async function handleRegister() {
        let serverResponse = await HFUChat.setServerURL("/register");
        if (serverResponse) {
            if (serverResponse == "vorhanden")
                alert("Dieser Benutzername ist bereits vorhanden");
            else {
                alert("Der Nutzer: " + serverResponse + " wurde angelegt" + "\n"
                    + "Bitte überprüfen Sie ihre Emails für die Validierung des Accounts");
                let formular = document.getElementById("form");
                formular.reset();
            }
        }
        else
            alert("Es wurden nicht alle Daten, die zum Registrieren benötigt werden, angegeben");
    }
    function handleLogout() {
        localStorage.setItem("username", "");
        hideShowLog(false, "none");
        let chat1 = document.getElementById("messagecontainer1");
        let chat2 = document.getElementById("messagecontainer2");
        chat1.innerText = "";
        chat2.innerText = "";
    }
})(HFUChat || (HFUChat = {}));
//# sourceMappingURL=login_register.js.map
"use strict";
var HFUChat;
(function (HFUChat) {
    let formData;
    //#region Listener anlegen
    let loginButton = document.getElementById("login");
    loginButton.addEventListener("click", handleLogin);
    let registerButton = document.getElementById("register");
    registerButton.addEventListener("click", handleRegister);
    let logoutButton = document.getElementById("logout");
    logoutButton.addEventListener("click", handleLogout);
    let absendenEins = document.getElementById("absenden1");
    absendenEins.addEventListener("click", handleAbsendenEins);
    let absendenZwei = document.getElementById("absenden2");
    absendenZwei.addEventListener("click", handleAbsendenZwei);
    let inputChat1 = document.getElementById("nachricht1");
    inputChat1.addEventListener("keyup", handleChat1Enter);
    let inputChat2 = document.getElementById("nachricht2");
    inputChat2.addEventListener("keyup", handleChat2Enter);
    //#endregion
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
        let serverResponse = await setServerURL("/login");
        console.log(serverResponse);
        if (serverResponse) {
            localStorage.setItem("username", serverResponse);
            hideShowLog(true, "block");
            setChatText("1", "/receiveChatOne");
            setChatText("2", "/receiveChatTwo");
        }
        else
            alert("Die eingegeben Daten aus Nutzername und Passwort ist nicht korrekt");
    }
    async function handleRegister() {
        let serverResponse = await setServerURL("/register");
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
            alert("Es wurden nicht alle Daten, die zum registrieren benötigt werden, angegeben");
    }
    async function setServerURL(_serverParam) {
        let serverURL = "https://gissosejonathan.herokuapp.com";
        // let serverURL: string = "http://localhost:8100";
        serverURL += _serverParam;
        formData = new FormData(document.forms[0]);
        // tslint:disable-next-line: no-any
        let query = new URLSearchParams(formData);
        serverURL += "?" + query.toString();
        let response = await fetch(serverURL);
        let responseString = await response.text();
        return responseString;
    }
    function handleLogout() {
        localStorage.setItem("username", "");
        hideShowLog(false, "none");
        let chat1 = document.getElementById("messagecontainer1");
        let chat2 = document.getElementById("messagecontainer2");
        chat1.innerText = "";
        chat2.innerText = "";
    }
    function handleAbsendenEins() {
        if (localStorage.getItem("username")) {
            sendMessage("nachricht1", "/nachrichtEins");
            setChatText("1", "/receiveChatOne");
        }
        else
            alert("Sie sind nicht eingeloggt");
    }
    function handleAbsendenZwei() {
        if (localStorage.getItem("username")) {
            sendMessage("nachricht2", "/nachrichtZwei");
            setChatText("2", "/receiveChatTwo");
        }
        else
            alert("Sie sind nicht eingeloggt");
    }
    async function sendMessage(_elementId, _pathname) {
        let nachricht = document.getElementById(_elementId);
        let nachrichtString = nachricht.value;
        if (nachrichtString != "") {
            nachricht.value = "";
            let serverURL = "https://gissosejonathan.herokuapp.com";
            // let serverURL: string = "http://localhost:8100";
            serverURL += _pathname;
            serverURL += "?" + "message=" + nachrichtString + "&username=" + localStorage.getItem("username");
            await fetch(serverURL);
            return;
        }
    }
    async function setChatText(_elementId, _serverParam) {
        let chat;
        if (_serverParam == "/receiveChatOne")
            chat = document.getElementById("messagecontainer1");
        else
            chat = document.getElementById("messagecontainer2");
        chat.innerHTML = "";
        let serverURL = "https://gissosejonathan.herokuapp.com";
        // let serverURL: string = "http://localhost:8100";
        serverURL += _serverParam;
        let response = await fetch(serverURL);
        let responseString = await response.json();
        let chatValue = await JSON.parse(responseString);
        let currentDate = chatValue[0].date;
        let dateDiv = document.createElement("div");
        dateDiv.innerText = currentDate;
        chat.appendChild(dateDiv);
        for (let i = 0; i < chatValue.length; i++) {
            if (currentDate != chatValue[i].date) {
                let nextDateDiv = document.createElement("div");
                nextDateDiv.innerText = chatValue[i].date;
                chat.appendChild(nextDateDiv);
                currentDate = chatValue[i].date;
            }
            let messageDiv = document.createElement("div");
            messageDiv.setAttribute("class", "messageDiv");
            let username = document.createElement("p");
            username.innerHTML = chatValue[i].username + ": ";
            let message = document.createElement("p");
            message.innerHTML = chatValue[i].message + " ";
            let time = document.createElement("p");
            time.innerHTML = chatValue[i].time;
            time.setAttribute("class", "timeDiv");
            messageDiv.appendChild(username);
            messageDiv.appendChild(message);
            messageDiv.appendChild(time);
            if (chatValue[i].username == localStorage.getItem("username"))
                messageDiv.setAttribute("style", "background-color:#98FB98");
            else
                messageDiv.setAttribute("style", "background-color:white");
            chat.appendChild(messageDiv);
        }
        chat.scrollTop = chat.scrollHeight;
    }
    function handleChat1Enter(_event) {
        if (_event.code == "Enter")
            handleAbsendenEins();
    }
    function handleChat2Enter(_event) {
        if (_event.code == "Enter")
            handleAbsendenZwei();
    }
    setInterval(handleSetChatText, 5000);
    async function handleSetChatText() {
        if (localStorage.getItem("username")) {
            setChatText("1", "/receiveChatOne");
            setChatText("2", "/receiveChatTwo");
        }
    }
})(HFUChat || (HFUChat = {}));
//# sourceMappingURL=communication.js.map
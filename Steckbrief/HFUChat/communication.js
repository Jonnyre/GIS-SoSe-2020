"use strict";
var HFUChat;
(function (HFUChat) {
    let formData;
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
    async function handleLogin() {
        let serverResponse = await setServerURL("/login");
        console.log(serverResponse);
        if (serverResponse) {
            localStorage.setItem("username", serverResponse);
            let formular = document.getElementById("formular");
            formular.hidden = true;
            setChatText("1", "/receiveChatOne");
            setChatText("2", "/receiveChatTwo");
            let logoutButton = document.getElementById("logout");
            logoutButton.setAttribute("style", "visibility: visible");
        }
        else
            alert("Die eingegeben Daten aus Nutzername und Passwort ist nicht korrekt");
    }
    async function handleRegister() {
        let serverResponse = await setServerURL("/register");
        if (serverResponse)
            alert("Der Benutzername: " + serverResponse + " ist bereits vergeben");
    }
    async function setServerURL(_serverParam) {
        let serverURL = "https://gissosejonathan.herokuapp.com";
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
        let formular = document.getElementById("formular");
        formular.hidden = false;
        let chat1 = document.getElementById("messagecontainer1");
        let chat2 = document.getElementById("messagecontainer2");
        chat1.innerText = "";
        chat2.innerText = "";
        let logoutButton = document.getElementById("logout");
        logoutButton.style.display = "none";
    }
    function handleAbsendenEins() {
        sendMessage("nachricht1", "/nachrichtEins");
        setChatText("1", "/receiveChatOne");
    }
    function handleAbsendenZwei() {
        sendMessage("nachricht2", "/nachrichtZwei");
        setChatText("2", "/receiveChatTwo");
    }
    async function sendMessage(_elementId, _pathname) {
        let nachricht = document.getElementById(_elementId);
        let nachrichtString = nachricht.value;
        if (nachrichtString != "") {
            nachricht.value = "";
            let serverURL = "https://gissosejonathan.herokuapp.com";
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
            console.log(localStorage.getItem("username"));
            setChatText("1", "/receiveChatOne");
            setChatText("2", "/receiveChatTwo");
        }
    }
})(HFUChat || (HFUChat = {}));
//# sourceMappingURL=communication.js.map
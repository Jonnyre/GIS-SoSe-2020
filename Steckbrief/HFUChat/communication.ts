namespace HFUChat {
    interface ChatValues {
        id: string;
        username: string;
        message: string;
        time: string;
        date: string;
    }

    let formData: FormData;
    let loginButton: HTMLButtonElement = <HTMLButtonElement> document.getElementById("login");
    loginButton.addEventListener("click", handleLogin);

    let registerButton: HTMLButtonElement = <HTMLButtonElement> document.getElementById("register");
    registerButton.addEventListener("click", handleRegister);

    let logoutButton: HTMLButtonElement = <HTMLButtonElement> document.getElementById("logout");
    logoutButton.addEventListener("click", handleLogout);

    let absendenEins: HTMLButtonElement = <HTMLButtonElement> document.getElementById("absenden1");
    absendenEins.addEventListener("click", handleAbsendenEins);

    let absendenZwei: HTMLButtonElement = <HTMLButtonElement> document.getElementById("absenden2");
    absendenZwei.addEventListener("click", handleAbsendenZwei);

    let inputChat1: HTMLInputElement = <HTMLInputElement> document.getElementById("nachricht1");
    inputChat1.addEventListener("keyup", handleChat1Enter);
    
    let inputChat2: HTMLInputElement = <HTMLInputElement> document.getElementById("nachricht2");
    inputChat2.addEventListener("keyup", handleChat2Enter);
    
    if (localStorage.getItem("username")) {
        let formular: HTMLDivElement =  <HTMLDivElement> document.getElementById("formular");
        formular.hidden = true;

        let logoutButton: HTMLButtonElement = <HTMLButtonElement> document.getElementById("logout");
        logoutButton.style.display = "block";
    }
    else {
        let formular: HTMLDivElement =  <HTMLDivElement> document.getElementById("formular");
        formular.hidden = false;

        let logoutButton: HTMLButtonElement = <HTMLButtonElement> document.getElementById("logout");
        logoutButton.style.display = "none";
    }

    async function handleLogin(): Promise<void> {
        let serverResponse: string = await setServerURL("/login");
        console.log(serverResponse);
        if (serverResponse) {
            localStorage.setItem("username", serverResponse);
            let formular: HTMLDivElement =  <HTMLDivElement> document.getElementById("formular");
            formular.hidden = true;

            setChatText("1", "/receiveChatOne");
            setChatText("2", "/receiveChatTwo");

            let logoutButton: HTMLButtonElement = <HTMLButtonElement> document.getElementById("logout");
            logoutButton.setAttribute("style", "visibility: visible");
        }
        else
            alert("Die eingegeben Daten aus Nutzername und Passwort ist nicht korrekt");   
    }

    async function handleRegister(): Promise<void> {
        let serverResponse: string = await setServerURL("/register");
        if (serverResponse) {
            if (serverResponse == "vorhanden")
                alert("Dieser Benutzername ist bereits vorhanden");
            else {
                alert("Der Nutzer: " + serverResponse + " wurde angelegt" + "\n"
                + "Bitte überprüfen Sie ihre Emails für die Validierung des Accounts");
                let formular: HTMLFormElement =  <HTMLFormElement> document.getElementById("form");
                formular.reset();
            }
        }
        else
            alert("Es wurden nicht alle Daten, die zum registrieren benötigt werden, angegeben");
    }

    async function setServerURL(_serverParam: string): Promise<string> {
        // let serverURL: string = "https://gissosejonathan.herokuapp.com";
        let serverURL: string = "http://localhost:8100";
        serverURL += _serverParam;

        formData = new FormData(document.forms[0]);
        // tslint:disable-next-line: no-any
        let query: URLSearchParams = new URLSearchParams(<any>formData);
        serverURL += "?" + query.toString();

        let response: Response = await fetch(serverURL);
        let responseString: string = await response.text();
        return responseString;
    }

    function handleLogout(): void {
        localStorage.setItem("username", "");
        let formular: HTMLDivElement =  <HTMLDivElement> document.getElementById("formular");
        formular.hidden = false;

        let chat1: HTMLDivElement = <HTMLDivElement> document.getElementById("messagecontainer1");
        let chat2: HTMLDivElement = <HTMLDivElement> document.getElementById("messagecontainer2");

        chat1.innerText = "";
        chat2.innerText = "";

        let logoutButton: HTMLButtonElement = <HTMLButtonElement> document.getElementById("logout");
        logoutButton.style.display = "none";
    }

    function handleAbsendenEins(): void {
        if (localStorage.getItem("nutzername")) {
            sendMessage("nachricht1", "/nachrichtEins");
            setChatText("1", "/receiveChatOne");
        }
        else 
            alert("Sie sind nicht eingeloggt");
        
    }

    function handleAbsendenZwei(): void {
        if (localStorage.getItem("nutzername")) {
            sendMessage("nachricht2", "/nachrichtZwei");
            setChatText("2", "/receiveChatTwo");
        }
        else
            alert("Sie sind nicht eingeloggt");
    }

    async function sendMessage(_elementId: string, _pathname: string): Promise<void> {
        let nachricht: HTMLInputElement =  <HTMLInputElement> document.getElementById(_elementId);
        let nachrichtString: string = nachricht.value;

        if (nachrichtString != "") {
            nachricht.value = "";
            // let serverURL: string = "https://gissosejonathan.herokuapp.com";
            let serverURL: string = "http://localhost:8100";
            serverURL += _pathname;
            serverURL += "?" + "message=" + nachrichtString + "&username=" + localStorage.getItem("username"); 
            await fetch(serverURL);
            return;
        }
    }

    async function setChatText(_elementId: string, _serverParam: string): Promise<void> {
        let chat: HTMLDivElement;
        if (_serverParam == "/receiveChatOne")
            chat = <HTMLDivElement> document.getElementById("messagecontainer1");
        else
            chat = <HTMLDivElement> document.getElementById("messagecontainer2");

        chat.innerHTML = "";
        // let serverURL: string = "https://gissosejonathan.herokuapp.com";
        let serverURL: string = "http://localhost:8100";
        serverURL += _serverParam;

        let response: Response = await fetch(serverURL);
        let responseString: string = await response.json();
        let chatValue: ChatValues[] = await JSON.parse(responseString);

        let currentDate: string = chatValue[0].date;
        let dateDiv: HTMLDivElement = document.createElement("div");
        dateDiv.innerText = currentDate;
        chat.appendChild(dateDiv);

        for (let i: number = 0; i < chatValue.length; i++) {
            if (currentDate != chatValue[i].date) {
                let nextDateDiv: HTMLDivElement = document.createElement("div");
                nextDateDiv.innerText = chatValue[i].date;
                chat.appendChild(nextDateDiv);
                currentDate = chatValue[i].date;
            }
            let messageDiv: HTMLDivElement = document.createElement("div");
            messageDiv.setAttribute("class", "messageDiv");

            let username: HTMLElement = document.createElement("p");
            username.innerHTML = chatValue[i].username + ": ";
            
            let message: HTMLElement = document.createElement("p");
            message.innerHTML = chatValue[i].message + " ";
            let time: HTMLElement = document.createElement("p");
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

    function handleChat1Enter(_event: KeyboardEvent): void {
        if (_event.code == "Enter")
            handleAbsendenEins();
    }

    function handleChat2Enter(_event: KeyboardEvent): void {
        if (_event.code == "Enter")
            handleAbsendenZwei();
    }

    setInterval(handleSetChatText, 5000);

    async function handleSetChatText(): Promise<void> {
        if (localStorage.getItem("username")) {
            console.log(localStorage.getItem("username"));
            setChatText("1", "/receiveChatOne");
            setChatText("2", "/receiveChatTwo");
        }
    }
}
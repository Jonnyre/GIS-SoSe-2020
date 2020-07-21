namespace HFUChat {
    interface ChatValues {
        id: string;
        username: string;
        message: string;
        date: string;
    }

    let formData: FormData;

    let absendenEins: HTMLButtonElement = <HTMLButtonElement> document.getElementById("absenden1");
    absendenEins.addEventListener("click", handleAbsendenEins);

    let absendenZwei: HTMLButtonElement = <HTMLButtonElement> document.getElementById("absenden2");
    absendenZwei.addEventListener("click", handleAbsendenZwei);

    let inputChat1: HTMLInputElement = <HTMLInputElement> document.getElementById("nachricht1");
    inputChat1.addEventListener("keyup", handleChat1Enter);
    
    let inputChat2: HTMLInputElement = <HTMLInputElement> document.getElementById("nachricht2");
    inputChat2.addEventListener("keyup", handleChat2Enter);

    export async function setServerURL(_serverParam: string): Promise<string> {
        let serverURL: string = getServerUrl();
        serverURL += _serverParam;

        formData = new FormData(document.forms[0]);
        // tslint:disable-next-line: no-any
        let query: URLSearchParams = new URLSearchParams(<any>formData);
        serverURL += "?" + query.toString();

        let response: Response = await fetch(serverURL);
        let responseString: string = await response.text();
        return responseString;
    }

    function handleAbsendenEins(): void {
        if (localStorage.getItem("username")) {
            sendMessage("nachricht1", "/nachrichtFlirt");
            setChatText("1", "/receiveChatOne");
        }
        else 
            alert("Sie sind nicht eingeloggt");
    }

    function handleAbsendenZwei(): void {
        if (localStorage.getItem("username")) {
            sendMessage("nachricht2", "/nachrichtSpam");
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
            let serverURL: string = getServerUrl();
            serverURL += _pathname;
            let currentDate: Date = new Date();
            serverURL += "?" + "message=" + nachrichtString + "&username=" + localStorage.getItem("username") + "&date=" + currentDate.toISOString(); 
            await fetch(serverURL);
            return;
        }
    }

    export async function setChatText(_elementId: string, _serverParam: string): Promise<void> {
        let chat: HTMLDivElement;
        if (_serverParam == "/receiveChatOne")
            chat = <HTMLDivElement> document.getElementById("messagecontainer1");
        else
            chat = <HTMLDivElement> document.getElementById("messagecontainer2");

        chat.innerHTML = "";
        let serverURL: string = getServerUrl();
        serverURL += _serverParam;

        let response: Response = await fetch(serverURL);
        let responseString: string = await response.json();
        if (responseString != "[]") {
            let chatValue: ChatValues[] = await JSON.parse(responseString);

            let currentDate: Date = new Date(chatValue[0].date);
            let currentDateString: string = currentDate.toLocaleDateString("de-DE", {weekday: "long", year: "numeric", month: "long", day: "numeric"});
            let dateDiv: HTMLDivElement = document.createElement("div");
            dateDiv.innerText = currentDateString;
            chat.appendChild(dateDiv);

            for (let i: number = 0; i < chatValue.length; i++) {
                let currentDateNew: Date = new Date(chatValue[i].date);
                let currentDateStringNew: string = currentDateNew.toLocaleDateString("de-DE", {weekday: "long", year: "numeric", month: "long", day: "numeric"});
                if (currentDateString != currentDateStringNew) {
                    let nextDateDiv: HTMLDivElement = document.createElement("div");
                    nextDateDiv.innerText = currentDateStringNew;
                    chat.appendChild(nextDateDiv);
                    currentDateString = currentDateStringNew;
                }
                let messageDiv: HTMLDivElement = document.createElement("div");
                messageDiv.setAttribute("class", "messageDiv");

                let username: HTMLElement = document.createElement("p");
                username.innerHTML = chatValue[i].username + ": ";
                
                let message: HTMLElement = document.createElement("p");
                message.innerHTML = chatValue[i].message + " ";
                let time: HTMLElement = document.createElement("p");
                let minutes: number | string = currentDateNew.getMinutes();
                if (minutes < 10)
                    minutes = "0" + currentDateNew.getMinutes();

                time.innerHTML = currentDateNew.getHours() + ":" + minutes;
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
        
    }

    function handleChat1Enter(_event: KeyboardEvent): void {
        if (_event.code == "Enter")
            handleAbsendenEins();
    }

    function handleChat2Enter(_event: KeyboardEvent): void {
        if (_event.code == "Enter")
            handleAbsendenZwei();
    }

    setInterval(handleSetChatText, 10000);

    async function handleSetChatText(): Promise<void> {
        if (localStorage.getItem("username")) {
            setChatText("1", "/receiveChatOne");
            setChatText("2", "/receiveChatTwo");
        }
    }

    function getServerUrl(): string {
        return "https://gissosejonathan.herokuapp.com";
        //return "http://localhost:8100";
    }
}
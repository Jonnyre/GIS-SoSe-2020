namespace HFUChat {
    let loginButton: HTMLButtonElement = <HTMLButtonElement> document.getElementById("login");
    loginButton.addEventListener("click", handleLogin);

    let registerButton: HTMLButtonElement = <HTMLButtonElement> document.getElementById("register");
    registerButton.addEventListener("click", handleRegister);

    let logoutButton: HTMLButtonElement = <HTMLButtonElement> document.getElementById("logout");
    logoutButton.addEventListener("click", handleLogout);

    if (localStorage.getItem("username"))
        hideShowLog(true, "block");
    else 
        hideShowLog(false, "none");

    function hideShowLog(_showFormular: boolean, _logoutStyle: string): void {
        let formular: HTMLDivElement =  <HTMLDivElement> document.getElementById("formular");
        formular.hidden = _showFormular;

        let logoutButton: HTMLButtonElement = <HTMLButtonElement> document.getElementById("logout");
        logoutButton.style.display = _logoutStyle;
    }

    async function handleLogin(): Promise<void> {
        let serverResponse: string = await setServerURL("/login");
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

    function handleLogout(): void {
        localStorage.setItem("username", "");
        hideShowLog(false, "none");

        let chat1: HTMLDivElement = <HTMLDivElement> document.getElementById("messagecontainer1");
        let chat2: HTMLDivElement = <HTMLDivElement> document.getElementById("messagecontainer2");

        chat1.innerText = "";
        chat2.innerText = "";
    }
}
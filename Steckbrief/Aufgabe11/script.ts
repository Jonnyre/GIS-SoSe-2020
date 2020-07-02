namespace Aufgabe11 {
    let formData: FormData;
    let buttonActionHtml: HTMLButtonElement = <HTMLButtonElement> document.getElementById("store");
    buttonActionHtml.addEventListener("click", handleClickStore);

    let buttonActionJson: HTMLButtonElement = <HTMLButtonElement> document.getElementById("retrieve");
    buttonActionJson.addEventListener("click", handleClickRetrieve);

    async function handleClickRetrieve(): Promise<void> {
        let serverURL: string = "https://gissosejonathan.herokuapp.com";
        serverURL += "/retrieve";

        let response: Response = await fetch(serverURL);
        console.log(response);
        let responseText: string = await response.json();
        
        let serverResponse: HTMLElement = <HTMLElement> document.getElementById("serverResponse");
        serverResponse.innerHTML = responseText;
        console.log(responseText);
    }

    async function handleClickStore(): Promise<void> {
        formData = new FormData(document.forms[0]);
        let serverURL: string = "https://gissosejonathan.herokuapp.com";
        serverURL += "/store";

        // tslint:disable-next-line: no-any
        let query: URLSearchParams = new URLSearchParams(<any>formData);
        serverURL += "?" + query.toString();

        let formular: HTMLFormElement =  <HTMLFormElement> document.getElementById("formid");
        formular.reset();

        await fetch(serverURL);
    }
}
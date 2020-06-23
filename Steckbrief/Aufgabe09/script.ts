namespace Aufgabe09 {
    let formData: FormData;
    let buttonActionHtml: HTMLButtonElement = <HTMLButtonElement> document.getElementById("performActionHtml");
    buttonActionHtml.addEventListener("click", handleClickHtml);

    let buttonActionJson: HTMLButtonElement = <HTMLButtonElement> document.getElementById("performActionJson");
    buttonActionJson.addEventListener("click", handleClickJson);

    async function handleClickHtml(): Promise<void> {
        formData = new FormData(document.forms[0]);
        let serverURL: string = "https://gissosejonathan.herokuapp.com/";
        serverURL += "/html";
        // tslint:disable-next-line: no-any
        let query: URLSearchParams = new URLSearchParams(<any>formData);
        serverURL += "?" + query.toString();

        let response: Response = await fetch(serverURL);
        let responseText: string = await response.text();
        let serverResponse: HTMLElement = <HTMLElement> document.getElementById("serverResponse");
        serverResponse.innerHTML = responseText;
    }

    async function handleClickJson(): Promise<void> {
        formData = new FormData(document.forms[0]);
        let serverURL: string = "https://gissosejonathan.herokuapp.com/";
        serverURL += "/json";
        // tslint:disable-next-line: no-any
        let query: URLSearchParams = new URLSearchParams(<any>formData);
        serverURL += "?" + query.toString();

        let response: Response = await fetch(serverURL);
        let responseText: string = await response.text();
        console.log(responseText);
    }

}
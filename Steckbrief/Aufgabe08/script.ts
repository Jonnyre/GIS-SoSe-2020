namespace Aufgabe08 {
    let formData: FormData;
    let buttonAction: HTMLButtonElement = <HTMLButtonElement> document.getElementById("performAction");
    buttonAction.addEventListener("click", handleClick);

    async function handleClick(): Promise<void> {
        formData = new FormData(document.forms[0]);
        let serverURL: string = "https://gissosejonathan.herokuapp.com/";
        // tslint:disable-next-line: no-any
        let query: URLSearchParams = new URLSearchParams(<any>formData);
        serverURL += "?" + query.toString();

        let response: Response = await fetch(serverURL);
        let responseText: string = await response.text();
        console.log(responseText);
    }

}
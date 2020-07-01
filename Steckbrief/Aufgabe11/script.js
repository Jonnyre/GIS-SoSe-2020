"use strict";
var Aufgabe11;
(function (Aufgabe11) {
    let formData;
    let buttonActionHtml = document.getElementById("store");
    buttonActionHtml.addEventListener("click", handleClickStore);
    let buttonActionJson = document.getElementById("retrieve");
    buttonActionJson.addEventListener("click", handleClickRetrieve);
    async function handleClickRetrieve() {
        let serverURL = "https://gissosejonathan.herokuapp.com";
        serverURL += "/retrieve";
        let response = await fetch(serverURL);
        let responseText = await response.json();
        let serverResponse = document.getElementById("serverResponse");
        serverResponse.innerHTML = responseText;
    }
    async function handleClickStore() {
        formData = new FormData(document.forms[0]);
        let serverURL = "https://gissosejonathan.herokuapp.com";
        serverURL += "/store";
        // tslint:disable-next-line: no-any
        let query = new URLSearchParams(formData);
        serverURL += "?" + query.toString();
        await fetch(serverURL);
    }
})(Aufgabe11 || (Aufgabe11 = {}));
//# sourceMappingURL=script.js.map
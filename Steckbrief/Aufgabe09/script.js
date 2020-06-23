"use strict";
var Aufgabe09;
(function (Aufgabe09) {
    let formData;
    let buttonActionHtml = document.getElementById("performActionHtml");
    buttonActionHtml.addEventListener("click", handleClickHtml);
    let buttonActionJson = document.getElementById("performActionJson");
    buttonActionJson.addEventListener("click", handleClickJson);
    async function handleClickHtml() {
        formData = new FormData(document.forms[0]);
        let serverURL = "https://gissosejonathan.herokuapp.com/";
        serverURL += "/html";
        // tslint:disable-next-line: no-any
        let query = new URLSearchParams(formData);
        serverURL += "?" + query.toString();
        let response = await fetch(serverURL);
        let responseText = await response.text();
        let serverResponse = document.getElementById("serverResponse");
        serverResponse.innerHTML = responseText;
    }
    async function handleClickJson() {
        formData = new FormData(document.forms[0]);
        let serverURL = "https://gissosejonathan.herokuapp.com/";
        serverURL += "/json";
        // tslint:disable-next-line: no-any
        let query = new URLSearchParams(formData);
        serverURL += "?" + query.toString();
        let response = await fetch(serverURL);
        let responseText = await response.json();
        console.log(responseText);
    }
})(Aufgabe09 || (Aufgabe09 = {}));
//# sourceMappingURL=script.js.map
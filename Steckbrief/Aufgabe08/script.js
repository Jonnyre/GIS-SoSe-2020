"use strict";
var Aufgabe08;
(function (Aufgabe08) {
    let formData;
    let buttonAction = document.getElementById("performAction");
    buttonAction.addEventListener("click", handleClick);
    async function handleClick() {
        formData = new FormData(document.forms[0]);
        let serverURL = "https://gissosejonathan.herokuapp.com/";
        serverURL += "/A8";
        // tslint:disable-next-line: no-any
        let query = new URLSearchParams(formData);
        serverURL += "?" + query.toString();
        let response = await fetch(serverURL);
        let responseText = await response.text();
        console.log(responseText);
    }
})(Aufgabe08 || (Aufgabe08 = {}));
//# sourceMappingURL=script.js.map
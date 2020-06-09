"use strict";
var Aufgabe07;
(function (Aufgabe07) {
    let warenkorbItems = Number(localStorage.getItem("AnzahlItems"));
    let divBiere = document.getElementById("Biere");
    // Alle Artikel aus LocalStorage generieren
    for (let i = 0; i < warenkorbItems; i++) {
        let divElem = document.createElement("div");
        divElem.setAttribute("class", "artikelBier");
        divElem.id = "Artikel" + i;
        divElem.setAttribute("divIdentifier", localStorage.getItem("divId" + i));
        let imgElem = document.createElement("img");
        imgElem.setAttribute("src", localStorage.getItem("img" + i));
        imgElem.setAttribute("alt", localStorage.getItem("title" + i));
        divElem.appendChild(imgElem);
        let h1Name = document.createElement("h1");
        divElem.appendChild(h1Name);
        h1Name.innerHTML = "Name:";
        let pName = document.createElement("p");
        divElem.appendChild(pName);
        pName.innerHTML = localStorage.getItem("title" + i);
        let h1Elem = document.createElement("h1");
        divElem.appendChild(h1Elem);
        h1Elem.innerHTML = "Beschreibung:";
        let pElem = document.createElement("p");
        divElem.appendChild(pElem);
        pElem.innerHTML = localStorage.getItem("beschreibung" + i);
        let h1Elem2 = document.createElement("h1");
        divElem.appendChild(h1Elem2);
        h1Elem2.innerHTML = "Preis:";
        let pElem2 = document.createElement("p");
        divElem.appendChild(pElem2);
        pElem2.setAttribute("class", "preis");
        pElem2.innerHTML = localStorage.getItem("preis" + i);
        let buttonElem = document.createElement("button");
        buttonElem.innerHTML = "Entfernen";
        buttonElem.setAttribute("identifier", "" + i);
        buttonElem.addEventListener("click", handleDelete);
        divElem.appendChild(buttonElem);
        divBiere.appendChild(divElem);
    }
    let hGesamtpreis = document.getElementById("gesamtpreis");
    hGesamtpreis.innerHTML += " " + localStorage.getItem("gesamtpreis") + "€";
    let buttonDeleteAll = document.getElementById("deleteAll");
    buttonDeleteAll.addEventListener("click", handleDeleteAll);
    // Angeklicktes Div löschen + Preis neu berechnen
    function handleDelete(_event) {
        let buttonPressed = _event.currentTarget;
        let identifier = buttonPressed.getAttribute("identifier");
        let preisAbzug = localStorage.getItem("preis" + identifier);
        preisAbzug = preisAbzug.substring(0, preisAbzug.length - 1);
        preisAbzug = preisAbzug.replace(",", ".");
        let neuGesamtpreis = Number((Number(localStorage.getItem("gesamtpreis")) - Number(preisAbzug)).toFixed(2));
        localStorage.setItem("gesamtpreis", "" + neuGesamtpreis);
        let hGesamtpreis = document.getElementById("gesamtpreis");
        hGesamtpreis.innerHTML = "Gesamtpreis: " + localStorage.getItem("gesamtpreis") + "€";
        localStorage.removeItem("img" + identifier);
        localStorage.removeItem("title" + identifier);
        localStorage.removeItem("beschreibung" + identifier);
        localStorage.removeItem("preis" + identifier);
        let divRemove = document.getElementById("Artikel" + identifier);
        divRemove.remove();
    }
    // Alle Divs löschen
    function handleDeleteAll(_event) {
        for (let i = 0; i < warenkorbItems; i++) {
            localStorage.removeItem("img" + i);
            localStorage.removeItem("title" + i);
            localStorage.removeItem("beschreibung" + i);
            localStorage.removeItem("preis" + i);
            let divRemove = document.getElementById("Artikel" + i);
            if (divRemove)
                divRemove.remove();
        }
        let hGesamtpreis = document.getElementById("gesamtpreis");
        hGesamtpreis.innerHTML = "Gesamtpreis: 0€";
    }
})(Aufgabe07 || (Aufgabe07 = {}));
//# sourceMappingURL=warenkorb.js.map
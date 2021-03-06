"use strict";
var Aufgabe06;
(function (Aufgabe06) {
    let divBiere = document.getElementById("Biere");
    let divTiere = document.getElementById("Tiere");
    for (let i = 0; i < Aufgabe06.articles.length; i++) {
        let divElem = document.createElement("div");
        if (Aufgabe06.articles[i].kategorie == "Bier") {
            divElem.setAttribute("class", "artikelBier");
            divElem.id = "Bier" + i;
            divBiere.appendChild(divElem);
        }
        else {
            divElem.setAttribute("class", "artikelTier");
            divElem.id = "Tier" + i;
            divTiere.appendChild(divElem);
        }
        let imgElem = document.createElement("img");
        imgElem.setAttribute("src", Aufgabe06.articles[i].imgsrc);
        imgElem.setAttribute("alt", Aufgabe06.articles[i].label);
        divElem.appendChild(imgElem);
        let h1Name = document.createElement("h1");
        divElem.appendChild(h1Name);
        h1Name.innerHTML = "Name:";
        let pName = document.createElement("p");
        divElem.appendChild(pName);
        pName.innerHTML = Aufgabe06.articles[i].label;
        let h1Elem = document.createElement("h1");
        divElem.appendChild(h1Elem);
        h1Elem.innerHTML = "Beschreibung:";
        let pElem = document.createElement("p");
        divElem.appendChild(pElem);
        pElem.innerHTML = Aufgabe06.articles[i].description;
        let h1Elem2 = document.createElement("h1");
        divElem.appendChild(h1Elem2);
        h1Elem2.innerHTML = "Preis:";
        let pElem2 = document.createElement("p");
        divElem.appendChild(pElem2);
        pElem2.setAttribute("class", "preis");
        pElem2.innerHTML = Aufgabe06.articles[i].price.toLocaleString("de-DE", {
            style: "currency",
            currency: "EUR"
        });
        let buttonElem = document.createElement("button");
        buttonElem.innerHTML = "In den Einkaufswagen";
        buttonElem.addEventListener("click", handleClick);
        divElem.appendChild(buttonElem);
    }
    // Ankerlistener anlegen
    let anchorListenerBier = document.getElementById("bierAnker");
    anchorListenerBier.addEventListener("click", handleClickMenuBier);
    let anchorListenerTier = document.getElementById("plüschAnker");
    anchorListenerTier.addEventListener("click", handleClickMenuTier);
    let anchorListenerBoth = document.getElementById("bothAnker");
    anchorListenerBoth.addEventListener("click", handleClickMenuBoth);
    // Suchbar listener anlegen
    let searchBar = document.getElementById("searchBar");
    searchBar.addEventListener("keyup", handleSearch);
    // Suche ausführen und Artikel ausblenden
    function handleSearch(_event) {
        let searchBar = _event.currentTarget;
        let searchValue = searchBar.value.toLowerCase();
        let divId;
        let divArticle;
        let childNodes;
        let title;
        let beschreibung;
        for (let i = 0; i < Aufgabe06.articles.length; i++) {
            if (Aufgabe06.articles[i].kategorie == "Bier") {
                divId = "Bier" + i;
                divArticle = document.getElementById(divId);
            }
            else {
                divId = "Tier" + i;
                divArticle = document.getElementById(divId);
            }
            childNodes = divArticle.childNodes;
            title = childNodes[2].textContent;
            if (title.toLowerCase().includes(searchValue))
                divArticle.hidden = false;
            else {
                beschreibung = childNodes[4].textContent;
                if (beschreibung.toLowerCase().includes(searchValue))
                    divArticle.hidden = false;
                else {
                    divArticle.hidden = true;
                }
            }
        }
    }
    let gesamtpreis = 0.0;
    // Gesamtpreis ausgeben
    function handleClick(_event) {
        let current = _event.currentTarget;
        if (current.previousSibling) {
            let child = current.previousSibling.firstChild;
            let preis = child.nodeValue;
            preis = preis.replace(",", ".");
            preis = preis.substring(0, preis.length - 1);
            if (preis) {
                gesamtpreis = Number((gesamtpreis + parseFloat(preis)).toFixed(2));
                console.log("Gesamtpreis: " + gesamtpreis + "€");
            }
            const divAnzahl = document.getElementById("divAnzahl");
            divAnzahl.setAttribute("style", "visibility: visible");
            const anzahl = document.getElementById("Anzahl");
            anzahl.innerHTML = Number(anzahl.innerHTML) + Number("1") + "";
        }
    }
    // Nur Kategorie Tier
    function handleClickMenuTier(_event) {
        hideDivs(true, "Bier", "bier");
        hideDivs(false, "Tier", "plüsch");
    }
    // Nur Kategorie Bier
    function handleClickMenuBier(_event) {
        hideDivs(false, "Bier", "bier");
        hideDivs(true, "Tier", "plüsch");
    }
    // Beide anzeigen
    function handleClickMenuBoth(_event) {
        hideDivs(false, "Bier", "bier");
        hideDivs(false, "Tier", "plüsch");
    }
    // Gewählte Artikel ausblenden
    function hideDivs(_hide, _divId, _headerId) {
        let divId;
        for (let i = 0; i < Aufgabe06.articles.length; i++) {
            if (Aufgabe06.articles[i].kategorie == _divId) {
                divId = _divId + i;
                let divArticle = document.getElementById(divId);
                divArticle.hidden = _hide;
            }
        }
        let headerElem = document.getElementById(_headerId);
        headerElem.hidden = _hide;
    }
})(Aufgabe06 || (Aufgabe06 = {}));
//# sourceMappingURL=scripts.js.map
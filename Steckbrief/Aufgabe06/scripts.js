"use strict";
var Aufgabe06;
(function (Aufgabe06) {
    let gesamtpreis = 0.0;
    let divElemAll = document.createElement("div");
    divElemAll.setAttribute("class", "alleartikel");
    let divHeader = document.createElement("div");
    divHeader.setAttribute("class", "kategorie");
    let hElemDiv = document.createElement("h1");
    hElemDiv.setAttribute("id", "bier");
    hElemDiv.innerHTML = "Dosenbier:";
    divHeader.appendChild(hElemDiv);
    divElemAll.appendChild(divHeader);
    // BierDivs anlegen
    createDivs(Aufgabe06.articleBier, "bierDivNr", "artikelBier");
    // Kategorie Header
    let divHeader2 = document.createElement("div");
    divHeader2.setAttribute("class", "kategorie");
    let hElemDiv2 = document.createElement("h1");
    hElemDiv2.setAttribute("id", "plüsch");
    hElemDiv2.innerHTML = "Plüschtiere:";
    divHeader2.appendChild(hElemDiv2);
    divElemAll.appendChild(divHeader2);
    // TierDivs anlegen
    createDivs(Aufgabe06.articleTier, "tierDivNr", "artikelTier");
    let main = document.getElementById("main");
    main.appendChild(divElemAll);
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
    // Funktion für beide Kategorien
    function createDivs(_articles, _divId, _className) {
        for (let i = 0; i < _articles.length; i++) {
            let divElem = document.createElement("div");
            divElem.setAttribute("class", _className);
            divElem.id = _divId + i;
            let imgElem = document.createElement("img");
            imgElem.setAttribute("src", _articles[i].imgsrc);
            imgElem.setAttribute("alt", _articles[i].label);
            divElem.appendChild(imgElem);
            let h1Name = document.createElement("h1");
            divElem.appendChild(h1Name);
            h1Name.innerHTML = "Name:";
            let pName = document.createElement("p");
            divElem.appendChild(pName);
            pName.innerHTML = _articles[i].label;
            let h1Elem = document.createElement("h1");
            divElem.appendChild(h1Elem);
            h1Elem.innerHTML = "Beschreibung:";
            let pElem = document.createElement("p");
            divElem.appendChild(pElem);
            pElem.innerHTML = _articles[i].description;
            let h1Elem2 = document.createElement("h1");
            divElem.appendChild(h1Elem2);
            h1Elem2.innerHTML = "Preis:";
            let pElem2 = document.createElement("p");
            divElem.appendChild(pElem2);
            pElem2.setAttribute("class", "preis");
            pElem2.innerHTML = _articles[i].price.toLocaleString("de-DE", {
                style: "currency",
                currency: "EUR"
            });
            let buttonElem = document.createElement("button");
            buttonElem.innerHTML = "In den Einkaufswagen";
            buttonElem.addEventListener("click", handleClick);
            divElem.appendChild(buttonElem);
            divElemAll.appendChild(divElem);
        }
    }
    // Suche ausführen und Artikel ausblenden
    function handleSearch(_event) {
        let searchBar = _event.currentTarget;
        // Biere ausblenden | falls keine Biere mehr da -> Kategorie ausblenden
        let headerElem = document.getElementById("bier");
        if (searchHideDivs(Aufgabe06.articleBier, "bierDivNr", searchBar) == Aufgabe06.articleBier.length)
            headerElem.hidden = true;
        else
            headerElem.hidden = false;
        // Tiere ausblenden | falls keine Tiere mehr da -> Kategorie ausblenden
        let headerElem2 = document.getElementById("plüsch");
        if (searchHideDivs(Aufgabe06.articleTier, "tierDivNr", searchBar) == Aufgabe06.articleTier.length)
            headerElem2.hidden = true;
        else
            headerElem2.hidden = false;
    }
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
        hideDivs(Aufgabe06.articleBier, true, "bierDivNr", "bier");
        hideDivs(Aufgabe06.articleTier, false, "tierDivNr", "plüsch");
    }
    // Nur Kategorie Bier
    function handleClickMenuBier(_event) {
        hideDivs(Aufgabe06.articleBier, false, "bierDivNr", "bier");
        hideDivs(Aufgabe06.articleTier, true, "tierDivNr", "plüsch");
    }
    // Beide anzeigen
    function handleClickMenuBoth(_event) {
        hideDivs(Aufgabe06.articleBier, false, "bierDivNr", "bier");
        hideDivs(Aufgabe06.articleTier, false, "tierDivNr", "plüsch");
    }
    // Gewählte Artikel ausblenden
    function hideDivs(_articles, _hide, _divId, _headerId) {
        let divId;
        for (let i = 0; i < _articles.length; i++) {
            divId = _divId + i;
            let divArticle = document.getElementById(divId);
            divArticle.hidden = _hide;
        }
        let headerElem2 = document.getElementById(_headerId);
        headerElem2.hidden = _hide;
    }
    function searchHideDivs(_articles, _divId, _searchBar) {
        let counter = 0;
        let divId;
        for (let i = 0; i < _articles.length; i++) {
            divId = _divId + i;
            if (document.getElementById(divId) != null) {
                let divElem = document.getElementById(divId);
                let childNodes = divElem.childNodes;
                let title = childNodes[2].textContent;
                if (title.toLowerCase().includes(_searchBar.value.toLowerCase()))
                    divElem.hidden = false;
                else {
                    let beschreibung = childNodes[4].textContent;
                    if (beschreibung.toLowerCase().includes(_searchBar.value.toLowerCase()))
                        divElem.hidden = false;
                    else {
                        divElem.hidden = true;
                        counter++;
                    }
                }
            }
        }
        return counter;
    }
})(Aufgabe06 || (Aufgabe06 = {}));
//# sourceMappingURL=scripts.js.map
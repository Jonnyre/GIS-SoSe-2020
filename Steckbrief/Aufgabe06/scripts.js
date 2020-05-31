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
    for (let i = 0; i < Aufgabe06.articleBier.length; i++) {
        let divElem = document.createElement("div");
        divElem.setAttribute("class", "artikelBier");
        divElem.id = "bierDivNr" + i;
        divElemAll.appendChild(divElem);
        let imgElem = document.createElement("img");
        imgElem.setAttribute("src", Aufgabe06.articleBier[i].imgsrc);
        divElem.appendChild(imgElem);
        let h1Elem = document.createElement("h1");
        divElem.appendChild(h1Elem);
        h1Elem.innerHTML = "Beschreibung:";
        let pElem = document.createElement("p");
        divElem.appendChild(pElem);
        pElem.innerHTML = Aufgabe06.articleBier[i].description;
        let h1Elem2 = document.createElement("h1");
        divElem.appendChild(h1Elem2);
        h1Elem2.innerHTML = "Preis:";
        let pElem2 = document.createElement("p");
        divElem.appendChild(pElem2);
        pElem2.setAttribute("class", "preis");
        pElem2.innerHTML = "" + Aufgabe06.articleBier[i].price;
        let buttonElem2 = document.createElement("button");
        buttonElem2.innerHTML = "In den Einkaufswagen";
        buttonElem2.addEventListener("click", handleClick);
        divElem.appendChild(buttonElem2);
    }
    let divHeader2 = document.createElement("div");
    divHeader2.setAttribute("class", "kategorie");
    let hElemDiv2 = document.createElement("h1");
    hElemDiv2.setAttribute("id", "plüsch");
    hElemDiv2.innerHTML = "Plüschtiere:";
    divHeader2.appendChild(hElemDiv2);
    divElemAll.appendChild(divHeader2);
    for (let i = 0; i < Aufgabe06.articleTier.length; i++) {
        let divElem = document.createElement("div");
        divElem.setAttribute("class", "artikelTier");
        divElem.id = "tierDivNr" + i;
        divElemAll.appendChild(divElem);
        let imgElem = document.createElement("img");
        imgElem.setAttribute("src", Aufgabe06.articleTier[i].imgsrc);
        divElem.appendChild(imgElem);
        let h1Elem = document.createElement("h1");
        divElem.appendChild(h1Elem);
        h1Elem.innerHTML = "Beschreibung:";
        let pElem = document.createElement("p");
        divElem.appendChild(pElem);
        pElem.innerHTML = Aufgabe06.articleTier[i].description;
        let h1Elem2 = document.createElement("h1");
        divElem.appendChild(h1Elem2);
        h1Elem2.innerHTML = "Preis:";
        let pElem2 = document.createElement("p");
        divElem.appendChild(pElem2);
        pElem2.setAttribute("class", "preis");
        pElem2.innerHTML = "" + Aufgabe06.articleTier[i].price;
        let buttonElem = document.createElement("button");
        buttonElem.innerHTML = "In den Einkaufswagen";
        buttonElem.addEventListener("click", handleClick);
        divElem.appendChild(buttonElem);
    }
    document.getElementById("main")?.appendChild(divElemAll);
    function handleClick(_event) {
        let current = _event.currentTarget;
        if (current.previousSibling) {
            if (current.previousSibling.firstChild?.nodeValue) {
                let preis = current.previousSibling.firstChild?.nodeValue;
                preis = preis.substring(0, preis.length - 1);
                if (preis) {
                    gesamtpreis = gesamtpreis + parseFloat(preis);
                    console.log("Gesamtpreis: " + gesamtpreis + "€");
                }
            }
        }
        const anzahl = document.getElementById("Anzahl");
        const divAnzahl = document.getElementById("divAnzahl");
        if (divAnzahl)
            divAnzahl.setAttribute("style", "visibility: visible");
        if (anzahl)
            anzahl.innerHTML = Number(anzahl.innerHTML) + Number("1") + "";
    }
    let anchorListenerBier = document.getElementById("bierAnker");
    if (anchorListenerBier)
        anchorListenerBier.addEventListener("click", handleClickMenuBier);
    let anchorListenerTier = document.getElementById("plüschAnker");
    if (anchorListenerTier)
        anchorListenerTier.addEventListener("click", handleClickMenuTier);
    let anchorListenerBoth = document.getElementById("bothAnker");
    if (anchorListenerBoth)
        anchorListenerBoth.addEventListener("click", handleClickMenuBoth);
    function handleClickMenuTier(_event) {
        let divId;
        for (let i = 0; i < Aufgabe06.articleBier.length; i++) {
            divId = "bierDivNr" + i;
            if (document.getElementById(divId) != null) {
                let divBier = document.getElementById(divId);
                divBier?.setAttribute("style", "visibility: hidden");
            }
        }
        for (let i = 0; i < Aufgabe06.articleTier.length; i++) {
            divId = "tierDivNr" + i;
            if (document.getElementById(divId) != null) {
                let divTier = document.getElementById(divId);
                divTier?.setAttribute("style", "visibility: visible");
            }
        }
    }
    function handleClickMenuBier(_event) {
        let divId;
        for (let i = 0; i < Aufgabe06.articleTier.length; i++) {
            divId = "tierDivNr" + i;
            if (document.getElementById(divId) != null) {
                let divTier = document.getElementById(divId);
                divTier?.setAttribute("style", "visibility: hidden");
            }
        }
        for (let i = 0; i < Aufgabe06.articleBier.length; i++) {
            divId = "bierDivNr" + i;
            if (document.getElementById(divId) != null) {
                let divBier = document.getElementById(divId);
                divBier?.setAttribute("style", "visibility: visible");
            }
        }
    }
    function handleClickMenuBoth(_event) {
        let divId;
        for (let i = 0; i < Aufgabe06.articleBier.length; i++) {
            divId = "bierDivNr" + i;
            if (document.getElementById(divId) != null) {
                let divBier = document.getElementById(divId);
                divBier?.setAttribute("style", "visibility: visible");
            }
        }
        for (let i = 0; i < Aufgabe06.articleTier.length; i++) {
            divId = "tierDivNr" + i;
            if (document.getElementById(divId) != null) {
                let divTier = document.getElementById(divId);
                divTier?.setAttribute("style", "visibility: visible");
            }
        }
    }
})(Aufgabe06 || (Aufgabe06 = {}));
//# sourceMappingURL=scripts.js.map
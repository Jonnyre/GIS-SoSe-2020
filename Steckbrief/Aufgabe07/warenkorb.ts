namespace Aufgabe07 {
    let warenkorbItems: number = Number(localStorage.getItem("AnzahlItems"));
    let divBiere: HTMLElement = <HTMLElement> document.getElementById("Biere");

    // Alle Artikel aus LocalStorage generieren
    for (let i: number = 0; i < warenkorbItems; i++) {
        let divElem: HTMLElement = <HTMLElement> document.createElement("div");
        divElem.setAttribute("class", "artikelBier");
        divElem.id = "Artikel" + i;
        divElem.setAttribute("divIdentifier", <string>localStorage.getItem("divId" + i));

        let imgElem: HTMLElement = document.createElement("img");
        imgElem.setAttribute("src", <string>localStorage.getItem("img" + i));
        imgElem.setAttribute("alt", <string>localStorage.getItem("title" + i));
        divElem.appendChild(imgElem);

        let h1Name: HTMLElement = document.createElement("h1");
        divElem.appendChild(h1Name);
        h1Name.innerHTML = "Name:";
    
        let pName: HTMLElement = document.createElement("p");
        divElem.appendChild(pName);
        pName.innerHTML = <string>localStorage.getItem("title" + i);

        let h1Elem: HTMLElement = document.createElement("h1");
        divElem.appendChild(h1Elem);
        h1Elem.innerHTML = "Beschreibung:";
    
        let pElem: HTMLElement = document.createElement("p");
        divElem.appendChild(pElem);
        pElem.innerHTML = <string>localStorage.getItem("beschreibung" + i);

        let h1Elem2: HTMLElement = document.createElement("h1");
        divElem.appendChild(h1Elem2);
        h1Elem2.innerHTML = "Preis:";
    
        let pElem2: HTMLElement = document.createElement("p");
        divElem.appendChild(pElem2);
        pElem2.setAttribute("class", "preis");
        pElem2.innerHTML = <string>localStorage.getItem("preis" + i);

        let buttonElem: HTMLElement = document.createElement("button");
        buttonElem.innerHTML = "Entfernen";
        buttonElem.setAttribute("identifier", "" + i);
        buttonElem.addEventListener("click", handleDelete);
        divElem.appendChild(buttonElem);

        divBiere.appendChild(divElem);
    }

    let hGesamtpreis: HTMLElement = <HTMLElement> document.getElementById("gesamtpreis");
    hGesamtpreis.innerHTML += " " + localStorage.getItem("gesamtpreis") + "€";

    let buttonDeleteAll: HTMLButtonElement =  <HTMLButtonElement>document.getElementById("deleteAll");
    buttonDeleteAll.addEventListener("click", handleDeleteAll);

    // Angeklicktes Div löschen + Preis neu berechnen
    function handleDelete(_event: Event): void {
        let buttonPressed: HTMLElement = <HTMLElement>_event.currentTarget;
        let identifier: string = <string>buttonPressed.getAttribute("identifier");
        
        let preisAbzug: string = <string>localStorage.getItem("preis" + identifier);
        preisAbzug = preisAbzug.substring(0, preisAbzug.length - 1);
        preisAbzug = preisAbzug.replace(",", ".");

        let neuGesamtpreis: number = Number((Number(localStorage.getItem("gesamtpreis")) - Number(preisAbzug)).toFixed(2));
        localStorage.setItem("gesamtpreis", "" + neuGesamtpreis);

        let hGesamtpreis: HTMLElement = <HTMLElement> document.getElementById("gesamtpreis");
        hGesamtpreis.innerHTML = "Gesamtpreis: " + localStorage.getItem("gesamtpreis") + "€";

        localStorage.removeItem("img" + identifier);
        localStorage.removeItem("title" + identifier);
        localStorage.removeItem("beschreibung" + identifier);
        localStorage.removeItem("preis" + identifier);

        let divRemove: HTMLElement = <HTMLElement> document.getElementById("Artikel" + identifier);
        divRemove.remove();
    }

    // Alle Divs löschen
    function handleDeleteAll(_event: Event): void {
        for (let i: number = 0; i < warenkorbItems; i++) {
            localStorage.removeItem("img" + i);
            localStorage.removeItem("title" + i);
            localStorage.removeItem("beschreibung" + i);
            localStorage.removeItem("preis" + i);

            let divRemove: HTMLElement = <HTMLElement> document.getElementById("Artikel" + i);
            if (divRemove)
                divRemove.remove();
        }
        let hGesamtpreis: HTMLElement = <HTMLElement> document.getElementById("gesamtpreis");
        hGesamtpreis.innerHTML = "Gesamtpreis: 0€";
    }
}
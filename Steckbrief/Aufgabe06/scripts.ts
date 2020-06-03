namespace Aufgabe06 {
    let gesamtpreis: number = 0.0;

    let divElemAll: HTMLElement = document.createElement("div");
    divElemAll.setAttribute("class", "alleartikel");

    let divHeader: HTMLElement = document.createElement("div");
    divHeader.setAttribute("class", "kategorie");
    let hElemDiv: HTMLElement = document.createElement("h1");
    hElemDiv.setAttribute("id", "bier");
    hElemDiv.innerHTML = "Dosenbier:";
    divHeader.appendChild(hElemDiv);
    divElemAll.appendChild(divHeader);

    // Divs für Biere anlegen
    for (let i: number = 0; i < articleBier.length; i++) {

        let divElem: HTMLElement = document.createElement("div");
        divElem.setAttribute("class", "artikelBier");
        divElem.id = "bierDivNr" + i; 
        divElemAll.appendChild(divElem);

        let imgElem: HTMLElement = document.createElement("img");
        imgElem.setAttribute("src", articleBier[i].imgsrc);
        imgElem.setAttribute("alt", articleBier[i].label);
        divElem.appendChild(imgElem);

        let h1Name: HTMLElement = document.createElement("h1");
        divElem.appendChild(h1Name);
        h1Name.innerHTML = "Name:";

        let pName: HTMLElement = document.createElement("p");
        divElem.appendChild(pName);
        pName.innerHTML = articleBier[i].label;

        let h1Elem: HTMLElement = document.createElement("h1");
        divElem.appendChild(h1Elem);
        h1Elem.innerHTML = "Beschreibung:";

        let pElem: HTMLElement = document.createElement("p");
        divElem.appendChild(pElem);
        pElem.innerHTML = articleBier[i].description;

        let h1Elem2: HTMLElement = document.createElement("h1");
        divElem.appendChild(h1Elem2);
        h1Elem2.innerHTML = "Preis:";

        let pElem2: HTMLElement = document.createElement("p");
        divElem.appendChild(pElem2);
        pElem2.setAttribute("class", "preis");
        pElem2.innerHTML = articleBier[i].price.toLocaleString("de-DE", {
            style: "currency",
            currency: "EUR",
            maximumFractionDigits: 2    
        });

        let buttonElem2: HTMLElement = document.createElement("button");
        buttonElem2.innerHTML = "In den Einkaufswagen";
        buttonElem2.addEventListener("click", handleClick);
        divElem.appendChild(buttonElem2);
    }

    // Kategorie Header
    let divHeader2: HTMLElement = document.createElement("div");
    divHeader2.setAttribute("class", "kategorie");
    let hElemDiv2: HTMLElement = document.createElement("h1");
    hElemDiv2.setAttribute("id", "plüsch");
    hElemDiv2.innerHTML = "Plüschtiere:";
    divHeader2.appendChild(hElemDiv2);
    divElemAll.appendChild(divHeader2);
    
    // Divs für Tiere anlegen
    for (let i: number = 0; i < articleTier.length; i++) {

        let divElem: HTMLElement = document.createElement("div");
        divElem.setAttribute("class", "artikelTier");
        divElem.id = "tierDivNr" + i; 
        divElemAll.appendChild(divElem);

        let imgElem: HTMLElement = document.createElement("img");
        imgElem.setAttribute("src", articleTier[i].imgsrc);
        imgElem.setAttribute("alt", articleTier[i].label);
        divElem.appendChild(imgElem);

        let h1Name: HTMLElement = document.createElement("h1");
        divElem.appendChild(h1Name);
        h1Name.innerHTML = "Name:";

        let pName: HTMLElement = document.createElement("p");
        divElem.appendChild(pName);
        pName.innerHTML = articleTier[i].label;

        let h1Elem: HTMLElement = document.createElement("h1");
        divElem.appendChild(h1Elem);
        h1Elem.innerHTML = "Beschreibung:";

        let pElem: HTMLElement = document.createElement("p");
        divElem.appendChild(pElem);
        pElem.innerHTML = articleTier[i].description;

        let h1Elem2: HTMLElement = document.createElement("h1");
        divElem.appendChild(h1Elem2);
        h1Elem2.innerHTML = "Preis:";

        let pElem2: HTMLElement = document.createElement("p");
        divElem.appendChild(pElem2);
        pElem2.setAttribute("class", "preis");
        pElem2.innerHTML = articleTier[i].price.toLocaleString("de-DE", {
            style: "currency",
            currency: "EUR",
            maximumFractionDigits: 2    
        });

        let buttonElem: HTMLElement = document.createElement("button");
        buttonElem.innerHTML = "In den Einkaufswagen";
        buttonElem.addEventListener("click", handleClick);
        divElem.appendChild(buttonElem);
    }

    let main: HTMLElement =  <HTMLElement>document.getElementById("main");
    main.appendChild(divElemAll);

    // Suchbar listener anlegen
    let searchBar: HTMLElement = <HTMLElement> document.getElementById("searchBar");
    searchBar.addEventListener("keyup", handleSearch);

    // Suche ausführen und Artikel ausblenden
    function handleSearch(_event: Event): void {
        let searchBar: HTMLInputElement = <HTMLInputElement> _event.currentTarget;
        let divId: string;
        let counterBier: number = 0;
        // Biere durchschauen
        for (let i: number = 0; i < articleBier.length; i++) {
            divId = "bierDivNr" + i;
            if (document.getElementById(divId) != null) {
                let divBier: HTMLElement = <HTMLElement> document.getElementById(divId);
                let childNodes: NodeListOf<ChildNode> = divBier.childNodes;
                let title: string = <string> childNodes[2].textContent;
                if (title.toLowerCase().includes(searchBar.value.toLowerCase()))
                    divBier.hidden = false;
                else {
                    let beschreibung: string = <string> childNodes[4].textContent;
                    if (beschreibung.toLowerCase().includes(searchBar.value.toLowerCase()))
                        divBier.hidden = false;
                    else {
                        divBier.hidden = true;
                        counterBier++;
                    }                  
                }              
            }
        }
        
        // falls keine Biere mehr da -> Kategorie ausblenden
        let headerElem: HTMLElement = <HTMLElement> document.getElementById("bier");
        if (counterBier == articleBier.length)
            headerElem.hidden = true;
        else
            headerElem.hidden = false;

        let counterTier: number = 0;
        // Tiere durchschauen
        for (let i: number = 0; i < articleBier.length; i++) {
            divId = "tierDivNr" + i;
            let divTier: HTMLElement = <HTMLElement> document.getElementById(divId);
            let childNodes: NodeListOf<ChildNode> = divTier.childNodes;
            let title: string = <string> childNodes[2].textContent;
            if (title.toLowerCase().includes(searchBar.value.toLowerCase()))
                divTier.hidden = false;
            else {
                let beschreibung: string = <string> childNodes[4].textContent;
                if (beschreibung.toLowerCase().includes(searchBar.value.toLowerCase()))
                    divTier.hidden = false;
                else {
                    divTier.hidden = true;
                    counterTier++;
                }      
            }
        }
        // falls keine Tiere mehr da -> Kategorie ausblenden
        let headerElem2: HTMLElement = <HTMLElement> document.getElementById("plüsch");
        if (counterTier == articleTier.length)
            headerElem2.hidden = true;
        else
            headerElem2.hidden = false;
    }

    // Gesamtpreis ausgeben
    function handleClick(_event: Event): void {
        let current: HTMLElement = <HTMLElement>_event.currentTarget;
        if (current.previousSibling) {
            let child: ChildNode = <ChildNode> current.previousSibling.firstChild;
            let preis: string = <string> child.nodeValue;
            preis = preis.replace(",", ".");
            preis = preis.substring(0, preis.length - 1);
                
            if (preis) {
                gesamtpreis = Number((gesamtpreis + parseFloat(preis)).toFixed(2));
                console.log("Gesamtpreis: " + gesamtpreis + "€");
            }       
            
            const divAnzahl: HTMLElement = <HTMLElement> document.getElementById("divAnzahl");
            divAnzahl.setAttribute("style", "visibility: visible");

            const anzahl: HTMLElement = <HTMLElement> document.getElementById("Anzahl");
            anzahl.innerHTML = Number(anzahl.innerHTML) + Number("1") + "";          
        }  
    }

    // Ankerlistener anlegen
    let anchorListenerBier: HTMLElement = <HTMLElement> document.getElementById("bierAnker");
    anchorListenerBier.addEventListener("click", handleClickMenuBier);

    let anchorListenerTier: HTMLElement = <HTMLElement> document.getElementById("plüschAnker");
    anchorListenerTier.addEventListener("click", handleClickMenuTier);

    let anchorListenerBoth: HTMLElement = <HTMLElement> document.getElementById("bothAnker");
    anchorListenerBoth.addEventListener("click", handleClickMenuBoth);

    // Nur Kategorie Tier
    function handleClickMenuTier(_event: Event): void {
        let divId: string;
        for (let i: number = 0; i < articleBier.length; i++) {
            divId = "bierDivNr" + i;
            let divBier: HTMLElement = <HTMLElement> document.getElementById(divId);
            if (divBier)
                divBier.hidden = true;             
        }

        for (let i: number = 0; i < articleTier.length; i++) {
            divId = "tierDivNr" + i;
            let divTier: HTMLElement = <HTMLElement> document.getElementById(divId);
            if (divTier)
                divTier.hidden = false;
        }

        let headerElem: HTMLElement = <HTMLElement> document.getElementById("plüsch");
        headerElem.hidden = false;
        
        let headerElem2: HTMLElement = <HTMLElement> document.getElementById("bier");
        headerElem2.hidden = true;

    }

    // Nur Kategorie Bier
    function handleClickMenuBier(_event: Event): void {
        let divId: string;
        for (let i: number = 0; i < articleTier.length; i++) {
            divId = "tierDivNr" + i;
            let divTier: HTMLElement = <HTMLElement> document.getElementById(divId);
            if (divTier)
                divTier.hidden = true;    
        }

        for (let i: number = 0; i < articleBier.length; i++) {
            divId = "bierDivNr" + i;
            let divBier: HTMLElement = <HTMLElement> document.getElementById(divId);
            divBier.hidden = false;
        }

        let headerElem: HTMLElement = <HTMLElement> document.getElementById("plüsch");
        headerElem.hidden = true;
        
        let headerElem2: HTMLElement = <HTMLElement> document.getElementById("bier");
        headerElem2.hidden = false;
    }

    // Beide anzeigen
    function handleClickMenuBoth(_event: Event): void {
        let divId: string;
        for (let i: number = 0; i < articleBier.length; i++) {
            divId = "bierDivNr" + i;
            let divBier: HTMLElement = <HTMLElement> document.getElementById(divId);
            if (divBier)
                divBier.hidden = false;    
        }

        for (let i: number = 0; i < articleTier.length; i++) {
            divId = "tierDivNr" + i;
            let divTier: HTMLElement = <HTMLElement> document.getElementById(divId);
            if (divTier)
                 divTier.hidden = false;  
        }

        let headerElem: HTMLElement = <HTMLElement> document.getElementById("plüsch");
        headerElem.hidden = false;
        
        let headerElem2: HTMLElement = <HTMLElement> document.getElementById("bier");
        headerElem2.hidden = false;
    }
}
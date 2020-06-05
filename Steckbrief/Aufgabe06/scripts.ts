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

    // BierDivs anlegen
    createDivs(articleBier, "bierDivNr", "artikelBier");

    // Kategorie Header
    let divHeader2: HTMLElement = document.createElement("div");
    divHeader2.setAttribute("class", "kategorie");
    let hElemDiv2: HTMLElement = document.createElement("h1");
    hElemDiv2.setAttribute("id", "plüsch");
    hElemDiv2.innerHTML = "Plüschtiere:";
    divHeader2.appendChild(hElemDiv2);
    divElemAll.appendChild(divHeader2);
    
    // TierDivs anlegen
    createDivs(articleTier, "tierDivNr", "artikelTier");

    let main: HTMLElement =  <HTMLElement>document.getElementById("main");
    main.appendChild(divElemAll);

    // Ankerlistener anlegen
    let anchorListenerBier: HTMLElement = <HTMLElement> document.getElementById("bierAnker");
    anchorListenerBier.addEventListener("click", handleClickMenuBier);
    
    let anchorListenerTier: HTMLElement = <HTMLElement> document.getElementById("plüschAnker");
    anchorListenerTier.addEventListener("click", handleClickMenuTier);
    
    let anchorListenerBoth: HTMLElement = <HTMLElement> document.getElementById("bothAnker");
    anchorListenerBoth.addEventListener("click", handleClickMenuBoth);
        
    // Suchbar listener anlegen
    let searchBar: HTMLElement = <HTMLElement> document.getElementById("searchBar");
    searchBar.addEventListener("keyup", handleSearch);

    // Funktion für beide Kategorien
    function createDivs(_articles: Artikel[], _divId: string, _className: string): void {    
        for (let i: number = 0; i < _articles.length; i++) {

            let divElem: HTMLElement = document.createElement("div");
            divElem.setAttribute("class", _className);
            divElem.id = _divId + i; 
    
            let imgElem: HTMLElement = document.createElement("img");
            imgElem.setAttribute("src", _articles[i].imgsrc);
            imgElem.setAttribute("alt", _articles[i].label);
            divElem.appendChild(imgElem);
    
            let h1Name: HTMLElement = document.createElement("h1");
            divElem.appendChild(h1Name);
            h1Name.innerHTML = "Name:";
    
            let pName: HTMLElement = document.createElement("p");
            divElem.appendChild(pName);
            pName.innerHTML = _articles[i].label;
    
            let h1Elem: HTMLElement = document.createElement("h1");
            divElem.appendChild(h1Elem);
            h1Elem.innerHTML = "Beschreibung:";
    
            let pElem: HTMLElement = document.createElement("p");
            divElem.appendChild(pElem);
            pElem.innerHTML = _articles[i].description;
    
            let h1Elem2: HTMLElement = document.createElement("h1");
            divElem.appendChild(h1Elem2);
            h1Elem2.innerHTML = "Preis:";
    
            let pElem2: HTMLElement = document.createElement("p");
            divElem.appendChild(pElem2);
            pElem2.setAttribute("class", "preis");
            pElem2.innerHTML = _articles[i].price.toLocaleString("de-DE", {
                style: "currency",
                currency: "EUR"
            });
    
            let buttonElem: HTMLElement = document.createElement("button");
            buttonElem.innerHTML = "In den Einkaufswagen";
            buttonElem.addEventListener("click", handleClick);
            divElem.appendChild(buttonElem);

            divElemAll.appendChild(divElem);
        }
    }

    // Suche ausführen und Artikel ausblenden
    function handleSearch(_event: Event): void {
        let searchBar: HTMLInputElement = <HTMLInputElement> _event.currentTarget;

        // Biere ausblenden | falls keine Biere mehr da -> Kategorie ausblenden
        let headerElem: HTMLElement = <HTMLElement> document.getElementById("bier");
        if (searchHideDivs(articleBier, "bierDivNr", searchBar) == articleBier.length)
            headerElem.hidden = true;
        else
            headerElem.hidden = false;

        // Tiere ausblenden | falls keine Tiere mehr da -> Kategorie ausblenden
        let headerElem2: HTMLElement = <HTMLElement> document.getElementById("plüsch");
        if (searchHideDivs(articleTier, "tierDivNr", searchBar) == articleTier.length)
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

    // Nur Kategorie Tier
    function handleClickMenuTier(_event: Event): void {
        hideDivs(articleBier, true, "bierDivNr", "bier");
        hideDivs(articleTier, false, "tierDivNr", "plüsch");
    }

    // Nur Kategorie Bier
    function handleClickMenuBier(_event: Event): void {
        hideDivs(articleBier, false, "bierDivNr", "bier");
        hideDivs(articleTier, true, "tierDivNr", "plüsch");
    }

    // Beide anzeigen
    function handleClickMenuBoth(_event: Event): void {
        hideDivs(articleBier, false, "bierDivNr", "bier");
        hideDivs(articleTier, false, "tierDivNr", "plüsch");
    }

    // Gewählte Artikel ausblenden
    function hideDivs(_articles: Artikel[], _hide: boolean, _divId: string, _headerId: string): void {
        let divId: string;      
        for (let i: number = 0; i < _articles.length; i++) {
                divId = _divId + i;
                let divArticle: HTMLElement = <HTMLElement> document.getElementById(divId);
                divArticle.hidden = _hide;
            }
        let headerElem2: HTMLElement = <HTMLElement> document.getElementById(_headerId);
        headerElem2.hidden = _hide; 
    }

    function searchHideDivs(_articles: Artikel[], _divId: string, _searchBar: HTMLInputElement): number {
        let counter: number = 0;
        let divId: string;
        for (let i: number = 0; i < _articles.length; i++) {
            divId = _divId + i;
            if (document.getElementById(divId) != null) {
                let divElem: HTMLElement = <HTMLElement> document.getElementById(divId);
                let childNodes: NodeListOf<ChildNode> = divElem.childNodes;
                let title: string = <string> childNodes[2].textContent;
                if (title.toLowerCase().includes(_searchBar.value.toLowerCase()))
                    divElem.hidden = false;
                else {
                    let beschreibung: string = <string> childNodes[4].textContent;
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
}
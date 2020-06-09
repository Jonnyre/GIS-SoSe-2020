namespace Aufgabe07 {
    let divBiere: HTMLElement = <HTMLElement> document.getElementById("Biere");
    let divTiere: HTMLElement = <HTMLElement> document.getElementById("Tiere");
    
    export function createArticles(): void {
        for (let i: number = 0; i < articles.length; i++) {
            let divElem: HTMLElement = document.createElement("div");
            if (articles[i].kategorie == "Bier") {
                divElem.setAttribute("class", "artikelBier");
                divElem.id = "Bier" + i;
                divBiere.appendChild(divElem);
            }
            else {
                divElem.setAttribute("class", "artikelTier");
                divElem.id = "Tier" + i;
                divTiere.appendChild(divElem);
            }
            
            let imgElem: HTMLElement = document.createElement("img");
            imgElem.setAttribute("src", articles[i].imgsrc);
            imgElem.setAttribute("alt", articles[i].label);
            divElem.appendChild(imgElem);
    
            let h1Name: HTMLElement = document.createElement("h1");
            divElem.appendChild(h1Name);
            h1Name.innerHTML = "Name:";
    
            let pName: HTMLElement = document.createElement("p");
            divElem.appendChild(pName);
            pName.innerHTML = articles[i].label;
    
            let h1Elem: HTMLElement = document.createElement("h1");
            divElem.appendChild(h1Elem);
            h1Elem.innerHTML = "Beschreibung:";
    
            let pElem: HTMLElement = document.createElement("p");
            divElem.appendChild(pElem);
            pElem.innerHTML = articles[i].description;
    
            let h1Elem2: HTMLElement = document.createElement("h1");
            divElem.appendChild(h1Elem2);
            h1Elem2.innerHTML = "Preis:";
    
            let pElem2: HTMLElement = document.createElement("p");
            divElem.appendChild(pElem2);
            pElem2.setAttribute("class", "preis");
            pElem2.innerHTML = articles[i].price.toLocaleString("de-DE", {
                style: "currency",
                currency: "EUR"
            });

            let buttonElem: HTMLElement = document.createElement("button");
            buttonElem.innerHTML = "In den Einkaufswagen";
            buttonElem.addEventListener("click", handleClick);
            divElem.appendChild(buttonElem);
        }
    }
    
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

    let gesamtpreis: number = 0.0;
    let itemNumber: number = 0;
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
                localStorage.setItem("Gesamtpreis", "" + gesamtpreis);
            }       
            
            const divAnzahl: HTMLElement = <HTMLElement> document.getElementById("divAnzahl");
            divAnzahl.setAttribute("style", "visibility: visible");

            const anzahl: HTMLElement = <HTMLElement> document.getElementById("Anzahl");
            anzahl.innerHTML = Number(anzahl.innerHTML) + Number("1") + "";          
        }
        
        let divParent: HTMLElement = <HTMLElement>current.parentNode;
        //localStorage.setItem("divId" + itemNumber, divParent.id);
        let childNodes: NodeListOf<ChildNode> = divParent.childNodes;
        let childNode: HTMLImageElement = <HTMLImageElement>childNodes[0];
        localStorage.setItem("img" + itemNumber, <string>childNode.src);
        localStorage.setItem("title" + itemNumber, <string>childNodes[2].textContent);
        localStorage.setItem("beschreibung" + itemNumber, <string>childNodes[4].textContent);
        localStorage.setItem("preis" + itemNumber, <string>childNodes[6].textContent);
        itemNumber++;
        localStorage.setItem("AnzahlItems", "" + itemNumber);
        localStorage.setItem("gesamtpreis", "" + gesamtpreis);
    }

    // Nur Kategorie Tier
    function handleClickMenuTier(_event: Event): void {
        hideDivs(true, "Bier", "bier");
        hideDivs(false, "Tier", "plüsch");
    }

    // Nur Kategorie Bier
    function handleClickMenuBier(_event: Event): void {
        hideDivs(false, "Bier", "bier");
        hideDivs(true, "Tier", "plüsch");
    }

    // Beide anzeigen
    function handleClickMenuBoth(_event: Event): void {
        hideDivs(false, "Bier", "bier");
        hideDivs(false, "Tier", "plüsch");
    }

    // Gewählte Artikel ausblenden
    function hideDivs(_hide: boolean, _divId: string, _headerId: string): void {
        let divId: string;      
        for (let i: number = 0; i < articles.length; i++) {
                if (articles[i].kategorie == _divId) {
                    divId = _divId + i;
                    let divArticle: HTMLElement = <HTMLElement> document.getElementById(divId);
                    divArticle.hidden = _hide;
                }
            }
        let headerElem: HTMLElement = <HTMLElement> document.getElementById(_headerId);
        headerElem.hidden = _hide; 
    }

        // Suche ausführen und Artikel ausblenden
    function handleSearch(_event: Event): void {
        let searchBar: HTMLInputElement = <HTMLInputElement> _event.currentTarget;
        let searchValue: string = <string> searchBar.value.toLowerCase();
        let divId: string;
        let divArticle: HTMLElement;
        let childNodes: NodeListOf<ChildNode>;
        let title: string;
        let beschreibung: string;
    
        for (let i: number = 0; i < articles.length; i++) {
            if (articles[i].kategorie == "Bier") {
                divId = "Bier" + i;
                divArticle = <HTMLElement> document.getElementById(divId);
            }
            else {
                divId = "Tier" + i;
                divArticle = <HTMLElement> document.getElementById(divId);
            }
    
            childNodes = divArticle.childNodes;
            title = <string> childNodes[2].textContent;
            if (title.toLowerCase().includes(searchValue))
                divArticle.hidden = false;
            else {
                beschreibung = <string> childNodes[4].textContent;
                if (beschreibung.toLowerCase().includes(searchValue))
                    divArticle.hidden = false;
                else {
                    divArticle.hidden = true;
                }                  
            }           
        }
    }
}

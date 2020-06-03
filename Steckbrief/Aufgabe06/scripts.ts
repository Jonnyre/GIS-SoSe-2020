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

    for (let i: number = 0; i < articleBier.length; i++) {

        let divElem: HTMLElement = document.createElement("div");
        divElem.setAttribute("class", "artikelBier");
        divElem.id = "bierDivNr" + i; 
        divElemAll.appendChild(divElem);

        let imgElem: HTMLElement = document.createElement("img");
        imgElem.setAttribute("src", articleBier[i].imgsrc);
        divElem.appendChild(imgElem);

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

    let divHeader2: HTMLElement = document.createElement("div");
    divHeader2.setAttribute("class", "kategorie");
    let hElemDiv2: HTMLElement = document.createElement("h1");
    hElemDiv2.setAttribute("id", "plüsch");
    hElemDiv2.innerHTML = "Plüschtiere:";
    divHeader2.appendChild(hElemDiv2);
    divElemAll.appendChild(divHeader2);
    
    for (let i: number = 0; i < articleTier.length; i++) {

        let divElem: HTMLElement = document.createElement("div");
        divElem.setAttribute("class", "artikelTier");
        divElem.id = "tierDivNr" + i; 
        divElemAll.appendChild(divElem);

        let imgElem: HTMLElement = document.createElement("img");
        imgElem.setAttribute("src", articleTier[i].imgsrc);
        divElem.appendChild(imgElem);

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

    document.getElementById("main")?.appendChild(divElemAll);

    function handleClick(_event: Event): void {
        let current: HTMLElement = <HTMLElement>_event.currentTarget;
        
        if (current.previousSibling) {
            if (current.previousSibling.firstChild?.nodeValue) {
                let preis: string = current.previousSibling.firstChild?.nodeValue;
                console.log(preis);
                preis = preis.replace(",", ".");
                preis = preis.substring(0, preis.length - 1);
                
                if (preis) {
                    gesamtpreis = Number((gesamtpreis + parseFloat(preis)).toFixed(2));
                    console.log("Gesamtpreis: " + gesamtpreis + "€");
                }       
            }
        }

        const anzahl: HTMLElement | null = document.getElementById("Anzahl");
        const divAnzahl: HTMLElement | null = document.getElementById("divAnzahl");
        if (divAnzahl)
            divAnzahl.setAttribute("style", "visibility: visible");

        if (anzahl)
            anzahl.innerHTML = Number(anzahl.innerHTML) + Number("1") + "";
                
    }

    let anchorListenerBier: HTMLElement | null = document.getElementById("bierAnker");
    if (anchorListenerBier)
        anchorListenerBier.addEventListener("click", handleClickMenuBier);

    let anchorListenerTier: HTMLElement | null = document.getElementById("plüschAnker");
    if (anchorListenerTier)
        anchorListenerTier.addEventListener("click", handleClickMenuTier);

    let anchorListenerBoth: HTMLElement | null = document.getElementById("bothAnker");
    if (anchorListenerBoth)
        anchorListenerBoth.addEventListener("click", handleClickMenuBoth);

    function handleClickMenuTier(_event: Event): void {
        let divId: string;
        for (let i: number = 0; i < articleBier.length; i++) {
            divId = "bierDivNr" + i;
            if (document.getElementById(divId) != null) {
                let divBier: HTMLElement | null =  document.getElementById(divId);
                if (divBier)
                    divBier.hidden = true;             
            }
        }

        for (let i: number = 0; i < articleTier.length; i++) {
            divId = "tierDivNr" + i;
            if (document.getElementById(divId) != null) {
                let divTier: HTMLElement | null =  document.getElementById(divId);
                if (divTier)
                    divTier.hidden = false;
            }    
        }

        let headerElem: HTMLElement | null = document.getElementById("plüsch");
        if (headerElem)
            headerElem.hidden = false;
        
        let headerElem2: HTMLElement | null = document.getElementById("bier");
        if (headerElem2)
            headerElem2.hidden = true;

    }

    function handleClickMenuBier(_event: Event): void {
        let divId: string;
        for (let i: number = 0; i < articleTier.length; i++) {
            divId = "tierDivNr" + i;
            if (document.getElementById(divId) != null) {
                let divTier: HTMLElement | null =  document.getElementById(divId);
                if (divTier)
                    divTier.hidden = true;
            }    
        }

        for (let i: number = 0; i < articleBier.length; i++) {
            divId = "bierDivNr" + i;
            if (document.getElementById(divId) != null) {
                let divBier: HTMLElement | null =  document.getElementById(divId);
                if (divBier)
                    divBier.hidden = false;
            }
        }

        let headerElem: HTMLElement | null = document.getElementById("plüsch");
        if (headerElem)
            headerElem.hidden = true;
        
        let headerElem2: HTMLElement | null = document.getElementById("bier");
        if (headerElem2)
            headerElem2.hidden = false;
    }

    function handleClickMenuBoth(_event: Event): void {
        let divId: string;
        for (let i: number = 0; i < articleBier.length; i++) {
            divId = "bierDivNr" + i;
            if (document.getElementById(divId) != null) {
                let divBier: HTMLElement | null =  document.getElementById(divId);
                if (divBier)
                    divBier.hidden = false;
            }    
        }

        for (let i: number = 0; i < articleTier.length; i++) {
            divId = "tierDivNr" + i;
            if (document.getElementById(divId) != null) {
                let divTier: HTMLElement | null =  document.getElementById(divId);
                if (divTier)
                    divTier.hidden = false;
            }    
        }

        let headerElem: HTMLElement | null = document.getElementById("plüsch");
        if (headerElem)
            headerElem.hidden = false;
        
        let headerElem2: HTMLElement | null = document.getElementById("bier");
        if (headerElem2)
            headerElem2.hidden = false;
    }
}
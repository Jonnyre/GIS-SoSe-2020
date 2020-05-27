namespace Aufgabe05 {
    
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
        divElem.setAttribute("class", "artikel");
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
        pElem2.innerHTML = articleBier[i].price;

        let buttonElem2: HTMLElement = document.createElement("button");
        buttonElem2.innerHTML = "In den Einkaufswagen";
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
        divElem.setAttribute("class", "artikel");
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
        pElem2.innerHTML = articleTier[i].price;

        let buttonElem: HTMLElement = document.createElement("button");
        buttonElem.innerHTML = "In den Einkaufswagen";
        divElem.appendChild(buttonElem);
    }

    document.getElementById("main")?.appendChild(divElemAll);
}
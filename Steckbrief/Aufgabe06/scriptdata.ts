namespace Aufgabe06 {
    export interface Artikel {
    label: string;
    description: string;
    price: number;
    imgsrc: string;
    kategorie: string;
    }

    // Biere
    const oettinger:    Artikel =  { label: "5.0",         description: "Höchste Bierqualität zum vernünftigen Preis",              price: 0.49, imgsrc: "Images/Bier/5.0.jpg",         kategorie: "Bier"};
    const turmbraeu:    Artikel =  { label: "Turmbraeu",   description: "Feinster Pilsgenuss aus besten Rohstoffen",                price: 0.29, imgsrc: "Images/Bier/Turmbräu.jpg",    kategorie: "Bier"};
    const warsteiner:   Artikel =  { label: "Warsteiner",  description: "Eine Königin unter den Bieren",                            price: 0.75, imgsrc: "Images/Bier/Warsteiner.jpg",  kategorie: "Bier"};
    const becks:        Artikel =  { label: "Becks",       description: "Machen Sie sich nicht länger ein Bier für ein Beck's vor", price: 0.99, imgsrc: "Images/Bier/Becks.jpg",       kategorie: "Bier"};
    const krombacher:   Artikel =  { label: "Krombacher",  description: "Eine Perle der Natur",                                     price: 0.79, imgsrc: "Images/Bier/Krombacher.png",  kategorie: "Bier"};
    const veltins:      Artikel =  { label: "Veltins",     description: "Fußball ist unser Bier. Frisches Veltins",                 price: 0.79, imgsrc: "Images/Bier/Veltins.jpg",     kategorie: "Bier"};
    const corona:       Artikel =  { label: "Corona",      description: "Wash your hands",                                          price: 0.75, imgsrc: "Images/Bier/Corona.jpg",      kategorie: "Bier"};
    const loewenbraeu:  Artikel =  { label: "Löwenbräu",   description: "Ein Bier wie Bayern",                                      price: 0.79, imgsrc: "Images/Bier/Löwenbräu.jpg",   kategorie: "Bier"};
    const carlsberg:    Artikel =  { label: "Carlsberg",   description: "Alleine genießen unmöglich",                               price: 0.89, imgsrc: "Images/Bier/Carlsberg.jpg",   kategorie: "Bier"};
    const krusovice:    Artikel =  { label: "Krusovice",   description: "Die königliche Brauerei Krusovice",                        price: 1.04, imgsrc: "Images/Bier/Krusovice.jpg",   kategorie: "Bier"};
    const heineken:     Artikel =  { label: "Heineken",    description: "Every bottle has its bottle",                              price: 0.99, imgsrc: "Images/Bier/Heineken.jpg",    kategorie: "Bier"};
    const kindl:        Artikel =  { label: "Kindl",       description: "So schmeckt Berlin",                                       price: 0.55, imgsrc: "Images/Bier/Kindl.jpg",       kategorie: "Bier"};
    
    // Tiere
    const giraffe:      Artikel =  { label: "Giraffe",      description: "Wenigstens hab ich ein langes Glied!",                        price: 12.99,    imgsrc: "Images/Tiere/Giraffe.jpg",        kategorie: "Tier"};
    const affe:         Artikel =  { label: "Affe",         description: "Du Lackmensch!",                                              price: 9.99,     imgsrc: "Images/Tiere/Affe.jpg",           kategorie: "Tier"};
    const loewe:        Artikel =  { label: "Löwe",         description: "Meine Mähne ist wenigstens gewollt!",                         price: 6.99,     imgsrc: "Images/Tiere/Löwe.jpg",           kategorie: "Tier" };
    const flamingo:     Artikel =  { label: "Flamingo",     description: "Ich sehe nach 5min in der Sonne nicht wie ein Hummer aus!",   price: 19.99,    imgsrc: "Images/Tiere/Flamingo.jpg",       kategorie: "Tier" };
    const fuchs:        Artikel =  { label: "Fuchs",        description: "Abay-ba-da bum-bum bay-do",                                   price: 4.99,     imgsrc: "Images/Tiere/Fuchs.jpg",          kategorie: "Tier" };
    const schildkroete: Artikel =  { label: "Schildkröte",  description: "Selbst ich würde gegen dich einen Sprint gewinnen!",          price: 17.99,    imgsrc: "Images/Tiere/Schildkröte.jpg",    kategorie: "Tier" };
    const pferd:        Artikel =  { label: "Pferd",        description: "Meine Fresse beschreibt deine Fresse!",                       price: 8.99,     imgsrc: "Images/Tiere/Pferd.jpg",          kategorie: "Tier" };
    const eule:         Artikel =  { label: "Eule",         description: "Ich bin nachts nicht nur wach sondern auch produktiv!",       price: 7.99,     imgsrc: "Images/Tiere/Eule.jpg",           kategorie: "Tier" };
    const wal:          Artikel =  { label: "Wal",          description: "Auf der Waage siehst du deine Handynummer!",                  price: 23.99,    imgsrc: "Images/Tiere/Wal.jpg",            kategorie: "Tier" };
    const faultier:     Artikel =  { label: "Faultier",     description: "Ich verwende wenigstens 12 Tags pro Html Seite!",             price: 11.99,    imgsrc: "Images/Tiere/Faultier.jpg",       kategorie: "Tier" };
    const elefant:      Artikel =  { label: "Elefant",      description: "Ich habe eine Verwendung für meinen Rüssel!",                 price: 24.99,    imgsrc: "Images/Tiere/Elefant.jpg",        kategorie: "Tier" };
    const papagei:      Artikel =  { label: "Papagei",      description: "Ich klinge beim Singen nicht wie eine sterbende Giraffe!",    price: 15.99,    imgsrc: "Images/Tiere/Papagei.jpg",        kategorie: "Tier" };

    export let articles: Artikel[] = [oettinger, turmbraeu, warsteiner, becks, krombacher, veltins, corona, loewenbraeu, carlsberg, krusovice, heineken, kindl, giraffe, affe, loewe, flamingo, fuchs, schildkroete, pferd, eule, wal, faultier, elefant, papagei];
    }

    
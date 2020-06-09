namespace Aufgabe07 {
    export interface Artikel {
    label: string;
    description: string;
    price: number;
    imgsrc: string;
    kategorie: string;
    }

    export let articles: Artikel[];
    loadArticles("data.json");

    async function loadArticles(_url: RequestInfo): Promise<void> {
        let response: Response = await fetch(_url);
        let jsonArray: JSON = await response.json();
        articles = await JSON.parse(JSON.stringify(jsonArray));
        createArticles();
        /*for (let i: number = 0; i < articles.length; i++) {
            console.log(articles[i]);
        }*/
    }
}  
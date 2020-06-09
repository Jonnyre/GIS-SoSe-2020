"use strict";
var Aufgabe07;
(function (Aufgabe07) {
    loadArticles("data.json");
    async function loadArticles(_url) {
        let response = await fetch(_url);
        let jsonArray = await response.json();
        Aufgabe07.articles = await JSON.parse(JSON.stringify(jsonArray));
        Aufgabe07.createArticles();
        /*for (let i: number = 0; i < articles.length; i++) {
            console.log(articles[i]);
        }*/
    }
})(Aufgabe07 || (Aufgabe07 = {}));
//# sourceMappingURL=scriptdata.js.map
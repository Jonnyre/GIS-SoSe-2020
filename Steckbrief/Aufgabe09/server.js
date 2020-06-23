"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Aufgabe09 = void 0;
const Http = require("http");
const Url = require("url");
var Aufgabe09;
(function (Aufgabe09) {
    console.log("Starting server");
    let port = Number(process.env.PORT);
    if (!port)
        port = 8100;
    let server = Http.createServer();
    server.addListener("request", handleRequest);
    server.addListener("listening", handleListen);
    server.listen(port);
    function handleListen() {
        console.log("Listening");
    }
    function handleRequest(_request, _response) {
        _response.setHeader("Access-Control-Allow-Origin", "*");
        _response.setHeader("content-type", "text/html; charset=utf-8");
        if (_request.url) {
            let url = Url.parse(_request.url, true);
            let path = url.pathname;
            if (path == "//html") {
                for (let key in url.query) {
                    _response.write(key + ": " + url.query[key] + "<br/>");
                }
            }
            else if (path == "//json") {
                let jsonString = JSON.stringify(url.query);
                _response.write(jsonString);
            }
            else if (path == "//A8") {
                _response.write(_request.url);
            }
        }
        _response.end();
    }
})(Aufgabe09 = exports.Aufgabe09 || (exports.Aufgabe09 = {}));
//# sourceMappingURL=server.js.map
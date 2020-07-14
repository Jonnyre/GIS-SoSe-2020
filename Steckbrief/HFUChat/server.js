"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HFUChat = void 0;
const Http = require("http");
const Url = require("url");
const Mongo = require("mongodb");
var HFUChat;
(function (HFUChat) {
    let formularData;
    let mongoClient;
    let databaseUrl;
    let myArgs = process.argv.slice(2);
    if (myArgs[0] == "local")
        databaseUrl = "mongodb://localhost:27017";
    else // Wenn nicht lokal dann immer remote
        databaseUrl = "mongodb+srv://Testuse:2CRniQTCg8CiqCKz@gis-sose-2020-jori-pijp3.mongodb.net/HFUChat?retryWrites=true&w=majority";
    connectToDatabase(databaseUrl);
    let port = Number(process.env.PORT);
    if (!port)
        port = 8100;
    let server = Http.createServer();
    server.addListener("request", handleRequest);
    server.listen(port);
    async function connectToDatabase(_url) {
        let options = { useNewUrlParser: true, useUnifiedTopology: true };
        mongoClient = new Mongo.MongoClient(_url, options);
        await mongoClient.connect();
    }
    async function handleRequest(_request, _response) {
        _response.setHeader("Access-Control-Allow-Origin", "*");
        _response.setHeader("content-type", "text/html; charset=utf-8");
        if (_request.url) {
            let url = Url.parse(_request.url, true);
            let path = url.pathname;
            let resultString = "";
            switch (path) {
                case "/register":
                    if (url.query.username == "" || url.query.password == "") {
                        _response.write("");
                        _response.end();
                    }
                    else {
                        formularData = mongoClient.db("HFUChat").collection("LoginData");
                        let loginResponse = await formularData.findOne({ username: url.query.username });
                        if (loginResponse) {
                            _response.write("vorhanden");
                            _response.end();
                        }
                        else {
                            formularData.insertOne(url.query);
                            _response.write(url.query.username);
                            _response.end();
                        }
                    }
                    break;
                case "/login":
                    formularData = mongoClient.db("HFUChat").collection("LoginData");
                    let loginResponse = await formularData.findOne({ username: url.query.username, password: url.query.password });
                    if (loginResponse) {
                        _response.write(url.query.username);
                        _response.end();
                    }
                    else {
                        _response.write("");
                        _response.end();
                    }
                    break;
                case "/nachrichtEins":
                    formularData = mongoClient.db("HFUChat").collection("NachrichtEins");
                    insertMessage(url.query.username, url.query.message);
                    _response.end();
                    break;
                case "/nachrichtZwei":
                    formularData = mongoClient.db("HFUChat").collection("NachrichtZwei");
                    insertMessage(url.query.username, url.query.message);
                    _response.end();
                    break;
                case "/receiveChatOne":
                    formularData = mongoClient.db("HFUChat").collection("NachrichtEins");
                    resultString = "";
                    formularData.find({}).toArray(function (err, result) {
                        if (err)
                            throw err;
                        resultString += "[";
                        for (let i = 0; i < result.length; i++) {
                            resultString += JSON.stringify(result[i]);
                            if (i < result.length - 1)
                                resultString += ",";
                        }
                        resultString += "]";
                        _response.write(JSON.stringify(resultString));
                        _response.end();
                    });
                    break;
                case "/receiveChatTwo":
                    formularData = mongoClient.db("HFUChat").collection("NachrichtZwei");
                    resultString = "";
                    formularData.find({}).toArray(function (err, result) {
                        if (err)
                            throw err;
                        resultString += "[";
                        for (let i = 0; i < result.length; i++) {
                            resultString += JSON.stringify(result[i]);
                            if (i < result.length - 1)
                                resultString += ",";
                        }
                        resultString += "]";
                        _response.write(JSON.stringify(resultString));
                        _response.end();
                    });
                    break;
                default:
                    _response.end();
            }
        }
    }
    function insertMessage(_username, _message) {
        let current = new Date();
        let minutes = current.getMinutes();
        if (minutes < 10)
            minutes = "0" + current.getMinutes();
        console.log(current);
        let currentTime = current.getHours() + ":" + minutes;
        let currentDate = current.toLocaleDateString("de-DE", { weekday: "long", year: "numeric", month: "long", day: "numeric" });
        formularData.insertOne({ username: _username, message: _message, time: currentTime, date: currentDate });
    }
})(HFUChat = exports.HFUChat || (exports.HFUChat = {}));
//# sourceMappingURL=server.js.map
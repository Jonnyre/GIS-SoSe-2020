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
    console.log("gestartet");
    async function connectToDatabase(_url) {
        let options = { useNewUrlParser: true, useUnifiedTopology: true };
        mongoClient = new Mongo.MongoClient(_url, options);
        await mongoClient.connect();
    }
    function handleRequest(_request, _response) {
        _response.setHeader("Access-Control-Allow-Origin", "*");
        _response.setHeader("content-type", "text/html; charset=utf-8");
        console.log("anfrage");
        if (_request.url) {
            let url = Url.parse(_request.url, true);
            let path = url.pathname;
            if (path == "/register") {
                console.log(url.query);
                formularData = mongoClient.db("HFUChat").collection("LoginData");
                formularData.insertOne(url.query);
                console.log("inserted");
            }
            else if (path == "/login") {
                let usernameReq = url.query.username;
                //usernameReq = usernameReq.toLowerCase();
                let passwordReq = url.query.password;
                //passwordReq = passwordReq.toLowerCase();
                formularData = mongoClient.db("HFUChat").collection("LoginData");
                console.log(url.query.username + " " + url.query.password);
                if (formularData.findOne({ username: usernameReq, password: passwordReq }))
                    _response.write(usernameReq);
                _response.end();
            }
            else if (path == "/nachrichtEins") {
                formularData = mongoClient.db("HFUChat").collection("NachrichtEins");
                insertMessage(url.query.username, url.query.message);
            }
            else if (path == "/nachrichtZwei") {
                formularData = mongoClient.db("HFUChat").collection("NachrichtZwei");
                insertMessage(url.query.username, url.query.message);
            }
            else if (path == "/receiveChatOne") {
                formularData = mongoClient.db("HFUChat").collection("NachrichtEins");
                let resultString = "";
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
                    console.log(resultString);
                    _response.write(JSON.stringify(resultString));
                    _response.end();
                });
            }
            else if (path == "/receiveChatTwo") {
                formularData = mongoClient.db("HFUChat").collection("NachrichtZwei");
                let resultString = "";
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
                    console.log(resultString);
                    _response.write(JSON.stringify(resultString));
                    _response.end();
                });
            }
        }
    }
    function insertMessage(_username, _message) {
        let current = new Date();
        let minutes = current.getMinutes();
        if (minutes < 10)
            minutes = "0" + current.getMinutes();
        let currentTime = current.getHours() + ":" + current.getMinutes();
        let currentDate = current.toLocaleDateString("de-DE", { weekday: "long", year: "numeric", month: "long", day: "numeric" });
        formularData.insertOne({ username: _username, message: _message, time: currentTime, date: currentDate });
    }
})(HFUChat = exports.HFUChat || (exports.HFUChat = {}));
//# sourceMappingURL=server.js.map
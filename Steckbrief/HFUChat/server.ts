import * as Http from "http";
import * as Url from "url";
import * as Mongo from "mongodb";

export namespace HFUChat {
  let formularData: Mongo.Collection;
  let mongoClient: Mongo.MongoClient;
  let databaseUrl: string;

  let myArgs: string[] = process.argv.slice(2);
  if (myArgs[0] == "local")
    databaseUrl = "mongodb://localhost:27017";
  else // Wenn nicht lokal dann immer remote
    databaseUrl = "mongodb+srv://Testuse:2CRniQTCg8CiqCKz@gis-sose-2020-jori-pijp3.mongodb.net/HFUChat?retryWrites=true&w=majority";

  connectToDatabase(databaseUrl);

  let port: number = Number(process.env.PORT);
  if (!port)
    port = 8100;

  let server: Http.Server = Http.createServer();
  server.addListener("request", handleRequest);
  server.listen(port);
  console.log("gestartet");

  async function connectToDatabase(_url: string): Promise<void> {
    let options: Mongo.MongoClientOptions = {useNewUrlParser: true, useUnifiedTopology: true};
    mongoClient = new Mongo.MongoClient(_url, options);
    await mongoClient.connect();
  } 

  async function handleRequest(_request: Http.IncomingMessage, _response: Http.ServerResponse): Promise<void> {

    _response.setHeader("Access-Control-Allow-Origin", "*");
    _response.setHeader("content-type", "text/html; charset=utf-8");

    console.log("anfrage");
    if (_request.url) {
      let url: Url.UrlWithParsedQuery = Url.parse(_request.url, true);
      let path: string | null = url.pathname;

      if (path == "/register") {
        console.log(url.query);
        formularData = mongoClient.db("HFUChat").collection("LoginData");
        let loginResponse: Mongo.Cursor | null = await formularData.findOne({username: url.query.username});
        if (loginResponse) {
          _response.write(url.query.username);
          _response.end();
        }
        else {
          formularData.insertOne(url.query);
          _response.write("");
          _response.end();
        }
      }

      else if (path == "/login") {
          formularData = mongoClient.db("HFUChat").collection("LoginData");
          let loginResponse: Mongo.Cursor | null = await formularData.findOne({username: url.query.username, password: url.query.password});
          if (loginResponse) {
            _response.write(url.query.username);
            _response.end();
          }
          else {
            _response.write("");
            _response.end();
          } 
      }
      
      else if (path == "/nachrichtEins") {
        formularData = mongoClient.db("HFUChat").collection("NachrichtEins");
        insertMessage(<string>url.query.username, <string>url.query.message);
      }

      else if (path == "/nachrichtZwei") {
        formularData = mongoClient.db("HFUChat").collection("NachrichtZwei");
        insertMessage(<string>url.query.username, <string>url.query.message);
      }

      else if (path == "/receiveChatOne") {
        formularData = mongoClient.db("HFUChat").collection("NachrichtEins");
        let resultString: string = "";
        formularData.find({}).toArray(function(err: Mongo.MongoError, result: string[]): void {
          if (err)
            throw err;
          
          resultString += "[";
          for (let i: number = 0; i < result.length; i++) {
            resultString += JSON.stringify(result[i]);
            if (i < result.length - 1)
              resultString += ",";
          }
          resultString += "]";
          _response.write(JSON.stringify(resultString));
          _response.end();
        });
      }

      else if (path == "/receiveChatTwo") {
        formularData = mongoClient.db("HFUChat").collection("NachrichtZwei");
        let resultString: string = "";
        formularData.find({}).toArray(function(err: Mongo.MongoError, result: string[]): void {
          if (err)
            throw err;
          
          resultString += "[";
          for (let i: number = 0; i < result.length; i++) {
            resultString += JSON.stringify(result[i]);
            if (i < result.length - 1)
              resultString += ",";
          }
          resultString += "]";
          _response.write(JSON.stringify(resultString));
          _response.end();
        });
      }
    }
  }


  function insertMessage(_username: string, _message: string): void {
    let current: Date = new Date();
    let minutes: number | string = current.getMinutes();
    if (minutes < 10)
      minutes = "0" + current.getMinutes();
      
    let currentTime: string = current.getHours() + ":" + current.getMinutes();
    let currentDate: string = current.toLocaleDateString("de-DE", {weekday: "long", year: "numeric", month: "long", day: "numeric"});
    formularData.insertOne({username: _username, message: _message, time: currentTime, date: currentDate});
  }
}
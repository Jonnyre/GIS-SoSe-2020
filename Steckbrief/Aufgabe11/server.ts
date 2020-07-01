import * as Http from "http";
import * as Url from "url";
import * as Mongo from "mongodb";

export namespace Aufgabe11 {
  let formularData: Mongo.Collection;
  
  let databaseUrl: string;

  let myArgs: string[] = process.argv.slice(2);
  if (myArgs[0] == "local")
    databaseUrl = "mongodb://localhost:27017";
  else // Wenn nicht lokal dann immer remote
    databaseUrl = "mongodb+srv://Testuse:2CRniQTCg8CiqCKz@gis-sose-2020-jori-pijp3.mongodb.net/Aufgabe11?retryWrites=true&w=majority";

  connectToDatabase(databaseUrl);

  let port: number = Number(process.env.PORT);
  if (!port)
    port = 8100;

  let server: Http.Server = Http.createServer();
  server.addListener("request", handleRequest);
  server.listen(port);

  async function connectToDatabase(_url: string): Promise<void> {
    let options: Mongo.MongoClientOptions = {useNewUrlParser: true, useUnifiedTopology: true};
    let mongoClient: Mongo.MongoClient = new Mongo.MongoClient(_url, options);
    await mongoClient.connect();
    formularData = mongoClient.db("Aufgabe11").collection("formular_eingabe");
  } 

  function handleRequest(_request: Http.IncomingMessage, _response: Http.ServerResponse): void {

    _response.setHeader("Access-Control-Allow-Origin", "*");
    _response.setHeader("content-type", "text/html; charset=utf-8");

    if (_request.url) {
      let url: Url.UrlWithParsedQuery = Url.parse(_request.url, true);
      let path: string | null = url.pathname;
      if (path == "/retrieve") {
        formularData.find({}).toArray(function(err: Mongo.MongoError, result: string[]): void {
        if (err)
          throw err;
        _response.write(JSON.stringify(result));
        });
        }
        
      else if (path == "/store")
        formularData.insertOne(url.query);
    }
    _response.end();
  }
}
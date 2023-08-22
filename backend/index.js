import mongodb from "mongodb";
import dotenv from "dotenv";
import app from "./server.js";
import UrlShortenerDAO from "./dao/urlshortnerDAO.js";

dotenv.config();

const MongoClient = mongodb.MongoClient;
const port = process.env.PORT || 8000;

MongoClient.connect(
    process.env.RESTURLSHORTENER_DB_URI,
    {
        maxPoolSize: 50,
        wtimeoutMS: 2500
    }
)
.catch((err) => {
    console.error(err.stac);
    process.exit(1);
})
.then(async client => {
    await UrlShortenerDAO.injectDB(client);
    app.listen(port, () => {
        console.log("Listing to port 5000");
    })
})

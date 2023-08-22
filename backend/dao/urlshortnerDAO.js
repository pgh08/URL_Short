import mongodb from "mongodb";

const ObjectId = mongodb.ObjectId;

let short_to_original;

export default class UrlShortenerDAO{
    static async injectDB(conn){
        if(short_to_original){
            return;
        }

        try{
            short_to_original = await conn.db(process.env.RESTURL_NS).collection("short_to_original");
        }
        catch(e){
            console.error(`Unable to connect to DB: ${e}`);
        }
    }
    
    static async retriveUrl(shortened_URL){
        try{
            const query = {
                shortenedURL: shortened_URL
            };
            
            let data = await short_to_original.findOne(query);
            
            return data.originalURL;
        }
        catch(e){
            console.error(`Unable to retrive original url: ${e}`);
            return {error: e};
        }
    }

    static async addUrl(url, date, shortUrl){
        try{
            let baseURL = "http://localhost:5000/api/v1/urlshort/";
            let present = await short_to_original.findOne({originalURL: url});
            if(present){
                return `${baseURL}${present.shortenedURL}`;
            }

            const insertDoc = {
                originalURL: url,
                shortenedURL: shortUrl,
                added_date: date,
            };
            
            let isInserted = await short_to_original.insertOne(insertDoc);

            if(isInserted){
                return `${baseURL}${shortUrl}`;
            }
        }
        catch(e){
            console.error(`Unable to add url: ${e}`);
            return {error: e};
        }
    }
}
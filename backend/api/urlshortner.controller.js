import { nanoid } from "nanoid";
import UrlShortenerDAO from "../dao/urlshortnerDAO.js";

export default class UrlController{
    
    static async apiRetriveShortenedUrl(req, res){
        try{
            const shortenedURL = req.params.shortenedURL;
            
            const RetriveResponse = await UrlShortenerDAO.retriveUrl(shortenedURL);
            
            if(!RetriveResponse){
                res.status(404).json({error: "Page Not Found"});
            }
            else{
                res.redirect(RetriveResponse);
            }
        }
        catch(e){
            res.status(500).json({error: e.message});
        }
    }

    static async apiAddShortenedUrl(req, res){
        try{
            const url = req.body.original_url;
            const date = new Date();
            const shortUrl = nanoid();
            
            const ShortResponse = await UrlShortenerDAO.addUrl(url, date, shortUrl);

            res.json({
                shortenedUrl: ShortResponse,
                status: "success"
            });
        }
        catch(e){
            res.status(500).json({error: e.message});
        }
    }
}

import http from "../http-common.js";

class UrlDataService{
    createShortURL(original_url){
        return http.post("/", original_url);
    }
}

const temp = new UrlDataService();
export default temp;
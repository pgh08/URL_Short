import express from "express";
import UrlController from "./urlshortner.controller.js";

const router = express.Router();

router.route("/:shortenedURL").get(UrlController.apiRetriveShortenedUrl);

router
    .route("/")
    .post(UrlController.apiAddShortenedUrl);

export default router;
import express from "express";
import cors from "cors";
import urls from "./api/urlshortner.route.js"

const app = express();

// Using middleware.
app.use(cors());
app.use(express.json());

// Routing the page.
app.use("/api/v1/urlshort", urls);
app.use("*", (req, res) => res.status(400).json({error: "Page not found"}));

export default app;
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookie from "cookie-parser";
import router from "./routes/route.js";
dotenv.config();
const app = express();

app.use(cors());
app.use(cookie());
app.use(express.json());
app.use(router);

app.listen(4000, () => console.log("Server Running, click to access 4000"));

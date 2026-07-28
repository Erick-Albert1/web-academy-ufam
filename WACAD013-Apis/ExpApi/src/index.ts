import "dotenv/config";
import fs from "fs";
import path from "path";
import express from "express";
import cookieParser from "cookie-parser";
import session from "express-session";
import swaggerUi from "swagger-ui-express";
import { router } from "./router";
import { language } from "./middlewares/language";

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(
  session({
    secret: process.env.SESSION_SECRET || "expapi-secret",
    resave: false,
    saveUninitialized: false,
    cookie: { httpOnly: true, maxAge: 1000 * 60 * 60 * 24 },
  }),
);
app.use(language);
app.use("/api", router);

const swaggerFilePath = path.join(__dirname, "../swagger-output.json");

if (fs.existsSync(swaggerFilePath)) {
  const swaggerDocument = JSON.parse(fs.readFileSync(swaggerFilePath, "utf-8"));
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
}

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

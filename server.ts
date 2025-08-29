import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import router from "./routes/index.ts";
import { annonceControllers } from "./controllers/annonceControllers.ts";
import { logMiddleware } from "./middlewares.ts";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(logMiddleware);

app.get("/", (req, res) => {
  new annonceControllers(req, res).index();
});

app.use("/", router);

app.listen(3008, () => {
  console.log("Serveur démarré sur http://localhost:3008");
});
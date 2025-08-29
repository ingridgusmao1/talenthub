import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import router from "./routes/index";
import { annonceControllers } from "./controllers/annonceControllers";
import { logMiddleware } from "./middlewares";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = process.env.PORT || 3008;

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

app.listen(PORT, () => {
  console.log("Serveur démarré sur http://localhost:3008");
});
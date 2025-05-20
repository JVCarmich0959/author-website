import express from "express";
import ejsMate from "ejs-mate";
import path from "path";
import { fileURLToPath } from "url";

const app  = express();
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PORT = process.env.PORT || 3000;

// ➜ plug ejs-mate as the rendering engine
app.engine("ejs", ejsMate);
app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "src", "views"));

app.get("/",      (_req, res) => res.render("index", { title: "Home"  }));
app.get("/about", (_req, res) => res.render("about", { title: "About" }));

if (process.env.NODE_ENV !== "test") {
  app.listen(PORT, () => console.log(`🚀  http://localhost:${PORT}`));
}

export { app };

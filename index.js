import { createApp, upload } from "./config.js";

const app = createApp({
  user: "rontim",
  host: "bbz.cloud",
  database: "rontim",
  password: "Y(v3Q_S7^sj)6B.+",
  port: 30211,
});

/* Startseite */
app.get("/", async function (req, res) {
  const posts = await app.locals.pool.query("select * from posts");
  res.render("start", { posts: posts.rows });
});

app.get("/new_post", async function (req, res) {
  res.render("new_post", {});
});

app.post("/create_post", upload.single("image"), async function (req, res) {
  /*const user = await login.loggedInUser(req);*/
  "INSERT INTO posts (caption, image) VALUES ($1, $2)",
    [req.body.caption, req.file.filename];
  /*console.log(result);*/
  res.redirect("/");
});

app.get("/news", async function (req, res) {
  res.render("news", {});
});

app.get("/impressum", async function (req, res) {
  res.render("impressum", {});
});

/* Wichtig! Diese Zeilen müssen immer am Schluss der Website stehen! */
app.listen(3010, () => {
  console.log(`Example app listening at http://localhost:3010`);
});

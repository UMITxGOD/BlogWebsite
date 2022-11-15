const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const Article = require("./model/article");
const articleRouter = require("./routes/articles");
const methodOverride = require("method-override");
const uri =
  "mongodb+srv://umit:Umit%40111@greenvegies.60zzyxa.mongodb.net/Blog?retryWrites=true&w=majority";
mongoose.connect(uri);
const PORT = 5000;
const app = express();
app.use(methodOverride("_method"));
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "views/articles")));
app.get("/", async (req, res) => {
  const article = await Article.find().sort({ createdAt: "descending" });
  res.status(200).render("articles/index", { article: article });
});
app.listen(PORT, () => {
  console.log(`Server started At http://localhost:${PORT}`);
});
app.use("/article", articleRouter);

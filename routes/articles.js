const Express = require("express");
const Article = require("./../model/article");

const router = Express.Router();

router.get("/new", (req, res) => {
  res.render("articles/new", { article: new Article() });
});
router.get("/:slug", async (req, res) => {
  const article = await Article.findOne({ slug: req.params.slug });
  if (article == null) res.redirect("/");
  res.render("articles/preview", { article: article });
});
router.get("/edit/:id", async (req, res) => {
  const article = await Article.findById(req.params.id);
  res.render("articles/edit", { article: article });
});
router.post(
  "/",
  async (req, res, next) => {
    req.body.article = await new Article({});
    next();
  },
  saveArticleAndRedirect("new")
);
router.delete("/:id", async (req, res) => {
  await Article.findByIdAndDelete(req.params.id);
  res.redirect("/");
});
router.put(
  "/:id",
  async (req, res, next) => {
    req.body.article = await Article.findById(req.params.id);
    next();
  },
  saveArticleAndRedirect("edit")
);
function saveArticleAndRedirect(path) {
  return async (req, res) => {
    let article = req.body.article;
    article.title = req.body.title;
    article.auther = req.body.auther;
    article.description = req.body.description;
    article.markdown = req.body.markdown;

    try {
      const result = await article.save();
      res.redirect(`/article/${result.slug}`);
    } catch (e) {
      console.log(e);
      res.render(`articles/${path}`, { article: article });
    }
  };
}
module.exports = router;

var express = require("express");
var router = express.Router();

/* GET home page. */
let products = [];
router.get("/", function (req, res, next) {
  res.render("productos", { title: "Express" });
});

router.post("/", function (req, res, next) {
  const { name, price } = req.body;
  const product = { name, price, id: products.length + 1 };
  products.push(product);
  res.json(product);
});
module.exports = router;

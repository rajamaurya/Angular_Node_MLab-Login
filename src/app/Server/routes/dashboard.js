const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.json());

router.get("/dashboard", (req, res) => {
  res.send("dashboard");
});

module.exports = router;

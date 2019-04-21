const express = require("express");
const app = express();
const path = require("path");
const bodyParser = require("body-parser");

app.use(bodyParser.json());
const cors = require("cors");
let corsOption = {
  origin: "localhost:4200",
  optionSuccessStatus: 200
};
app.use(cors(corsOption));

app.get("/", (req, res) => {
  res.json({
    message: "listning here........l.l.l;.;mncvnfvgjh"
  });
});

const port = process.env.port || 4300;
app.listen(port, err => {
  console.log(`server listening at port no ${port}`);
});

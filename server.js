const express = require("express");
const app = express();
const mongoose = require("mongoose");
const morgan = require("morgan");
const cors = require("cors");
const path = require("path");
const api = require("./src/app/Server/routes/api");
const bodyParser = require("body-parser");
const dashboardApi = require("./src/app/Server/routes/dashboard");

const connectDbPath =
  "mongodb://ramaurya:ramaurya9122@ds233769.mlab.com:33769/kittiedb";
mongoose.Promise = global.Promise;

mongoose.connect(
  connectDbPath,
  err => {
    if (err) {
      console.log(JSON.stringify(err));
    }
  },
  { useNewUrlParser: true }
);
var corsOptions = {
  origin: "http://localhost:4200",
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
};
//Enable All CORS Requests
app.use(cors(corsOptions));

// parsing req here...
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// providing access to dist folder to express
app.use(express.static(path.join(__dirname, "dist/User-Libra")));

app.use("/api", api);
app.use("/api", dashboardApi);

// use morgan to log requests to the console
app.use(morgan("dev"));
// by default run index file present in dist folder...
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "dist/User-Libra/index.html"));
});

const port = process.env.port || 3000;
app.listen(port, err => {
  console.log(`server listening at port no ${port}`);
});

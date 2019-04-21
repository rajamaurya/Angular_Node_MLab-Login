const express = require("express");
const mongoose = require("mongoose");
const User = require("../models/user");
const router = express.Router();
const app = express();
const path = require("path");
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");

app.use(bodyParser.json());
const cors = require("cors");

//app.use(cors({ origin: "http://localhost:4200", credentials: true }));

router.get("/", (req, res) => {
  res.json({
    message: "api successfully started..."
  });
});
router.get("/users", (req, res) => {
  /*let headers = new Headers({
    "Content-Type": "application/json",
    "Access-Control-Allow-Credentials": true,
    "Access-Control-Allow-Origin": true
  }); */
  console.log("in user ....");
  User.find({}).exec((err, Users) => {
    console.log("in mlab ....");
    if (err) res.json({ message: "Error while fetching user list.." });
    else res.json(Users);
  });
});
router.get("/user/:id", (req, res) => {
  let id = req.params.id;
  console.log(" user by id ....");
  User.findById(id).exec((err, User) => {
    if (err) res.json({ message: "Error while fetching user list.." });
    else res.json(User);
  });
});
router.post("/signup", verifyToken, (req, res) => {
  var user = new User();
  console.log(JSON.stringify(user));
  user.username = req.body.username;
  user.password = req.body.password;
  console.log("hello new user..");
  var dummyUser = { username: "rajamaurya", password: "raja9122#" };
  user.save(dummyUser, err => {
    console.log("in signup post area");
    if (err) {
      res.json({ errorMessage: JSON.stringify(err) });
    } else {
      res.json({ message: "successfully posted..." });
    }
  });
});
router.post("/authenticate", (req, res) => {
  console.log(JSON.stringify(req.headers));
  var user = new User();
  console.log(JSON.stringify(user));
  user.username = req.body.username;
  user.password = req.body.password;
  console.log("hello user..");
  var dummyUser = { username: "rajamaurya", password: "raja9122#" };
  // write code for the jwt authentication....
  jwt.sign({ user }, "secretkey", (err, token) => {
    res.json({ token });
  });

  /*user.save(dummyUser, err => {
    console.log("in post area");
    if (err) {
      res.json({ errorMessage: JSON.stringify(err) });
    } else {
      res.json({ message: "successfully posted..." });
    }
  }); */
});
function verifyToken(req, res, next) {
  // auth header value..
  const bearerHeader = req.headers["authorization"];
  if (typeof bearerHeader !== "undefined") {
    const bearerToken = bearerHeader.split(" ")[1];
    res.token = bearerToken;
    next();
  } else {
    res.sendStatus(403);
  }
}
router.put("/user/:id", (req, res) => {
  var user = new User();
  console.log(JSON.stringify(user));
  user.username = req.body.username;
  user.password = req.body.password;
  console.log("hello user..");
  var dummyUser = { username: "krishna", password: "ramaurya9122#" };
  User.findByIdAndUpdate(req.params.id, dummyUser, (err, dummyUser) => {
    if (err) {
      res.json({ errorMessage: JSON.stringify(err) });
    } else {
      res.json({ message: "successfully updated..." });
    }
  });
});
router.delete("/user/:id", (req, res) => {
  User.findById(req.params.id)
    .remove()
    .exec(err => {
      if (err) {
        res.json({ errorMessage: JSON.stringify(err) });
      } else {
        res.json({ message: "successfully deleted..." });
      }
    });
});
module.exports = router;

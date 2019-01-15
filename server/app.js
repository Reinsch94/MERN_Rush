const express = require("express");
const bodyParser = require("body-parser");

const user = require("./routes/user.route");
const comment = require("./routes/comment.route");
const publication = require("./routes/publication.route");

const app = express();
const mongoose = require("mongoose");

let mongoDB = "mongodb://127.0.0.1:27017/MERN_RUSH";

mongoose.connect(
  mongoDB,
  { useNewUrlParser: true }
);
mongoose.Promise = global.Promise;
let db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.all("/*", function(req, res, next) {
  // CORS headers
  res.header("Access-Control-Allow-Origin", "*"); // restrict it to the required domain
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS");
  // Set custom headers for CORS
  res.header(
    "Access-Control-Allow-Headers",
    "Content-type,Accept,X-Access-Token,X-Key"
  );
  if (req.method == "OPTIONS") {
    res.status(200).end();
  } else {
    next();
  }
});

app.use("/users", user);
app.use("/comments", comment);
app.use("/publications", publication);


let port = 8080;
app.listen(port, () => {
  console.log("Server is up and running on port number " + port);
});

module.exports = app;

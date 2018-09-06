// Generated by CoffeeScript 2.3.1
// TODO: offer
var PORT, app, express, fs, helmet, images, path, random, randomArr, randomImage, toImagePath;

fs = require("fs");

path = require("path");

express = require("express");

helmet = require("helmet");

app = express();

// middlewares
app.use(helmet());

// static
app.use("/images", express.static(path.join(__dirname, "images")));

app.use("/", express.static(path.join(__dirname, "public")));

// helpers
random = function(min, max) {
  if (!max) {
    max = min;
    min = 0;
  }
  return min + Math.floor(Math.random() * (max - min));
};

randomArr = function(arr) {
  var index;
  index = random(0, arr.length);
  return arr[index];
};

images = fs.readdirSync(path.join(__dirname, "images"));

randomImage = function() {
  return randomArr(images);
};

toImagePath = function(name) {
  return path.join(__dirname, "images", name);
};

app.get("/api", function(req, res) {
  return res.sendFile(toImagePath(randomImage()));
});

app.get("/api-link", function(req, res) {
  var url;
  url = req.protocol + '://' + req.get('host');
  return res.send(url + "/images/" + randomImage());
});

PORT = process.env.PORT || 8080;

app.listen(PORT, function() {
  return console.log("Listening on http://localhost:" + PORT);
});
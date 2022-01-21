var express = require('express');
var app = express();

app.use(function(req, res, next) {
  console.log(req.method + " " + req.path + " - " + req.ip);
  next();
})

app.get("/now", (req, res, next) => {
    req.time = Date().toString();
    next();
  },
  (req, res) => {
    res.send({"time": req.time});
  }
);

absolutePath = __dirname + '/views/index.html';
app.get("/", function(req, res) {
  res.sendFile(absolutePath);
});

app.get("/json", function(req, res) {
  if (process.env.MESSAGE_STYLE == "uppercase") {
      res.send({"message": "HELLO JSON"});
  } else {
      res.send({"message": "Hello json"});
  }
})

app.get('/:word/echo', function(req, res, next) {
  var word = req.params.word
  res.json({echo: word});
  next();
})

app.use('/public', express.static(__dirname + '/public'));

















 module.exports = app;

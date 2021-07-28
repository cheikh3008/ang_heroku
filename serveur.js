const express = require("express");
const path = require("path");
const app = express();
app.use(express.static(__dirname + 'dist/resthaut-front'));
app.get('/*', function (req, res) {
  res.sendFile(path.json(__dirname + 'dist/resthaut-front/index.html'))
});
app.listen(process.env.PORT);
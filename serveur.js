const express = require('express');
const path = require('path');
const app = express();
app.use(express.static('./dist/resthaut-front'));
app.get('/*', function (req, res) {
  res.sendFile('index.html', {root: 'dist/resthaut-front/index.html'})
});
app.listen(process.env.PORT || 3000);
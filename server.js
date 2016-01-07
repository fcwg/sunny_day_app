var express = require("express");
var app = express();
app.use(express.logger());

// app.get('/', function(request, response) {
//   response.send('Hello World!');
// });

app.get('/', function(req, res) {
	res.sendFile(__dirname + '/index.htm');
});

var port = process.env.PORT || 5000;
app.listen(port, function() {
  console.log("Listening on " + port);
});
// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({ optionsSuccessStatus: 200 }));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function(req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

const getDateObj = (req) => {
  let { date } = req.params;
  date = date === undefined ? new Date().toDateString() : date;

  const strDate = new Date((date.includes('-') || date.includes(' ') || date.includes(',')) ? date : Number(date)).toDateString();

  if (strDate === "Invalid Date") return { error: strDate };

  const dateElems = new Date((date.includes('-') || date.includes(' ') || date.includes(',')) ? date : Number(date)).toUTCString().split(' ');

  const unix = new Date((date.includes('-') || date.includes(' ') || date.includes(',')) ? date : Number(date)).getTime();
  const utc = dateElems.join(' ').replace(dateElems[4], "00:00:00");

  const dateObj = { unix, utc };
  
  return dateObj;
};

// your first API endpoint... 
app.get("/api/hello", function(req, res) {
  res.json({ greeting: 'hello API' });
});

app.get('/api/', (req, res) => {
  const dateObj = getDateObj(req);
  res.json(dateObj);
});

app.get("/api/:date", (req, res) => {
  const dateObj = getDateObj(req);
  res.json(dateObj);
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function() {
  console.log('Your app is listening on port ' + listener.address().port);
});

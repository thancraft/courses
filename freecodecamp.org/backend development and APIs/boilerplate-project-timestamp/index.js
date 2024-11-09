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
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

// API endpoint to return the current time in Unix and UTC formats when no date is provided
app.get("/api", function (req, res) {
  const currentDate = new Date();
  res.json({
    unix: currentDate.getTime(),
    utc: currentDate.toUTCString()
  });
});

// API endpoint to return the Unix and UTC formats for a given date
app.get("/api/:date", function (req, res) {
  const dateParam = req.params.date;
  let date;

  // Check if the date is a valid Unix timestamp (number)
  if (/\d{13}/.test(dateParam)) {
    date = new Date(parseInt(dateParam));
  } else {
    // Otherwise, parse the date using the Date constructor
    date = new Date(dateParam);
  }

  // If the date is invalid, return error
  if (date.toString() === 'Invalid Date') {
    return res.json({ error: "Invalid Date" });
  }

  // Return the response with Unix and UTC date formats
  res.json({
    unix: date.getTime(),
    utc: date.toUTCString()
  });
});

// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});

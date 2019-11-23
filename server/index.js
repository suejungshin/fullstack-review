const express = require('express');
let app = express();
const helpers = require('../helpers/github.js')// I added this
const bodyParser = require('body-parser')// I added this
const db = require('../database/index.js') // I added this

app.use(express.static(__dirname + '/../client/dist'));
app.use(bodyParser.urlencoded({extended: false}))

app.post('/repos', function (req, res) {
  // TODO - your code here!
  // This route should take the github username provided
  // and get the repo information from the github API, then
  // save the repo information in the database

  let username = Object.keys(req.body)[0] // I don't know why it comes back in an object - go investigate this later

  helpers.getReposByUsername(username, (err, body) => {
    let parsedReposList = JSON.parse(body);

    for (let i = 0; i < parsedReposList.length; i++) {
      db.save(err, parsedReposList[i]); // figure out error handling instead of null later
    }

    res.send('Heres something for you for posting!');
  });

});

app.get('/repos', function (req, res) {
  // TODO - your code here!
  // This route should send back the top 25 repos

  db.find((err, documents)=> {
    console.log(documents)
    res.send(documents)
  })

});

let port = 1128;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});


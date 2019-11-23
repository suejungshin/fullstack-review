const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/fetcher');

// I added lines 5-9 below, don't know if this is the right place for it
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error: '))
db.once('open', () => {
  // stuff once we're open
})


db.dropDatabase();


let repoSchema = mongoose.Schema({
  // TODO: your schema here!
  id: {type: Number, unique: true},
  name: String,
  owner: {
    login: String,
    id: Number
  },
  html_url: String,
  forks_count: Number
});

let Repo = mongoose.model('Repo', repoSchema);

let save = (err, data) => {
  // TODO: Your code here
  // This function should save a repo or repos to
  // the MongoDB

  let myRepoDocument = new Repo(data);
  return myRepoDocument.save((err, myRepoDocument) => {
    if (err) {
      return console.error(err)  // make this a more meaningful error message later
    }

  })

}



let find = (callback) => {
  Repo.find({}).sort({forks_count: -1}).limit(25).exec( (err, documents) => {
    console.log('thisiswhatiwant', documents)
    callback(err, documents)
  })
}


module.exports.save = save;
module.exports.find = find;


// // check out how I'm doing by console logging
// Repo.find({}, (err, documents) => {
//   console.log('documents: ', documents)
// })


   // Repo.find({}).sort({forks_count : -1}).limit(25);

    // console.log('yay you saved to the db, heres your repoDocument:', myRepoDocument)
  //   Repo.find({} , (err, documents) => {
  //    console.log('see there it is! in the documents: ', documents);
  //  })
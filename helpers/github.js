const request = require('request');
const config = require('../config.js');

let getReposByUsername = (/* TODO */username, callback) => {
  // TODO - Use the request module to request repos for a specific
  // user from the github API

  // The options object has been provided to help you out,
  // but you'll have to fill in the URL

  let options = {
    url: `https://api.github.com/users/${username}/repos`,
    headers: {
      'User-Agent': 'request',
      'Authorization': `token ${config.TOKEN}`
    }
  };

  request(options, (err, response, body) => {
    // console.log('error: ', err)
    // console.log('statusCode:', response && response.statusCode);
    // console.log('body:', body)

    if (err) {
      console.log (err) // come back and make this better later
    }
    callback(err, body);
  })

}

module.exports.getReposByUsername = getReposByUsername;
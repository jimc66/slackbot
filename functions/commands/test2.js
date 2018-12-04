const lib = require('lib')({token: process.env.STDLIB_TOKEN});
var request = require('request');
/**
* /test2
*
*   Test2 additional command copied from Hello world source
*   Basic "Hello World" command.
*   All Commands use this template, simply create additional files with
*   different names to add commands.
*
*   See https://api.slack.com/slash-commands for more details.
*
* @param {string} user The user id of the user that invoked this command (name is usable as well)
* @param {string} channel The channel id the command was executed in (name is usable as well)
* @param {string} text The text contents of the command
* @param {object} command The full Slack command object
* @param {string} botToken The bot token for the Slack bot you have activated
* @returns {object}
*/


module.exports = (user, channel, text = '', command = {}, botToken = null, callback) => {
  let tester;
  tester=text +"AAA";
  var initializePromise = initialize();

  initializePromise.then(function(result) {
    SeasonStats = result;
    var num_players = SeasonStats.players.length;
    tester=num_players;
//    console.log(" =====  exiting Promise for API results  ===== ")
    callback(null, {
      //    text: `Test2.1 stuff mr. , <@${user}>...\nYou input: ${text}`,
          text: `Test2.2 stuff mr. , <@${user}>...\nNumber of players found: ${num_players}`,
          attachments: [
            // You can customize your messages with attachments.
            // See https://api.slack.com/docs/message-attachments for more info.
          ]
        });
}, function(err) {
    console.log(err);
})

/* IT DIDN'T WORK UNTIL I PULLED THIS CALLBACK
  callback(null, {
//    text: `Test2.1 stuff mr. , <@${user}>...\nYou input: ${text}`,
    text: `Test2.2 stuff mr. , <@${user}>...\nYou input: ${tester}`,
    attachments: [
      // You can customize your messages with attachments.
      // See https://api.slack.com/docs/message-attachments for more info.
    ]
  });*/
};


function initialize() {
  // Setting URL and headers for request
  var options = {
      url: 'https://api.fantasy.nfl.com/v1/players/stats?statType=seasonStats&season=2018&format=json',
      headers: {
          'User-Agent': 'request'
      }
  };
  // Return new promise - to parse the NFL stats
  return new Promise(function(resolve, reject) {
    // Do async job
      request.get(options, function(err, resp, body) {
          if (err) {
              reject(err);
          } else {
              resolve(JSON.parse(body));
          }
      })
  })

}

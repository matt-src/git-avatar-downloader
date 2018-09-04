var request = require('request');

console.log('Welcome to the GitHub Avatar Downloader!');

function getRepoContributors(repoOwner, repoName, cb) {
    var options = {
      url: "https://api.github.com/repos/" + repoOwner + "/" + repoName + "/contributors",
      headers: {
        'User-Agent': 'request',
        'Authorization': 'token <token here (removed)>'
      }
    };
  
    request(options, function(err, res, body) {
      cb(err, JSON.parse(body));
    });
  }

  getRepoContributors("jquery", "jquery", function(err, result) {
      if(err){
        console.log("Errors:", err);
      }
      else {
    for(contributor in result){
        if(contributor){
        console.log(result[contributor].avatar_url)
        }
    }
    }
  });
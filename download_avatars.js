var request = require('request');
var fs = require('fs');

console.log('Welcome to the GitHub Avatar Downloader!');

function getRepoContributors(repoOwner, repoName, cb) {
    var options = {
      url: "https://api.github.com/repos/" + repoOwner + "/" + repoName + "/contributors",
      headers: {
        'User-Agent': 'request',
        'Authorization': 'token <removed>'
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
        //console.log(result[contributor].avatar_url)
        var imgLoc = result[contributor].avatar_url
        console.log("img is at " + imgLoc)
        downloadImageByURL(imgLoc, contributor + ".jpg")
        }
    }
    }
  });

  function downloadImageByURL(url, filePath) {

    request.get(url)  
       .on('error', function (err) {
         throw err;
       })
       .on('response', function (response) {
         console.log('Response Status Code: ', response.statusCode);
       })
       .pipe(fs.createWriteStream(filePath));
  }

  downloadImageByURL("https://avatars1.githubusercontent.com/u/43004?v=4", "test33.jpg")
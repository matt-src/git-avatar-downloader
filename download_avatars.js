var request = require('request');
var fs = require('fs');
//Take arguments from command line and assign them to repOwner and repName
var myArgs = process.argv.slice(2) 
var repOwner = myArgs[0]
var repName = myArgs[1]

console.log('Welcome to the GitHub Avatar Downloader!');
//Make sure we have at least 2 arguments, otherwise throw error
if(myArgs.length < 2){
    throw new error("You didn't provide enough aguments, dummy!")
}

//Get the list of repo contributors, parse it to an object, and then pass it to the callback function
function getRepoContributors(repoOwner, repoName, cb) {
    //Set the options for our request 
    var options = {
      url: "https://api.github.com/repos/" + repoOwner + "/" + repoName + "/contributors",
      headers: {
        'User-Agent': 'request',
        'Authorization': 'token <removed>'
      }
    };
    //Make our request, and then pass the body we get back to our callback function
    request(options, function(err, res, body) {
      cb(err, JSON.parse(body));
    });
  }

  //Call getRepoContributors, pass in our repo name and repo owner that we took as arguments, plus our callback to extract avatar url's
  getRepoContributors(repOwner, repName, function(err, result) {
      if(err){
        console.log("Errors:", err);
      }
      else {
          //Extract avatar url's from contributors and pass them to downloadImageByURL
    for(contributor in result){
        if(contributor){
        //console.log(result[contributor].avatar_url)
        var imgLoc = result[contributor].avatar_url
        //Download image and save it at <contributor number>.jpg
        downloadImageByURL(imgLoc, contributor + ".jpg")
        }
    }
    }
  });

  //Downloads an image from the given url and saves it at the given filePath
  function downloadImageByURL(url, filePath) {

    request.get(url)  
       .on('error', function (err) {
         throw err;
       })
       .on('response', function (response) {
         console.log('Response Status Code: ', response.statusCode);
       })
       .pipe(fs.createWriteStream(filePath)); //We successfully got the image, so save it to <filePath>
  }

  //downloadImageByURL("https://avatars1.githubusercontent.com/u/43004?v=4", "test33.jpg")
$(document).ready(function() {

var apiKey = "GAN5Vuqp6dyl6vNHxlmwbLizhaZMVVf6";
var search = "Pelosi";
var queryURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json?q=" + search + "&api-key=" + apiKey;


var searchNYT = function search () {

   $.ajax({
        url: queryURL,
        method: "GET"
      }).then(function(response) {

        console.log(response);
      });
    };
});

searchNYT();

console.log(response);





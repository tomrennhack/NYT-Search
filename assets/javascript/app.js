$(document).ready(function() {


  // onclick CLEAR ==============================================

  $("#search-button").on("click", function(event) {

    event.preventDefault();
    // empty the current top-articles div
    $("#top-articles").empty();

  });

  // onclick SEARCH =============================================
  $("#search-button").on("click", function(event) {

    event.preventDefault();
    // empty the current top-articles div
    $("#top-articles").empty();
    // append a new top-article div to the card-header element
    var topArticlesDiv = "<div class='card-body' id='top-articles'";
    $(".card-header").after(topArticlesDiv);

    // fetch form values
    var search = $("#search-term").val().trim();
    console.log(search);
    var records = $("#number-of-records").val();
    console.log(records);
    var startYear = $("#start-yr").val().trim();
    console.log(startYear);
    var endYear = $("#end-yr").val().trim();
    console.log(endYear);

  // build queryURL
  var apiKey = "GAN5Vuqp6dyl6vNHxlmwbLizhaZMVVf6";
  var queryURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json?q=" + search + "&api-key=" + apiKey;
  
   $.ajax({
        url: queryURL,
        method: "GET"
      }).then(function(results) {

      console.log(results.response.docs[0].headline.main);

      for ( var i = 0 ; i < records ; i++ ) {

        //  keys to capture
        var topArticlesDiv = $("#top-articles");

        var headline = results.response.docs[i].headline.main;
        var pHeadline = $("<h5>").html(headline);

        var byline = results.response.docs[i].byline.original;
        var pByline = $("<p>").html("<b>Byline</b>: " + byline);

        var abstract = results.response.docs[i].abstract;
        var pAbstract = $("<p>").html("<b>Abstract</b>: " + abstract);

        var leadPara = results.response.docs[i].lead_paragraph;
        var pLeadPara = $("<p>").html("<b>Lead Paragraph</b>: " + leadPara);

        var pubDate = Date(results.response.docs[i].pub_date);
        var pPubDate = $("<p>").html("<b>Publication Date</b>: " + pubDate);

        var section = results.response.docs[i].section_name;
        var pSection = $("<p>").html("<b>Section</b>: " + section);

        var subsection = results.response.docs[i].subsection_name;
        var pSubsection = $("<p>").html("<b>Subsection</b>: " + subsection);

        var webURL = results.response.docs[i].web_url;
        var pWebURL = $("<p>").html("<b>Web URL</b>: " + webURL);

        var divider = $("<hr>");

        // append to the top-articles div
        topArticlesDiv.append(pHeadline).append(pByline).append(pAbstract).append(pLeadPara).append(pSection).append(pSubsection).append(pWebURL).append(pPubDate).append(divider);
        }; // end for loop
      }); // end then
    }); // end onclick event
}); // end document.ready

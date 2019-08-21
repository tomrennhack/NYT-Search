$(document).ready(function() {

  // onclick CLEAR ==============================================

  $("#clear-results-button").on("click", function(event) {

    event.preventDefault();
    // empty the current top-articles div
    $("#top-articles").empty();
  }); // end clear-results-button


  // onclick SEARCH =============================================

  $("#search-button").on("click", function(event) {

    event.preventDefault();
    // empty the current top-articles div
    $("#top-articles").empty();

    // fetch form values
    var search = $("#search-term").val().trim();
    var records = $("#number-of-records").val();
    var sYear = $("#start-yr").val().trim();
    var startYear = sYear.length > 0 ? "&start_date=" + sYear + "0101" : "";
    var eYear = $("#end-yr").val().trim();
    var endYear = eYear.length > 0 ? "&end_date=" + eYear + "1231" : "";

  // build queryURL
  var apiKey = "GAN5Vuqp6dyl6vNHxlmwbLizhaZMVVf6";
  var queryURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json?q=" + search + startYear + endYear + "&api-key=" + apiKey;
    console.log(queryURL);
   $.ajax({
        url: queryURL,
        method: "GET"
      }).then(function(results) {

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

        var webURL = results.response.docs[i].web_url;
        var aWebURL = "<a href='" + webURL + "' target='_blank'>" + headline + "</a>";
        var pWebURL = $("<p>").html("<b>Web URL</b>: " + aWebURL);

        var pubDate = new Date(results.response.docs[i].pub_date);
        var pPubDate = $("<p>").html("<b>Publication Date</b>: " + pubDate);

        var section = results.response.docs[i].section_name;
        var pSection = $("<p>").html("<b>Section</b>: " + section);

        var subsection = results.response.docs[i].subsection_name;
        var pSubsection = $("<p>").html("<b>Subsection</b>: " + subsection);

        var divider = $("<hr>");

        // append to the top-articles div
        topArticlesDiv.append(pHeadline).append(pByline).append(pPubDate).append(pAbstract).append(pLeadPara).append(pSection).append(pSubsection).append(pWebURL).append(divider);

        }; // end for loop
      }); // end then
    }); // end onclick event
}); // end document.ready

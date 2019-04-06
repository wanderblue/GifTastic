$(document).ready(function() {

// array of strings, each one related to the topic
var topics = [];

	//AJAX call to GIPHY; Q parameterc for API link set to search term, limit 10 results
  
 	function displayAnimal() {


    $("#gifArea").empty();

	  var x = $(this).data("search");
	     console.log(x);

      
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + x + "&api_key=dPpl7UOgQGTahGN4CvOjZ6CWsBd46zQE";

	     console.log(queryURL);

	  $.ajax({
          url: queryURL,
          method: "GET"
        }).done(function(response) {
        	var results = response.data;
        	console.log(results);
        	for (var i = 0; i < 10; i++) {
            //  create gif elements
            	var gifDiv = $("<div class='col-sm-4'>");

            	var rating = results[i].rating;
            	var defaultAnimatedSrc = results[i].images.fixed_height.url;
            	var staticSrc = results[i].images.fixed_height_still.url;
            	var myImage = $("<img>");
            	var p = $("<p>").text("Rating: " + rating);

            	myImage.attr("src", staticSrc);
            	myImage.addClass("animalGiphy");
              myImage.attr("data-state", "still");
            
           	myImage.attr("data-still", staticSrc);
            myImage.attr("data-animate", defaultAnimatedSrc);
            myImage.addClass("img-responsive");
           	gifDiv.append(p);
          	gifDiv.append(myImage);
           	$("#gifArea").prepend(gifDiv);

        }
	});
}

//add animals  
	$("#addanimal").on("click", function(event) {
        event.preventDefault();
        var newAnimal = $("#animalInput").val().trim();
        topics.push(newAnimal);
        console.log(topics);
        $("#animalInput").val('');
        displayButtons();
      });

  
	function displayButtons() {
    $("#myButtons").empty();
    for (var i = 0; i < topics.length; i++) {
      var a = $('<button class="btn btn-primary">');
      a.attr("id", "animal");
      a.attr("data-search", topics[i]);
      a.text(topics[i]);
      $("#myButtons").append(a);
    }
  }


  displayButtons();

  //Click button to displayanimal gif
  $(document).on("click", "#animal", displayAnimal);

  //Click on gifs to pause
  $(document).on("click", ".animalGiphy", pauseGifs);

  //retrieve "data-state" attribute and depending on status, changes image source to "data-animate" or "data-still"
  function pauseGifs() {
  	 var state = $(this).attr("data-state");
      if (state === "still") {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
      } else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
  }
}

});
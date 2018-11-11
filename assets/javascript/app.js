// GifTastic by WBM, 11/7/18, app.js file

$(document).ready(function() {

    // Array topics (aka theme)
    let topics = [
        "cat",
        "dog",
        "bird",
        "frog",
        "mouse"
    ];

    // Counter of buttons for easy identification
    let btnCounter = 0;

    // Render buttons function
    function renderButtons() {

        // Loop thround and render all topics into clickable buttons (in reverse order)
        for (let i = topics.length - 1; i >= 0 ; i--) {

            // Create button
            let aButton = $("<button>");
            aButton.addClass("btn btn-lg btn-light");
            aButton.addClass("type", "button");
            aButton.attr("id", "topic");
            aButton.attr("data-value", topics[i]);
            aButton.text(topics[i]);
    
            // Add button to page content
            $("#content-buttons").prepend(aButton);
    
            // Update total button counter
            btnCounter++;
        }
    } // End render buttons function

    // Click event listener for all buttons
    $(document).on("click", "button", getGiphyData);

    // Get GIPHY data via API
    function getGiphyData() {

        // Grabbing and store the data-value from the button to identify it
        let oneTopic = $(this).attr("data-value");
  
        // Constructing a queryURL using the topic name
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
          oneTopic + "&api_key=UsV26yT4dUXfJHPMSRaNi2kQ02gPuCk3&limit=10";

        // Test query
        // https://api.giphy.com/v1/gifs/search?q=cat&api_key=dc6zaTOxFJmzC&limit=10
  
        // Performing an AJAX request with the queryURL
        $.ajax({
          url: queryURL,
          method: "GET"
        })
          // After data comes back from the request
          .then(function(response) {

            // Testing
            console.log(queryURL);
            console.log(response.data);

            // storing the data from the AJAX request in the results variable
            var results = response.data;

            // Clear content, prep for images display
            $("#content").empty();
  
            // Display each result item
            for (let i = 0; i < results.length; i++) {
  
                // Creating and storing a div tag
                let topicDiv = $("<div>");
                topicDiv.addClass("topic-img");
  
                // Creating a paragraph tag with the result item's rating
                var p = $("<p>").text("Rating: " + results[i].rating);
  
                // Creating and store an image tag, set img src to a property pulled off the result item
                var topicImage = $("<img>");
                topicImage.attr("src", results[i].images.fixed_height.url);
  
                // Appending the paragraph and image tag to the topicDiv
                topicDiv.append(p);
                topicDiv.append(topicImage);
  
                // Show images
                $("#content").prepend(topicDiv);
                // $("#content").append(topicDiv);

                // Prepend the topicDiv to the HTML page in the "#content" div

            } // End loop

            // Show buttons again -- UPDATE LATER!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
            // renderButtons();

        }); // End .ajax method
    } // End get GIPHY data function
        
    // On page load, create buttons from topics
    renderButtons();

}); // End document.ready

// GifTastic by WBM, 11/7/18, app.js file

$(document).ready(function() {

    // Array topics (aka theme)
    let topics = [
        "cat",
        "dog",
        "bird",
        "frog",
        "mouse",
        "ferret",
        "chinchilla",
        "hedgehog",
        "gerbil",
        "pygmy goat",
        "chicken",
        "salamander",
        "rabbit",
        "capybara",
        "rat"
    ];

    // Render buttons function
    function renderButtons() {

        // Clear out button content area
        $("#content-buttons").empty();

        // Loop thround and render all topics into clickable buttons (in reverse order)
        for (let i = topics.length - 1; i >= 0 ; i--) {

            // Create button
            let aButton = $("<button>");
            aButton.addClass("btn btn-lg btn-light topic");
            aButton.attr("data-value", topics[i]);
            aButton.text(topics[i]);
    
            // Add button to page content
            $("#content-buttons").prepend(aButton);
    
        }
    } // End render buttons function

    // Click event listener for topic buttons
    $(document).on("click", ".topic", getGiphyData);

    // Get GIPHY data via API
    function getGiphyData() {

        // Grabbing and store the data-value from the button to identify it
        let oneTopic = $(this).attr("data-value");
  
        // Constructing a queryURL using the topic name
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
          oneTopic + "&api_key=UsV26yT4dUXfJHPMSRaNi2kQ02gPuCk3&limit=10";
  
        // Performing an AJAX request with the queryURL
        $.ajax({
          url: queryURL,
          method: "GET"
        })
          // After data comes back from the request
          .then(function(response) {

            // storing the data from the AJAX request in the results variable
            var results = response.data;
  
            // Display each result item
            for (let i = 0; i < results.length; i++) {
  
                // Creating and storing a div tag
                let topicDiv = $("<div>");
                topicDiv.addClass("topic-img");
  
                // Creating a paragraph tag with the result item's rating
                var p = $("<p>").text("Rating: " + results[i].rating);
  
                // Creating and store an image tag, set img src to a property pulled off the result item
                var topicImage = $("<img>");
                // topicImage.attr("src", results[i].images.fixed_height.url);
                topicImage.attr("src", results[i].images.fixed_height_still.url);
                topicImage.attr("data-still", results[i].images.fixed_height_still.url);
                topicImage.attr("data-animate", results[i].images.fixed_height.url);
                topicImage.attr("data-state", "still");
                topicImage.addClass("gif");
  
                // Appending the paragraph and image tag to the topicDiv
                topicDiv.append(p);
                topicDiv.append(topicImage);
  
                // Show images
                $("#content").prepend(topicDiv);

            } // End loop
        });   // End .ajax method
    }         // End get GIPHY data function

    // Click event listener for new topic submit button
    $(document).on("click", "#add-topic-button", newTopicSubmit);

    // Add new topic 
    function newTopicSubmit() {

        // Prevent form from refreshing the page
        event.preventDefault();

        // Get text input from user interface
        let newTopic = $("#add-topic").val().trim();

        // Add new topic to array of topics
        topics.push(newTopic);

        // Show buttons again
        renderButtons();
    
    } // End new topic submit button function

    // On click of gif image event handling
    $(document).on("click", ".gif", gifOnClick);

    // Animate or make still .gif image
    function gifOnClick() {

        // Get the data-state of the .gif; still or animate
        let state = $(this).attr("data-state");
 
        // If the clicked gif state is still, update its src to animated gif     
        if (state === "still") {

            // Set the gif data-state to animate
            $(this).attr("src", $(this).attr("data-animate"));
            $(this).attr("data-state", "animate");

        } else {

            // Set src to the still gif
            $(this).attr("src", $(this).attr("data-still"));
            $(this).attr("data-state", "still");

        }
    } // End gif on click function
        
    // ****************************************
    // On page load, create buttons from topics
    renderButtons();

}); // End document.ready

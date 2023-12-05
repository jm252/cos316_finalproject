
// timer function
function createTimer() {
  let startTime;

  return {
      start: function () {
          startTime = performance.now();
      },

      stop: function () {
          let elapsedTimeInSeconds = 0; 
          if (startTime) {
              elapsedTimeInSeconds = (performance.now() - startTime) / 1000;
              startTime = null;
          }
          return elapsedTimeInSeconds; 
      }
  };
}

const timer = createTimer();

// Listen for messages from content.js
var prevUrl;
var elapsedTime;
chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
      if (request.type === "urlChange") {
        // stoptime and get time change
        elapsedTime = timer.stop();
        console.log("Timer stopped. elapsedTime: " + elapsedTime);
        sendUsageUpdate(prevUrl, elapsedTime)
        
        // Access the URL from the message
        var url = request.url;
        console.log("URL changed to:", url);

        // starttime
        timer.start();
        console.log("Timer started.");

        prevUrl = url;

      } else if (request.type === "leftWindow") {
        elapsedTime = timer.stop();
        console.log("Timer stopped. elapsedTime: " + elapsedTime);
        sendUsageUpdate(prevUrl, elapsedTime)
      } else if (request.type === "enteredWindow") {
        timer.start();
        console.log("Timer started.");
      }
  }
);

function sendUsageUpdate(prevUrl, elapsedTime) {
  let url = "http://localhost:55556/updateUsage?prevUrl=" + encodeURIComponent(prevUrl) + "&elapsedTime=" + encodeURIComponent(elapsedTime);

  fetch(url, {method: 'GET',})
  .then(response => {
      return response;
  })
  .then(responseData => {
      console.log('Data saved successfully:', responseData);
  })
  .catch(error => {
      console.error('Error saving data:', error);
  });
}
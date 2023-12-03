// Listen for messages from content.js
chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
      if (request.type === "urlChange") {
          // Access the URL from the message
          var url = request.url;

          // Now you can do something with the URL, such as storing it or processing it
          console.log("URL changed to:", url);
      }
  }
);
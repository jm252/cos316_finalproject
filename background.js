chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
  if (message.type === "contentScript") {
    // Access the data sent from content script
    var pageInfo = message.data;
    console.log("Received information from content script:", pageInfo);

    document.getElementById("title").innerHTML = pageInfo; 
  }
});
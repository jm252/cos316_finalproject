// if URL changes, send URL to background
setInterval(function () {
    var newUrl = window.location.href;

    chrome.storage.local.get(['url'], function(result) {
        var url = result.url;

        if (newUrl !== url) {
            chrome.storage.local.set({ 'url': newUrl }, function() {
                if (chrome.runtime.lastError) {
                    console.error(chrome.runtime.lastError);
                }
            });
            chrome.runtime.sendMessage({ type: "urlChange", url: url });
        }
    }); 
}, 500);  // Check every 500 milliseconds

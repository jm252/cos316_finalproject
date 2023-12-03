function sendURL() {
    var newUrl = window.location.href;
    chrome.storage.local.get(['url'], function(result) {
        var url = result.url || "";

        // if url changes, send to background
        if (newUrl !== url) {
            chrome.storage.local.set({ 'url': newUrl }, function() {
                // catching error
                if (chrome.runtime.lastError) {
                    console.error(chrome.runtime.lastError);
                }
            });
            // send to background
            chrome.runtime.sendMessage({ type: "urlChange", url: newUrl });
        }
    }); 
}

function handleVisibilityChange() {
    if (document.visibilityState === "visible") {
        sendURL();
    }
}

document.addEventListener("visibilitychange", handleVisibilityChange);

handleVisibilityChange();




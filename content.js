function handleVisible() {
    // check if URL changes
    var newUrl = window.location.href;
    chrome.storage.local.get(['url'], function(result) {
        var url = result.url || "";
        // if url changed, send to background 
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
        // if url didn't change 
        else {
            chrome.runtime.sendMessage({ type: "enteredWindow" });
        }
    }); 
}

function handleVisibilityChange() {
    if (document.visibilityState === "visible") {
        handleVisible();
    }
    else if (document.visibilityState === "hidden") {
        chrome.runtime.sendMessage({ type: "leftWindow" });
    }
}

document.addEventListener("visibilitychange", handleVisibilityChange);

handleVisibilityChange();




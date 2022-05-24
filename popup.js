const activateButton = document.getElementById("activateButton");


activateButton.addEventListener("click", async() => {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

    chrome.scripting.executeScript({
        target: { tabId: tab.id },
        files: ["main.js"]
    });
});

// The body of this function will be executed as a content script inside the
// current page
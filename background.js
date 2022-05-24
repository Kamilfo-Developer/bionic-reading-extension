const isActivated = false

chrome.runtime.onInstalled.addListener(() => {
    chrome.storage.sync.set({ isActivated });
});
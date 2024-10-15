// Background service worker for handling long-running tasks and extension events

chrome.runtime.onInstalled.addListener(() => {
    console.log("Extension installed successfully.");
});
